/**
 * quantum/security — bidirectional security: blue verify ⊕ red price forging; balanced pair.
 *
 * Every control is read both ways — verify it holds and price forging past it. Red
 * prices the attack but never ships it.
 *
 *   tsx src/quantum/security/index.ts
 *
 * @audit conjugate law modeled as forgeCostLog2 ≥ compression depth
 * @see ../../security — ../../tamper — ./SKILL.md
 */

import { recordPathVisit, type PathCanonicalEntry } from '@/path'
export interface SecurityFinding {
  readonly control: string
  readonly blueHolds: boolean
  readonly forgeCostLog2: number
}

/** A finding is balanced — both blue verdict and red price are present. */
export function balancedFinding(f: SecurityFinding): boolean {
  return f.control.length > 0 && Number.isFinite(f.forgeCostLog2) && f.forgeCostLog2 >= 0
}

/** Bidirectional read — verify ⊕ price (double-entry pair). */
export function bidirectionalVerdict(f: SecurityFinding): { verify: boolean; priceLog2: number } {
  return { verify: f.blueHolds, priceLog2: f.forgeCostLog2 }
}

/** Conjugate law — deeper compression ⇒ higher forging temperature. */
export function conjugateHolds(compressionBits: number, forgeCostLog2: number): boolean {
  return forgeCostLog2 >= compressionBits
}

/** Canonical ledger hook — record quantum/security path step (append-only). */
export function recordSecurityOnPath(
  payload: unknown,
  at?: string,
  prevEntryUuid?: string | null,
  seq?: number,
): PathCanonicalEntry {
  return recordPathVisit('quantum/security', { kind: 'security.step', payload }, at, prevEntryUuid, seq)
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const f: SecurityFinding = { control: 'uuid-seal', blueHolds: true, forgeCostLog2: 128 }
  console.log('quantum/security — balanced=' + balancedFinding(f) + ' · conjugate=' + conjugateHolds(128, 128))
}
