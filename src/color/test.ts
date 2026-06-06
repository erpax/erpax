import { describe, it, expect } from 'vitest'
import { A432, SPECTRUM, colorOf, GREEN } from '@/color'

describe('color — the A432 chakra spectrum', () => {
  it('A432 anchor + a 7-colour spectrum', () => {
    expect(A432).toBe(432)
    expect(SPECTRUM).toHaveLength(7)
  })
  it('the heart (position 4) is green', () => {
    expect(colorOf(4)).toBe(GREEN)
    expect(GREEN).toBe('#2fb344')
  })
  it('colorOf wraps the 1..7 ring', () => {
    expect(colorOf(8)).toBe(colorOf(1))
    expect(colorOf(11)).toBe(colorOf(4))
  })
})
