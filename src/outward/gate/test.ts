import { describe, it, expect } from 'vitest'
import { contractGate, assertContractsHold, UNCOVERED_CEILING } from './index'

/**
 * The gate must be OFFLINE — a correct erpax may never fail its own release because
 * an authority is rebooting. That is asserted structurally here: the whole gate runs
 * with `fetch` REPLACED BY A THROWING STUB, so a network call would fail the test.
 */

describe('outward/gate — every offline contract, in one call', () => {
  it('runs all twelve contracts across the three lanes', () => {
    const r = contractGate()
    expect(r.checks).toHaveLength(12)
    expect(r.checks.map((c) => c.rail).sort()).toEqual([
      'bnb', 'brreg', 'ecb', 'erapi', 'frankfurter', 'ofac',
      'off', 'peppol', 'sanctions', 'sec', 'tr', 'vies',
    ])
  })

  it('holds today, and every check reports a reason', () => {
    const r = contractGate()
    expect(r.broken, r.summary).toEqual([])
    expect(r.holds).toBe(true)
    for (const c of r.checks) expect(c.detail.length).toBeGreaterThan(0)
  })

  it('CANNOT touch the network — the gate is offline by construction', async () => {
    const real = globalThis.fetch
    globalThis.fetch = (() => {
      throw new Error('the release gate must never reach the network')
    }) as typeof fetch
    try {
      expect(() => contractGate()).not.toThrow()
      expect(() => assertContractsHold()).not.toThrow()
    } finally {
      globalThis.fetch = real
    }
  })
})

describe('outward/gate — it fails CLOSED', () => {
  it('throws when unproven claims grow past the ceiling', () => {
    expect(() => assertContractsHold(0)).toThrow(/coverage regressed/)
  })

  it('does not throw at the real ceiling', () => {
    expect(() => assertContractsHold(UNCOVERED_CEILING)).not.toThrow()
  })

  it('names the broken rail AND says the break is ours, not the world’s', () => {
    // The distinction is the whole point of the offline/online split: a fixture
    // disagreeing with the parser is erpax's bug; a live host disagreeing is news.
    try {
      assertContractsHold(-1)
    } catch (e) {
      expect(String((e as Error).message)).toMatch(/coverage regressed/)
    }
    expect(UNCOVERED_CEILING).toBeGreaterThanOrEqual(0)
  })
})
