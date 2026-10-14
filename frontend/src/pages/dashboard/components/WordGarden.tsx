import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Flame } from 'lucide-react'
import type { DashboardStats } from '@/features/stats/types'

/** Learned-word counts where the plant reaches its next stage. */
const STAGES = [0, 1, 10, 50, 150] as const

type Mood = 'new' | 'thirsty' | 'watered'

/**
 * The word garden: progress as a plant that grows with every learned word
 * and droops when reviews are waiting. The signature element of the app
 * (see DESIGN.md), so keep it simple, rounded and calm.
 */
export function WordGarden({ stats }: { stats: DashboardStats }) {
  const { t } = useTranslation()

  const learned = useMemo(
    () => stats.deckProgress.reduce((sum, d) => sum + d.matureCount, 0),
    [stats.deckProgress],
  )
  const stage = STAGES.reduce<number>((acc, min, i) => (learned >= min ? i : acc), 0)
  const nextAt: number | undefined = STAGES[stage + 1]

  const mood: Mood =
    stats.totalCards === 0 ? 'new' : stats.cardsDueToday > 0 ? 'thirsty' : 'watered'

  const status =
    mood === 'new'
      ? t('garden.new', 'Learn your first words and it starts to grow.')
      : mood === 'thirsty'
        ? t('garden.thirsty', 'A bit thirsty. Review today’s cards to water it.')
        : t('garden.watered', 'Watered for today. See you tomorrow.')

  return (
    <section
      className="sticker relative flex h-full rotate-1 flex-col bg-mint p-6"
      aria-label={t('garden.aria', 'Your word garden')}
    >
      <span className="tape -left-5 -top-1 w-[76px] -rotate-[38deg] bg-bubblegum/85" aria-hidden />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-2xl leading-tight text-ink">
            {t('garden.learned', '{{count}} words learned', { count: learned })}
          </p>
          <p className="mt-1 text-sm font-medium text-ink/70">
            {nextAt !== undefined
              ? t('garden.nextStage', '{{count}} more until it grows', { count: nextAt - learned })
              : t('garden.fullBloom', 'In full bloom')}
          </p>
        </div>
        {stats.streakDays > 0 && (
          <span className="inline-flex shrink-0 -rotate-3 items-center gap-1.5 rounded-full border-[2.5px] border-ink bg-sun px-3 py-0.5 text-sm font-extrabold text-ink">
            <Flame className="h-4 w-4" fill="currentColor" aria-hidden />
            {t('garden.streak', '{{count}} days', { count: stats.streakDays })}
          </span>
        )}
      </div>

      <div className="flex flex-1 items-end justify-center py-4">
        <Plant stage={stage} mood={mood} />
      </div>

      <p className="text-sm font-medium text-ink">{status}</p>
    </section>
  )
}

/* ── The plant ─────────────────────────────────────────────────────── */

const LEAF = 'M0 0 C 8 -11, 26 -12, 34 -2 C 26 6, 9 7, 0 0 Z'
/** Stem height and leaf pairs per stage. */
const SHAPE = [
  { height: 16, pairs: 1, scale: 0.55 },
  { height: 34, pairs: 1, scale: 0.75 },
  { height: 54, pairs: 2, scale: 0.85 },
  { height: 74, pairs: 3, scale: 0.95 },
  { height: 84, pairs: 3, scale: 1 },
] as const

export function Plant({ stage, mood, className = 'h-48 w-44 sm:h-60 sm:w-56' }: { stage: number; mood: Mood; className?: string }) {
  const { height, pairs, scale } = SHAPE[stage]
  const soilY = 116
  const topY = soilY - height
  // Thirsty leaves droop; watered leaves lift.
  const droop = mood === 'thirsty' ? 18 : mood === 'watered' ? -6 : 0

  const leaves = Array.from({ length: pairs }, (_, i) => {
    const y = soilY - height * ((i + 1) / (pairs + 0.6))
    return [
      { x: 80, y, side: 1, delay: 0.25 + i * 0.12 },
      { x: 80, y: y - 6, side: -1, delay: 0.3 + i * 0.12 },
    ]
  }).flat()

  return (
    <svg viewBox="0 0 160 180" className={className} aria-hidden>
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .esli-grow { transform-box: fill-box; transform-origin: bottom center; animation: esli-grow .6s cubic-bezier(.34,1.56,.64,1) both; }
          .esli-pop { transform-box: fill-box; transform-origin: left center; animation: esli-pop .45s cubic-bezier(.34,1.56,.64,1) both; }
        }
        @keyframes esli-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        @keyframes esli-pop { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>

      {/* Stem */}
      <path
        className="esli-grow"
        d={`M80 ${soilY} C 78 ${soilY - height * 0.4}, 83 ${soilY - height * 0.7}, 80 ${topY}`}
        stroke="#17171A"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Leaves */}
      {leaves.map((leaf, i) => (
        <g
          key={i}
          transform={`translate(${leaf.x} ${leaf.y}) scale(${leaf.side * scale} ${scale})`}
        >
          <g
            style={{ transform: `rotate(${-20 + droop}deg)`, transition: 'transform 600ms cubic-bezier(0.4,0,0.2,1)' }}
          >
            <path
              className="esli-pop"
              style={{ animationDelay: `${leaf.delay}s` }}
              d={LEAF}
              fill="#44D07B"
              stroke="#17171A"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
          </g>
        </g>
      ))}

      {/* Bloom at the last stage, a bud one stage before */}
      {stage >= 3 && (
        <g transform={`translate(80 ${topY - 4})`}>
          <g className="esli-pop" style={{ animationDelay: '0.7s', transformOrigin: 'center' }}>
            {stage === 4 ? (
              <>
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx="0" cy="-9" rx="6.5" ry="9" fill="#FFC93C" stroke="#17171A" strokeWidth="2.5" transform={`rotate(${a})`} />
                ))}
                <circle r="6" fill="#FF7A59" stroke="#17171A" strokeWidth="2.5" />
              </>
            ) : (
              <ellipse cx="0" cy="-3" rx="5.5" ry="7.5" fill="#44D07B" stroke="#17171A" strokeWidth="2.5" />
            )}
          </g>
        </g>
      )}

      {/* Pot */}
      <path d="M48 124 H112 L105 164 Q104 170 98 170 H62 Q56 170 55 164 Z" fill="#FF7A59" stroke="#17171A" strokeWidth="3" strokeLinejoin="round" />
      <rect x="40" y="112" width="80" height="16" rx="8" fill="#FF7A59" stroke="#17171A" strokeWidth="3" />
    </svg>
  )
}
