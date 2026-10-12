# Setup — turning the team on

The agents run on your **existing $100 Max plan**, not a paid API key. So the setup is tiny now.

## What changed

- ❌ No Anthropic API key (no second bill)
- ❌ No Cloudflare needed for phase 1
- ✅ Agents run Claude Code headless using a token from your Max subscription

---

## Phase 1 — autonomous planning + drafting (only 1 thing from you)

This gives you: every morning the team plans the day, auto-generates the safe drafts (content, SEO, growth notes, QA report), and sends it all to your Telegram. Code/deploy stays manual.

### The one thing you do (2 min, free)

1. In a terminal:
   ```
   claude setup-token
   ```
   It opens your browser, you approve, it prints a token (starts with `sk-ant-oat...`).
2. Copy that token.
3. Paste it to me in a Claude Code session, or add it yourself:
   - Go to https://github.com/FeruzaAbdukayumova/esli/settings/secrets/actions
   - **New repository secret** → name `CLAUDE_CODE_OAUTH_TOKEN`, value = the token

That's it. The daily plan runs at 8:00 Tashkent automatically.

The other secrets (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `AGENT_EMAIL`, `AGENT_PASSWORD`) are **already set** (I added them when I fixed daily-pulse).

### Test it
```
gh workflow run team-plan.yml
```
Within a minute you get the morning plan on Telegram.

---

## Phase 2 — the Approve / Reject buttons (optional, later)

The tap-a-button loop needs something always-on to catch the taps. Two ways, pick when you're ready:

- **Polling (simplest, free, no Cloudflare):** a GitHub Action checks Telegram every ~10 min for your taps. Nothing new to manage.
- **Cloudflare Worker (instant):** the `agents/telegram-bot/` worker catches taps in real time. Free tier, but one more thing to deploy.

Tell me which when you want phase 2 and I'll wire it. Until then, phase 1 already does the autonomous work and reports to you.

---

## Security cleanup (do once)

The Telegram bot token + agent password are in plaintext in `agents/daily_pulse.py` and old reports. Now that they're proper secrets, I should scrub them and you should rotate them. Ask me and I'll do the scrub in one pass.
