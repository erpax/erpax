/**
 * agent/harmonic — the ONE order an agent can act with or against.
 *
 * [[agent]]/harmonics prices the three ways of fighting it. This is the thing being
 * fought: the singular model beside the plural store ([[balance]]) — a disharmony is a
 * DEPARTURE from something, and that something needs to be nameable.
 *
 * @see ./SKILL.md
 */
import type { Disharmony } from '@/agent/harmonics'

/** The order itself, stated once — merge, content-address, verify, earn. */
export const HARMONIC = ['merge', 'address', 'verify', 'earn'] as const

export type HarmonicMove = (typeof HARMONIC)[number]

/** Every way to leave the order. Exactly three — each priced by [[agent]]/harmonics. */
export const DISHARMONIES = ['tamper', 'phantom-leverage', 'off-ring'] as const satisfies readonly Disharmony[]

/** Acting WITH the order: a move the harmonic names. */
export function isHarmonic(move: string): move is HarmonicMove {
  return (HARMONIC as readonly string[]).includes(move)
}

/** Acting AGAINST it: a departure the corpus has a price for. */
export function isDisharmony(move: string): move is Disharmony {
  return (DISHARMONIES as readonly string[]).includes(move)
}

/**
 * A move is one or the other, never both and never neither-by-omission.
 *
 * An unrecognised move returns `null` rather than defaulting to harmonic: silently
 * counting an unknown action as compliant is the default-ALLOW that [[rules]]/unraised
 * names — a check that never fires, reading as true forever.
 */
export function classifyMove(move: string): 'harmonic' | Disharmony | null {
  if (isHarmonic(move)) return 'harmonic'
  if (isDisharmony(move)) return move
  return null
}

export type { Disharmony }
