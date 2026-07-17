#!/usr/bin/env python3
"""Esli Chief of Staff — daily orchestrator.

Reads current priorities, goals, and recent agent reports, asks Claude to plan
2-4 concrete tasks for the day across build + promote, then sends the plan to
Feruza on Telegram with Approve / Change buttons.

Runs Claude on Feruza's Max subscription via Claude Code headless mode (see
lib_claude). Runs in GitHub Actions. Env required:
  CLAUDE_CODE_OAUTH_TOKEN, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
"""

import sys
from datetime import date
from pathlib import Path

import lib_telegram as tg
import lib_claude

ROOT = Path(__file__).resolve().parents[2]
PLANS_DIR = ROOT / "agents" / "reports" / "plans"
TODAY = date.today().isoformat()


def read(path, limit_chars=4000):
    p = ROOT / path
    if not p.exists():
        return ""
    return p.read_text()[:limit_chars]


def latest_report(subdir):
    d = ROOT / "agents" / "reports" / subdir
    if not d.exists():
        return ""
    files = sorted(d.glob("*.md"))
    return files[-1].read_text()[:2500] if files else ""


def build_context():
    return f"""You are the Chief of Staff for Esli, an AI flashcard startup run by a
solo founder (Feruza) who has a full-time job and wants to be only the final
yes/no approver. Plan today's work for the agent team.

=== TEAM CONSTITUTION (how you think — this overrides everything else) ===
{read('agents/config/constitution.md', 7000)}

=== CURRENT PRIORITIES ===
{read('context/current-priorities.md')}

=== GOALS ===
{read('context/goals.md')}

=== TEAM ROLES ===
{read('agents/config/roles.md', 6000)}

=== LATEST DAILY PULSE ===
{latest_report('daily-pulse')}

=== LATEST QA REPORT ===
{latest_report('qa')}

Think like a founder, not a task dispatcher. First ask: what is the single
highest-impact improvement we can make today for awareness, visitors,
sign-ups, activation, retention, or revenue? Plan 1-4 concrete tasks around
that answer — one big task beats four small ones if its expected impact is
higher. Skip busy work. Challenge yesterday's plan if the data says it was
wrong. Each task must name the responsible agent (dev, qa, deploy, growth,
content, social), be specific and shippable in a day, and say which North
Star metric it moves. Do NOT propose production deploys, public publishing,
or payment changes without flagging them as approval-gated.

Respond ONLY as JSON:
{{"summary": "one-line plain-language summary for a tired founder",
  "opportunity": "biggest opportunity right now, one line",
  "risk": "biggest risk right now, one line",
  "confidence": "high|medium|low",
  "tasks": [{{"agent": "qa", "task": "short description",
             "metric": "which North Star metric this moves",
             "impact": "expected impact, one short phrase"}}]}}"""


def format_message(plan):
    lines = [f"<b>☀️ Today's plan — {TODAY}</b>", "", plan["summary"], ""]
    if plan.get("opportunity"):
        lines.append(f"🎯 <b>Opportunity:</b> {plan['opportunity']}")
    if plan.get("risk"):
        lines.append(f"⚠️ <b>Risk:</b> {plan['risk']}")
    if plan.get("opportunity") or plan.get("risk"):
        lines.append("")
    icons = {"dev": "💻", "qa": "🔍", "deploy": "🚀", "growth": "📈",
             "content": "✍️", "social": "📱", "analytics": "📊"}
    for t in plan["tasks"]:
        icon = icons.get(t["agent"], "•")
        extra = f" ({t['metric']})" if t.get("metric") else ""
        lines.append(f"{icon} <b>{t['agent']}</b>: {t['task']}{extra}")
    if plan.get("confidence"):
        lines += ["", f"Confidence: {plan['confidence']}"]
    lines += ["", "Tap Approve to run it, or Reject to skip and reply with changes."]
    return "\n".join(lines)


def main():
    print("Building plan context...")
    plan = lib_claude.ask_json(build_context())

    PLANS_DIR.mkdir(parents=True, exist_ok=True)
    header = f"# Plan {TODAY}\n\n{plan['summary']}\n"
    if plan.get("opportunity"):
        header += f"\nOpportunity: {plan['opportunity']}\n"
    if plan.get("risk"):
        header += f"\nRisk: {plan['risk']}\n"
    (PLANS_DIR / f"{TODAY}.md").write_text(
        header + "\n" +
        "\n".join(f"- **{t['agent']}**: {t['task']}" for t in plan["tasks"]) + "\n"
    )

    msg = format_message(plan)
    print("Sending plan to Telegram...")
    tg.approve_reject(msg, job_id=f"plan-{TODAY}")
    print("Done.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        try:
            tg.send(f"⚠️ Orchestrator failed: {e}")
        except Exception:
            pass
        sys.exit(1)
