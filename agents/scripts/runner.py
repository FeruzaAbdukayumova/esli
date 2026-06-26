#!/usr/bin/env python3
"""Esli Agent Dispatch runner.

Called by .github/workflows/agent-dispatch.yml. Reads the GitHub event and
routes it to the right behaviour:

  approve  — execute the approved plan's tasks
  reject   — acknowledge, wait for the founder's change request
  request  — a free-text request from Telegram -> re-plan with that context
  status   — report what's queued

Text deliverables (content, social, growth, qa report) are produced directly by
Claude here. Code/deploy tasks are handed off to the code agent (next build
phase) and flagged as approval-gated, never run automatically.
"""

import os
import sys
from datetime import date
from pathlib import Path

import lib_telegram as tg
import lib_claude

ROOT = Path(__file__).resolve().parents[2]
TODAY = date.today().isoformat()

EVENT = os.environ.get("EVENT", "")
JOB_ID = os.environ.get("JOB_ID", "")
REQUEST_TEXT = os.environ.get("REQUEST_TEXT", "")

TEXT_AGENTS = {"content", "social", "growth", "qa"}
CODE_AGENTS = {"dev", "deploy"}


def read(path, n=6000):
    p = ROOT / path
    return p.read_text()[:n] if p.exists() else ""


def load_plan(job_id):
    # job_id looks like "plan-2026-06-26"
    stamp = job_id.replace("plan-", "")
    path = ROOT / "agents" / "reports" / "plans" / f"{stamp}.md"
    return path.read_text() if path.exists() else ""


def produce_deliverable(agent, task, plan_text):
    prompt = f"""You are the Esli {agent} agent. Product context:
{read('agents/config/agent-context.md', 2500)}

Your role:
{read('agents/config/roles.md', 4000)}

Today's approved plan:
{plan_text}

Your task: {task}

Produce the actual deliverable (the draft / report / posts). Be concrete and
ready to use. Use Feruza's external tone for public copy (professional, modern,
clean), internal tone for reports (bullets, direct). No em dashes."""
    body = lib_claude.ask(prompt)
    out_dir = ROOT / "agents" / ("content" if agent in {"content", "social"} else "reports") / agent
    out_dir.mkdir(parents=True, exist_ok=True)
    out_file = out_dir / f"{TODAY}.md"
    out_file.write_text(f"# {agent} — {TODAY}\n\nTask: {task}\n\n{body}\n")
    return out_file.relative_to(ROOT)


def parse_tasks(plan_text):
    """Pull '- **agent**: task' lines from a plan markdown file."""
    tasks = []
    for line in plan_text.splitlines():
        line = line.strip()
        if line.startswith("- **") and "**:" in line:
            agent = line.split("**")[1].strip().lower()
            task = line.split("**:", 1)[1].strip()
            tasks.append((agent, task))
    return tasks


def handle_approve():
    plan_text = load_plan(JOB_ID)
    if not plan_text:
        tg.send(f"✅ Approved {JOB_ID}, but I couldn't find the plan file. Send /plan to retry.")
        return

    tasks = parse_tasks(plan_text)
    done, handed_off = [], []
    for agent, task in tasks:
        if agent in TEXT_AGENTS:
            rel = produce_deliverable(agent, task, plan_text)
            done.append((agent, rel))
        elif agent in CODE_AGENTS:
            handed_off.append((agent, task))

    lines = ["<b>✅ Plan approved — here's what got done</b>", ""]
    for agent, rel in done:
        lines.append(f"• <b>{agent}</b>: draft ready → <code>{rel}</code>")
    for agent, task in handed_off:
        lines.append(f"• <b>{agent}</b>: queued for the code agent (approval-gated): {task}")
    if not done and not handed_off:
        lines.append("No actionable tasks found in the plan.")
    tg.send("\n".join(lines))


def handle_reject():
    tg.send(f"✖️ Skipped {JOB_ID}. Reply with what you'd like changed and I'll re-plan.")


def handle_request():
    """A free-text task from Telegram. Plan it, do the safe parts now, report."""
    prompt = f"""You are Esli's Chief of Staff. The founder texted this request:
"{REQUEST_TEXT}"

Context:
{read('context/current-priorities.md', 1500)}

Break it into 1-3 concrete tasks. Name the responsible agent for each
(dev, deploy, qa, growth, content, social). Respond ONLY as JSON:
{{"summary": "one line", "tasks": [{{"agent": "content", "task": "..."}}]}}"""
    plan = lib_claude.ask_json(prompt)

    done, handed_off = [], []
    for t in plan.get("tasks", []):
        agent, task = t.get("agent", "").lower(), t.get("task", "")
        if agent in TEXT_AGENTS:
            done.append((agent, produce_deliverable(agent, task, REQUEST_TEXT)))
        elif agent in CODE_AGENTS:
            handed_off.append((agent, task))

    lines = [f"<b>🧠 On it:</b> {plan.get('summary', '')}", ""]
    for agent, rel in done:
        lines.append(f"• <b>{agent}</b>: done → <code>{rel}</code>")
    for agent, task in handed_off:
        lines.append(f"• <b>{agent}</b>: needs your approval (code/deploy): {task}")
    if not done and not handed_off:
        lines.append("Couldn't turn that into a task. Try rephrasing?")
    tg.send("\n".join(lines))


def handle_status():
    tg.send("📋 Status: latest plan + reports live in the repo under agents/reports/. "
            "Tap Approve on the morning plan to run today's work.")


def main():
    print(f"Routing event: {EVENT} (job={JOB_ID})")
    {
        "approve": handle_approve,
        "reject": handle_reject,
        "request": handle_request,
        "status": handle_status,
    }.get(EVENT, lambda: tg.send(f"Unknown event: {EVENT}"))()


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"ERROR: {e}", file=sys.stderr)
        try:
            tg.send(f"⚠️ Runner failed on {EVENT}: {e}")
        except Exception:
            pass
        sys.exit(1)
