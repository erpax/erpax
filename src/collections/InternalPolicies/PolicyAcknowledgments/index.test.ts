import { describe, it, expect } from 'vitest'
import { PolicyAcknowledgments } from './index'

// Unified-node invariant test for the `policy-acknowledgments` collection.
describe('policy-acknowledgments collection node', () => {
  it('exports a valid collection config', () => {
    expect(PolicyAcknowledgments.slug).toBe('policy-acknowledgments')
    expect(Array.isArray(PolicyAcknowledgments.fields)).toBe(true)
    expect(PolicyAcknowledgments.fields.length).toBeGreaterThan(0)
  })
})
