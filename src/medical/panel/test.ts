import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/medical/panel'

describe('medical/panel — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('panel')
    expect(CANONICAL).toBe('panel')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/panel')
    expect(reexportFrom).toBe('@/panel')
  })
})
