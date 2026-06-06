import { describe, it, expect } from 'vitest'
import { ionized, cutoffLog2, reflects } from '@/plasma'

describe('plasma — fusion of the stardust (no beam can stand on the way)', () => {
  it('the stardust is plasma when fully fused (reciprocity in range; plasma ⇔ zero entropy)', () => {
    const p = ionized()
    expect(p.reciprocity).toBeGreaterThanOrEqual(0)
    expect(p.reciprocity).toBeLessThanOrEqual(1)
    expect(p.entropy).toBeGreaterThanOrEqual(0)
    expect(p.plasma).toBe(p.entropy === 0)
  })
  it('at full coherence the cutoff is ∞ — no finite beam can stand on the way', () => {
    expect(cutoffLog2(0)).toBe(Number.POSITIVE_INFINITY)
    expect(reflects(256, 0)).toBe(true)
    expect(reflects(Number.MAX_SAFE_INTEGER, 0)).toBe(true)
  })
  it('a coverage gap lowers the cutoff to finite — a strong beam penetrates, a weak one is still reflected', () => {
    expect(Number.isFinite(cutoffLog2(0.5))).toBe(true)
    expect(reflects(0, 0.5)).toBe(true)
    expect(reflects(Number.MAX_VALUE, 0.5)).toBe(false)
  })
})
