#!/usr/bin/env python3
"""
Esli Daily Pulse Agent
Generates a morning business digest and sends it to Telegram.
Run this from an environment with access to api.esli.app and api.telegram.org.
"""

import urllib.request
import urllib.error
import json
import os
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

# ── Config ──────────────────────────────────────────────────────────────────
API_URL             = "https://api.esli.app"
AGENT_EMAIL         = os.environ.get("ESLI_AGENT_EMAIL", "agent@esli.app")
AGENT_PASSWORD      = os.environ["ESLI_AGENT_PASSWORD"]
TELEGRAM_BOT_TOKEN  = os.environ["TELEGRAM_BOT_TOKEN"]
TELEGRAM_CHAT_ID    = os.environ["TELEGRAM_CHAT_ID"]

REPORTS_DIR = Path(__file__).parent / "reports" / "daily-pulse"

HEADERS_BASE = {"User-Agent": "Mozilla/5.0"}

# ── Helpers ──────────────────────────────────────────────────────────────────

def api_request(method, path, token=None, params=None):
    url = f"{API_URL}{path}"
    if params:
        qs = "&".join(f"{k}={v}" for k, v in params.items())
        url = f"{url}?{qs}"
    headers = dict(HEADERS_BASE)
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(url, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode())


def login():
    data = json.dumps({"email": AGENT_EMAIL, "password": AGENT_PASSWORD}).encode()
    req = urllib.request.Request(
        f"{API_URL}/api/v1/auth/login",
        data=data,
        headers={**HEADERS_BASE, "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode())["access_token"]


def send_telegram(text):
    payload = json.dumps({
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
    }).encode()
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage",
        data=payload,
        headers={**HEADERS_BASE, "Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.loads(resp.read().decode())


def load_previous_report(today):
    yesterday = today - timedelta(days=1)
    path = REPORTS_DIR / f"{yesterday.strftime('%Y-%m-%d')}.md"
    if path.exists():
        return path.read_text()
    return None


def extract_metric(report_text, label):
    """Parse a metric value from a previous markdown report line."""
    if not report_text:
        return None
    for line in report_text.splitlines():
        if label in line:
            # grab first integer-looking token after the label
            parts = line.split(label, 1)[1].split()
            for p in parts:
                clean = p.strip("*:,()%")
                if clean.lstrip("-").isdigit():
                    return int(clean)
    return None


def delta_str(current, previous):
    if previous is None or previous == 0:
        return ""
    diff = current - previous
    pct  = diff / previous * 100
    sign = "+" if diff >= 0 else ""
    return f" ({sign}{pct:.0f}%)"


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    today     = datetime.now(timezone.utc).date()
    today_str = today.strftime("%Y-%m-%d")

    print(f"[{today_str}] Esli Daily Pulse starting…")

    # 1. Auth
    print("  → Logging in…")
    token = login()
    print("  ✓ Token obtained")

    # 2. Fetch data
    print("  → Fetching admin stats…")
    stats = api_request("GET", "/api/v1/admin/stats", token)

    print("  → Fetching user growth (7d)…")
    growth = api_request("GET", "/api/v1/analytics/user-growth",
                         token, {"range": "7d", "granularity": "day"})

    print("  → Fetching study engagement (7d)…")
    engagement = api_request("GET", "/api/v1/analytics/study-engagement",
                              token, {"range": "7d", "granularity": "day"})

    print("  → Fetching custom events (7d)…")
    events = api_request("GET", "/api/v1/analytics/custom-events",
                         token, {"range": "7d"})

    # 3. Parse metrics
    total_users    = stats.get("total_users", 0)
    new_today      = stats.get("new_users_today", 0)
    new_week       = stats.get("new_users_week", 0)
    active_today   = stats.get("active_users_today", 0)
    open_tickets   = stats.get("open_support_tickets", 0)
    new_tickets    = stats.get("new_support_tickets_today", 0)

    # 7-day rollup from growth data
    signups_7d = sum(d.get("signups", d.get("count", 0))
                     for d in (growth.get("data") or growth.get("days", [])))
    reviews_7d = sum(d.get("reviews", d.get("count", 0))
                     for d in (engagement.get("data") or engagement.get("days", [])))

    # Custom events
    ev = events if isinstance(events, dict) else {}
    ai_gens        = ev.get("ai_generations", ev.get("ai_gen", 0))
    upgrade_clicks = ev.get("upgrade_clicks", 0)

    # 4. Load previous report for deltas
    prev = load_previous_report(today)
    prev_signups  = extract_metric(prev, "7-Day Signups")
    prev_reviews  = extract_metric(prev, "7-Day Reviews")
    prev_total    = extract_metric(prev, "Total Users")

    # 5. Anomaly detection
    alerts = []
    if prev_signups and signups_7d < prev_signups * 0.5:
        alerts.append(f"Signup drop >50% (was {prev_signups}, now {signups_7d})")
    if active_today == 0:
        alerts.append("Zero active users today")
    if new_tickets > 0:
        alerts.append(f"{new_tickets} new support ticket(s)")

    alerts_str = "\n".join(f"  ⚠ {a}" for a in alerts) if alerts else "  None"

    # 6. Save full report
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    report_path = REPORTS_DIR / f"{today_str}.md"

    report_md = f"""# Esli Daily Pulse — {today_str}

## Users
- **Total Users**: {total_users}
- **New Today**: {new_today}
- **New This Week**: {new_week}
- **Active Today**: {active_today}

## Support
- **Open Tickets**: {open_tickets}
- **New Today**: {new_tickets}

## 7-Day Trends
- **7-Day Signups**: {signups_7d}
- **7-Day Reviews**: {reviews_7d}
- **AI Generations (7d)**: {ai_gens}
- **Upgrade Clicks (7d)**: {upgrade_clicks}

## Anomalies
{alerts_str}

## Raw Data
### /api/v1/admin/stats
```json
{json.dumps(stats, indent=2)}
```

### /api/v1/analytics/user-growth?range=7d
```json
{json.dumps(growth, indent=2)}
```

### /api/v1/analytics/study-engagement?range=7d
```json
{json.dumps(engagement, indent=2)}
```

### /api/v1/analytics/custom-events?range=7d
```json
{json.dumps(events, indent=2)}
```
"""
    report_path.write_text(report_md)
    print(f"  ✓ Report saved → {report_path}")

    # 7. Build Telegram digest
    sig_delta  = delta_str(signups_7d, prev_signups)
    rev_delta  = delta_str(reviews_7d, prev_reviews)
    alert_line = " | ".join(alerts) if alerts else "None"

    tg_text = (
        f"<b>ESLI DAILY PULSE — {today_str}</b>\n"
        f"USERS: {total_users:,} total (+{new_today} today, +{new_week} this week)\n"
        f"ACTIVE: {active_today} studying | SUPPORT: {open_tickets} open ({new_tickets} new)\n"
        f"7-DAY: Signups {signups_7d}{sig_delta} | Reviews {reviews_7d}{rev_delta}\n"
        f"AI Gens: {ai_gens} | Upgrade Clicks: {upgrade_clicks}\n"
        f"ALERTS: {alert_line}"
    )

    print("  → Sending Telegram digest…")
    send_telegram(tg_text)
    print("  ✓ Telegram message sent")
    print()
    print(tg_text)


if __name__ == "__main__":
    try:
        main()
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode()}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
