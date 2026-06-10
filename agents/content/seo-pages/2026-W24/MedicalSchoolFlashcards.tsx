/**
 * SEO Landing Page: AI Flashcards for Medical Students
 * Route: /use-case/medical-school
 * Meta title: AI Flashcards for Medical Students — Free | Esli
 * Meta description: Generate medical school flashcards with AI. Preclinical sciences, Step 1 prep, clinical rotations — free, spaced repetition.
 * Target keywords: medical school flashcards, AI flashcards medical students, Step 1 flashcards free, preclinical flashcards, medical school study tools
 * Week: 2026-W24
 */

import { useState } from 'react'
import { ArrowRight, Sparkles, Brain, RotateCcw, ChevronDown, Check, X } from 'lucide-react'

const APP_URL = 'https://app.esli.app'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is Esli free for medical students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited medical school flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli replace Anki for Step 1 prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli uses the same SM-2 spaced repetition algorithm as Anki, so the review science is identical. The difference: instead of downloading decks from strangers or spending hours making your own, you type a topic or upload your lecture PDF and Esli generates a complete deck in seconds. Many students use Esli for quick topic-specific generation and review alongside their main workflow.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my lecture slides or First Aid as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload your lecture slides, First Aid for the USMLE, Pathoma, BRS series, or any study resource. Esli\'s AI extracts key facts, mechanisms, mnemonics, and clinical correlations into flashcards automatically. Each PDF becomes a ready-to-review deck.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which medical subjects can I generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any preclinical or clinical subject: anatomy, physiology, biochemistry, pathology, pharmacology, microbiology, immunology, neuroscience, histology, embryology, behavioral science, and more. Also clinical rotations: internal medicine, surgery, OB/GYN, pediatrics, psychiatry. Type the subject and Esli generates targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from premade Anki decks like Anking?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Premade decks like Anking cover the whole curriculum — which is great for breadth but means you study thousands of cards unrelated to your current lecture block. Esli generates cards for exactly what you\'re studying right now: today\'s biochemistry lecture, this week\'s organ system, your upcoming shelf exam. Targeted generation beats generic decks for block studying.',
      },
    },
  ],
}

const painPoints = [
  'Spending hours making Anki cards from lecture slides instead of actually studying',
  'Downloading generic decks that don\'t match your school\'s curriculum focus',
  'Falling behind on card reviews because the volume is unmanageable',
  'Forgetting everything between blocks because there\'s no structured review',
]

const sampleCards = [
  {
    q: 'Name the 8 intermediates of the Krebs cycle in order.',
    a: 'Citrate → Isocitrate → α-Ketoglutarate → Succinyl-CoA → Succinate → Fumarate → Malate → Oxaloacetate. Mnemonic: "Citrate Is Krebs\' Starting Substrate For Making Oxaloacetate." Net yield per cycle: 3 NADH, 1 FADH2, 1 GTP, 2 CO2.',
  },
  {
    q: 'What is the mechanism of action of beta-lactam antibiotics?',
    a: 'Beta-lactams (penicillins, cephalosporins, carbapenems) inhibit transpeptidase (PBPs — penicillin-binding proteins), blocking the final cross-linking step of peptidoglycan synthesis. This weakens the bacterial cell wall, causing osmotic lysis. Bactericidal. Gram positives most susceptible (thicker peptidoglycan).',
  },
  {
    q: 'Distinguish Th1 vs Th2 vs Th17 helper T cell subsets by cytokines and function.',
    a: 'Th1: IL-12 induced; secretes IFN-γ; activates macrophages, cytotoxic T cells — fights intracellular pathogens and tumors. Th2: IL-4 induced; secretes IL-4, IL-5, IL-13; promotes B cell class switching to IgE, eosinophil activation — fights extracellular parasites; drives allergy. Th17: TGF-β + IL-6 induced; secretes IL-17 — neutrophil recruitment, mucosal immunity; implicated in autoimmune disease.',
  },
  {
    q: 'State the formula for renal clearance. What does a clearance = GFR indicate?',
    a: 'Clearance (C) = (U × V) / P, where U = urine concentration, V = urine flow rate (mL/min), P = plasma concentration. If C = GFR (120 mL/min): substance is freely filtered and neither secreted nor reabsorbed (e.g., inulin, creatinine approximation). C > GFR: net secretion. C < GFR: net reabsorption.',
  },
  {
    q: 'What does an elevated AST/ALT ratio > 2:1 suggest versus a ratio < 1?',
    a: 'AST:ALT > 2:1 (especially with AST < 300): alcoholic hepatitis — alcohol damages mitochondria (where AST is located) and depletes pyridoxal phosphate (needed for ALT synthesis). AST:ALT < 1: viral hepatitis, NAFLD, autoimmune hepatitis, drug-induced liver injury — hepatocyte cytoplasm damage elevates ALT proportionally more.',
  },
  {
    q: 'What are the dermatomes for the nipple, umbilicus, and inguinal ligament?',
    a: 'Nipple: T4 ("4 letters in nipple"). Umbilicus: T10 ("10 letters in umbilicus" — or think belly button on T10). Inguinal ligament: L1. Knee: L3-L4. Great toe/dorsum of foot: L4-L5. Little toe/lateral foot: S1. Perineum/saddle: S2-S4.',
  },
]

