"""Shared Telegram helpers for Esli agents (no external deps, urllib only)."""

import json
import os
import urllib.request

BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
CHAT_ID = os.environ["TELEGRAM_CHAT_ID"]
API = f"https://api.telegram.org/bot{BOT_TOKEN}"


def _post(method, payload):
    req = urllib.request.Request(
        f"{API}/{method}",
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json", "User-Agent": "EsliAgent/1.0"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode())


def send(text, buttons=None):
    """Send an HTML message. buttons = list of (label, callback_data) tuples or
    list of such lists (each inner list is a row)."""
    payload = {"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML",
               "disable_web_page_preview": True}
    if buttons:
        rows = buttons if buttons and isinstance(buttons[0], list) else [buttons]
        payload["reply_markup"] = {
            "inline_keyboard": [
                [{"text": label, "callback_data": data} for (label, data) in row]
                for row in rows
            ]
        }
    return _post("sendMessage", payload)


def approve_reject(text, job_id):
    """Send a message with Approve / Reject buttons for a given job id.
    callback_data is read by the Cloudflare Worker to dispatch the right action."""
    return send(text, buttons=[
        ("✅ Approve", f"approve:{job_id}"),
        ("✖️ Reject", f"reject:{job_id}"),
    ])
