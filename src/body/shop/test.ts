import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/shop'

describe('body/shop — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('shop')
    expect(CANONICAL).toBe('shop')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/shop')
    expect(reexportFrom).toBe('@/shop')
  })
})
