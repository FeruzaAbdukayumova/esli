/**
 * SEO Landing Page: Criminology Flashcards
 * Route: /flashcards/criminology
 * Meta title: Criminology Flashcards Free — AI Generator | Esli (51 chars)
 * Meta description: Generate criminology flashcards with AI. Theories, criminal justice system, key thinkers, crime types — free, spaced repetition. (133 chars)
 * Target keywords: criminology flashcards, criminal justice flashcards, criminology theories flashcards, criminal justice degree study cards
 * Week: 2026-W32
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
      name: 'What criminology and criminal justice topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates flashcards for all criminology and criminal justice topics: criminological theory (classical, positivist, sociological, critical, feminist, environmental), crime classification (felony vs misdemeanor, mala in se vs mala prohibita, UCR crime types, dark figure of crime), key theorists and their arguments (Beccaria, Lombroso, Merton, Sutherland, Hirschi, Becker, Cohen and Felson, Wilson and Kelling), criminal justice system components (policing, courts, corrections, juvenile justice), research methods in criminology (victimization surveys, official statistics, self-report studies), penology and corrections (sentencing models, rehabilitation vs incapacitation, recidivism), and criminal law fundamentals (elements of a crime, actus reus, mens rea, defenses). Upload any criminology textbook chapter PDF for instant targeted decks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do flashcards help with criminal justice degree exams?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Criminal justice exams test a large breadth of theories and their key arguments, authors, dates, and critiques — exactly the scenario where spaced repetition excels. Generate targeted decks: 'Social control theory: Hirschi's four bonds — attachment, commitment, involvement, belief — and what breaks them', 'Labeling theory: primary vs secondary deviance, master status, moral entrepreneurs — with Becker's example', 'Routine activity theory: three elements and how removing any one prevents crime'. The AI generates cards that pair each theory with its author, main argument, key concepts, and common criticisms — the structure criminal justice essay exams expect.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload criminology textbooks and course readings as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any criminology resource — 'Criminology' (Siegel), 'Introduction to Criminology' (Schmalleger), 'The New Criminology' (Taylor, Walton, Young), your professor's lecture notes, or journal article PDFs — and Esli extracts key theories, definitions, and arguments into a flashcard deck. This is especially useful for theory-heavy chapters where you need to remember the specific claims, critiques, and key figures associated with each theoretical school, and where passive reading alone doesn't build the recall needed for essay exams.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are good criminology flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value criminology prompts: 'Classical criminology: Beccaria and Bentham — key principles, punishment philosophy, rational choice foundation', 'Anomie and strain theory: Durkheim's anomie vs Merton's strain — 5 adaptations with examples', 'Social learning theory: Sutherland's differential association — 9 propositions, Akers' expansion (DRABA)', 'Broken windows theory: Wilson and Kelling — mechanism, evidence, criticisms, policy implications', 'UCR vs NIBRS vs NCVS — what each measures, methodology, strengths, and limitations', 'Types of criminal defenses: justification (self-defense, necessity) vs excuse (insanity, duress, infancy) — how to distinguish them'. Specific theory-focused prompts produce exam-ready cards that capture the argument, not just the label.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for criminal justice and criminology students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and community decks — no credit card required. Whether you are in an introductory criminology course, taking a specialized seminar on victimology or white-collar crime, or preparing for a criminal justice exam, you can generate unlimited criminology flashcard decks at no cost. Guest mode lets you start immediately without creating an account.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: "What is Merton's strain theory? What are the five modes of adaptation?",
    a: "Merton's strain theory (1938): American society emphasizes culturally valued goals (wealth, success) but provides unequal legitimate means to achieve them. When the gap between goals and means is too large, strain produces deviance. Five adaptations (goal / means): 1. Conformity (+/+): accepts both goals and legitimate means — normal behavior. 2. Innovation (+/-): accepts goals, rejects legitimate means → uses illegitimate means (theft, drug dealing). Most common deviant adaptation. 3. Ritualism (-/+): abandons goals but keeps following the rules — bureaucratic behavior, going through the motions. 4. Retreatism (-/-): rejects both goals and means → withdraws from society (chronic alcoholism, vagrancy, drug addiction). 5. Rebellion (+/-/new): rejects society's goals and means and substitutes new ones → political radicalism, cult membership, revolution. Critique: ignores non-monetary deviance (passion crimes), overlooks upper-class crime, doesn't explain WHY some people adapt differently than others.",
  },
  {
    q: "What is routine activity theory? Who developed it and what are its three elements?",
    a: 'Routine Activity Theory (Cohen and Felson, 1979): crime occurs when three elements converge in time and space. 1. Motivated offender: someone with the desire and ability to commit a crime. (Theory takes motivation as given — does not explain why offenders want to offend.) 2. Suitable target: a person or object attractive to the offender due to value (V), inertia (I), visibility (V), and accessibility (A) — VIVA framework. 3. Absence of capable guardianship: no person, security measure, or surveillance that could prevent the crime. Prevention: remove ANY one element → crime prevented. Applications: CPTED (Crime Prevention Through Environmental Design) — reduce target visibility and accessibility. Neighborhood Watch — increase guardianship. Target hardening (locks, alarms, lighting) — reduce suitability. Implications of the theory: crime rates increased post-WWII despite prosperity because more goods were outside the home (more targets), more people worked (less guardianship). Economic development itself can enable crime.',
  },
  {
    q: 'What is labeling theory? Define primary deviance, secondary deviance, and master status.',
    a: "Labeling theory (Becker, Lemert, Tannenbaum): deviance is not a quality of the act itself but a consequence of society applying rules and sanctions to an 'offender.' The act of labeling creates the deviant. Key concepts: Primary deviance: the initial deviant act — often minor, not integrated into the person's self-concept. ('I was drunk once.') Secondary deviance: deviance that results FROM being labeled. After being publicly labeled a deviant, the person reorganizes their identity around that label → continues and escalates deviant behavior to fulfill the role. Master status: the label that overrides all other identities ('ex-con' overwhelms 'father,' 'neighbor,' 'worker'). Moral entrepreneurs: individuals or groups who campaign to have certain acts defined as deviant and enforce those definitions — they create deviance by defining it. Critique: deterministic (assumes all labeled people become secondary deviants); ignores the seriousness of some acts; underestimates the ability of individuals to resist labels. Policy implication: diversion programs, decriminalization, and restorative justice — avoid labeling minor offenders.",
  },
  {
    q: "What is Hirschi's social control theory? What are the four elements of the social bond?",
    a: "Hirschi's social control theory (1969): asks not 'why do people deviate?' but 'why do most people conform?' Answer: the social bond. People conform when they have a stake in conformity. When bonds are weakened, deviance follows. Four elements of the social bond: 1. Attachment: emotional ties to conventional others (family, teachers, peers). Caring what others think of you → self-control. Weak attachment = don't care what others think → freer to deviate. 2. Commitment: investment in conventional activities (education, career, reputation). More to lose → more conformity. 3. Involvement: time spent in conventional activities (school, work, sports). Time in legitimate activities = less time for deviance. 4. Belief: acceptance of the moral validity of laws and social rules. Those who believe laws are legitimate are less likely to break them. Hirschi later revised this into Self-Control Theory (Gottfredson & Hirschi, 1990): low self-control (impulsivity, risk-taking, short-term thinking) is the single cause of all crime — formed in childhood by parenting.",
  },
  {
    q: 'What is the difference between the UCR, NIBRS, and NCVS crime measurement systems?',
    a: "Crime measurement systems: UCR (Uniform Crime Reports): Published by FBI. Collects data from ~18,000 law enforcement agencies. Based on crimes known to police (reported crimes). Part I (Index) crimes: homicide, rape, robbery, aggravated assault, burglary, larceny, motor vehicle theft, arson. Limitations: 'dark figure of crime' (unreported crime); hierarchy rule (only the most serious offense per incident counted); police discretion in reporting. NIBRS (National Incident-Based Reporting System): UCR successor. Records detailed incident-level data for 52 offense categories, including all offenses in multi-offense incidents (eliminates hierarchy rule). More granular but not yet universally adopted. NCVS (National Crime Victimization Survey): BJS survey of ~150,000 households. Captures crimes NOT reported to police — closer to actual crime volume. Excludes: homicide (victim can't report), commercial crime, crimes against those under 12. Comparison: NCVS shows much higher crime rates than UCR for most offenses (robbery, rape especially) because it captures unreported crime. Best practice: use multiple measures together.",
  },
  {
    q: 'What are the key principles of Beccaria\'s classical criminology? Why was it revolutionary?',
    a: "Cesare Beccaria (1764, 'On Crimes and Punishments'): foundational text of classical criminology. Written during the Enlightenment as a critique of arbitrary, brutal, and inconsistent punishment in 18th-century Europe. Key principles: 1. Rational choice: humans are rational actors who calculate pleasure vs pain before acting. Crime occurs when perceived pleasure exceeds perceived pain. 2. Free will: people choose to commit crimes — punishment is justified as a deterrent. 3. Social contract: society agrees to give up some freedom for protection; the law reflects this agreement. 4. Certainty, swiftness, proportionality: punishment should be certain (guaranteed), swift (close to the act), and proportionate to the crime — NOT necessarily severe. Severity is LESS important than certainty. 5. Due process: everyone deserves a fair trial; torture and arbitrary justice must be abolished. 6. Graduated penalties: punishments codified and published so citizens know consequences in advance. Revolutionary because: shifted punishment rationale from revenge to deterrence; argued for limits on state power; influenced US Constitution (8th Amendment), the French Penal Code (1791), and modern criminal justice reform.",
  },
]

const benefits = [
  {
    title: 'Learn every major theory and its key thinkers',
    body: 'Criminology exams test specific theorists, their key arguments, dates, and critiques. Generate a deck per theoretical school — classical, positivist, sociological, critical — and build the precise recall that essay exams demand.',
  },
  {
    title: 'Upload textbooks and journal article PDFs',
    body: "Drop your Siegel 'Criminology' textbook chapters, journal articles, or professor lecture notes and get flashcard decks in seconds. Especially useful for theory-heavy chapters where passive reading alone doesn't build exam-ready recall.",
  },
  {
    title: 'Connect theories to real-world crime policy',
    body: 'The best criminology answers connect theory to policy implications. Esli generates cards that pair each theory with its policy application — broken windows theory → community policing; labeling theory → diversion programs — giving you the analysis depth examiners reward.',
  },
  {
    title: 'Cover criminal justice system and law alongside theory',
    body: 'Generate decks for court process, policing models, corrections philosophy, or criminal law fundamentals — not just criminological theory. Esli covers the full scope of a criminal justice degree program.',
  },
]

export default function CriminologyFlashcardsPage() {
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
                <span className="text-primary-600">Criminology</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any criminology or criminal justice topic — classical theory, labeling, routine activity, crime statistics — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Criminological Theory', 'Classical School', 'Labeling Theory', 'Social Control', 'Strain Theory', 'Criminal Justice System', 'Crime Statistics', 'Penology'].map((tag) => (
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
                  Generate Criminology Flashcards Free
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
                Master criminology in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From theory to criminal justice system — generate, study, and retain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your criminology topic',
                  body: "Enter 'social control theory: Hirschi's four bonds with examples', 'UCR vs NIBRS vs NCVS — how to compare crime data', or upload a textbook chapter PDF for targeted decks.",
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: "Esli creates cards covering theory names, key thinkers, core arguments, critiques, and policy implications — the depth criminal justice essay exams and multiple-choice tests actually require.",
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules daily review sessions. Theories and theorists you struggle with appear more often, building the instant recall essay exams reward.',
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
                Example criminology flashcards
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
                Generate Your Criminology Deck Free
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
                Why criminal justice students choose Esli
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
                Criminology flashcard FAQs
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
              Start mastering criminology today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any criminology or criminal justice topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Criminology Flashcards Free
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
              <a href="/flashcards/sociology" className="hover:text-white transition-colors no-underline">Sociology Flashcards</a>
              <a href="/flashcards/psychology" className="hover:text-white transition-colors no-underline">Psychology Flashcards</a>
              <a href="/flashcards/lsat" className="hover:text-white transition-colors no-underline">LSAT Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
