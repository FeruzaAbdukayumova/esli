"""Telegram notification service — sends alerts via Telegram Bot API."""

import logging
from datetime import datetime, timezone

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

TELEGRAM_API = "https://api.telegram.org/bot{token}/sendMessage"


async def send_notification(message: str) -> None:
    """Send a message to the configured Telegram chat. Fails silently."""
    if not settings.TELEGRAM_BOT_TOKEN or not settings.TELEGRAM_CHAT_ID:
        return

    url = TELEGRAM_API.format(token=settings.TELEGRAM_BOT_TOKEN)
    try:
        async with httpx.AsyncClient(timeout=5) as client:
            await client.post(url, json={
                "chat_id": settings.TELEGRAM_CHAT_ID,
                "text": message,
                "parse_mode": "HTML",
            })
    except Exception:
        logger.warning("Failed to send Telegram notification", exc_info=True)


def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")


# -- App open --

async def notify_app_open(user_id: str | None, session_id: str | None) -> None:
    user_info = f"User: <code>{user_id}</code>" if user_id else "Guest visitor"
    await send_notification(
        f"👀 <b>App opened</b>\n"
        f"{user_info}\n"
        f"Time: {_now()}"
    )


# -- Registration --

async def notify_registration(email: str, username: str | None) -> None:
    await send_notification(
        f"🎉 <b>New registration!</b>\n"
        f"Email: {email}\n"
        f"Username: {username or '—'}\n"
        f"Time: {_now()}"
    )


# -- OAuth signup --

async def notify_oauth_signup(email: str, provider: str, name: str | None) -> None:
    await send_notification(
        f"🔑 <b>New OAuth signup!</b>\n"
        f"Provider: {provider}\n"
        f"Email: {email}\n"
        f"Name: {name or '—'}\n"
        f"Time: {_now()}"
    )


# -- Deck copy --

async def notify_deck_copy(deck_title: str, card_count: int, username: str | None) -> None:
    await send_notification(
        f"📋 <b>Deck copied</b>\n"
        f"Deck: {deck_title}\n"
        f"Cards: {card_count}\n"
        f"By: {username or 'unknown'}\n"
        f"Time: {_now()}"
    )


# -- Support message --

async def notify_support_message(content: str, user_info: str) -> None:
    preview = content[:200] + "…" if len(content) > 200 else content
    await send_notification(
        f"💬 <b>New support message</b>\n"
        f"From: {user_info}\n"
        f"Message: {preview}\n"
        f"Time: {_now()}"
    )


# -- AI generation --

async def notify_ai_generation(topic: str, card_count: int, user_id: str | None, is_pdf: bool = False) -> None:
    source = "PDF" if is_pdf else "topic"
    user_info = f"User: <code>{user_id}</code>" if user_id else "Guest"
    await send_notification(
        f"🤖 <b>AI generation ({source})</b>\n"
        f"Topic: {topic[:100]}\n"
        f"Cards: {card_count}\n"
        f"{user_info}\n"
        f"Time: {_now()}"
    )


# -- Pricing upgrade click --

async def notify_upgrade_click(tier: str | None, user_id: str | None) -> None:
    user_info = f"User: <code>{user_id}</code>" if user_id else "Guest"
    await send_notification(
        f"💰 <b>Upgrade click!</b>\n"
        f"Tier: {tier or 'unknown'}\n"
        f"{user_info}\n"
        f"Time: {_now()}"
    )
