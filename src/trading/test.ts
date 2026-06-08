/**
 * trading — proof the barrel re-exports the client layer.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import { guardedTradingFetch, tradingGrantFor, sanctionedOrigins } from '@/trading'

describe('trading — barrel re-exports client layer', () => {
  it('re-exports guardedTradingFetch and grant helpers from api/client', () => {
    expect(typeof guardedTradingFetch).toBe('function')
    expect(typeof tradingGrantFor).toBe('function')
    expect(typeof sanctionedOrigins).toBe('function')
    expect(sanctionedOrigins('Frankfurter', 'EU')).toContain('https://api.frankfurter.dev')
  })
})
