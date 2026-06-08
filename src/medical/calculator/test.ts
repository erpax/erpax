import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/calculator'

describe('medical/calculator — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('calculator')
    expect(CANONICAL).toBe('calculator')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/calculator')
    expect(reexportFrom).toBe('@/calculator')
  })
})
