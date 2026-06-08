import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/one'

describe('body/one — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('one')
    expect(CANONICAL).toBe('one')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/one')
    expect(reexportFrom).toBe('@/one')
  })
})
