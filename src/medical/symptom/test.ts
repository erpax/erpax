import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath } from '@/medical/symptom'

describe('medical/symptom — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('symptom')
    expect(CANONICAL).toBe('symptom')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/symptom')
  })
})
