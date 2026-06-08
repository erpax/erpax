import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/auto'

describe('body/auto — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('auto')
    expect(CANONICAL).toBe('auto')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/auto')
    expect(reexportFrom).toBe('@/auto')
  })
})
