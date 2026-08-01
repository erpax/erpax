/**
 * anchor/claims — the post-quantum surfaces, typed as verdicts and compasses.
 *
 * [[anchor]] already carries the strengths-and-assumptions data layer (`slh-dsa-fips205`,
 * `ml-dsa-fips204`, `POST_QUANTUM_STRENGTH_BITS`) and [[anchor]]/surface already gates the manifest
 * (`root-unsealed`, `channel-unsealed`, `status-bare`, `surface-undeclared`). What neither carries
 * is the DISTINCTION between what is proven and what is intended — so this atom applies
 * [[convention]]/discern to them and lets the integrity metric read the difference.
 *
 * **The distinction that matters here, and it is uncomfortable.** erpax cites FIPS 203/204/205 and
 * defines their strengths, but it does not SIGN anything: no PQC implementation is installed. A
 * verdict for "sign a root, flip one byte, verification fails" would name a test that cannot
 * exercise the property, and `verdictHolds` would reject it as a tautology under a heading — which
 * is exactly what discern is for. So the primitives are COMPASSES until a library is pinned, and
 * the integrity number is lower and true rather than higher and asserted.
 *
 * What IS a verdict is everything the corpus genuinely computes: the manifest completeness gate,
 * the channel rule, the root rule, and the threat model's calibration.
 *
 * **Standards are pinned with revision, because FIPS 203 and 204 carry errata.** A bare citation
 * ("FIPS 203") does not identify the document a reviewer must read, and [[rules]]/reference already
 * established that a citation which cannot be followed is unreviewable.
 *
 * @law a cryptographic surface is sealed by a FINAL standard and a passing test, or it is open with
 *      its gap and its owner named. A citation without its revision does not identify a document.
 * @invariant a primitive with no implementation is a compass, never a verdict
 * @invariant a claim of imminent-break protection FAILS as an over-claim
 * @invariant every reachable surface is claimed; a silent omission is refused upstream by manifestGaps
 * @standard FIPS 205 (SLH-DSA, 2024-08-13) — stateless hash-based signatures
 * @standard FIPS 204 (ML-DSA, 2024-08-13, with errata) — lattice signatures
 * @standard FIPS 203 (ML-KEM, 2024-08-13, with errata) — key encapsulation
 * @standard NIST SP 800-227 — recommendations for key encapsulation mechanisms
 * @see ./SKILL.md -- ../surface -- ../../convention/discern
 */
import type { Claim, EvidenceSource } from '@/convention/discern'

/** A standard pinned to the revision a reviewer must actually open. */
export interface PinnedStandard {
  readonly id: string
  readonly revision: string
  /** true when the published document carries errata a reader must apply */
  readonly hasErrata: boolean
  readonly final: boolean
}

/**
 * The standards this atom's surfaces rest on, pinned.
 *
 * FIPS 203 and 204 carry errata; citing them bare names a document that differs from the one in
 * force. FIPS 206 (FN-DSA) is draft and HQC is selected-but-unpublished — both are `final: false`,
 * which is what makes them compasses rather than a judgement call.
 */
export const PINNED: readonly PinnedStandard[] = [
  { id: 'FIPS 205', revision: '2024-08-13', hasErrata: false, final: true },
  { id: 'FIPS 204', revision: '2024-08-13', hasErrata: true, final: true },
  { id: 'FIPS 203', revision: '2024-08-13', hasErrata: true, final: true },
  { id: 'NIST SP 800-227', revision: '2025', hasErrata: false, final: true },
  { id: 'FIPS 206', revision: 'draft', hasErrata: false, final: false },
  { id: 'HQC', revision: 'selected 2025-03, standard pending', hasErrata: false, final: false },
]

export function pinned(id: string): PinnedStandard | undefined {
  return PINNED.find((p) => p.id === id)
}

/** A bare citation does not identify a document. Used to reject one at the point it is made. */
export function citationIsPinned(citation: string): boolean {
  const p = PINNED.find((s) => citation.startsWith(s.id))
  if (!p) return false
  return citation.includes(p.revision)
}

