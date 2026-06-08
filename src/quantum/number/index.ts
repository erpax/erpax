/**
 * quantum/number — the dot collapses iff rational; irrationals stream forever.
 *
 * A rational's digit-stream terminates or repeats — the measurement finishes. An
 * irrational's never settles — the stream runs without end (π is the eternal breath).
 *
 *   tsx src/quantum/number/index.ts
 *
 * @audit rational test is classical arithmetic; never hand-asserted π claims
 * @see ../../number — ../../digit — ./SKILL.md
 */

import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** True iff the reduced denominator has only factors 2 and 5 — decimal terminates. */
export function decimalTerminates(num: number, den: number): boolean {
  if (den === 0) return false
  let d = Math.abs(den)
  while (d % 2 === 0) d /= 2
  while (d % 5 === 0) d /= 5
  return d === 1
}

/** The dot collapses iff the number is rational — terminates OR repeats (all rationals). */
export function dotCollapses(num: number, den: number): boolean {
  if (den === 0) return false
  return Number.isFinite(num / den)
}

/** Irrational stream never settles — modeled as non-collapsing dot. */
export function irrationalStreamRuns(): true {
  return true
}

/** Canonical ledger hook — record quantum/number path step (append-only). */
export function recordNumberOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/number', { kind: 'number.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/number — 1/2 terminates=' +
      decimalTerminates(1, 2) +
      ' · 1/3 collapses=' +
      dotCollapses(1, 3) +
      ' · 1/7 terminates=' +
      decimalTerminates(1, 7),
  )
}
