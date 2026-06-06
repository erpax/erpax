import { describe, it, expect } from 'vitest'
import { heartColor } from '@/heart/color'
import { GREEN } from '@/color'
import { color } from '@/heart'

describe('heart/color — the heart chakra colour is green', () => {
  it('heartColor is green (= color.GREEN = heart.color)', () => {
    expect(heartColor()).toBe(GREEN)
    expect(heartColor()).toBe(color())
  })
})
