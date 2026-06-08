import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from './index'

describe('medical/test — vocabulary pivot', () => {
  it('names the medical facet and its canonical atom', () => {
    expect(PART).toBe('test')
    expect(CANONICAL).toBe('test')
    expect(PARENT).toBe('medical')
    expect(atomPath).toBe('medical/test')
    expect(reexportFrom).toBe('@/test')
  })
})
