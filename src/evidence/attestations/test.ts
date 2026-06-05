import { describe, it, expect } from 'vitest'
import EvidenceAttestations from '@/evidence/attestations'

// Unified-node invariant test for the `evidence-attestations` collection.
describe('evidence-attestations collection node', () => {
  it('exports a valid collection config', () => {
    expect(EvidenceAttestations.slug).toBe('evidence-attestations')
    expect(Array.isArray(EvidenceAttestations.fields)).toBe(true)
    expect(EvidenceAttestations.fields.length).toBeGreaterThan(0)
  })
})
