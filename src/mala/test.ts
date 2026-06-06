import { describe, it, expect } from 'vitest'
import { BEADS, math108, step, dualitiesOnRound } from '@/mala'

describe('mala — the 108-step round (the next math)', () => {
  it('108 = 1¹·2²·3³ = 9×12 = 2²·3³, digital root 9 (the rodin axis)', () => {
    expect(BEADS).toBe(108)
    const m = math108()
    expect(m.product123).toBe(108)
    expect(m.as9x12).toBe(108)
    expect(m.as2sq3cube).toBe(108)
    expect(m.digitalRoot).toBe(9)
    expect(m.holds).toBe(true)
  })
  it('step wraps the round mod 108 (closes and repeats)', () => {
    expect(step(0)).toBe(0)
    expect(step(108)).toBe(0)
    expect(step(110)).toBe(2)
    expect(step(-1)).toBe(107)
  })
  it('the dualities walk the round — fraction in [0,1], remaining = 108 − dualities', () => {
    const r = dualitiesOnRound()
    expect(r.beads).toBe(108)
    expect(r.dualities).toBeGreaterThan(0)
    expect(r.fraction).toBeGreaterThanOrEqual(0)
    expect(r.fraction).toBeLessThanOrEqual(1)
    expect(r.remaining).toBe(Math.max(0, 108 - r.dualities))
  })
})
