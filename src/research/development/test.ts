import { describe, it, expect } from 'vitest'
import { cross, direction } from '@/research/development'
import { entangle } from '@/entanglement'

// The research-side direction of the symmetric R&D cross (same binding as development/research).
describe('research/development — development → research (the enabling direction)', () => {
  it('cross is the order-free binding of the pair', () => {
    expect(cross()).toBe(entangle('development', 'research'))
    expect(cross()).toBe(entangle('research', 'development')) // symmetric
  })
  it('declares its direction', () => {
    expect(direction).toContain('development')
  })
})
