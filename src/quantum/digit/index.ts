/**
 * quantum/digit — word ⊕ digit duality: one-folder-per-unit, same address-law.
 *
 * The digit corpus obeys the SAME law as the word corpus — crosslinked by [[links]],
 * folded by one content-[[uuid]]. Off-sequence atoms break the symmetric duality.
 *
 *   tsx src/quantum/digit/index.ts
 *
 * @audit digit trace computed from live matrix; never hand-maintained
 * @see ../../digit — ../../word — ./SKILL.md
 */
import { digitTrace, offSequence, digitAddress } from '@/digit'
import { recordPathVisit, type PathCanonicalEntry } from '@/path'

export {
  interact64,
  architectureBond,
  architectureBondStable,
  architectureMask,
  combineArchitectures,
  architectureFoldPaths,
  recordArchitectureFoldOnPath,
} from '@/quantum/word'

/** Word ⊕ digit duality holds when every atom folds onto the horo ring. */
export const wordDigitDualityHolds = (): boolean => offSequence().length === 0

export { digitTrace, digitAddress, offSequence }

/** Canonical ledger hook — record quantum/digit path step (append-only). */
export function recordDigitOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/digit', { kind: 'digit.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const trace = digitTrace()
  console.log(
    'quantum/digit — dualityHolds=' +
      wordDigitDualityHolds() +
      ' · cells=' +
      trace.size +
      ' · off-sequence=' +
      offSequence().length,
  )
}
