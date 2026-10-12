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

    # Stripe (legacy, being replaced by Paddle)
    STRIPE_SECRET_KEY: str | None = None
    STRIPE_PUBLISHABLE_KEY: str | None = None
    STRIPE_WEBHOOK_SECRET: str | None = None
    STRIPE_PRO_MONTHLY_PRICE_ID: str | None = None
    STRIPE_PRO_YEARLY_PRICE_ID: str | None = None
    STRIPE_PREMIUM_MONTHLY_PRICE_ID: str | None = None
    STRIPE_PREMIUM_YEARLY_PRICE_ID: str | None = None

    # Paddle
    PADDLE_ENV: str = "sandbox"  # "sandbox" or "production"
    PADDLE_API_KEY: str | None = None
    PADDLE_CLIENT_TOKEN: str | None = None
    PADDLE_WEBHOOK_SECRET: str | None = None
    PADDLE_PRO_MONTHLY_PRICE_ID: str | None = None
    PADDLE_PRO_YEARLY_PRICE_ID: str | None = None
    PADDLE_PREMIUM_MONTHLY_PRICE_ID: str | None = None
    PADDLE_PREMIUM_YEARLY_PRICE_ID: str | None = None

    FRONTEND_URL: str = "http://localhost:5173"

    @property
    def paddle_api_base(self) -> str:
        return (
            "https://sandbox-api.paddle.com"
            if self.PADDLE_ENV == "sandbox"
            else "https://api.paddle.com"
        )

    # OAuth
    GOOGLE_CLIENT_ID: str | None = None
    GOOGLE_CLIENT_SECRET: str | None = None

    # Transactional email (Resend)
    RESEND_API_KEY: str | None = None
    EMAIL_FROM: str = "Esli <noreply@esli.app>"

    # Telegram notifications
    TELEGRAM_BOT_TOKEN: str | None = None
    TELEGRAM_CHAT_ID: str | None = None

settings = Settings()
