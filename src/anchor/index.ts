import { exactMax, exactMin, exactAbs, exactFloor, exactCeil, exactRound, exactTrunc } from '@/algebra'
/**
 * Anchor — the one external entropy a zero-entropy app borrows to be tamper-proof.
 *
 * The content-addressed whole is deterministic — no secret, nothing to steal. The
 * external anchor is the single drop of NON-reproducible entropy that pins the
 * chain root to a time/order no party can rewrite. tamper-cost is bound by
 * min(digest, anchor) (see ../tamper-cost), so the anchor MUST be at least as
 * strong as the content digest, or it is the weak link — and an UN-anchored
 * deterministic store is rewritten for free.
 *
 * This module is the strengths-per-kind data layer the tamper-cost math needs
 * (it takes `anchorStrengthBits` as a bare number; here are the real values).
 *
 * @standard RFC 3161 §2.4 (TSA timestamp token) · eIDAS (EU 910/2014) Art.41–42 · ETSI EN 319 422
 * @standard NIST SP 800-57 Part 1 r5 §5.6.1 (comparable key strengths)
 */

import { ERPAX_DIGEST_BITS, secondPreimageLog2, bhtCollisionLog2 } from '@/cost'

export type AnchorKind =
  | 'none'
  | 'rfc3161-rsa2048'
  | 'rfc3161-ecdsa-p256'
  | 'eidas-qualified'
  | 'blockchain-pow'

/** Security strength (bits) to FORGE each anchor. ∞ = practically unforgeable (51% the chain's cumulative work). */
export const ANCHOR_STRENGTH_BITS: Record<AnchorKind, number> = {
  none: 0,
  'rfc3161-rsa2048': 112, // NIST SP 800-57: RSA-2048 ≈ 112-bit
  'rfc3161-ecdsa-p256': 128, // P-256 ≈ 128-bit
  'eidas-qualified': 128, // qualified TSA, P-256 class + legal non-repudiation
  'blockchain-pow': Number.POSITIVE_INFINITY,
}

/** Does the anchor BIND — i.e. is it at least as strong as the content digest? */
export const anchorBinds = (anchor: AnchorKind, digestBits: number): boolean =>
  ANCHOR_STRENGTH_BITS[anchor] >= digestBits

/** The tamper-cost floor (log2 ops) for an anchored store: min(collide digest, forge anchor). */
export const anchoredFloorLog2 = (anchor: AnchorKind, digestBits: number): number =>
  exactMin(digestBits, ANCHOR_STRENGTH_BITS[anchor])

/** Which side is the weak link — for the verdict note. */
export function anchorBinding(anchor: AnchorKind, digestBits: number): 'digest' | 'anchor' | 'none' {
  if (anchor === 'none') return 'none'
  return ANCHOR_STRENGTH_BITS[anchor] >= digestBits ? 'digest' : 'anchor'
}

/** The measured resilience of the 4-key nav cross (bind4) to key-cracking. */
export interface FusionResilience {
  /** Keys in the cross — referrer ⊕ id ⊕ prev ⊕ next. */
  readonly keys: number
  /** Per-key content-commitment width (bits). */
  readonly digestBits: number
  /** One key alone, inverted: total break. The single-point-of-failure the fusion removes. */
  readonly singleKeyBrokenLog2: 0
  /** With any k < keys cracked, forging the fold still costs a full second-preimage. */
  readonly fusionFloorClassicalLog2: number
  /** The lowest honest floor — quantum (BHT) collision on the commitment. */
  readonly fusionFloorQuantumLog2: number
  /** How many keys may be cracked with integrity still held (the flat floor holds to keys − 1). */
  readonly crackableWithIntegrity: number
  /**
   * TRUE because `merge` is a cryptographic hash, not a linear (XOR) combiner: the
   * generalized-birthday / k-tree attack that would let cracked keys COMPOUND is
   * blocked, so the forge floor is flat under cracking (measured: 3-of-4 cracked
   * reaches only the uniform-random minimum distance to a target root).
   */
  readonly flatUnderCracking: true
  /**
   * One direction bit per directed referral (Möbius 0↔∞ gateway, gatewayBits =
   * log₂2 = 1). TOPOLOGICAL, not strength: closing the open line into a loop is what
   * lets the cross REFORM (the moving second-preimage target), but 2^keys orientations
   * are brute-forced trivially — never counted toward the floor.
   */
  readonly orientationBits: number
}

/**
 * Fold of the fusion + threshold computations: the 4-key cross survives one (indeed
 * up to keys − 1) inverted key with its full second-preimage floor intact, because a
 * hash fold does not compound cracked keys. The improvement over a lone key is the
 * whole floor recovered (0 → digest). Orientation bits are the loop's topology.
 */
export function fusionResilience(keys = 4, digestBits = ERPAX_DIGEST_BITS): FusionResilience {
  return {
    keys,
    digestBits,
    singleKeyBrokenLog2: 0,
    fusionFloorClassicalLog2: secondPreimageLog2(digestBits),
    fusionFloorQuantumLog2: bhtCollisionLog2(digestBits),
    crackableWithIntegrity: exactMax(0, keys - 1),
    flatUnderCracking: true,
    orientationBits: keys,
  }
}
