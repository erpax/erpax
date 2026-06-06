/**
 * convention/dry — the DRY convention measures itself. coverage = atoms /
 * (atoms + residue) must be a real fraction in [0,1] computed live over the tree,
 * and stable across calls (pure over the same tree — no default, no clock).
 */
import { describe, it, expect } from 'vitest'
import { coverage, atoms, dup } from '@/convention/dry'

describe('convention/dry — no duplication, measured live', () => {
  it('coverage is a finite fraction in [0,1]', () => {
    const c = coverage()
    expect(Number.isFinite(c)).toBe(true)
    expect(c).toBeGreaterThanOrEqual(0)
    expect(c).toBeLessThanOrEqual(1)
  })

  it('coverage is deterministic over the same tree (no default, no clock)', () => {
    expect(coverage()).toBe(coverage())
  })

  it('coverage equals atoms / (atoms + dup) from the composed kernels', () => {
    const a = atoms()
    const d = dup()
    expect(a).toBeGreaterThan(0) // the corpus is non-empty by architecture
    expect(d).toBeGreaterThanOrEqual(0) // residue is a count
    expect(coverage()).toBe(a / (a + d))
  })
})
