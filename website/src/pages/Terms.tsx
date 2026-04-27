import { Link } from 'react-router-dom'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'

const LAST_UPDATED = '2026-04-27'
const CONTACT_EMAIL = 'support@esli.app'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate max-w-none space-y-8 leading-relaxed">
          <section>
            <p>
              These Terms of Service ("Terms") govern your access to and use of
              Esli (the "Service"), provided by Esli ("we", "us"). By creating an
              account or using the Service, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">1. The Service</h2>
            <p>
              Esli is an AI-powered flashcard application that lets you create,
              study, and share spaced-repetition flashcards. The Service includes
              the web app at app.esli.app, the landing site at esli.app, and the
              Esli browser extension.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">2. Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities under your account. You
              agree to provide accurate registration information and to keep it
              up to date. You must be at least 13 years old to use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">3. Acceptable use</h2>
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Use the Service for any unlawful purpose</li>
              <li>Upload content that infringes copyright or other rights</li>
              <li>Attempt to bypass usage limits, security measures, or rate limits</li>
              <li>Reverse-engineer, scrape, or abuse the Service</li>
              <li>Use the Service to send spam or harass others</li>
              <li>Submit content that is illegal, harmful, or violates the rights of others</li>
            </ul>
            <p>We may suspend or terminate accounts that violate these rules.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">4. User content</h2>
            <p>
              You retain ownership of the decks, cards, and content you create
              ("User Content"). By using the Service, you grant us a limited
              license to store, process, and display your User Content solely as
              needed to operate the Service for you. You are solely responsible
              for the legality and accuracy of your User Content.
            </p>
            <p>
              If you mark a deck as public or share it, you grant other users the
              right to view, copy, and study from it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">5. AI-generated content</h2>
            <p>
              The Service uses third-party AI models to generate flashcards from
              the topics and files you submit. AI-generated content may contain
              errors, inaccuracies, or outdated information. You are responsible
              for reviewing and verifying any AI-generated content before relying
              on it, especially for medical, legal, financial, or academic
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">6. Subscriptions and billing</h2>
            <p>
              The Service offers a Free tier and paid subscription plans (Pro and
              Premium). Paid plans are billed monthly or annually in advance via
              Paddle, our merchant of record. By subscribing, you authorize Paddle
              to charge your payment method on a recurring basis.
            </p>
            <p>
              <strong>Cancellation.</strong> You can cancel any time from your
              account. Cancellation takes effect at the end of the current billing
              period, and you retain paid features until then.
            </p>
            <p>
              <strong>Refunds.</strong> Subscription fees are non-refundable except
              as required by law. Refund requests can be sent to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">
                {CONTACT_EMAIL}
              </a>{' '}
              and will be reviewed case by case.
            </p>
            <p>
              <strong>Price changes.</strong> We may change subscription pricing
              with at least 30 days' notice. Changes apply to your next billing
              cycle.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">7. Intellectual property</h2>
            <p>
              The Service, including its software, design, logos, and content
              (other than User Content), is owned by Esli and protected by
              copyright and other intellectual property laws. You may not copy,
              modify, or redistribute any part of the Service without permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">8. Disclaimers</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties
              of any kind, whether express or implied, including warranties of
              merchantability, fitness for a particular purpose, and
              non-infringement. We do not guarantee uninterrupted, error-free, or
              secure operation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">9. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Esli shall not be liable for
              any indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits or data, arising out of your use of the
              Service. Our total liability for any claim related to the Service is
              limited to the amount you paid us in the 12 months preceding the
              claim.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">10. Termination</h2>
            <p>
              You may terminate your account at any time. We may suspend or
              terminate your access if you violate these Terms or use the Service
              in a way that risks harm to us or other users. Upon termination, your
              right to use the Service ends immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">11. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be
              announced via the Service or by email. Continued use after a change
              means you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">12. Governing law</h2>
            <p>
              These Terms are governed by the laws of the Republic of Uzbekistan,
              without regard to conflict-of-laws rules. Disputes will be resolved
              in the competent courts of Uzbekistan, unless mandatory consumer
              protection laws of your country of residence apply.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">13. Contact</h2>
            <p>
              Questions about these Terms? Email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">
                {CONTACT_EMAIL}
              </a>.
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
