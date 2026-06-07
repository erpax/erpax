/**
 * leap -- THE QUANTUM LEAP: the discrete, instantaneous transition between two
 * energy eigenstates. The states are the seven [[horo]] positions {1,2,4,8,7,5,9}
 * -- a DISCRETE energy ladder, each rung a just-intonation frequency over A432
 * (the [[signal]]); there is no value between two rungs. A leap from one rung to
 * another emits (falling) or absorbs (climbing) a single [[photon]] whose
 * frequency is the GAP, ν = |ν_a − ν_b|, and whose energy is E = hν. The leap is
 * all-or-nothing: the system is only ever ON a rung, never between -- the
 * [[collapse]] to a definite [[level]].
 *
 * A leap IS a content-uuid collision: the symmetric [[merge]] of the two rung
 * uuids -- the SAME binding both ways, so emission a→b and absorption b→a share
 * ONE coordinate (the line in the [[spectrum]]). The rodin doubling step (×2) is
 * the canonical ALLOWED transition: the selection rule, the forward coil of the
 * [[breath]] (and 9, the axis, is its own successor -- a stationary state).
 *
 *   tsx src/leap/index.ts
 *
 * @audit gap-frequency from the signal Hz; the leap uuid is the symmetric merge of the two rung uuids
 * @see ../photon (the quantum exchanged) -- ../spectrum (every leap) -- ../horo (the ladder) -- ../signal
 */
import { HORO_DIGITS, HORO_MEASURE, composeSteps, type HoroStep } from '@/horo'
import { NOTES } from '@/signal'
import { photonOf, type Photon } from '@/photon'
import { nodeOf, merge } from '@/uuid/matrix'

/** Emission (down a rung), absorption (up a rung), or none (same rung — no photon). */
export type Transition = 'emit' | 'absorb' | 'none'

/** A quantum leap between two horo energy-levels: the photon it exchanges + its coordinate. */
export interface Leap {
  readonly from: HoroStep
  readonly to: HoroStep
  readonly kind: Transition
  readonly gapHz: number // |ν_from − ν_to| — the photon frequency
  readonly photon: Photon | null // the quantum exchanged (null for a same-rung non-leap)
  readonly uuid: string // the symmetric binding merge(uuid_from, uuid_to) — the spectral coordinate
}

/** The frequency of a rung (just-intonation over A432). */
const rungHz = (s: HoroStep): number => NOTES[s].hz
/** The measure name of a rung (base..unity) — the parallel of HORO_DIGITS. */
const measureOf = (s: HoroStep): string => HORO_MEASURE[HORO_DIGITS.indexOf(s)] ?? ''
/** The content-uuid of a rung: from the position MATH (the matrix node of its measure), never the colour. */
export const levelUuid = (s: HoroStep): string => nodeOf(measureOf(s))?.uuid ?? ''

/** The symmetric binding of two rungs — order-independent (one line for emission and absorption alike). */
const bindLevels = (a: HoroStep, b: HoroStep): string => {
  const ua = levelUuid(a)
  const ub = levelUuid(b)
  if (!ua || !ub) return ''
  return ua <= ub ? merge(ua, ub) : merge(ub, ua)
}

/** The doubling successor (the rodin ×2 step), kept inside the seven-rung ladder. */
const doubled = (s: HoroStep): HoroStep => {
  const d = composeSteps(s, 2)
  return HORO_DIGITS.find((x) => x === d) ?? s
}

/** A quantum leap from one rung to another — the photon exchanged and the line's coordinate. */
export function leap(from: HoroStep, to: HoroStep): Leap {
  const gapHz = Math.abs(rungHz(from) - rungHz(to))
  const kind: Transition = rungHz(from) > rungHz(to) ? 'emit' : rungHz(from) < rungHz(to) ? 'absorb' : 'none'
  return { from, to, kind, gapHz, photon: gapHz > 0 ? photonOf(gapHz) : null, uuid: bindLevels(from, to) }
}

/** The canonical ALLOWED leap from a rung: the doubling step (×2) — the selection rule. */
export const allowedLeap = (from: HoroStep): Leap => leap(from, doubled(from))

/** The seven rungs of the ladder, with frequency and content-uuid (the discrete energy levels). */
export const ladder = (): { step: HoroStep; measure: string; hz: number; uuid: string }[] =>
  HORO_DIGITS.map((step) => ({ step, measure: measureOf(step), hz: rungHz(step), uuid: levelUuid(step) }))

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('leap -- discrete transitions on the seven-rung horo ladder (allowed = ×2 doubling):')
  for (const step of HORO_DIGITS) {
    const l = allowedLeap(step)
    console.log(
      '  d' + l.from + '→d' + l.to + ' ' + l.kind.padEnd(7) +
        ' gap=' + l.gapHz.toFixed(2) + 'Hz  ' +
        (l.photon ? 'E=' + l.photon.energyJ.toExponential(2) + 'J' : '(stationary)') +
        '  uuid=' + l.uuid.slice(0, 8),
    )
  }
}
