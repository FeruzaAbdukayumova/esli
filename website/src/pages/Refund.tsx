import { Link } from 'react-router-dom'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'

const LAST_UPDATED = '2026-04-27'
const CONTACT_EMAIL = 'support@esli.app'

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Refund Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate max-w-none space-y-8 leading-relaxed">
          <section>
            <p>
              We want you to be happy with Esli. This Refund Policy explains when
              you can request a refund for your subscription and how to do it.
              Payments are processed by Paddle, our merchant of record.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">1. 14-day money-back guarantee</h2>
            <p>
              If you purchase a Pro or Premium subscription and decide it is not
              right for you, you can request a full refund within{' '}
              <strong>14 days</strong> of the initial purchase. No questions asked.
            </p>
            <p>This guarantee applies only to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>The first payment of a new subscription (monthly or annual)</li>
              <li>Requests received within 14 days of that payment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">2. Renewals</h2>
            <p>
              Subscription renewals (monthly or annual) are non-refundable. To
              avoid being charged for the next period, cancel your subscription
              before the renewal date. Cancelling takes effect at the end of the
              current billing period — you keep access to paid features until
              then.
            </p>
            <p>
              You can cancel any time from your account settings or by emailing{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">3. Exceptional cases</h2>
            <p>
              Outside the 14-day window, we may issue refunds at our discretion in
              cases such as:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Significant, prolonged service outages that materially affect your ability to use the Service</li>
              <li>Duplicate or accidental charges</li>
              <li>Unauthorized charges (please also contact your bank)</li>
            </ul>
            <p>
              Statutory consumer rights in your country of residence (for example,
              EU/UK distance-selling rules) continue to apply where they are more
              favorable than this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">4. What is not refundable</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Free tier usage (no payment was made)</li>
              <li>Promotional or gift-code unlocks</li>
              <li>Subscription periods that have already started, beyond the 14-day window</li>
              <li>Charges older than 60 days, except where required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">5. How to request a refund</h2>
            <p>
              Email{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">
                {CONTACT_EMAIL}
              </a>{' '}
              with:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>The email address on your Esli account</li>
              <li>The approximate date of purchase</li>
              <li>A short reason for the refund (optional, helps us improve)</li>
            </ul>
            <p>
              We aim to reply within 2 business days. Approved refunds are returned
              to your original payment method via Paddle and typically appear
              within 5-10 business days, depending on your bank.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">6. Changes to this policy</h2>
            <p>
              We may update this Refund Policy from time to time. The version in
              effect at the time of your purchase governs that purchase.
            </p>
            <p className="mt-6">
              <Link to="/" className="text-indigo-600 hover:underline">← Back to home</Link>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
