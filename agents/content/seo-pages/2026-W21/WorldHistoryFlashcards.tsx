/**
 * SEO Landing Page: World History Flashcards
 * Route: /flashcards/world-history
 * Meta title: World History Flashcards Free — AI Generator | Esli
 * Meta description: Generate world history flashcards with AI. AP World History, college surveys, test prep — type any era or event and get cards instantly. Free.
 * Target keywords: world history flashcards, AP World History flashcards, world history study cards free, history flashcards AI
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
      name: 'Are world history flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited world history flashcards with AI, study with spaced repetition, and access all features at no cost — no credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli generate AP World History flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any AP World History unit — "Period 1 to 1200 CE", "Mongol Empire", "Industrial Revolution causes", "Cold War decolonization" — and get exam-ready Q&A cards instantly. You can also upload your AP World textbook or review book as a PDF.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which world history periods can I make flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any period: ancient civilizations, classical empires (Rome, Han China, Gupta India), medieval Islamic world, Mongol Empire, Age of Exploration, Columbian Exchange, Industrial Revolution, World Wars I and II, Cold War, decolonization, and modern globalization.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload my AP World History textbook as a PDF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — Ways of the World, Traditions and Encounters, Barron\'s AP World History, Princeton Review, or your own notes — and Esli\'s AI extracts key people, events, dates, and cause-effect relationships and builds flashcards automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli better than premade world history decks on Quizlet?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Premade Quizlet decks cover generic content and often have errors or gaps. With Esli, you generate cards for exactly what your class or exam covers — your specific textbook, your teacher\'s focus areas, your AP exam units. And Esli uses spaced repetition, not just random review.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What were the main causes of World War I? (MAIN acronym)',
    a: 'M - Militarism (arms race, military buildup). A - Alliance System (Triple Alliance vs Triple Entente). I - Imperialism (colonial rivalry in Africa and Asia). N - Nationalism (ethnic nationalism in the Balkans, pan-Slavism). Immediate cause: assassination of Archduke Franz Ferdinand (June 1914).',
  },
  {
    q: 'What was the Columbian Exchange and what were its long-term effects?',
    a: 'The transfer of plants, animals, diseases, and ideas between the Americas and Europe/Africa/Asia after 1492. Effects: Old World gained maize, potatoes, tomatoes, cacao (boosted European population). New World received smallpox, measles, influenza (devastating indigenous populations — 90% decline). Transformed global diets and demographics.',
  },
  {
    q: 'What factors allowed the Mongol Empire to expand so rapidly in the 13th century?',
    a: 'Superior cavalry mobility and tactics; psychological warfare (terror reputation); Genghis Khan\'s meritocratic military organization (non-tribal unit mixing); superior siege warfare technology learned from conquered peoples; effective use of intelligence networks; ruthless treatment of resisters vs. generous treatment of those who surrendered.',
  },
  {
    q: 'Describe the causes and global consequences of the Industrial Revolution.',
    a: 'Causes: cheap coal and iron in Britain, enclosure movement (surplus labor), capital from Atlantic trade, patent system. Consequences: urbanization, rise of factory system and working class, environmental pollution, global imperialism (industrial powers sought raw materials and markets), population explosion, eventually global spread of industrialization to Europe and Japan.',
  },
  {
    q: 'What was the significance of the Silk Road in world history?',
    a: 'Connected China, Central Asia, Persia, Rome, and India (~200 BCE - 1450 CE). Transferred: silk, spices, porcelain (east-to-west); horses, glassware, gold (west-to-east). Also spread: Buddhism, Islam, Christianity, technology (paper, gunpowder), and diseases (Black Death, 14th c.). Decline: Ottoman blockade + sea route alternatives.',
  },
  {
    q: 'What were the key outcomes of the Congress of Vienna (1815)?',
    a: 'Restored conservative monarchies after Napoleon; redrew European borders (France reduced, German Confederation created, Congress Poland created); established "Concert of Europe" - a collective security system of great powers to manage conflicts; sought to suppress revolutionary nationalism. Principle: legitimacy and balance of power.',
  },
]

const benefits = [
  { title: 'Any era, any exam level', body: 'From ancient Mesopotamia to modern globalization — type any event, period, or theme and get cards covering causes, effects, key figures, and significance.' },
  { title: 'Upload your textbook or review book', body: 'Turn Ways of the World, Barron\'s AP World, or your own notes into a complete flashcard deck. Esli extracts events, dates, and cause-effect relationships automatically.' },
  { title: 'SM-2 spaced repetition', body: 'Cards you struggle with resurface at exactly the right time. Never confuse the Scramble for Africa with the Berlin Conference again.' },
  { title: 'Study anywhere, no install', body: 'Works in any browser on any device. Your decks sync across phone, tablet, and desktop — perfect for cramming on the go.' },
]

export default function WorldHistoryFlashcardsPage() {
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
                <span className="text-primary-600">World History Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any era, event, or theme — Mongol Empire, Cold War, AP World Period 4 — and get a complete flashcard deck in seconds. No manual entry, no generic premade decks.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Ancient Civilizations', 'Silk Road', 'Mongol Empire', 'Industrial Revolution', 'World Wars', 'Cold War', 'AP World History', 'Decolonization'].map(tag => (
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
                  Generate World History Flashcards Free
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
                History mastery in 3 simple steps
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
                  title: 'Type your history topic',
                  body: 'Enter any era, event, or exam unit — "AP World History Period 3", "causes of WWI", "Mughal Empire" — or upload your textbook or review guide as a PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates Q&A cards covering key people, events, dates, causes, consequences, and thematic connections — exactly what history exams test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'Review with SM-2. Events you confuse resurface sooner. Master chronology, causation, and comparison before the AP exam or finals.',
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
                Example world history flashcards
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
                Generate Your World History Deck Free
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
                Why history students choose Esli
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
                World history flashcard FAQs
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
              Ready to ace your history exam?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Join thousands of students generating smarter flashcards with AI. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate World History Flashcards Free
              <ArrowRight size={18} />
            </a>
            <p className="mt-6 text-primary-200 text-sm">
              Also studying social sciences? See our{' '}
              <a href="/flashcards/microeconomics" className="text-white underline hover:no-underline">microeconomics flashcards</a>{' '}
              and{' '}
              <a href="/flashcards/ap-biology" className="text-white underline hover:no-underline">AP Biology flashcards</a>.
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
