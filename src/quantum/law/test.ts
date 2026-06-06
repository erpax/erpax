import { describe, it, expect } from 'vitest'
import { quantumAtoms, carriesLaw, lawless, lawful } from '@/quantum/law'

describe('quantum/law — law is the suffix', () => {
  it('scans the quantum atoms (a non-empty set, each a src/quantum child with a SKILL.md)', () => {
    const all = quantumAtoms()
    expect(all.length).toBeGreaterThan(10)
    expect(all).toContain('law') // this atom is itself a quantum atom
  })
  it('quantum/law carries its OWN law suffix (the keystone is self-consistent)', () => {
    expect(carriesLaw('law')).toBe(true)
  })
  it('lawful and lawless partition the quantum atoms (disjoint, covering)', () => {
    const all = quantumAtoms()
    const a = lawful()
    const b = lawless()
    expect(a.length + b.length).toBe(all.length)
    expect(a.filter((x) => b.includes(x))).toHaveLength(0)
  })
})
