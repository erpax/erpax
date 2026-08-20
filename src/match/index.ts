/**
 * match — supply ⟷ demand, scored. Vectorize PROPOSES; the constraints DISPOSE.
 *
 * A commerce document seeking its counterparty (`schema:Offer` looking for a
 * `schema:Demand`, and the reverse) is two questions, and only one of them is
 * semantic. Similarity finds *plausible* counterparties in a corpus of millions —
 * it cannot tell you that the GTINs differ, the quantity is out of range, the price
 * is below floor, or the seller does not ship to the buyer's country. Ranking on
 * cosine distance alone produces confident nonsense.
 *
 * So the fold here is the corpus's own law — proven by shape, decided by meaning
 * ([[rules]]/collapse): the vector narrows an unbounded space to K candidates, then
 * PURE, checkable predicates decide. Every rejection names its reason, so a match is
 * an argument a human can read, not a score nobody can question.
 *
 *   embeddableText(e)  → what gets indexed in VECTORIZE_DOCS (the semantic half)
 *   matchFilter(e)     → the metadata filter that never leaves the lane (kind, area)
 *   scoreMatch(a, b)   → the verdict: viable? why not? how well?
 *   rankMatches(seed,) → candidates ordered by (constraints ∧ similarity)
 *
 * PURE — no network, no bindings, no clock. The Vectorize call sites live in
 * [[ai]]/embed-document + [[ai]]/semantic-search, which this atom feeds and reads.
 *
 * @standard schema.org Offer / Demand / PriceSpecification / QuantitativeValue
 * @standard GS1 GTIN — product identity when both sides declare it
 * @see ./SKILL.md · ../ai/semantic-search · ../commerce
 */
import { algebraSqrt, exactMax, exactMin } from '@/algebra'

/** The two poles of trade — one shape, opposite polarity ([[party]]/perspective). */
export type TradeSide = 'offer' | 'demand'

/** A tradable position, schema.org-shaped, from a corpus document OR a harvested page. */
export interface TradePosition {
  readonly side: TradeSide
  /** schema:name — free text, the semantic payload. */
  readonly name: string
  readonly description?: string
  /** GS1 GTIN / SKU / MPN — hard identity when present on both sides. */
  readonly gtin?: string
  readonly sku?: string
  /** schema:category — coarse lane. */
  readonly category?: string
  /** Unit price in minor units, with its ISO-4217 currency. */
  readonly priceMinor?: number
  readonly currency?: string
  /** schema:eligibleQuantity — the range this position can transact. */
  readonly minQuantity?: number
  readonly maxQuantity?: number
  /** ISO-3166 alpha-2 codes this position serves / needs delivery in. */
  readonly areaServed?: readonly string[]
  /** Where it came from — a corpus uuid or a harvested URL. Never used in scoring. */
  readonly source?: string
}

/** Why a candidate was rejected, or the dimension it matched on. */
export type MatchReasonKind =
  | 'same-side'
  | 'gtin-mismatch'
  | 'gtin-match'
  | 'category-mismatch'
  | 'quantity-disjoint'
  | 'quantity-overlap'
  | 'currency-mismatch'
  | 'price-below-floor'
  | 'price-within-band'
  | 'area-disjoint'
  | 'area-overlap'

export interface MatchReason {
  readonly kind: MatchReasonKind
  readonly fatal: boolean
  readonly detail: string
}

export interface MatchVerdict {
  /** No fatal reason — the two CAN transact. */
  readonly viable: boolean
  /** 0..1 over the dimensions both sides actually declared; 0 when not viable. */
  readonly score: number
  readonly reasons: readonly MatchReason[]
}

const reason = (kind: MatchReasonKind, fatal: boolean, detail: string): MatchReason => ({ kind, fatal, detail })

/** Normalised identity — GTINs compare digits-only; a SKU compares case-insensitively. */
const normId = (s: string | undefined): string | undefined =>
  s === undefined ? undefined : s.replace(/[\s-]/g, '').toUpperCase() || undefined

/**
 * The text a position is INDEXED by — name, description, category, identity.
 * Deterministic, so re-embedding an unchanged position yields the same vector and
 * the same content-address ([[identity]]); the id/price/qty are NOT in the text
 * (they are filters and constraints, not meaning).
 */
export function embeddableText(p: TradePosition): string {
  return [p.name, p.description, p.category, p.gtin, p.sku]
    .map((s) => (s ?? '').trim())
    .filter(Boolean)
    .join(' · ')
}

/**
 * The Vectorize metadata filter for a seeking position: look at the OPPOSITE side,
 * and stay in the category lane when one is declared. Deliberately coarse — the
 * filter is a cheap pre-cut, not the decision; over-filtering here hides matches
 * that the constraint pass would have accepted.
 */
export function matchFilter(seeking: TradePosition): Record<string, string> {
  const wanted: TradeSide = seeking.side === 'offer' ? 'demand' : 'offer'
  return { side: wanted, ...(seeking.category ? { category: seeking.category } : {}) }
}

/** Do two inclusive ranges overlap? Missing bounds are open. */
const rangesOverlap = (
  aMin: number | undefined, aMax: number | undefined,
  bMin: number | undefined, bMax: number | undefined,
): boolean => {
  const lo = exactMax(aMin ?? Number.NEGATIVE_INFINITY, bMin ?? Number.NEGATIVE_INFINITY)
  const hi = exactMin(aMax ?? Number.POSITIVE_INFINITY, bMax ?? Number.POSITIVE_INFINITY)
  return lo <= hi
}

