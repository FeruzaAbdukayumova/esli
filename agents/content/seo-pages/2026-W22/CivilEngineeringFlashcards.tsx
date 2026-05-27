/**
 * SEO Landing Page: Civil Engineering Flashcards
 * Route: /flashcards/civil-engineering
 * Meta title: Civil Engineering Flashcards Free — AI Generator | Esli
 * Meta description: Generate civil engineering flashcards with AI. PE exam, structural, geotechnical, transportation — type any topic and get cards instantly. Free.
 * Target keywords: civil engineering flashcards, PE exam flashcards, structural engineering flashcards, civil engineering study cards, FE exam flashcards civil
 * Week: 2026-W22
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
      name: 'Are civil engineering flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited civil engineering flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate PE exam and FE exam flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type topics like "PE exam structural breadth", "FE civil statics", "geotechnical PE exam", or "transportation engineering PE" and Esli generates high-yield Q&A cards. You can also upload the NCEES FE or PE Reference Handbook pages as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which civil engineering topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: structural analysis (beams, trusses, frames), concrete and steel design (ACI, AISC), geotechnical engineering (soil mechanics, bearing capacity, consolidation), transportation (HCM, sight distance), hydraulics and hydrology, environmental engineering, construction management, and surveying.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload NCEES reference handbook pages or course notes as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — your NCEES FE Reference Handbook, PE Civil Reference Manual, Lindeburg\'s PE prep, course lecture notes, or ASCE standards excerpts — and Esli\'s AI builds a complete flashcard deck from the key formulas, definitions, and design criteria.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than Anki for PE exam prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anki requires manually typing every formula and definition — for civil PE prep with hundreds of equations, that takes days. Esli generates a full deck from a topic or PDF in seconds. Then both use spaced repetition, but Esli runs in any browser with no install.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the flexural formula and what does each term represent?',
    a: 'σ = Mc/I. σ = bending stress (Pa), M = bending moment (N·m), c = distance from neutral axis to extreme fiber (m), I = second moment of area (m⁴). Maximum bending stress occurs at the extreme fiber farthest from the neutral axis.',
  },
  {
    q: 'State the Terzaghi bearing capacity equation for a strip footing.',
    a: "q_ult = c·N_c + q·N_q + 0.5·γ·B·N_γ. c = cohesion, q = overburden pressure (γ·D_f), γ = unit weight of soil, B = footing width, D_f = depth of foundation. N_c, N_q, N_γ = Terzaghi bearing capacity factors (functions of friction angle φ).",
  },
  {
    q: 'What is the rational method for peak runoff and when is it used?',
    a: 'Q = C·i·A. Q = peak discharge (ft³/s or m³/s), C = runoff coefficient (dimensionless, 0-1), i = rainfall intensity for the time of concentration (in/hr), A = drainage area (acres). Used for small urban watersheds (< ~200 acres). Assumes steady-state uniform rainfall.',
  },
  {
    q: "What are the ACI 318 requirements for minimum flexural reinforcement in a rectangular beam?",
    a: "A_s,min = max(3√f'c/f_y · b_w·d, 200/f_y · b_w·d). f'c in psi. This ensures the beam doesn't fail suddenly at first cracking. Also, A_s,min ≥ 4/3 · A_s,required when the required area is small.",
  },
  {
    q: 'Define the coefficient of consolidation (c_v) and what it controls.',
    a: 'c_v = k/(m_v · γ_w) = k·E_oed/γ_w. Units: m²/year or cm²/s. Controls the rate of consolidation (how fast excess pore pressure dissipates). Higher c_v = faster consolidation. Used in Terzaghi 1D consolidation theory: T_v = c_v·t/H²_dr.',
  },
  {
    q: "What is the Manning's equation for open channel flow?",
    a: "Q = (1/n)·A·R^(2/3)·S^(1/2) (SI units). Q = discharge, n = Manning's roughness coefficient, A = cross-sectional area, R = hydraulic radius = A/P (P = wetted perimeter), S = channel slope. For US customary: Q = (1.486/n)·A·R^(2/3)·S^(1/2).",
  },
]

const benefits = [
  { title: 'Formulas and design codes in seconds', body: 'Type "ACI 318 beam design", "AISC LRFD steel connections", or "Terzaghi bearing capacity" and get formula-focused cards with conditions, units, and application notes.' },
  { title: 'Upload NCEES handbooks or lecture notes', body: 'Turn any PE/FE reference material PDF into a complete flashcard deck. Esli extracts key formulas, definitions, and design criteria automatically.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm used by Anki. Complex formulas (like consolidation theory or steel interaction equations) resurface at exactly the right time before your exam.' },
  { title: 'Study anywhere, no install', body: 'Browser, phone, tablet — your decks sync everywhere. Review bearing capacity equations during your commute or squeeze in PE prep during lunch.' },
]

export default function CivilEngineeringFlashcardsPage() {
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
                <span className="text-primary-600">Civil Engineering Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any civil engineering topic — structural analysis, PE exam prep, geotechnical, hydraulics — and get a complete flashcard deck in seconds. No manual formula entry.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Structural Analysis', 'Geotechnical', 'Hydraulics & Hydrology', 'PE Exam Prep', 'FE Civil Exam', 'Concrete Design (ACI)', 'Steel Design (AISC)', 'Transportation'].map(tag => (
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
                  Generate Civil Engineering Flashcards Free
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
                PE exam prep in 3 simple steps
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
                  title: 'Type your engineering topic',
                  body: 'Enter anything — "PE Civil structural breadth formulas", "Manning\'s equation open channel flow", "soil consolidation theory" — or upload your NCEES handbook or course notes PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering formulas, units, conditions, design code criteria, and application examples tailored to civil engineering exams.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Complex formulas (like bearing capacity factors or ACI minimum reinforcement) resurface at exactly the right time before your PE exam.',
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
                Example civil engineering flashcards
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
                Generate Your Civil Engineering Deck Free
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
                Why civil engineers choose Esli
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
                Civil engineering flashcard FAQs
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
              Ready to pass the PE exam?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of engineers generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Civil Engineering Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying for tech exams? See our{' '}
              <a href="/flashcards/aws-certification" className="text-white underline hover:no-underline">AWS certification flashcards</a>{' '}
              and{' '}
              <a href="/flashcards/comptia-security-plus" className="text-white underline hover:no-underline">CompTIA Security+ flashcards</a>.
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
