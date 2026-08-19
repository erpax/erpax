import { describe, it, expect } from 'vitest'
import { MONEY_TRADING_APIS } from './index'

describe('trading/api/money — registry slice', () => {
  it('is a non-empty array of well-formed entries', () => {
    expect(MONEY_TRADING_APIS.length).toBeGreaterThan(0)
    for (const a of MONEY_TRADING_APIS) {
      expect(typeof a.provider).toBe('string')
      expect(typeof a.category).toBe('string')
      expect(typeof a.region).toBe('string')
    }
  })

})
