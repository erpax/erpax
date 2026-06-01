/**
 * separation — the separation of powers, position 3·6·9 (the control triad).
 *
 * The fractal made political: the constitutional rule that NO actor may hold
 * two branches of the state at once is THE SAME invariant — segregation of
 * duties — that forbids the creator of a payment from approving it. One law,
 * every scale: it catches a self-dealing clerk and a would-be tyrant with the
 * same check. So `separation` adds no new logic; it APPLIES anti-corruption's
 * SoD to the three branches. Tyranny is structurally foreclosed exactly as
 * fraud is. Pure → testable.
 *
 * @compliance Montesquieu separation-of-powers (legislative · executive · judicial)
 * @compliance SOX §404 segregation-of-duties (the same invariant, public-office scale)
 */
import { detectSodViolation } from '@/services/anti-corruption'

export type Branch = 'legislative' | 'executive' | 'judicial'

/** Every pair of branches must be held by different actors — no concentration of power. */
const MUST_DIFFER: ReadonlyArray<readonly [Branch, Branch]> = [
  ['legislative', 'executive'],
  ['executive', 'judicial'],
  ['legislative', 'judicial'],
]

export interface SeparationResult {
  separated: boolean
  /** the branch pairs unlawfully concentrated in one actor (tyranny signals). */
  concentrations: Array<[string, string]>
}

/** Check the separation of powers — reusing the SoD invariant at the scale of the state. */
export function checkSeparationOfPowers(holders: Partial<Record<Branch, string>>): SeparationResult {
  const sod = detectSodViolation(holders, MUST_DIFFER)
  return { separated: !sod.violation, concentrations: sod.conflicts }
}
