import { initializePaddle, type Paddle } from '@paddle/paddle-js'

type Env = 'sandbox' | 'production'

let paddlePromise: Promise<Paddle | undefined> | null = null

/**
 * Lazy-initializes Paddle.js exactly once per session.
 *
 * The token and env are fetched from the backend (`GET /billing/plans`)
 * rather than baked into a VITE_ env var — this way sandbox/production
 * switchover is driven entirely by the backend config without a rebuild.
 */
export function getPaddle(token: string, env: Env): Promise<Paddle | undefined> {
  if (paddlePromise) return paddlePromise
  paddlePromise = initializePaddle({ token, environment: env })
  return paddlePromise
}

export interface OpenCheckoutArgs {
  priceId: string
  email?: string
  userId: string
  successUrl?: string
}

export async function openPaddleCheckout(
  token: string,
  env: Env,
  { priceId, email, userId, successUrl }: OpenCheckoutArgs,
): Promise<void> {
  const paddle = await getPaddle(token, env)
  if (!paddle) throw new Error('Failed to initialize Paddle')

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customer: email ? { email } : undefined,
    customData: { user_id: userId },
    settings: { locale: 'en', ...(successUrl ? { successUrl } : {}) },
  })
}
