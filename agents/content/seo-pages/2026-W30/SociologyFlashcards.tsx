/**
 * SEO Landing Page: Sociology Flashcards
 * Route: /flashcards/sociology
 * Meta title: Sociology Flashcards Free — AI Generator | Esli (52 chars)
 * Meta description: Generate sociology flashcards with AI. AP Sociology, theory, deviance, social institutions — free, spaced repetition. No signup. (132 chars)
 * Target keywords: sociology flashcards, AP Sociology flashcards, intro to sociology flashcards, sociological theory flashcards, AP Sociology study cards
 * Week: 2026-W30
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
      name: 'Can Esli generate flashcards for AP Sociology?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Type any AP Sociology unit into Esli — "social stratification", "culture and society", "socialization", "social institutions", "deviance and social control", "research methods" — and get a complete flashcard deck in seconds. The AI generates cards covering key terms, theorists, research examples, and concepts the AP exam tests. You can also upload your AP Sociology textbook chapters as PDFs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What sociological theories are best to study with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Flashcards are ideal for sociology theory because they force you to pair each theorist with their framework and key concepts. Start with the three core paradigms: functionalism (Durkheim, Parsons), conflict theory (Marx, Weber, Collins), and symbolic interactionism (Mead, Goffman, Blumer). Then add contemporary theories: feminist theory, postmodernism, rational choice theory. Prompt Esli with 'Compare functionalism vs conflict theory' or 'Erving Goffman's dramaturgical analysis' for targeted decks.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload sociology reading PDFs to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Upload any sociology PDF — Macionis, Giddens, Ritzer, Appelbaum, or your professor\'s lecture notes — and Esli extracts the key concepts, definitions, theorists, and research studies into a structured flashcard deck. This is especially useful for dense theory readings (Durkheim\'s "The Division of Labour in Society", Weber\'s "The Protestant Ethic") that are hard to summarize manually.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I study social stratification and inequality with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Prompt Esli with specific sub-topics: 'Social class in the US: upper, middle, working, lower class definitions and mobility', 'Intersectionality: race, class, gender', 'Types of social mobility: horizontal, vertical, intergenerational', 'Caste vs class vs estate systems', 'Income inequality metrics: Gini coefficient, poverty line'. The more specific the prompt, the more precise the cards.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for sociology students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and community decks — no credit card required. Generate as many sociology decks as you need and study with the SM-2 spaced repetition algorithm that optimizes your review schedule. Guest mode means you can start studying without even signing up.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the three major sociological paradigms?',
    a: '1. Functionalism: society as a system of interrelated parts, each serving a function to maintain stability (Durkheim, Parsons). 2. Conflict Theory: society as an arena of inequality generating conflict — groups compete for scarce resources (Marx, Weber, Collins). 3. Symbolic Interactionism: society constructed through everyday face-to-face interactions and shared meanings (Mead, Goffman, Blumer). Each offers a distinct level of analysis: macro (functionalism, conflict) vs micro (symbolic interactionism).',
  },
  {
    q: "Explain Durkheim's concept of anomie.",
    a: "Anomie (Durkheim): a condition of normlessness in which individuals lack clear social norms to guide behavior, producing feelings of meaninglessness and disorientation. Originally described in 'The Division of Labour in Society' (1893) as a result of rapid social change disrupting solidarity. Applied in 'Suicide' (1897): anomic suicide occurs when social regulation collapses, leaving individuals without anchors. Robert Merton later adapted anomie to explain deviance: strain between culturally approved goals and limited legitimate means to reach them.",
  },
  {
    q: "What is Goffman's dramaturgical analysis?",
    a: "Erving Goffman's dramaturgical analysis ('The Presentation of Self in Everyday Life', 1959): social life as theatrical performance. Front stage: the region where performers present themselves to an audience according to social scripts (impression management). Back stage: where performers relax, rehearse, and abandon the front-stage persona. Key concepts: face-work (maintaining positive self-image in interaction), role performance, social scripts, stigma management. Belongs to the symbolic interactionist tradition.",
  },
  {
    q: "Define social stratification and list its four key principles.",
    a: "Social stratification: the hierarchical ranking of people and groups based on valued resources (wealth, power, prestige). Four principles (Macionis): 1. Universal — found in every society, though the basis varies. 2. Persistent across generations — inherited social position. 3. Supported by cultural beliefs — ideology legitimizes the hierarchy. 4. Involves not just inequality but beliefs — people accept stratification as natural/just. Types: caste (ascribed, rigid), class (achieved, flexible), estate/feudal (land-based), slavery (extreme ownership).",
  },
  {
    q: "What is the difference between primary and secondary socialization?",
    a: 'Primary socialization: occurs in early childhood, primarily within the family; instills basic values, language, norms, and sense of self. Agents: family (most influential), immediate caregivers. Secondary socialization: occurs throughout life as individuals enter new social contexts; adapts behavior to institutional roles. Agents: schools, peer groups, media, religion, workplace. Resocialization: a radical change in identity through a total institution (prison, military, cult) that strips away the old self and installs a new one (Goffman).',
  },
  {
    q: "What is Merton's strain theory of deviance?",
    a: "Robert Merton's Strain Theory (1938): deviance results from a gap between culturally approved goals (e.g., wealth, success) and legitimate means to achieve them. Five adaptations to this strain: 1. Conformity — accept both goals and means (most people). 2. Innovation — accept goals but use illegitimate means (crime). 3. Ritualism — reject goals, follow means robotically (bureaucrat). 4. Retreatism — reject both (dropout, homeless). 5. Rebellion — reject current goals/means and substitute new ones (activist, revolutionary). Builds on Durkheim's concept of anomie.",
  },
]

const benefits = [
  {
    title: 'AP Sociology exam prep — all units covered',
    body: 'Generate decks per unit: sociological perspective, research methods, culture, socialization, social interaction, groups and organizations, deviance, stratification, race, gender, family, education, religion, population, and collective behavior.',
  },
  {
    title: 'Theorists and their frameworks side by side',
    body: "Sociology lives and dies by pairing theorists with concepts. Generate cards that map Durkheim → anomie/solidarity, Marx → bourgeoisie/proletariat/alienation, Goffman → dramaturgical analysis, Weber → verstehen/rationalization, Bourdieu → habitus/capital/field.",
  },
  {
    title: 'Upload dense readings and get instant decks',
    body: 'Drop Durkheim, Weber, Simmel, or Bourdieu PDFs and get flashcards from primary sources — the approach that distinguishes sociology students who actually understand theory from those who just memorize terms.',
  },
  {
    title: 'From intro college courses to graduate theory seminars',
    body: "Esli scales from 'Introduction to Sociology' survey courses to graduate seminars on social theory and research methods. The AI matches card depth to the complexity of your prompt.",
  },
]

export default function SociologyFlashcardsPage() {
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
                <span className="text-primary-600">Sociology</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any sociology topic — AP Sociology, social theory, stratification, deviance, institutions — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['AP Sociology', 'Social Theory', 'Stratification', 'Deviance', 'Socialization', 'Research Methods', 'Social Institutions', 'Culture'].map((tag) => (
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
                  Generate Sociology Flashcards Free
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
                Master sociology in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From AP exam prep to graduate theory seminars — generate, study, and retain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your sociology topic',
                  body: 'Enter "Durkheim vs Marx: social solidarity and conflict", "AP Sociology: deviance and social control", or upload a chapter PDF from your textbook.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering key theorists, concepts, definitions, and landmark studies — exactly the content tested on AP and college sociology exams.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at optimal intervals — hard cards appear more often, easy ones less, building long-term retention efficiently.',
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
                Example sociology flashcards
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
                Generate Your Sociology Deck Free
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
                Why sociology students choose Esli
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
                Sociology flashcard FAQs
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
              Start acing sociology today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any sociology topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Sociology Flashcards Free
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
              <a href="/flashcards/psychology" className="hover:text-white transition-colors no-underline">Psychology Flashcards</a>
              <a href="/flashcards/ap-us-history" className="hover:text-white transition-colors no-underline">AP US History Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
