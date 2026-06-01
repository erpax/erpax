/**
 * Harmony — consonance over the A432 anchor.
 *
 * The seven horo positions ARE the diatonic scale (signal/NOTES, just intonation,
 * La = A432). This layer asks the missing question: is an interval — or a whole
 * BAND of positions — consonant? That is the harmony-check the horo state-bands
 * need ("per-state aggregates as harmony-checked horo bands"). It invents no new
 * constant: every pitch is A432 × a 5-limit ratio; consonance is the smallness of
 * that ratio (Tenney height = log2(n·d), the gradus suavitatis).
 *
 * @standard just intonation (5-limit) — the perfect (1:1, 2:1, 3:2, 4:3) and
 *           imperfect (5:4, 6:5, 5:3, 8:5) consonances; all else dissonant
 * @audit harmony-checked horo bands (the horo state-ring law)
 * @see ../signal (A432 + NOTES) · ../horo (the state ring)
 */
import { A432, NOTES } from '@/services/signal'
import type { HoroStep } from '@/services/horo'

export { A432 }

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))

/** Interval between two horo-step pitches, reduced to [num, den] with num ≥ den (≥ 1). */
export function intervalRatio(a: HoroStep, b: HoroStep): [number, number] {
  const [na, da] = NOTES[a].ratio // pitch = na/da × A432
  const [nb, db] = NOTES[b].ratio
  let num = nb * da
  let den = db * na
  if (num < den) [num, den] = [den, num] // normalise to the upward interval (≥ 1)
  const g = gcd(num, den)
  return [num / g, den / g]
}

/** Tenney height log2(n·d) — lower = more consonant (the dissonance metric). */
export const tenneyHeight = (r: readonly [number, number]): number => Math.log2(r[0] * r[1])

const PERFECT = new Set(['1:1', '2:1', '3:2', '4:3'])
const IMPERFECT = new Set(['5:4', '6:5', '5:3', '8:5'])

export type Consonance = 'perfect' | 'imperfect' | 'dissonant'

export function consonance(r: readonly [number, number]): Consonance {
  const key = `${r[0]}:${r[1]}`
  if (PERFECT.has(key)) return 'perfect'
  if (IMPERFECT.has(key)) return 'imperfect'
  return 'dissonant'
}

export const isConsonant = (r: readonly [number, number]): boolean => consonance(r) !== 'dissonant'

export type IntervalCheck = {
  pair: readonly [HoroStep, HoroStep]
  ratio: [number, number]
  consonance: Consonance
}
export type BandHarmony = {
  /** true iff EVERY pair in the band is consonant */
  consonant: boolean
  intervals: IntervalCheck[]
  /** the most dissonant pair's Tenney height (0 for a single tone) */
  worstTenney: number
}

/** Harmony-check a band of horo positions: consonant iff every pair is consonant. */
export function bandHarmony(steps: readonly HoroStep[]): BandHarmony {
  const intervals: IntervalCheck[] = []
  for (let i = 0; i < steps.length; i++) {
    for (let j = i + 1; j < steps.length; j++) {
      const ratio = intervalRatio(steps[i], steps[j])
      intervals.push({ pair: [steps[i], steps[j]], ratio, consonance: consonance(ratio) })
    }
  }
  return {
    consonant: intervals.every((iv) => iv.consonance !== 'dissonant'),
    intervals,
    worstTenney: intervals.length ? Math.max(...intervals.map((iv) => tenneyHeight(iv.ratio))) : 0,
  }
}
