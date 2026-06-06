/**
 * Power — usage = entropy = power, asserted. The realtime clients are the hardware;
 * the more the live network is used, the higher the cost to decode the private keys
 * (the analog negative). These tests prove `accumulatePower` COMPOSES the shipped
 * amplifiers (crackVerdict / invariantChecks / replicationChecks) — it never
 * reinvents the math — and that power is strictly monotonic in usage. @see ./index.ts
 */
import { readFileSync } from 'node:fs'
import { describe, it, expect } from 'vitest'
import { accumulatePower, coverageFromUsage, usageChecks, powerStrictlyGrows, type UsageSnapshot } from '@/power'
import { invariantChecks, replicationChecks, ERPAX_DIGEST_BITS } from '@/cost'
import { projectionProof } from '@/proof/projection'

const BASE: UsageSnapshot = { clients: 10, events: 1000, features: 5, streams: 5, dimensions: 10 }

describe('power: usage = entropy = power (more clients/events/features ⇒ more power)', () => {
  it('coverageFromUsage saturates — 0 at no usage, strictly increasing, <1 for finite, →1 as events grow', () => {
    expect(coverageFromUsage(0)).toBe(0)
    expect(coverageFromUsage(2000)).toBeGreaterThan(coverageFromUsage(1000))
    expect(coverageFromUsage(1000)).toBeLessThan(1)
    expect(coverageFromUsage(1e9)).toBeGreaterThan(0.99)
    expect(coverageFromUsage(1e9)).toBeLessThan(1)
  })

  it('powerLog2 is strictly monotonic in clients, events, and features', () => {
    const base = accumulatePower(BASE).powerLog2
    expect(accumulatePower({ ...BASE, clients: 20 }).powerLog2).toBeGreaterThan(base)
    expect(accumulatePower({ ...BASE, events: 5000 }).powerLog2).toBeGreaterThan(base)
    expect(accumulatePower({ ...BASE, features: 12 }).powerLog2).toBeGreaterThan(base)
  })

  it('the linear history term grows with usage (events = chain depth)', () => {
    expect(accumulatePower({ ...BASE, events: 5000 }).historyBits).toBeGreaterThan(accumulatePower(BASE).historyBits)
  })

  it('powerStrictlyGrows expresses usage ⇒ power', () => {
    expect(powerStrictlyGrows(BASE, { ...BASE, clients: 50, events: 9000 })).toBe(true)
    expect(powerStrictlyGrows({ ...BASE, clients: 50 }, BASE)).toBe(false)
  })

  it('the MAXIMUM is the inverse projection (decrypt the private key) — unbounded on the biggest chain', () => {
    const p = accumulatePower(BASE)
    expect(p.maximum).toStrictEqual(projectionProof('blockchain-pow'))
    expect(p.maximum.inverse.unbounded).toBe(true)
    expect(p.maximum.inverse.decryptKeyLog2).toBeNull()
  })

  it('a finite anchor (ecdsa-p256) makes the key-recovery max finite (128); the per-record floor stays 106', () => {
    const e = accumulatePower({ ...BASE, anchor: 'rfc3161-ecdsa-p256' })
    expect(e.maximum.inverse.decryptKeyLog2).toBe(128)
    expect(e.maximum.inverse.unbounded).toBe(false)
    expect(e.floorLog2).toBe(106) // min(106, 128) = min(106, ∞) = 106
  })

  it('usageChecks composes invariantChecks ∘ replicationChecks (the real amplifiers, not reinvented)', () => {
    expect(usageChecks(BASE)).toBe(replicationChecks(invariantChecks(BASE.streams, BASE.features), BASE.clients, true))
  })

  it('zero usage ⇒ the bare digest floor (no accumulated power without usage)', () => {
    const idle = accumulatePower({ clients: 0, events: 0, features: 0, streams: 0, dimensions: 0 })
    expect(idle.powerLog2).toBe(ERPAX_DIGEST_BITS) // 106
  })

  it('is deterministic and never leaks a non-finite number (JCS-safe for the bundle)', () => {
    const p = accumulatePower(BASE)
    expect(Number.isFinite(p.powerLog2)).toBe(true)
    expect(accumulatePower(BASE)).toStrictEqual(accumulatePower(BASE))
  })
})

describe('power: coverageFromUsage is the USAGE axis, not structural node-wiring', () => {
  it('is 0 at no usage, strictly increasing in events, and strictly < 1 for all finite events', () => {
    const nodes = 2000
    expect(coverageFromUsage(0, nodes)).toBe(0)
    for (const e of [1, 100, 1e6, 1e12, Number.MAX_SAFE_INTEGER]) {
      const c = coverageFromUsage(e, nodes)
      expect(c).toBeGreaterThan(0)
      expect(c).toBeLessThan(1) // never reaches the structural ∞ from mere usage
    }
    expect(coverageFromUsage(200, nodes)).toBeGreaterThan(coverageFromUsage(100, nodes))
    expect(coverageFromUsage(1e9, nodes)).toBeGreaterThan(coverageFromUsage(1e6, nodes))
  })

  it('the SKILL.md + index doc label this input as the usage axis and disclaim structural wiring', () => {
    const skill = readFileSync(new URL('./SKILL.md', import.meta.url), 'utf8')
    expect(skill).toMatch(/usage/i)
    expect(skill).toMatch(/usage[-* ]+accumulation/i) // the named axis
    expect(skill).toMatch(/not\b[^.]*structural node-wiring/i) // disclaims structural
    expect(skill).toMatch(/axis-agnostic/i)
    const src = readFileSync(new URL('./index.ts', import.meta.url), 'utf8')
    // the crackVerdict call-site states which axis it supplies
    expect(src).toMatch(/USAGE-accumulation axis/i)
    expect(src).toMatch(/not structural node-wiring/i)
  })
})
