/**
 * analytics/max-tamper-cost — computed tests. Verifies the MIN law (the weakest
 * link caps the whole) and the commitment-width trap (bare 106-bit uuid is a
 * cheaper forgery than the full 256-bit digest), recomputed from the live tree.
 *
 * @standard ISO/IEC-29119:2022 software testing (computed invariant)
 */
import { describe, it, expect } from 'vitest'
import { maxTamperCost } from '@/analytics/max-tamper-cost'

describe('analytics/max-tamper-cost — the weakest link (min caps the whole)', () => {
  const r = maxTamperCost()

  it('reports three threat-model levers + a coverage gap to ∞', () => {
    expect(r.levers).toHaveLength(3)
    expect(r.coverage).toBeGreaterThan(0)
    expect(r.coverage).toBeLessThanOrEqual(1)
    expect(r.gapToInfinity).toBeCloseTo(1 - r.coverage, 9)
  })

  it('the weakest link is the minimum binding cost across the levers', () => {
    const min = Math.min(...r.levers.map((l) => l.bindingLog2))
    expect(r.weakest.bindingLog2).toBe(min)
  })

  it('the bare-uuid commitment is the cheaper forgery (the 2^53 chosen-content trap)', () => {
    const bare = r.levers.find((l) => l.lever.includes('bare 106-bit'))
    const full = r.levers.find((l) => l.lever.includes('full 256-bit'))
    expect(bare).toBeDefined()
    expect(full).toBeDefined()
    expect(bare!.bindingLog2).toBeLessThan(full!.bindingLog2)
    expect(bare!.binding).toBe('collision')
  })

  it('names the (free) commitment fix when the weakest link is a collision', () => {
    if (r.weakest.binding === 'collision') expect(r.fix).toContain('CONTENT_DIGEST_BITS')
  })
})
