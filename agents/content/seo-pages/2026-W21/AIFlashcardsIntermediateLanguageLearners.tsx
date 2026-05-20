/**
 * SEO Landing Page: AI Flashcards for Intermediate Language Learners
 * Route: /use-case/intermediate-language-learners
 * Meta title: AI Flashcards for Intermediate Language Learners | Esli
 * Meta description: Stuck at B1/B2? Esli generates AI flashcards to break through the intermediate plateau. Any language, any topic. Free, spaced repetition.
 * Target keywords: intermediate language learning app, B1 B2 flashcards, language learning plateau, AI flashcards intermediate, break intermediate plateau
 * Week: 2026-W21
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
      name: 'What is the intermediate plateau in language learning?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The intermediate plateau is when learners reach B1/B2 level and progress stalls. Basic grammar and vocabulary are solid, but advancing further requires a much larger vocabulary (10,000+ words), mastering nuanced grammar, and internalizing natural phrasing. Most learners plateau here because beginner resources run out and advanced content feels too hard.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help intermediate language learners specifically?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli lets you generate flashcards on exactly what you\'re working on — B2 Spanish collocations, French subjunctive triggers, German separable verbs, advanced IELTS vocabulary — rather than generic beginner decks. The AI creates cards with context sentences, not just isolated words. Spaced repetition then spaces out review so you actually remember new vocabulary long-term.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I make flashcards for any language with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli works for any language — Spanish, French, German, Japanese, Mandarin, Italian, Portuguese, Korean, Arabic, Russian, and more. The interface is available in 14 languages, so you can study in your target language or your native language.',
      },
    },
    {
      '@type': 'Question',
      name: 'What kind of intermediate content can I generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Advanced vocabulary in thematic groups (business, travel, emotions, culture), grammar patterns (subjunctive triggers, conditional tenses, verb collocations), phrasal verbs and idioms, false cognates, formal vs informal register differences, and exam-specific vocabulary (DELF B2, IELTS, TestDaF, JLPT N3/N2).',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Duolingo or other apps for intermediate learners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo is designed for beginners and becomes less effective at intermediate levels. It can\'t generate cards for your specific vocabulary gaps or grammar weaknesses. Esli generates custom flashcard decks for exactly what you need — B2 subjunctive patterns, JLPT N2 kanji, or IELTS academic vocabulary — and uses scientifically proven spaced repetition to lock them in memory.',
      },
    },
  ],
}

const painPoints = [
  {
    problem: 'Generic beginner apps have nothing left to teach you',
    solution: 'Generate custom B1/B2/C1 decks for exactly your gaps — advanced vocab, grammar patterns, collocations',
  },
  {
    problem: 'New vocabulary doesn\'t stick — you learn it and forget it',
    solution: 'SM-2 spaced repetition resurfaces words at exactly the right interval so they move to long-term memory',
  },
  {
    problem: 'Grammar rules you "know" still feel unnatural',
    solution: 'Generate cards with context sentences and example usage — learn grammar in real patterns, not isolated rules',
  },
  {
    problem: 'Exam prep (DELF, IELTS, TestDaF, JLPT) requires very specific vocabulary',
    solution: 'Upload your exam prep book or type the exam and level — Esli generates exam-targeted vocabulary cards instantly',
  },
]

const sampleCards = [
  {
    q: 'Spanish: What triggers the subjunctive in a noun clause?',
    a: 'WEIRDO categories: Wishes (quiero que vengas), Emotion (me alegra que estés), Impersonal expressions (es importante que...), Requests (pido que...), Doubt/Denial (dudo que sea verdad), Ojalá. The subjunctive follows "que" when the main clause expresses desire, emotion, doubt, or recommendation about another subject.',
  },
  {
    q: 'French: What is the difference between "savoir" and "connaître"?',
    a: 'Savoir = to know facts, information, or how to do something (je sais que... / je sais nager). Connaître = to know a person, place, or thing through familiarity (je connais Paris / je connais Marie). "Je sais la réponse" (I know the answer) vs "Je connais la chanson" (I know the song - I\'m familiar with it).',
  },
  {
    q: 'German: Explain the difference between "seit", "vor", and "nach" with time.',
    a: 'Seit + Dativ = since / for (ongoing): "Ich lerne seit zwei Jahren Deutsch" (I\'ve been learning German for 2 years — still learning). Vor + Dativ = ago: "vor zwei Jahren" (two years ago). Nach + Dativ = after: "nach dem Unterricht" (after class). Key: seit uses present tense for ongoing actions where English uses present perfect.',
  },
  {
    q: 'Japanese (JLPT N3): What is the difference between ために (tame ni) and ように (you ni)?',
    a: 'ために (tame ni) = in order to (deliberate goal, volitional verb follows): 医者になるために勉強する. ように (you ni) = so that / in order that (state change or ability, non-volitional or potential follows): 日本語が話せるように練習する. Also: ように is used with verbs like 気をつける, 頑張る when expressing a desired state.',
  },
  {
    q: 'English (IELTS/C1): What is the difference between "affect" and "effect"?',
    a: '"Affect" is usually a verb: "Stress affects sleep quality." "Effect" is usually a noun: "The effect of stress on sleep is significant." Memory trick: Affect=Action (verb), Effect=End result (noun). Exceptions: "to effect change" (verb, formal = to bring about); "positive affect" in psychology (noun). IELTS tests the verb/noun distinction.',
  },
  {
    q: 'Spanish B2: What is the difference between "por" and "para"?',
    a: 'Por: cause/reason (gracias POR), duration (POR dos horas), exchange (POR diez euros), on behalf of, means of communication/transport, approximate location. Para: purpose/goal (estudio PARA aprender), recipient (un regalo PARA ti), deadline (PARA el lunes), opinion (PARA mí), destination. Mnemonic: PARA = Purpose, Recipient, Deadline; POR = Cause, Exchange, Duration.',
  },
]

export default function AIFlashcardsIntermediateLanguageLearnersPage() {
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
                For B1, B2 and C1 Learners
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Break Through the{' '}
                <span className="text-primary-600">Intermediate Plateau</span>{' '}
                with AI Flashcards
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Stuck at B1/B2? Generic apps have nothing left to teach you. Esli generates custom flashcards for exactly your vocabulary gaps and grammar weaknesses — in any language.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['B1 / B2 / C1', 'Advanced Vocabulary', 'Grammar Patterns', 'Collocations', 'Exam Prep', '14 Languages', 'DELF / IELTS / JLPT', 'Spaced Repetition'].map(tag => (
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
                  Generate Your Flashcards Free
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
                The intermediate plateau is real — and fixable
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Here's what most B1/B2 learners face, and how Esli solves each problem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {painPoints.map((item, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
                  <p className="text-sm text-slate-400 line-through mb-3">{item.problem}</p>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={14} className="text-primary-600" />
                    </div>
                    <p className="text-sm font-medium text-slate-800 leading-relaxed">{item.solution}</p>
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
                From gap to fluency in 3 steps
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
                  title: 'Name your gap',
                  body: 'Type exactly what you\'re working on — "Spanish por vs para", "French B2 vocabulary", "JLPT N3 grammar", "German separable verbs" — or upload your exam prep book or graded reader as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds a targeted deck',
                  body: 'Esli generates cards with context sentences, usage notes, and contrast pairs — not just definitions. Perfect for the nuanced patterns that trip up intermediate learners.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Review with spaced repetition',
                  body: 'SM-2 schedules review at the optimal interval. New vocabulary transitions from short-term to long-term memory instead of fading within a week.',
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
                Example intermediate flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Cards like these — for exactly your language and level — in seconds. Click to flip.
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
                Generate Your Deck Free
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
                Intermediate language learning FAQs
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
              Ready to push past intermediate?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate custom flashcards for your exact level and language gaps. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Your Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              See also:{' '}
              <a href="/flashcards/spanish-vocabulary" className="text-white underline hover:no-underline">Spanish vocabulary</a>,{' '}
              <a href="/flashcards/french-vocabulary" className="text-white underline hover:no-underline">French vocabulary</a>,{' '}
              <a href="/flashcards/german-vocabulary" className="text-white underline hover:no-underline">German vocabulary</a>.
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
