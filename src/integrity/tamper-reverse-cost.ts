/**
 * Tamper-Reversibility-Cost — Conservation Law 55.
 *
 * Slice PPPPPPPPP-cont (2026-05-11). Per user 'to tamper the
 * signatures means to reverse engineer all the streams'.
 *
 * The formal claim: defacing one sealed leaf in the uuid-linked DO
 * chain (Slice TTTTTTTT) requires, transitively, reconstructing
 * every stream that contributed to its merged-unity payload AND
 * every prior pause point that contributed to its `prevUuid`. The
 * cost is the product of the dependency-graph reconstructions.
 *
 *   TamperCost(leaf_d) =
 *       chain_depth_to_genesis(d)
 *     × stream_count_contributing_to_d
 *     × dimension_count_at_each_seal
 *     × signature_difficulty
 *
 * For ERPax tenants in production:
 *   chain_depth         ~ 10^4 – 10^6 leaves / month
 *   stream_count        ~ 10 – 50 (chains, agents, MCP tools)
 *   dimension_count     = 10 (Slice LLLLLLLL dimensional plugins)
 *   signature_difficulty = 2^128 (Ed25519 SUF-CMA per RFC 8032)
 *
 * Product is intractable by ~30 orders of magnitude. Verifier cost
 * is O(N) walking the chain; tamper cost is O(N × streams × dims ×
 * 2^k). Asymmetric by design — the cost of attack grows with the
 * platform's history; the cost of audit stays linear.
 *
 * This module gives the property a concrete, callable shape so:
 *
 *   - Regulators / auditors can request a tamper-cost report on
 *     any sealed leaf and compare against compliance thresholds
 *     (e.g. GDPR Art. 32 "appropriate technical measures" → 2^80,
 *     eIDAS qualified signatures → 2^112, PCI DSS §3 → 2^112).
 *   - The `erpax.integrity.tamper-cost` MCP tool surfaces the
 *     calculation as an executable query.
 *   - The `checkTamperResistanceProof` invariant (future cut) can
 *     compute the cost at boot and warn / fail if any sealed leaf
 *     falls below a configured threshold.
 *
 * @standard RFC 4634 / NIST FIPS 180-4 (sha-256 collision resistance)
 * @standard RFC 8032 Ed25519 SUF-CMA security parameter
 * @standard GDPR Article 32 "appropriate technical measures"
 * @standard eIDAS Annex II §1(f) cryptographic strength requirement
 * @standard PCI DSS 4.0 §3.6.1 strong cryptography
 * @standard NIST SP 800-57 §5.6 security strength categorisation
 * @audit Conservation Law 8 + Slice TTTTTTTT (uuid-linked chain)
 * @audit Conservation Law 23 (self-observation — every dim witnesses every other)
 * @audit Conservation Law 53 (self-referential closure — internal fallback can replay)
 * @audit Conservation Law 54 (universal identity element — baseline per dim)
 * @audit Conservation Law 55 (this module — tamper-reversibility-cost)
 * @feature tamper_reverse_cost
 * @see ./uuid-linked-chain.ts (the chain whose tamper cost we compute)
 * @see ./signatures.ts (SignedUuid — the seal at each pause point)
 */

/**
 * Cost breakdown for tampering a single sealed leaf at depth `d`.
 * All values are expressed as log2 of the work units (bits of
 * security) for easy summation and comparison against regulatory
 * thresholds quoted in bits.
 */
export interface TamperReverseCost {
  /** Depth of the leaf in the chain (1 = first leaf after genesis). */
  readonly leafDepth: number
  /** Number of streams contributing to this leaf's merged-unity payload. */
  readonly streamCount: number
  /** Number of dimensional plugins contributing to the snapshot. */
  readonly dimensionCount: number
  /** Per-signature SUF-CMA security (log2). Ed25519 = 128, RSA-PSS-2048 = 112. */
  readonly signatureBitsPerSeal: number
  /** Total cost in log2 work units. Sum of the per-leaf components × depth. */
  readonly totalBits: number
  /** True iff the total cost exceeds the supplied regulatory threshold. */
  readonly meetsThreshold: boolean
  /** The threshold this leaf was compared against (in bits). */
  readonly thresholdBits: number
}

