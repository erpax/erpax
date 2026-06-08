import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/location'

describe('body/location — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('location')
    expect(CANONICAL).toBe('location')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/location')
    expect(reexportFrom).toBe('@/location')
  })
})
