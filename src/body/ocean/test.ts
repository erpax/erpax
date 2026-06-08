import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/ocean'

describe('body/ocean — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('ocean')
    expect(CANONICAL).toBe('ocean')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/ocean')
    expect(reexportFrom).toBe('@/ocean')
  })
})
