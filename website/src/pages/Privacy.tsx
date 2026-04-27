import { Link } from 'react-router-dom'
import Navbar from '../sections/Navbar'
import Footer from '../sections/Footer'

const LAST_UPDATED = '2026-04-27'
const CONTACT_EMAIL = 'support@esli.app'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-12">Last updated: {LAST_UPDATED}</p>

        <div className="prose prose-slate max-w-none space-y-8 leading-relaxed">
          <section>
            <p>
              This Privacy Policy describes how Esli ("we", "us", "our") collects,
              uses, and protects your information when you use the Esli web app at{' '}
              <span className="font-medium">app.esli.app</span>, the Esli landing
              site at <span className="font-medium">esli.app</span>, and the Esli
              browser extension (collectively, the "Service").
            </p>
            <p>
              By using the Service, you agree to the practices described here. If
              you do not agree, please do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">1. Information we collect</h2>

            <h3 className="text-lg font-semibold mt-6 mb-2">Account information</h3>
            <p>When you create an account, we collect:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Email address</li>
              <li>Username (optional, chosen by you)</li>
              <li>A hashed password (we never store your password in plain text), or an OAuth identifier if you sign in with Google</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-2">User content</h3>
            <p>
              We store the flashcard decks, cards, and study activity you create. We
              also store study scheduling data (intervals, ease factors) used by the
              spaced-repetition algorithm.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">Browser extension data</h3>
            <p>
              When you use the Esli browser extension, we process the text you
              explicitly select and choose to add as a flashcard. The extension does
              not silently read or transmit page contents — it only sends data when
              you actively invoke the right-click menu or popup. Your login token is
              stored in browser local storage so you stay signed in.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">Subscription information</h3>
            <p>
              If you purchase a paid plan, payment is processed by Paddle, our
              merchant of record. We do not see or store your card details. We
              receive the customer ID, subscription status, and billing period from
              Paddle.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-2">Usage data</h3>
            <p>
              We collect minimal anonymous analytics to understand how features are
              used (e.g. which pages are visited). We do not use third-party
              advertising trackers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">2. How we use your information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>To provide and operate the Service</li>
              <li>To save your decks and study progress across devices</li>
              <li>To generate AI flashcards from topics or PDFs you submit</li>
              <li>To process payments and manage subscriptions</li>
              <li>To respond to support requests</li>
              <li>To detect and prevent abuse</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">3. Third-party services</h2>
            <p>We share data with the following providers strictly to operate the Service:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Anthropic</strong> — AI flashcard generation (we send your topic or PDF text)</li>
              <li><strong>Paddle</strong> — payment processing (handles all card data)</li>
              <li><strong>Google</strong> — optional OAuth login</li>
              <li><strong>MyMemory</strong> — text translation when you use the translate feature</li>
              <li><strong>Cloudflare</strong> — content delivery and DNS</li>
            </ul>
            <p>
              We do not sell your data. We do not share it with advertisers. We do
              not share it for any purpose unrelated to operating the Service,
              except where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">4. Data storage and retention</h2>
            <p>
              Your data is stored on managed cloud infrastructure with industry-standard
              encryption in transit (HTTPS) and at rest. Account data is retained as
              long as your account is active. You can delete your account at any
              time, which permanently removes your decks, cards, and personal data
              from our active database within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">5. Your rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your account and data</li>
              <li>Export your decks and cards</li>
              <li>Withdraw consent and stop using the Service at any time</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-indigo-600 hover:underline">
                {CONTACT_EMAIL}
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">6. Cookies and local storage</h2>
            <p>
              We use first-party cookies and browser local storage to keep you
              signed in, remember your language and theme preferences, and persist
              guest-mode decks before account creation. We do not use third-party
              advertising or cross-site tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">7. Children's privacy</h2>
            <p>
              The Service is not directed to children under 13. We do not knowingly
              collect personal information from children under 13. If you believe a
              child has provided us with personal data, please contact us and we
              will delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">8. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be
              announced via the Service or by email. Continued use of the Service
              after a change constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mt-12 mb-4">9. Contact</h2>
            <p>
              Questions about this Privacy Policy? Email us at{' '}
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
