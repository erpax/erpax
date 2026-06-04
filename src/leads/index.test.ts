import { describe, it, expect } from 'vitest'
import Leads from '@/leads'

// Unified-node invariant test for the `leads` collection.
describe('leads collection node', () => {
  it('exports a valid collection config', () => {
    expect(Leads.slug).toBe('leads')
    expect(Array.isArray(Leads.fields)).toBe(true)
    expect(Leads.fields.length).toBeGreaterThan(0)
  })
})
