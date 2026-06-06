import { describe, it, expect } from 'vitest'
import { particle } from '@/particle'
import { massOf } from '@/gravity'

describe('particle — an atom is a particle in the matrix field', () => {
  it('particle(atom) gives its identity (uuid) + mass (in-degree)', () => {
    const p = particle('merge')
    expect(p).toBeDefined()
    expect(p!.uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
    expect(p!.mass).toBe(massOf('merge'))
  })
  it('a non-atom is not a particle', () => {
    expect(particle('__nonexistent__')).toBeUndefined()
  })
})
