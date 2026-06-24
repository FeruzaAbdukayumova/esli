/**
 * SEO Landing Page: Anatomy & Physiology Flashcards
 * Route: /flashcards/anatomy-physiology
 * Meta title: Anatomy & Physiology Flashcards Free — AI | Esli (52 chars)
 * Meta description: Generate A&P flashcards with AI. Muscle origins, organs, physiological processes — free, spaced repetition. No signup needed. (130 chars)
 * Target keywords: anatomy and physiology flashcards, A&P flashcards free, muscle origin insertion flashcards, anatomy physiology study cards, human anatomy flashcards AI
 * Week: 2026-W26
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
      name: 'Can Esli help me memorise muscle origins and insertions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "muscle origin insertion upper limb" or name a specific muscle group — rotator cuff, hamstrings, forearm flexors — and Esli generates a card for each muscle covering origin, insertion, action, innervation, and blood supply. You can be as specific as you need: "biceps brachii origin insertion action", "all rotator cuff muscles compared".',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for anatomy and physiology students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free — no credit card or subscription required. You can generate unlimited A&P flashcard decks, study with full spaced repetition, and access all features at no cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my A&P textbook PDF to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Marieb\'s Human Anatomy & Physiology, Tortora & Derrickson, OpenStax A&P, or your professor\'s lecture slides — and Esli\'s AI extracts key terms, definitions, structures, and physiological processes into a complete flashcard deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli work for both anatomy AND physiology, or just anatomy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Both. For anatomy, Esli generates cards on structures, locations, and relationships — bones, muscles, nerves, vessels. For physiology, it generates cards on processes and mechanisms — Frank-Starling law, osmotic gradient in the nephron, action potential phases, hormone feedback loops. Just type what you\'re studying and the AI covers it.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Quizlet for A&P?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quizlet has premade A&P decks but they often contain errors, outdated terminology, or don\'t match your specific textbook. Esli generates fresh, accurate cards tailored to exactly what you type — you get cards matched to Marieb Chapter 9, your professor\'s lecture topics, or the specific clinical correlations your nursing program emphasises. Plus Esli\'s spaced repetition is built-in, not a paid add-on.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the origin, insertion, and primary actions of the biceps brachii?',
    a: 'Origin: Long head — supraglenoid tubercle; Short head — coracoid process of scapula. Insertion: Radial tuberosity + bicipital aponeurosis. Actions: Elbow flexion (primary), forearm supination, weak shoulder flexion. Innervation: Musculocutaneous nerve (C5, C6).',
  },
  {
    q: 'Describe the Frank-Starling mechanism of the heart.',
    a: 'Increased ventricular end-diastolic volume (preload) stretches myocardial fibers, improving actin-myosin overlap → stronger contraction → greater stroke volume. The heart automatically matches cardiac output to venous return. Damaged hearts (dilated cardiomyopathy) have a flattened Frank-Starling curve.',
  },
  {
    q: 'Name the layers of the epidermis from deepest to most superficial using a mnemonic.',
    a: '"Californians Like Girls in String Bikinis" — Stratum Basale (mitotically active) → Spinosum → Granulosum → Lucidum (only thick skin: palms, soles) → Corneum (dead keratinocytes, barrier). Cells migrate upward ~2–4 weeks from basale to surface.',
  },
  {
    q: 'What is the functional difference between the descending and ascending limbs of the loop of Henle?',
    a: 'Descending limb: permeable to water (aquaporin-1), impermeable to ions → water exits by osmosis, filtrate becomes concentrated. Ascending limb: impermeable to water, actively transports Na⁺/K⁺/2Cl⁻ out via NKCC2 → filtrate dilutes, medullary gradient maintained. This countercurrent multiplier enables urine concentration.',
  },
  {
    q: 'List the heart chambers and valves in the order blood flows through the systemic circuit.',
    a: 'Right atrium → tricuspid valve → right ventricle → pulmonary semilunar valve → pulmonary arteries → lungs (gas exchange) → pulmonary veins → left atrium → mitral (bicuspid) valve → left ventricle → aortic semilunar valve → aorta → systemic circulation.',
  },
  {
    q: 'What are tidal volume, IRV, ERV, and residual volume, and how do they combine into total lung capacity?',
    a: 'TV ~500 mL (rest breathing); IRV ~3,000 mL (extra inhale beyond TV); ERV ~1,100 mL (extra exhale beyond TV); RV ~1,200 mL (air remaining after max exhale — never expelled). Total Lung Capacity = TV + IRV + ERV + RV ≈ 5,800 mL. Vital Capacity = TV + IRV + ERV (no RV).',
  },
]

const benefits = [
  {
    title: 'System-by-system topic generation',
    body: 'Study one body system at a time — cardiovascular, respiratory, musculoskeletal, renal, neuro. Type the system and chapter and get a full deck.',
  },
  {
    title: 'Muscle origin, insertion, and action cards',
    body: 'Generate precise O/I/A cards for any muscle group in seconds — no more copying from textbook tables.',
  },
  {
    title: 'Upload your A&P textbook or lecture slides',
    body: 'Marieb, Tortora, OpenStax, or your professor\'s PDFs — upload and Esli extracts the key content into study cards automatically.',
  },
  {
    title: 'Study anywhere between labs and lectures',
    body: 'Access your decks on any device. Squeeze in review on the bus, between classes, or the night before a practical exam.',
  },
]

export default function AnatomyPhysiologyFlashcardsPage() {
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
                <span className="text-primary-600">Anatomy & Physiology</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any A&P topic — muscle origins, cardiac physiology, renal function, neuroanatomy — and get a complete flashcard deck in seconds. Upload your Marieb or Tortora PDFs and Esli does the rest.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Musculoskeletal', 'Cardiovascular', 'Respiratory', 'Renal & Urinary', 'Nervous System', 'Endocrine', 'Digestive', 'Integumentary'].map((tag) => (
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
                  Generate A&P Flashcards Free
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
                A&P prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From textbook chapter to study-ready deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your A&P topic',
                  body: 'Enter a body system, chapter topic, or specific structure — "cardiac cycle phases", "muscle origin insertion lower limb", "nephron function" — or upload your lecture slides as PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates precise cards covering structures, mechanisms, clinical correlations, and mnemonics — exactly what your exam will test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 brings back the muscles and processes you keep forgetting at exactly the right intervals. Retain more with less cram time.',
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
                Example A&P flashcards
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
                Generate Your A&P Deck Free
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
                Why A&P students choose Esli
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
                A&P flashcard FAQs
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
              Ace your A&P course
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate anatomy and physiology flashcards from any topic or textbook chapter. Free forever — no credit card needed.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate A&P Flashcards Free
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
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">AI for Medical Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
