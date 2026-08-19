import { algebraLog2, exactMax, exactMin } from '@/algebra'
/**
 * cost/bits — THE COST OF ATTACK, computed. The `entropy` cost-kind: the price
 * of an undetected tamper/forgery against a content-addressed, all-directions-wired
 * store. Digest widths (derived, because the typed 106 was wrong), the harmonic
 * security floors (D · D/2 · D/3), coverage/replication/invariant amplifiers, and
 * the gate-check count — the bits a forger must pay. Pure functions over bit counts.
 *
 * Extracted from the cost hub ([[rules]]/concentration) so the parent index.ts
 * re-exports only; `bits.test.ts` (the tool that found the typed-106 defect, kept
 * as the proof) is this atom's proof leg. Consumers still name `@/cost`.
 *
 * @standard NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2
 * @standard RFC 9562 §8 — UUID security considerations
 * @standard CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication
 * @standard DeepSeek-Prover-V2 — recursive, kernel-checked invariants
 * @audit Conservation Law 62 (coverage) — the all-directions cascade
 * @see ./test.ts (the measured proof) · ../SKILL.md · ../../tamper/cost
 */

/** A uuid is 16 bytes. RFC 9562 §5.8 · §4.1 stamp two fields that carry NO content. */
const UUID_BITS = 128
/** §5.8 — the version nibble, high 4 bits of byte 6: `b[6] = (b[6] & 0x0f) | 0x80`. */
const UUID_VERSION_BITS = 4
/** §4.1 — the variant, high 2 bits of byte 8: `b[8] = (b[8] & 0x3f) | 0x80`. */
const UUID_VARIANT_BITS = 2

/**
 * erpax v8 content-digest width — DERIVED, because it was typed and it was wrong.
 *
 * It read `106`, with its own arithmetic in the comment: *"uuid-format: 48 + 12 + 46 bits of SHA-256"*.
 * The sum is self-consistent, which is why it survived — but v8's layout is 48 + 4 (version) + 12 + 2
 * (variant) + **62**, not 46. Someone typed one field 16 bits short, and the number became a security
 * constant for four consumers ([[tamper]]/cost · [[power]] · [[proof]]/projection) and the premise of the
 * sentence "the truncated uuid's collision floor is only 2^53".
 *
 * The honest floor is **2^61**. The error was CONSERVATIVE — it under-claimed erpax's own integrity — which
 * is exactly why nothing contradicted it: a pessimistic lie still prescribes the right fix (anchor the FULL
 * digest, `CONTENT_DIGEST_BITS`), so it led somewhere sensible while being false.
 *
 * Now it is the arithmetic itself, and `test.ts` proves it against the live primitive by MEASURING which
 * bits are constant across 20k samples — the tool that found the defect, kept as the proof that it stays
 * fixed. A number you cannot re-derive is a number you cannot trust.
 *
 * @invariant ERPAX_DIGEST_BITS === the count of non-constant bits in a real content-uuid (122)
 * @standard RFC 9562 §5.8 (uuidv8) · §4.1 (variant)
 */
export const ERPAX_DIGEST_BITS = UUID_BITS - UUID_VERSION_BITS - UUID_VARIANT_BITS

/**
 * Full SHA-256 content-digest width — what an anchor / Merkle leaf SHOULD commit.
 * Committing the full digest puts the chosen-content collision floor at 2^128, above the 2^122 uuid
 * second-preimage; committing only the truncated uuid → 2^61 (was stated as 2^53 on the typed 106).
 * The prescription was right on the wrong number: truncation costs erpax 134 bits so the fold's address
 * can LOOK like a UUID.
 */
export const CONTENT_DIGEST_BITS = 256

/** log2 of the whole Bitcoin network's hashrate (~7×10^20 H/s). */
export const BITCOIN_HASHRATE_LOG2 = algebraLog2(7e20)

/** log2 of seconds in a Julian year. */
export const LOG2_SECONDS_PER_YEAR = algebraLog2(365.25 * 24 * 3600)

/** Second-preimage resistance of an n-bit digest ≈ 2^n operations (log2 = n). */
export const secondPreimageLog2 = (digestBits: number): number => digestBits

/** Birthday-collision resistance ≈ 2^(n/2) operations (log2 = n/2). */
export const birthdayLog2 = (digestBits: number): number => digestBits / 2

/**
 * Headroom (bits) between an n-bit space's birthday bound and a row count.
 * Positive ⇒ safe; ≤ 0 ⇒ at/past the birthday bound. Per content namespace.
 */
export const birthdayMarginBits = (digestBits: number, rows: number): number =>
  birthdayLog2(digestBits) - algebraLog2(exactMax(rows, 1))

/** log2 of years for a hashrate (log2 H/s) to perform 2^workLog2 operations. */
export const bruteYearsLog2 = (workLog2: number, hashrateLog2: number): number =>
  workLog2 - hashrateLog2 - LOG2_SECONDS_PER_YEAR

