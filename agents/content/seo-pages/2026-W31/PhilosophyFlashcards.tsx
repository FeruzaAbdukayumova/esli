/**
 * SEO Landing Page: Philosophy Flashcards
 * Route: /flashcards/philosophy
 * Meta title: Philosophy Flashcards Free — AI Generator | Esli (49 chars)
 * Meta description: Generate philosophy flashcards with AI. Ethics, logic, epistemology, metaphysics, famous arguments — free, spaced repetition. (126 chars)
 * Target keywords: philosophy flashcards, intro to philosophy study cards, ethics flashcards, Plato Aristotle flashcards, philosophy of mind flashcards
 * Week: 2026-W31
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
      name: 'What philosophy topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli can generate flashcards for any philosophy topic: ethics and moral theory (utilitarianism, Kantian deontology, virtue ethics, care ethics), epistemology (justified belief, a priori/a posteriori, Gettier problem), metaphysics (identity, free will, consciousness, substance dualism), logic (valid arguments, fallacies, formal logic), political philosophy (Rawls, Locke, Hobbes, Rousseau), philosophy of mind (functionalism, qualia, the hard problem), history of philosophy (Pre-Socratics through contemporary), and Eastern philosophy (Confucianism, Buddhism, Taoism). Type any topic or upload a primary source PDF and get a deck in seconds.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do flashcards help with learning philosophy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Philosophy is dense with distinctions, arguments, and thinker-position pairings that are easy to confuse under exam pressure. Flashcards help by: forcing you to actively recall (not passively re-read) a philosopher's core argument, training you to distinguish similar positions (utilitarianism vs. consequentialism, compatibilism vs. libertarian free will), and mapping arguments to specific philosophers. Prompt Esli with 'Kant categorical imperative three formulations' or 'distinguish Rawls veil of ignorance from Nozick entitlement theory' for precision decks.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload philosophy primary source PDFs to generate flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload Plato's Republic, Descartes' Meditations, Kant's Groundwork, Mill's Utilitarianism, Rawls' A Theory of Justice, or any philosophy text and Esli extracts key arguments, distinctions, and definitions into a structured flashcard deck. This is especially valuable for dense analytic texts where the argument structure is what you need to internalize, not just a summary.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best philosophy flashcard prompts?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "For maximum deck quality: be specific. 'Kant categorical imperative formulations and contrast with hypothetical imperatives' beats 'Kant ethics'. 'Trolley problem variants: lever vs footbridge — why different intuitions?' beats 'trolley problem'. 'Rawlsian justice: two principles, maximin, veil of ignorance' beats 'Rawls'. 'Logical fallacies: 15 most tested — ad hominem, straw man, false dichotomy, slippery slope, appeal to authority' creates an excellent logic deck. The more specific your prompt, the more targeted and exam-ready the cards.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for philosophy students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition, and community decks — no credit card required. Generate philosophy decks for any course, from intro to philosophy surveys to graduate seminars in analytic or continental philosophy. Guest mode means you can start studying immediately without creating an account.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: "What is Kant's Categorical Imperative? Give all three formulations.",
    a: "Kant's Categorical Imperative: the supreme principle of moral duty — binding regardless of your desires (unlike hypothetical imperatives). Three formulations: 1. Formula of Universal Law: 'Act only according to that maxim by which you can at the same time will that it should become a universal law.' Test: can everyone do this without contradiction? 2. Formula of Humanity: 'Act so that you treat humanity, whether in your own person or that of another, always as an end and never as a means only.' 3. Formula of Kingdom of Ends: act as a legislating member of a moral community where all rational beings are ends. Key contrast: unlike consequentialism, morality is not about outcomes but about the rational form of the action.",
  },
  {
    q: "Explain Plato's Theory of Forms and the Allegory of the Cave.",
    a: "Plato's Theory of Forms: the physical world is a shadow of a higher reality — the world of Forms (eternal, unchanging, perfect archetypes). Every particular triangle is an imperfect copy of the Form of Triangle. The Form of the Good is the highest Form, illuminating all others (analogous to the sun). Allegory of the Cave (Republic, Book VII): prisoners chained in a cave see only shadows of objects — they mistake shadows for reality. A freed prisoner climbs out into sunlight (the Form of the Good) — this is the philosopher's journey from doxa (opinion/appearances) to episteme (true knowledge of Forms). Epistemological implication: sense experience gives only opinion; true knowledge requires intellectual apprehension of Forms.",
  },
  {
    q: "What is the trolley problem and what does it reveal about moral theories?",
    a: "Trolley problem (Philippa Foot, 1967): a trolley heads toward 5 people; you can divert it to a side track killing 1. Pull the lever? Footbridge variant (Judith Thomson): push a large man off a bridge to stop the trolley, saving 5? Most say yes to lever, no to pushing — yet the arithmetic is identical. Moral frameworks: Utilitarianism (Mill, Bentham) — pull the lever in both cases; maximize net welfare. Deontology (Kant) — don't push; you're using the 1 person merely as a means, violating the Formula of Humanity. Virtue ethics — what would a courageous, just person do? (contested). Doctrine of Double Effect (Catholic ethics) — redirecting (lever) vs. using as means (pushing) are morally different. The problem reveals deep tensions between consequences, duties, and moral intuitions.",
  },
  {
    q: "What is the hard problem of consciousness?",
    a: "David Chalmers (1995) distinguishes: Easy problems of consciousness: explaining cognitive functions — attention, learning, memory, sensory discrimination. These are 'easy' not because trivial but because explaining them means explaining mechanisms. Hard problem: why is there subjective experience at all? Why does any physical process give rise to qualia — the 'what it's like' of experience (the redness of red, the painfulness of pain)? Even a complete physical/functional account of the brain seems to leave the subjective feel unexplained. Physicalist responses: illusionism (Frankish — qualia are cognitive illusions), type identity theory, higher-order theories. Dualist response (Chalmers): property dualism — consciousness is a non-physical property of physical systems. The 'explanatory gap' (Levine): why this physical state → this experience?",
  },
  {
    q: "Distinguish compatibilism, hard determinism, and libertarian free will.",
    a: "The free will debate turns on whether determinism (every event is caused by prior events + laws of nature) is compatible with moral responsibility. Hard determinism: determinism is true; therefore genuine free will is impossible; moral responsibility is undermined. Libertarian free will (not political libertarianism): agents have genuine free will that requires the ability to do otherwise; determinism is false (appeal to quantum indeterminacy, agent causation). Compatibilism (Hume, Frankfurt, Dennett — the majority view): free will and determinism are compatible. Free will = acting from your own desires/reasons without coercion, not = could have done otherwise in identical circumstances. Frankfurt cases: you act freely if you act from first-order desires that align with your second-order desires (desires about desires), regardless of causal history.",
  },
  {
    q: "What is Rawls' veil of ignorance and the two principles of justice?",
    a: "John Rawls ('A Theory of Justice', 1971): the 'original position' thought experiment. Imagine designing society from behind a 'veil of ignorance' — not knowing your natural talents, class, race, gender, or conception of the good. What principles would rational self-interested people choose? Rawls argues they'd choose: 1. Equal basic liberties principle: everyone has maximum equal basic liberties (speech, conscience, political participation). 2. Difference principle: social and economic inequalities are permissible only if they benefit the least-advantaged members of society (maximin — maximize the minimum). Priority rule: liberty lexically prior to equality, equality prior to efficiency. Nozick's critique ('Anarchy, State, and Utopia'): the Difference Principle violates individual rights by treating society as a single cooperative scheme with distributable output.",
  },
]

const benefits = [
  {
    title: 'Thinker-argument pairings for every school of thought',
    body: 'Philosophy lives and dies by pairing philosophers with their core arguments. Generate cards that map Kant → categorical imperative, Rawls → veil of ignorance/difference principle, Nietzsche → will to power/eternal recurrence, Hegel → dialectic, Wittgenstein → language games.',
  },
  {
    title: 'Upload primary sources and get study-ready decks',
    body: "Drop Descartes' Meditations, Mill's Utilitarianism, or Rawls' Theory of Justice as PDFs and get argument-structured flashcards instantly. Cover what you actually need to know from dense primary texts without spending hours summarizing.",
  },
  {
    title: 'From intro surveys to graduate seminars',
    body: "Esli scales from 'Intro to Philosophy 101' (trolley problems, Plato's cave, the cogito) to graduate analytic philosophy (Gettier cases, extended mind thesis, metaethical non-cognitivism). The AI matches card depth to the complexity of your prompt.",
  },
  {
    title: 'Logic and fallacies — actually memorable',
    body: "Logical fallacies and valid argument forms are perfect flashcard material. Generate decks on modus ponens/tollens, 25 informal fallacies, formal logic symbols, or Aristotelian syllogisms. Spaced repetition makes them stick before your logic exam.",
  },
]

export default function PhilosophyFlashcardsPage() {
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
                <span className="text-primary-600">Philosophy</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any philosophy topic — ethics, logic, epistemology, metaphysics, political philosophy — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Ethics', 'Logic', 'Epistemology', 'Metaphysics', 'Political Philosophy', 'Philosophy of Mind', 'Eastern Philosophy', 'History of Philosophy'].map((tag) => (
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
                  Generate Philosophy Flashcards Free
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
                Master philosophy in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From ancient Greeks to contemporary analytic philosophy — generate, study, and retain.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your philosophy topic',
                  body: 'Enter "Kant categorical imperative three formulations", "trolley problem and moral theories", or upload a primary source PDF from Plato, Descartes, or Rawls.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards pairing philosophers with arguments, distinguishing similar positions, and covering the distinctions and thought experiments your exam tests.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules reviews at optimal intervals — hard distinctions appear more often, well-known concepts less, building long-term retention efficiently.',
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
                Example philosophy flashcards
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
                Generate Your Philosophy Deck Free
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
                Why philosophy students choose Esli
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
                Philosophy flashcard FAQs
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
              Start mastering philosophy today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any philosophy topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Philosophy Flashcards Free
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
              <a href="/flashcards/sociology" className="hover:text-white transition-colors no-underline">Sociology Flashcards</a>
              <a href="/flashcards/history" className="hover:text-white transition-colors no-underline">History Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
