# Deployment Guide

Complete guide for deploying the Flashcards application to production.

## Deployment Options

| Option | Best For | Complexity |
|--------|----------|------------|
| Docker Compose | Small deployments, VPS | Low |
| Kubernetes | Large scale, enterprise | High |
| Platform as a Service | Quick deployment | Low |

## Pre-Deployment Checklist

### Security

- [ ] Generate strong `JWT_SECRET` (32+ characters)
- [ ] Set `ACCESS_TOKEN_EXPIRE_MINUTES` appropriately (default: 240)
- [ ] Set `REFRESH_TOKEN_EXPIRE_DAYS` appropriately (default: 7)
- [ ] Configure CORS for production domain only
- [ ] Enable HTTPS/TLS
- [ ] Review database credentials
- [ ] Set up firewall rules
- [ ] Set `ANTHROPIC_API_KEY` for AI card generation

### Configuration

- [ ] Set production environment variables
- [ ] Configure logging for production
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Configure backup strategy
- [ ] Set up health checks

### Database

- [ ] Run all migrations
- [ ] Set up connection pooling
- [ ] Configure backups
- [ ] Test restore procedure

## Docker Compose Deployment

### Production docker-compose.yml

```yaml
version: '3.8'

services:
  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER} -d ${DB_NAME}"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - flashcards-network

  api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    restart: always
    environment:
      DATABASE_URL: postgresql+asyncpg://${DB_USER}:${DB_PASSWORD}@db:5432/${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
      JWT_ALG: HS256
      ACCESS_TOKEN_EXPIRE_MINUTES: ${ACCESS_TOKEN_EXPIRE_MINUTES:-240}
      REFRESH_TOKEN_EXPIRE_DAYS: ${REFRESH_TOKEN_EXPIRE_DAYS:-7}
      CORS_ORIGINS: https://your-domain.com
      ANTHROPIC_API_KEY: ${ANTHROPIC_API_KEY}
    depends_on:
      db:
        condition: service_healthy
    networks:
      - flashcards-network

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        VITE_API_URL: https://api.your-domain.com/api/v1
    restart: always
    networks:
      - flashcards-network

  nginx:
    image: nginx:alpine
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - api
      - frontend
    networks:
      - flashcards-network

volumes:
  postgres_data:

networks:
  flashcards-network:
    driver: bridge
```

### Production Dockerfile (Backend)

```dockerfile
# backend/Dockerfile
FROM python:3.12-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Run with Gunicorn for production
CMD ["gunicorn", "app.main:app", "-w", "4", "-k", "uvicorn.workers.UvicornWorker", "-b", "0.0.0.0:8000"]
```

### Production Dockerfile (Frontend)

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Build argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build application
COPY . .
RUN npm run build

# Production image
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

```nginx
# nginx/nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    # Logging
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;

    # Upstream servers
    upstream api {
        server api:8000;
    }

    upstream frontend {
        server frontend:80;
    }

    server {
        listen 80;
        server_name your-domain.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name your-domain.com;

        # SSL configuration
        ssl_certificate /etc/nginx/ssl/fullchain.pem;
        ssl_certificate_key /etc/nginx/ssl/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256;
        ssl_prefer_server_ciphers off;

        # Security headers
        add_header X-Frame-Options DENY;
        add_header X-Content-Type-Options nosniff;
        add_header X-XSS-Protection "1; mode=block";
        add_header Strict-Transport-Security "max-age=31536000" always;

        # API routes
        location /api {
            limit_req zone=api burst=20 nodelay;
            proxy_pass http://api;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        # Health check
        location /health {
            proxy_pass http://api/health;
        }

        # Frontend
        location / {
            proxy_pass http://frontend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### Deployment Steps

```bash
# 1. Clone repository on server
git clone https://github.com/your-org/flashcards.git
cd flashcards

# 2. Create production environment file
cat > .env << EOF
DB_USER=flashcards
DB_PASSWORD=$(openssl rand -base64 32)
DB_NAME=flashcards
JWT_SECRET=$(openssl rand -base64 32)
ACCESS_TOKEN_EXPIRE_MINUTES=240
REFRESH_TOKEN_EXPIRE_DAYS=7
ANTHROPIC_API_KEY=your-anthropic-api-key
EOF

