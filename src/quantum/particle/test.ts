import { describe, it, expect } from 'vitest'
import { asParticle, asWave, isDual } from '@/quantum/particle'

describe('quantum/particle — wave-particle duality', () => {
  it('asParticle is the uuid identity; asWave is its digit (1..9 ring)', () => {
    expect(asParticle('merge')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    const w = asWave('merge')
    expect(w).toBeGreaterThanOrEqual(0)
    expect(w).toBeLessThanOrEqual(9)
  })
  it('every atom is dual (particle + wave); a non-atom is neither', () => {
    expect(isDual('merge')).toBe(true)
    expect(isDual('__nonexistent__')).toBe(false)
  })
})
