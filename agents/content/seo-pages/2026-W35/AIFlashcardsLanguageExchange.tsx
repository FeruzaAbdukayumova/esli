/**
 * SEO Landing Page: AI Flashcards for Language Exchange Partners
 * Route: /use-case/language-exchange
 * Meta title: AI Flashcards for Language Exchange Partners | Esli (53 chars)
 * Meta description: Prepare vocabulary for iTalki, Tandem, and HelloTalk sessions with AI flashcards. Free, spaced repetition, no signup — speak with confidence. (149 chars)
 * Target keywords: AI flashcards for language exchange, iTalki vocabulary prep, language partner flashcards, Tandem study app, HelloTalk vocabulary
 * Week: 2026-W35
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
      name: 'How can AI flashcards help me prepare for language exchange sessions on iTalki, Tandem, or HelloTalk?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Language exchange is most productive when you arrive with targeted vocabulary ready to use — not struggling to retrieve words mid-conversation. Esli lets you generate flashcard decks by topic before each session: 'everyday routines vocabulary in Japanese', 'talking about my work as a software developer in Spanish', 'discussing climate change and current events in French'. 15 minutes of spaced repetition review before a conversation session builds the active vocabulary recall you need — not just passive recognition of words, but the ability to produce them spontaneously in conversation. You can also generate decks from words you looked up during sessions: export your vocabulary list and paste it into Esli for systematic SRS review.",
      },
    },
    {
      '@type': 'Question',
      name: 'What topics should I generate flashcards for before a language exchange session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The most effective pre-session flashcard topics are the ones that match what you plan to talk about. High-value prompt patterns: 'Talking about [your profession] in [target language]: 20 key words and phrases I need to describe my work, my daily tasks, and my career background', 'Discussing [current event / news topic] in [target language]: vocabulary, key phrases, and opinion language', 'Daily routines and lifestyle vocabulary in [target language]: morning routine, food, exercise, commute, weekend activities', 'Expressing opinions and agreeing/disagreeing in [target language]: hedging phrases, agreement expressions, polite disagreement', 'Emotions and how to describe feelings in [target language]: more nuanced than just happy/sad', '[Target language] slang and informal expressions that native speakers actually use — with English equivalents'. Session debrief: after a session, write down 10 words you couldn't remember or didn't know. Paste them into Esli for a targeted review deck.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me build vocabulary for a specific conversation topic?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. This is one of the strongest use cases for AI generation. Instead of a pre-made vocabulary list (which may not match your level or interests), you describe the conversation you want to have and Esli generates the exact vocabulary you need. Examples: 'I want to talk about cooking and traditional food from my home country in German — give me 20 words I will definitely need, with example sentences', 'I am going to discuss a recent movie I watched with my language partner in Korean — give me vocabulary for describing plot, characters, themes, and giving my opinion', 'I need to explain my travel experiences from last summer in Japanese — vocabulary for places, activities, food, and feelings'. The cards include the word in the target language, pronunciation guidance (for script-based languages like Japanese, Chinese, Arabic), meaning, and a natural example sentence — which you can study as a conversation model.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help with vocabulary retention between language exchange sessions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The spaced repetition algorithm (SM-2) ensures that vocabulary from past sessions resurfaces at the optimal moment before you forget it — not daily for words you know well, but more frequently for words you struggle to retrieve. For language exchange partners, this means vocabulary from session 1 is still available in session 10, not lost to the forgetting curve. Research (Ebbinghaus forgetting curve, Roediger & Karpicke 2006) shows that spaced retrieval practice produces 2-3x better long-term retention compared to passive review. A typical pattern: generate a 20-word deck before a session → review it in 15 minutes → session → add the words you missed → Esli resurfaces the whole deck in 1 day, then 3 days, then 7 days. After 3 reviews, most vocabulary moves to long-term memory.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for language learners doing language exchange?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, community decks, and card translation into 13 languages — no credit card required. Guest mode lets you start immediately without creating an account. Whether you use iTalki, Tandem, HelloTalk, Speaky, or in-person language exchange meetups, you can build vocabulary decks for any language and any topic at no cost.',
      },
    },
  ],
}

const painPoints = [
  {
    title: 'You know words but can\'t produce them fast enough',
    body: 'Passive recognition is not active recall. You can understand your partner, but the word you need doesn\'t come out. Spaced repetition specifically trains production — the ability to retrieve vocabulary spontaneously, the way conversation demands.',
  },
  {
    title: 'Sessions cover topics you didn\'t prepare vocabulary for',
    body: 'Your partner wants to talk about their job, a movie they watched, or news from their country — and you\'re unprepared. Topic-specific AI decks let you prepare for any conversation direction in under 10 minutes.',
  },
  {
    title: 'Words you learned in one session are gone by the next',
    body: 'Without review, 70% of new vocabulary disappears within 24 hours. Spaced repetition surfaces words from past sessions at exactly the right moment — before you forget them, not after.',
  },
  {
    title: 'Pre-made vocabulary lists don\'t match your conversations',
    body: 'Generic "1000 most common words" lists include vocabulary you already know and miss the words specific to your sessions. AI generation lets you build decks around your exact conversation topics and level.',
  },
]

const platforms = [
  { name: 'iTalki', desc: 'Community tutors and language partners worldwide. Prepare session-specific vocabulary packs before each lesson.' },
  { name: 'Tandem', desc: 'Text, voice, and video exchange with native speakers. Build vocabulary for your planned conversation topics in advance.' },
  { name: 'HelloTalk', desc: 'Social language learning with native speakers. Generate decks from vocabulary you encounter in chats.' },
  { name: 'Speaky', desc: 'Match with language exchange partners. Arrive prepared for topic-based conversations with targeted vocabulary.' },
  { name: 'ConversationExchange.com', desc: 'Traditional language exchange partners. Build systematic vocabulary review between in-person and online sessions.' },
  { name: 'Language meetups', desc: 'In-person language exchange events. Prepare culturally specific vocabulary and conversation starters in advance.' },
]

export default function AIFlashcardsLanguageExchangePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

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
                AI Flashcards for Language Learners
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
                Speak with Confidence in Every{' '}
                <span className="text-primary-600">Language Exchange</span>{' '}
                Session
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Generate AI flashcard decks for any conversation topic before your iTalki, Tandem, or HelloTalk session. 15 minutes of spaced repetition practice — and the vocabulary is there when you need it.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['iTalki Prep', 'Tandem', 'HelloTalk', 'Topic Vocabulary', 'Session Debrief', 'Active Recall', 'Conversation Starters', '13 Languages'].map((tag) => (
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
                  Generate Vocabulary Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See How It Works
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points */}
        <section className="py-20 sm:py-28 bg-slate-900">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                The language exchange vocabulary gap
              </h2>
              <p className="mt-4 text-lg text-slate-400">
                What holds most learners back — and how Esli fixes each one.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {painPoints.map((p, i) => (
                <div key={i} className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Build vocabulary for your next session in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Before, during, and after — a complete vocabulary system for language exchange.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Generate a topic vocabulary deck',
                  body: "Before your session: type 'talking about my work as a designer in Japanese' or 'discussing travel experiences in Spanish' and get 20 targeted vocabulary cards instantly — matched to your actual conversation plans.",
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'Review for 15 minutes before your call',
                  body: 'Spaced repetition activates vocabulary for active recall — not just recognition. The words you practice right before a session are available when you need them, not just when you read them.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Add session words to your review queue',
                  body: 'After your session: add the words you looked up or missed. Esli resurfaces them tomorrow, then in 3 days, then in a week — until they become automatic. Session vocabulary becomes permanent vocabulary.',
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

        {/* Platform grid */}
        <section className="py-20 sm:py-28 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Works with every language exchange platform
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Esli is the vocabulary companion that makes any language exchange more productive.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {platforms.map((p, i) => (
                <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-primary-200 hover:bg-primary-50 transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} className="text-primary-600 shrink-0" />
                    <h3 className="text-sm font-semibold text-slate-900">{p.name}</h3>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why language exchange partners choose Esli
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: 'Generate session-specific vocabulary in 60 seconds',
                  body: "No hunting through textbooks or YouTube videos for vocabulary that matches your planned topic. Type your conversation goal and Esli gives you the exact words and phrases you need — including natural example sentences you can model in conversation.",
                },
                {
                  title: 'Build vocabulary across 13 languages',
                  body: 'Japanese, Spanish, French, German, Korean, Chinese, Arabic, Portuguese, Italian, Hindi, Turkish, Vietnamese, Russian — generate AI vocabulary decks in any language you are learning, with the interface available in 14 languages.',
                },
                {
                  title: 'Convert post-session notes into review decks',
                  body: "After a session, you have a list of words you looked up or phrases your partner used. Don't let them fade. Paste your post-session vocabulary list into Esli for automatic SRS review — the friction of card creation disappears.",
                },
                {
                  title: 'Arrive confident instead of hesitating',
                  body: 'The difference between a productive session and a frustrating one is often vocabulary preparation. Students who review targeted vocabulary before sessions report speaking more fluently, relying less on their native language, and having more meaningful conversations.',
                },
              ].map((b, i) => (
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
              Make your next session your best one yet
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate vocabulary flashcards for your conversation topic in seconds. Free forever — no credit card, no signup required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Vocabulary Flashcards Free
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
              <a href="/use-case/language-learners" className="hover:text-white transition-colors no-underline">AI Flashcards for Language Learners</a>
              <a href="/flashcards/japanese-vocabulary" className="hover:text-white transition-colors no-underline">Japanese Vocabulary</a>
              <a href="/flashcards/spanish" className="hover:text-white transition-colors no-underline">Spanish Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
