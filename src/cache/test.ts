import { describe, it, expect } from 'vitest'
import { cache } from '@/cache'

describe('cache — a pure keyed store', () => {
  it('set/get/has/size', () => {
    const c = cache<number>()
    expect(c.has('a')).toBe(false)
    c.set('a', 1)
    expect(c.get('a')).toBe(1)
    expect(c.has('a')).toBe(true)
    expect(c.size()).toBe(1)
  })
  it('a fresh cache is independent', () => {
    const a = cache<number>()
    const b = cache<number>()
    a.set('x', 1)
    expect(b.has('x')).toBe(false)
  })
})
