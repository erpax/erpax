/**
 * Tamper-cost — the security math of a zero-entropy app, made computational.
 *
 * erpax stores no secret: every id is a v8 content-uuid derived deterministically
 * from content (SHA-256, 106 binding bits — see uuid-format). So the security
 * property is INTEGRITY, not confidentiality: there is no key to steal, and the
 * only attack is to out-compute the whole. This module quantifies "how much".
 *
 * Two attack paths (all costs in log2 of operations, to avoid Number overflow):
 *   1. LOCAL FORGE — change one record but keep its uuid, so verification passes
 *      with no recompute. Needs a SHA-256 second-preimage on the digest bits:
 *      ~2^digestBits operations.
 *   2. GLOBAL REWRITE — recompute instead of collide. Cheap per node, BUT every
 *      relation is a content-uuid wired in all directions, so one change cascades
 *      to the transitive closure = the whole store; and the root is externally
 *      ANCHORED (services/anchoring → RFC-3161/eIDAS TSA or a blockchain leaf).
 *      To finish you must also forge that anchor: ~2^anchorStrengthBits.
 *
 * Binding cost = min(localForge, globalRewrite). The all-directions wiring is
 * what makes "change one" cost "change all", so the only cheap path (rewrite a
 * *deterministic* store) is closed UNLESS the anchor is absent — then a writer
 * recomputes everything for free and tamper-evidence collapses. The anchor is
 * the single place a zero-entropy app borrows external entropy; it must be at
 * least as strong as the digest, or it is the weak link.
 *
 * @standard NIST SP 800-107r1 §5.1 (hash security strengths: 2nd-preimage ≈ L bits, collision ≈ L/2)
 * @standard RFC 9562 §8 (UUID security considerations — no trusted-time / no integrity guarantee from the format alone)
 * @standard ISO-19011:2018 §6.5 (audit evidence integrity)
 * @audit Conservation Law 55/60 (tamper cost cascades through the uuid-chain)
 */

/** erpax v8 content-digest width (uuid-format: 48 + 12 + 46 bits of SHA-256). */
export const ERPAX_DIGEST_BITS = 106

/** log2 of the whole Bitcoin network's hashrate (~7×10^20 H/s) — a concrete "all of humanity's hashpower" yardstick. */
export const BITCOIN_HASHRATE_LOG2 = Math.log2(7e20)

/** log2 of seconds in a Julian year. */
export const LOG2_SECONDS_PER_YEAR = Math.log2(365.25 * 24 * 3600)

/** Second-preimage resistance of an n-bit digest ≈ 2^n operations (log2 = n). */
export const secondPreimageLog2 = (digestBits: number): number => digestBits

/** Birthday-collision resistance ≈ 2^(n/2) operations (log2 = n/2). */
export const birthdayLog2 = (digestBits: number): number => digestBits / 2

/**
 * Headroom (in bits) between an n-bit space's birthday bound and a row count.
 * Positive ⇒ safe; ≤ 0 ⇒ at/past the birthday bound, accidental collisions likely.
 * Collisions only matter WITHIN one content namespace (per-tenant salt partitions).
 */
export const birthdayMarginBits = (digestBits: number, rows: number): number =>
  birthdayLog2(digestBits) - Math.log2(Math.max(rows, 1))

/** log2 of years for a hashrate (given as log2 H/s) to perform 2^workLog2 operations. */
export const bruteYearsLog2 = (workLog2: number, hashrateLog2: number): number =>
  workLog2 - hashrateLog2 - LOG2_SECONDS_PER_YEAR

// ── Coverage law (Conservation Law 62) ──────────────────────────────────────
// The more of the store wired in structured content-uuids, the exponentially
// harder an undetected tamper. `coverage` ∈ [0,1] is the fraction of nodes that
// are checked content-addresses; `checks` is how many independent uuid checks a
// tamper must simultaneously evade (the all-directions cascade makes this large).

/** P(undetected tamper) ≈ (1 − coverage)^checks. → 0 as coverage → 1. */
export const tamperEvasionProbability = (coverage: number, checks: number): number =>
  Math.max(0, 1 - coverage) ** checks

