/**
 * agriculture/accountable — the agriculture domain's value & substance movements as
 * balanced double-entries over the universal [[entry]] engine. [[accounting]] is the
 * agnostic substrate ("all is accountable, in all directions"): every agriculture event
 * the atoms describe reduces to a balanced `Entry` whose `accountable` lines point OUT
 * at the entities (the crop, the soil, the member, the farm) — never in.
 *
 * The matter for the antimatter the agriculture atoms assert:
 *   - harvest   : the biological asset transfers its carrying value to inventory (IAS-41 §13)
 *   - share     : the member prepays the farm (a contract liability), then each delivered box
 *                 discharges a slice — prepay ⊕ N deliveries NET TO ZERO when the season's
 *                 obligation is fully satisfied (the entry-completeness law, IFRS 15)
 *   - fertility : the soil nutrient budget — removal flows soil→crop (debits the soil),
 *                 application flows source→soil (credits it); net = applications − removals
 *   - convert   : a currency conversion at a moved rate books an FX gain/loss (IAS-21);
 *                 a unit conversion CONSERVES substance (no posting) — the dual
 *
 * Pure; composes @/entry (`toDoubleEntry`). No collection/schema — the postings ride the
 * existing `journal/entries` ledger. `accountable.test.ts` proves every builder balances.
 *
 * @standard IFRS IAS-41 §13 — harvest: biological asset → inventory at fair-value-less-costs-to-sell
 * @standard IFRS 15 — revenue recognized as the performance obligation is satisfied (prepay → delivered)
 * @standard IFRS IAS-21 — foreign-exchange differences recognized in P&L on settlement/re-measurement
 * @standard IFRS/IAS double-entry — every movement is a balanced pair, Σ(credit − debit) = 0
 */
import { type Entry, type Flow, toDoubleEntry } from '@/entry'

/** harvest (IAS-41 §13): de-recognize the biological asset, recognize inventory at fair-value-less-costs-to-sell. */
export function harvestEntry(input: { crop: string; fairValueLessCosts: number }): Entry {
  // the asset (payer→credit) gives up its carrying value; inventory (payee→debit) takes it on.
  return toDoubleEntry({
    payer: `biological-asset:${input.crop}`,
    payee: `inventory:${input.crop}`,
    amount: input.fairValueLessCosts,
  })
}

/** share — prepay at season start: the member funds the farm (IFRS 15 contract liability). */
export function sharePrepayEntry(input: { member: string; farm?: string; amount: number }): Entry {
  return toDoubleEntry({ payer: input.member, payee: input.farm ?? 'farm', amount: input.amount })
}

/** share — deliver one box: the farm discharges a slice of the obligation back to the member. */
export function shareDeliveryEntry(input: { member: string; farm?: string; perBoxValue: number }): Entry {
  return toDoubleEntry({ payer: input.farm ?? 'farm', payee: input.member, amount: input.perBoxValue })
}

/**
 * The full flow-set of a CSA share season: the prepay plus one delivery per box. When the
 * season is fully delivered these NET TO ZERO — the member's prepayment exactly discharged
 * by the produce delivered (the entry-completeness law: `accountedFor` ⇒ true).
 */
export function shareSeasonFlows(input: { member: string; farm?: string; seasonPrice: number; boxes: number }): Flow[] {
  if (input.boxes <= 0) throw new Error('boxes must be > 0')
  const farm = input.farm ?? 'farm'
  const per = input.seasonPrice / input.boxes
  const flows: Flow[] = [{ payer: input.member, payee: farm, amount: input.seasonPrice }]
  for (let i = 0; i < input.boxes; i++) flows.push({ payer: farm, payee: input.member, amount: per })
  return flows
}

/** fertility — crop removal: the harvested crop draws nutrient from the soil's budget (debits the soil). */
export function nutrientRemovalEntry(input: { crop: string; nutrient: string; quantity: number }): Entry {
  return toDoubleEntry({ payer: `soil:${input.nutrient}`, payee: `crop:${input.crop}`, amount: input.quantity })
}

/** fertility — application: compost / fertilizer / legume-fixation credits the soil's nutrient budget. */
export function nutrientApplicationEntry(input: { source: string; nutrient: string; quantity: number }): Entry {
  return toDoubleEntry({ payer: input.source, payee: `soil:${input.nutrient}`, amount: input.quantity })
}

/**
 * conversion — a currency conversion at a moved rate books an FX gain/loss to keep the ledger
 * balanced (IAS-21). delta = foreign amount × (settle − booked) functional units: ≥0 is a gain
 * (the entity gains value), <0 a loss.
 */
export function fxGainLossEntry(input: {
  entity: string
  amountForeign: number
  bookedRate: number
  settleRate: number
}): Entry {
  const delta = input.amountForeign * (input.settleRate - input.bookedRate)
  return delta >= 0
    ? toDoubleEntry({ payer: 'fx-gain-loss', payee: input.entity, amount: delta })
    : toDoubleEntry({ payer: input.entity, payee: 'fx-gain-loss', amount: -delta })
}

/**
 * Does this conversion CONSERVE (balance-neutral, no posting) rather than book a gain/loss?
 * A unit conversion always conserves (the same physical quantity, two labels); a currency
 * conversion conserves only when the rate did not move. The dual of `fxGainLossEntry`.
 */
export function conversionConserves(kind: 'unit' | 'currency', rateMoved = false): boolean {
  return kind === 'unit' || !rateMoved
}
