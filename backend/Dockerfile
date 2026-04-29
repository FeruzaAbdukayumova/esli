FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN pip install --no-cache-dir uv

COPY requirements.txt /app/requirements.txt

RUN uv venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN uv pip install -r /app/requirements.txt

COPY . /app

# Default production command: run migrations then start the API.
# docker-compose.yml overrides this for local dev (uvicorn --reload).
CMD ["sh", "scripts/start.sh"]
