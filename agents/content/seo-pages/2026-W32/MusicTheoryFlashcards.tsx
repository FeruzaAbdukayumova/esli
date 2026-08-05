/**
 * SEO Landing Page: Music Theory Flashcards
 * Route: /flashcards/music-theory
 * Meta title: Music Theory Flashcards Free — AI Generator | Esli (52 chars)
 * Meta description: Generate music theory flashcards with AI. Intervals, chords, scales, modes, harmony — free, spaced repetition. No signup. (125 chars)
 * Target keywords: music theory flashcards, music theory study cards, intervals flashcards, chord flashcards, music theory exam prep
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
      name: 'What music theory topics can Esli generate flashcards for?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Esli generates music theory flashcards for every level: fundamentals (note names, rhythm, time signatures, clef reading, key signatures), intervals (quality, inversion, consonance/dissonance), scales (major, minor, pentatonic, whole-tone, chromatic), chords (triads, seventh chords, chord symbols, inversions), modes (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian), harmony (diatonic function, secondary dominants, borrowed chords, Neapolitan, augmented sixth chords), voice leading (4-part SATB, parallel motion, contrary motion), form (binary, ternary, sonata, rondo, fugue), counterpoint (species counterpoint rules), and aural skills (interval recognition, chord quality identification). Upload any music theory textbook chapter PDF for instant targeted decks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can flashcards help me learn music theory for ABRSM, RCM, or AP Music Theory?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "ABRSM, RCM, and AP Music Theory exams test specific terminology, rules, and recognition skills — all ideal for spaced repetition flashcards. For AP Music Theory: generate decks for 'all 7 modes: name, characteristic scale degree, intervallic formula, associated mood', 'seventh chord types: MM7, Mm7 (dominant 7th), mm7, dm7, dd7 — intervals and where each occurs diatonically', 'figured bass notation: common figures and what they indicate (6, 6/4, 7, 6/5, 4/3, 2)'. For ABRSM: generate decks matched to your grade level — Grade 5 theory, Grade 7 harmony. The AI understands music theory terminology and generates cards at the right depth for your specific exam.",
      },
    },
    {
      '@type': 'Question',
      name: 'Can I upload music theory textbooks and course notes as PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. Upload any music theory resource — 'The Complete Musician' (Laitz), 'Tonal Harmony' (Kostka and Payne), 'Harmony and Voice Leading' (Aldwell and Schachter), Berklee Online course notes, or your professor's handouts — and Esli extracts rules, definitions, and concepts into flashcard decks. This is especially useful for complex harmony chapters covering chromatic harmony, secondary dominants, borrowed chords, and the German/French/Italian augmented sixth chords, where multiple rules interact and need to become instinctive.",
      },
    },
    {
      '@type': 'Question',
      name: 'What are good music theory flashcard prompts to use with Esli?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "High-value music theory prompts: 'All 7 diatonic modes: characteristic interval, mood, example song, where it fits in a major scale', 'Chord inversions: root position, 1st inversion, 2nd inversion — bass note, figured bass symbol, and when to use each', 'Secondary dominants: V/V, V/IV, V/ii — how to find them, voice lead them, and resolve them', 'Voice leading rules: what is forbidden and why — parallel 5ths, parallel 8ths, voice crossing, overlapping, large leaps', 'Circle of fifths: all 12 keys clockwise by perfect fifth, sharp/flat counts, parallel minor relationship', 'Intervals: how to calculate any interval — staff distance, semitone count, quality (P, M, m, A, d)'. Specific topic prompts produce exam-ready cards that connect rules to musical context.",
      },
    },
    {
      '@type': 'Question',
      name: 'Is Esli free for music students and musicians?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The free plan includes AI flashcard generation, spaced repetition scheduling, and community decks — no credit card required. Whether you are preparing for a grade exam, taking Music Theory 101, studying for AP Music Theory, or deepening your harmony knowledge as a working musician, you can generate unlimited music theory decks at no cost. Guest mode lets you start immediately without creating an account.',
      },
    },
  ],
}

const sampleCards = [
  {
    q: 'What are the 7 modes of the major scale and their characteristic sounds?',
    a: "The 7 modes (built starting on each degree of C major): 1. Ionian (C): W-W-H-W-W-W-H — identical to major scale. Bright, resolved. 2. Dorian (D): W-H-W-W-W-H-W — natural minor with raised 6th. Dark but not completely sad. Used in jazz, folk (Scarborough Fair), funk. 3. Phrygian (E): H-W-W-W-H-W-W — natural minor with lowered 2nd. Very dark, Spanish/Flamenco sound. 4. Lydian (F): W-W-W-H-W-W-H — major with raised 4th. Dreamy, floating, otherworldly (film scores, The Simpsons theme). 5. Mixolydian (G): W-W-H-W-W-H-W — major with lowered 7th. Bluesy, rock-dominant sound (Beatles: 'Norwegian Wood'). 6. Aeolian (A): W-H-W-W-H-W-W — natural minor scale. Sad, introspective. 7. Locrian (B): H-W-W-H-W-W-W — diminished tonic, unstable. Rarely used as a tonal center. Memory trick: I Don't Play Loud Music After Lunch.",
  },
  {
    q: 'What are the qualities of triads? How do you build each one?',
    a: 'Triads: 3-note chords (root + third + fifth). Four qualities: Major (M): M3 + m3 = P5. Formula: 4 + 3 semitones. Bright, stable sound. Roman numeral: I, IV, V. Minor (m): m3 + M3 = P5. Formula: 3 + 4 semitones. Dark, stable sound. Roman numeral: ii, iii, vi. Diminished (d/dim): m3 + m3 = d5. Formula: 3 + 3 semitones. Tense, unstable (tritone between root and 5th). Roman numeral: vii°. Augmented (A/aug): M3 + M3 = A5. Formula: 4 + 4 semitones. Tense, ambiguous, neither major nor minor feeling. Roman numeral: III+ (in harmonic minor). Quick identification: listen for the 5th — perfect 5th → major or minor; diminished 5th → diminished; augmented 5th → augmented. Then distinguish M from m by the 3rd.',
  },
  {
    q: 'What is the circle of fifths and how do you use it?',
    a: 'Circle of fifths: diagram arranging all 12 major (and relative minor) keys in order of ascending perfect fifths clockwise. Starting at C (no sharps/flats), each clockwise step adds one sharp (G=1#, D=2#, A=3#, E=4#, B=5#, F#=6#, C#=7#). Counterclockwise from C adds one flat (F=1b, Bb=2b, Eb=3b, Ab=4b, Db=5b, Gb=6b, Cb=7b). Uses: 1. Key signatures: immediately find how many sharps/flats a key has. 2. Related keys: adjacent keys share 6 of 7 notes — useful for modulation. 3. Common chord progressions: ii-V-I progresses counterclockwise (D-G-C); circle-of-fifths progressions move around the circle. 4. Relative minors: each major key has a relative minor starting a m3 below — same key signature (C major / A minor). Enharmonic keys: at the bottom — F#/Gb, B/Cb, C#/Db are enharmonically equivalent.',
  },
  {
    q: 'What are the rules of voice leading in 4-part (SATB) harmony?',
    a: 'Voice leading rules in SATB writing: FORBIDDEN: Parallel perfect 5ths: two voices move in parallel motion and both intervals are P5 → harsh, archaic sound. Parallel perfect octaves: same concept with P8 → destroys independence of voices. Hidden (direct) 5ths/octaves: outer voices reach P5 or P8 by similar motion, with soprano taking a leap — weakens independence. Voice crossing: a lower voice goes above a higher voice. Voice overlapping: a voice moves past the previous note of an adjacent voice. AVOID: Augmented melodic intervals (A2, A4) — hard to sing. Large leaps (>P5) without contrary motion return. Doubling the leading tone. PREFER: Contrary motion (voices move in opposite directions). Contrary or oblique motion when approaching P5 or P8. Resolve the leading tone up to tonic (unless it\'s an inner voice). Keep common tones in the same voice. Smooth voice leading (step motion preferred over leaps).',
  },
  {
    q: 'How do secondary dominants work? What are V/V and V/IV?',
    a: "Secondary dominants: a chord that is the dominant (V or V7) of a diatonic scale degree other than tonic. They temporarily tonicize (borrow from) that chord. Formula: find the target chord → build a major triad or dominant 7th a P5 above it. Common secondary dominants: V/V (dominant of the dominant): in C major, V = G, so V/V = D major (or D7). Creates stronger pull to G. Notation: D: V → G: I. V/IV (dominant of IV): in C major, IV = F, so V/IV = C7 (C major with added m7 = Bb). Creates pull to F. The added Bb chromatically colors C major. V/ii, V/iii, V/vi work the same way. Identification: look for accidentals that create a major chord or dominant 7th chord on a note that would otherwise be minor/diminished in the key. Resolution: secondary dominants resolve to their target chord by P4 up or P5 down in the bass. Voice lead the leading tone up and the 7th down (if V7 form).",
  },
  {
    q: 'What are the types of musical form? Define binary, ternary, and sonata form.',
    a: 'Musical form: large-scale organization of a piece. Binary form (AB): 2 contrasting sections, both typically repeated. Simple binary: A section closes in home key or dominant; B closes in home key. Rounded binary: B section returns to A material — transitional form toward ternary. Common in Baroque dances (minuets, gavottes). Ternary form (ABA): 3 sections. A (statement) — B (contrast: different key, texture, theme) — A (return). B section creates tension; return of A resolves it. Examples: da capo aria (Baroque opera), minuet-and-trio (Classical). Sonata form (exposition-development-recapitulation): large-scale form in 3 parts. Exposition: primary theme (tonic) → transition → secondary theme (dominant or relative major) → closing theme. Development: fragmentation and modulation of themes — creates tension. Recapitulation: both themes return in the tonic. Optional: slow introduction (before exposition) and coda (after recap). Used in first movements of Classical and Romantic symphonies, sonatas, string quartets.',
  },
]

const benefits = [
  {
    title: 'From fundamentals to advanced harmony',
    body: 'Generate decks matched to your level: basic note reading and rhythm for beginners, interval quality and triad construction for intermediate students, or chromatic harmony and Neapolitan chords for advanced theory courses. The AI adjusts depth to your prompt.',
  },
  {
    title: 'Upload your theory textbook chapters as PDFs',
    body: "Drop your 'Tonal Harmony' Kostka textbook chapters, Berklee course PDFs, or professor worksheets and get flashcard decks covering every rule and exception. Stop re-reading dense harmony chapters — extract and study the concepts that matter.",
  },
  {
    title: 'Build the terminology that makes practice sessions productive',
    body: 'Knowing why a chord progression works — not just that it does — makes you a more musical musician. Flashcards build the theoretical vocabulary that lets you analyze what you hear, intentionally compose, and communicate with other musicians.',
  },
  {
    title: 'Prepare for ABRSM, RCM, and AP Music Theory exams',
    body: 'Generate decks targeting your specific exam and grade level. The AI understands ABRSM Grade 5 vs RCM Grade 8 vs AP Music Theory scope — type your exam and level for perfectly targeted decks instead of studying material that is too easy or too advanced.',
  },
]

export default function MusicTheoryFlashcardsPage() {
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
                <span className="text-primary-600">Music Theory</span>{' '}
                Flashcards with AI — Free
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Type any music theory topic — intervals, chords, modes, voice leading, harmony — and get a complete flashcard deck in seconds. Free, with spaced repetition built in.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['Intervals', 'Chord Qualities', 'Modes', 'Voice Leading', 'Circle of Fifths', 'Harmony', 'Musical Form', 'ABRSM Prep'].map((tag) => (
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
                  Generate Music Theory Flashcards Free
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
                Learn music theory in 3 steps
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                From fundamentals to advanced harmony — generate, study, and internalize.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: Sparkles,
                  num: '01',
                  title: 'Type your music theory topic',
                  body: 'Enter "all 7 modes with characteristic sounds and examples", "secondary dominants with voice leading", or upload a theory textbook chapter PDF for targeted decks.',
                },
                {
                  icon: Brain,
                  num: '02',
                  title: 'AI generates your deck',
                  body: 'Esli creates cards covering rules, intervallic formulas, musical examples, and application — the depth that ABRSM, RCM, and AP Music Theory exams actually test.',
                },
                {
                  icon: RotateCcw,
                  num: '03',
                  title: 'Study with spaced repetition',
                  body: 'The SM-2 algorithm schedules daily 10-minute reviews. Complex harmony rules you struggle with appear more often, building the automatic recall that exam sight-reading and ear training demand.',
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
                Example music theory flashcards
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
                Generate Your Music Theory Deck Free
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
                Why music students choose Esli
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
                Music theory flashcard FAQs
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
              Start mastering music theory today
            </h2>
            <p className="text-primary-200 text-lg mb-8">
              Generate flashcards for any music theory topic in seconds. Free forever — no credit card, no subscription required.
            </p>
            <a
              href={`${APP_URL}/register`}
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-primary-600 bg-white rounded-lg hover:bg-primary-50 shadow-lg transition-all no-underline"
            >
              Generate Music Theory Flashcards Free
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
              <a href="/flashcards/ap-biology" className="hover:text-white transition-colors no-underline">AP Biology Flashcards</a>
              <a href="/flashcards/history" className="hover:text-white transition-colors no-underline">History Flashcards</a>
              <a href="/flashcards/philosophy" className="hover:text-white transition-colors no-underline">Philosophy Flashcards</a>
              <a href={`${APP_URL}/register`} className="hover:text-white transition-colors no-underline">Sign Up Free</a>
            </div>
            <p className="mt-8 text-xs text-slate-600">© {new Date().getFullYear()} Esli. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}
