/**
 * SEO Landing Page: Esli vs Chegg
 * Route: /compare/chegg
 * Meta title: Esli vs Chegg — AI Flashcard App Comparison (49 chars)
 * Meta description: Comparing Esli and Chegg for flashcards? See how AI-generated decks stack up vs Chegg's tools. Free, honest comparison. (126 chars)
 * Target keywords: Chegg flashcards alternative, Chegg vs Esli, best flashcard app, Chegg flashcards free alternative
 * Week: 2026-W37
 */

import { ArrowRight, Sparkles, Check, X } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const comparisonRows = [
  { feature: 'AI flashcard generation from any topic', esli: true, chegg: false, note: 'Chegg has study Q&A but no topic-to-flashcard generator' },
  { feature: 'Generate flashcards from PDF upload', esli: true, chegg: false, note: 'Esli turns any PDF into a flashcard deck in seconds' },
  { feature: 'Spaced repetition (SM-2 algorithm)', esli: true, chegg: false, note: 'Chegg flashcards have no built-in SRS scheduling' },
  { feature: 'Free tier available', esli: true, chegg: true, note: 'Chegg has a limited free trial; most features require subscription' },
  { feature: 'No credit card to start', esli: true, chegg: false, note: 'Chegg Study requires payment info for full access' },
  { feature: 'Browser extension', esli: true, chegg: false, note: 'Esli extension works on Chrome, Firefox, Edge, Brave' },
  { feature: 'Guest mode (no account needed)', esli: true, chegg: false, note: 'Start using Esli instantly without signing up' },
  { feature: 'Textbook answer library', esli: false, chegg: true, note: 'Chegg\'s core product — millions of textbook solutions' },
  { feature: 'Expert Q&A', esli: false, chegg: true, note: 'Chegg Study connects students with subject-matter experts' },
  { feature: '14 interface languages', esli: true, chegg: false, note: 'Esli supports 14 languages for international students' },
  { feature: 'Community / shared decks', esli: true, chegg: true, note: 'Esli has 800+ premade cards; Chegg has user-shared sets' },
  { feature: 'KaTeX math support in cards', esli: true, chegg: false, note: 'Esli renders LaTeX math equations in flashcards' },
]

