import { describe, it, expect } from 'vitest'
import { genome, inherits, generations } from '@/dna'

// The genome is the parent_id chain encoded in the uuid chain — acyclic, terminating,
// and consistent (inherits/generations derive from it).
describe('dna — the genome (parent_id lineage) encoded in the uuid chain', () => {
  it('genome is an acyclic, terminating ancestor chain', () => {
    const g = genome('accounting')
    expect(Array.isArray(g)).toBe(true)
    expect(new Set(g).size).toBe(g.length) // acyclic — no atom repeats
  })
  it('generations equals the genome length', () => {
    expect(generations('accounting')).toBe(genome('accounting').length)
  })
  it('inherits is membership in the genome chain', () => {
    const g = genome('accounting')
    if (g.length > 0) expect(inherits('accounting', g[0]!)).toBe(true)
    expect(inherits('accounting', '____not_an_ancestor____')).toBe(false)
  })
})
