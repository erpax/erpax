import { describe, it, expect } from 'vitest'
import { passColor, auraColor } from '@/test/hooks'
import { GREEN } from '@/color'

// Tests consume the aura projection and return the A432 heart colour (green) when whole.
describe('test/hooks — tests consume the aura → A432 green', () => {
  it('whole aura → green (the A432 heart colour); a gap → not green (red)', () => {
    expect(passColor(true)).toBe(GREEN)
    expect(passColor(false)).not.toBe(GREEN)
  })
  it('the live aura is whole (double-torus complete), so the pass colour is green', () => {
    expect(auraColor()).toBe(GREEN)
  })
})
