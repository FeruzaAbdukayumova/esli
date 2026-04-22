/**
 * SEO Landing Page: NCLEX Flashcards
 * Route: /flashcards/nclex
 * Meta title: NCLEX Flashcards Free — AI Generator | Esli
 * Meta description: Generate NCLEX flashcards with AI. Type any nursing topic — pharmacology, med-surg, psych — and get study-ready cards instantly. Free, spaced repetition.
 * Target keywords: NCLEX flashcards, NCLEX study cards free, NCLEX-RN flashcards, NCLEX prep flashcards
 * Week: 2026-W17
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
      name: 'Are NCLEX flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited NCLEX flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate NCLEX flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any NCLEX topic — "pharmacology priority meds", "SIADH vs. diabetes insipidus", "delegation and priority setting", "psychiatric nursing" — and the AI creates a full set of flashcard Q&As in seconds. You can also upload a PDF of your nursing notes or ATI review book and Esli will extract the key concepts automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli use spaced repetition for NCLEX prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli uses the SM-2 spaced repetition algorithm — the same method proven most effective for long-term retention. Cards you struggle with resurface sooner; cards you know well are spaced out. For NCLEX prep covering thousands of concepts, this is far more efficient than re-reading notes.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my nursing school notes or ATI/Hesi materials to make flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli accepts PDF uploads. Upload your ATI review module, Hesi study guide, lecture slides, or handwritten notes scanned to PDF, and Esli will generate a complete flashcard deck from the content. This turns hours of note-reviewing into an active spaced repetition study session.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Anki for NCLEX?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both use spaced repetition, but Esli adds AI generation. With Anki, you manually create every card or import a pre-made deck that may not match your weak areas. With Esli, you type any topic and get a targeted deck in seconds. For busy nursing students preparing for NCLEX, this saves 10-20 hours of card creation time.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'A patient with SIADH will show which serum sodium level — and what is the priority nursing action?',
    a: 'Hyponatremia (Na+ < 135 mEq/L). Priority: fluid restriction (800-1000 mL/day). Monitor neuro status for confusion, seizures. Report Na+ < 120 mEq/L immediately — risk of cerebral edema.',
  },
  {
    q: 'What are the 5 rights of delegation in NCLEX priority questions?',
    a: 'Right task, Right circumstance, Right person, Right direction/communication, Right supervision. Delegate stable, predictable tasks to UAP. NEVER delegate assessment, teaching, or unstable patients.',
  },
  {
    q: 'A patient taking digoxin has a potassium level of 2.9 mEq/L. What is the nurse\'s priority action?',
    a: 'Hold digoxin and notify the physician. Hypokalemia increases digoxin toxicity risk. Assess for toxicity signs: bradycardia, visual disturbances (yellow-green halos), nausea. Normal K+ range: 3.5-5.0 mEq/L.',
  },
  {
    q: 'Which ABG values indicate fully compensated respiratory acidosis?',
    a: 'pH 7.35-7.45 (normal), PaCO2 > 45 mmHg (elevated — primary problem), HCO3 > 26 mEq/L (elevated — kidney compensation). "Compensated" = pH back in normal range despite abnormal CO2 and bicarb.',
  },
  {
    q: 'A patient is ordered 500 mL NS over 4 hours. Drop factor is 15 gtt/mL. What is the flow rate in gtt/min?',
    a: '500 mL ÷ 4 hrs = 125 mL/hr. 125 mL/hr × 15 gtt/mL ÷ 60 min = 31.25 → 31 gtt/min. Formula: (Volume × Drop factor) ÷ Time in minutes.',
  },
  {
    q: 'What is the therapeutic lithium level for maintenance therapy, and what are early toxicity signs?',
    a: 'Therapeutic range: 0.6-1.2 mEq/L (maintenance). Early toxicity (>1.5): fine tremor, polyuria, mild nausea, diarrhea. Severe (>2.0): coarse tremor, confusion, seizures, cardiac arrhythmias. Ensure adequate sodium and fluid intake.',
  },
]

const benefits = [
  { title: 'Cover every NCLEX category', body: 'Pharmacology, med-surg, OB, pediatrics, psych, leadership — type any category and get targeted cards. No more hunting for the right Quizlet deck.' },
  { title: 'Upload your review books', body: 'Have ATI, Hesi, or Saunders PDFs? Upload them and Esli generates flashcards from your exact study materials.' },
  { title: 'SM-2 spaced repetition', body: 'Proven algorithm spaces reviews optimally. With 6,000+ NCLEX concepts to master, efficient study scheduling is non-negotiable.' },
  { title: 'Study on any device', body: 'Web app + browser extension. Study between clinical rotations, on break, or anywhere. No app download required.' },
]

const topicTags = ['Pharmacology', 'Med-Surg', 'OB/Maternity', 'Pediatrics', 'Psych Nursing', 'Leadership & Delegation', 'ABGs', 'Lab Values']

export default function NCLEXFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
      {/* FAQ Schema JSON-LD */}
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
                Generate{' '}
                <span className="text-primary-600">NCLEX Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any nursing topic — pharmacology, med-surg, delegation, ABGs — and get a full deck of NCLEX-style flashcards in seconds. Free, with spaced repetition.
              </p>

              {/* Topic tags */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {topicTags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate NCLEX Flashcards Free
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

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Build your NCLEX deck in 3 steps
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
                  body: 'Enter anything — "NCLEX pharmacology priority meds", "delegation questions", "fluid and electrolytes" — or upload your ATI, Hesi, or Saunders review PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates NCLEX-style flashcards with clinical scenarios, rationales, and key nursing actions — exactly the format you need to pass.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm surfaces hard concepts more often. With thousands of NCLEX topics to cover, optimized review scheduling makes all the difference.',
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

        {/* ── Sample Cards ── */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example NCLEX flashcards
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
                Generate Your NCLEX Deck Free
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
                Why nursing students choose Esli for NCLEX
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
                NCLEX flashcard FAQs
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
              Ready to pass NCLEX?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate targeted flashcards for every NCLEX category. Any topic, in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate NCLEX Flashcards Free
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
