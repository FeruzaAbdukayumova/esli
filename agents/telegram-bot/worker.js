/**
 * Esli Team Bot — Cloudflare Worker
 *
 * The always-on "front desk". It does two things:
 *  1. Receives Telegram updates (button taps + text messages) via webhook.
 *  2. Translates them into GitHub Actions runs (repository_dispatch).
 *
 * Your PC stays off — this runs on Cloudflare's free tier 24/7.
 *
 * Secrets (set with `wrangler secret put <NAME>`):
 *   TELEGRAM_BOT_TOKEN   — same bot token the agents use
 *   TELEGRAM_CHAT_ID     — your chat id (only you may command the team)
 *   WEBHOOK_SECRET       — random string; Telegram sends it back to prove it's really Telegram
 *   GITHUB_TOKEN         — fine-grained PAT with Actions: read/write on the esli repo
 *   GITHUB_REPO          — "FeruzaAbdukayumova/esli"
 */

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Esli Team Bot is alive.", { status: 200 });
    }

    // Verify the request really came from Telegram (webhook secret header).
    const secret = request.headers.get("X-Telegram-Bot-Api-Secret-Token");
    if (secret !== env.WEBHOOK_SECRET) {
      return new Response("forbidden", { status: 403 });
    }

    const update = await request.json().catch(() => null);
    if (!update) return new Response("ok"); // ignore malformed

    try {
      if (update.callback_query) {
        await handleButton(update.callback_query, env);
      } else if (update.message && update.message.text) {
        await handleText(update.message, env);
      }
    } catch (err) {
      await tg(env, "sendMessage", {
        chat_id: env.TELEGRAM_CHAT_ID,
        text: `⚠️ Bot error: ${err.message}`,
      });
    }
    return new Response("ok");
  },
};

// --- Button taps: approve / reject ------------------------------------------

async function handleButton(cb, env) {
  if (String(cb.message.chat.id) !== String(env.TELEGRAM_CHAT_ID)) return;

  const [action, ...rest] = cb.data.split(":");
  const jobId = rest.join(":");

  // Acknowledge the tap so the spinner stops on her phone.
  await tg(env, "answerCallbackQuery", { callback_query_id: cb.id });

  if (action === "approve") {
    await dispatch(env, "approve", { job_id: jobId });
    await editToStatus(env, cb.message, `✅ Approved — running now (${jobId})`);
  } else if (action === "reject") {
    await dispatch(env, "reject", { job_id: jobId });
    await editToStatus(env, cb.message, `✖️ Rejected (${jobId}). Reply with what to change.`);
  }
}

// --- Free-text commands: "qa the study page", "/plan", etc. -----------------

async function handleText(msg, env) {
  if (String(msg.chat.id) !== String(env.TELEGRAM_CHAT_ID)) return;
  const text = msg.text.trim();

  if (text === "/start" || text === "/help") {
    return tg(env, "sendMessage", {
      chat_id: env.TELEGRAM_CHAT_ID,
      text:
        "👋 Esli Team Bot.\n\n" +
        "You mostly just tap Approve / Reject on the daily plan.\n\n" +
        "Optional commands:\n" +
        "• /plan — make a new plan now\n" +
        "• /status — what's running\n" +
        "• any sentence — sent to the Chief of Staff as a request",
    });
  }

  if (text === "/plan") {
    await dispatch(env, "run_orchestrator", {});
    return tg(env, "sendMessage", { chat_id: env.TELEGRAM_CHAT_ID, text: "🧠 Making a plan…" });
  }

  if (text === "/status") {
    await dispatch(env, "status", {});
    return tg(env, "sendMessage", { chat_id: env.TELEGRAM_CHAT_ID, text: "📋 Checking…" });
  }

  // Anything else = a free-text request to the Chief of Staff.
  await dispatch(env, "request", { text });
  return tg(env, "sendMessage", {
    chat_id: env.TELEGRAM_CHAT_ID,
    text: "📨 Passed to the Chief of Staff. It'll come back with a plan.",
  });
}

// --- Helpers ----------------------------------------------------------------

function dispatch(env, eventType, payload) {
  return fetch(`https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: "application/vnd.github+json",
      "User-Agent": "esli-team-bot",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event_type: eventType, client_payload: payload }),
  }).then((r) => {
    if (!r.ok) throw new Error(`GitHub dispatch ${r.status}`);
  });
}

function tg(env, method, body) {
  return fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function editToStatus(env, message, text) {
  // Replace the buttons with a final status line so she can't double-tap.
  return tg(env, "editMessageText", {
    chat_id: message.chat.id,
    message_id: message.message_id,
    text: `${message.text}\n\n${text}`,
    parse_mode: "HTML",
  });
}
