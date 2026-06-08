import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/level'

describe('medical/level — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('level')
    expect(CANONICAL).toBe('level')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/level')
    expect(reexportFrom).toBe('@/level')
  })
})
