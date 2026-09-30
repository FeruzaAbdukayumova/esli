/**
 * SEO Landing Page: Nursing Assessment Flashcards
 * Route: /flashcards/nursing-assessment
 * Meta title: Nursing Assessment Flashcards Free — AI | Esli
 * Meta description: Generate nursing assessment flashcards with AI. Head-to-toe, ABCDE,
 *   vital signs, SBAR — free, spaced repetition. No signup needed.
 * Target keywords: nursing assessment flashcards, physical assessment flashcards,
 *   health assessment flashcards, head-to-toe assessment flashcards, SBAR flashcards,
 *   nursing health assessment, clinical assessment nursing
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
      name: 'Are nursing assessment flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited nursing assessment flashcards with AI — head-to-toe assessment, vital signs interpretation, SBAR, ABCDE, and clinical reasoning — with spaced repetition. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What nursing assessment topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any nursing assessment topic: head-to-toe physical assessment sequence, vital sign interpretation (normal ranges and abnormal findings), ABCDE primary survey, SBAR communication framework, neurological assessment (GCS, pupils, orientation), cardiovascular assessment (heart sounds, pulses, edema), respiratory assessment (breath sounds, work of breathing), pain assessment scales (PQRSTU, Wong-Baker), and clinical reasoning frameworks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate nursing assessment flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any assessment topic — "head-to-toe assessment sequence", "abnormal breath sounds and meanings", "GCS scoring", "SBAR report components" — and our AI instantly creates Q&A flashcards. You can also upload a PDF of your nursing textbook (Jarvis, Weber, Taber\'s) and Esli generates a complete deck from the content automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me prepare for the NCLEX health assessment questions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "NCLEX health assessment" or specific topics like "abnormal heart sounds NCLEX", "respiratory assessment findings", or "neurological assessment nursing" to get exam-focused flashcards. Our spaced repetition algorithm ensures you retain the assessment sequences and interpretation rules through test day.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Anki for nursing assessment study?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires you to create every card manually or download decks that may be outdated or incomplete. Esli generates current, comprehensive nursing assessment flashcards from any topic or textbook page in seconds. Both use spaced repetition — Esli removes the hours of card creation so you can focus on clinical preparation.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the correct sequence for a head-to-toe physical assessment?',
    a: 'General appearance → Vital signs → Head/face/eyes/ears/nose/mouth → Neck (lymph nodes, thyroid, JVD) → Chest/respiratory → Cardiovascular → Abdomen → Extremities (pulses, edema, cap refill) → Neurological → Skin throughout.',
  },
  {
    q: 'What do the letters in SBAR stand for and what does each include?',
    a: 'S - Situation (patient name, room, issue). B - Background (diagnosis, history, relevant meds). A - Assessment (your clinical finding and concern). R - Recommendation (what you need: order, callback, transfer). Use in every handoff and urgent communication.',
  },
  {
    q: 'What are the components of the ABCDE primary survey?',
    a: 'A - Airway (patent? obstruction?). B - Breathing (rate, depth, SpO2, breath sounds). C - Circulation (HR, BP, cap refill, skin color/temp). D - Disability (GCS, pupils, glucose). E - Exposure (full body assessment, temperature, environment). Intervene at each step before moving to the next.',
  },
  {
    q: 'What is the Glasgow Coma Scale (GCS) and what does a score of 8 mean?',
    a: 'GCS = Eyes (1-4) + Verbal (1-5) + Motor (1-6). Max 15 (fully alert), Min 3 (deep coma). Score ≤8 = severe brain injury, typically indicates need for airway protection (intubation). Score 9-12 = moderate, 13-15 = mild. Always report individual component scores, not just total.',
  },
  {
    q: 'What does a crackles (rales) finding on lung auscultation indicate?',
    a: 'Crackles = fine or coarse popping/crackling sounds on inspiration. Caused by: fluid in alveoli (pulmonary edema, pneumonia, HF), atelectasis reopening. Fine crackles = fluid in small airways. Coarse crackles = fluid in larger airways. Key clinical concern: oxygen delivery impairment.',
  },
  {
    q: 'What is the PQRSTU pain assessment mnemonic?',
    a: 'P - Provokes/Palliates (what makes it worse/better). Q - Quality (sharp, dull, burning, crushing). R - Radiates/Region (location, radiation pattern). S - Severity (0-10 scale). T - Timing (onset, duration, constant vs. intermittent). U - Understanding (patient\'s interpretation, impact on function).',
  },
]

const benefits = [
  { title: 'Head-to-toe in the right order', body: 'Generate the full assessment sequence as cards so the correct order becomes automatic before you enter the clinical.' },
  { title: 'Abnormal findings + meanings', body: 'Type "abnormal heart sounds" or "abnormal lung sounds" and get every finding, its clinical significance, and next steps in one deck.' },
  { title: 'Upload your nursing textbook', body: 'Turn Jarvis Health Assessment, Weber & Kelley, or your professor\'s clinical notes into a complete flashcard deck — automatically.' },
  { title: 'NCLEX and clinical ready', body: 'Spaced repetition ensures you retain assessment sequences and interpretation rules through exams and real clinical shifts.' },
]

export default function NursingAssessmentFlashcardsPage() {
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
                <span className="text-primary-600">Nursing Assessment Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any assessment topic and get a complete set of clinical flashcards in seconds. Head-to-toe, vital signs, SBAR, ABCDE, abnormal findings — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Head-to-Toe Assessment', 'SBAR Communication', 'ABCDE Survey', 'Vital Signs Interpretation', 'Heart & Lung Sounds', 'GCS Scoring', 'Pain Assessment (PQRSTU)', 'NCLEX Prep'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Nursing Assessment Flashcards Free
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
                Clinical assessment in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From textbook to clinical confidence — in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your assessment topic',
                  body: 'Enter anything — "head-to-toe assessment sequence", "abnormal lung sounds", "SBAR components", "GCS scoring" — or upload your Jarvis textbook PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates clinical cards',
                  body: 'Our AI creates high-yield Q&A cards covering assessment sequences, normal vs. abnormal findings, clinical significance, and nursing actions.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with the SM-2 algorithm. Findings you mix up resurface more often until the right clinical response is automatic.',
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
                Example nursing assessment flashcards
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
                Generate Your Nursing Assessment Deck Free
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
                Nursing assessment flashcard FAQs
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
              Ready to ace your clinical assessments?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join nursing students generating smarter assessment flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Nursing Assessment Flashcards Free
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
              <a href="/flashcards/nclex" className="hover:text-white transition-colors no-underline">NCLEX Flashcards</a>
              <a href="/flashcards/nursing-pharmacology" className="hover:text-white transition-colors no-underline">Nursing Pharmacology</a>
              <a href="/flashcards/nursing-school" className="hover:text-white transition-colors no-underline">Nursing School</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
