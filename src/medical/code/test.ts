import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/code'

describe('medical/code — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('code')
    expect(CANONICAL).toBe('code')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/code')
    expect(reexportFrom).toBe('@/code')
  })
})