export default function EsliVsCheggPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="https://esli.app" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold text-slate-900">Esli</span>
          </a>
          <a
            href={`${APP_URL}/register`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors no-underline"
          >
            Get Started Free
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-slate-50 -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
              <Sparkles size={14} />
              Honest Comparison
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
              Esli vs Chegg
            </h1>
            <p className="mt-4 text-xl text-slate-600">
              Which is better for flashcards and studying?
            </p>

            <p className="mt-6 text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Chegg is primarily a textbook solutions and expert Q&A platform. Esli is an AI-powered flashcard generator with spaced repetition. They serve overlapping but distinct needs. Here is an honest side-by-side.
            </p>
          </div>
        </div>
      </section>

      {/* TL;DR summary boxes */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-primary-50 border border-primary-200 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="font-bold text-slate-900 text-lg">Esli</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                AI flashcard generator + spaced repetition. Type any topic or upload a PDF and get a complete flashcard deck in seconds. Free, no credit card required.
              </p>
              <p className="text-xs font-semibold text-primary-700 uppercase tracking-wide">Best for</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li>- Active recall and flashcard-based study</li>
                <li>- Generating custom decks from your own material</li>
                <li>- Spaced repetition and long-term retention</li>
                <li>- Language learning and vocab drilling</li>
              </ul>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="font-bold text-slate-900 text-lg">Chegg</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Textbook solutions, expert Q&A, and study help. Chegg's core product is getting answers to specific textbook problems from its library or live experts.
              </p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Best for</p>
              <ul className="mt-2 space-y-1 text-sm text-slate-700">
                <li>- Checking textbook problem answers</li>
                <li>- Getting expert help on specific questions</li>
                <li>- Test bank access for specific courses</li>
                <li>- Homework help with worked solutions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Feature comparison
          </h2>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 px-6 py-3">
              <div className="col-span-6 text-xs font-semibold text-slate-500 uppercase tracking-wide">Feature</div>
              <div className="col-span-2 text-xs font-semibold text-primary-600 uppercase tracking-wide text-center">Esli</div>
              <div className="col-span-2 text-xs font-semibold text-slate-500 uppercase tracking-wide text-center">Chegg</div>
              <div className="col-span-2 text-xs font-semibold text-slate-400 uppercase tracking-wide hidden sm:block">Note</div>
            </div>

            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-12 px-6 py-4 items-center ${i < comparisonRows.length - 1 ? 'border-b border-slate-100' : ''}`}
              >
                <div className="col-span-6 text-sm text-slate-800 font-medium pr-4">{row.feature}</div>
                <div className="col-span-2 flex justify-center">
                  {row.esli ? (
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-primary-600" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <X size={14} className="text-slate-400" />
                    </div>
                  )}
                </div>
                <div className="col-span-2 flex justify-center">
                  {row.chegg ? (
                    <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                      <Check size={14} className="text-slate-500" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center">
                      <X size={14} className="text-slate-300" />
                    </div>
                  )}
                </div>
                <div className="col-span-2 text-xs text-slate-400 leading-snug hidden sm:block">{row.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            The honest breakdown
          </h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Chegg is strong at textbook homework help</h3>
              <p className="text-slate-600 leading-relaxed">
                If you are stuck on a specific textbook problem and need a worked solution fast, Chegg's library and expert Q&A are genuinely useful. That is the product Chegg was built for. If your goal is "get past this problem set tonight," Chegg delivers. Esli is not competing with that use case.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Esli is built for active recall and retention</h3>
              <p className="text-slate-600 leading-relaxed">
                Looking up an answer and reading a solution is passive learning — it creates the illusion of understanding. Flashcard-based active recall (seeing a question and actively producing the answer) is one of the most evidence-backed study techniques in cognitive science. Esli builds in spaced repetition on top of active recall, so the material you study actually transfers to long-term memory — not just helps you finish tonight's homework.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Chegg's flashcard feature is an afterthought</h3>
              <p className="text-slate-600 leading-relaxed">
                Chegg does offer user-shared flashcard sets (inherited from the Flashcardmachine acquisition). But there is no AI generation, no spaced repetition scheduling, no PDF upload, and no way to create a custom deck from your own topic in seconds. If you want to use flashcards as a serious study method, you need a tool built for that — not a bolt-on feature of a homework help service.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Cost: Chegg requires a subscription; Esli is free</h3>
              <p className="text-slate-600 leading-relaxed">
                Chegg Study plans run around $14-20/month, and most features require providing payment information. Esli is free with no credit card required — the free plan includes unlimited AI flashcard generation, spaced repetition, and community decks. You can start in guest mode without even creating an account.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When to use each */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            When to use each
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-primary-200">
              <h3 className="font-semibold text-primary-700 mb-4">Use Esli when you want to:</h3>
              <ul className="space-y-2">
                {[
                  'Build a flashcard deck for any topic in seconds',
                  'Upload lecture slides or a textbook PDF and get cards instantly',
                  'Study with spaced repetition for an upcoming exam',
                  'Learn vocabulary in any of 14 languages',
                  'Study without paying or creating an account',
                  'Drill medical, law, or professional certification content',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Check size={14} className="text-primary-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-slate-200">
              <h3 className="font-semibold text-slate-600 mb-4">Use Chegg when you want to:</h3>
              <ul className="space-y-2">
                {[
                  'Look up a specific textbook problem answer',
                  'Get expert help on a question you are stuck on',
                  'Access step-by-step worked solutions for problem sets',
                  'Check your homework against a solution key',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check size={14} className="text-slate-400 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Try Esli free — no credit card needed
          </h2>
          <p className="text-primary-200 text-lg mb-8">
            Generate AI flashcards from any topic or PDF. Spaced repetition built in. No subscription, no signup required to start.
          </p>
          <a
            href={`${APP_URL}/register`}
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
          >
            Generate Flashcards Free
            <ArrowRight size={18} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a href="https://esli.app" className="flex items-center gap-2 justify-center mb-4 no-underline">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-lg font-bold text-white">Esli</span>
          </a>
          <p className="text-sm">AI-powered flashcards with spaced repetition. Free forever.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm">
            <a href="https://esli.app" className="hover:text-white transition-colors no-underline">Home</a>
            <a href="/compare/anki" className="hover:text-white transition-colors no-underline">Esli vs Anki</a>
            <a href="/compare/quizlet" className="hover:text-white transition-colors no-underline">Esli vs Quizlet</a>
            <a href="/compare/best-flashcard-app" className="hover:text-white transition-colors no-underline">Best Flashcard App</a>
            <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
          </div>
          <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
