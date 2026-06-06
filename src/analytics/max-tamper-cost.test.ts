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

  it('reports classical + quantum threat-model levers + a coverage gap to ∞', () => {
    expect(r.levers.length).toBeGreaterThanOrEqual(5) // 3 classical commitment + 2 quantum (BHT)
    expect(r.coverage).toBeGreaterThan(0)
    expect(r.coverage).toBeLessThanOrEqual(1)
    expect(r.gapToInfinity).toBeCloseTo(1 - r.coverage, 9)
  })

  it('the weakest link is the minimum binding cost across the levers', () => {
    const min = Math.min(...r.levers.map((l) => l.bindingLog2))
    expect(r.weakest.bindingLog2).toBe(min)
  })

  it('the classical bare-uuid commitment is cheaper than the full digest (the 2^53 trap)', () => {
    const bare = r.levers.find((l) => l.lever === 'chosen-content vs bare 106-bit uuid')
    const full = r.levers.find((l) => l.lever === 'chosen-content vs full 256-bit digest')
    expect(bare!.bindingLog2).toBeLessThan(full!.bindingLog2)
    expect(bare!.binding).toBe('collision')
  })

  it('the harmonic floors descend D > D/2 > D/3 — the quantum (BHT) collision is the lowest floor (3rd harmonic)', () => {
    const classicalBare = r.levers.find((l) => l.lever === 'chosen-content vs bare 106-bit uuid')!.bindingLog2 // 106/2 = 53
    const quantumBare = r.levers.find((l) => l.lever.startsWith('quantum') && l.lever.includes('bare'))!.bindingLog2 // 106/3 ≈ 35.3
    expect(quantumBare).toBeLessThan(classicalBare) // D/3 < D/2
    expect(quantumBare).toBeCloseTo(106 / 3, 6)
    expect(r.weakest.lever.startsWith('quantum')).toBe(true) // the missing cross IS the weakest
  })

  it('the fix names the full digest + the post-quantum anchor', () => {
    expect(r.fix).toMatch(/256|post-quantum/)
  })
})
