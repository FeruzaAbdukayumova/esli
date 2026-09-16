/**
 * SEO Landing Page: French Grammar Flashcards
 * Route: /flashcards/french-grammar
 * Meta title: French Grammar Flashcards Free — AI | Esli (48 chars)
 * Meta description: Generate French grammar flashcards with AI. Verb conjugations, subjunctive, tenses — free, spaced repetition. No signup. (123 chars)
 * Target keywords: French grammar flashcards, French verb conjugation flashcards, French subjunctive flashcards, French tense flashcards, learn French grammar app
 * Week: 2026-W38
 * Note: W18 has French vocabulary (separate keyword cluster) — this page targets grammar-specific searches.
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
      name: 'Are French grammar flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited French grammar flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What French grammar topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any grammar topic: present tense, passé composé vs imparfait, futur simple, conditionnel, subjonctif, imperative mood, gender and agreement, object pronouns, relative clauses, negation patterns, and more. Type the grammar point (e.g. "French subjunctive triggers") and AI generates targeted cards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me learn French verb conjugations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any verb or conjugation group (e.g. "-ir verbs present tense", "être passé composé all persons", "irregular subjunctive forms") and Esli generates cards for every person and number, plus example sentences for context. Spaced repetition makes conjugations stick — not just recognizable, but retrievable.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli compare to Duolingo for learning French grammar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo is excellent for vocabulary and basic sentence practice. Esli is specialized for grammar retention — you can target a specific tense, drill it with spaced repetition, and actually internalize the rule. Many learners use both: Duolingo for immersive practice, Esli for grammar rules and conjugation tables they need to memorize.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli useful for DELF/DALF or AP French preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Specify the exam in your topic prompt — "DELF B2 grammar structures", "AP French subjunctive expressions", "DALF C1 complex sentence patterns" — and Esli generates cards targeted at that level. You can also upload your prep materials as PDFs for automatic card generation.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between passé composé and imparfait? Give one example of each.',
    a: 'Passé composé: completed action with a defined endpoint — "J\'ai mangé une pomme" (I ate an apple). Imparfait: ongoing, habitual, or background state — "Je mangeais une pomme quand il est arrivé" (I was eating an apple when he arrived).',
  },
  {
    q: 'List the 6 most common verbs that trigger the subjunctive.',
    a: 'vouloir que (to want that), falloir que (to be necessary that), douter que (to doubt that), être content(e) que (to be happy that), craindre que (to fear that), bien que (although). These express wish, obligation, doubt, emotion, or concession.',
  },
  {
    q: 'How do you form the conditionnel présent (present conditional)?',
    a: 'Take the futur simple stem (usually the infinitive) + imparfait endings: -ais, -ais, -ait, -ions, -iez, -aient. Example: parler → je parlerais, tu parlerais, il parlerait, nous parlerions, vous parleriez, ils parleraient.',
  },
  {
    q: 'What is the rule for agreement of the past participle with avoir in passé composé?',
    a: 'With avoir, the past participle agrees with a preceding direct object. "Les livres qu\'il a lus" (agreement with les livres, preceding DO). No agreement when the DO follows: "Il a lu les livres." The object pronoun triggers agreement: "Il les a lus."',
  },
  {
    q: 'When do you use "depuis" vs "il y a" to talk about time in French?',
    a: '"Depuis" + present tense = ongoing action that started in the past: "J\'apprends le français depuis deux ans" (I\'ve been learning French for 2 years — still ongoing). "Il y a" + passé composé = completed action at a past point: "J\'ai commencé il y a deux ans" (I started 2 years ago).',
  },
  {
    q: 'What are the two types of French object pronouns and where do they go in a sentence?',
    a: 'Direct object pronouns (me, te, le, la, nous, vous, les) and indirect object pronouns (me, te, lui, nous, vous, leur). They go before the conjugated verb: "Je le vois" (I see him/it). With an infinitive, they go before the infinitive: "Je veux le voir."',
  },
]

const benefits = [
  { title: 'Target exact grammar points', body: 'Don\'t study all of French — drill the specific tense or structure you\'re struggling with. Generate a deck for just the subjunctive, or just irregular futur stems.' },
  { title: 'Real sentences, not isolated rules', body: 'AI-generated cards include example sentences so you learn grammar in context, not as abstract formulas to memorize.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Grammar rules you struggle with resurface sooner, so you stop making the same mistakes in conversation.' },
  { title: 'Upload your class materials', body: 'Turn your professor\'s grammar handouts, textbook chapters, or DELF prep guides into a flashcard deck automatically.' },
]

export default function FrenchGrammarFlashcardsPage() {
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
                <span className="text-primary-600">French Grammar</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any French grammar topic and get targeted flashcards in seconds. Verb conjugations, tenses, subjunctive, pronouns — study the exact structures you struggle with, retained through spaced repetition.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Verb Conjugations', 'Passé Composé', 'Imparfait', 'Subjonctif', 'Conditionnel', 'Object Pronouns', 'Gender & Agreement', 'DELF / AP French'].map((tag) => (
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
                  Generate French Grammar Flashcards Free
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
                French grammar mastery in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Target the exact structures you struggle with.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your grammar topic',
                  body: 'Enter the specific structure you want to drill — "French subjunctive triggers", "passé composé agreement rules", "irregular futur stems" — or upload a grammar handout or textbook chapter as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards for that specific grammar point: rules, examples, exceptions, and common mistakes — not generic vocabulary filler.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at the optimal moment. Grammar rules resurface before you forget them, so you stop making the same errors.',
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
                Example French grammar flashcards
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
                Generate Your French Grammar Deck Free
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
                Why French learners choose Esli
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
                French grammar flashcard FAQs
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
              Stop second-guessing French grammar
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Target the exact structures you struggle with. Generate, study, retain — free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate French Grammar Flashcards Free
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
              <a href="/flashcards/spanish" className="hover:text-white transition-colors no-underline">Spanish Flashcards</a>
              <a href="/flashcards/german-vocabulary" className="hover:text-white transition-colors no-underline">German Vocabulary</a>
              <a href="/use-case/language-learners" className="hover:text-white transition-colors no-underline">For Language Learners</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
