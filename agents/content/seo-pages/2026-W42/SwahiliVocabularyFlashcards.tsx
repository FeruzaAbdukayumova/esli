/**
 * SEO Landing Page: Swahili Vocabulary Flashcards
 * Route: /flashcards/swahili-vocabulary
 * Meta title: Swahili Vocabulary Flashcards Free — AI | Esli
 * Meta description: Generate Swahili vocabulary flashcards with AI. A1-C2 levels, noun
 *   classes, verb conjugation — free, spaced repetition. No signup needed.
 * Target keywords: Swahili flashcards, learn Swahili flashcards, Swahili vocabulary flashcards,
 *   Swahili language flashcards, Swahili words flashcards, KCSE Swahili flashcards,
 *   Swahili noun classes flashcards, Swahili grammar flashcards
 * Week: 2026-W42
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
      name: 'Are Swahili flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited Swahili vocabulary flashcards with AI — greetings, noun classes, verb conjugation, A1 to C2 vocabulary — with spaced repetition included. No credit card or signup required.',
      },
    },
    {
      '@type': 'Question',
      name: 'What Swahili topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Any Swahili topic: greetings and daily expressions (habari, karibu, asante), noun classes (m/wa, m/mi, ki/vi, n/n, u, ku, pa), verb conjugation (present, past, future, negative, subjunctive, imperative), common vocabulary by theme (family, food, travel, work, body parts), numbers and time, Swahili proverbs (methali), conversational phrases, and KCSE exam preparation.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli help beginners learn Swahili vocabulary?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Swahili\'s biggest challenge for English speakers is the noun class system — 15+ classes that determine verb agreement prefixes. Esli generates cards that pair each new word with its noun class, the correct agreement prefix, and an example sentence. Type "Swahili noun classes" or "Swahili subject prefixes" and Esli generates a systematic deck. Upload a Swahili textbook PDF and Esli extracts vocabulary and grammar rules into flashcards.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why learn Swahili with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Swahili (Kiswahili) is Africa\'s most widely spoken language with 200+ million speakers across East and Central Africa. It is the official language of Tanzania, Kenya, Uganda, Rwanda, and the Democratic Republic of Congo. Unlike most African languages, Swahili uses the Roman alphabet and has phonetic spelling — what you see is what you say. Flashcards with spaced repetition are the fastest way to build vocabulary systematically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli for KCSE Swahili exam preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The KCSE (Kenya Certificate of Secondary Education) Swahili exam tests reading comprehension, grammar, composition, and literature. Type KCSE Swahili topics — "insha vocabulary", "methali na maana yake", "fasihi ya Kiswahili", or "nahau na maana" — and Esli generates targeted cards. Upload past KCSE papers or literature set book notes as PDFs and Esli turns them into a review deck.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'How do you say "Hello, how are you?" in Swahili?',
    a: 'Habari yako? (informal: "What is your news?") — response: Nzuri / Salama / Vizuri (Good / Fine / Well). Hujambo? (formal singular: "Is anything wrong with you?") — response: Sijambo (Nothing is wrong). Habari za asubuhi / mchana / jioni — "Good morning / afternoon / evening." Karibu = Welcome/Come in. Asante (sana) = Thank you (very much). Tafadhali = Please.',
  },
  {
    q: 'What is the m/wa noun class in Swahili and what does it contain?',
    a: 'The m/wa class is the primary class for people and animate beings. Singular prefix: m- (mtu = person, mtoto = child, mwalimu = teacher). Plural prefix: wa- (watu = people, watoto = children, walimu = teachers). Subject agreement: a- (singular) / wa- (plural). Example: Mtu anakwenda — "The person is going." Watoto wanakwenda — "The children are going." Adjective agreement also takes m-/wa- prefix.',
  },
  {
    q: 'How do you form the present tense in Swahili?',
    a: 'Structure: Subject prefix + tense marker + verb stem + a. Present tense marker: -na-. Prefixes: ni- (I), u- (you), a- (he/she), tu- (we), m- (you pl), wa- (they). Example: ni+na+soma+a = ninasoma (I am reading). u+na+soma+a = unasoma (you are reading). a+na+soma+a = anasoma (he/she is reading). Negative present: Subject prefix + si + verb stem: sisomi, husomi, hasomi.',
  },
  {
    q: 'What is the ki/vi noun class in Swahili?',
    a: 'The ki/vi class contains objects, abstractions, and some languages. Singular prefix: ki- (kitabu = book, kiti = chair, kiatu = shoe, Kiswahili = Swahili language). Plural prefix: vi- (vitabu = books, viti = chairs, viatu = shoes). Subject agreement: ki- (singular) / vi- (plural). Example: Kitabu kiko mezani — "The book is on the table." Vitabu viko mezani — "The books are on the table."',
  },
  {
    q: 'What is the Swahili verb "kwenda" and how does it conjugate?',
    a: 'Kwenda = to go. Present: ninaenda (I go/am going), unaenda, anaenda, tunaenda, mnaenda, wanaenda. Past (-li-): nilienda (I went). Future (-ta-): nitaenda (I will go). Negative present: siendi, huendi, haendi. Imperative: nenda! (go!, singular), nendeni! (go!, plural). Common phrases: kwenda wapi? (going where?), nenda nyumbani (go home), safari njema (safe journey).',
  },
  {
    q: 'Give examples of common Swahili proverbs (methali) and their meanings.',
    a: 'Haraka haraka haina baraka — "Haste haste has no blessing" (haste makes waste). Umoja ni nguvu, utengano ni udhaifu — "Unity is strength, division is weakness." Asiyesikia la mkuu huvunjika guu — "He who does not heed elders breaks a leg" (listen to wisdom). Mchezo wa kuigiza una mwisho — "A pretend game has an end" (truth always comes out). Methali are tested on KCSE and used in formal Swahili writing.',
  },
]

const benefits = [
  { title: 'The only Swahili AI flashcard generator', body: 'No major flashcard app has dedicated Swahili AI generation. Type any Swahili topic — noun classes, verb tenses, themed vocabulary — and Esli generates a complete, accurate deck in seconds.' },
  { title: 'Noun class system made systematic', body: 'The m/wa, ki/vi, m/mi, n/n classes and their agreement prefixes are the hardest part of Swahili for new learners. Esli generates cards that drill each class with examples and agreement patterns.' },
  { title: 'Upload your Swahili textbook or notes', body: 'Upload your Swahili course PDF, KCSE notes, or Peace Corps Swahili manual and Esli extracts vocabulary, grammar rules, and phrases into a targeted flashcard deck.' },
  { title: 'Study in Swahili, English, or both', body: 'Esli supports 13 languages for card translation. Create Swahili-English cards, or add French, German, or Arabic translations for multilingual speakers learning Swahili as a third language.' },
]

export default function SwahiliVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">Swahili Vocabulary Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any Swahili topic and get a complete flashcard deck in seconds. Noun classes, verb conjugation, greetings, themed vocabulary — AI-powered with spaced repetition.
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {['Greetings & Daily Life', 'Noun Classes (m/wa)', 'Ki/Vi Class', 'Verb Conjugation', 'Present & Past Tense', 'Swahili Numbers', 'Methali (Proverbs)', 'KCSE Prep'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full">{tag}</span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Swahili Flashcards Free
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
                Swahili fluency in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From habari to complex verb forms — faster than a textbook, smarter than a wordlist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your Swahili topic',
                  body: 'Enter any topic — "Swahili m/wa noun class", "Swahili past tense -li-", "Swahili greetings A1", "KCSE Swahili vocabulary" — or upload your Swahili course PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI builds your deck',
                  body: 'Esli generates vocabulary and grammar cards with noun class labels, agreement prefixes, and example sentences — the context that makes Swahili structure stick.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm resurfaces words and grammar rules right before you forget them. Build a permanent Swahili vocabulary systematically, not randomly.',
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
                Example Swahili flashcards
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
                Generate Your Swahili Deck Free
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
                Why Swahili learners choose Esli
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
                Swahili flashcard FAQs
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
              Ready to learn Swahili?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate Swahili flashcards with AI — greetings, noun classes, verb conjugation, KCSE prep — free, with spaced repetition. Start building real Swahili fluency today.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Swahili Flashcards Free
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
              <a href="/flashcards/japanese-vocabulary" className="hover:text-white transition-colors no-underline">Japanese Flashcards</a>
              <a href="/flashcards/arabic-vocabulary" className="hover:text-white transition-colors no-underline">Arabic Flashcards</a>
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