/**
 * The threat model, calibrated.
 *
 * Post-quantum work today defends **harvest-now-decrypt-later**: traffic captured now and decrypted
 * when a cryptanalytically relevant quantum computer exists. It does NOT defend against an imminent
 * break, and claiming it does is the over-claim this refuses.
 *
 * The gap is not rhetorical. Breaking RSA-2048 by Shor needs on the order of thousands of LOGICAL
 * qubits — error-corrected, each built from many physical ones — while demonstrated logical-qubit
 * counts remain roughly two orders of magnitude below that. The numbers below are DECLARED with
 * their date, because they move and a stale figure quoted as current is its own defect.
 */
export interface ThreatModel {
  readonly defends: 'harvest-now-decrypt-later'
  readonly doesNotDefend: 'imminent-break'
  readonly asOf: string
  readonly logicalQubitsNeededOrder: number
  readonly logicalQubitsDemonstratedOrder: number
}

export const THREAT_MODEL: ThreatModel = {
  defends: 'harvest-now-decrypt-later',
  doesNotDefend: 'imminent-break',
  asOf: '2026-01',
  logicalQubitsNeededOrder: 4000,
  logicalQubitsDemonstratedOrder: 96,
}

export class OverClaim extends Error {
  constructor(claim: string) {
    super(
      `anchor/claims: over-claim — "${claim}". Post-quantum migration defends harvest-now-decrypt-later. ` +
        `As of ${THREAT_MODEL.asOf} a Shor break of RSA-2048 needs ~${THREAT_MODEL.logicalQubitsNeededOrder} ` +
        `logical qubits against ~${THREAT_MODEL.logicalQubitsDemonstratedOrder} demonstrated; claiming ` +
        'protection from an imminent break asserts a threat that is not the one being mitigated.',
    )
    this.name = 'OverClaim'
  }
}

/** Refuse a threat claim the model does not support. */
export function assertThreatClaim(claim: string): void {
  if (/imminent|already broken|breaks? (rsa|ecc) (today|now)|quantum computers can/i.test(claim)) {
    throw new OverClaim(claim)
  }
}

/**
 * The claims, typed.
 *
 * VERDICTS are the things erpax computes: the manifest gate, the channel and root rules, the
 * pinning, and the threat calibration. COMPASSES are the primitives, because nothing here signs.
 */
export const CLAIMS: readonly Claim[] = [
  { property: 'anchor.manifestComplete', measuredBy: 'src/anchor/surface/test.ts' },
  { property: 'anchor.channelRequiresMlKem', measuredBy: 'src/anchor/surface/test.ts' },
  { property: 'anchor.rootRequiresPqSignature', measuredBy: 'src/anchor/surface/test.ts' },
  { property: 'anchor.standardsPinned', measuredBy: 'src/anchor/claims/test.ts' },
  { property: 'anchor.threatModelCalibrated', measuredBy: 'src/anchor/claims/test.ts' },
  {
    property: 'anchor.slhDsaSigning',
    closedBy: 'a pinned FIPS 205 implementation + NIST KATs; test: sign a root, flip one byte, verification fails',
    owner: 'security',
  },
  {
    property: 'anchor.mlKemChannel',
    closedBy: 'a pinned FIPS 203 implementation + NIST KATs, per SP 800-227',
    owner: 'security',
  },
  {
    property: 'anchor.fnDsa',
    closedBy: 'FIPS 206 final + KATs',
    owner: 'security',
  },
  {
    property: 'anchor.hqc',
    closedBy: 'HQC final standard',
    owner: 'security',
  },
]

export const SURFACES: readonly string[] = CLAIMS.map((c) => c.property)

/** What each proof exercises, declared here so the corpus metric reads it without importing a test. */
export const EVIDENCE: readonly EvidenceSource[] = [
  {
    measuredBy: 'src/anchor/surface/test.ts',
    exercised: 'a channel without ML-KEM, and a root without a PQ signature, both raised gaps',
    wouldFailIf: 'manifestGaps accepted an undeclared or bare-status surface',
  },
  {
    measuredBy: 'src/anchor/claims/test.ts',
    exercised: 'rejected a bare citation and an imminent-break claim; every non-final standard resolved to a compass',
    wouldFailIf: 'citationIsPinned accepted "FIPS 203" without its revision',
  },
]