/**
 * Score one pair. Fatal reasons make it non-viable regardless of similarity; the
 * score is the fraction of DECLARED dimensions that agree, so a sparse position is
 * not punished for what it never claimed (and cannot score high on nothing either —
 * with no shared dimension the score is 0 and the pair is viable-but-unevidenced).
 *
 * @invariant viable === reasons.every(r => !r.fatal)
 * @invariant score === 0 whenever viable is false
 * @invariant scoreMatch(a,b) === scoreMatch(b,a) — trade is symmetric
 */
export function scoreMatch(a: TradePosition, b: TradePosition): MatchVerdict {
  const reasons: MatchReason[] = []

  if (a.side === b.side) {
    reasons.push(reason('same-side', true, `both sides are ${a.side} — a trade needs opposite poles`))
    return { viable: false, score: 0, reasons }
  }

  let agreed = 0
  let declared = 0

  // ── identity: the strongest signal when BOTH declare it ──
  const ga = normId(a.gtin) ?? normId(a.sku)
  const gb = normId(b.gtin) ?? normId(b.sku)
  if (ga && gb) {
    declared++
    if (ga === gb) {
      agreed++
      reasons.push(reason('gtin-match', false, `product identity agrees (${ga})`))
    } else {
      reasons.push(reason('gtin-mismatch', true, `product identity differs (${ga} vs ${gb})`))
    }
  }

  // ── category lane ──
  if (a.category && b.category) {
    declared++
    if (a.category.toLowerCase() === b.category.toLowerCase()) agreed++
    else reasons.push(reason('category-mismatch', false, `category differs (${a.category} vs ${b.category})`))
  }

  // ── quantity: the ranges must intersect ──
  if ((a.minQuantity ?? a.maxQuantity) !== undefined && (b.minQuantity ?? b.maxQuantity) !== undefined) {
    declared++
    if (rangesOverlap(a.minQuantity, a.maxQuantity, b.minQuantity, b.maxQuantity)) {
      agreed++
      reasons.push(reason('quantity-overlap', false, 'quantity ranges intersect'))
    } else {
      reasons.push(reason('quantity-disjoint', true, 'quantity ranges do not intersect'))
    }
  }

  // ── price: same currency, and the demand must reach the offer's floor ──
  if (a.priceMinor !== undefined && b.priceMinor !== undefined) {
    declared++
    if (a.currency && b.currency && a.currency !== b.currency) {
      reasons.push(reason('currency-mismatch', true, `currency differs (${a.currency} vs ${b.currency}) — convert before matching`))
    } else {
      const offer = a.side === 'offer' ? a : b
      const demand = a.side === 'offer' ? b : a
      if (demand.priceMinor! >= offer.priceMinor!) {
        agreed++
        reasons.push(reason('price-within-band', false, `bid ${demand.priceMinor} ≥ ask ${offer.priceMinor}`))
      } else {
        reasons.push(reason('price-below-floor', true, `bid ${demand.priceMinor} < ask ${offer.priceMinor}`))
      }
    }
  }

  // ── delivery geography ──
  if (a.areaServed?.length && b.areaServed?.length) {
    declared++
    const shared = a.areaServed.filter((c) => b.areaServed!.includes(c))
    if (shared.length > 0) {
      agreed++
      reasons.push(reason('area-overlap', false, `deliverable in ${shared.join(', ')}`))
    } else {
      reasons.push(reason('area-disjoint', true, 'no shared delivery area'))
    }
  }

  const viable = reasons.every((r) => !r.fatal)
  return { viable, score: viable && declared > 0 ? agreed / declared : 0, reasons }
}

/** A candidate as returned by the vector search, before the constraints run. */
export interface Candidate {
  readonly position: TradePosition
  /** cosine similarity from Vectorize, 0..1. */
  readonly similarity: number
}

export interface RankedMatch {
  readonly position: TradePosition
  readonly similarity: number
  readonly verdict: MatchVerdict
  /** constraints × similarity — a candidate must satisfy BOTH to rank. */
  readonly rank: number
}

/**
 * Rank vector candidates by constraints ∧ similarity. Non-viable candidates are
 * DROPPED, never merely down-weighted: a confident vector match that cannot legally
 * transact is noise, and leaving it in the list at rank 0.4 is how a matcher starts
 * proposing trades that fail at the contract.
 *
 * @invariant every returned match is viable
 * @invariant rank is non-increasing across the result
 */
export function rankMatches(seeking: TradePosition, candidates: readonly Candidate[]): readonly RankedMatch[] {
  return candidates
    .map((c) => {
      const verdict = scoreMatch(seeking, c.position)
      // The geometric mean keeps a strong-on-one/weak-on-other pair from ranking
      // above one that is good on both.
      const rank = verdict.viable ? algebraSqrt(exactMax(verdict.score, 0) * exactMax(c.similarity, 0)) : 0
      return { position: c.position, similarity: c.similarity, verdict, rank }
    })
    .filter((m) => m.verdict.viable)
    .sort((x, y) => y.rank - x.rank)
}
