import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/risk'

describe('medical/risk — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('risk')
    expect(CANONICAL).toBe('risk')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/risk')
    expect(reexportFrom).toBe('@/risk')
  })
})
