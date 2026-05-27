/**
 * SEO Landing Page: USMLE Step 2 Flashcards (Use-Case: Medical School Step 2)
 * Route: /use-case/medical-school-step2
 * Meta title: USMLE Step 2 Flashcards — AI Generator for Med Students | Esli
 * Meta description: Generate USMLE Step 2 CK flashcards with AI. Clinical medicine, internal medicine, surgery — upload any shelf resource and get cards free.
 * Target keywords: USMLE Step 2 flashcards, USMLE Step 2 CK flashcards free, clinical medicine flashcards, shelf exam flashcards, Step 2 CK study cards
 * Week: 2026-W22
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, AlertCircle } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are USMLE Step 2 flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited Step 2 CK flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload UWorld notes or Amboss PDFs to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — your UWorld notes, OnlineMedEd notes, First Aid for Step 2 CK, shelf lecture notes, or case writeups — and Esli\'s AI extracts the key clinical pearls and builds a complete flashcard deck automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which Step 2 CK subjects can I generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any shelf subject: internal medicine (IM), surgery, pediatrics, OB/GYN, psychiatry, family medicine, emergency medicine, and neurology. Type any clinical topic — "heart failure management", "appendicitis presentation", "preeclampsia criteria" — and get cards instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Anki for Step 2 CK prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pre-made Anki decks (like Step2Deck) are generic and massive — you spend time filtering cards that aren\'t relevant to your weak areas. Esli generates targeted cards from exactly the topics you need, in seconds. Upload your UWorld incorrect answers summary and get a personalized weak-area deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me prepare for NBME shelf exams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "internal medicine shelf", "surgery shelf high-yield topics", or "pediatrics shelf exam" and Esli generates shelf-focused clinical flashcards. Great for rapid review in the final week before each shelf.',
      },
    },
  ],
}

const painPoints = [
  {
    problem: 'Generic pre-made decks cover everything — you waste time on topics you already know.',
    solution: 'Type exactly what you need — "ACS management", "pneumonia empiric treatment" — and get targeted cards on your weak areas only.',
  },
  {
    problem: 'Making cards manually from UWorld explanations takes hours you don\'t have.',
    solution: 'Upload your UWorld notes or any PDF and Esli builds the deck automatically in seconds.',
  },
  {
    problem: 'Rotating through 6+ shelves means you need new decks constantly.',
    solution: 'Generate a fresh shelf deck for each rotation in under a minute — IM one week, surgery the next.',
  },
  {
    problem: 'Phone-only study time is wasted when your Anki cards don\'t sync well.',
    solution: 'Esli works in any browser, syncs everywhere — study clinical vignettes between patients on your phone.',
  },
]

const sampleCards = [
  {
    q: 'What are the diagnostic criteria for SIRS and when does it become sepsis?',
    a: 'SIRS (2+ of): Temp >38°C or <36°C, HR >90, RR >20 or PaCO2 <32, WBC >12K or <4K or >10% bands. Sepsis = SIRS + suspected/confirmed infection. Septic shock = sepsis + hypotension refractory to fluids + lactate >2 mmol/L (Sepsis-3 emphasizes SOFA score ≥2).',
  },
  {
    q: 'What is the first-line management of acute ST-elevation MI (STEMI)?',
    a: 'Primary PCI within 90 min of first medical contact (FMC) is preferred. If PCI unavailable within 120 min of FMC, give fibrinolytics within 30 min. Adjuncts: aspirin 325mg, P2Y12 inhibitor (ticagrelor/clopidogrel), anticoagulation (heparin/enoxaparin), oxygen only if SpO2 <90%.',
  },
  {
    q: 'What are the criteria for preeclampsia and when is delivery indicated?',
    a: 'Preeclampsia: BP ≥140/90 on 2 occasions ≥4h apart after 20 weeks + proteinuria ≥300mg/24h (or protein:creatinine ≥0.3) OR severe features (BP ≥160/110, thrombocytopenia <100K, renal insufficiency, impaired liver function, pulmonary edema, visual/cerebral symptoms). Deliver at ≥37 weeks or immediately if severe features regardless of GA.',
  },
  {
    q: 'What is the classic presentation and management of appendicitis?',
    a: 'Presentation: periumbilical pain migrating to RLQ, anorexia, nausea, low-grade fever. Rovsing\'s sign (RLQ pain with LLQ palpation), Psoas sign, Obturator sign. Diagnosis: CT abdomen/pelvis (gold standard); US first in children/pregnant. Management: appendectomy (laparoscopic). IV antibiotics for perforated appendicitis.',
  },
  {
    q: 'Distinguish between type 1 and type 2 respiratory failure.',
    a: 'Type 1 (hypoxemic): PaO2 <60 mmHg with normal or low PaCO2. Causes: pneumonia, pulmonary edema, PE, ARDS. Mechanism: V/Q mismatch or shunt. Type 2 (hypercapnic): PaCO2 >45 + hypoxemia. Causes: COPD exacerbation, neuromuscular disease, obesity hypoventilation. Mechanism: alveolar hypoventilation.',
  },
  {
    q: 'What is the management of a patient with acute psychosis and unknown history?',
    a: 'Ensure safety first. R/O organic causes: glucose (hypoglycemia), O2 sat (hypoxia), Na (hyponatremia), toxic screen, TSH, NH3, head CT if focal neuro signs. If organic excluded: haloperidol or atypical antipsychotic (olanzapine, risperidone). Avoid benzos alone in psychosis (ok to add for agitation). Involve psychiatry early.',
  },
]

export default function USMLEStep2FlashcardsPage() {
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
                AI Flashcards for Medical Students
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                AI Flashcards for{' '}
                <span className="text-primary-600">USMLE Step 2 CK</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any clinical topic or upload your UWorld notes, First Aid, or shelf resources — and get a targeted flashcard deck in seconds. No more spending hours making cards manually during rotations.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Internal Medicine', 'Surgery', 'Pediatrics', 'OB/GYN', 'Psychiatry', 'Family Medicine', 'Emergency Med', 'Neurology'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full border border-primary-200">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Step 2 Flashcards Free
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

        {/* Pain Points */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                The Step 2 CK flashcard problem — solved
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Clinical rotations leave no time to make good flashcards. Esli handles it.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((pt, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
                  <div className="flex items-start gap-3 mb-4">
                    <AlertCircle size={18} className="text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-500 line-through leading-relaxed">{pt.problem}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check size={18} className="text-primary-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">{pt.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                A targeted shelf deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a clinical flashcard deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type a clinical topic or upload a PDF',
                  body: 'Enter "heart failure management Step 2", "IM shelf high-yield topics" — or upload your UWorld notes, First Aid for Step 2 CK, or shelf lecture PDFs.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates clinical Q&A cards',
                  body: 'Esli creates presentation-management-complications cards based on the highest-yield clinical patterns for Step 2 CK and shelf exams.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2 between patients, on call, or during post-call free time. Weak areas resurface at the right time — not too early, not too late.',
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
        <section id="sample-cards" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example Step 2 CK flashcards
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
                Generate Your Step 2 Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                USMLE Step 2 flashcard FAQs
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
              Ready to crush Step 2 CK?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of medical students generating targeted clinical flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Step 2 Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying for boards? See our{' '}
              <a href="/flashcards/mcat" className="text-white underline hover:no-underline">MCAT flashcards</a>,{' '}
              <a href="/flashcards/nclex" className="text-white underline hover:no-underline">NCLEX flashcards</a>,{' '}
              and{' '}
              <a href="/use-case/medical-students" className="text-white underline hover:no-underline">AI flashcards for medical students</a>.
            </p>
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
