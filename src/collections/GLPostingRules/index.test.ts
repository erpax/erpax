import { describe, it, expect } from 'vitest'
import { GLPostingRules } from './index'

// Unified-node invariant test for the `gl-posting-rules` collection.
describe('gl-posting-rules collection node', () => {
  it('exports a valid collection config', () => {
    expect(GLPostingRules.slug).toBe('gl-posting-rules')
    expect(Array.isArray(GLPostingRules.fields)).toBe(true)
    expect(GLPostingRules.fields.length).toBeGreaterThan(0)
  })
})
