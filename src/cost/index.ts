/**
 * cost — one efficiency law for every cost in the society. efficiency = output / cost, where the
 * cost may be of any kind (ai/money/energy/time/labor/entropy) and output is productivity (committed,
 * repeatable work) + creativity (novel, compounding output). Pure functions over a ledger.
 *
 * Every cost is ALSO accounted for: `costEntry` posts a cost as a balanced double-entry (the resource
 * is credited/given, the output debited/taken), so cost flows through the ledger like any value —
 * "all accounted in all directions" (services/entry). A cost that is not a posting is not accounted.
 *
 * @standard ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)
 * @see ../competition (selects the most efficient) · ../decompression (pay = verified work) · ../entry (account for it) · ./SKILL.md
 */
import { toDoubleEntry, type Entry } from '@/entry'

/** Any cost the society spends — one law applies to all. */
export type CostKind = 'ai' | 'money' | 'energy' | 'time' | 'labor' | 'entropy'

export interface Output {
  /** productivity — verified, committed, repeatable work/value (gate-green commits, goods, postings). */
  readonly productivity: number
  /** creativity — NOVEL output (a new atom/skill/solution); it compounds, because it is reused forever. */
  readonly creativity: number
}

export interface Ledger {
  readonly kind: CostKind
  readonly output: Output
  /** total resource spent, in the cost kind's own units (tokens, currency, joules, seconds…). */
  readonly cost: number
}

/** Total valued output = productivity + creativity (both count; creativity is the compounding part). */
export function totalOutput(o: Output): number {
  return o.productivity + o.creativity
}

/** Efficiency = output / cost — the SAME law for every cost kind. Zero cost ⇒ zero. */
export function efficiency(l: Ledger): number {
  return l.cost <= 0 ? 0 : totalOutput(l.output) / l.cost
}

/** Is a more efficient than b? — more output per unit cost. What competition selects, in any currency. */
export function moreEfficient(a: Ledger, b: Ledger): boolean {
  return efficiency(a) > efficiency(b)
}

/**
 * The wasted fraction of a cost — spend that produced no output (exploration, re-work, destruction).
 * `productiveCost` is the part attributable to landed output; the rest is waste. Drive → 0 for every kind.
 */
export function wasteFraction(totalCost: number, productiveCost: number): number {
  if (totalCost <= 0) return 0
  return Math.max(0, totalCost - productiveCost) / totalCost
}

/**
 * Account for a cost as a balanced double-entry: the resource (by kind) is CREDITED (given up), the
 * output is DEBITED (it received the value). So every cost is a posting — accountable in all
 * directions like any value (services/entry). The resource line is `resource:<kind>`.
 */
export function costEntry(l: Ledger): Entry {
  return toDoubleEntry({ payer: `resource:${l.kind}`, payee: 'output', amount: l.cost })
}

// ─────────────────────────────────────────────────────────────────────────────
// THE COST OF ATTACK — the `entropy` cost-kind, computed. The cost of an
// undetected tamper/forgery against a content-addressed, all-directions-wired
// store. General by gravity: composed by ../balance (prices disbalance),
// ../analytics, ../anchor, ../power, ../proof/projection, and ../tamper/cost
// (the tamper-specific verdict). It lives HERE, at the cost atom, because it is
// the price of borrowing entropy — one more cost the society spends.
//
// @standard NIST SP 800-107r1 §5.1 — 2nd-preimage ≈ L bits, collision ≈ L/2
// @standard RFC 9562 §8 — UUID security considerations
// @standard CRAQ (Terrace & Freedman, USENIX ATC 2009) — strong-consistency chain replication
// @standard DeepSeek-Prover-V2 — recursive, kernel-checked invariants
// @audit Conservation Law 62 (coverage) — the all-directions cascade
// ─────────────────────────────────────────────────────────────────────────────

/** erpax v8 content-digest width (uuid-format: 48 + 12 + 46 bits of SHA-256). */
export const ERPAX_DIGEST_BITS = 106

/**
 * Full SHA-256 content-digest width — what an anchor / Merkle leaf SHOULD commit.
 * Committing the full digest puts the chosen-content collision floor at 2^128,
 * above the 2^106 uuid second-preimage; committing only the 106-bit uuid → 2^53.
 */
export const CONTENT_DIGEST_BITS = 256

/** log2 of the whole Bitcoin network's hashrate (~7×10^20 H/s). */
export const BITCOIN_HASHRATE_LOG2 = Math.log2(7e20)

/** log2 of seconds in a Julian year. */
export const LOG2_SECONDS_PER_YEAR = Math.log2(365.25 * 24 * 3600)

/** Second-preimage resistance of an n-bit digest ≈ 2^n operations (log2 = n). */
export const secondPreimageLog2 = (digestBits: number): number => digestBits

/** Birthday-collision resistance ≈ 2^(n/2) operations (log2 = n/2). */
export const birthdayLog2 = (digestBits: number): number => digestBits / 2

/**
 * Headroom (bits) between an n-bit space's birthday bound and a row count.
 * Positive ⇒ safe; ≤ 0 ⇒ at/past the birthday bound. Per content namespace.
 */
export const birthdayMarginBits = (digestBits: number, rows: number): number =>
  birthdayLog2(digestBits) - Math.log2(Math.max(rows, 1))

/** log2 of years for a hashrate (log2 H/s) to perform 2^workLog2 operations. */
export const bruteYearsLog2 = (workLog2: number, hashrateLog2: number): number =>
  workLog2 - hashrateLog2 - LOG2_SECONDS_PER_YEAR

/** P(undetected tamper) ≈ (1 − coverage)^checks. → 0 as coverage → 1. */
export const tamperEvasionProbability = (coverage: number, checks: number): number =>
  Math.max(0, 1 - coverage) ** checks

/**
 * Work (log2 ops) to evade detection at a coverage across `checks` independent
 * uuid checks: −checks·log2(1−coverage). Grows without bound as coverage → 1 —
 * 100% coverage by architecture ⇒ ∞. (The coverage=1 / max-tamper-cost law.)
 */
export const coverageCostLog2 = (coverage: number, checks: number): number =>
  coverage >= 1 ? Number.POSITIVE_INFINITY : -checks * Math.log2(1 - Math.min(coverage, 1))

/**
 * 3FS/CRAQ replication amplifier: under strong consistency, every replica's
 * coverage check must be evaded simultaneously, so the independent-check count
 * is multiplied by R. Eventual consistency leaves a stale-read window → ×1.
 *
 * @standard CRAQ — Terrace & Freedman, USENIX ATC 2009
 */
export const replicationChecks = (checks: number, replicas: number, strongConsistency: boolean): number =>
  strongConsistency ? checks * Math.max(replicas, 1) : checks

/**
 * Machine-checked-invariant amplifier: each conservation invariant the audit
 * ACTUALLY runs is one more independent semantic gate a forger must satisfy —
 * gates ADD (a distinct set) where replicas MULTIPLY (copies of the set).
 *
 * @standard DeepSeek-Prover-V2 (recursive subgoal decomposition; Lean 4 kernel-checked)
 */
export const invariantChecks = (checks: number, invariants: number): number =>
  checks + Math.max(invariants, 0)
