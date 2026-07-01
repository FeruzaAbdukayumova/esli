/**
 * SEO Landing Page: Nursing Fundamentals Flashcards
 * Route: /flashcards/nursing-fundamentals
 * Meta title: Nursing Fundamentals Flashcards Free — AI | Esli (52 chars)
 * Meta description: Generate nursing fundamentals flashcards with AI. Safety, assessment, pharmacology basics — free, spaced repetition. No signup needed. (140 chars)
 * Target keywords: nursing fundamentals flashcards, NCLEX fundamentals flashcards, nursing assessment flashcards, nursing safety flashcards, fundamentals of nursing AI
 * Week: 2026-W27
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
      name: 'What topics should nursing fundamentals flashcards cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Core nursing fundamentals topics include: patient safety and fall prevention, vital signs assessment, asepsis and infection control, medication administration rights, wound care, oxygen therapy, fluid and electrolyte balance, pain assessment, body mechanics, and therapeutic communication. Esli generates cards for all of these — just type the topic or upload your fundamentals textbook chapter.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are these flashcards aligned with NCLEX nursing fundamentals questions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. When generating cards, you can specify "NCLEX-style" to get question stems formatted as NCLEX Next Generation questions — with clinical scenarios, priority-setting, and select-all-that-apply formats. Fundamentals is one of the largest tested domains on NCLEX, covering safety, basic care, and health promotion.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my Fundamentals of Nursing textbook PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Kozier & Erb, Potter & Perry, Taylor\'s Fundamentals, or your professor\'s lecture slides — and Esli extracts the key concepts, procedures, and definitions into a study-ready flashcard deck. Works for individual chapters or full units.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from pre-made nursing flashcard decks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pre-made decks cover standardised content but cannot match your specific course, professor, or clinical rotation. Esli generates cards from your own materials — your lecture notes, your textbook edition, your clinical scenarios. You can also generate cards the night before a clinical to review exactly what you\'ll encounter, something no pre-made deck can do.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for nursing students beyond fundamentals?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. After fundamentals, use Esli for medical-surgical nursing, maternal-newborn, paediatrics, psychiatric nursing, pharmacology, and NCLEX prep. The same AI generation and spaced repetition workflow scales across your entire nursing programme — you build your own master deck over 2-4 years rather than buying new resources each semester.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the "6 rights" of medication administration?',
    a: 'Right Patient, Right Drug, Right Dose, Right Route, Right Time, Right Documentation. Many programmes add Right Reason and Right Response (8 rights). Verify patient with two identifiers before every administration.',
  },
  {
    q: 'What is the Morse Fall Scale and when is it used?',
    a: 'A validated 6-item tool for fall risk assessment: history of falls, secondary diagnosis, ambulatory aid, IV/heparin lock, gait, and mental status. Scores ≥45 = high risk. Reassess after falls, medication changes, or transfer.',
  },
  {
    q: 'Describe the steps of surgical hand asepsis (surgical scrub).',
    a: 'Remove jewellery → clean under nails with pick → wet hands and apply antimicrobial soap → scrub each finger, interdigital space, hand, and arm for 2-5 min (time or counted-stroke method) → rinse hands-up so water flows toward elbows → dry with sterile towel hand-to-elbow.',
  },
  {
    q: 'What is Maslow\'s hierarchy and how does it guide nursing priority-setting?',
    a: 'Physiological (airway, breathing, circulation, fluid, nutrition) > Safety > Love/Belonging > Esteem > Self-actualisation. In NCLEX priority questions: address physiological threats first, then safety, then psychosocial needs. Airway always trumps all.',
  },
  {
    q: 'What does SBAR stand for and when do nurses use it?',
    a: 'Situation - Background - Assessment - Recommendation. Used for structured communication during handoffs and when escalating patient status to a physician. Reduces communication errors by ensuring the receiver has all the context needed to respond appropriately.',
  },
  {
    q: 'What are the signs of fluid volume deficit (dehydration)?',
    a: 'Decreased skin turgor, dry mucous membranes, sunken eyes, decreased urine output (<30 mL/hr), concentrated urine (dark yellow, SG >1.030), tachycardia, hypotension, orthostatic changes, weight loss. Lab: elevated BUN, Na+, hematocrit.',
  },
]

const benefits = [
  {
    title: 'Generate cards from your exact textbook',
    body: 'Upload Potter & Perry, Kozier & Erb, or your professor\'s slides. Esli creates cards from your materials, not a generic deck.',
  },
  {
    title: 'NCLEX-format questions on demand',
    body: 'Specify "NCLEX NGN style" to get clinical scenario questions with priority-setting and select-all-that-apply formats for exam prep.',
  },
  {
    title: 'Covers procedures, not just definitions',
    body: 'Generate cards for nursing procedures step-by-step: Foley insertion, NG tube insertion, wound irrigation — in the exact order you need to remember them.',
  },
  {
    title: 'Grows with you through your whole programme',
    body: 'Use the same Esli account from Fundamentals through NCLEX. Build a master nursing deck over 2-4 years, reviewed on a spaced repetition schedule.',
  },
]

export default function NursingFundamentalsFlashcardsPage() {
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
                <span className="text-primary-600">Nursing Fundamentals</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any fundamentals topic or upload your textbook chapter and get a complete flashcard deck in seconds. Safety, assessment, medication administration, NCLEX prep — free, with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Patient Safety', 'Vital Signs', 'Medication Rights', 'Asepsis', 'Wound Care', 'NCLEX Fundamentals', 'Fluid Balance', 'Patient Assessment'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 border border-primary-200 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Nursing Flashcards Free
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
                Master nursing fundamentals in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From lecture notes to study-ready deck — in the time it takes to make a coffee.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic or upload a PDF',
                  body: 'Enter "medication administration safety", "NCLEX fall prevention", or upload your Potter & Perry chapter. Esli reads it instantly.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering procedures, definitions, rationales, and NCLEX-style priority questions — tailored to your exact materials.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm surfaces cards at the optimal moment so you retain everything before your clinical or exam — not just the night before.',
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
                Example nursing fundamentals flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-48 cursor-pointer [perspective:1200px]"
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
                Generate Your Nursing Deck Free
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
                Why nursing students choose Esli
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
                Nursing fundamentals flashcard FAQs
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
              Ace nursing fundamentals — starting today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Upload your textbook chapter or type any topic and get a complete flashcard deck in seconds. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Nursing Flashcards Free
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
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">Medical Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
