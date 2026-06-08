import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/water'

describe('body/water — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('water')
    expect(CANONICAL).toBe('water')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/water')
    expect(reexportFrom).toBe('@/water')
  })
})
