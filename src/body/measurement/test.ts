import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/measurement'

describe('body/measurement — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('measurement')
    expect(CANONICAL).toBe('measurement')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/measurement')
    expect(reexportFrom).toBe('@/measurement')
  })
})
