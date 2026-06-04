/**
 * Tamper-cost — the security math of a zero-entropy app, made computational.
 *
 * erpax stores no secret: every id is a v8 content-uuid derived deterministically
 * from content (SHA-256, 106 binding bits — see uuid-format). So the security
 * property is INTEGRITY, not confidentiality: there is no key to steal, and the
 * only attack is to out-compute the whole. This module quantifies "how much".
 *
 * Three attack paths (all costs in log2 of operations, to avoid Number overflow):
 *   1. LOCAL FORGE — change one record but keep its uuid, so verification passes
 *      with no recompute. Needs a SHA-256 second-preimage on the digest bits:
 *      ~2^digestBits operations.
 *   2. CHOSEN-CONTENT COLLISION — author TWO contents that collide on the width
 *      the external commitment binds, get the benign one anchored, then later
 *      present the malign one (same committed value ⇒ the anchor cannot tell them
 *      apart). Cost is a birthday collision: ~2^(commitmentBits/2). This is why
 *      the Merkle leaf / anchor must commit to the FULL 256-bit content digest
 *      (services/integrity/content-uuid `computeContentDigest`, collision 2^128),
 *      NOT the truncated 106-bit uuid — whose collision floor is only 2^53. In
 *      scope only when the attacker authors content before it is committed.
 *   3. GLOBAL REWRITE — recompute instead of collide. Cheap per node, BUT every
 *      relation is a content-uuid wired in all directions, so one change cascades
 *      to the transitive closure = the whole store; and the root is externally
 *      ANCHORED (services/anchoring → RFC-3161/eIDAS TSA or a blockchain leaf).
 *      To finish you must also forge that anchor: ~2^anchorStrengthBits.
 *
 * Binding cost = min(localForge, chosenCollision, globalRewrite). The chosen-
 * collision path binds only when `anchorCommitmentBits` is supplied (the
 * attacker controls pre-commit content). The all-directions wiring is
 * what makes "change one" cost "change all", so the only cheap path (rewrite a
 * *deterministic* store) is closed UNLESS the anchor is absent — then a writer
 * recomputes everything for free and tamper-evidence collapses. The anchor is
 * the single place a zero-entropy app borrows external entropy; it must be at
 * least as strong as the digest, or it is the weak link.
 *
 * The coverage law (Law 62 — every node wired in uuid; → ∞ at 100%) counts the
 * independent checks a coherent tamper must simultaneously evade. Two inhaled
 * deepseek mechanisms enlarge that count without touching verify (still O(N)):
 * machine-checked conservation invariants ADD semantic gates (DeepSeek-Prover —
 * the closure must still balance), and 3FS/CRAQ replication MULTIPLIES the
 * per-replica set ×R under strong consistency. Both feed the one
 * `coverageCostLog2`; neither is a new term.
 *
 * @standard NIST SP 800-107r1 §5.1 (hash security strengths: 2nd-preimage ≈ L bits, collision ≈ L/2)
 * @standard RFC 9562 §8 (UUID security considerations — no trusted-time / no integrity guarantee from the format alone)
 * @standard ISO-19011:2018 §6.5 (audit evidence integrity)
 * @standard CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication
 * @standard DeepSeek-Prover-V2 — recursive subgoal decomposition, Lean-4 kernel-checked invariants
 * @audit Conservation Law 55/60 (tamper cost cascades through the uuid-chain)
 * @audit Conservation Law 62 (coverage) enlarged by the invariant (semantic) + replica axes
 * @see https://github.com/deepseek-ai/3FS (Fire-Flyer File System — production CRAQ; the deepseek inhale)
 * @see https://github.com/deepseek-ai/DeepSeek-Prover-V2 (machine-checked invariants; the deepseek inhale)
 */

/** erpax v8 content-digest width (uuid-format: 48 + 12 + 46 bits of SHA-256). */
export const ERPAX_DIGEST_BITS = 106

/**
 * Full SHA-256 content-digest width — what an anchor / Merkle leaf SHOULD commit
 * to (services/integrity/content-uuid `computeContentDigest`). Committing this
 * full digest puts the chosen-content collision floor at 2^128, above the 2^106
 * uuid second-preimage; committing only the 106-bit uuid drops it to 2^53.
 */
