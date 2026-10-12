"""Claude wrapper for Esli agents.

Runs Claude Code in headless mode (`claude -p`) so the agents bill against
Feruza's Max subscription via CLAUDE_CODE_OAUTH_TOKEN, instead of a separate
pay-per-token Anthropic API key.

Requires `claude` on PATH and CLAUDE_CODE_OAUTH_TOKEN in the environment
(minted once with `claude setup-token`).
"""

import json
import re
import subprocess


def ask(prompt, *, model="sonnet", timeout=180):
    """Run a single headless Claude turn, return the text answer.

    Tools are disabled (--allowed-tools "") so it's a clean completion with no
    file access or side effects."""
    proc = subprocess.run(
        ["claude", "-p", prompt,
         "--output-format", "json",
         "--allowed-tools", "",
         "--model", model],
        capture_output=True, text=True, timeout=timeout,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"claude failed ({proc.returncode}): {proc.stderr[:500]}")
    payload = json.loads(proc.stdout)
    if payload.get("is_error"):
        raise RuntimeError(f"claude error: {payload.get('result', 'unknown')[:500]}")
    return payload["result"]


def ask_json(prompt, *, model="sonnet", timeout=180):
    """Like ask(), but expects the answer to be JSON and parses it.

    Tolerant of code fences or stray prose: falls back to extracting the
    outermost {...} block if a direct parse fails."""
    text = ask(prompt, model=model, timeout=timeout).strip()
    text = text.removeprefix("```json").removeprefix("```").removesuffix("```").strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if not match:
            raise
        return json.loads(match.group(0))
