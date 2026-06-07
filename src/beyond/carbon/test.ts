import { describe, it, expect, beforeEach } from 'vitest'
import { estimateCarbon, recordCarbon, getTenantCarbon, __resetCarbon } from '@/beyond/carbon'

// Law 16 — carbon: gCO2e per chain step (CPU + network energy × grid intensity),
// accumulated per tenant for ESRS E1 reporting.
describe('beyond/carbon — gCO2e estimation + per-tenant accumulation', () => {
  beforeEach(() => {
    __resetCarbon()
  })

  it('a zero-work step costs zero carbon', () => {
    const est = estimateCarbon({ cpuMs: 0, egressBytes: 0 })
    expect(est.gramsCO2e).toBe(0)
  })

  it('more CPU and more egress strictly increase the estimate', () => {
    const small = estimateCarbon({ cpuMs: 1000, egressBytes: 1_073_741_824 })
    const big = estimateCarbon({ cpuMs: 1000, egressBytes: 2 * 1_073_741_824 })
    expect(big.gramsCO2e).toBeGreaterThan(small.gramsCO2e)
    expect(small.gramsCO2e).toBeGreaterThan(0)
  })

  it('carries the factor source and passes region through', () => {
    const est = estimateCarbon({ cpuMs: 100, egressBytes: 0, region: 'eu-west' })
    expect(est.factorSource).toContain('Cloudflare')
    expect(est.region).toBe('eu-west')
  })

  it('recordCarbon accumulates per tenant and getTenantCarbon reads the total', () => {
    const est = estimateCarbon({ cpuMs: 0, egressBytes: 1_073_741_824 })
    const first = recordCarbon('t-1', est)
    const second = recordCarbon('t-1', est)
    expect(first.totalGramsCO2e).toBe(est.gramsCO2e)
    expect(second.totalGramsCO2e).toBe(est.gramsCO2e * 2)
    expect(getTenantCarbon('t-1')).toBe(second.totalGramsCO2e)
  })

  it('tenants are isolated and an unknown tenant reads zero', () => {
    recordCarbon('t-1', estimateCarbon({ cpuMs: 0, egressBytes: 1_073_741_824 }))
    expect(getTenantCarbon('t-2')).toBe(0)
  })
})
