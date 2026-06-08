import { describe, it, expect } from 'vitest'
import {
  TRADING_APIS,
  EU_MEMBER_STATES,
  getTradingApis,
  getTradingApisByCategory,
  hasPaymentGateway,
  listAllTradingApis,
} from '@/trading/api'

describe('trading/api — commercial catalogue', () => {
  it('listAllTradingApis returns the full registry', () => {
    expect(listAllTradingApis()).toBe(TRADING_APIS)
    expect(TRADING_APIS.length).toBeGreaterThan(50)
  })

  it('getTradingApis unions GLOBAL and region-scoped providers', () => {
    const bg = getTradingApis('BG')
    expect(bg.some((a) => a.provider === 'Econt Express')).toBe(true)
    expect(bg.some((a) => a.region === 'GLOBAL')).toBe(true)
    const globalOnly = getTradingApis()
    expect(globalOnly.every((a) => a.region === 'GLOBAL')).toBe(true)
  })

  it('getTradingApis unions EU providers for EU member states', () => {
    const de = getTradingApis('DE')
    expect(de.some((a) => a.region === 'EU')).toBe(true)
    expect(EU_MEMBER_STATES.has('DE')).toBe(true)
  })

  it('getTradingApisByCategory filters within region scope', () => {
    const gateways = getTradingApisByCategory('BG', 'payment_gateway')
    expect(gateways.every((a) => a.category === 'payment_gateway')).toBe(true)
    expect(gateways.length).toBeGreaterThan(0)
  })

  it('hasPaymentGateway reflects catalogue coverage', () => {
    expect(hasPaymentGateway('BG')).toBe(true)
  })
})
