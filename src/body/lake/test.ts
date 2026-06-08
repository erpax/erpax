import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/lake'

describe('body/lake — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('lake')
    expect(CANONICAL).toBe('lake')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/lake')
    expect(reexportFrom).toBe('@/lake')
  })
})
