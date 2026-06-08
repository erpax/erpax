import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/computer/store'

describe('computer/store — vocabulary pivot', () => {
  it('names the computer facet and its canonical atom', () => {
    expect(PART).toBe('store')
    expect(CANONICAL).toBe('store')
    expect(PARENT).toBe('computer')
    expect(atomPath).toBe('computer/store')
    expect(reexportFrom).toBe('@/store')
  })
})
