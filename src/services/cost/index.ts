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
import { toDoubleEntry, type Entry } from '../entry'

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
