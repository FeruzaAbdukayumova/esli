/**
 * SEO Landing Page: Nursing Pharmacology Flashcards
 * Route: /flashcards/nursing-pharmacology
 * Meta title: Nursing Pharmacology Flashcards — AI Generator | Esli
 * Meta description: Generate nursing pharmacology flashcards with AI. Drug classes, NCLEX pharm, mechanisms of action — type any topic and get cards free.
 * Target keywords: nursing pharmacology flashcards, pharmacology mnemonics flashcards, NCLEX pharmacology flashcards, drug class flashcards free, nursing pharm study cards
 * Week: 2026-W23
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
      name: 'Are nursing pharmacology flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited nursing pharmacology flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate NCLEX pharmacology flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type "NCLEX pharmacology high-yield drugs", "beta blockers nursing considerations", "antihypertensives drug class", or any pharm topic and Esli generates high-yield nursing flashcards in seconds. You can also upload your pharm textbook or review guide as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which pharmacology topics can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any topic: drug classifications (beta blockers, ACE inhibitors, statins, opioids, antibiotics), mechanisms of action, side effects and nursing considerations, high-alert medications, lab values to monitor, patient teaching points, antidotes, and NCLEX pharm test-taking strategy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my pharmacology textbook as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload Lehne\'s Pharmacology for Nursing, Davis\'s Drug Guide, Saunders NCLEX-RN review, or any pharm study guide PDF — Esli\'s AI extracts drug names, classes, mechanisms, side effects, and nursing implications into flashcards automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help with pharmacology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pharmacology requires memorizing hundreds of drug names, classes, and side effects. Esli\'s SM-2 spaced repetition surfaces the drugs you struggle with — like lookalike/soundalike pairs or high-alert meds — at increasing intervals until they\'re locked in long-term memory, not just crammed for a test.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the key nursing considerations for beta blockers (e.g., metoprolol, atenolol)?',
    a: 'Hold if HR < 60 bpm or SBP < 90 mmHg. Monitor for bradycardia, hypotension, fatigue, bronchospasm (avoid in asthma). Never stop abruptly — taper to prevent rebound hypertension/angina. Teach: do not skip doses; rise slowly to prevent orthostatic hypotension.',
  },
  {
    q: 'What is the antidote for heparin toxicity and what is the dose guideline?',
    a: 'Protamine sulfate — 1 mg per 100 units of heparin administered in last 2-4 hours (max 50 mg). Given slowly IV over 10 min; too fast causes hypotension/bradycardia. Monitor aPTT. Remember: "Protect against heparin with Protamine."',
  },
  {
    q: 'What are the ACE inhibitor side effects nurses must monitor and teach?',
    a: 'Dry, persistent cough (most common — up to 20%): switch to ARB if intolerable. Hyperkalemia: monitor K⁺, avoid potassium supplements. First-dose hypotension: take at bedtime. Angioedema: rare but life-threatening — hold drug, notify provider immediately. Suffix: "-pril" (lisinopril, enalapril).',
  },
  {
    q: 'What is the mechanism of action of warfarin and what lab monitors it?',
    a: 'Warfarin inhibits vitamin K-dependent clotting factors (II, VII, IX, X). Monitored with PT/INR — therapeutic INR is typically 2-3 (2.5-3.5 for mechanical heart valves). Antidote: Vitamin K (phytonadione) for over-anticoagulation; FFP for life-threatening bleeding.',
  },
  {
    q: 'What are the "5 Rights + 3 Checks" of medication administration?',
    a: 'Five Rights: Right patient, Right drug, Right dose, Right route, Right time. (Some add: Right documentation, Right reason.) Three Checks: Check MAR vs. medication label (1) when retrieving, (2) before preparing, (3) at bedside before administering.',
  },
  {
    q: 'What are the classic signs of digoxin toxicity and the therapeutic range?',
    a: 'Therapeutic range: 0.5-2 ng/mL. Toxicity signs: bradycardia, nausea/vomiting, visual disturbances (yellow-green halos, blurred vision), dysrhythmias. Risk factors: hypokalemia (most common precipitant), renal impairment, dehydration. Antidote: Digibind (digoxin immune Fab).',
  },
]

const benefits = [
  {
    title: 'Drug classes and side effects in seconds',
    body: 'Type "beta blockers nursing considerations", "NCLEX high-alert medications", or "anticoagulant antidotes" and get targeted cards covering mechanism, side effects, patient teaching, and nursing implications.',
  },
  {
    title: 'Upload your pharm textbook or review guide',
    body: "Turn Lehne's Pharmacology, Davis's Drug Guide, or any pharm PDF into a complete flashcard deck. Esli extracts drug names, classes, mechanisms, and nursing considerations automatically.",
  },
  {
    title: 'SM-2 spaced repetition',
    body: 'Pharmacology is a memorization marathon. SM-2 tracks which drugs you confuse — lookalikes, soundalikes, high-alert pairs — and resurfaces them at the optimal time to build genuine long-term retention.',
  },
  {
    title: 'Study anywhere on any device',
    body: 'Between clinical rotations, on break, or doing last-minute NCLEX review — your decks sync to any browser or phone. No app download needed.',
  },
]

export default function NursingPharmacologyFlashcardsPage() {
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
                <span className="text-primary-600">Nursing Pharmacology Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any pharm topic — drug classes, NCLEX high-yield medications, side effects, nursing considerations — and get a complete flashcard deck in seconds. Stop manually entering hundreds of drug names.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {[
                  'Beta Blockers',
                  'ACE Inhibitors',
                  'Anticoagulants',
                  'NCLEX High-Alert Meds',
                  'Antibiotics',
                  'Opioid Analgesics',
                  'Antidiabetics',
                  'Antidotes',
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
                  Generate Pharm Flashcards Free
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
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                The nursing pharm struggle is real
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Esli solves the problems that slow every nursing student down.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  problem: 'Hundreds of drugs to memorize — manually',
                  solution: 'Generate a full drug class deck from a single prompt in seconds',
                },
                {
                  problem: 'Premade decks don\'t match your course or textbook',
                  solution: 'Upload your own PDF and get cards tailored to your exact material',
                },
                {
                  problem: 'You cram before a test and forget a week later',
                  solution: 'SM-2 spaced repetition resurfaces weak spots at exactly the right time',
                },
                {
                  problem: 'No time between clinical rotations to make cards',
                  solution: 'AI generates a full deck in under a minute — study on any break',
                },
              ].map((item, i) => (
                <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
                  <p className="text-sm text-slate-500 line-through mb-1">{item.problem}</p>
                  <p className="text-sm font-medium text-slate-900 flex items-start gap-2">
                    <Check size={14} className="text-primary-600 mt-0.5 shrink-0" />
                    {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Pharm prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a complete drug class deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your pharm topic',
                  body: 'Enter anything — "beta blockers nursing", "NCLEX high-alert medications", "anticoagulant antidotes" — or upload Lehne\'s Pharmacology, Davis\'s Drug Guide, or your course notes as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates cards covering drug names, drug class, mechanism of action, key side effects, nursing considerations, and patient teaching points — all in one deck.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 tracks every drug you miss. Lookalike/soundalike pairs, high-alert meds, antidotes — they resurface at exactly the right interval until they\'re locked in for NCLEX.',
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
                Example nursing pharmacology flashcards
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
                Generate Your Pharm Deck Free
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
                Nursing pharm flashcard FAQs
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
              Ready to master nursing pharmacology?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of nursing students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Pharm Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also prepping for NCLEX?{' '}
              <a href="/flashcards/nclex" className="text-white underline hover:no-underline">
                NCLEX flashcards
              </a>{' '}
              and{' '}
              <a href="/use-case/medical-students" className="text-white underline hover:no-underline">
                medical student flashcards
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
