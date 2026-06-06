import { describe, it, expect } from 'vitest'
import { color, HEART_POSITION } from '@/heart'
import { GREEN } from '@/color'

describe('heart — the centre (4th chakra, green)', () => {
  it('is the 4th chakra (the centre)', () => {
    expect(HEART_POSITION).toBe(4)
  })
  it('its colour is green (the A432 coherence colour)', () => {
    expect(color()).toBe(GREEN)
  })
})
