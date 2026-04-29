/**
 * SEO Landing Page: AI Flashcards for Law Students
 * Route: /use-case/law-students
 * Meta title: AI Flashcards for Law Students — Free | Esli
 * Meta description: Esli generates law school flashcards instantly from any topic or PDF. Torts, contracts, constitutional law, bar exam — study smarter with AI + spaced repetition. Free.
 * Target keywords: AI flashcards for law school, law school flashcards, bar exam flashcards, law flashcards free, law school study app
 * Week: 2026-W18
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
      name: 'Is Esli free for law students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Law students can generate unlimited flashcards with AI, study with spaced repetition, and use all core features — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate law school flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any law topic — "negligence elements in torts", "consideration in contract formation", "First Amendment doctrine", "hearsay exceptions under FRE 803" — and the AI generates a complete deck of case-style and rule-based flashcards in seconds. You can also upload your casebook chapter, Barbri notes, or lecture outlines as PDF and Esli extracts the key rules and concepts automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help with bar exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate targeted flashcard decks for MBE subjects: Contracts, Torts, Criminal Law, Evidence, Real Property, Civil Procedure, and Constitutional Law. You can also target MEE subjects and essay writing frameworks. Esli\'s spaced repetition surfaces rules you\'re weakest on most frequently — critical when covering 7 MBE subjects.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my law school outlines or Barbri/Themis materials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — your own course outline, Barbri printed notes, Themis summary sheets, or professor\'s handouts — and Esli converts them into an active study flashcard deck. This is significantly faster than manually creating cards from dense legal outlines.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is using AI flashcards different from traditional law school Anki decks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pre-made Anki law decks (like the popular MBE decks) cover broad rules but may not match your professor\'s emphasis, your jurisdiction\'s nuances, or your specific weak areas. With Esli, you generate cards for exactly the doctrine your professor tested on in class, the cases your textbook emphasizes, or the areas where your practice exam scores are lowest. Custom decks outperform generic decks for targeted exam prep.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the elements of negligence in tort law?',
    a: 'DUTY: defendant owed plaintiff a legal duty of care. BREACH: defendant breached that duty by falling below the reasonable person standard. CAUSATION: actual (but-for) + proximate cause. DAMAGES: plaintiff suffered actual harm. Memory: D-B-C-D. No damages = no negligence claim.',
  },
  {
    q: 'What is the "mailbox rule" in contract law?',
    a: 'Acceptance is effective upon dispatch (when sent), not receipt. Applies to acceptances sent by mail or similar means. Exception: if offer specifies receipt required, or if offeree sends rejection first and it arrives before acceptance. UCC codifies this at § 2-206.',
  },
  {
    q: 'What is the "Chevron deference" doctrine?',
    a: 'Two-step test for judicial review of agency statutory interpretations. Step 1: Is the statute unambiguous? If yes, apply it. Step 2: If ambiguous, is the agency\'s interpretation reasonable? If yes, defer to it. Overruled by Loper Bright v. Raimondo (2024) — courts now use independent judgment.',
  },
  {
    q: 'Under the hearsay rule, what is an "opposing party\'s statement"?',
    a: 'FRE 801(d)(2): NOT hearsay if statement is offered against an opposing party and was made by: (a) the party themselves, (b) adopted by the party, (c) authorized agent, (d) employee on scope of employment, or (e) co-conspirator in furtherance of conspiracy. Commonly tested: employee admissions in civil cases.',
  },
  {
    q: 'What is adverse possession and what are its elements?',
    a: 'Adverse possession: acquiring title to land by occupying it. Elements (OCEAN): Open and notorious, Continuous (statutory period), Exclusive, Actual entry, Non-permissive (hostile/adverse). Minority states add "good faith" requirement. Statutory period varies by state (3-21 years).',
  },
  {
    q: 'What is the difference between specific and general intent crimes?',
    a: 'Specific intent: requires intent to bring about a specific result beyond the act itself. Examples: assault (intent to cause apprehension), larceny (intent to permanently deprive), burglary (intent to commit crime inside). General intent: only requires intent to do the act. Examples: battery, rape, kidnapping. Distinction matters for: voluntary intoxication defense, mistake of fact defense.',
  },
]

const benefits = [
  { title: 'All 7 MBE subjects covered', body: 'Contracts, Torts, Criminal Law, Evidence, Real Property, Civil Procedure, Constitutional Law — generate targeted decks per subject, sub-topic, or doctrine in seconds.' },
  { title: 'Upload your outlines and prep materials', body: 'Upload Barbri, Themis, your own course outlines, or casebook PDFs and Esli generates flashcards from your exact materials — not generic rule summaries.' },
  { title: 'SM-2 spaced repetition for dense doctrine', body: 'Law school requires mastering thousands of rules, exceptions, and case holdings. Esli\'s spaced repetition ensures you review the hardest concepts most often.' },
  { title: 'Case law and rule-based cards', body: 'Generate cards for black-letter rules, landmark cases, multi-part tests, and exceptions — the three formats that appear most on bar exams and law school finals.' },
]

const subjectAreas = [
  { subject: 'Torts', example: 'negligence, strict liability, intentional torts, defenses' },
  { subject: 'Contracts', example: 'offer/acceptance, consideration, defenses, remedies' },
  { subject: 'Constitutional Law', example: 'First Amendment, due process, equal protection, commerce clause' },
  { subject: 'Criminal Law', example: 'mens rea, actus reus, defenses, specific crimes' },
  { subject: 'Evidence', example: 'hearsay, FRE 404(b), privileges, authentication' },
  { subject: 'Real Property', example: 'adverse possession, easements, future interests, landlord-tenant' },
]

export default function AIFlashcardsLawStudentsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* ── Navbar ── */}
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

        {/* ── Hero ── */}
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
                <span className="text-primary-600">AI Flashcards</span>{' '}
                for Law Students — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate law school flashcards instantly from any topic or PDF. Torts, contracts, constitutional law, bar exam prep — study smarter with AI and spaced repetition.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Law Flashcards Free
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

        {/* ── Pain Points ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Law school has a study problem. Esli solves it.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  problem: 'Your casebook covers 500 pages. You need 50 core rules.',
                  solution: 'Upload the chapter as PDF → Esli extracts the key rules, elements, and holdings as flashcards.',
                },
                {
                  problem: 'Pre-made Anki law decks don\'t match your professor\'s emphasis.',
                  solution: 'Generate a custom deck from your professor\'s lecture notes — targeted to exactly what will be tested.',
                },
                {
                  problem: 'Bar prep covers 7 MBE subjects. You don\'t know your weakest area.',
                  solution: 'Study with spaced repetition — Esli automatically surfaces the rules you get wrong most often.',
                },
                {
                  problem: 'Creating flash cards manually takes hours you don\'t have.',
                  solution: 'Type a topic, get a deck in 10 seconds. Spend your time studying, not creating cards.',
                },
              ].map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
                  <p className="text-sm text-slate-400 line-through mb-2">{item.problem}</p>
                  <div className="flex items-start gap-2 mt-3">
                    <div className="w-5 h-5 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-primary-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-800">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Build your law deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a targeted study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic',
                  body: 'Enter anything — "negligence elements and defenses", "MBE contracts formation rules", "constitutional law First Amendment doctrine" — or upload your outline or casebook PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates rule-based and case-analysis flashcards — elements tests, landmark case holdings, multi-factor balancing tests — in the format that matches law school exams.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm resurfaces rules you get wrong most often. With thousands of doctrines to master for the bar, optimized review scheduling is not optional.',
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

        {/* ── Subject Areas ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Generate flashcards for any law subject
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                All 7 MBE subjects and beyond — 1L through bar prep.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {subjectAreas.map((area, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all">
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{area.subject}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{area.example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Sample Cards ── */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example law school flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-44 cursor-pointer [perspective:1200px]"
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
                Generate Your Law Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why law students choose Esli
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
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Law school flashcard FAQs
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

        {/* ── Final CTA ── */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to master the law?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for every law school subject and bar exam topic. Any doctrine, in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Law Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
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
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">Medical Students</a>
              <a href="/use-case/college-students" className="hover:text-white transition-colors no-underline">College Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
