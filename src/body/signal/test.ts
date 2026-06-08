import { describe, it, expect } from 'vitest'
import { PART, CANONICAL, PARENT, atomPath, reexportFrom } from '@/body/signal'

describe('body/signal — vocabulary pivot', () => {
  it('names the body facet and its canonical atom', () => {
    expect(PART).toBe('signal')
    expect(CANONICAL).toBe('signal')
    expect(PARENT).toBe('body')
    expect(atomPath).toBe('body/signal')
    expect(reexportFrom).toBe('@/signal')
  })
})
