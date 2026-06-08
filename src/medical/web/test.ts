import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/web'

describe('medical/web — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('web')
    expect(CANONICAL).toBe('web')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/web')
    expect(reexportFrom).toBe('@/web')
  })
})