const benefits = [
  {
    title: 'Generate cards from today\'s lecture — in 30 seconds',
    body: 'Upload your lecture PDF or type the topic and Esli generates high-yield Q&A cards immediately. Stop spending the first hour of studying making cards instead of reviewing them.',
  },
  {
    title: 'Covers every preclinical block and clinical rotation',
    body: 'Anatomy, biochemistry, pathology, pharmacology, micro/immuno, neuroscience, physiology — and clinical shelves. Type any subject or shelf exam topic for a targeted deck.',
  },
  {
    title: 'First Aid, Pathoma, BRS — any PDF becomes a deck',
    body: 'Esli\'s AI extracts high-yield facts, mechanisms, and clinical correlations from any study resource. First Aid becomes a searchable, reviewable flashcard library.',
  },
  {
    title: 'SM-2 spaced repetition — same algorithm as Anki',
    body: 'Facts you\'re shaky on resurface before you forget them. The algorithm adapts to your performance so you spend review time where it matters — not grinding cards you already know cold.',
  },
]

export default function MedicalSchoolFlashcardsPage() {
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
                AI Flashcards for{' '}
                <span className="text-primary-600">Medical Students</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Upload today's lecture PDF or type a topic and get high-yield flashcards in seconds. Same spaced repetition as Anki — without the hours of manual card-making.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'Anatomy & Physiology',
                  'Biochemistry & Molecular',
                  'Pathology & Pathophysiology',
                  'Pharmacology',
                  'Microbiology & Immunology',
                  'Step 1 Prep',
                  'Clinical Rotations',
                  'Histology',
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-sm bg-primary-50 text-primary-700 rounded-full border border-primary-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Medical Flashcards Free
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
        <section className="py-16 bg-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
              Sound familiar?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {painPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-slate-800 rounded-xl">
                  <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <X size={12} className="text-red-400" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed line-through decoration-slate-500">{point}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-400 mt-8 text-sm">
              Esli handles the card-making so you can focus on the medicine.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                From lecture to flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Under a minute from PDF upload to a reviewable deck.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type a topic or upload a PDF',
                  body: 'Enter "beta-lactam mechanisms and resistance", "Krebs cycle intermediates", or upload your lecture slides, First Aid chapters, or Pathoma PDFs. Esli reads any medical study material.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates high-yield cards',
                  body: 'Our AI extracts key facts, mechanisms, mnemonics, clinical correlations, and drug interactions — formatted as clean Q&A cards targeted at your exam level.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Review with spaced repetition',
                  body: 'SM-2 surfaces weak spots at the optimal interval. Stop grinding cards you already know. Focus review time on the mechanisms and drug facts that actually need work.',
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
                Example medical flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                High-yield cards across preclinical subjects — click any to flip.
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
                Generate Your Medical Deck Free
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
                Why med students choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {benefits.map((b, i) => (
                <div
                  key={i}
                  className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all"
                >
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
                Medical student flashcard FAQs
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
              Ready to study smarter in med school?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate high-yield decks from any lecture or PDF in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Medical Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also preparing for boards?{' '}
              <a href="/flashcards/mcat" className="text-white underline hover:no-underline">
                MCAT flashcards
              </a>{' '}
              and{' '}
              <a href="/flashcards/nursing-pharmacology" className="text-white underline hover:no-underline">
                nursing pharmacology flashcards
              </a>{' '}
              are free too.
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
