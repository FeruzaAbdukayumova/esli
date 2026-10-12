"""Transactional email via Resend's HTTP API.

Without RESEND_API_KEY (local dev) emails are logged instead of sent.
"""

import html
import logging

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

RESEND_API = "https://api.resend.com/emails"


async def send_email(to: str, subject: str, html_body: str, text_body: str) -> bool:
    """Send one email. Returns False on failure; never raises."""
    if not settings.RESEND_API_KEY:
        # Bodies can hold live credentials (reset links): only print them for local dev
        if settings.FRONTEND_URL.startswith(("http://localhost", "http://127.0.0.1")):
            logger.warning("RESEND_API_KEY not set; email to %s not sent:\n%s", to, text_body)
        else:
            logger.error("RESEND_API_KEY not set; email %r not sent", subject)
        return False

    try:
        async with httpx.AsyncClient(timeout=10) as client:
            resp = await client.post(
                RESEND_API,
                headers={"Authorization": f"Bearer {settings.RESEND_API_KEY}"},
                json={
                    "from": settings.EMAIL_FROM,
                    "to": [to],
                    "subject": subject,
                    "html": html_body,
                    "text": text_body,
                },
            )
        if resp.status_code >= 400:
            logger.error("Resend rejected email to %s: %s %s", to, resp.status_code, resp.text[:300])
            return False
        return True
    except Exception:
        logger.exception("Failed to send email to %s", to)
        return False


async def send_password_reset_email(to: str, reset_url: str) -> bool:
    url = html.escape(reset_url, quote=True)
    text_body = (
        "Someone asked to reset the password for your Esli account.\n\n"
        f"Set a new password here (link works for 1 hour):\n{reset_url}\n\n"
        "If this wasn't you, ignore this email. Your password won't change."
    )
    html_body = f"""\
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;color:#1f2937">
  <h1 style="font-size:20px;margin:0 0 16px">Reset your Esli password</h1>
  <p style="line-height:1.6;margin:0 0 24px">Someone asked to reset the password for your Esli account. Click below to choose a new one. The link works for 1 hour.</p>
  <a href="{url}" style="display:inline-block;background:#7c3aed;color:#fff;text-decoration:none;padding:12px 24px;border-radius:8px;font-weight:600">Set new password</a>
  <p style="line-height:1.6;margin:24px 0 0;font-size:13px;color:#6b7280">If this wasn't you, ignore this email. Your password won't change.</p>
</div>"""
    return await send_email(to, "Reset your Esli password", html_body, text_body)
