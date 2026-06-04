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
  Math.min(digestBits, ANCHOR_STRENGTH_BITS[anchor])

/** Which side is the weak link — for the verdict note. */
export function anchorBinding(anchor: AnchorKind, digestBits: number): 'digest' | 'anchor' | 'none' {
  if (anchor === 'none') return 'none'
  return ANCHOR_STRENGTH_BITS[anchor] >= digestBits ? 'digest' : 'anchor'
}
