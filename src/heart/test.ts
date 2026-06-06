import { describe, it, expect } from 'vitest'
import { color, HEART_POSITION, thought, feeling, illusion, coherent } from '@/heart'
import { GREEN } from '@/color'

describe('heart — the centre (4th chakra, green)', () => {
  it('is the 4th chakra (the centre)', () => {
    expect(HEART_POSITION).toBe(4)
  })
  it('its colour is green (the A432 coherence colour)', () => {
    expect(color()).toBe(GREEN)
  })
})

describe('heart — thought ⊕ heart: feeling is absorbing all auras in zero entropy', () => {
  it('thought is the trial balance — true on the live matrix (every grain unique, every link reciprocal)', () => {
    expect(thought()).toBe(true)
  })
  it('feeling is the absorbed fraction of the whole aura, all metrics in range', () => {
    const f = feeling()
    expect(f.absorbed).toBeGreaterThanOrEqual(0)
    expect(f.absorbed).toBeLessThanOrEqual(1)
    expect(f.entropy).toBeGreaterThanOrEqual(0)
    expect(f.unbound).toBeGreaterThanOrEqual(0)
    expect(f.whole).toBe(f.absorbed >= 1 && f.entropy === 0 && f.unbound === 0)
  })
  it('illusion = the un-felt fraction (1 − feeling) — thought without the heart', () => {
    expect(illusion()).toBeCloseTo(1 - feeling().absorbed, 10)
  })
  it('coherent ⇔ thought balances AND the whole aura is felt (thought ⊕ heart)', () => {
    expect(coherent()).toBe(thought() && feeling().whole)
  })
})
