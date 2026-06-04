import { describe, it, expect } from 'vitest'
import { InternalControls } from '@/internal/controls'

// Unified-node invariant test for the `internal-controls` collection.
describe('internal-controls collection node', () => {
  it('exports a valid collection config', () => {
    expect(InternalControls.slug).toBe('internal-controls')
    expect(Array.isArray(InternalControls.fields)).toBe(true)
    expect(InternalControls.fields.length).toBeGreaterThan(0)
  })
})
