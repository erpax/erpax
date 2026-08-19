import { describe, it, expect } from 'vitest'
import { GOODS_TRADING_APIS } from './index'

describe('trading/api/goods — registry slice', () => {
  it('is a non-empty array of well-formed entries', () => {
    expect(GOODS_TRADING_APIS.length).toBeGreaterThan(0)
    for (const a of GOODS_TRADING_APIS) {
      expect(typeof a.provider).toBe('string')
      expect(typeof a.category).toBe('string')
      expect(typeof a.region).toBe('string')
    }
  })

})