# 3. Set up SSL certificates (Let's Encrypt)
mkdir -p nginx/ssl
certbot certonly --standalone -d your-domain.com
cp /etc/letsencrypt/live/your-domain.com/* nginx/ssl/

# 4. Build and start services
docker-compose -f docker-compose.prod.yml up -d --build

# 5. Run database migrations
docker-compose exec api alembic upgrade head

# 6. Verify deployment
curl https://your-domain.com/health
```

## Platform Deployments

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy backend
cd backend
railway up

# Deploy frontend
cd ../frontend
railway up
```

**Environment Variables (Railway Dashboard):**
```
DATABASE_URL=postgresql+asyncpg://...
JWT_SECRET=your-secret-key
JWT_ALG=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=240
REFRESH_TOKEN_EXPIRE_DAYS=7
CORS_ORIGINS=https://your-app.railway.app
ANTHROPIC_API_KEY=your-anthropic-api-key
```

### Render

**Backend (render.yaml):**
```yaml
services:
  - type: web
    name: flashcards-api
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: flashcards-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
      - key: ANTHROPIC_API_KEY
        sync: false
```

**Frontend (render.yaml):**
```yaml
services:
  - type: web
    name: flashcards-frontend
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: dist
    envVars:
      - key: VITE_API_URL
        value: https://flashcards-api.onrender.com/api/v1
```

### Fly.io

```bash
# Install Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Deploy backend
cd backend
fly launch
fly deploy

# Deploy frontend
cd ../frontend
fly launch
fly deploy
```

**fly.toml (Backend):**
```toml
app = "flashcards-api"
primary_region = "ord"

[build]
  dockerfile = "Dockerfile"

[env]
  PORT = "8000"

[http_service]
  internal_port = 8000
  force_https = true

[[services]]
  internal_port = 8000
  protocol = "tcp"

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]
```

## Database Management

### Backups

**Automated Backup Script:**
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR=/backups

# Create backup
docker-compose exec -T db pg_dump -U flashcards flashcards | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

# Upload to S3 (optional)
aws s3 cp $BACKUP_DIR/backup_$DATE.sql.gz s3://your-bucket/backups/
```

**Cron Schedule:**
```bash
# Daily at 3 AM
0 3 * * * /path/to/backup.sh
```

### Restore

```bash
# Download backup
aws s3 cp s3://your-bucket/backups/backup_20240115.sql.gz .

# Restore
gunzip -c backup_20240115.sql.gz | docker-compose exec -T db psql -U flashcards flashcards
```

### Migrations in Production

```bash
# Always backup first
./backup.sh

# Run migrations
docker-compose exec api alembic upgrade head

# Verify
docker-compose exec api alembic current
```

## Monitoring

### Health Checks

**Backend Health Endpoint:**
```python
@app.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    try:
        await db.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return JSONResponse(
            status_code=503,
            content={"status": "unhealthy", "error": str(e)}
        )
```

### Logging

**Structured Logging Configuration:**
```python
import structlog

structlog.configure(
    processors=[
        structlog.stdlib.filter_by_level,
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.processors.JSONRenderer()
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    context_class=dict,
    logger_factory=structlog.stdlib.LoggerFactory(),
)
```

### Error Tracking (Sentry)

```python
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration

sentry_sdk.init(
    dsn="https://your-sentry-dsn",
    integrations=[FastApiIntegration()],
    traces_sample_rate=0.1,
    environment="production",
)
```

### Metrics (Prometheus)

```python
from prometheus_fastapi_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)
```

## Scaling

### Horizontal Scaling

```yaml
# docker-compose.prod.yml
services:
  api:
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Database Scaling

**Connection Pooling (PgBouncer):**
```ini
# pgbouncer.ini
[databases]
flashcards = host=db port=5432 dbname=flashcards

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
```

### CDN for Static Assets

```nginx
location /assets {
    expires 1y;
    add_header Cache-Control "public, immutable";
    proxy_pass http://frontend;
}
```

## Security Hardening

### Environment Variables

```bash
# Never commit secrets
echo ".env" >> .gitignore

# Use secrets manager in production
# AWS Secrets Manager, HashiCorp Vault, etc.
```

### Network Security

```yaml
# docker-compose security
services:
  db:
    # Only accessible within network
    networks:
      - internal

  api:
    networks:
      - internal
      - public

networks:
  internal:
    internal: true
  public:
```

### Regular Updates

```bash
# Update base images monthly
docker-compose pull
docker-compose up -d --build

# Update dependencies
pip install --upgrade -r requirements.txt
npm update
```

## Rollback Procedures

### Quick Rollback

```bash
# Tag releases
git tag v1.2.3
git push --tags

# Rollback to previous version
git checkout v1.2.2
docker-compose up -d --build
```

### Database Rollback

```bash
# Rollback one migration
docker-compose exec api alembic downgrade -1

# Or restore from backup
./restore.sh backup_20240115.sql.gz
```

## Troubleshooting Production

### Common Issues

**Container won't start:**
```bash
docker-compose logs api
docker-compose exec api sh  # Debug inside container
```

**Database connection issues:**
```bash
docker-compose exec api python -c "from app.db.session import engine; print(engine.url)"
docker-compose exec db psql -U flashcards -d flashcards -c "SELECT 1"
```

**Memory issues:**
```bash
docker stats
# Increase memory limits in docker-compose.yml
```

### Emergency Procedures

```bash
# Stop all traffic
docker-compose stop nginx

# Investigate
docker-compose logs --tail=100 api

# Quick fix and restart
docker-compose up -d api

# Resume traffic
docker-compose start nginx
```
