import { describe, it, expect } from 'vitest'
import { allocateMemory, dedupHolds, operationalMemoryFacet } from '@/memory/quantum'
import { allocateMemory as canonical, dedupHolds as canonicalDedup, operationalMemoryFacet as canonicalFacet } from '@/quantum/memory'

describe('memory/quantum — IS quantum/memory (the identity)', () => {
  it('re-exports the canonical verbatim — same functions, same results', () => {
    const raw = { atomPath: 'merge', kind: 'fact' }
    expect(allocateMemory(raw)).toBe(canonical(raw))
    expect(dedupHolds()).toBe(canonicalDedup())
    expect(operationalMemoryFacet('merge')?.digest).toBe(canonicalFacet('merge')?.digest)
  })
})
