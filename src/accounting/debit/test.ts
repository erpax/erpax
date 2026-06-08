import { describe, it, expect } from 'vitest'
import { DebitCreditLogic } from './index'

describe('accounting/debit — double-entry invariants', () => {
  it('validateEntry accepts balanced lines', () => {
    const entry = DebitCreditLogic.validateEntry([
      { accountCode: '1000', accountType: 'asset', debit: 100, credit: 0 },
      { accountCode: '4000', accountType: 'income', debit: 0, credit: 100 },
    ])
    expect(entry.balanced).toBe(true)
    expect(entry.variance).toBe(0)
  })
})
