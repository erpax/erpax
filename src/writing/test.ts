import { describe, it, expect } from 'vitest'
import { PRINCIPLES, principle, coherentProse } from '@/writing'

describe('writing — the craft of connected thoughts', () => {
  it('the principles are coherence moves (thesis..revision), each named with a move', () => {
    expect(PRINCIPLES.length).toBeGreaterThanOrEqual(6)
    for (const p of PRINCIPLES) {
      expect(typeof p.name).toBe('string')
      expect(p.move.length).toBeGreaterThan(0)
    }
    expect(principle('coherence')).toBeTruthy()
    expect(principle('thesis')).toBeTruthy()
    expect(principle('__none__')).toBeUndefined()
  })
  it('coherent prose ⇔ no orphan sentence (the same test as the corpus)', () => {
    expect(coherentProse(0)).toBe(true)
    expect(coherentProse(3)).toBe(false)
  })
})
