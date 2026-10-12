# Esli Agent Shared Context

## Product
Esli (esli.app) — Free, AI-powered spaced repetition flashcard web app.
Main selling point: AI generates flashcards from any topic or PDF in seconds.
14 languages, guest mode, browser extension, dark/light themes.
Pricing: Free (unlimited manual), Pro ($5/mo), Premium ($12/mo).

## URLs
- Landing page: https://esli.app
- Frontend app: https://app.esli.app
- Backend API: https://api.esli.app
- API docs: https://api.esli.app/docs

## API Authentication
All admin endpoints require a JWT Bearer token.
1. POST https://api.esli.app/api/v1/auth/login with JSON body: {"email": EMAIL, "password": PASSWORD}
2. Response contains: {"access_token": "...", "token_type": "bearer"}
3. Use header: Authorization: Bearer <access_token>
Agent credentials are stored in agents/config/.env

## Admin API Endpoints (all require admin JWT)

### Platform Stats
GET /api/v1/admin/stats
Returns: total_users, total_decks, total_cards, total_reviews, users_by_tier, new_users_this_week, new_users_this_month, open_support_tickets, active_sessions_today

### User Growth Analytics
GET /api/v1/analytics/user-growth?range=7d&granularity=day
Valid ranges: 7d, 30d, 90d, 1y, all
Valid granularities: day, week, month
Returns: signups[], active_users[], app_opens[], unique_visitors[], retention_rate

### Study Engagement
GET /api/v1/analytics/study-engagement?range=7d&granularity=day
Returns: reviews_over_time[], response_distribution, peak_hours[]

### Content Metrics
GET /api/v1/analytics/content-metrics?range=30d&granularity=day
Returns: decks_over_time[], cards_over_time[], popular_decks[], category_breakdown, shared_vs_private

### Subscriptions
GET /api/v1/analytics/subscriptions?range=30d
Returns: users_by_tier, promo_usage[]

### Custom Events
GET /api/v1/analytics/custom-events?range=7d
Returns: events[] with name, count, methods
Tracked events: app.open, deck.create, card.add, pricing.upgrade_click, pricing.billing_toggle, translate.use, ai.generate, file.import

### Users List
GET /api/v1/admin/users?page=1&per_page=20&search=&tier=&provider=&is_admin=

### Decks List
GET /api/v1/admin/decks?page=1&per_page=20&search=&is_shared=

## Public Endpoints (no auth needed)
GET /api/v1/public/decks?per_page=1 — test DB connectivity

## Telegram Bot API
Send messages via: POST https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage
Body: {"chat_id": TELEGRAM_CHAT_ID, "text": "message", "parse_mode": "HTML"}
Bot token and chat ID are in agents/config/.env

## File Output Conventions
- Daily pulse reports: agents/reports/daily-pulse/YYYY-MM-DD.md
- Weekly growth reports: agents/reports/weekly-growth/YYYY-WXX.md
- SEO pages: agents/content/seo-pages/YYYY-WXX/
- Health logs: agents/logs/health/YYYY-MM-DD.log
