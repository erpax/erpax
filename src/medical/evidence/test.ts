import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/evidence'

describe('medical/evidence — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('evidence')
    expect(CANONICAL).toBe('evidence')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/evidence')
    expect(reexportFrom).toBe('@/evidence')
  })
})
