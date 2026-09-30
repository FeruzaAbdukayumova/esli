/**
 * SEO Landing Page: Criminal Law Flashcards
 * Route: /flashcards/criminal-law
 * Meta title: Criminal Law Flashcards Free — AI Generator | Esli
 * Meta description: Generate criminal law and MBE criminal procedure flashcards with AI.
 *   Bar exam prep, free, spaced repetition. No signup needed.
 * Target keywords: criminal law flashcards, criminal procedure flashcards,
 *   MBE criminal law flashcards, bar exam criminal law, criminal law study cards,
 *   criminal law bar prep, mens rea flashcards
 * Week: 2026-W40
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
      name: 'Are criminal law flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited criminal law and criminal procedure flashcards with AI — MPC elements, mens rea, defenses, constitutional criminal procedure — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What criminal law topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any criminal law or procedure topic: Model Penal Code (MPC) elements, actus reus and mens rea requirements, homicide degrees (murder, manslaughter, felony murder rule), theft crimes, inchoate offenses (attempt, conspiracy, solicitation), defenses (self-defense, insanity, duress, entrapment), constitutional criminal procedure (4th, 5th, 6th Amendment), Miranda, search and seizure, double jeopardy, and MBE-tested concepts.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me study criminal law for the bar exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Criminal Law and Criminal Procedure are two of the seven MBE subjects. Type "MBE criminal law" or specific topics like "homicide MBE", "4th Amendment exceptions MBE", "conspiracy elements bar exam" and Esli generates targeted flashcards. You can also upload bar prep outlines (Barbri, Themis, ADAPTIBAR PDFs) and Esli extracts the key rules automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between criminal law and criminal procedure for bar prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Criminal Law covers the substantive rules: what makes conduct criminal (elements, mens rea, defenses). Criminal Procedure covers the constitutional rules governing enforcement: searches and seizures (4th Amendment), self-incrimination (5th), right to counsel (6th), due process. Both are tested on the MBE — generate separate decks for each to keep them organized.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Anki for bar exam criminal law?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires you to create cards manually or download someone else\'s pre-made deck. Esli generates current, targeted criminal law flashcards from any topic or uploaded outline in seconds. Both use spaced repetition — Esli eliminates the card-creation work so you can focus on studying the rules.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the four MPC levels of culpability (mens rea) in order from most to least?',
    a: 'Purpose (conscious objective to cause result) > Knowledge (aware result is practically certain) > Recklessness (conscious disregard of substantial and unjustifiable risk) > Negligence (should have been aware of substantial risk). MPC default when unspecified: recklessness.',
  },
  {
    q: 'What is the common law felony murder rule and its MPC equivalent?',
    a: 'Common law: any killing during commission of a felony is murder, regardless of intent. Felony must be "inherently dangerous." MPC: no automatic felony murder — extreme recklessness (depraved indifference) required. MBE tests common law rule; know both distinctions.',
  },
  {
    q: 'Under the 4th Amendment, when is a warrantless search of a vehicle valid?',
    a: 'Automobile exception: probable cause that contraband or evidence is present (no exigency needed — Carroll doctrine). Also valid: search incident to arrest (limited to passenger compartment + containers), consent, plain view, inventory search at impound. Key: PC + no time to get warrant NOT required — PC alone suffices for cars.',
  },
  {
    q: 'What are the Miranda requirements and when do they apply?',
    a: 'Miranda warnings required when: (1) custodial (2) interrogation. Custody = formal arrest OR freedom restrained to degree of arrest (objective test). Interrogation = express questioning OR its functional equivalent (words/actions police should know are reasonably likely to elicit incriminating response). Routine booking questions exception. Waiver must be knowing, voluntary, intelligent.',
  },
  {
    q: 'What is the difference between attempt (common law) and the MPC attempt standard?',
    a: 'Common law: requires act in "dangerous proximity" to completion (last act, or very close). MPC: "substantial step" strongly corroborative of criminal purpose — much earlier in the conduct. Abandonment defense: complete, voluntary renunciation under MPC; generally not a defense at common law.',
  },
  {
    q: 'What are the elements of common law burglary vs. modern statutory burglary?',
    a: 'Common law burglary: breaking and entering of the dwelling house of another at nighttime with intent to commit a felony therein. (6 elements — all required.) Modern statutes: usually expand to any structure, remove nighttime requirement, include any crime (not just felony). MBE: know both; calls out "common law" specifically.',
  },
]

const benefits = [
  { title: 'MBE criminal law in one deck', body: 'Type "MBE criminal law and procedure" and get every tested rule, exception, and distinction covered — from homicide degrees to Miranda to the automobile exception.' },
  { title: 'Upload your bar prep outlines', body: 'Turn Barbri, Themis, or your own criminal law outline into a targeted flashcard deck automatically — AI extracts the rules from any PDF.' },
  { title: 'SM-2 spaced repetition', body: 'Criminal procedure rules you keep mixing up resurface more often until they\'re automatic — the same algorithm used by top bar passers.' },
  { title: 'Study anywhere', body: 'Your decks sync across browser, phone, and tablet. Review mens rea elements on your commute without losing study progress.' },
]

export default function CriminalLawFlashcardsPage() {
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
                <span className="text-primary-600">Criminal Law Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any criminal law or procedure topic and get a complete flashcard deck in seconds. MPC elements, mens rea, 4th/5th/6th Amendment, bar exam prep — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['MPC Elements', 'Mens Rea & Actus Reus', 'Homicide Degrees', 'Defenses', '4th Amendment', 'Miranda Rights', 'MBE Prep', 'Bar Exam'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Criminal Law Flashcards Free
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
                Criminal law in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From bar outline to MBE-ready — in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your criminal law topic',
                  body: 'Enter anything — "felony murder rule", "4th Amendment exceptions", "MPC mens rea levels", "Miranda requirements" — or upload your bar prep PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates high-yield Q&A cards covering rule elements, MPC vs. common law distinctions, constitutional requirements, and key exceptions.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with the SM-2 algorithm. Rules you keep confusing resurface more often until the right analysis is automatic on bar day.',
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
                Example criminal law flashcards
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
                Generate Your Criminal Law Deck Free
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
                Why law students choose Esli for criminal law
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
                Criminal law flashcard FAQs
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
              Ready to master criminal law and procedure?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join law students generating smarter bar prep flashcards with AI. Free forever, no signup needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Criminal Law Flashcards Free
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
              <a href="/flashcards/bar-exam" className="hover:text-white transition-colors no-underline">Bar Exam Flashcards</a>
              <a href="/flashcards/constitutional-law" className="hover:text-white transition-colors no-underline">Constitutional Law</a>
              <a href="/use-case/law-students" className="hover:text-white transition-colors no-underline">AI for Law Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
