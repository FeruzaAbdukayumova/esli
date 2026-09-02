/**
 * SEO Landing Page: Metabolism Flashcards
 * Route: /flashcards/metabolism
 * Meta title: Metabolism Flashcards Free — AI Generator | Esli (52 chars)
 * Meta description: Generate metabolism flashcards with AI. Glycolysis, Krebs cycle, ETC, gluconeogenesis — MCAT-ready, free, spaced repetition. (132 chars)
 * Target keywords: metabolism flashcards, glycolysis flashcards, Krebs cycle flashcards, biochemistry metabolism flashcards, MCAT metabolism flashcards
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
      name: 'What metabolism topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates metabolism flashcards covering all major pathways: glycolysis (10 steps, enzymes, regulation, net ATP yield), pyruvate processing (pyruvate dehydrogenase complex, acetyl-CoA formation), the citric acid cycle / Krebs cycle (8 steps, intermediates, cofactors, products), oxidative phosphorylation and the electron transport chain (Complexes I-IV, ATP synthase, chemiosmosis, P/O ratios), gluconeogenesis (irreversible steps, key enzymes, Cori cycle), glycogen metabolism (glycogenesis, glycogenolysis, hormonal regulation), fatty acid oxidation (beta oxidation, ketone body synthesis), fatty acid synthesis (acetyl-CoA carboxylase, FAS, NADPH requirement), amino acid catabolism (transamination, urea cycle), and pentose phosphate pathway (oxidative vs non-oxidative phases). Ideal for MCAT, biochemistry courses, and medical school board prep.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I study glycolysis and the Krebs cycle with flashcards?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most effective approach is to break glycolysis into three clusters: the investment phase (steps 1-5, hexokinase through aldolase — two ATP consumed, one 6-carbon glucose split into two 3-carbon G3P), the payoff phase (steps 6-10, G3P through pyruvate kinase — four ATP and two NADH generated per glucose), and the regulatory checkpoints (hexokinase, PFK-1, pyruvate kinase — the three irreversible steps that are also the allosteric regulation points). For the Krebs cycle, generate cards pairing each intermediate with what enters, what leaves, and what enzyme catalyzes the step. The memory trick: "Citric Acid Is Krebs Starting Substrate For Making ATP" (Citrate - Aconitase - Isocitrate - alpha-Ketoglutarate - Succinyl-CoA - Succinate - Fumarate - Malate - Oxaloacetate). Use Esli\'s spaced repetition to drill the confusing similar-sounding intermediates until they become automatic.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli good for MCAT biochemistry metabolism preparation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Metabolism is one of the highest-yield MCAT biochemistry topics — the AAMC tests glycolysis regulation (PFK-1 allosteric inhibitors/activators), the net yield of ATP across all stages of glucose oxidation (2 substrate-level + 32-34 oxidative phosphorylation = ~34-36 total), gluconeogenesis bypass enzymes (pyruvate carboxylase, PEPCK, fructose-1,6-bisphosphatase, glucose-6-phosphatase), and metabolic integration (fed vs fasted state, which organs use which fuels). Use Esli to generate targeted MCAT decks: "MCAT glycolysis regulation: all allosteric effectors of PFK-1 with activators vs inhibitors", "MCAT ATP accounting: substrate-level vs oxidative phosphorylation yields", "MCAT gluconeogenesis: the 4 bypass reactions and their compartments". Upload PDF review sheets for instant custom decks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the best metabolism flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-yield metabolism prompts: 'Glycolysis: all 10 steps with enzyme name, substrate, product, and whether it is irreversible or reversible — mark the 3 regulated steps and their allosteric effectors', 'Krebs cycle: all 8 steps — intermediate, enzyme, cofactor reduced (NAD+ or FAD), and GTP produced — plus total yield per acetyl-CoA', 'Electron transport chain: all 4 complexes — what each does, what enters/leaves, where protons are pumped, and how many ATP each NADH and FADH2 generates', 'Gluconeogenesis vs glycolysis: the 3 irreversible glycolytic steps and the 4 gluconeogenesis enzymes that bypass them — with compartment (cytoplasm vs mitochondria)', 'Fed vs fasted metabolic state: which hormones are active, which pathways are on vs off, and what fuel source each major organ uses (brain, liver, muscle, RBCs)', 'Beta oxidation of a saturated 16-carbon fatty acid: total acetyl-CoA, NADH, FADH2 produced — with net ATP calculation'.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for biochemistry and medical students?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Esli is free with no credit card required. The free plan includes unlimited AI flashcard generation, spaced repetition scheduling, and community decks. You can generate as many metabolism pathway decks as you need — glycolysis, Krebs cycle, ETC, gluconeogenesis, beta oxidation, and beyond. Guest mode lets you start without creating an account: no email, no signup, just paste a topic and get flashcards instantly.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the 3 regulated (irreversible) steps of glycolysis? What are the allosteric effectors of PFK-1?',
    a: 'The 3 irreversible (regulated) steps of glycolysis: Step 1 — Hexokinase/Glucokinase: glucose → glucose-6-phosphate. Inhibited by G6P (hexokinase). Step 3 — Phosphofructokinase-1 (PFK-1): fructose-6-phosphate → fructose-1,6-bisphosphate. THE key regulatory step. Step 10 — Pyruvate Kinase: PEP → pyruvate. PFK-1 allosteric regulation: ACTIVATORS (→ high energy demand): AMP, ADP, fructose-2,6-bisphosphate (most potent), Pi. INHIBITORS (→ high energy abundance): ATP, citrate, H+. Memory trick: PFK-1 speeds up glycolysis when energy is low (AMP/ADP high) and slows down when the Krebs cycle is backed up (citrate high) or energy is plentiful (ATP high). These 3 steps are also the bypass points for gluconeogenesis — each has a dedicated enzyme to reverse the metabolic flow.',
  },
  {
    q: 'What is the net ATP yield of complete glucose oxidation (glycolysis + Krebs cycle + ETC)?',
    a: 'Net ATP from one glucose molecule: GLYCOLYSIS (cytoplasm): 2 ATP (net substrate-level) + 2 NADH (→ ~5 ATP via ETC, or ~3 if malate-aspartate shuttle is used vs glycerol-3-phosphate). PYRUVATE DEHYDROGENASE: 2 NADH → ~5 ATP. KREBS CYCLE (x2 turns per glucose): 6 NADH → ~15 ATP, 2 FADH2 → ~3 ATP, 2 GTP → 2 ATP. Total: ~30-32 ATP (modern estimate using P/O ratios of 2.5 for NADH and 1.5 for FADH2). Classic textbook: ~36-38 ATP. Why the range: shuttle used to import cytoplasmic NADH into mitochondria determines efficiency (malate-aspartate: 2.5 ATP per NADH; glycerol-3-phosphate: 1.5 ATP per NADH). For MCAT: know the approximate total (30-32) and the breakdown by stage, not just the number.',
  },
  {
    q: 'Walk through the Krebs cycle: what are the 8 intermediates and what does each step produce?',
    a: 'Starting from oxaloacetate + acetyl-CoA: 1. OAA + acetyl-CoA → Citrate (citrate synthase; H2O in) 2. Citrate → Isocitrate (aconitase; H2O out then in, isomerization) 3. Isocitrate → α-Ketoglutarate (isocitrate dehydrogenase; CO2 released, NAD+ → NADH) 4. α-Ketoglutarate → Succinyl-CoA (α-KG dehydrogenase; CO2 released, NAD+ → NADH, CoA in — similar to PDH complex) 5. Succinyl-CoA → Succinate (succinyl-CoA synthetase; GTP generated — substrate-level phosphorylation, CoA released) 6. Succinate → Fumarate (succinate dehydrogenase = Complex II; FAD → FADH2) 7. Fumarate → Malate (fumarase; H2O added) 8. Malate → Oxaloacetate (malate dehydrogenase; NAD+ → NADH) Per turn: 3 NADH, 1 FADH2, 1 GTP, 2 CO2 released. Per glucose (2 turns): 6 NADH, 2 FADH2, 2 GTP, 4 CO2.',
  },
  {
    q: 'How does gluconeogenesis reverse glycolysis? What are the 4 bypass enzymes and where do they act?',
    a: 'Gluconeogenesis bypasses the 3 irreversible glycolytic steps using 4 enzymes: Bypass 1 — Pyruvate kinase step (pyruvate → PEP): TWO enzymes needed because pyruvate must be carboxylated first in mitochondria. Pyruvate carboxylase (mitochondria): pyruvate + CO2 → oxaloacetate (requires biotin, ATP). OAA is converted to malate to cross membrane. PEPCK (cytoplasm): malate → OAA → PEP (releases CO2, uses GTP). Bypass 2 — PFK-1 step (fructose-1,6-BP → fructose-6-phosphate): Fructose-1,6-bisphosphatase (cytoplasm). Inhibited by AMP, fructose-2,6-bisphosphate (same signals that activate PFK-1 — reciprocal regulation). Bypass 3 — Hexokinase step (G6P → glucose): Glucose-6-phosphatase (ER membrane). Only in liver and kidney (not muscle) — reason only liver/kidney can release free glucose into blood. Key regulation: glucagon stimulates gluconeogenesis (via cAMP); insulin inhibits it. Gluconeogenesis is expensive: costs 6 ATP + 2 GTP per glucose.',
  },
  {
    q: 'What is beta oxidation? How much ATP does a 16-carbon saturated fatty acid yield?',
    a: 'Beta oxidation degrades fatty acids to acetyl-CoA in the mitochondrial matrix. Requires: activation to acyl-CoA (cytoplasm, costs 2 ATP equivalents), transport into mitochondria via carnitine shuttle (carnitine acyltransferase I — rate-limiting, inhibited by malonyl-CoA). Each round of beta oxidation (4 steps): 1. Oxidation: acyl-CoA → trans-enoyl-CoA (FAD → FADH2, by acyl-CoA dehydrogenase) 2. Hydration: → L-3-hydroxyacyl-CoA (H2O added) 3. Oxidation: → 3-ketoacyl-CoA (NAD+ → NADH) 4. Thiolysis: → acetyl-CoA + shortened acyl-CoA (CoA added). For palmitate (16C = 16:0): 7 rounds of beta oxidation → 8 acetyl-CoA + 7 FADH2 + 7 NADH. ATP calculation: 8 acetyl-CoA × 10 ATP = 80 ATP; 7 FADH2 × 1.5 ATP = 10.5 ATP; 7 NADH × 2.5 ATP = 17.5 ATP; minus 2 ATP activation = net ~106 ATP. Compare: glucose (6C) = ~32 ATP. Per carbon, fat is more energy-dense (~6.6 ATP/C for palmitate vs ~5.3 ATP/C for glucose).',
  },
  {
    q: 'What is the metabolic difference between the fed and fasted states? Which pathways are active in each?',
    a: 'FED STATE (insulin dominant): Blood glucose high → insulin released from pancreatic beta cells. Active pathways: Glycolysis (glucose → pyruvate), Glycogen synthesis (liver + muscle), Fatty acid synthesis (liver: excess acetyl-CoA → palmitate), Triglyceride synthesis + storage (adipose). Key enzyme activations: acetyl-CoA carboxylase (ACC) on, FAS on, glycogen synthase on. FASTED STATE (glucagon/epinephrine dominant): Blood glucose low → glucagon from alpha cells. Active pathways: Glycogenolysis (liver: glycogen → glucose), Gluconeogenesis (liver/kidney: amino acids, lactate, glycerol → glucose), Beta oxidation (liver, muscle: fatty acids → acetyl-CoA → ATP), Ketogenesis (liver: excess acetyl-CoA → ketone bodies when OAA is depleted). Key switches: PFK-1 inhibited by glucagon (via cAMP, lowers F2,6-BP), ACC inhibited (→ less malonyl-CoA → carnitine shuttle opens → more fatty acid oxidation). Organ fuel use in fasting: Brain (day 1): glucose; Brain (day 4+): ketone bodies (40-75% of fuel). RBCs: always glucose (no mitochondria). Muscle (short fast): glycogen, then fatty acids. Liver: oxidizes fatty acids for own energy, exports glucose and ketones.',
  },
]

const benefits = [
  {
    title: 'From glycolysis to metabolic integration — every pathway covered',
    body: 'Generate targeted decks for any metabolic pathway: all 10 glycolysis steps with enzymes and regulation, all 8 Krebs cycle intermediates, ETC complexes and ATP yield, gluconeogenesis bypass enzymes. The AI matches depth to your prompt — MCAT-level or medical school board detail.',
  },
  {
    title: 'Upload your biochemistry textbook or review sheet as a PDF',
    body: "Drop a chapter from Lehninger, Stryer, or your MCAT review book and get flashcard decks covering every pathway, enzyme, and regulation point. Turn dense metabolic maps into 15-minute daily review sessions with spaced repetition built in.",
  },
  {
    title: 'Master the regulation logic, not just the steps',
    body: "Metabolism exams test why pathways are regulated, not just what the intermediates are. Esli generates cards that pair each regulated enzyme with its allosteric effectors, hormonal signals, and the metabolic logic behind the regulation — so you understand the system, not just the sequence.",
  },
  {
    title: 'Build the automatic recall MCAT and medical boards demand',
    body: "The MCAT and Step 1 test metabolic integration under time pressure. Spaced repetition builds the fast pattern-recognition that lets you identify 'glucagon activates gluconeogenesis via cAMP' in 5 seconds — so you spend exam time on reasoning, not recall.",
  },
]

export default function MetabolismFlashcardsPage() {
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
                <span className="text-primary-600">Metabolism</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any metabolic pathway — glycolysis, Krebs cycle, electron transport chain, gluconeogenesis — and get a complete flashcard deck in seconds. MCAT-ready, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Glycolysis', 'Krebs Cycle', 'Electron Transport Chain', 'Gluconeogenesis', 'Beta Oxidation', 'MCAT Metabolism', 'Metabolic Regulation', 'ATP Synthesis'].map((tag) => (
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
                  Generate Metabolism Flashcards Free
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
                Master metabolism in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From glycolysis steps to full metabolic integration — generate, study, and build automatic recall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your pathway or upload a PDF',
                  body: 'Enter "glycolysis regulation with allosteric effectors" or "Krebs cycle all 8 steps and products", or upload a biochemistry review sheet PDF for decks that match exactly what your MCAT or final exam will test.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering enzyme names, substrates, products, cofactors, regulation signals, and the metabolic logic behind each step — the depth biochemistry and MCAT questions actually require.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: "The SM-2 algorithm schedules daily 10-minute reviews. The Krebs cycle intermediates and ETC complexes you confuse appear more often — building the automatic recall that MCAT and Step 1 demand.",
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
                Example metabolism flashcards
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
                Generate Your Metabolism Deck Free
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
                Why biochemistry and pre-med students choose Esli
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
                Metabolism flashcard FAQs
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
              Start mastering metabolism today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any metabolic pathway in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Metabolism Flashcards Free
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
              <a href="/flashcards/mcat" className="hover:text-white transition-colors no-underline">MCAT Flashcards</a>
              <a href="/flashcards/biochemistry" className="hover:text-white transition-colors no-underline">Biochemistry Flashcards</a>
              <a href="/flashcards/ap-biology" className="hover:text-white transition-colors no-underline">AP Biology Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
