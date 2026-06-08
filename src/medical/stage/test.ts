import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/stage'

describe('medical/stage — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('stage')
    expect(CANONICAL).toBe('stage')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/stage')
    expect(reexportFrom).toBe('@/stage')
  })
})
