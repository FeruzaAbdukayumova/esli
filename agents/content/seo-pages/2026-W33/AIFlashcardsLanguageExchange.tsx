/**
 * SEO Landing Page: AI Flashcards for Language Exchange Partners
 * Route: /use-case/language-exchange
 * Meta title: AI Flashcards for Language Exchange — Free | Esli
 * Meta description: Build vocab flashcards before your iTalki or Tandem sessions. Esli generates
 *   conversation topic vocabulary with AI — free, spaced repetition. No signup.
 * Target keywords: flashcards for language exchange, iTalki study flashcards, language partner
 *   vocab prep, Tandem flashcards, conversation vocabulary flashcards
 * Week: 2026-W33
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
      name: 'How can Esli help me prepare for language exchange sessions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Before each session, type your conversation topic into Esli — "talking about work in Spanish", "Japanese vocabulary for discussing hobbies", "French food and cooking vocabulary" — and get a targeted flashcard deck in seconds. Review it with spaced repetition before your session so the words come naturally in conversation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for language exchange learners?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited vocabulary flashcards, study with spaced repetition, and access all features at no cost. No subscription, no credit card.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which languages does Esli support for flashcard generation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli\'s AI can generate flashcards for vocabulary in any language your language exchange partner speaks — Spanish, French, German, Japanese, Korean, Mandarin, Italian, Portuguese, Arabic, Russian, Turkish, Hindi, and more. The interface supports 14 languages, and card translations cover 13 languages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me learn conversation-specific phrases, not just vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can prompt Esli for phrase-level cards: "common Japanese phrases for discussing weekend plans", "polite ways to disagree in French", "Korean expressions for surprise and disbelief". The AI generates cards showing the phrase, pronunciation guide, and usage example — not just isolated vocabulary.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Duolingo for language exchange prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duolingo teaches a fixed curriculum at a fixed pace. Esli lets you generate custom flashcards for exactly the vocabulary you\'ll need in your next language exchange session — on your topic, at your level, right now. If your partner wants to discuss climate policy, you can have 20 relevant vocabulary cards ready in under a minute.',
      },
    },
  ],
}

const platforms = [
  { name: 'iTalki', description: 'Prep vocab before sessions with professional tutors or community partners' },
  { name: 'Tandem', description: 'Build topic-specific word lists for your text and voice exchange chats' },
  { name: 'HelloTalk', description: 'Generate cards from words your partners correct in your messages' },
  { name: 'Speaky / Conversation Exchange', description: 'Show up to every session with the vocabulary for your planned topic' },
]

const exampleDecks = [
  { topic: 'Japanese: talking about my job', lang: 'Japanese' },
  { topic: 'Spanish: weekend plans and hobbies', lang: 'Spanish' },
  { topic: 'French: food, restaurants, and cooking', lang: 'French' },
  { topic: 'Korean: expressing emotions and opinions', lang: 'Korean' },
  { topic: 'Mandarin: travel and transportation', lang: 'Mandarin' },
  { topic: 'German: health and fitness vocabulary', lang: 'German' },
]

const sampleCards = [
  {
    q: 'How do you say "I\'ve been studying Japanese for about a year" in Japanese?',
    a: '日本語を一年ぐらい勉強しています。(Nihongo wo ichi-nen gurai benkyou shite imasu.) — Use ぐらい (gurai) to soften "about" — natural and humble.',
  },
  {
    q: 'What is the Spanish word for "commute" and how do you use it naturally in conversation?',
    a: '"El trayecto al trabajo" (the commute) or "ir y venir del trabajo". Example: "El trayecto me lleva una hora en metro." — Note: there is no single-word direct translation; phrases are more natural.',
  },
  {
    q: 'How do you politely interrupt someone in French to ask for clarification?',
    a: '"Pardon, je n\'ai pas bien compris — tu peux répéter ?" or "Excuse-moi de t\'interrompre, mais..." — In informal exchange: "Attends, tu veux dire que...?" — Always pair with a rising intonation.',
  },
  {
    q: 'What is the Korean expression for "That\'s exactly how I feel" used in casual conversation?',
    a: '저도 그렇게 느껴요 (Jeo-do geureoke neukkyo-yo) — formal/polite. Casual: 나도 그런 느낌이야 (Na-do geureon neukkimi-ya). Use 공감해요 (gongam-haeyo) to say "I empathize / I relate to that."',
  },
  {
    q: 'How do you describe your job in German if you are a software developer?',
    a: '"Ich bin Softwareentwickler/in." or "Ich arbeite als Entwickler/in in einem Tech-Unternehmen." Useful vocab: die Softwareentwicklung (software development), das Programm schreiben (to write code), das Team (team), die Deadline (deadline).',
  },
  {
    q: 'What is the Mandarin phrase for "I understand" that sounds natural (not just 我明白)?',
    a: '我明白了 (Wǒ míngbái le) — I understand now. 原来如此 (Yuánlái rúcǐ) — Ah, I see / So that\'s how it is. 我懂了 (Wǒ dǒng le) — informal "got it". 明白 alone sounds too clipped — add 了 for naturalness.',
  },
]

const benefits = [
  {
    title: 'Topic-specific vocab before every session',
    body: 'Type your conversation topic 15 minutes before your session. Get 20+ targeted vocabulary cards. Show up prepared instead of scrambling for words mid-conversation.',
  },
  {
    title: 'Turn corrections into flashcards',
    body: 'When your language partner corrects you, note the word or phrase. Type it into Esli and get a flashcard with the correct form, usage, and example sentences — so you never repeat the same mistake.',
  },
  {
    title: 'Phrase-level cards, not just vocabulary',
    body: 'Ask for conversational phrases, discourse markers, or expressions for specific situations — not just word lists. The AI understands conversational context.',
  },
  {
    title: 'Spaced repetition keeps session vocab active',
    body: 'SM-2 algorithm resurfaces new words at the right interval — you\'ll remember vocabulary from last Tuesday\'s session when it becomes relevant again in this week\'s conversation.',
  },
]

export default function AIFlashcardsLanguageExchangePage() {
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
                <span className="text-primary-600">Language Exchange</span>{' '}
                — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate targeted vocabulary flashcards for your next iTalki, Tandem, or HelloTalk session. Type your conversation topic, get 20+ cards in seconds, review with spaced repetition. Never run out of words again.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['iTalki', 'Tandem', 'HelloTalk', 'Speaky', 'Japanese', 'Spanish', 'French', 'Korean'].map((tag) => (
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
                  Generate Session Vocab Free
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

        {/* Platform grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Works alongside your favorite language exchange app
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {platforms.map((p) => (
                <div key={p.name} className="p-5 bg-white rounded-xl border border-slate-200 text-center hover:border-primary-200 hover:shadow-md transition-all">
                  <p className="font-semibold text-slate-900 mb-2">{p.name}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.description}</p>
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
                Session prep in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                15 minutes before your session, you could have the vocabulary you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your session topic',
                  body: 'Enter "Japanese: talking about work and career", "Spanish: describing your neighborhood", or "French: discussing current events". Be specific — you get better cards.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates conversation vocab',
                  body: 'Get 15-25 flashcards with words, phrases, example sentences, and usage notes — all targeted to the specific conversation context, not generic vocabulary.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Review, then practice with your partner',
                  body: 'Quick 10-minute review before your session activates the vocabulary. Spaced repetition keeps it live for next time so you build on each session.',
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

        {/* Example deck prompts */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Example decks language learners generate
              </h2>
              <p className="mt-3 text-slate-600">These prompts each generate 15-25 targeted vocabulary cards in seconds.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {exampleDecks.map((d, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-200">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-primary-600" />
                  </div>
                  <p className="text-sm text-slate-700">"{d.topic}"</p>
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
                Example language exchange flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Conversation-ready phrases and vocab — click any card to flip it.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleCards.map((card, i) => (
                <div
                  key={i}
                  className="relative h-52 cursor-pointer [perspective:1200px]"
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
                Generate Your Session Vocab Free
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
                Why language exchange learners use Esli
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

            <div className="mt-10 text-center">
              <p className="text-sm text-slate-500">
                Also useful for:{' '}
                <a href="/use-case/language-learners" className="text-primary-600 hover:underline">Language Learners</a>
                {' · '}
                <a href="/flashcards/japanese-vocabulary" className="text-primary-600 hover:underline">Japanese Vocabulary</a>
                {' · '}
                <a href="/flashcards/spanish" className="text-primary-600 hover:underline">Spanish Flashcards</a>
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Language exchange flashcard FAQs
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
              Never run out of words in conversation
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate conversation-ready vocabulary for your next session in 60 seconds. Free, forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Language Exchange Vocab Free
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
