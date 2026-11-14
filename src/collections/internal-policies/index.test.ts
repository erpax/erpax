import { describe, it, expect } from 'vitest'
import { InternalPolicies } from '@/collections/internal-policies'

// Unified-node invariant test for the `internal-policies` collection.
describe('internal-policies collection node', () => {
  it('exports a valid collection config', () => {
    expect(InternalPolicies.slug).toBe('internal-policies')
    expect(Array.isArray(InternalPolicies.fields)).toBe(true)
    expect(InternalPolicies.fields.length).toBeGreaterThan(0)
  })
  it('keeps its version history natively and without limit (the folded policy-versions collection)', () => {
    expect(InternalPolicies.versions).toEqual({ maxPerDoc: 0 }) // 0 = keep every version; superseded policy text is evidence
    const names = InternalPolicies.fields.flatMap((x) => ('name' in x ? [x.name] : []))
    for (const name of ['versionNumber', 'versionName', 'releaseDate', 'changes']) expect(names, name).toContain(name)
  })
})
