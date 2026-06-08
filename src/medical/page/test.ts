import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/page'

describe('medical/page — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('page')
    expect(CANONICAL).toBe('page')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/page')
    expect(reexportFrom).toBe('@/page')
  })
})
