import { describe, it, expect } from 'vitest'
import { checkCloudflareBindingsHealthy } from '@/cloudflare'
import type { ErpaxCfEnv, D1Database } from '@/cloudflare'

// cloudflare (./index.ts): checkCloudflareBindingsHealthy is the pure boot probe —
// it partitions the expected bindings into available vs missing and is OK iff D1 is
// bound (the rest degrade gracefully). Called from payload.onInit so a
// misconfiguration surfaces at boot, not on first request (fail-fast).
const fakeD1: D1Database = { prepare: () => ({}) }

describe('cloudflare — checkCloudflareBindingsHealthy: the fail-fast boot probe', () => {
  it('undefined env is not OK and reports D1 as the missing essential', () => {
    const h = checkCloudflareBindingsHealthy(undefined)
    expect(h.ok).toBe(false)
    expect(h.missing).toContain('D1')
    expect(h.available).toEqual([])
  })

  it('OK iff D1 is bound; the rest degrade gracefully', () => {
    expect(checkCloudflareBindingsHealthy({ D1: fakeD1 }).ok).toBe(true)
    expect(checkCloudflareBindingsHealthy({} as ErpaxCfEnv).ok).toBe(false)
  })

  it('partitions every probed binding into available vs missing (disjoint, no overlap)', () => {
    const env: ErpaxCfEnv = { D1: fakeD1, QUEUE: { send: async () => {} } }
    const h = checkCloudflareBindingsHealthy(env)
    expect(h.available).toContain('D1')
    expect(h.available).toContain('QUEUE')
    expect(h.missing).toContain('R2')
    expect(h.missing).toContain('KV')
    // available and missing never overlap
    const overlap = h.available.filter((k) => h.missing.includes(k))
    expect(overlap).toEqual([])
  })

  it('D1 present but everything else absent is OK with a non-empty missing set', () => {
    const h = checkCloudflareBindingsHealthy({ D1: fakeD1 })
    expect(h.ok).toBe(true)
    expect(h.available).toEqual(['D1'])
    expect(h.missing.length).toBeGreaterThan(0)
    expect(h.missing).not.toContain('D1')
  })
})
