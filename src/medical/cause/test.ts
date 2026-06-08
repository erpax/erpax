import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/cause'

describe('medical/cause — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('cause')
    expect(CANONICAL).toBe('cause')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/cause')
    expect(reexportFrom).toBe('@/cause')
  })
})