// THE FLOORS ARE HARMONIC ([[harmony]]). A digest of D bits has not one security
// floor but the first three HARMONICS of D — D · D/2 · D/3:
//   D    (1st, fundamental)  classical second-preimage — forge a matching content.
//   D/2  (2nd, the octave)   classical BIRTHDAY collision = quantum (Grover) second-
//                            preimage. Two threats MEET at the octave ([[merge]]).
//   D/3  (3rd)               quantum (BHT) collision — the LOWEST floor, what a
//                            quantum ([[quantum]]) adversary with quantum memory pays.
// "Balanced floors" = the series complete to its third harmonic; the binding floor
// is the LOWEST present in the threat model. The quantum cross also breaks an
// RSA/ECC anchor (Shor → ~0), so a hash-based post-quantum anchor is required to
// keep even the D/2 (Grover) floor. HONEST: BHT's D/3 needs 2^(D/3) quantum memory;
// a memory-bound quantum collision is ≈ D/2 — D/3 is the conservative theoretical floor.

/** Quantum (Grover) second-preimage ≈ 2^(n/2) — the 2nd harmonic (numerically the birthday collision; a distinct threat at the same octave). */
export const groverPreimageLog2 = (digestBits: number): number => digestBits / 2

/** Quantum (BHT) collision ≈ 2^(n/3) — the 3rd harmonic, the lowest floor under a quantum adversary with quantum memory. */
export const bhtCollisionLog2 = (digestBits: number): number => digestBits / 3

/** The binding floor under a quantum adversary committing `commitmentBits`: the BHT collision (the 3rd harmonic, the lowest). */
export const quantumFloorLog2 = (commitmentBits: number): number => bhtCollisionLog2(commitmentBits)

/** The harmonic floor series of a digest — [D (preimage), D/2 (collision/Grover), D/3 (BHT)], descending. */
export const harmonicFloors = (digestBits: number): [number, number, number] => [
  secondPreimageLog2(digestBits),
  birthdayLog2(digestBits),
  bhtCollisionLog2(digestBits),
]

/** P(undetected tamper) ≈ (1 − coverage)^checks. → 0 as coverage → 1. */
export const tamperEvasionProbability = (coverage: number, checks: number): number =>
  exactMax(0, 1 - coverage) ** checks

/**
 * Work (log2 ops) to evade detection at a coverage across `checks` independent
 * uuid checks: −checks·log2(1−coverage). Grows without bound as coverage → 1 —
 * 100% coverage by architecture ⇒ ∞. (The coverage=1 / max-tamper-cost law.)
 */
export const coverageCostLog2 = (coverage: number, checks: number): number =>
  coverage >= 1 ? Number.POSITIVE_INFINITY : -checks * algebraLog2(1 - exactMin(coverage, 1))

/**
 * 3FS/CRAQ replication amplifier: under strong consistency, every replica's
 * coverage check must be evaded simultaneously, so the independent-check count
 * is multiplied by R. Eventual consistency leaves a stale-read window → ×1.
 *
 * @standard CRAQ — Terrace & Freedman, USENIX ATC 2009
 */
export const replicationChecks = (checks: number, replicas: number, strongConsistency: boolean): number =>
  strongConsistency ? checks * exactMax(replicas, 1) : checks

/**
 * Machine-checked-invariant amplifier: each conservation invariant the audit
 * ACTUALLY runs is one more independent semantic gate a forger must satisfy —
 * gates ADD (a distinct set) where replicas MULTIPLY (copies of the set).
 *
 * @standard DeepSeek-Prover-V2 (recursive subgoal decomposition; Lean 4 kernel-checked)
 */
export const invariantChecks = (checks: number, invariants: number): number =>
  checks + exactMax(invariants, 0)

/**
 * Independent gate axes unsealed manual work must evade to persist (uuid-pure stack).
 *
 * It read **8**. The gate ran **6**, then **7** once `standards` was added — it was never 8, and it prices
 * a forge, so the error was a wrong security claim. The law lives where the gate is
 * (`[[confirm]]/matter` → `CONFIRM_CHECK_AXES`), whose `.length` is not a number anyone types; this MIRRORS
 * it rather than importing it, because the import would add an edge to the 225-file tangle ([[rules]]/cycle).
 *
 * **And the mirror drifted anyway.** It read 7 while the axes were 9 — `grounded` and `outside` were added
 * and nothing said so. The docstring claimed a pin in `src/cost/bits/test.ts`; that file had no such
 * assertion, so the claim of being pinned was itself the unrefuted statement. This is the exact shape it
 * names one line above — `ERPAX_DIGEST_BITS = 106` survived because nothing contradicted it — repeated by
 * the note warning about it.
 *
 * The pin is now REAL: `src/cost/bits/test.ts` imports both and asserts equality, so the next axis added
 * fails the suite instead of silently re-pricing a forge.
 *
 * @invariant CONFIRM_GATE_CHECKS === CONFIRM_CHECK_AXES.length — asserted in src/cost/bits/test.ts
 */
export const CONFIRM_GATE_CHECKS = 9
