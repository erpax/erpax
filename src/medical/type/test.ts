import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/type'

describe('medical/type — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('type')
    expect(CANONICAL).toBe('type')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/type')
    expect(reexportFrom).toBe('@/type')
  })
})
