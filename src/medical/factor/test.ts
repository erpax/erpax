import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/factor'

describe('medical/factor — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('factor')
    expect(CANONICAL).toBe('factor')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/factor')
    expect(reexportFrom).toBe('@/factor')
  })
})