export const CONTENT_DIGEST_BITS = 256

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

/**
 * 3FS/CRAQ replication amplifier — the [[breath]] in-stroke from deepseek-ai/3FS.
 *
 * Chain Replication with Apportioned Queries (CRAQ) — the strong-consistency
 * protocol behind the Fire-Flyer File System — replicates each write across a
 * chain of R nodes and lets ANY node answer a read, re-deriving the content-uuid
 * before it does. So an undetected tamper must evade the all-directions coverage
 * check on EVERY replica *simultaneously*, before any apportioned query
 * cross-reads it: the independent-check count is multiplied by R. This is the
 * SAME coverage law ([[merge]]: same content ⇒ same uuid on every peer) run
 * across the replica axis — an amplifier of the existing term, not a new one.
 *
 * The multiplier is REAL only under strong consistency. Eventual consistency
 * leaves a stale-read window — a forger tampers one replica and it can serve the
 * tampered version before reconciliation — so conservatively only the local
 * check binds (×1). Closing that window is exactly what CRAQ buys here.
 *
 * @standard CRAQ — Terrace & Freedman, "Object Storage on CRAQ", USENIX ATC 2009
 * @standard Chain Replication — van Renesse & Schneider, OSDI 2004
 * @see https://github.com/deepseek-ai/3FS (Fire-Flyer File System — production CRAQ)
 * @audit Conservation Law 62 (coverage) amplified across the replica axis
 */
export const replicationChecks = (checks: number, replicas: number, strongConsistency: boolean): number =>
  strongConsistency ? checks * Math.max(replicas, 1) : checks

/**
 * Machine-checked-invariant amplifier — the [[breath]] in-stroke from
 * deepseek-ai/DeepSeek-Prover (Lean-4 recursive-subgoal proof).
 *
 * The uuid cascade ([[merge]]/[[aura]]) forces a coherent tamper to rewrite the
 * structural closure (every wired relation). Conservation invariants — the
 * [[proof]] nucleus: double-entry must balance, a sealed period must stay
 * locked, a chain must verify — force it to ALSO satisfy the *semantic* closure:
 * a uuid-consistent state that violates balance is still caught. Each invariant
 * that constrains the tampered node is therefore one more independent gate the
 * forger must pass — gates ADD (a distinct set), where replicas MULTIPLY (copies
 * of the same set). DeepSeek-Prover's contribution is that these invariants are
 * MACHINE-checked, recursively and automatically, so the verifier still runs
 * them in O(N) ([[proof]]: green by construction) — the asymmetry is preserved.
 *
 * The count is honest only for invariants the audit ACTUALLY runs (the
 * `dry-proof` bundle / boot invariants). An invariant nobody checks is no gate.
 *
 * @standard DeepSeek-Prover-V2 (recursive subgoal decomposition; Lean 4 kernel-checked)
 * @see https://github.com/deepseek-ai/DeepSeek-Prover-V2 (the deepseek inhale)
 * @audit Conservation Law 62 (coverage) enlarged by the semantic (invariant) closure
 */
export const invariantChecks = (checks: number, invariants: number): number =>
  checks + Math.max(invariants, 0)

