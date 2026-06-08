/**
 * quantum/memory — allocation·dedup·regeneration·autosave on the lattice.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  allocateMemory,
  dedupKey,
  dedupHolds,
  operationalMemoryFacet,
  operationalMemoryIsArchitecture,
  autosaveAtCollapse,
  isSealedDiamond,
  projectMemoryToArchitecture,
} from '@/quantum/memory'
import { emptySessionLattice } from '@/memory/session'

describe('quantum/memory — allocation = collapse', () => {
  it('allocateMemory strips ephemeral debris before uuid', () => {
    const base = { atomPath: 'merge', kind: 'fact' }
    const noisy = { ...base, sessionId: 'ephemeral', messages: [{ x: 1 }] }
    expect(allocateMemory(base)).toBe(allocateMemory(noisy))
  })

  it('dedupKey is deterministic', () => {
    const s = { atomPath: 'diamond', payload: { n: 1 } }
    expect(dedupKey(s)).toBe(dedupKey(s))
  })
})

describe('quantum/memory — dedup = free (no-cloning)', () => {
  it('dedupHolds on the live matrix', () => {
    expect(dedupHolds()).toBe(true)
  })
})

describe('quantum/memory — operational memory IS architecture', () => {
  it('operationalMemoryFacet walks a sealed atom', () => {
    const facet = operationalMemoryFacet('merge')
    expect(facet).not.toBeNull()
    expect(facet!.sealed).toBe(true)
    expect(facet!.horo).toBeGreaterThan(0)
  })

  it('operationalMemoryIsArchitecture: sanitized blob ≡ live facet', () => {
    expect(
      operationalMemoryIsArchitecture({
        atomPath: 'merge',
        kind: 'fact',
        sessionId: 'cursor-1',
        messages: [{ role: 'user' }],
      }),
    ).toBe(true)
  })

  it('projectMemoryToArchitecture seals when atom is diamond-green', () => {
    const p = projectMemoryToArchitecture({ atomPath: 'merge' })
    expect(p.sealed).toBe(true)
    expect(p.diamond!.contentUuid).toMatch(/^[0-9a-f-]{36}$/)
  })
})

describe('quantum/memory — autosave at collapse', () => {
  it('autosaveAtCollapse persists sealed atoms only', () => {
    const lattice = emptySessionLattice()
    const saved = autosaveAtCollapse(lattice, 'merge', 'cursor-1')
    expect(saved.saved).toBe(true)
    expect(saved.artifact!.atomPath).toBe('merge')
  })

  it('isSealedDiamond gates autosave', () => {
    expect(isSealedDiamond('merge')).toBe(true)
    expect(isSealedDiamond('this/path/does/not/exist')).toBe(false)
  })
})
