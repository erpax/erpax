import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/review'

describe('body/review — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('review')
    expect(CANONICAL).toBe('review')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/review')
    expect(reexportFrom).toBe('@/review')
  })
})
