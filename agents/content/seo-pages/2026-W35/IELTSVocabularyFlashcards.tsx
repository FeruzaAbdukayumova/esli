/**
 * SEO Landing Page: IELTS Vocabulary Flashcards
 * Route: /flashcards/ielts-vocabulary
 * Meta title: IELTS Vocabulary Flashcards Free — AI | Esli (50 chars)
 * Meta description: Generate IELTS vocabulary flashcards with AI. Academic Word List, Writing Task 2 collocations, Reading — free, spaced repetition. No signup. (144 chars)
 * Target keywords: IELTS vocabulary flashcards, IELTS academic word list flashcards, IELTS academic vocabulary, IELTS writing vocabulary flashcards
 * Note: W29 has a general IELTS page (/flashcards/ielts). This page targets vocabulary-specific searches — a distinct high-volume cluster.
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
      name: 'What IELTS vocabulary can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli generates IELTS vocabulary flashcards for every high-value category: Academic Word List (AWL) sublists 1-10 (the 570 word families that appear most frequently in academic texts), Topic vocabulary by IELTS subject (environment, technology, education, health, urbanization, globalization, crime, media), Writing Task 2 collocations (cause-and-effect language: 'attributable to', 'stems from', 'give rise to'; contrast language: 'whereas', 'by contrast', 'despite this'; hedging: 'arguably', 'to some extent', 'it could be argued that'), Reading and Listening-specific vocabulary (understanding word families, synonyms and paraphrases used in IELTS passages), and Band 8+ lexical resource vocabulary — the precise, nuanced words that distinguish a Band 7 from a Band 8 essay. You can also upload IELTS prep materials as PDFs for instant targeted vocabulary decks.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does vocabulary flashcard study improve my IELTS Writing score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "IELTS Writing is scored 25% on Lexical Resource — your range and accuracy of vocabulary use. Examiners look for: variety (not repeating the same words), precision (using words in their correct context), collocations (which words naturally go together — 'commit a crime' not 'do a crime'), and Band 8+ markers (paraphrasing the question prompt without copying it, using topic-specific terminology accurately). Flashcard study builds this vocabulary as automatic recall — when you are writing under 40-minute pressure, you need word choices to come immediately, not require searching. High-value IELTS Writing vocabulary prompts: 'Cause and effect language: 10 phrases with example sentences from IELTS Writing Task 2 topics', 'Cohesive devices: linking words for addition, contrast, concession, result, example — with correct punctuation for each', 'Environment topic vocabulary: 20 word families (sustainable, renewable, carbon footprint, biodiversity, deforestation) with collocates and sample sentences'.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are good IELTS vocabulary flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value IELTS vocabulary prompts for Esli: 'AWL Sublist 1: all 60 word families with definition, part of speech, IELTS-level example sentence, and one common collocation', 'Technology topic vocabulary for IELTS Writing Task 2: 20 words/phrases with definitions, register (formal vs neutral), and example sentences from technology essays', 'IELTS Band 8 paraphrase vocabulary: 15 common IELTS question words (government, society, children, problems, solutions) paired with 3 precise synonyms and their connotation differences', 'Hedging language for IELTS Writing: 12 expressions for qualified claims with their grammatical patterns (\"It is widely believed that\", \"There is growing evidence that\", \"X may well\")', 'IELTS Reading: word families — for each AWL word, generate the noun, verb, adjective, and adverb forms + a sentence showing each in an academic context', 'IELTS Listening vocabulary: numbers, statistics, and measurements language (fraction vs percentage vs ratio, approximate language: around/approximately/roughly, change language: double/triple/halve)'.",
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from the general IELTS flashcards page?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Esli's general IELTS page (/flashcards/ielts) covers all four skills — Reading, Writing, Listening, and Speaking strategy. This page focuses specifically on vocabulary acquisition, which is one of the highest-volume and most searched IELTS study topics. IELTS vocabulary is a distinct need: many students have adequate grammar and task structure skills but lack the lexical range for Band 7+. Vocabulary is also the IELTS skill most amenable to flashcard study — it is discrete, testable, and builds cumulatively. This page targets searchers who specifically want 'IELTS vocabulary flashcards', 'IELTS academic word list study', or 'IELTS Writing vocabulary' — a different search intent from general IELTS preparation.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for IELTS candidates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and community decks — no credit card or signup required. Whether you are targeting Band 6.5, Band 7.5, or Band 9, you can generate as many IELTS vocabulary decks as you need at no cost. Guest mode lets you start immediately and study in the same session.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are AWL Sublist 1 high-frequency academic words? Give 5 essential word families.',
    a: "AWL Sublist 1 contains the most frequent academic word families. 5 essential ones: 1. ANALYSE (v) / ANALYSIS (n) / ANALYTICAL (adj): 'The researchers analysed the data using regression methods.' Collocation: 'conduct an analysis of', 'under analysis'. 2. APPROACH (n/v): 'This essay will approach the issue from an economic perspective.' Collocation: 'take an approach', 'adopt an approach'. 3. SIGNIFICANT (adj) / SIGNIFICANTLY (adv) / SIGNIFICANCE (n): 'There was a significant increase in unemployment.' Note: 'significant' in academic writing means 'important/notable', not just 'large'. 4. INDICATE (v) / INDICATION (n) / INDICATOR (n): 'The data indicates that urban populations are growing.' Collocation: 'indicate that', 'provide an indication of'. 5. ESTABLISH (v) / ESTABLISHED (adj): 'It is well established that exercise improves cognitive function.' Collocation: 'establish a link between', 'established evidence'. For IELTS: use these instead of basic synonyms (show → indicate, big/important → significant, prove → establish, look at → analyse).",
  },
  {
    q: 'What are the essential cause-and-effect vocabulary phrases for IELTS Writing Task 2?',
    a: "Cause-and-effect language is critical for IELTS Task 2 problem-solution and cause-effect essays. Expressing CAUSE: 'This is partly attributable to...' (formal, noun follows), 'X stems from Y' (X is caused by Y), 'X can be traced back to Y' (historical cause), 'X is a consequence of Y'. Expressing EFFECT: 'This gives rise to...' (formal, leads to a new situation), 'X leads to/results in Y' (direct cause-effect), 'X contributes to Y' (partial cause), 'X has a significant impact on Y'. Two-way / chain: 'X not only... but also...', 'As a direct result of X, Y has...', 'The knock-on effect of X is Y'. Avoiding repetition: Cause verbs — generate, trigger, prompt, foster, exacerbate (worsen), alleviate (lessen). Effect nouns — consequence, implication, repercussion, outcome, ramification. IELTS Band 8 example: 'The rapid expansion of urban centres is largely attributable to rural-urban migration, which in turn gives rise to overcrowding and strain on public infrastructure.'",
  },
  {
    q: 'What are the most important collocations for the IELTS environment topic?',
    a: "Environment is one of the most common IELTS Writing Task 2 topics. Essential collocations: CLIMATE CHANGE: 'address climate change', 'combat climate change', 'mitigate the effects of climate change', 'accelerate climate change'. ENVIRONMENTAL: 'environmental degradation', 'environmental impact', 'environmentally sustainable', 'environmental awareness'. POLLUTION: 'air/water/soil pollution', 'contribute to pollution', 'reduce carbon emissions', 'carbon footprint'. RENEWABLE ENERGY: 'transition to renewable energy', 'harness renewable energy', 'invest in renewable energy sources', 'fossil fuel dependency'. BIODIVERSITY: 'loss of biodiversity', 'threaten biodiversity', 'preserve natural habitats', 'endangered species'. Band 8 collocations (more precise): 'ecosystem services', 'carbon-neutral economy', 'ecological footprint', 'sustainable development goals', 'net-zero emissions', 'circular economy'. IELTS essay phrases: 'the environmental toll of...', 'to offset carbon emissions', 'the long-term ramifications for the environment', 'place increased pressure on natural resources'.",
  },
  {
    q: 'What are the key contrast and concession linking words for IELTS Writing?',
    a: "Contrast and concession language is tested under Coherence and Cohesion (25% of score). CONTRAST (highlighting a difference): 'whereas' (within one sentence: 'Whereas developed nations produce more waste, developing nations suffer its effects'), 'while' (similar use to whereas), 'in contrast', 'by contrast', 'on the other hand' (between sentences). CONCESSION (acknowledging the other side): 'although / even though / though' (subordinating conjunctions — can begin a sentence), 'despite / in spite of' (+ noun phrase or gerund: 'Despite the evidence, many...), 'nevertheless / nonetheless / however' (sentence connectors — followed by comma), 'it could be argued that... however...', 'while it is true that X, Y'. ADVANCED CONCESSION: 'Admittedly...', 'granted that...', 'notwithstanding the fact that...'. Punctuation rules (often tested): 'however' as a sentence connector: preceded by period or semicolon ('. However,') not a comma (',However,'). 'although' as subordinating conjunction: no comma when main clause comes first ('She studied although she was tired.' NOT 'She studied, although she was tired.').",
  },
  {
    q: 'What are Band 8 paraphrasing techniques for IELTS Writing Task 2 introductions?',
    a: "IELTS Writing Task 2 requires you to paraphrase the question in the introduction without copying it — examiners penalise copied phrases. Band 8 paraphrasing techniques: 1. Synonym substitution: 'government' → 'authorities', 'policymakers', 'the state'; 'young people' → 'the younger generation', 'adolescents', 'youth'; 'problems' → 'challenges', 'issues', 'concerns', 'drawbacks'. 2. Change word form: 'increase in crime' → 'crime is increasing', 'rising crime rates'; 'society benefits' → 'there are societal benefits'. 3. Change structure: active → passive, or restructure the clauses. 4. Precision upgrades (Band 7 → Band 8): 'good' → 'beneficial', 'advantageous', 'constructive'; 'bad' → 'detrimental', 'deleterious', 'counterproductive'; 'help' → 'facilitate', 'enable', 'foster'; 'use' → 'utilise', 'employ', 'leverage'. Example paraphrase: Question: 'In many countries, more people are choosing to live alone. What are the advantages and disadvantages of this trend?' → Band 8 intro: 'The prevalence of single-person households has risen considerably across numerous nations in recent decades. This essay will examine both the merits and drawbacks of this demographic shift.'",
  },
  {
    q: 'What is hedging language in academic writing? Give 8 examples for IELTS.',
    a: "Hedging: expressing claims with appropriate uncertainty rather than absolute statements. Essential in IELTS academic writing — overconfident claims read as simplistic. Hedging vocabulary: Modal verbs: 'may / might / could' ('This could lead to...'), 'would' (conditional), 'should' (expectation not certainty). Adverbs: 'arguably' ('This is arguably the most significant factor'), 'generally' ('This is generally considered...'), 'to some extent' ('This is true to some extent'), 'largely' ('largely attributable to'). Verb phrases: 'It appears that...', 'It seems that...', 'It is widely believed that...', 'There is growing evidence that...'. Noun phrases: 'There is a tendency for...', 'There is reason to suggest that...'. Expressing partial truth: 'While it is true that X, it is important to recognise that Y'. Concession + hedge: 'Although X is undoubtedly a factor, it would be overly simplistic to suggest that...'. IELTS Band 8 vs Band 6: Band 6 says 'Technology is bad for children.' Band 8 says 'Excessive use of digital technology may have detrimental effects on children's social development, particularly when screen time displaces physical activity and face-to-face interaction.'",
  },
]

const benefits = [
  {
    title: 'Target the Academic Word List systematically',
    body: 'Generate decks for each of the 10 AWL sublists in priority order — starting with the 60 most frequent word families that appear across all academic texts. Systematic AWL coverage is the single highest-return IELTS vocabulary study strategy.',
  },
  {
    title: 'Upload IELTS prep materials and past papers as PDFs',
    body: 'Drop your Cambridge IELTS practice book, IELTS official guide chapters, or your own notes and get flashcard decks covering every vocabulary item. The AI extracts topic words, collocations, and academic expressions automatically.',
  },
  {
    title: 'Build lexical variety that examiners notice',
    body: 'IELTS Writing examiners specifically reward varied vocabulary. Spaced repetition drills the precise synonyms and collocations until you use them naturally under test pressure — not reaching for "important" when you should write "significant" or "crucial".',
  },
  {
    title: 'Prepare for Reading and Listening paraphrases',
    body: 'IELTS Reading and Listening questions rarely use the same words as the passage — they paraphrase. Build vocabulary in word families and synonym clusters so you recognise paraphrased content quickly, instead of being slowed down by unfamiliar wording.',
  },
]

export default function IELTSVocabularyFlashcardsPage() {
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
                <span className="text-primary-600">IELTS Vocabulary</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any IELTS vocabulary topic — Academic Word List, Writing Task 2 collocations, topic vocabulary, Band 8 paraphrasing — and get a complete flashcard deck in seconds.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Academic Word List', 'Writing Task 2', 'Collocations', 'Band 8 Vocabulary', 'Topic Vocabulary', 'Hedging Language', 'Reading Paraphrases', 'Linking Words'].map((tag) => (
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
                  Generate IELTS Vocabulary Flashcards Free
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
                Build your IELTS vocabulary in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From Academic Word List to Band 8 collocations — generate, study, and use naturally.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your IELTS vocabulary topic',
                  body: 'Enter "AWL Sublist 1 with definitions and example sentences", "environment topic vocabulary with collocations", or upload a Cambridge IELTS practice book chapter as a PDF for targeted vocabulary decks.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: "Esli creates cards covering word definitions, collocations, example sentences in IELTS context, and Band-level guidance — the vocabulary depth that Writing Task 2 Band 7+ requires.",
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: "The SM-2 algorithm schedules daily 10-minute reviews. Words you confuse or forget appear more often — building the automatic vocabulary recall that IELTS Writing and Speaking demand under time pressure.",
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
                Example IELTS vocabulary flashcards
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
                Generate Your IELTS Vocabulary Deck Free
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
                Why IELTS candidates choose Esli for vocabulary
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
                IELTS vocabulary flashcard FAQs
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
              Start building your IELTS vocabulary today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate vocabulary flashcards for any IELTS topic in seconds. Free forever — no credit card, no signup required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate IELTS Vocabulary Flashcards Free
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
              <a href="/flashcards/ielts" className="hover:text-white transition-colors no-underline">IELTS Flashcards</a>
              <a href="/flashcards/toefl" className="hover:text-white transition-colors no-underline">TOEFL Flashcards</a>
              <a href="/use-case/language-learners" className="hover:text-white transition-colors no-underline">AI Flashcards for Language Learners</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
