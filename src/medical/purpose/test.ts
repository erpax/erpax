import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/purpose'

describe('medical/purpose — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('purpose')
    expect(CANONICAL).toBe('purpose')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/purpose')
    expect(reexportFrom).toBe('@/purpose')
  })
})
