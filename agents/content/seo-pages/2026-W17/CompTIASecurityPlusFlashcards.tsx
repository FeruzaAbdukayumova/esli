/**
 * SEO Landing Page: CompTIA Security+ Flashcards
 * Route: /flashcards/comptia-security-plus
 * Meta title: CompTIA Security+ Flashcards — AI Generator | Esli
 * Meta description: Generate CompTIA Security+ flashcards with AI. Type any SY0-701 domain or topic and get study cards instantly. Free, spaced repetition. Pass faster.
 * Target keywords: CompTIA Security+ flashcards, Security+ study cards free, SY0-701 flashcards, CompTIA flashcards
 * Week: 2026-W17
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
      name: 'Are CompTIA Security+ flashcards on Esli free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free. You can generate unlimited Security+ flashcards with AI, study with spaced repetition, and access all core features — no credit card or account required to start.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does Esli generate Security+ flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Type any SY0-701 domain or topic — "Security+ cryptography algorithms", "network security protocols", "identity and access management", "incident response procedures" — and the AI creates accurate flashcard Q&As in seconds. You can also upload a Security+ study guide PDF (Professor Messer, CompTIA CertMaster, etc.) and Esli will extract the key concepts automatically.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Esli cover all SY0-701 exam domains?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can generate decks for all 5 SY0-701 domains: General Security Concepts (12%), Threats Vulnerabilities & Mitigations (22%), Security Architecture (18%), Security Operations (28%), and Security Program Management & Oversight (20%). Type the domain name or any subtopic and Esli generates a targeted deck instantly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli for other CompTIA exams too?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli works for any CompTIA certification: Network+ (N10-009), A+ Core 1 and Core 2, CySA+, PenTest+, CASP+, Cloud+, and more. Just type the exam code or any topic and get flashcards instantly. Many IT students use Esli to study for multiple CompTIA exams using the same account.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from Professor Messer or other Security+ resources?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professor Messer, CompTIA CertMaster, and Darril Gibson are great for learning concepts. Esli is for active recall practice — the most effective study technique for retention. Use Professor Messer to understand a concept, then generate flashcards on that topic in Esli to drill it until it sticks. Active recall + spaced repetition outperforms passive reading for exam prep.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the difference between symmetric and asymmetric encryption? Give an example of each.',
    a: 'Symmetric: same key encrypts and decrypts (fast, good for bulk data). Examples: AES, 3DES, RC4. Asymmetric: public key encrypts, private key decrypts (slower, good for key exchange). Examples: RSA, ECC, Diffie-Hellman. TLS uses asymmetric to exchange a symmetric session key.',
  },
  {
    q: 'What is a man-in-the-middle (MITM) attack, and what controls mitigate it?',
    a: 'MITM: attacker secretly intercepts and possibly alters communication between two parties. Mitigations: mutual TLS (mTLS), certificate pinning, HSTS, VPN, MFA, end-to-end encryption. Detection: unexpected certificate changes, SSL/TLS warnings.',
  },
  {
    q: 'Explain the difference between IDS and IPS in terms of function and placement.',
    a: 'IDS (Intrusion Detection System) = passive — monitors and alerts. IPS (Intrusion Prevention System) = active — monitors and blocks. IDS is placed out-of-band (tap/mirror port). IPS is placed inline (traffic flows through it). IPS can block but adds latency risk. Exam tip: "detection" vs "prevention" = detect vs act.',
  },
  {
    q: 'What is the principle of least privilege, and which Security+ domain does it fall under?',
    a: 'Least privilege = users, processes, and systems should have only the minimum access needed to perform their function. Domain: Security Architecture / Identity and Access Management. Related concepts: need-to-know, role-based access control (RBAC), privilege access management (PAM), just-in-time (JIT) access.',
  },
  {
    q: 'What is the difference between a vulnerability scan and a penetration test?',
    a: 'Vulnerability scan = automated, non-exploitative scan that identifies potential weaknesses. Penetration test = authorized simulated attack that actually exploits vulnerabilities to confirm impact. Vulnerability scans are frequent and automated; pen tests are periodic and require skilled testers. Pen tests produce a risk-rated findings report.',
  },
  {
    q: 'What does "defense in depth" mean, and name 3 layers it typically includes.',
    a: 'Defense in depth = layered security strategy so that if one control fails, others remain. Typical layers: (1) Perimeter — firewalls, DMZ, WAF; (2) Network — IDS/IPS, segmentation, VLANs; (3) Endpoint — EDR, antivirus, host-based firewall; (4) Application — input validation, WAF; (5) Data — encryption, DLP, access controls.',
  },
]

const benefits = [
  { title: 'All 5 SY0-701 domains covered', body: 'Generate a targeted deck for any domain: General Security Concepts, Threats & Vulnerabilities, Security Architecture, Security Operations, or Program Management.' },
  { title: 'Upload Professor Messer PDFs', body: 'Have Professor Messer study notes or CompTIA CertMaster PDFs? Upload them and Esli generates flashcards from your exact materials.' },
  { title: 'Scenario-based Q&A format', body: 'AI generates cards in the scenario-based style that Security+ uses on the exam — not just definitions, but applied knowledge questions.' },
  { title: 'SM-2 spaced repetition', body: 'Optimize your study time. With 90+ objectives across 5 domains, spaced repetition ensures you cover everything without burning out.' },
]

const domainTags = ['General Security Concepts', 'Threats & Vulnerabilities', 'Security Architecture', 'Security Operations', 'Program Management', 'SY0-701']

export default function CompTIASecurityPlusFlashcardsPage() {
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
                <span className="text-primary-600">CompTIA Security+</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any SY0-701 domain or topic and get a full deck of scenario-based flashcards in seconds. Cover all 5 domains. Free, with spaced repetition.
              </p>

              {/* Domain tags */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {domainTags.map(tag => (
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
                  Generate Security+ Flashcards Free
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
                Build your Security+ deck in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From zero to a targeted study deck in under a minute.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your topic',
                  body: 'Enter any SY0-701 topic — "Security+ cryptography", "threat actors and attack vectors", "zero trust architecture" — or upload your Professor Messer or CertMaster PDF.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Our AI creates scenario-based flashcards matching the Security+ exam style — definitions, acronyms, applied scenarios, and "which solution fits this scenario" questions.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'SM-2 algorithm optimizes your review schedule. Hard concepts resurface more often. With 90+ exam objectives across 5 domains, efficient scheduling is key.',
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
                Example Security+ flashcards
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
                Generate Your Security+ Deck Free
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
                Why IT professionals choose Esli for Security+
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
                Security+ flashcard FAQs
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
              Ready to pass Security+?
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate targeted flashcards for all 5 SY0-701 domains. Any topic, in seconds. Free forever.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Security+ Flashcards Free
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
              <a href="/flashcards/aws-certification" className="hover:text-white transition-colors no-underline">AWS Certification</a>
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
