/**
 * cost — one efficiency law for every cost in the society. efficiency = output / cost, where the
 * cost may be of any kind (ai/money/energy/time/labor/entropy) and output is productivity (committed,
 * repeatable work) + creativity (novel, compounding output). Pure functions over a ledger.
 *
 * @standard ISO/IEC 25010:2023 §5.3 resource-utilisation (output per resource spent)
 * @see ../competition (selects the most efficient) · ../decompression (pay = verified work) · ./SKILL.md
 */

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