export type CrackVerdict = {
  /** cheapest attack, log2 ops */
  crackCostLog2: number
  /** which path binds: a post-hoc second-preimage, a chosen-content collision, the external anchor, or an un-anchored free rewrite */
  binding: 'second-preimage' | 'collision' | 'anchor' | 'free-rewrite'
  secondPreimageLog2: number
  /** chosen-content birthday-collision cost on the commitment width; +∞ ⇒ that threat model is out of scope (no `anchorCommitmentBits`) */
  chosenCollisionLog2: number
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
  /** independently-anchored replicas (3FS/CRAQ chain replication) — multiplies `checks` under strong consistency */
  replicas?: number
  /** CRAQ strong consistency: no stale-read window, so all replicas' checks count (deepseek inhale) */
  strongConsistency?: boolean
  /** machine-checked conservation invariants the audit runs (DeepSeek-Prover inhale) — ADDS gates per replica */
  invariants?: number
  /**
   * Width (bits) the external commitment (Merkle leaf / anchor) binds. Presence
   * models the chosen-content collision path (birthday = bits/2): set to
   * CONTENT_DIGEST_BITS (256) when the leaf commits the FULL content digest;
   * the bare 106-bit uuid yields a 2^53 floor. Absent ⇒ post-hoc threat only.
   */
  anchorCommitmentBits?: number
}): CrackVerdict {
  const digestBits = opts.digestBits ?? ERPAX_DIGEST_BITS
  const rows = opts.rows ?? 1
  const anchored = opts.anchored ?? true
  const anchorStrengthBits = opts.anchorStrengthBits ?? 112 // RFC 3161 RSA-2048 TSA floor
  // Coverage layer: 0 when not modelled; +∞ at coverage=1 (all wired in uuid).
  // Two inhaled amplifiers enlarge the independent-check count a coherent tamper
  // must evade: machine-checked invariants ADD semantic gates (DeepSeek-Prover),
  // then 3FS/CRAQ replication MULTIPLIES the per-replica set ×R (real only under
  // strong consistency — no stale-read window). Both feed the one coverage law.
  const withInvariants = invariantChecks(opts.checks ?? 1, opts.invariants ?? 0)
  const effectiveChecks = replicationChecks(withInvariants, opts.replicas ?? 1, opts.strongConsistency ?? false)
  const coverageCost = opts.coverage === undefined ? 0 : coverageCostLog2(opts.coverage, effectiveChecks)

  const sp = secondPreimageLog2(digestBits)
  // Chosen-content collision: in scope only when the commitment width is given
  // (the attacker authors content before it is committed). Birthday on that
  // width — 2^53 for the bare 106-bit uuid, 2^128 for the full 256-bit digest.
  const chosenCollisionLog2 =
    opts.anchorCommitmentBits === undefined
      ? Number.POSITIVE_INFINITY
      : birthdayLog2(opts.anchorCommitmentBits)
  if (!anchored) {
    // No external entropy: a deterministic store is rewritable for free — the
    // cascade is cheap when you control every row. Tamper-evidence collapses.
    return {
      crackCostLog2: 0,
      binding: 'free-rewrite',
      secondPreimageLog2: sp,
      chosenCollisionLog2,
      birthdayMarginBits: birthdayMarginBits(digestBits, rows),
      bruteYearsLog2: Number.NEGATIVE_INFINITY,
      tamperEvident: false,
      note: 'Un-anchored: a writer recomputes the whole deterministic store for free. The external anchor is mandatory.',
    }
  }
  // Anchored: must beat the cheapest of (post-hoc second-preimage) /
  // (chosen-content collision on the commitment) / (forge the anchor), PLUS evade
  // every wired uuid check (the coverage layer — ∞ at 100% coverage).
  const candidates: ReadonlyArray<readonly [number, 'collision' | 'second-preimage' | 'anchor']> = [
    [chosenCollisionLog2, 'collision'],
    [sp, 'second-preimage'],
    [anchorStrengthBits, 'anchor'],
  ]
  // Stable argmin: ties keep earlier (collision ≺ second-preimage ≺ anchor).
  const [perRecord, binding] = candidates.reduce((lo, c) => (c[0] < lo[0] ? c : lo))
  const crackCostLog2 = perRecord + coverageCost
  return {
    crackCostLog2,
    binding,
    secondPreimageLog2: sp,
    chosenCollisionLog2,
    birthdayMarginBits: birthdayMarginBits(digestBits, rows),
    bruteYearsLog2: bruteYearsLog2(crackCostLog2, BITCOIN_HASHRATE_LOG2),
    tamperEvident: true,
    note:
      coverageCost === Number.POSITIVE_INFINITY
        ? '100% coverage by architecture (all wired in uuid) — no undetected tamper exists; cost is unbounded.'
        : binding === 'collision'
          ? `Chosen-content collision on the ${opts.anchorCommitmentBits}-bit commitment (~2^${perRecord}) is the floor — commit the full ${CONTENT_DIGEST_BITS}-bit content digest, not the ${digestBits}-bit uuid.`
          : binding === 'anchor'
            ? `Anchor (${anchorStrengthBits}-bit) is weaker than the ${digestBits}-bit digest — widen it or strengthen the anchor.`
            : `Bound by the ${digestBits}-bit digest second-preimage; the all-directions wiring makes any local tamper a global rewrite, closed by the anchor.`,
  }
}
