# Paddle Integration

Subscription payments via Paddle (merchant of record).

- **Status:** Live in production, 0 paying customers yet (checked 2026-11-27)
- **Plans:** Pro $5/mo or $49/yr, Premium $12/mo or $99/yr

## Where things stand (2026-11-27)

- Paddle live account approved 2026-04-29 ("Your account is live").
- Railway `esli` service runs `PADDLE_ENV=production` with live API key, live client token, 4 live price IDs and a webhook secret.
- `GET api.esli.app/api/v1/billing/plans` returns `paddle_env: production` and the live token.
- Sandbox checkout tested end to end (Esli Pro monthly $5, test card 4242), last 2026-10-30.
- Paddle live API: 0 subscriptions.

## Known gaps

- Live API key permissions too narrow: it can read subscriptions but gets 403 on customers, portal sessions and subscription cancel. "Manage subscription" and in-app cancel fail until a key with those permissions is put on Railway.
- Webhook destination URL and subscribed events can't be read with the current key; confirm in the dashboard that it points to `https://api.esli.app/api/v1/billing/webhook`.
- Payout verification happens after the first real sale (Paddle emails instructions).

## Fixed 2026-11-27

- Webhook now creates the missing subscription row for a user that exists but has none, instead of dropping the payment.
- Paid users see "Manage subscription" (Paddle portal) instead of "Upgrade", which used to open a second checkout and would double-charge.
- `/billing/subscription` returns `has_paid_subscription`.
