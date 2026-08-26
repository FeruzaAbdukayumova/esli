/**
 * SEO Landing Page: Constitutional Law Flashcards
 * Route: /flashcards/constitutional-law
 * Meta title: Constitutional Law Flashcards Free — AI | Esli (52 chars)
 * Meta description: Generate constitutional law flashcards with AI. Judicial review, equal protection, due process, First Amendment — free, spaced repetition. (144 chars)
 * Target keywords: constitutional law flashcards, con law flashcards, Supreme Court cases flashcards, Bill of Rights flashcards, constitutional law study cards
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
      name: 'What constitutional law topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates constitutional law flashcards for the full 1L curriculum and bar exam: judicial review and justiciability (standing, mootness, ripeness, political question doctrine), the Commerce Clause and federal powers (Lopez, Morrison, Raich), individual rights under the Due Process Clauses (substantive and procedural, Lochner to Obergefell), equal protection (rational basis, intermediate scrutiny, strict scrutiny — with the triggering criteria for each), First Amendment (free speech categories, content-neutral vs content-based restrictions, the major doctrinal tests — O\'Brien, Central Hudson, Spence), Second Amendment (Bruen and the historical tradition test), Fourth and Fifth Amendment criminal procedure, and structural constitutional law (federalism, separation of powers, the non-delegation doctrine). Upload any casebook PDF chapter for instant targeted decks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to study for the Multistate Bar Exam (MBE) constitutional law questions?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The MBE tests constitutional law through fact patterns that require rapid identification of the correct doctrine and its elements. Esli builds the foundational recall that lets you recognize the issue in 10 seconds rather than reconstructing the doctrine from memory under pressure. High-value MBE constitutional law prompts: "Levels of scrutiny for equal protection: triggering criteria, burden of proof, and examples of laws that pass and fail each level", "Standing doctrine: all three Article III requirements (injury, causation, redressability) plus prudential limits — with cases", "Commerce Clause after Lopez: three categories of activity Congress can regulate — commerce itself, channels, instrumentalities — plus the substantial effects test and the Joint Effect Principle", "First Amendment strict scrutiny for content-based speech restrictions: the test, how to identify content-based laws, and how to argue a law is content-neutral (viewpoint vs subject-matter distinction)".',
      },
    },
    {
      '@type': 'Question',
      name: 'What are good constitutional law flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value constitutional law prompts: 'Tiers of equal protection scrutiny: which tier, what triggers it, burden allocation, and 3 landmark cases that explain how each operates', 'Dormant Commerce Clause: when state laws burden interstate commerce — the Pike balancing test vs the per se rule for facial discrimination, with examples of laws that fail each', 'Substantive due process: fundamental rights (list from cases), the Glucksberg test, and how Dobbs changed the framework for unenumerated rights', 'First Amendment categories of unprotected speech: incitement (Brandenburg), true threats, obscenity (Miller test), defamation (actual malice vs negligence), fighting words — each with its test', 'Non-delegation doctrine: what an intelligible principle is, when the Court has struck laws down, and the major questions doctrine post-West Virginia v. EPA', 'Takings Clause: physical per se takings, regulatory takings (Penn Central factors), and the Lucas categorical rule — how to analyze a government action as a taking'.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is Esli different from commercial bar prep for constitutional law?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Commercial bar prep (Barbri, Themis, Kaplan) gives you the outline; Esli builds the reflex recall. The combination is more powerful than either alone. Bar prep courses teach doctrine through outlines and practice questions — but passive reading of an outline doesn't build the quick pattern recognition that MBE questions demand. Esli's spaced repetition surfaces the constitutional law doctrines you misremember most often, drilling them until the tier of scrutiny, the test elements, and the leading cases become automatic. A particular strength: constitutional law has many competing tests that look similar (rational basis review vs rational basis with bite, the O'Brien test vs strict scrutiny for speech). Esli lets you generate cards that force you to distinguish these precisely — something a static outline doesn't drill.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for law students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and community decks — no credit card required. Whether you are taking 1L Constitutional Law, preparing for the bar exam, or studying for the MPRE, you can generate as many constitutional law decks as you need at no cost. Guest mode lets you start immediately without creating an account.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is judicial review? What established it, and what are its limits?',
    a: "Judicial review: the power of federal courts to declare acts of Congress (or the Executive) unconstitutional. Source: Marbury v. Madison (1803) — Marshall held the Constitution is supreme law and courts must apply it even against conflicting statutes. Not in the text of the Constitution — inferred from structure and the Supremacy Clause. Limits: (1) Case or controversy requirement (Art. III): federal courts can only hear actual disputes, not issue advisory opinions. (2) Justiciability doctrines: Standing (injury, causation, redressability), Mootness (live controversy must persist), Ripeness (injury must be sufficiently imminent), Political Question (some issues committed to other branches — e.g., impeachment, foreign affairs). (3) Countermajoritarian critique — the Court's power is antimajoritarian by design; debates about whether this is a feature or bug remain central to constitutional theory.",
  },
  {
    q: 'What are the three tiers of equal protection scrutiny? When does each apply?',
    a: 'Equal protection (14th Amendment / 5th Amendment via Bolling v. Sharpe for federal government): courts apply different levels of scrutiny depending on the classification and right involved. Rational Basis (lowest): applies to all economic and social legislation NOT involving a suspect class or fundamental right. Government must show law is rationally related to a legitimate government interest. Extremely deferential — almost always upheld. Intermediate Scrutiny: applies to sex/gender classifications (Craig v. Boren), legitimacy, and some other quasi-suspect classes. Government must show law is substantially related to an important government interest. Law can be struck down — higher bar. Strict Scrutiny (highest): applies to suspect classifications (race, national origin, alienage) AND laws that burden fundamental rights (voting, travel, marriage, privacy). Government must show law is narrowly tailored to a compelling government interest. Presumptively unconstitutional — government rarely wins. Key: the Court\'s classification of which tier applies often determines the outcome.',
  },
  {
    q: 'What is the Commerce Clause? How did Lopez and NFIB v. Sebelius limit it?',
    a: "Commerce Clause (Art. I §8 cl.3): Congress may regulate commerce with foreign nations, among the several states, and with Indian tribes. Post-1937 expansion (Wickard v. Filburn): 'substantially affects' interstate commerce — very broad. United States v. Lopez (1995) — Court drew limits for the first time in 60 years: Congress may regulate under the Commerce Clause in three categories only: (1) The channels of interstate commerce (roads, waterways, airspace). (2) The instrumentalities of interstate commerce and persons/things in interstate commerce (cars, planes, railroad cars). (3) Activities that substantially affect interstate commerce — but only if they involve economic/commercial activity. Lopez struck down the Gun-Free School Zones Act as non-economic. Morrison (2000) struck down VAWA for same reason. Raich (2005) upheld federal marijuana prohibition — economic activity (marijuana market). NFIB v. Sebelius (2012): ACA individual mandate upheld under taxing power, NOT Commerce Clause (majority: Congress cannot compel commerce, only regulate existing commerce).",
  },
  {
    q: 'What are the elements of a First Amendment free speech claim? Content-based vs content-neutral.',
    a: "First Amendment: 'Congress shall make no law... abridging the freedom of speech.' Threshold: is the speech protected? Unprotected categories (can be banned): incitement to imminent lawless action (Brandenburg test), true threats, obscenity (Miller test: community standard, prurient interest, lacks serious literary/artistic/political/scientific value), defamation of public figures (actual malice — NYT v. Sullivan), child pornography, fraud. For PROTECTED speech: Content-based restrictions (restrict speech because of its message): presumptively unconstitutional. Strict scrutiny: compelling interest + narrowly tailored + least restrictive alternative. Very hard to uphold. Examples: banning speech on a particular viewpoint, topic. Content-neutral restrictions (regulate manner, not message): Intermediate scrutiny under O'Brien test (for conduct regulations) or time/place/manner test: (1) Serves a significant government interest, (2) narrowly tailored (doesn't leave open alternatives), (3) leaves open alternative channels of communication. Easier to uphold. Examples: parade permit requirements, noise ordinances.",
  },
  {
    q: 'What is substantive due process? What rights does it protect post-Dobbs?',
    a: "Substantive due process (SDP): the idea that the Due Process Clauses of the 5th and 14th Amendments protect certain fundamental rights from government interference, even if procedurally fair. Historical context: Lochner era (1905-1937) — Court struck economic regulations using SDP. Abandoned after New Deal. Modern SDP: Griswold (1965) — right to contraception. Roe v. Wade (1973) — right to abortion (overruled). Obergefell (2015) — right to same-sex marriage. Post-Dobbs (2022): Dobbs v. Jackson overruled Roe and Casey, holding abortion is not a fundamental right under SDP. Alito majority: the Glucksberg test applies — rights protected by SDP must be 'deeply rooted in this Nation's history and tradition' and 'implicit in the concept of ordered liberty.' Glucksberg requires both historical deep-rootedness AND careful description of the right (not 'privacy' generically, but the specific right in question). After Dobbs: Griswold, Lawrence, and Obergefell expressly reaffirmed. However, the majority's methodology is widely viewed as potentially threatening these precedents (Thomas concurrence said so explicitly).",
  },
  {
    q: 'What is the Dormant Commerce Clause doctrine?',
    a: "Dormant Commerce Clause (DCC): even when Congress has NOT acted, state laws that discriminate against or unduly burden interstate commerce violate the Commerce Clause. Inferred from the exclusive or dominant federal commerce power — states cannot erect economic protectionism. Analysis: Step 1 — Facial discrimination against interstate commerce? (Law explicitly treats in-state and out-of-state commerce differently.) If yes: essentially per se invalid. Only survives if state shows no alternative nondiscriminatory means to achieve a legitimate local purpose. Very hard standard (Philadelphia v. New Jersey: NJ can't ban out-of-state solid waste). Step 2 — Facially neutral but discriminatory in effect? Apply Pike balancing test: the local benefits vs the burden on interstate commerce. If the burden is 'clearly excessive' relative to the local benefit, the law is unconstitutional. Exceptions to DCC: (1) Congressional authorization — Congress can allow state discrimination. (2) Market participant exception — when a state acts as a buyer or seller (not a regulator), DCC does not apply (state can prefer in-state contractors for state construction projects — Reeves v. Stake).",
  },
]

const benefits = [
  {
    title: 'Cover the full 1L con law curriculum and bar exam',
    body: 'Generate decks for every major constitutional law topic: Commerce Clause doctrine, levels of scrutiny, First Amendment categories, due process, and structural constitutional law. The AI understands case-specific rules and generates cards that pair doctrine with its leading cases.',
  },
  {
    title: 'Upload your casebook chapters as PDFs',
    body: "Drop a chapter from Sullivan & Gunther, Stone et al., or your professor's notes and get flashcard decks covering every doctrine, test, and key case in that chapter. Turn 60-page casebook chapters into 15-minute daily review sessions.",
  },
  {
    title: 'Build pattern recognition for MBE questions',
    body: 'Constitutional law MBE questions test whether you can identify the right doctrine in a fact pattern within seconds. Spaced repetition builds the automatic pattern recognition that lets you see "this is a content-based speech restriction — strict scrutiny applies" without having to reconstruct the doctrine from scratch.',
  },
  {
    title: 'Complement bar prep courses and exam outlining',
    body: 'Esli pairs with Barbri, Themis, and Kaplan review. Use commercial outlines for the big picture; use Esli to drill the specific tests, elements, and case holdings that MBE and MEE questions require you to recall under time pressure.',
  },
]

export default function ConstitutionalLawFlashcardsPage() {
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
                <span className="text-primary-600">Constitutional Law</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any constitutional law doctrine — judicial review, levels of scrutiny, First Amendment, due process — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Judicial Review', 'Equal Protection', 'Commerce Clause', 'Due Process', 'First Amendment', 'Federalism', 'Bar Exam MBE', 'Supreme Court Cases'].map((tag) => (
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
                  Generate Con Law Flashcards Free
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
                Master con law in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From casebook doctrine to MBE-ready recall — generate, study, and build automatic pattern recognition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your constitutional law topic',
                  body: 'Enter "tiers of equal protection scrutiny with triggering criteria and leading cases", "Commerce Clause after Lopez", or upload a casebook chapter PDF for decks covering every doctrine and case holding.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: "Esli creates cards covering the test elements, the burden allocation, and the landmark cases — the doctrinal precision that 1L exams and MBE questions actually demand. Not just case names — the rule they establish.",
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules daily 10-minute reviews. The doctrines you confuse (rational basis vs. intermediate scrutiny, content-based vs. content-neutral) appear more often — until the right test fires automatically.',
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
                Example constitutional law flashcards
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Click any card to flip it and see the answer.
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
                    <div className="absolute inset-0 bg-primary-50 rounded-2xl border border-primary-200 shadow-md flex flex-col items-start justify-start p-5 overflow-y-auto [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <p className="text-xs text-primary-500 mb-2">Answer</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{card.a}</p>
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
                Generate Your Con Law Deck Free
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
                Why law students choose Esli for con law
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
                Constitutional law flashcard FAQs
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
              Start mastering constitutional law today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any constitutional law doctrine in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Con Law Flashcards Free
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
              <a href="/flashcards/bar-exam" className="hover:text-white transition-colors no-underline">Bar Exam Flashcards</a>
              <a href="/flashcards/lsat" className="hover:text-white transition-colors no-underline">LSAT Flashcards</a>
              <a href="/use-case/law-students" className="hover:text-white transition-colors no-underline">AI Flashcards for Law Students</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
