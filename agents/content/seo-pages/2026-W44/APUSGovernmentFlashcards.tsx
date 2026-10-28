/**
 * SEO Landing Page: AP US Government Flashcards
 * Route: /flashcards/ap-us-government
 * Meta title: AP US Government Flashcards Free — AI | Esli
 * Meta description: Generate AP US Government and Politics flashcards with AI. Constitutional amendments, federalism, civil liberties — free, spaced repetition. No signup.
 * Target keywords: AP US Government flashcards, AP Gov flashcards, AP Government and Politics flashcards
 * Week: 2026-W44
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
      name: 'Are AP US Government flashcards on Esli really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free to use. Generate unlimited AP Gov flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate AP US Government flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any AP Gov topic (e.g. "federalism types", "required Supreme Court cases", "electoral college") and our AI instantly creates a set of exam-ready Q&A flashcards. You can also upload a PDF of your notes or a review book chapter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover the required AP Gov foundational documents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate cards for all 9 required foundational documents (Constitution, Federalist 10, Federalist 51, Letter from Birmingham Jail, etc.) and all 15 required Supreme Court cases (Marbury v. Madison, McCulloch v. Maryland, etc.) — the exact content tested on the AP exam.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I make AP Gov flashcards from my textbook PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — your AP Government textbook chapters, teacher notes, or a Barron\'s review section — and Esli\'s AI will extract the key terms, court cases, and concepts and generate a complete flashcard deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Quizlet for AP Gov prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quizlet\'s free tier no longer includes spaced repetition or key study modes. Esli gives you unlimited AP Gov flashcards, AI generation, and full spaced repetition — all free, no account required to start. No paywall mid-exam season.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the 3 types of federalism tested on the AP Gov exam?',
    a: 'Dual federalism (layer cake — clear separation of state/federal powers), Cooperative federalism (marble cake — shared powers), and Competitive/New federalism (devolution — power returned to states). Modern US = cooperative with devolution trends.',
  },
  {
    q: 'What did McCulloch v. Maryland (1819) establish?',
    a: '(1) Congress has implied powers beyond those enumerated (necessary and proper clause), and (2) states cannot tax federal institutions. Marshall: "The power to tax is the power to destroy." Foundation for broad federal authority.',
  },
  {
    q: 'What are the 4 key arguments of Federalist No. 51?',
    a: '(1) Separation of powers prevents tyranny, (2) each branch needs tools to resist encroachment (checks and balances), (3) federalism as a double security (two levels of government), (4) "Ambition must be made to counteract ambition."',
  },
  {
    q: 'What is the difference between expressed, implied, and inherent presidential powers?',
    a: 'Expressed: explicitly in Article II (veto, commander in chief, treaty power). Implied: not stated but derived from expressed powers (executive privilege, executive orders). Inherent: claimed from office itself in national security matters (controversial — see Steel Seizure Case).',
  },
  {
    q: 'What did Tinker v. Des Moines (1969) decide?',
    a: 'Students do not "shed their constitutional rights at the schoolhouse gate." Schools cannot restrict student speech unless it causes a "substantial disruption." Black armbands = protected symbolic speech under 1st Amendment.',
  },
  {
    q: 'What are the 3 main linkage institutions in AP Gov?',
    a: 'Political parties (organize elections, coordinate government), interest groups (influence policy, lobby, PACs/Super PACs), and media (agenda-setting, framing, gatekeeping). Elections themselves are sometimes listed as a fourth.',
  },
]

const benefits = [
  { title: 'All 15 required court cases covered', body: 'Generate cards for every required Supreme Court case — from Marbury v. Madison to NFIB v. Sebelius — the exact cases the AP exam tests.' },
  { title: 'Upload your review materials', body: 'Turn Barron\'s, Princeton Review, or your teacher\'s slides into a fully organized flashcard deck. AI extracts the key concepts automatically.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Review sessions are timed optimally so you retain every term, case, and amendment through exam day.' },
  { title: 'Study anywhere, no signup needed', body: 'Access your AP Gov decks on any device. Guest mode means you can start studying before you even create an account.' },
]

export default function APUSGovernmentFlashcardsPage() {
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
                <span className="text-primary-600">AP US Government</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any AP Gov topic and get a complete set of exam-ready flashcards in seconds. All 15 required court cases, 9 foundational documents, and key vocabulary covered. No paywall, no signup required.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Constitutional Amendments', 'Federalism', 'Required Court Cases', 'Separation of Powers', 'Civil Liberties', 'Electoral College', 'Linkage Institutions', 'Bureaucracy'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate AP Gov Flashcards Free
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
                AP Gov prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full flashcard deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your AP Gov topic',
                  body: 'Enter anything — "required Supreme Court cases", "types of federalism", "constitutional amendments 1-27" — or upload your notes PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates AP-style Q&A cards with the key terms, case holdings, and document arguments — the exact detail level the exam tests.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards with the SM-2 algorithm. Every court case and amendment stays in memory through exam day in May.',
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
                Example AP Gov flashcards
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
                Generate Your AP Gov Deck Free
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
                Why AP students choose Esli
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

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                AP US Government flashcard FAQs
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
              Ready to score a 5 on AP Gov?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of AP students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate AP Gov Flashcards Free
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
              <a href="/flashcards/ap-biology" className="hover:text-white transition-colors no-underline">AP Biology</a>
              <a href="/flashcards/ap-chemistry" className="hover:text-white transition-colors no-underline">AP Chemistry</a>
              <a href="/flashcards/ap-physics" className="hover:text-white transition-colors no-underline">AP Physics</a>
              <a href="/use-case/high-school-students" className="hover:text-white transition-colors no-underline">High School Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
