import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/sea'

describe('body/sea — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('sea')
    expect(CANONICAL).toBe('sea')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/sea')
    expect(reexportFrom).toBe('@/sea')
  })
})
