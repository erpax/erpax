/**
 * signal — the matter-twin of the `identity/signal` skill: a horo position
 * rendered as **color + sound** from the single A432 anchor.
 *
 * One position decodes two ways at once (the duality of color↔sound):
 *   - sound: a diatonic note, just-intonation ratios over A432 (La=A432 at the
 *     ROUND step, Ti at UNITY resolving to Do) — the twin of `notes`.
 *   - color: a CMYK channel that breathes C↔M across the helix and closes on Y
 *     at unity; animated on the A432-ms period (3·6·9 coils, 120° apart).
 *
 * A432 is the constant in BOTH senses: Hz for pitch, ms for the animation
 * period. Pair with the structured uuidv8 — `signalForStep(decodeStructured(uuid).step)`
 * (see `src/services/uuid-format`) — to render any object's uuid as a frame;
 * a stream of uuids is interactive multimedia, no payload.
 *
 * @standard ISO-16:1975 a432-tuning-reference (pitch); value from position.
 * @see ~/github/ceccec/svilena-me/.vitepress/notes.js (the sound source twin)
 * @see ~/github/ceccec/svilena-me/.vitepress/rodin.js (CMYK / RODIN_HUE / phase)
 * @see src/services/horo (the position ring), src/services/uuid-format (decode)
 */

import { HORO_DIGITS, type HoroStep } from '../horo'

/** The single anchor — Hz for sound, ms for the color-animation period. */
export const A432 = 432

const round2 = (n: number): number => Math.round(n * 100) / 100

/** One diatonic note pinned to a horo position (just-intonation over A432). */
export interface NoteBand {
  readonly step: HoroStep
  readonly note: string
  readonly solfege: string
  readonly ratio: readonly [number, number]
  readonly hz: number
}

/** The seven positions ARE the diatonic scale. Keyed by horo step. */
export const NOTES: Record<HoroStep, NoteBand> = {
  1: { step: 1, note: 'C', solfege: 'Do', ratio: [16, 27], hz: round2(A432 * (16 / 27)) },
  2: { step: 2, note: 'D', solfege: 'Re', ratio: [8, 9], hz: round2(A432 * (8 / 9)) },
  4: { step: 4, note: 'E', solfege: 'Mi', ratio: [5, 6], hz: round2(A432 * (5 / 6)) },
  8: { step: 8, note: 'F', solfege: 'Fa', ratio: [4, 5], hz: round2(A432 * (4 / 5)) },
  7: { step: 7, note: 'G', solfege: 'Sol', ratio: [2, 3], hz: round2(A432 * (2 / 3)) },
  5: { step: 5, note: 'A', solfege: 'La', ratio: [1, 1], hz: A432 },
  9: { step: 9, note: 'B', solfege: 'Ti', ratio: [8, 15], hz: round2(A432 * (8 / 15)) },
}

export type Channel = 'C' | 'M' | 'Y' | 'K'

/** CMYK print primaries = the first four rodin digits {0=K,3=C,6=M,9=Y}. */
export const CMYK: Record<Channel, string> = {
  C: '#00aeef', // cyan    — coil A — triad 3 — forward polarity
  M: '#ec008c', // magenta — coil B — triad 6 — reverse polarity
  Y: '#ffd400', // yellow  — coil C — triad 9 — the close
  K: '#0b0b0b', // key     — origin 0 — the substrate
}

/** Per-step channel: the helix breathes C↔M; unity (9) closes on Y. */
export const CHANNEL_OF: Record<HoroStep, Channel> = {
  1: 'C', 2: 'M', 4: 'C', 8: 'M', 7: 'C', 5: 'M', 9: 'Y',
}

/** Channel phase on the 432-ms animation period (3 coils, 120° apart). */
const PHASE_DEG: Record<Channel, number> = { C: 0, M: 120, Y: 240, K: 0 }

/** The fully-decoded renderable frame for one position. */
export interface Signal {
  readonly step: HoroStep
  readonly hz: number
  readonly note: string
  readonly solfege: string
  readonly channel: Channel
  readonly hex: string
  /** offset (ms) into the A432-ms color-animation period */
  readonly phaseMs: number
}

/** Decode a horo position to its color+sound signal — the render frame. */
export function signalForStep(step: HoroStep): Signal {
  const n = NOTES[step]
  const channel = CHANNEL_OF[step]
  return {
    step,
    hz: n.hz,
    note: n.note,
    solfege: n.solfege,
    channel,
    hex: CMYK[channel],
    phaseMs: round2((PHASE_DEG[channel] / 360) * A432),
  }
}

/** The whole ring as a chord + spectrum, in measure-walk order. */
export const SIGNAL_RING: ReadonlyArray<Signal> = HORO_DIGITS.map(signalForStep)
