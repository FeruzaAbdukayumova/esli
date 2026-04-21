#!/usr/bin/env python3
"""Esli Daily Pulse - fetches business metrics and sends Telegram digest."""

import json
import os
import sys
import urllib.error
import urllib.request
from datetime import date, timedelta
from pathlib import Path

API_URL = os.environ["API_URL"]
AGENT_EMAIL = os.environ["AGENT_EMAIL"]
AGENT_PASSWORD = os.environ["AGENT_PASSWORD"]
TELEGRAM_BOT_TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
TELEGRAM_CHAT_ID = os.environ["TELEGRAM_CHAT_ID"]

REPORTS_DIR = Path(__file__).parent.parent / "reports" / "daily-pulse"
TODAY = date.today()
YESTERDAY = TODAY - timedelta(days=1)

HEADERS_BASE = {"User-Agent": "Mozilla/5.0"}


def request(method, url, *, data=None, headers=None):
    h = {**HEADERS_BASE, **(headers or {})}
    if data is not None:
        body = json.dumps(data).encode()
        h["Content-Type"] = "application/json"
    else:
        body = None
    req = urllib.request.Request(url, data=body, headers=h, method=method)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode())


def login():
    result = request("POST", f"{API_URL}/api/v1/auth/login",
                     data={"email": AGENT_EMAIL, "password": AGENT_PASSWORD})
    return result["access_token"]


def fetch(token, path):
    try:
        return request("GET", f"{API_URL}{path}",
                       headers={"Authorization": f"Bearer {token}"})
    except Exception as e:
        print(f"  WARN: {path} failed: {e}", file=sys.stderr)
        return None


def load_previous_report():
    for delta in range(1, 8):
        prev_date = TODAY - timedelta(days=delta)
        path = REPORTS_DIR / f"{prev_date}.md"
        if path.exists():
            text = path.read_text()
            # Only use reports that contain actual data (not failure reports)
            if "No Data Collected" not in text and "FAILED" not in text:
                return prev_date, text
    return None, None


def extract_metric(text, label):
    """Pull a number after a label from a markdown report line."""
    import re
    m = re.search(rf"{re.escape(label)}[:\s]+(\d+)", text)
    return int(m.group(1)) if m else None


def delta_str(current, previous):
    if previous is None or current is None:
        return ""
    diff = current - previous
    if previous == 0:
        return f" (+{diff})" if diff >= 0 else f" ({diff})"
    pct = round(diff / previous * 100)
    sign = "+" if diff >= 0 else ""
    return f" ({sign}{pct}%)"


def send_telegram(text):
    data = {"chat_id": TELEGRAM_CHAT_ID, "text": text, "parse_mode": "HTML"}
    request("POST", f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
            data=data)


def main():
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    report_path = REPORTS_DIR / f"{TODAY}.md"

    errors = []

    # Step 1: Login
    print("Logging in...")
    try:
        token = login()
        print("  OK")
    except Exception as e:
        errors.append(f"Login failed: {e}")
        write_failure_report(report_path, errors)
        return 1

    # Step 2: Fetch data
    print("Fetching admin stats...")
    stats = fetch(token, "/api/v1/admin/stats")
    print("Fetching user growth...")
    user_growth = fetch(token, "/api/v1/analytics/user-growth?range=7d&granularity=day")
    print("Fetching study engagement...")
    engagement = fetch(token, "/api/v1/analytics/study-engagement?range=7d&granularity=day")
    print("Fetching custom events...")
    custom_events = fetch(token, "/api/v1/analytics/custom-events?range=7d")

    # Step 3: Load previous report for deltas
    prev_date, prev_text = load_previous_report()

    # Step 4: Analyze
    metrics = analyze(stats, user_growth, engagement, custom_events)
    prev_metrics = analyze_text(prev_text) if prev_text else {}

    # Step 5: Save report
    report_content = build_report(metrics, prev_metrics, stats, user_growth, engagement, custom_events)
    report_path.write_text(report_content)
    print(f"Report saved to {report_path}")

    # Step 6: Send Telegram
    digest = build_digest(metrics, prev_metrics, errors)
    print("Sending Telegram digest...")
    try:
        send_telegram(digest)
        print("  Sent.")
    except Exception as e:
        print(f"  Telegram failed: {e}", file=sys.stderr)
        errors.append(f"Telegram failed: {e}")

    return 0


def analyze(stats, user_growth, engagement, custom_events):
    m = {}

    if stats:
        m["total_users"] = stats.get("total_users") or stats.get("totalUsers")
        m["active_today"] = stats.get("active_today") or stats.get("activeToday")
        m["open_tickets"] = stats.get("open_tickets") or stats.get("openTickets")
        m["new_tickets"] = stats.get("new_tickets") or stats.get("newTickets")

    if user_growth:
        rows = user_growth.get("data") or user_growth.get("rows") or []
        m["signups_7d"] = sum(r.get("count") or r.get("signups") or 0 for r in rows)
        m["signups_today"] = rows[-1].get("count") or rows[-1].get("signups") or 0 if rows else None
        m["signups_week"] = m["signups_7d"]

    if engagement:
        rows = engagement.get("data") or engagement.get("rows") or []
        m["reviews_7d"] = sum(r.get("reviews") or r.get("count") or 0 for r in rows)

    if custom_events:
        events = custom_events.get("data") or custom_events.get("events") or {}
        if isinstance(events, list):
            events = {e.get("event") or e.get("name"): e.get("count") or e.get("total") or 0 for e in events}
        m["ai_gens_7d"] = events.get("ai_generation") or events.get("aiGeneration") or events.get("card_generated") or 0
        m["upgrade_clicks_7d"] = events.get("upgrade_click") or events.get("upgradeClick") or events.get("upgrade_clicked") or 0

    return m


