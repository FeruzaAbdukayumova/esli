/**
 * SEO Landing Page: Constitutional Law Flashcards
 * Route: /flashcards/constitutional-law
 * Meta title: Constitutional Law Flashcards Free — AI Generator | Esli
 * Meta description: Generate con law flashcards with AI. Supreme Court cases, constitutional
 *   doctrine, amendments — free, spaced repetition. No signup needed.
 * Target keywords: constitutional law flashcards, con law flashcards, Supreme Court cases
 *   flashcards, constitutional law study cards, first amendment flashcards, law school con law
 * Week: 2026-W33
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are constitutional law flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited con law flashcards with AI, study Supreme Court cases with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What constitutional law topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli can generate flashcards for any con law topic: First Amendment (free speech, religion clauses), equal protection and due process, commerce clause, individual rights, constitutional structure (federalism, separation of powers), and specific landmark cases (Marbury, McCulloch, Brown, Roe, Dobbs, etc.). Just describe your specific topic or upload your casebook PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with memorizing Supreme Court cases for con law?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates cards in the exact format law school exams test: case name on the front, then holding, key doctrine/test established, relevant constitutional provision, and the narrowest accurate reading of the rule on the back. You can also prompt it to generate "issue spotter" cards that present a fact pattern and ask you to identify the constitutional issue — perfect for practicing the IRAC structure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my con law casebook chapters to make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your casebook chapter (Sullivan & Gunther, Chemerinsky, etc.) or your own case briefs PDF, and Esli extracts the key holdings, tests, and constitutional doctrines and converts them into flashcards automatically. Especially useful for building comprehensive decks before bar exam or final exams.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for bar exam constitutional law prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Constitutional law is a major MBE subject on the bar exam. Esli\'s AI generates cards covering the exact doctrines and multi-part tests the bar tests (rational basis, intermediate scrutiny, strict scrutiny; Lemon test; Chevron deference). For dedicated bar exam prep, see our bar exam flashcards page.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What three-part test does the Supreme Court use for Establishment Clause challenges? (Lemon v. Kurtzman, 1971)',
    a: 'Lemon Test: (1) Secular purpose — statute must have a secular legislative purpose; (2) Primary effect — principal effect must neither advance nor inhibit religion; (3) Entanglement — must not foster excessive government entanglement with religion. Note: partially displaced by Kennedy v. Bremerton (2022).',
  },
  {
    q: 'What is the holding in Marbury v. Madison (1803) and what constitutional principle does it establish?',
    a: 'Holding: Marbury had a legal right to his commission but the Court lacked jurisdiction under Article III because Congress cannot expand original jurisdiction. Principle: Establishes judicial review — federal courts can invalidate laws inconsistent with the Constitution.',
  },
  {
    q: 'What is the difference between strict scrutiny, intermediate scrutiny, and rational basis review?',
    a: 'Strict scrutiny: law must be narrowly tailored to a compelling government interest (used for suspect classifications: race, national origin; fundamental rights). Intermediate scrutiny: substantially related to important government interest (sex, legitimacy). Rational basis: rationally related to legitimate government interest (general default — highly deferential).',
  },
  {
    q: 'What did Shelby County v. Holder (2013) hold and why does it matter?',
    a: 'Held: Section 4(b) of the Voting Rights Act (coverage formula for preclearance) unconstitutional — formula based on 40-year-old data no longer reflects current conditions. Effect: Gutted Section 5 preclearance requirement for historically discriminatory states. Key doctrine: "equal sovereignty" of states.',
  },
  {
    q: 'Under the Commerce Clause, what are the three categories of activity Congress can regulate? (United States v. Lopez, 1995)',
    a: '(1) Channels of interstate commerce; (2) Instrumentalities of interstate commerce and persons/things in interstate commerce; (3) Activities that substantially affect interstate commerce. Lopez held that gun possession near schools did not meet category 3 — no economic activity, no jurisdictional element.',
  },
  {
    q: 'What is the "non-delegation doctrine" and what is its current status?',
    a: 'Congress cannot delegate legislative power to executive agencies without an "intelligible principle" guiding the delegation. Current status: Dormant — Court has not struck down a statute on non-delegation grounds since 1935 (A.L.A. Schechter Poultry). Revived interest post-West Virginia v. EPA (2022) (major questions doctrine).',
  },
]

const benefits = [
  {
    title: 'Cases, holdings, and doctrines in one card',
    body: 'AI formats cards exactly how law school exams test — case name, holding, constitutional provision, and the rule it establishes. Not just names and dates.',
  },
  {
    title: 'Multi-part tests made memorable',
    body: 'Lemon test, strict scrutiny, dormant commerce clause — Esli generates cards that break down each element of every constitutional test so you can apply it issue-by-issue.',
  },
  {
    title: 'Upload your casebook and class notes',
    body: 'Turn 400 pages of Chemerinsky into flashcards in minutes. AI extracts holdings and doctrines automatically.',
  },
  {
    title: 'Spaced repetition for 200+ landmark cases',
    body: 'SM-2 algorithm prioritizes the cases you keep forgetting. From Marbury to Dobbs — no case falls through the cracks.',
  },
]

export default function ConstitutionalLawFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
        <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-50/30 -z-10" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-primary-700 bg-primary-100 rounded-full">
                <Sparkles size={14} />
                Free AI Flashcard Generator
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Generate{' '}
                <span className="text-primary-600">Constitutional Law Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any con law topic — landmark cases, constitutional tests, amendments, doctrine — and get precise flashcards in seconds. Perfect for law school finals and bar exam MBE prep.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['First Amendment', 'Equal Protection', 'Due Process', 'Commerce Clause', 'Supreme Court Cases', 'Strict Scrutiny', 'Federalism', 'Bar Exam MBE'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Con Law Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#sample-cards"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Example Cards
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Con law prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From casebook to a full study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your con law topic',
                  body: 'Enter "First Amendment free speech doctrine", "equal protection cases", "major questions doctrine" — or upload your casebook chapter PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates case cards',
                  body: 'AI creates cards with case names, holdings, constitutional tests, relevant provisions, and the narrowest accurate statement of each rule — exactly what exams test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 schedules review of each case at the optimal interval. Cases you keep forgetting (Chevron? Curtiss-Wright?) resurface more often until they stick.',
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-600/25">
                      <step.icon className="text-white" size={28} />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-primary-600 rounded-full flex items-center justify-center text-xs font-bold text-primary-600">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed max-w-xs mx-auto">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Cards */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example constitutional law flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-52 cursor-pointer [perspective:1200px]"
                  onClick={() => setFlippedCard(flippedCard === i ? null : i)}
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${
                      flippedCard === i ? '[transform:rotateY(180deg)]' : ''
                    }`}
                  >
                    <div className="absolute inset-0 bg-white rounded-2xl border border-slate-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden]">
                      <p className="text-xs text-slate-400 mb-2">Question</p>
                      <p className="text-sm font-medium text-slate-800 text-center leading-snug">{card.q}</p>
                      <p className="absolute bottom-3 right-4 text-xs text-slate-300">tap to flip</p>
                    </div>
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-center justify-center p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-sm text-slate-700 text-center leading-snug">{card.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href={`${APP_URL}/register`}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all no-underline"
              >
                Generate Your Con Law Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why law students choose Esli for con law
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-slate-900 mb-1">{b.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{b.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500">
                Also useful for:{' '}
                <a href="/flashcards/bar-exam" className="text-primary-600 hover:underline">Bar Exam</a>
                {' · '}
                <a href="/flashcards/lsat" className="text-primary-600 hover:underline">LSAT</a>
                {' · '}
                <a href="/use-case/law-students" className="text-primary-600 hover:underline">AI Flashcards for Law Students</a>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Constitutional law flashcard FAQs
              </h2>
            </div>
            <div className="space-y-3">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="flex items-center justify-between w-full px-6 py-4 text-left bg-transparent border-none cursor-pointer"
                  >
                    <span className="text-base font-medium text-slate-900">{item.name}</span>
                    <ChevronDown
                      size={20}
                      className={`text-slate-400 transition-transform shrink-0 ml-4 ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4">
                      <p className="text-slate-600 leading-relaxed">{item.acceptedAnswer.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to master constitutional law?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate case cards, doctrine cards, and multi-part test cards in seconds. Spaced repetition. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Con Law Flashcards Free
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
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
              <a href={`${APP_URL}/login`} className="hover:text-white transition-colors no-underline">Log In</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
