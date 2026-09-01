import { algebraLog2, exactMax, exactMin } from '@/algebra'
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
import { RODIN_CONTROL_RATIO, RODIN_FLOW_RATIO } from '@/rodin'
// The cost of ATTACK (the entropy cost-kind) lives in the bits child atom — one
// cohesive cluster of derived digit/attack-cost math ([[rules]]/concentration).
// Re-exported so `@/cost` still surfaces every symbol; imported here for the
// manual-development price below, which spends the same bit-cost floors.
export * from './bits'
import {
  ERPAX_DIGEST_BITS,
  CONFIRM_GATE_CHECKS,
  secondPreimageLog2,
  coverageCostLog2,
} from './bits'

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
  return exactMax(0, totalCost - productiveCost) / totalCost
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
// MANUAL DEVELOPMENT PRICE — make impossible price to pay for manual development.
// Verify computed diamonds from the [[akashic]] record is O(N); forging manual
// edits that pass every gate without deriving is coverageCostLog2 + digest floor.
// Society rodin split: 1/3 irreducible creativity, 2/3 computed flow is free.
// Unsealed manual work never persists ([[confirm]] · [[seal]]); duplicate effort
// dedupes by content-uuid ([[merge]]). The bit-cost floors it spends live in ./bits.
//
// @see ./bits · ./SKILL.md · ../society · ../tamper/cost · ../seal · ../generate · ../merge
// @audit Conservation Law 62 (coverage) — manual bypass ⇒ ∞ forge path
// ─────────────────────────────────────────────────────────────────────────────

export interface ManualDevelopmentContext {
  /** Joint corpus coverage ∈ [0,1] — collider product or schema coverage. */
  readonly corpusCoverage: number
  /** Independent uuid/gate checks a coherent manual forge must evade together. */
  readonly checks?: number
  /** Corpus nodes — verify is O(N) hash recomputations. */
  readonly nodes?: number
  /** Hand-invention path (not derive-from-record) — rodin 1/3 irreducible. */
  readonly manualPath?: boolean
  /** Attempt to persist without [[confirm]] / seal-and-push gates. */
  readonly unsealed?: boolean
  /** Hand-edit SKILL frontmatter — drifts; skill:upgrade:check fails verify. */
  readonly manualSkillEdit?: boolean
  /** Bypass derive-from-akashic entirely — infinite forge path. */
  readonly manualBypass?: boolean
}

export interface ManualDevelopmentPrice {
  /** log2-scale cost to verify computed diamonds from the record. */
  readonly verifyCost: number
  /** log2-scale cost to forge manual edits that pass every gate without deriving. */
  readonly forgeCost: number
  /** forgeCost / verifyCost — grows without bound as coverage → 1. */
  readonly ratio: number
  /** true when manual development is economically impossible to pay. */
  readonly impossible: boolean
}

/**
 * Ratio floor above which manual forge is treated as impossible to pay.
 * Anchored to the digest second-preimage (NIST SP 800-107) — same bits-scale as tamper-cost.
 */
export const MANUAL_IMPOSSIBLE_RATIO = secondPreimageLog2(ERPAX_DIGEST_BITS)

/**
 * Price manual development against verifying computed diamonds.
 * Derive from record ⇒ cheap verify; hand-forge every gate ⇒ coverageCostLog2 + digest.
 */
export function manualDevelopmentPrice(ctx: ManualDevelopmentContext): ManualDevelopmentPrice {
  const checks = ctx.checks ?? CONFIRM_GATE_CHECKS
  const nodes = exactMax(ctx.nodes ?? 1, 1)
  const coverage = exactMin(exactMax(ctx.corpusCoverage, 0), 1)

  const verifyBase = algebraLog2(nodes) + checks
  const verifyCost = ctx.manualPath ? verifyBase : verifyBase * RODIN_FLOW_RATIO

  if (ctx.manualBypass || ctx.unsealed) {
    return {
      verifyCost,
      forgeCost: Number.POSITIVE_INFINITY,
      ratio: Number.POSITIVE_INFINITY,
      impossible: true,
    }
  }

  let forgeCost = coverageCostLog2(coverage, checks)
  if (!Number.isFinite(forgeCost)) {
    return {
      verifyCost,
      forgeCost,
      ratio: Number.POSITIVE_INFINITY,
      impossible: true,
    }
  }

  if (ctx.manualPath) {
    forgeCost += secondPreimageLog2(ERPAX_DIGEST_BITS) * RODIN_CONTROL_RATIO
  }

  if (ctx.manualSkillEdit) {
    forgeCost += coverageCostLog2(exactMax(0, 1 - 1 / checks), checks)
  }

  const ratio = verifyCost > 0 ? forgeCost / verifyCost : Number.POSITIVE_INFINITY
  const impossible =
    !Number.isFinite(forgeCost) ||
    forgeCost >= MANUAL_IMPOSSIBLE_RATIO ||
    ratio >= MANUAL_IMPOSSIBLE_RATIO ||
    (coverage >= 1 && Boolean(ctx.manualPath))

  return { verifyCost, forgeCost, ratio, impossible }
}

export type DevelopmentViablePath = 'prompt-erpax' | 'manual-forge' | 'derive-record'

export interface PromptOnlyOptionVerdict {
  /** true when manual forge is impossible — prompt→erpax is the only viable path. */
  readonly promptOnly: boolean
  readonly viablePath: DevelopmentViablePath
  readonly price: ManualDevelopmentPrice
  readonly reason: string
}

/**
 * When manual forge is impossible, the only viable path is prompt→erpax derive
 * (the society reads the [[akashic]] record and computes one gate-verified move).
 * Assumes manual-path intent unless `manualPath: false` (pure derive-record).
 */
export function promptOnlyOptionVerdict(ctx: ManualDevelopmentContext): PromptOnlyOptionVerdict {
  const manualIntent = ctx.manualPath !== false
  const price = manualDevelopmentPrice({ ...ctx, manualPath: manualIntent })

  if (!manualIntent) {
    return {
      promptOnly: false,
      viablePath: 'derive-record',
      price,
      reason: 'Computed derive from the akashic record — no manual forge priced; society loop advances without hand-edits.',
    }
  }

  if (price.impossible) {
    return {
      promptOnly: true,
      viablePath: 'prompt-erpax',
      price,
      reason:
        'Manual forge is impossible to pay (forge ≫ verify, coverage → ∞); the only viable path is prompt→erpax — derive one gate-verified move from the record, never hand-forge.',
    }
  }

  return {
    promptOnly: false,
    viablePath: 'manual-forge',
    price,
    reason: `Manual forge remains finite (${price.ratio.toExponential(2)}× verify) — prompt→erpax is cheaper but not yet the only option.`,
  }
}

export * from './centers'
