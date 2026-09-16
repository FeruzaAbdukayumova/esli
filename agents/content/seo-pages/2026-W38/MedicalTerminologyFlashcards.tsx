/**
 * SEO Landing Page: Medical Terminology Flashcards
 * Route: /flashcards/medical-terminology
 * Meta title: Medical Terminology Flashcards Free — AI | Esli (52 chars)
 * Meta description: Generate medical terminology flashcards with AI. Prefixes, suffixes, roots, body systems — free, spaced repetition. No signup. (128 chars)
 * Target keywords: medical terminology flashcards, medical terminology study cards, medical prefixes and suffixes flashcards, healthcare flashcards, CMA exam flashcards
 * Week: 2026-W38
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
      name: 'Are medical terminology flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited medical terminology flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What medical terminology topics can Esli cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any area you need: prefixes and suffixes, root words, body systems (cardiovascular, respiratory, musculoskeletal, neurological, gastrointestinal), medical abbreviations, pharmacology terms, surgical terminology, and specialty-specific vocabulary. Type the topic or upload a textbook chapter and AI generates the cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli good for nursing students learning medical terminology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Nursing students, pre-med students, medical assistants, health information technicians, and anyone entering healthcare use Esli for medical terminology. You can generate topic-specific decks (e.g. "cardiac terminology for nurses"), upload your course syllabi as PDFs, and use spaced repetition to retain terms long-term.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to prepare for the CMA or RMA exam?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any CMA or RMA topic area (e.g. "medical office procedures terminology", "CLIA waived tests", "administrative medical terminology") and Esli generates exam-targeted flashcards. You can also upload practice materials as PDFs to extract the most important terms automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help with medical terminology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Medical terminology involves hundreds of root words, prefixes, and suffixes that must be recalled quickly in clinical settings. Esli\'s SM-2 spaced repetition algorithm — the same one behind Anki — schedules reviews at the optimal moment before you forget them, so you build a durable vocabulary rather than cramming before exams.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What does the prefix "brady-" mean? Give a clinical example.',
    a: '"Brady-" means slow. Example: bradycardia (slow heart rate, <60 bpm). Related: bradypnea (slow breathing), bradykinesia (slowness of movement, a Parkinson\'s symptom).',
  },
  {
    q: 'What does the suffix "-ectomy" mean? Give two examples.',
    a: '"-ectomy" means surgical removal. Examples: appendectomy (removal of the appendix), cholecystectomy (removal of the gallbladder), mastectomy (removal of the breast).',
  },
  {
    q: 'Define "myocardial infarction." Break it down by word roots.',
    a: 'Myocardial = myo- (muscle) + cardi- (heart) + -al (relating to). Infarction = tissue death from blocked blood supply. Together: death of heart muscle tissue due to ischemia. Commonly called a heart attack.',
  },
  {
    q: 'What does the prefix "hyper-" mean? How does it differ from "hypo-"?',
    a: '"Hyper-" = above normal / excessive. "Hypo-" = below normal / deficient. Examples: hypertension (high blood pressure) vs hypotension (low BP); hyperglycemia (high blood glucose) vs hypoglycemia (low blood glucose).',
  },
  {
    q: 'What does the root "hepat-" refer to? Name two hepatic conditions.',
    a: '"Hepat-" refers to the liver. Conditions: hepatitis (liver inflammation), hepatomegaly (enlarged liver), hepatocellular carcinoma (liver cancer), hepatotoxicity (liver damage from drugs or toxins).',
  },
  {
    q: 'What is the medical abbreviation "PRN" and how is it used?',
    a: '"PRN" is from Latin pro re nata, meaning "as needed." Used in prescriptions and care orders: "Give acetaminophen 500 mg PRN for pain" means administer only when the patient needs it, not on a fixed schedule.',
  },
]

const benefits = [
  { title: 'Every body system covered', body: 'Generate decks for cardiovascular, respiratory, neurological, musculoskeletal, GI, or any other system. Type the topic or upload a chapter PDF.' },
  { title: 'Root words, prefixes, and suffixes', body: 'AI breaks down medical terms by their components so you learn patterns, not just isolated words — making new terms decodable on sight.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm behind Anki. Hundreds of medical terms are manageable when reviewed at the scientifically optimal moment before forgetting.' },
  { title: 'Works for any healthcare path', body: 'Nursing, pre-med, medical assisting, health information technology, pharmacy tech — generate decks tailored to your specific program or exam.' },
]

export default function MedicalTerminologyFlashcardsPage() {
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
                <span className="text-primary-600">Medical Terminology</span>{' '}
                Flashcards with AI
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any body system, prefix, suffix, or medical specialty and get a complete flashcard deck instantly. Retain hundreds of terms with spaced repetition — no manual entry, no expensive subscriptions.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Prefixes & Suffixes', 'Cardiovascular', 'Respiratory', 'Musculoskeletal', 'Neurology', 'Pharmacology', 'Medical Abbreviations', 'Surgical Terms'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Medical Terminology Flashcards Free
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
                From topic to flashcard deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Build your medical vocabulary without hours of card creation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic',
                  body: 'Enter any medical terminology topic — "cardiovascular prefixes", "musculoskeletal root words", "pharmacology abbreviations" — or upload a chapter PDF from your textbook.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Our AI generates precise Q&A cards: word root definitions, clinical examples, contextual sentences, and common confusables — tailored to your topic.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at the optimal moment. You stop forgetting terms between classes and arrive at exams with a durable, usable vocabulary.',
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
                Example medical terminology flashcards
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
                Generate Your Medical Terminology Deck Free
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
                Why healthcare students choose Esli
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
                Medical terminology flashcard FAQs
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

        {/* CTA */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Build your medical vocabulary — free
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Hundreds of terms. Every body system. Generated by AI, retained with spaced repetition.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Medical Terminology Flashcards Free
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
              <a href="/flashcards/anatomy" className="hover:text-white transition-colors no-underline">Anatomy</a>
              <a href="/use-case/medical-students" className="hover:text-white transition-colors no-underline">For Medical Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
