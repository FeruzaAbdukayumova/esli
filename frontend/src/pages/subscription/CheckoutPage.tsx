import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Loader2, CreditCard } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { usePlans } from '@/features/subscription/hooks'
import { getPaddle } from '@/features/billing/paddle'

/**
 * Paddle's "default payment link" page.
 *
 * Paddle sends customers here with `?_ptxn=txn_...` from payment links and
 * from "update your payment method" emails (e.g. after a failed renewal).
 * Initializing Paddle.js on a page with `_ptxn` in the URL makes it open the
 * checkout for that transaction automatically, so this page only has to load
 * Paddle and show a friendly state around it. Works without being signed in.
 */
export function CheckoutPage() {
  const { t } = useTranslation()
  const [params] = useSearchParams()
  const txn = params.get('_ptxn')
  const { data: plans, isError } = usePlans()
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!txn || !plans) return
    const token = plans.paddle_client_token
    const env = plans.paddle_env
    if (!token || !env) {
      setFailed(true)
      return
    }
    getPaddle(token, env)
      .then((paddle) => {
        if (!paddle) setFailed(true)
      })
      .catch(() => setFailed(true))
  }, [txn, plans])

  const showError = !txn || failed || isError

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="sheet max-w-md w-full text-center p-6 sm:p-8">
        <div className="sticker mx-auto mb-5 flex h-16 w-16 items-center justify-center bg-white -rotate-3">
          {showError ? (
            <CreditCard className="h-8 w-8 text-ink" strokeWidth={2.5} aria-hidden />
          ) : (
            <Loader2 className="h-8 w-8 text-ink animate-spin" strokeWidth={2.5} aria-hidden />
          )}
        </div>
        <h1 className="font-display text-[1.75rem] leading-[1.1] text-fg mb-2 [text-wrap:balance]">
          {showError
            ? t('checkout.errorTitle', 'This payment link is not working')
            : t('checkout.loadingTitle', 'Opening secure checkout')}
        </h1>
        <p className="text-base text-muted mb-6">
          {showError
            ? t(
                'checkout.errorMessage',
                'The link may be incomplete or expired. You can pick a plan on the pricing page instead.',
              )
            : t('checkout.loadingMessage', 'Payments are handled by Paddle. This takes a second.')}
        </p>
        {showError && (
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <Link to="/dashboard" className="btn-quiet min-h-[48px] px-5 text-[15px]">
              {t('subscription.goToDashboard')}
            </Link>
            <Link to="/pricing" className="btn-brand min-h-[48px] px-5 text-[15px]">
              {t('subscription.viewPlans')}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
