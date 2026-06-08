import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/entity'

describe('medical/entity — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('entity')
    expect(CANONICAL).toBe('entity')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/entity')
    expect(reexportFrom).toBe('@/entity')
  })
})
