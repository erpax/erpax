/**
 * decide — the society's composed decision. Wires the three selection laws into one winner:
 * gate-correct (competition) → harmonic-preferred (logic) → most-efficient (cost) → cheapest →
 * deterministic by content-uuid. Pure function; the runtime dispatch it drives is the boundary.
 *
 * @see ../competition (Candidate, correctness) · ../cost (efficiency) · ../logic (harmonic-first) · ./SKILL.md
 */
import type { Candidate } from '../competition'
import { efficiency, type Ledger } from '../cost'

/** A society candidate — a competition Candidate plus its harmony (logic) and its cost ledger (cost). */
export interface SocietyCandidate extends Candidate {
  /** logic: self-consistent ⇒ resolves first (preferred). */
  readonly harmonic: boolean
  /** cost: its output and spend, for the efficiency selection. */
  readonly ledger: Ledger
}

/**
 * The society's choice: keep the correct candidates; prefer the harmonic ones (fall back to all
 * correct if none are harmonic); among those, take the most efficient, ties broken by lowest cost
 * then content-uuid. Returns null when nothing is correct.
 */
export function decide(candidates: readonly SocietyCandidate[]): SocietyCandidate | null {
  const correct = candidates.filter((c) => c.correct)
  if (correct.length === 0) return null
  const harmonic = correct.filter((c) => c.harmonic)
  const pool = harmonic.length > 0 ? harmonic : correct
  return [...pool].sort(
    (a, b) =>
      efficiency(b.ledger) - efficiency(a.ledger) ||
      a.cost - b.cost ||
      a.solutionUuid.localeCompare(b.solutionUuid),
  )[0]!
}
