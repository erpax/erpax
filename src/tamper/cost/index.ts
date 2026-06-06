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
 * The CRYPTOGRAPHIC FLOOR (real bits, NIST SP 800-107) = min(localForge,
 * chosenCollision, globalRewrite). The chosen-collision path binds only when
 * `anchorCommitmentBits` is supplied (the attacker controls pre-commit content).
 * The all-directions wiring is what makes "change one" cost "change all", so the
 * only cheap path (rewrite a *deterministic* store) is closed UNLESS the anchor
 * is absent — then a writer recomputes everything for free and tamper-evidence
 * collapses. The anchor is the single place a zero-entropy app borrows external
 * entropy; it must be at least as strong as the digest, or it is the weak link.
 *
 * The verdict's `crackCostLog2 = (that floor) + coverageCost` — the coverage
 * term is ADDED, not part of the min (see `crackVerdict`). It is a STRUCTURAL
 * amplifier (a completeness count), not measured cryptographic work; with no
 * coverage supplied it is 0 and the verdict is exactly the floor.
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

// The cost-of-attack math lives at the cost atom (the gravity well, [[cost]]);
// tamper-cost COMPOSES it — crackVerdict prices a forgery from these entropy-cost
// primitives. Moved by the gravity law (general cost → the cost atom).
import {
  ERPAX_DIGEST_BITS,
  CONTENT_DIGEST_BITS,
  BITCOIN_HASHRATE_LOG2,
  secondPreimageLog2,
  birthdayLog2,
  birthdayMarginBits,
  bruteYearsLog2,
  coverageCostLog2,
  replicationChecks,
  invariantChecks,
} from '@/cost'

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
  /** true ONLY when the cheapest forge proven-costs > 2^0; false ⇒ a writer can tamper without out-computing anything (un-anchored OR anchored to a zero/near-zero-strength anchor) */
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
  /**
   * A coverage fraction in [0,1] on SOME named axis — structural node-wiring,
   * model⊕collection balance, import purity, OR usage-accumulation — the CALLER
   * states which. crackVerdict is axis-agnostic; → ∞ only at a *measured* 1 for
   * that axis. (1 ≠ "by architecture" unless the supplied value provably IS the
   * structural-wiring fraction; a usage axis, e.g. power.coverageFromUsage, is a
   * different measure and must not be presented as structural completeness.)
   */
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
  // FAIL-CLOSED: tamper-evidence is PROVEN by a positive forge cost, never
  // assumed from the `anchored` flag. A store "anchored" to nothing (the real
  // ANCHOR_STRENGTH_BITS['none'] = 0, reachable from power/self-sufficient/
  // security-remote-access) leaves crackCostLog2 = 0 — free to forge — and MUST
  // NOT be reported tamperEvident. Anything ≤ 0 is unsafe-until-proven.
  const tamperEvident = crackCostLog2 > 0
  return {
    crackCostLog2,
    binding,
    secondPreimageLog2: sp,
    chosenCollisionLog2,
    birthdayMarginBits: birthdayMarginBits(digestBits, rows),
    bruteYearsLog2: bruteYearsLog2(crackCostLog2, BITCOIN_HASHRATE_LOG2),
    tamperEvident,
    note: !tamperEvident
      ? `NOT tamper-evident: the cheapest forge costs 2^${crackCostLog2} (${binding}). An anchor of ${anchorStrengthBits} bits pins nothing — borrow real external entropy (TSA/blockchain ≥ the ${digestBits}-bit digest) or it is a free rewrite.`
      : coverageCost === Number.POSITIVE_INFINITY
        ? '100% coverage by architecture (all wired in uuid) — no undetected tamper exists; cost is unbounded.'
        : binding === 'collision'
          ? `Chosen-content collision on the ${opts.anchorCommitmentBits}-bit commitment (~2^${perRecord}) is the floor — commit the full ${CONTENT_DIGEST_BITS}-bit content digest, not the ${digestBits}-bit uuid.`
          : binding === 'anchor'
            ? `Anchor (${anchorStrengthBits}-bit) is weaker than the ${digestBits}-bit digest — widen it or strengthen the anchor.`
            : `Bound by the ${digestBits}-bit digest second-preimage; the all-directions wiring makes any local tamper a global rewrite, closed by the anchor.`,
  }
}
