import { describe, it, expect } from 'vitest'
import { DisclosureChecklists } from '@/legal/entities/disclosure/checklists'

// Unified-node invariant test for the `disclosure-checklists` collection.
describe('disclosure-checklists collection node', () => {
  it('exports a valid collection config', () => {
    expect(DisclosureChecklists.slug).toBe('disclosure-checklists')
    expect(Array.isArray(DisclosureChecklists.fields)).toBe(true)
    expect(DisclosureChecklists.fields.length).toBeGreaterThan(0)
  })
})
