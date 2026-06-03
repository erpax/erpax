/**
 * margin — billing delivers what is needed: COST + MARGIN per line, tying the manufacturing
 * cost flow (materials + labor) to the sale price.
 *
 * "The billing itself is a source of knowledge." An invoice line that carries only its price
 * is half a fact; with its COST it answers what the sale actually earned. The cost is the
 * manufactured unit cost — MATERIALS (the BOM components × their cost) + LABOR (the work-phase:
 * rate × minutes; and an agent's labor is its token spend, anchor × tokens — see token-ledger).
 * margin = price − cost. This is the cost-price-based calculation billing was missing, and the
 * profitability knowledge the etrima factory tracked per lot (price_per_minute − cost_per_minute).
 *
 * Pure, in cents (the debit-credit convention). Compose with token-ledger (labor) + the BOM
 * (materials) for the inputs, and StandardTransactions.createCOGSEntry to POST the cost.
 *
 * @accounting IFRS IAS-2 inventories (cost) + IAS-1 (gross margin presentation)
 * @audit ISO-19011 — cost and margin are deterministic functions of materials + labor + price
 */

export interface UnitCost {
  /** materials cost per unit, cents (BOM components × their unit cost). */
  readonly materials: number
  /** labor cost per unit, cents (work-phase rate × minutes; for an agent: anchor × tokens). */
  readonly labor: number
}

/** Manufactured unit cost = materials + labor, in cents (negatives floored to 0 — every case defined). */
export function unitCost(c: UnitCost): number {
  return Math.max(0, c.materials) + Math.max(0, c.labor)
}

export interface LineMargin {
  /** price × qty (cents). */
  readonly revenue: number
  /** unitCost × qty (cents). */
  readonly cost: number
  /** revenue − cost (cents) — can be negative (a loss is knowledge too). */
  readonly grossMargin: number
  /** grossMargin / revenue, in [−∞,1]; 0 when there is no revenue. */
  readonly marginPct: number
}

/** The margin of ONE invoice line — revenue − manufactured cost, tying price to materials+labor. */
export function lineMargin(unitPrice: number, cost: UnitCost, qty: number): LineMargin {
  const q = Math.max(0, qty)
  const revenue = Math.max(0, unitPrice) * q
  const costTotal = unitCost(cost) * q
  const grossMargin = revenue - costTotal
  return { revenue, cost: costTotal, grossMargin, marginPct: revenue > 0 ? grossMargin / revenue : 0 }
}

export interface InvoiceLineInput {
  readonly unitPrice: number
  readonly cost: UnitCost
  readonly qty: number
}

/** Roll an invoice's lines into its total cost + margin — the complete profitability of the sale. */
export function invoiceMargin(lines: readonly InvoiceLineInput[]): LineMargin {
  const t = lines.reduce(
    (acc, l) => {
      const m = lineMargin(l.unitPrice, l.cost, l.qty)
      return { revenue: acc.revenue + m.revenue, cost: acc.cost + m.cost }
    },
    { revenue: 0, cost: 0 },
  )
  const grossMargin = t.revenue - t.cost
  return { revenue: t.revenue, cost: t.cost, grossMargin, marginPct: t.revenue > 0 ? grossMargin / t.revenue : 0 }
}
