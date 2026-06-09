import { describe, expect, it } from 'vitest'

import { accountableBalances, accountedFor, consolidate, isBalanced, reverse } from '@/entry'
import {
  conversionConserves,
  fxGainLossEntry,
  harvestEntry,
  nutrientApplicationEntry,
  nutrientRemovalEntry,
  shareDeliveryEntry,
  sharePrepayEntry,
  shareSeasonFlows,
} from './accountable'

describe('agriculture/accountable — agriculture events as balanced double-entries', () => {
  it('harvest (IAS-41 §13): asset → inventory, balanced; the asset is credited, inventory debited', () => {
    const e = harvestEntry({ crop: 'tomatoes', fairValueLessCosts: 280 })
    expect(isBalanced(e)).toBe(true)
    const bal = accountableBalances(e)
    expect(bal['inventory:tomatoes']).toBe(280) // debit position (taken on)
    expect(bal['biological-asset:tomatoes']).toBe(-280) // credit position (given up)
  })

  it('share: prepay and each delivery are balanced entries', () => {
    expect(isBalanced(sharePrepayEntry({ member: 'm', amount: 600 }))).toBe(true)
    expect(isBalanced(shareDeliveryEntry({ member: 'm', perBoxValue: 30 }))).toBe(true)
  })

  it('share season NETS TO ZERO when fully delivered — the obligation discharged (accountedFor)', () => {
    const flows = shareSeasonFlows({ member: 'm', seasonPrice: 600, boxes: 20 })
    expect(flows).toHaveLength(21) // 1 prepay + 20 deliveries
    expect(accountedFor(flows)).toBe(true)
    const book = consolidate(flows.map((f) => ({ lines: [{ accountable: f.payer, debit: 0, credit: f.amount }, { accountable: f.payee, debit: f.amount, credit: 0 }] })))
    const bal = accountableBalances(book)
    expect(bal['m']).toBe(0) // member fully discharged
    expect(bal['farm']).toBe(0) // farm obligation satisfied
  })

  it('share season is OUT of balance mid-season (only partially delivered)', () => {
    const partial = shareSeasonFlows({ member: 'm', seasonPrice: 600, boxes: 20 }).slice(0, 11) // prepay + 10 boxes
    const book = consolidate(
      partial.map((f) => ({ lines: [{ accountable: f.payer, debit: 0, credit: f.amount }, { accountable: f.payee, debit: f.amount, credit: 0 }] })),
    )
    const bal = accountableBalances(book)
    expect(bal['m']).toBeLessThan(0) // member still owed produce (prepaid more than received)
    expect(bal['farm']).toBeGreaterThan(0) // farm still owes the rest of the season
  })

  it('fertility: removal and application balance; the soil net = applications − removals', () => {
    const removal = nutrientRemovalEntry({ crop: 'corn', nutrient: 'N', quantity: 180 })
    const application = nutrientApplicationEntry({ source: 'compost', nutrient: 'N', quantity: 200 })
    expect(isBalanced(removal)).toBe(true)
    expect(isBalanced(application)).toBe(true)
    const soil = accountableBalances(consolidate([removal, application]))['soil:N']
    expect(soil).toBe(20) // applied 200, removed 180 ⇒ +20 net into the soil budget (not depleting)
  })

  it('conversion: a moved rate books a balanced FX gain (or loss), by sign', () => {
    const gain = fxGainLossEntry({ entity: 'farm', amountForeign: 1000, bookedRate: 1.9, settleRate: 1.96 })
    expect(isBalanced(gain)).toBe(true)
    expect(accountableBalances(gain)['farm']).toBeCloseTo(60) // gained 1000×0.06 (debit/value up)
    const loss = fxGainLossEntry({ entity: 'farm', amountForeign: 1000, bookedRate: 1.96, settleRate: 1.9 })
    expect(accountableBalances(loss)['farm']).toBeCloseTo(-60) // lost (credit/value down)
  })

  it('conversion: unit conversion conserves (no posting); currency conserves only if the rate held', () => {
    expect(conversionConserves('unit')).toBe(true)
    expect(conversionConserves('unit', true)).toBe(true)
    expect(conversionConserves('currency', false)).toBe(true)
    expect(conversionConserves('currency', true)).toBe(false) // a moved rate must post (fxGainLossEntry)
  })

  it('reverse is the dual of do — reverse∘reverse = id (the undo is free)', () => {
    const e = harvestEntry({ crop: 'kale', fairValueLessCosts: 42 })
    expect(reverse(reverse(e))).toEqual(e)
    expect(isBalanced(reverse(e))).toBe(true)
  })
})
