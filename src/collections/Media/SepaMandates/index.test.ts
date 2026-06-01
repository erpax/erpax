import { describe, it, expect } from 'vitest'
import SepaMandates from './index'

// Unified-node invariant test for the `sepa-mandates` collection.
describe('sepa-mandates collection node', () => {
  it('exports a valid collection config', () => {
    expect(SepaMandates.slug).toBe('sepa-mandates')
    expect(Array.isArray(SepaMandates.fields)).toBe(true)
    expect(SepaMandates.fields.length).toBeGreaterThan(0)
  })
})
