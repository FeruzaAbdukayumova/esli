#!/usr/bin/env python3
"""Telegram poller — the free, no-Cloudflare way to give the team tasks.

Runs on a GitHub Actions cron every few minutes. Checks Telegram for new
messages + button taps from Feruza, and routes each to the right agent:

  "/plan"            -> make a new daily plan
  "/status"          -> status line
  button tap         -> approve / reject the referenced job
  any other text     -> a free-text task: planned + safe parts done + reported

Only messages from TELEGRAM_CHAT_ID are honoured (so only Feruza can command
the team). Update offset is persisted in agents/state/telegram_offset.txt so
messages aren't processed twice across runs.

Env required: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, CLAUDE_CODE_OAUTH_TOKEN
"""

import json
import os
import subprocess
import sys
import urllib.request
from pathlib import Path

import lib_telegram as tg
import runner

ROOT = Path(__file__).resolve().parents[2]
STATE = ROOT / "agents" / "state" / "telegram_offset.txt"
CHAT_ID = str(tg.CHAT_ID)
API = tg.API


def get_offset():
    try:
        return int(STATE.read_text().strip())
    except Exception:
        return 0


def save_offset(offset):
    STATE.parent.mkdir(parents=True, exist_ok=True)
    STATE.write_text(str(offset))


def get_updates(offset):
    url = f"{API}/getUpdates?timeout=0&offset={offset}"
    req = urllib.request.Request(url, headers={"User-Agent": "EsliAgent/1.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode()).get("result", [])


def run_orchestrator():
    subprocess.run(["python3", str(ROOT / "agents" / "scripts" / "orchestrator.py")],
                   check=False)


def handle_message(text):
    text = text.strip()
    if text in ("/start", "/help"):
        tg.send("👋 Esli team. Tap Approve/Reject on the daily plan, send /plan "
                "for a fresh plan, or just text me a task and I'll do the safe parts.")
    elif text == "/plan":
        tg.send("🧠 Making a plan…")
        run_orchestrator()
    elif text == "/status":
        runner.handle_status()
    else:
        runner.REQUEST_TEXT = text
        runner.handle_request()


def handle_callback(cb):
    data = cb.get("data", "")
    action, _, job_id = data.partition(":")
    # Stop the loading spinner on her phone.
    try:
        urllib.request.urlopen(urllib.request.Request(
            f"{API}/answerCallbackQuery",
            data=json.dumps({"callback_query_id": cb["id"]}).encode(),
            headers={"Content-Type": "application/json"}, method="POST"), timeout=15)
    except Exception:
        pass
    runner.JOB_ID = job_id
    if action == "approve":
        runner.handle_approve()
    elif action == "reject":
        runner.handle_reject()


def write_output(key, value):
    out = os.environ.get("GITHUB_OUTPUT")
    if out:
        with open(out, "a") as f:
            f.write(f"{key}={value}\n")


def main():
    offset = get_offset()
    updates = get_updates(offset)

    # Cheap pre-check: in CHECK mode just report whether there's work, so the
    # workflow can skip the expensive Node/Claude install on idle polls and
    # stay inside the GitHub Actions free tier.
    if os.environ.get("POLL_CHECK") == "1":
        has_work = "true" if updates else "false"
        write_output("work", has_work)
        print(f"check: work={has_work} ({len(updates)} updates)")
        return

    if not updates:
        print("No new updates.")
        return

    highest = offset
    for u in updates:
        highest = max(highest, u["update_id"] + 1)
        msg = u.get("message")
        cb = u.get("callback_query")
        if msg and str(msg.get("chat", {}).get("id")) == CHAT_ID and msg.get("text"):
            print(f"message: {msg['text'][:60]}")
            handle_message(msg["text"])
        elif cb and str(cb.get("message", {}).get("chat", {}).get("id")) == CHAT_ID:
            print(f"callback: {cb.get('data')}")
            handle_callback(cb)
    save_offset(highest)
    print(f"Processed up to offset {highest}.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(1)
