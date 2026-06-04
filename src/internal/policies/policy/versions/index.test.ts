import { describe, it, expect } from 'vitest'
import { PolicyVersions } from '@/internal/policies/policy/versions'

// Unified-node invariant test for the `policy-versions` collection.
describe('policy-versions collection node', () => {
  it('exports a valid collection config', () => {
    expect(PolicyVersions.slug).toBe('policy-versions')
    expect(Array.isArray(PolicyVersions.fields)).toBe(true)
    expect(PolicyVersions.fields.length).toBeGreaterThan(0)
  })
})
