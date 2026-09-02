/**
 * SEO Landing Page: US Citizenship Test Flashcards
 * Route: /flashcards/us-citizenship
 * Meta title: US Citizenship Test Flashcards Free — AI | Esli (51 chars)
 * Meta description: Generate US citizenship and civics test flashcards with AI. All 100 USCIS questions, amendments, branches of government — free. (128 chars)
 * Target keywords: US citizenship test flashcards, civics test flashcards, naturalization test prep, USCIS 100 questions flashcards
 * Week: 2026-W36
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
      name: 'What US citizenship test topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli generates US citizenship and naturalization test flashcards covering all content from the USCIS 100 civics questions: American government (principles of democracy, the Constitution, branches of government, the Bill of Rights, checks and balances), American history (Colonial period, Revolutionary War, the Constitution and founding documents, Civil War and Reconstruction, World Wars, civil rights movement, modern history), integrated civics (the flag, national holidays, state and local government), and vocabulary terms specific to the interview process. You can type a specific section ('All questions about the Supreme Court' or 'Civil War and Reconstruction'), upload a study guide PDF, or ask for the full 100-question deck. Esli also supports 14 interface languages — helpful for applicants whose primary language is not English. Available 24/7 with spaced repetition built in.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most important civics questions to memorize for the naturalization test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The USCIS officer will ask up to 10 of the 100 civics questions during the naturalization interview. You must answer 6 correctly. The highest-priority questions to master: (1) What is the supreme law of the land? (The Constitution) (2) What do we call the first 10 amendments to the Constitution? (The Bill of Rights) (3) What are the two parts of the US Congress? (The Senate and the House of Representatives) (4) How many US Senators are there? (100) (5) We elect US Representatives for how many years? (2) (6) How many justices are on the Supreme Court? (9) (7) Who is in charge of the executive branch? (The President) (8) What is the economic system of the United States? (Capitalist economy / market economy) (9) What is the "rule of law"? (10) Name one war fought by the United States in the 1900s. Special note: Questions 47 and 48 (name your US Senators and your US Representative) have answers specific to your state — generate those separately by typing your state name.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use Esli to study for the citizenship test if English is not my first language?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli supports 14 interface languages, so the app itself is navigable in your language. You can generate flashcards with the English question on the front and the English answer on the back (to practice responding in English as required at the interview), or use the card translation feature (13 languages via the MyMemory API) to show the meaning of difficult terms in your native language. The US citizenship test is conducted in English for most applicants, so practicing the English answers out loud while studying the cards is the most effective preparation method. Exceptions: applicants 50 or older with 20+ years of permanent residence, or 55 or older with 15+ years, may take the civics test in their native language — in that case, generate both English and translated versions.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are good flashcard prompts for US citizenship test prep?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Effective US citizenship test prompts for Esli: 'All USCIS 100 civics questions: government section — branches, Congress, President, Supreme Court questions with exact answers', 'The Bill of Rights: all 10 amendments with what each protects — include the official USCIS phrasing', 'All 50 state capitals and their state — formatted as Question: What is the capital of [state]? Answer: [city]', 'US Presidents who appear in USCIS 100 civics questions — with which question they appear in', 'Civil War: causes, dates, Lincoln role, outcome, and the 13th Amendment', 'The three branches of government: name, duties, who leads each, how members are chosen, how they check each other', 'All 27 Constitutional Amendments — with the right to vote amendments highlighted (15th, 19th, 24th, 26th)'. Generate these as separate decks and study the highest-priority 30 questions first.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for US citizenship test preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is completely free — no credit card, no subscription required. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and card translation into 13 languages. You can generate as many civics decks as you need and study them with spaced repetition until your naturalization interview date. Guest mode means you can start studying immediately without creating an account.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What is the supreme law of the land?',
    a: 'The Constitution. The US Constitution is the highest law in the United States — federal laws, state laws, and government actions must all be consistent with it. The Supremacy Clause (Article VI) establishes this. USCIS Question #1. Interview tip: Answer exactly: "The Constitution." One word is correct and complete.',
  },
  {
    q: 'What do we call the first 10 amendments to the Constitution?',
    a: 'The Bill of Rights. Ratified in 1791, the Bill of Rights was added to the Constitution to protect individual freedoms from government overreach. The 10 amendments cover: 1st (speech, religion, press, assembly, petition), 2nd (bear arms), 3rd (quartering soldiers), 4th (unreasonable search and seizure), 5th (due process, self-incrimination), 6th (speedy trial, lawyer), 7th (jury trial in civil cases), 8th (cruel and unusual punishment), 9th (rights retained by the people), 10th (powers reserved to states). USCIS Question #5.',
  },
  {
    q: 'What are the two parts of the US Congress?',
    a: 'The Senate and the House of Representatives. Congress is the legislative (law-making) branch of the US government. Senate: 100 senators (2 per state), 6-year terms, elected by state voters. House of Representatives: 435 representatives, 2-year terms, number per state based on population (California: 52; Wyoming: 1). Both chambers must pass a bill for it to become law. Senate has additional powers: ratify treaties (2/3 vote), confirm federal judges and Cabinet members, try impeached officials. USCIS Question #17.',
  },
  {
    q: 'Name one right in the First Amendment.',
    a: 'The First Amendment protects five freedoms. Any one of these is a correct answer: Freedom of speech (to say what you want, criticize the government, express opinions without government punishment). Freedom of religion (to practice any religion or no religion). Freedom of the press (newspapers, journalists can publish without government censorship). Freedom of assembly (to gather in groups, protest, demonstrate). Right to petition the government (to ask the government to change something). USCIS Question #35. Memory tip: "SRAP-P" — Speech, Religion, Assembly, Press, Petition.',
  },
  {
    q: 'What territory did the United States buy from France in 1803?',
    a: 'The Louisiana Territory. The Louisiana Purchase doubled the size of the United States: 828,000 square miles of land west of the Mississippi River, purchased from Napoleon Bonaparte of France for $15 million (~4 cents per acre). President Thomas Jefferson negotiated the purchase. The territory eventually became 15 states, including Louisiana, Missouri, Arkansas, Iowa, North Dakota, South Dakota, Nebraska, Kansas, and parts of Montana, Wyoming, Minnesota, Colorado, and Oklahoma. The purchase raised constitutional questions because the Constitution did not explicitly give the President power to buy foreign territory — Jefferson decided to proceed anyway. USCIS Question #75.',
  },
  {
    q: 'What are the two major political parties in the United States?',
    a: "The Democratic Party and the Republican Party. These two parties have dominated American politics since the 1860s. Democratic Party: founded 1828 by Andrew Jackson; current symbol is the donkey. Generally associated with: social programs, government regulation of the economy, healthcare access, environmental protections, civil rights expansion. Republican Party: founded 1854 as an anti-slavery party; current symbol is the elephant; also called the GOP (Grand Old Party). Generally associated with: limited government, lower taxes, free market economy, strong military, traditional values. USCIS Question #40. Note: the USCIS question just asks you to name the two parties — you are not required to know or state anything about their positions.",
  },
]

const benefits = [
  {
    title: 'Study the full 100 USCIS civics questions with spaced repetition',
    body: 'Generate all 100 USCIS civics questions as flashcards and study them with the SM-2 spaced repetition algorithm. Questions you answer correctly appear less often; questions you struggle with appear daily until you know them cold.',
  },
  {
    title: 'Available in 14 interface languages',
    body: 'Navigate Esli in your preferred language and use card translation to show English civics terms alongside their meaning in Spanish, Arabic, Chinese, Hindi, Portuguese, Turkish, German, French, Korean, Japanese, Italian, or Russian.',
  },
  {
    title: 'Practice the exact USCIS question phrasing',
    body: 'Prompt Esli to generate cards using the official USCIS question wording so you practice recognizing and answering exactly the questions your interviewing officer will ask — no surprises on interview day.',
  },
  {
    title: 'Study anywhere, anytime — no account required',
    body: 'Access Esli on any phone or browser without creating an account. Study during your commute, lunch break, or before bed. Spaced repetition schedules your review so each session is short and targeted.',
  },
]

export default function USCitizenshipFlashcardsPage() {
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
                <span className="text-primary-600">US Citizenship Test</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Prepare for your naturalization interview with AI-generated civics flashcards covering all 100 USCIS questions, the Bill of Rights, and American history. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['USCIS 100 Questions', 'Bill of Rights', 'Branches of Government', 'Civil War & History', 'Constitutional Amendments', 'Naturalization Interview', '14 Languages', 'Civics Exam Prep'].map((tag) => (
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
                  Generate Citizenship Test Flashcards Free
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
                Prepare for your naturalization interview in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From the 100 USCIS civics questions to the Bill of Rights — generate, study, and remember.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type the civics topic',
                  body: '"All 100 USCIS civics questions", "Bill of Rights all 10 amendments", "Civil War causes and outcome", or upload any citizenship study guide PDF for instant flashcards.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards using the official USCIS question phrasing and accepted answers — so you practice exactly what the naturalization officer will ask.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules daily 10-minute review sessions. Questions you struggle with appear more often until they become automatic — before your interview date.',
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
                Example US citizenship test flashcards
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
                      <p className="text-xs text-slate-400 mb-2">Civics Question</p>
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
                Generate All 100 Civics Questions Free
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
                Why naturalization applicants choose Esli
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
                US citizenship test flashcard FAQs
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
              Start your citizenship test prep today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate all 100 USCIS civics questions as flashcards in seconds. Free forever — no credit card, no signup required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Citizenship Test Flashcards Free
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
              <a href="/flashcards/ap-us-history" className="hover:text-white transition-colors no-underline">AP US History Flashcards</a>
              <a href="/flashcards/lsat" className="hover:text-white transition-colors no-underline">LSAT Flashcards</a>
              <a href="/use-case/adult-learners" className="hover:text-white transition-colors no-underline">AI Flashcards for Adult Learners</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
