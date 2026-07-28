/**
 * forecasts — phase-locked forecasts on Earth's cardinal homology tips.
 *
 * Realises the Earth pyramid law in prediction space: four tips at
 * 0°·90°·180°·270° with alternating ±ω drive the next tip and the next
 * navigation atoms. Composes [[earth]] · [[navigation]].predictNext — never
 * weather APIs, never a store.
 *
 * HONEST BOUNDARY — forecasts here are structural (tip phase + UX trajectory),
 * not meteorological. Physical Earth remains WGS 84 ([[globe]] / [[earth]]).
 *
 *   tsx src/forecasts/index.ts
 *
 * @see ../earth · ../navigation · ../globe · ./SKILL.md
 */
import {
  realiseEarth,
  navigateTip,
  tipAtPhase,
  tipOmega,
  CARDINAL_TIPS,
  type CardinalTip,
  type HomologyTip,
  type EarthPyramid,
} from '@/earth'
import { predictNext, type UxPrediction } from '@/navigation'

export const atomPath = 'forecasts' as const

/** One tip-phase forecast step. */
export interface TipForecast {
  readonly from: HomologyTip
  readonly next: HomologyTip
  /** Phase advance in degrees (always ±90 along the square). */
  readonly deltaPhaseDeg: number
  readonly omega: 1 | -1
}

/** Full Earth-aware forecast: tips + optional nav trajectory. */
export interface EarthForecast {
  readonly earth: EarthPyramid
  readonly tip: TipForecast
  readonly ring: readonly TipForecast[]
  readonly navigation?: UxPrediction
  readonly holds: boolean
}

/** Forecast the next tip from a cardinal (phase-locked +90° on the ring; tip keeps ±ω label). */
export function forecastTip(from: CardinalTip = 'N'): TipForecast {
  const tips = realiseEarth().tips
  const cur = tips.find((t) => t.tip === from)!
  const next = navigateTip(from, 1)
  return {
    from: cur,
    next,
    deltaPhaseDeg: 90,
    omega: tipOmega(from),
  }
}

/** Full ring forecast — four steps closing the homology square. */
export function forecastTipRing(): readonly TipForecast[] {
  return CARDINAL_TIPS.map((t) => forecastTip(t))
}

/**
 * Forecast Earth navigation: tip phase step ⊕ UX predictNext on candidates.
 * Pure — no store, no weather.
 */
export function forecastEarth(opts: {
  readonly fromTip?: CardinalTip
  readonly referrer?: string
  readonly current?: string
  readonly candidates?: readonly string[]
} = {}): EarthForecast {
  const earth = realiseEarth()
  const tip = forecastTip(opts.fromTip ?? 'N')
  const ring = forecastTipRing()
  const navigation =
    opts.current !== undefined
      ? predictNext(opts.referrer ?? '', opts.current, opts.candidates ?? [])
      : undefined
  const holds =
    earth.complete &&
    ring.length === 4 &&
    ring.every((s) => Math.abs(s.deltaPhaseDeg) === 90) &&
    tip.next.phaseDeg === tipAtPhase(tip.from.phaseDeg + tip.deltaPhaseDeg).phaseDeg
  return { earth, tip, ring, navigation, holds }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const f = forecastEarth({
    fromTip: 'N',
    referrer: 'earth',
    current: 'earth',
    candidates: ['earth', 'navigation', 'forecasts', 'pyramid', 'globe'],
  })
  console.log('forecasts — phase-locked Earth tip forecasts')
  console.log(`  holds=${f.holds} · from ${f.tip.from.tip}@${f.tip.from.phaseDeg}° → ${f.tip.next.tip}@${f.tip.next.phaseDeg}° (Δ=${f.tip.deltaPhaseDeg}°)`)
  for (const s of f.ring) console.log(`  ${s.from.tip} → ${s.next.tip} · ω=${s.omega > 0 ? '+' : '−'}ω`)
  if (f.navigation) console.log(`  nav trajectory=${f.navigation.trajectory} predicted=${f.navigation.predicted.slice(0, 4).join(',')}`)
}
