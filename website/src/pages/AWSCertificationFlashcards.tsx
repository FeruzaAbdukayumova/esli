/**
 * SEO Landing Page: AWS Certification Flashcards
 * Route: /flashcards/aws-certification
 * Meta title: AWS Certification Flashcards — AI Generator | Esli
 * Meta description: Generate AWS certification flashcards with AI. Type any AWS service or exam
 *   topic and get study cards instantly. Free, with spaced repetition. Pass faster.
 * Target keywords: AWS certification flashcards, AWS flashcards free, AWS Solutions Architect
 *   flashcards, Cloud Practitioner flashcards, AWS study cards
 * Week: 2026-W15
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
      name: 'Which AWS certifications can I study for with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli works for any AWS certification: Cloud Practitioner (CLF-C02), Solutions Architect Associate and Professional (SAA-C03, SAP-C02), Developer Associate (DVA-C02), SysOps Administrator (SOA-C02), DevOps Engineer Professional (DOP-C02), and all specialty certifications. Just type the exam code or service name as your topic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate flashcards for specific AWS services?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can prompt Esli with any AWS service — "Amazon S3 storage classes", "EC2 instance types and use cases", "AWS Lambda limits and pricing", "VPC networking concepts" — and get a targeted flashcard set covering the key facts, differences, and exam gotchas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload AWS whitepapers or study guides as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any PDF — AWS exam guide, a Stephane Maarek PDF summary, TutorialsDojo cheat sheets — and Esli will extract the key concepts and generate flashcards automatically. This is especially useful for the Well-Architected Framework whitepaper.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does spaced repetition help with AWS certification prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AWS exams require memorizing dozens of service limits, use-case distinctions, and service comparisons. Esli\'s SM-2 spaced repetition algorithm schedules reviews at increasing intervals based on how well you recall each card — so you spend more time on what you don\'t know and less on what you do, making your study time highly efficient.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for AWS certification study?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, Esli is completely free. You can generate unlimited flashcard decks, study with spaced repetition, and access all features at no cost. No credit card required.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between S3 Standard, S3-IA, and S3 Glacier?',
    a: 'Standard: frequent access, low latency, 99.99% availability.\nS3-IA (Infrequent Access): lower cost, retrieval fee, 99.9% availability.\nGlacier: archive storage, retrieval minutes-to-hours, lowest cost. Choose based on access frequency and retrieval latency needs.',
  },
  {
    q: 'When should you use an Application Load Balancer (ALB) vs Network Load Balancer (NLB)?',
    a: 'ALB: Layer 7, HTTP/HTTPS, path/host-based routing, WebSocket, Lambda targets — best for web apps.\nNLB: Layer 4, TCP/UDP, ultra-low latency, static IP, millions of req/sec — best for high-performance, non-HTTP workloads.',
  },
  {
    q: 'What is the maximum size of an SQS message?',
    a: '256 KB. For larger payloads, use the SQS Extended Client Library to store the message body in S3 and pass a reference in the SQS message.',
  },
  {
    q: 'What are the 5 pillars of the AWS Well-Architected Framework?',
    a: '1. Operational Excellence\n2. Security\n3. Reliability\n4. Performance Efficiency\n5. Cost Optimization\n(Mnemonic: "OSRPC" — Or Simply Remember Perfect Clouds)',
  },
  {
    q: 'What is the difference between an IAM Role and an IAM Policy?',
    a: 'Policy: a JSON document defining permissions (what actions are allowed/denied on which resources).\nRole: an IAM identity with policies attached that can be assumed by AWS services, users, or cross-account principals. Roles use temporary credentials (STS).',
  },
  {
    q: 'What is RTO vs RPO in AWS disaster recovery?',
    a: 'RTO (Recovery Time Objective): max acceptable downtime — how quickly you must restore.\nRPO (Recovery Point Objective): max acceptable data loss — how old the recovery point can be.\nLower = more expensive. DR strategies: Backup & Restore → Pilot Light → Warm Standby → Multi-Site Active/Active.',
  },
]

const benefits = [
  { title: 'Any exam, any service', body: 'SAA-C03, DVA-C02, CLF-C02 — prompt Esli with an exam code and get a complete study deck covering exam-weighted topics.' },
  { title: 'Upload AWS study materials', body: 'Turn Stephane Maarek slides, TutorialsDojo cheat sheets, or AWS whitepapers into flashcard decks with one upload.' },
  { title: 'Master service comparisons', body: 'AWS exams love "when to use X vs Y" questions. Generate comparison decks like "SQS vs SNS vs EventBridge" in one prompt.' },
  { title: 'SM-2 spaced repetition', body: 'Study smarter — not more. Esli schedules each card at the optimal interval so you retain service details through exam day.' },
]

export default function AWSCertificationFlashcardsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [flippedCard, setFlippedCard] = useState<number | null>(null)

  return (
    <>
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
                <span className="text-primary-600">AWS Certification Flashcards</span>{' '}
                with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any AWS service, exam code, or topic and get exam-ready flashcards instantly. Cover S3, EC2, IAM, VPC, Lambda, and every AWS service without manually creating a single card.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`${APP_URL}/register`}
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 shadow-lg shadow-primary-600/25 transition-all hover:shadow-xl hover:shadow-primary-600/30 no-underline"
                >
                  Generate AWS Flashcards Free
                  <ArrowRight size={18} />
                </a>
                <a
                  href="#sample-cards"
                  className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all no-underline"
                >
                  See Example Cards
                </a>
              </div>

              {/* Exam tags */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['CLF-C02', 'SAA-C03', 'SAP-C02', 'DVA-C02', 'SOA-C02', 'DOP-C02', 'ANS-C01', 'SCS-C02'].map((tag) => (
                  <span key={tag} className="px-3 py-1 text-xs font-medium text-slate-600 bg-slate-100 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section className="py-20 sm:py-28 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Pass your AWS exam in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Stop copy-pasting from documentation. Start generating.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Enter your exam topic',
                  body: '"AWS SAA-C03 storage services", "VPC networking for Solutions Architect", "Lambda concurrency and throttling" — be as specific as you want.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates flashcards covering service limits, use-case comparisons, exam gotchas, and architectural best practices.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study smarter with SRS',
                  body: 'Spaced repetition schedules harder cards more frequently — so S3 storage classes and IAM policies stick before exam day.',
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
                Example AWS flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to see the answer.
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
                      <p className="text-xs text-slate-700 text-center leading-relaxed whitespace-pre-line">{card.a}</p>
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
                Generate Your AWS Deck Free
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
                Why cloud professionals use Esli
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
                AWS certification flashcard FAQs
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
              Ready to pass your AWS exam?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate a complete study deck for any AWS certification exam — free, in seconds.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate AWS Flashcards Free
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