/**
 * Work (log2 ops) to evade detection at a given coverage across `checks`
 * independent uuid checks: −checks·log2(1−coverage). Grows without bound as
 * coverage → 1 — "100% coverage by architecture" (all wired in uuid) ⇒ ∞.
 */
export const coverageCostLog2 = (coverage: number, checks: number): number =>
  coverage >= 1 ? Number.POSITIVE_INFINITY : -checks * Math.log2(1 - Math.min(coverage, 1))

export type CrackVerdict = {
  /** cheapest attack, log2 ops */
  crackCostLog2: number
  /** which path binds: the digest collision, the external anchor, or an un-anchored free rewrite */
  binding: 'second-preimage' | 'anchor' | 'free-rewrite'
  secondPreimageLog2: number
  birthdayMarginBits: number
  /** log2 years for the whole Bitcoin network to pay crackCost */
  bruteYearsLog2: number
  /** false ⇒ a writer can tamper without out-computing anything */
  tamperEvident: boolean
  note: string
}

/**
 * The verdict for a content-addressed, all-directions-wired store.
 * @param digestBits content-uuid digest width (default erpax's 106)
 * @param rows lifetime uuids in one namespace (for the birthday check)
 * @param anchored is the chain root externally anchored (TSA/blockchain)?
 * @param anchorStrengthBits security strength of that anchor (RSA-2048 TSA ≈ 112; PoW ≈ Infinity)
 */
export function crackVerdict(opts: {
  digestBits?: number
  rows?: number
  anchored?: boolean
  anchorStrengthBits?: number
  /** fraction of nodes wired in structured uuid (1 = 100% coverage by architecture) */
  coverage?: number
  /** independent uuid checks a tamper must evade together (the all-directions cascade) */
  checks?: number
}): CrackVerdict {
  const digestBits = opts.digestBits ?? ERPAX_DIGEST_BITS
  const rows = opts.rows ?? 1
  const anchored = opts.anchored ?? true
  const anchorStrengthBits = opts.anchorStrengthBits ?? 112 // RFC 3161 RSA-2048 TSA floor
  // Coverage layer: 0 when not modelled; +∞ at coverage=1 (all wired in uuid).
  const coverageCost = opts.coverage === undefined ? 0 : coverageCostLog2(opts.coverage, opts.checks ?? 1)

  const sp = secondPreimageLog2(digestBits)
  if (!anchored) {
    // No external entropy: a deterministic store is rewritable for free — the
    // cascade is cheap when you control every row. Tamper-evidence collapses.
    return {
      crackCostLog2: 0,
      binding: 'free-rewrite',
      secondPreimageLog2: sp,
      birthdayMarginBits: birthdayMarginBits(digestBits, rows),
      bruteYearsLog2: Number.NEGATIVE_INFINITY,
      tamperEvident: false,
      note: 'Un-anchored: a writer recomputes the whole deterministic store for free. The external anchor is mandatory.',
    }
  }
  // Anchored: must beat the cheaper of (collide the digest) / (forge the anchor),
  // PLUS evade every wired uuid check (the coverage layer — ∞ at 100% coverage).
  const perRecord = Math.min(sp, anchorStrengthBits)
  const crackCostLog2 = perRecord + coverageCost
  const binding = sp <= anchorStrengthBits ? 'second-preimage' : 'anchor'
  return {
    crackCostLog2,
    binding,
    secondPreimageLog2: sp,
    birthdayMarginBits: birthdayMarginBits(digestBits, rows),
    bruteYearsLog2: bruteYearsLog2(crackCostLog2, BITCOIN_HASHRATE_LOG2),
    tamperEvident: true,
    note:
      coverageCost === Number.POSITIVE_INFINITY
        ? '100% coverage by architecture (all wired in uuid) — no undetected tamper exists; cost is unbounded.'
        : binding === 'anchor'
          ? `Anchor (${anchorStrengthBits}-bit) is weaker than the ${digestBits}-bit digest — widen it or strengthen the anchor.`
          : `Bound by the ${digestBits}-bit digest second-preimage; the all-directions wiring makes any local tamper a global rewrite, closed by the anchor.`,
  }
}
