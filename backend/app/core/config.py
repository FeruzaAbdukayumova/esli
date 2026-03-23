from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_NAME: str = "flashcards-api"
    API_V1_PREFIX: str = "/api/v1"
    DATABASE_URL: str | None = None
    CORS_ORIGINS: str = "http://localhost:5173"
    JWT_SECRET: str = "CHANGE_ME_TO_A_LONG_RANDOM_STRING"
    JWT_ALG: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 240
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    ANTHROPIC_API_KEY: str | None = None

    # Stripe
    STRIPE_SECRET_KEY: str | None = None
    STRIPE_PUBLISHABLE_KEY: str | None = None
    STRIPE_WEBHOOK_SECRET: str | None = None
    STRIPE_PRO_MONTHLY_PRICE_ID: str | None = None
    STRIPE_PRO_YEARLY_PRICE_ID: str | None = None
    STRIPE_PREMIUM_MONTHLY_PRICE_ID: str | None = None
    STRIPE_PREMIUM_YEARLY_PRICE_ID: str | None = None
    FRONTEND_URL: str = "http://localhost:5173"

    # OAuth
    GOOGLE_CLIENT_ID: str | None = None
    GOOGLE_CLIENT_SECRET: str | None = None

    # Telegram notifications
    TELEGRAM_BOT_TOKEN: str | None = None
    TELEGRAM_CHAT_ID: str | None = None

settings = Settings()
