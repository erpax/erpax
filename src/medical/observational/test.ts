import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/observational'

describe('medical/observational — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('observational')
    expect(CANONICAL).toBe('observational')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/observational')
    expect(reexportFrom).toBe('@/observational')
  })
})
