import { describe, it, expect } from 'vitest'
import WipSnapshots from '@/customers/projects/wip/snapshots'

// Unified-node invariant test for the `wip-snapshots` collection.
describe('wip-snapshots collection node', () => {
  it('exports a valid collection config', () => {
    expect(WipSnapshots.slug).toBe('wip-snapshots')
    expect(Array.isArray(WipSnapshots.fields)).toBe(true)
    expect(WipSnapshots.fields.length).toBeGreaterThan(0)
  })
})
