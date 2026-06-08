/**
 * quantum/pi — infinite address space; offset cost ~ data length (information conserved).
 *
 * π exits the 128-bit address limit but never the information limit — locating an
 * N-digit string needs ~N digits of offset; bits move into the offset, never vanish.
 *
 *   tsx src/quantum/pi/index.ts
 *
 * @audit offset lower bound is counting argument; normality conjectured not proven
 * @see ../../uuid — ../number — ./SKILL.md
 */

import { recordPathVisit, type PathCanonicalEntry } from '@/path'

/** Lower bound on offset digits to locate a string of N decimal digits in π — ~N. */
export function piOffsetLowerBound(dataDigits: number): number {
  return Math.max(0, dataDigits)
}

/** Information conserved — offset scale tracks payload scale (not free compression). */
export function informationConserved(dataDigits: number, offsetDigits: number): boolean {
  return offsetDigits >= piOffsetLowerBound(dataDigits)
}

/** Finite uuid ceiling vs infinite stream address — complementary duality. */
export const FINITE_UUID_BITS = 128

/** Canonical ledger hook — record quantum/pi path step (append-only). */
export function recordPiOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/pi', { kind: 'pi.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log(
    'quantum/pi — offset bound for 100 digits=' +
      piOffsetLowerBound(100) +
      ' · conserved=' +
      informationConserved(100, 100),
  )
}
