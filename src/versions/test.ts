import { describe, expect, it } from 'vitest'

import { chainChecks, versionCross, type VersionCrossInput } from '@/versions/cross'

const TS = new Date('2026-06-03T00:00:00.000Z')

const base = (
  content: Record<string, unknown>,
  over: Partial<VersionCrossInput<Record<string, unknown>>> = {},
): VersionCrossInput<Record<string, unknown>> => ({
  content,
  tenantId: 't1',
  aggregateId: 'inv-1',
  aggregateType: 'invoice',
  eventType: 'invoice.changed',
  timestamp: TS,
  ...over,
})

describe('versioning cross — one content-addressed leaf, read three ways', () => {
  it('VERSION: the uuid is content-addressed (same content + tenant ⇒ same version)', () => {
    const a = versionCross(base({ amount: 100, currency: 'EUR' }))
    const b = versionCross(base({ amount: 100, currency: 'EUR' }))
    expect(a.uuid).toBe(b.uuid)
    // field order is canonicalized (RFC 8785) — same content, any order, same leaf
    const c = versionCross(base({ currency: 'EUR', amount: 100 }))
    expect(c.uuid).toBe(a.uuid)
  })

  it('VERSION: a content change mints a NEW leaf', () => {
    const a = versionCross(base({ amount: 100 }))
    const b = versionCross(base({ amount: 200 }))
    expect(a.uuid).not.toBe(b.uuid)
  })

  it('VERSION: tenant-scoped — same content, different tenant ⇒ different leaf', () => {
    const a = versionCross(base({ amount: 100 }, { tenantId: 't1' }))
    const b = versionCross(base({ amount: 100 }, { tenantId: 't2' }))
    expect(a.uuid).not.toBe(b.uuid)
  })

  it('changed: true when uuid != prevUuid, false on a no-op write', () => {
    const first = versionCross(base({ amount: 100 }))
    expect(first.changed).toBe(true) // prevUuid null ⇒ genesis is a change
    const noop = versionCross(base({ amount: 100 }, { prevUuid: first.uuid }))
    expect(noop.changed).toBe(false) // same content ⇒ same uuid ⇒ not a new version
    const real = versionCross(base({ amount: 200 }, { prevUuid: first.uuid }))
    expect(real.changed).toBe(true)
  })

  it('TAMPER-COST: every leaf is forge-evident at the second-preimage floor', () => {
    const leaf = versionCross(base({ amount: 100 }))
    expect(leaf.tamper.tamperEvident).toBe(true)
    expect(leaf.tamper.crackCostLog2).toBeGreaterThanOrEqual(106) // ERPAX_DIGEST_BITS
  })

  it('TAMPER-COST: deeper history is a more expensive forgery (versioning IS tamper-cost)', () => {
    const shallow = versionCross(base({ amount: 100 }, { seq: 1, coverage: 0.99 }))
    const deep = versionCross(base({ amount: 100 }, { seq: 50, coverage: 0.99 }))
    expect(deep.tamper.crackCostLog2).toBeGreaterThan(shallow.tamper.crackCostLog2)
  })

  it('TAMPER-COST: full coverage ⇒ ∞ (all is wired in the uuid-cross)', () => {
    const leaf = versionCross(base({ amount: 100 }, { seq: 5, coverage: 1 }))
    expect(leaf.tamper.crackCostLog2).toBe(Infinity)
  })

  it('ANALYTICS: the event tuple is the change-stream data-point', () => {
    const leaf = versionCross(base({ amount: 100 }))
    expect(leaf.event).toMatchObject({
      versionUuid: leaf.uuid, // the leaf IS the analytics key
      aggregateId: 'inv-1',
      aggregateType: 'invoice',
      eventType: 'invoice.changed',
      tenantId: 't1',
      timestamp: TS,
    })
  })

  it('chainChecks: the chain depth a coherent tamper must evade', () => {
    expect(chainChecks(1)).toBe(1)
    expect(chainChecks(0)).toBe(1) // floor at 1 (the leaf itself)
    expect(chainChecks(7.9)).toBe(7)
  })
})
