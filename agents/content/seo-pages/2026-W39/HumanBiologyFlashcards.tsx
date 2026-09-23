/**
 * SEO Landing Page: Human Biology Flashcards
 * Route: /flashcards/human-biology
 * Meta title: Human Biology Flashcards Free — AI Generator | Esli (54 chars)
 * Meta description: Generate human biology flashcards with AI. Body systems, anatomy, physiology — AP Human Biology, free, spaced repetition. No signup. (137 chars)
 * Target keywords: human biology flashcards, body systems flashcards, AP human biology flashcards, human anatomy flashcards, body systems study cards
 * Week: 2026-W39
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
      name: 'Are human biology flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited human biology flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What human biology topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All major body systems and topics — cardiovascular, respiratory, digestive, nervous, endocrine, musculoskeletal, immune, reproductive, urinary, and integumentary systems. Also cell biology, homeostasis, genetics, metabolism, and AP Human Biology curriculum topics. Type the topic or upload a PDF of your textbook.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me prepare for AP Human Biology or a college human biology course?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "AP Human Biology cardiovascular system" or "college human biology endocrine system" and Esli tailors the cards to the depth and scope of that course. You can also upload your AP review guide or course textbook as a PDF and get a complete deck in seconds.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is human biology different from anatomy and physiology on Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Human biology covers the integrated study of how the body works as a whole system — combining anatomy (structure), physiology (function), genetics, homeostasis, and disease. Esli has separate pages for anatomy and physiology (A&P), which goes deeper into clinical detail. Human biology is ideal for pre-health undergraduates, high school AP students, and anyone wanting a complete body systems foundation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli better than Quizlet for human biology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Quizlet has pre-made human biology sets but they vary in quality and may not match your course. Esli generates cards tailored to your exact topic and depth in seconds — no hunting for the right set. Both offer flashcard study; Esli adds spaced repetition (SM-2 algorithm) so you study efficiently, not just repeatedly.",
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the 4 chambers of the heart and their functions?',
    a: 'Right atrium: receives deoxygenated blood from body (vena cava). Right ventricle: pumps to lungs (pulmonary artery). Left atrium: receives oxygenated blood from lungs (pulmonary veins). Left ventricle: pumps oxygenated blood to body (aorta). Left ventricle has thickest wall — highest pressure.',
  },
  {
    q: 'What is the role of the alveoli in gas exchange?',
    a: 'Alveoli are tiny air sacs in the lungs (300 million per lung) where gas exchange occurs. O2 diffuses from alveolar air into capillary blood (high to low concentration); CO2 diffuses out of blood into alveoli. Features: thin walls (one cell thick), large surface area, surrounded by capillaries, moist lining.',
  },
  {
    q: 'Describe the function of the hypothalamus.',
    a: 'The hypothalamus is the master regulator of homeostasis — controls body temperature (thermoregulation), hunger/thirst, sleep-wake cycles, and the autonomic nervous system. Key endocrine role: releases releasing/inhibiting hormones that control the anterior pituitary (e.g., TRH, GnRH, CRH). Also produces ADH and oxytocin (stored in posterior pituitary).',
  },
  {
    q: 'What is the difference between the sympathetic and parasympathetic nervous systems?',
    a: 'Sympathetic ("fight or flight"): increases heart rate, dilates pupils, inhibits digestion, releases adrenaline, dilates airways. Parasympathetic ("rest and digest"): decreases heart rate, constricts pupils, stimulates digestion, constricts airways. Both use neurotransmitters: sympathetic = norepinephrine; parasympathetic = acetylcholine.',
  },
  {
    q: 'What are the 3 types of muscle tissue and their key features?',
    a: 'Skeletal: voluntary, striated, multinucleated, attached to bones — movement. Cardiac: involuntary, striated, single nucleus, intercalated discs, found only in heart — pumping blood. Smooth: involuntary, non-striated, single nucleus, found in walls of hollow organs (stomach, intestines, blood vessels) — peristalsis, vasoconstriction.',
  },
  {
    q: 'Explain negative feedback with a hormone example.',
    a: 'Negative feedback: a system response that opposes the original stimulus, maintaining homeostasis. Example: thyroid hormone regulation — low T3/T4 → hypothalamus releases TRH → pituitary releases TSH → thyroid produces T3/T4 → rising T3/T4 INHIBITS TRH and TSH release. Keeps hormone levels stable. Most endocrine systems use negative feedback.',
  },
]

const benefits = [
  { title: 'Every body system, every detail', body: 'Type any system — "cardiovascular system functions", "nervous system neurotransmitters" — or upload your human biology textbook. AI generates cards covering structures, functions, and clinical connections.' },
  { title: 'Integrated, not isolated', body: 'Esli generates cards that connect body systems — how the endocrine system regulates the cardiovascular system, how the nervous system controls digestion — the integrative thinking your exams test.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Cards you struggle with resurface sooner, building long-term retention of the body systems facts and processes that are hardest to memorize.' },
  { title: 'No signup required', body: 'Start generating human biology flashcards in seconds. No account needed. No credit card. Free forever for core features.' },
]

export default function HumanBiologyFlashcardsPage() {
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
                <span className="text-primary-600">Human Biology Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any body system or upload your human biology textbook and get a complete study deck in seconds. Cardiovascular, nervous, endocrine, and all major systems — AI-generated, studied with spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Cardiovascular System', 'Nervous System', 'Endocrine System', 'Respiratory System', 'Digestive System', 'Musculoskeletal', 'Immune System', 'AP Human Biology'].map((tag) => (
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
                  Generate Human Biology Flashcards Free
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
                Human biology flashcards in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a complete body systems deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your biology topic',
                  body: 'Enter anything — "cardiovascular system", "nervous system neurotransmitters", "homeostasis mechanisms" — or upload a PDF of your human biology textbook or lecture slides.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A flashcards covering structures, functions, processes, and clinical connections for every topic — tailored to the depth your course requires.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards with the SM-2 algorithm. The body systems facts you find hardest resurface more often, building genuine long-term retention.',
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
                Example human biology flashcards
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
                Generate Your Human Biology Deck Free
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
                Why biology students choose Esli
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
                Human biology flashcard FAQs
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
              Ready to master human biology?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any body system — cardiovascular, nervous, endocrine — in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Human Biology Flashcards Free
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
              <a href="/flashcards/biology" className="hover:text-white transition-colors no-underline">General Biology</a>
              <a href="/flashcards/anatomy" className="hover:text-white transition-colors no-underline">Anatomy</a>
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