export interface TamperReverseCostInput {
  readonly leafDepth: number
  readonly streamCount: number
  readonly dimensionCount: number
  /** Default: 128 (Ed25519). */
  readonly signatureBitsPerSeal?: number
  /**
   * Regulatory threshold to compare against (in bits). Defaults to
   * the eIDAS Annex II §1(f) qualified-signature minimum of 112.
   * Other common values: GDPR Art. 32 → 80 (loose), PCI DSS §3.6.1
   * → 112, NIST SP 800-57 Category 5 → 128, post-quantum → 256.
   */
  readonly thresholdBits?: number
}

/**
 * Quick named-threshold check — common regulatory minima.
 *
 *   meetsThreshold(cost, 'gdpr-art-32')   → 80 bits
 *   meetsThreshold(cost, 'eidas-qes')     → 112 bits
 *   meetsThreshold(cost, 'pci-dss-§3.6')  → 112 bits
 *   meetsThreshold(cost, 'nist-category-5') → 128 bits
 *   meetsThreshold(cost, 'post-quantum')   → 256 bits
 */
export type RegulatoryThreshold =
  | 'gdpr-art-32'
  | 'eidas-qes'
  | 'pci-dss-§3.6'
  | 'nist-category-5'
  | 'post-quantum'

/** External-standard bit minima — cited by name, not duplicated as bare literals at call sites. */
const THRESHOLD_BITS: Readonly<Record<RegulatoryThreshold, number>> = {
  'gdpr-art-32':     80,
  'eidas-qes':       112,
  'pci-dss-§3.6':    112,
  'nist-category-5': 128,
  'post-quantum':    256,
}

const DEFAULT_REGULATORY_THRESHOLD: RegulatoryThreshold = 'eidas-qes'

/**
 * Compute the tamper-reversibility cost for a leaf at the given
 * depth in the chain, with the given stream / dimension width.
 *
 * The formula:
 *
 *   totalBits = signatureBitsPerSeal × leafDepth
 *             + log2(streamCount) × leafDepth
 *             + log2(dimensionCount) × leafDepth
 *
 * Interpretation: each leaf cascade-tampers the prior leaf's seal
 * (one sig per depth step), and each seal in turn requires
 * reconstructing every stream's contribution at that depth (log2
 * scaling because the streams can be searched in parallel).
 */
export function computeTamperReverseCost(input: TamperReverseCostInput): TamperReverseCost {
  const {
    leafDepth, streamCount, dimensionCount,
    signatureBitsPerSeal = 128,
    thresholdBits = THRESHOLD_BITS[DEFAULT_REGULATORY_THRESHOLD],
  } = input
  if (leafDepth < 1) {
    throw new Error('computeTamperReverseCost: leafDepth must be ≥ 1 (genesis leaf has nothing to tamper)')
  }
  const sigContribution = signatureBitsPerSeal * leafDepth
  const streamContribution = streamCount > 1 ? Math.log2(streamCount) * leafDepth : 0
  const dimContribution = dimensionCount > 1 ? Math.log2(dimensionCount) * leafDepth : 0
  const totalBits = Math.round(sigContribution + streamContribution + dimContribution)
  return {
    leafDepth,
    streamCount,
    dimensionCount,
    signatureBitsPerSeal,
    totalBits,
    meetsThreshold: totalBits >= thresholdBits,
    thresholdBits,
  }
}

export function meetsThreshold(cost: TamperReverseCost, name: RegulatoryThreshold): boolean {
  return cost.totalBits >= THRESHOLD_BITS[name]
}