def analyze_text(text):
    """Extract key numbers from a previous markdown report."""
    if not text:
        return {}
    m = {}
    m["total_users"] = extract_metric(text, "Total users")
    m["signups_7d"] = extract_metric(text, "Signups 7d")
    m["reviews_7d"] = extract_metric(text, "Reviews 7d")
    m["ai_gens_7d"] = extract_metric(text, "AI generations")
    m["upgrade_clicks_7d"] = extract_metric(text, "Upgrade clicks")
    return {k: v for k, v in m.items() if v is not None}


def extract_metric(text, label):
    import re
    m = re.search(rf"{re.escape(label)}[:\s]+(\d+)", text, re.IGNORECASE)
    return int(m.group(1)) if m else None


def build_report(m, prev, raw_stats, raw_growth, raw_engagement, raw_events):
    lines = [
        f"# Esli Daily Pulse - {TODAY}",
        "",
        f"**Generated:** {TODAY}  ",
        f"**Agent:** agent@esli.app",
        "",
        "---",
        "",
        "## Summary Metrics",
        "",
        f"- Total users: {m.get('total_users', 'N/A')}",
        f"- New signups today: {m.get('signups_today', 'N/A')}",
        f"- New signups this week: {m.get('signups_week', 'N/A')}",
        f"- Active users today: {m.get('active_today', 'N/A')}",
        f"- Open support tickets: {m.get('open_tickets', 'N/A')}",
        f"- New support tickets: {m.get('new_tickets', 'N/A')}",
        "",
        "## 7-Day Trends",
        "",
        f"- Signups 7d: {m.get('signups_7d', 'N/A')}",
        f"- Reviews 7d: {m.get('reviews_7d', 'N/A')}",
        f"- AI generations: {m.get('ai_gens_7d', 'N/A')}",
        f"- Upgrade clicks: {m.get('upgrade_clicks_7d', 'N/A')}",
        "",
        "## Raw API Responses",
        "",
        "### /api/v1/admin/stats",
        f"```json\n{json.dumps(raw_stats, indent=2)}\n```",
        "",
        "### /api/v1/analytics/user-growth?range=7d&granularity=day",
        f"```json\n{json.dumps(raw_growth, indent=2)}\n```",
        "",
        "### /api/v1/analytics/study-engagement?range=7d&granularity=day",
        f"```json\n{json.dumps(raw_engagement, indent=2)}\n```",
        "",
        "### /api/v1/analytics/custom-events?range=7d",
        f"```json\n{json.dumps(raw_events, indent=2)}\n```",
    ]
    return "\n".join(lines)


def build_digest(m, prev, errors):
    def v(key, fmt=str):
        val = m.get(key)
        return fmt(val) if val is not None else "N/A"

    def d(key):
        cur = m.get(key)
        p = prev.get(key)
        return delta_str(cur, p)

    total = v("total_users")
    new_today = v("signups_today")
    new_week = v("signups_week")
    active = v("active_today")
    tickets = v("open_tickets")
    new_tickets = v("new_tickets")
    signups_7d = v("signups_7d")
    reviews_7d = v("reviews_7d")
    ai_gens = v("ai_gens_7d")
    upgrades = v("upgrade_clicks_7d")

    alerts = []
    sig_cur = m.get("signups_today")
    sig_prev = prev.get("signups_today")
    if sig_cur is not None and sig_prev and sig_prev > 0 and sig_cur < sig_prev * 0.5:
        alerts.append(f"Signups dropped >50% vs yesterday ({sig_prev} -> {sig_cur})")
    if m.get("active_today") == 0:
        alerts.append("Zero active users today")
    if m.get("new_tickets") and int(m.get("new_tickets")) > 0:
        alerts.append(f"{m['new_tickets']} new support ticket(s)")
    if errors:
        alerts += errors

    alert_text = "\n".join(f"  - {a}" for a in alerts) if alerts else "  None"

    lines = [
        f"<b>ESLI DAILY PULSE -- {TODAY}</b>",
        f"USERS: {total} total (+{new_today} today, +{new_week} this week)",
        f"ACTIVE: {active} studying | SUPPORT: {tickets} open ({new_tickets} new)",
        f"7-DAY: Signups {signups_7d}{d('signups_7d')} | Reviews {reviews_7d}{d('reviews_7d')}",
        f"AI Gens: {ai_gens} | Upgrade Clicks: {upgrades}",
        f"ALERTS:",
        alert_text,
    ]
    return "\n".join(lines)


def write_failure_report(path, errors):
    content = f"""# Esli Daily Pulse - {TODAY}

## Status: FAILED

**Generated:** {TODAY}
**Agent:** agent@esli.app

## Errors

{chr(10).join(f"- {e}" for e in errors)}

## No Data Collected

No business metrics were gathered. No Telegram digest was sent.
"""
    path.write_text(content)
    print(f"Failure report saved to {path}")


if __name__ == "__main__":
    sys.exit(main())
