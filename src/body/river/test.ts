import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/river'

describe('body/river — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('river')
    expect(CANONICAL).toBe('river')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/river')
    expect(reexportFrom).toBe('@/river')
  })
})
