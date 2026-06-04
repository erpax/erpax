import { describe, it, expect } from 'vitest'
import CsrdDisclosures from '@/csrd/disclosures'

// Unified-node invariant test for the `csrd-disclosures` collection.
describe('csrd-disclosures collection node', () => {
  it('exports a valid collection config', () => {
    expect(CsrdDisclosures.slug).toBe('csrd-disclosures')
    expect(Array.isArray(CsrdDisclosures.fields)).toBe(true)
    expect(CsrdDisclosures.fields.length).toBeGreaterThan(0)
  })
})
