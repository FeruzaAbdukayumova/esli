/**
 * SEO Landing Page: Indonesian Vocabulary Flashcards
 * Route: /flashcards/indonesian-vocabulary
 * Meta title: Indonesian Vocabulary Flashcards Free — AI | Esli
 * Meta description: Generate Indonesian vocabulary flashcards with AI. A1-C2 levels, verb conjugation, Bahasa Indonesia basics — free, spaced repetition. No signup needed.
 * Target keywords: Indonesian flashcards, learn Indonesian flashcards, Bahasa Indonesia vocabulary, Indonesian vocabulary flashcards
 * Week: 2026-W44
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
      name: 'Are Indonesian flashcards on Esli really free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free to use. Generate unlimited Indonesian vocabulary flashcards with AI, study with spaced repetition, and access all core features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate Indonesian vocabulary flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any Indonesian topic (e.g. "Bahasa Indonesia greetings", "me-/ber- verb prefixes", "marketplace vocabulary") and our AI instantly creates a set of flashcards with Indonesian on one side and English on the other. You can also upload a PDF of your learning materials.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support Indonesian-English card translation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli supports card translation to and from 13 languages including Indonesian and English. You can generate cards in English and translate them to Indonesian, or create bilingual cards with the word, its pronunciation guide, and an example sentence.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I study Indonesian at different skill levels with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Generate level-specific decks: A1 (numbers, colors, greetings), A2 (daily routines, family, food), B1 (me-/ber- prefixes, ke-an suffixes, travel vocab), B2 (formal register, TOEFL-equivalent topics), up to C-level business and academic Bahasa Indonesia.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Indonesian hard to learn with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bahasa Indonesia is considered one of the easier Asian languages for English speakers — no tones, Latin alphabet, phonetic spelling, and no grammatical gender. Flashcards are especially effective for the core vocabulary and the affixation system (prefixes and suffixes that modify verb meaning). Most learners can hold basic conversations within 3-6 months of consistent study.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is "thank you" in Indonesian, and how do you respond?',
    a: 'Terima kasih (thank you). Responses: Sama-sama (you\'re welcome), Kembali (same), or De nada (informal, from Portuguese). "Terima" = receive, "kasih" = love — literally "receive love."',
  },
  {
    q: 'How does the "me-" prefix change a verb in Bahasa Indonesia?',
    a: 'me- marks the active voice transitive verb. tulis (write) → menulis (to write). baca (read) → membaca (to read). The prefix form changes based on the first letter of the base word: me-, mem-, men-, meng-, meny-, or me- with consonant doubling.',
  },
  {
    q: 'What is the difference between "saya", "aku", and "gue" for "I"?',
    a: 'Saya = formal (office, strangers, presentations). Aku = informal/standard (friends, casual speech). Gue = Jakarta slang (very casual, young speakers). In writing, saya or aku. Never use gue in formal contexts.',
  },
  {
    q: 'How do you form the passive voice in Indonesian?',
    a: 'Replace me- prefix with di- prefix. menulis (to write, active) → ditulis (is written, passive). Key distinction: di- passive vs. di- preposition (di rumah = at home, di- verb = passive marker). No "by" word needed — "Buku itu ditulis." = "The book is written."',
  },
  {
    q: 'What are the 3 ways to say "you" in Bahasa Indonesia?',
    a: 'Anda = formal/polite (written, strangers). Kamu = informal (friends, equals). Kau/Engkau = literary/poetry, or very intimate. Avoid "Anda" with close friends (too stiff). In many contexts Indonesians use the person\'s name instead of "you."',
  },
  {
    q: 'What does the suffix "-kan" add to a verb in Indonesian?',
    a: '-kan adds a causative or benefactive meaning. beli (buy) → belikan (buy for someone). bawa (bring) → bawakan (bring for someone). It makes the action directed at or for someone else. Paired with me-: membawakan, membelikan.',
  },
]

const benefits = [
  { title: 'A1 to advanced — every level', body: 'Generate decks for complete beginners (greetings, numbers, colors) through advanced business and academic Bahasa Indonesia. Progress at your own pace.' },
  { title: '13-language card translation', body: 'Translate your Indonesian flashcards to English, Spanish, French, and 10 more languages. Perfect for multilingual learners or comparing languages.' },
  { title: 'SM-2 spaced repetition', body: 'The same algorithm as Anki. Vocabulary you miss resurfaces sooner; words you know are spaced out. Build a lasting Indonesian vocabulary, not just short-term memory.' },
  { title: 'Browser extension for immersion', body: 'Right-click any Indonesian word on a website — news article, subtitles, anything — and save it as a flashcard instantly. Turn everyday browsing into study time.' },
]

export default function IndonesianVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">Indonesian Vocabulary</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Bahasa Indonesia topic and get a complete set of flashcards in seconds. Greetings, verb prefixes, daily vocabulary, business Indonesian — every level covered. No paywall, no signup required.
              </p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Greetings & Basics', 'me-/ber- Prefixes', 'Daily Vocabulary', 'Numbers & Time', 'ke-an Suffixes', 'Travel Phrases', 'Business Indonesian', 'Formal vs Informal'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Indonesian Flashcards Free
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
                Learn Indonesian in 3 simple steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a full vocabulary deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your Indonesian topic',
                  body: 'Enter anything — "Bahasa Indonesia greetings A1", "me- prefix verbs", "Bali travel vocabulary" — or upload your learning materials as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Indonesian-English flashcards with the word, pronunciation notes, example sentences, and cultural context where relevant.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review cards with the SM-2 algorithm. New words resurface at the optimal moment. Build vocabulary that actually sticks.',
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
                Example Indonesian flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                These are the kinds of cards Esli generates — click any card to flip it.
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
                Generate Your Indonesian Deck Free
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
                Why Indonesian learners choose Esli
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
                Indonesian flashcard FAQs
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
              Selamat belajar — start studying Indonesian today.
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of language learners generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Indonesian Flashcards Free
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
              <a href="/flashcards/japanese-vocabulary" className="hover:text-white transition-colors no-underline">Japanese</a>
              <a href="/flashcards/korean-vocabulary" className="hover:text-white transition-colors no-underline">Korean</a>
              <a href="/flashcards/arabic-vocabulary" className="hover:text-white transition-colors no-underline">Arabic</a>
              <a href="/use-case/language-learners" className="hover:text-white transition-colors no-underline">Language Learners</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
