import { describe, it, expect } from 'vitest'
import createAccountingCollection from '@/mcp/tool/metadata'

// Unified-node invariant test for the `mcp-tool-metadata` collection.
describe('mcp-tool-metadata collection node', () => {
  it('exports a valid collection config', () => {
    expect(createAccountingCollection.slug).toBe('mcp-tool-metadata')
    expect(Array.isArray(createAccountingCollection.fields)).toBe(true)
    expect(createAccountingCollection.fields.length).toBeGreaterThan(0)
  })
})
