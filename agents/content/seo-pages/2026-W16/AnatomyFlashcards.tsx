/**
 * SEO Landing Page: Anatomy Flashcards
 * Route: /flashcards/anatomy
 * Meta title: Anatomy Flashcards Free — AI Generator | Esli
 * Meta description: Generate anatomy flashcards with AI. Type any anatomy topic — bones, muscles, nerves, organs — and get study-ready cards in seconds. Free, spaced repetition.
 * Target keywords: anatomy flashcards, anatomy flashcards free, human anatomy flashcards, anatomy study cards
 * Week: 2026-W16
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
      name: 'Are anatomy flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. Generate unlimited anatomy flashcards with AI — bones, muscles, nerves, organs, histology — study with spaced repetition, and access all features at no cost. No credit card required.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate anatomy flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any anatomy topic — "upper limb muscles and their innervation", "cranial nerves functions", "bones of the foot" — and Esli\'s AI generates a complete set of Q&A flashcards covering the key facts, clinical correlations, and mnemonics. You can also upload a PDF of your anatomy notes or Gray\'s Anatomy excerpts and Esli will create cards automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Esli help me study for anatomy practical exams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can generate targeted decks for specific lab practical topics — "surface anatomy landmarks", "abdominal quadrant contents", "brachial plexus branches" — and study them with spaced repetition so the information sticks for practical exams, not just written tests.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli support anatomy images on flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli currently generates text-based Q&A cards. For anatomy, this means detailed written descriptions of structures, locations, functions, and clinical relevance. Image-based labeling cards are on the product roadmap. For now, pair Esli\'s text cards with your atlas for the best study combination.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli good for first-year medical and dental students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Anatomy is one of the highest-volume memorization subjects in first-year medicine and dentistry. Esli\'s AI generation means you can build a complete deck for any body region in minutes rather than hours. The SM-2 spaced repetition algorithm then schedules cards to resurface at the ideal time — so you retain the material through exams and into clinical years.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the rotator cuff muscles, their origins, insertions, and actions?',
    a: 'SITS: Supraspinatus (initiates abduction), Infraspinatus (lateral rotation), Teres Minor (lateral rotation), Subscapularis (medial rotation). All insert on the greater/lesser tubercle of the humerus. All from the scapula. Innervated by suprascapular (SS + IS) and axillary (TM) and subscapular (Sub) nerves.',
  },
  {
    q: 'Name the 12 cranial nerves in order with their primary function (sensory/motor/both).',
    a: 'I Olfactory (S), II Optic (S), III Oculomotor (M), IV Trochlear (M), V Trigeminal (B), VI Abducens (M), VII Facial (B), VIII Vestibulocochlear (S), IX Glossopharyngeal (B), X Vagus (B), XI Accessory (M), XII Hypoglossal (M). Mnemonic: "Oh, Oh, Oh, To Touch And Feel Very Good Velvet. AH!"',
  },
  {
    q: 'What structures pass through the inguinal canal in males vs. females?',
    a: 'Males: spermatic cord (contains vas deferens, testicular artery, pampiniform plexus, cremasteric muscle, genital branch of genitofemoral nerve, lymphatics). Females: round ligament of the uterus. Both: ilioinguinal nerve (runs alongside).',
  },
  {
    q: 'Describe the blood supply to the heart — coronary arteries and their territories.',
    a: 'Right Coronary Artery (RCA): right ventricle, inferior wall of LV, SA + AV nodes (dominant in 70%). Left Anterior Descending (LAD): anterior LV, interventricular septum (2/3). Left Circumflex (LCx): lateral LV wall. LAD = "widow maker" — occlusion causes anterior MI.',
  },
  {
    q: 'What is the femoral triangle — its boundaries and contents?',
    a: 'Boundaries: inguinal ligament (superior), sartorius (lateral), adductor longus (medial), iliopsoas + pectineus (floor). Contents (NAVEL lateral to medial): Nerve (femoral), Artery (femoral), Vein (femoral), Empty space, Lymphatics.',
  },
  {
    q: 'Describe the layers of the scalp (mnemonic SCALP).',
    a: 'S - Skin (hair follicles, sebaceous glands). C - Connective tissue (dense, vessels here — bleeds heavily). A - Aponeurosis (galea aponeurotica). L - Loose areolar tissue (danger zone — infection spreads here). P - Periosteum (pericranium). The first 3 layers move together as a unit.',
  },
]

const benefits = [
  { title: 'Any region, any depth', body: 'From gross anatomy basics to clinical correlations — generate a deck for the brachial plexus, the circle of Willis, or the pelvic floor in seconds.' },
  { title: 'Upload your lecture notes', body: 'Turn your anatomy lecture PDFs or Gray\'s Anatomy excerpts into a complete flashcard deck automatically. No manual card creation.' },
  { title: 'SM-2 spaced repetition', body: 'Anatomy is volume-heavy memorization. The SM-2 algorithm ensures structures you confuse resurface more often — so you actually retain them for exams.' },
  { title: 'Clinical correlations included', body: 'AI-generated cards naturally include clinical relevance — which nerve palsy, which fracture, which surgical landmark — making the material stick deeper.' },
]

const topicTags = ['Bones & Joints', 'Muscles', 'Nerves', 'Vasculature', 'Histology', 'Neuroanatomy', 'Embryology', 'Clinical Anatomy']

export default function AnatomyFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white">
        {/* ── Navbar ── */}
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

        {/* ── Hero ── */}
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
                <span className="text-primary-600">Anatomy Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any anatomy topic — bones, muscles, nerves, vasculature, histology — and get a complete set of study cards in seconds. Built for medical and dental students.
              </p>

              {/* Topic tags */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {topicTags.map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium bg-slate-100 text-slate-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate Anatomy Flashcards Free
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

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Master anatomy in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From topic to a full deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your anatomy topic',
                  body: 'Enter any structure or region — "brachial plexus", "muscles of the hand", "circle of Willis" — or upload a PDF of your anatomy lecture notes.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Cards include origins, insertions, functions, innervation, blood supply, clinical correlations, and mnemonics — exactly what you need for exams.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 scheduling resurfaces the structures you confuse most, at the ideal time. Retain everything through practicals and written exams.',
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

        {/* ── Sample Cards ── */}
        <section id="sample-cards" className="py-20 sm:py-28 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Example anatomy flashcards
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
                Generate Your Anatomy Deck Free
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>

        {/* ── Benefits ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Why med students choose Esli for anatomy
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

        {/* ── FAQ ── */}
        <section id="faq" className="py-20 sm:py-28 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Anatomy flashcard FAQs
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

        {/* ── Final CTA ── */}
        <section className="py-20 bg-primary-600">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to ace your anatomy exams?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate a complete anatomy deck for any topic in seconds. Free forever. No signup required to try.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Anatomy Flashcards Free
              <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* ── Footer ── */}
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
