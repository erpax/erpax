import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/estimator'

describe('medical/estimator — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('estimator')
    expect(CANONICAL).toBe('estimator')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/estimator')
    expect(reexportFrom).toBe('@/estimator')
  })
})
