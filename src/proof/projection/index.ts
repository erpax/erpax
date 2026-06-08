/**
 * Projection — the maximum tamper cost is the inverse, the analog negative.
 *
 * The uuid matrix (services/uuid-matrix) is a projection space. The FORWARD
 * projection is the public POSITIVE: content → content-uuid, private-key → public
 * anchor. It is one hash — free, deterministic, O(1) — and it mints an atom
 * ([[identity]]: same content ⇒ same id), the cheap reverse-entropy direction a
 * key/content holder gets through the trapdoor.
 *
 * The MAXIMUM tamper cost is the INVERSE: recovering the analog NEGATIVE — the
 * private key, the pre-image — from the positive. Reconstructing order from a
 * maximal-entropy projection IS reverse entropy, and by the 2nd law it is the
 * costliest direction. Its price is the external anchor erpax borrows
 * (services/anchor) and is FINITE OR UNBOUNDED STRICTLY BY THAT ANCHOR — never
 * unbounded by default: `none` ⇒ 0 (no anchor pins nothing), rfc3161-ecdsa-p256
 * ⇒ 2^128 (finite), blockchain-pow ⇒ unbounded (cumulative proof-of-work). Only
 * under blockchain-pow is the inverse unbounded; for the biggest blockchain the
 * entire unclaimed bounty sitting on exposed public keys is the live proof nobody
 * pays it. The proof's `note` always names the ACTUAL `anchorKind` so a finite
 * anchor never inherits the unbounded wording (ground-don't-assert).
 *
 * The 106-bit content-digest second-preimage (services/tamper-cost ERPAX_DIGEST_BITS)
 * is the CHEAPER hash-collision path — the honest overall forge floor — but it is
 * NOT the maximum. The maximum is the anchor: decrypt the private key, or forge the
 * chain. Pure + deterministic, and JCS-serializable (no Infinity leaks — the
 * unbounded case is `decryptKeyLog2: null` + `unbounded: true`) so it drops into the
 * content-uuid'd dry-proof bundle.
 *
 * @standard RFC 9562 §5.8 (content-uuid v8, the forward projection) · RFC 8785 (JCS)
 * @standard SEC 2 secp256k1 / FIPS 186-4 P-256 (ECDLP — the inverse key recovery)
 * @standard NIST SP 800-57 Part 1 r5 §5.6.1 (anchor key strengths)
 * @audit Conservation Law 55/62 (forge ≫ verify; coverage → ∞ at the anchor)
 * @see ../../dry-proof.ts ../../bitcoin/genesis src/services/anchor src/services/uuid-matrix
 */

import { computeContentUuid } from '@/integrity'
import { ANCHOR_STRENGTH_BITS, anchoredFloorLog2, anchorBinding, type AnchorKind } from '@/anchor'
import { ERPAX_DIGEST_BITS } from '@/cost'

const PROJECTION_TENANT = 'erpax-public-proof'
/** A sample pre-image projected forward to demonstrate the free, deterministic positive. */
const SAMPLE: Record<string, unknown> = { atom: 'projection', space: 'uuid-matrix' }

export interface ProjectionProof {
  readonly space: 'uuid-matrix'
  readonly claim: string
  /** the forward projection — the public positive, free + deterministic (one atom per hash) */
  readonly forward: {
    readonly sample: string
    readonly uuid: string
    readonly deterministic: boolean
    readonly costLog2: 0
  }
  /** the inverse — recovering the analog negative (the private key); the maximum tamper cost */
  readonly inverse: {
    /** hash second-preimage on the content digest — the cheaper path, NOT the max */
    readonly digestFloorLog2: number
    /** the trapdoor / borrowed entropy that prices the inverse */
    readonly anchorKind: AnchorKind
    /** log2 ops to recover the negative (decrypt the key / forge the anchor); null ⇒ unbounded */
    readonly decryptKeyLog2: number | null
    /** true ⇒ the analog negative is unrecoverable (blockchain-pow: cumulative PoW / ∞) */
    readonly unbounded: boolean
    /** honest overall forge floor = min(digest, anchor) — always finite */
    readonly cheapestForgeLog2: number
    readonly binding: 'digest' | 'anchor' | 'none'
  }
  readonly reverseEntropy: string
  readonly note: string
}

/**
 * Build the projection proof leg. Default anchor `blockchain-pow` is the biggest
 * blockchain — the inverse (decrypting its private keys) is unbounded.
 */
export function projectionProof(anchorKind: AnchorKind = 'blockchain-pow'): ProjectionProof {
  const uuid = computeContentUuid(SAMPLE, PROJECTION_TENANT)
  const deterministic = uuid === computeContentUuid(SAMPLE, PROJECTION_TENANT)
  const strength = ANCHOR_STRENGTH_BITS[anchorKind]
  const unbounded = !Number.isFinite(strength)
  // The inverse cost is STRICTLY a function of the supplied anchor — surfaced in
  // prose so a finite (or absent) anchor never inherits the "unbounded" wording.
  const inverseCost = unbounded
    ? `unbounded (cumulative proof-of-work — ${anchorKind})`
    : strength === 0
      ? `0 — no anchor (${anchorKind}) pins nothing, so the inverse is NOT a maximum and the store is a free rewrite`
      : `a finite 2^${strength} (${anchorKind})`
  return {
    space: 'uuid-matrix',
    claim: `Under the ${anchorKind} anchor the maximum tamper cost is the inverse projection — recovering the analog negative (the private key) from its public positive on the uuid matrix costs ${inverseCost}.`,
    forward: {
      sample: JSON.stringify(SAMPLE),
      uuid,
      deterministic,
      costLog2: 0,
    },
    inverse: {
      digestFloorLog2: ERPAX_DIGEST_BITS,
      anchorKind,
      decryptKeyLog2: unbounded ? null : strength,
      unbounded,
      cheapestForgeLog2: anchoredFloorLog2(anchorKind, ERPAX_DIGEST_BITS),
      binding: anchorBinding(anchorKind, ERPAX_DIGEST_BITS),
    },
    reverseEntropy:
      'Forward projection mints an atom (content → uuid) for one hash — reverse entropy bought cheaply through the trapdoor (the held key/content). Recovering the analog negative WITHOUT the key costs the anchor, and ONLY blockchain-pow makes it unbounded; a finite anchor (e.g. rfc3161-ecdsa-p256 ⇒ 2^128) caps it, and no anchor (none ⇒ 0) leaves no cost at all. Order created vs entropy spent, balanced double-entry.',
    note:
      `Forward (project) is free + deterministic; the inverse (decrypt the private key / forge the anchor — the analog negative) costs ${inverseCost} under the supplied ${anchorKind} anchor. The honest overall forge floor is min(106-bit digest, anchor) = 2^${anchoredFloorLog2(anchorKind, ERPAX_DIGEST_BITS)}. The 106-bit digest second-preimage is the cheaper hash-collision path${unbounded ? ' — and only this cumulative-proof-of-work anchor makes the inverse the unbounded maximum' : '; this finite anchor is the maximum, NOT a default-infinity'}.`,
  }
}
