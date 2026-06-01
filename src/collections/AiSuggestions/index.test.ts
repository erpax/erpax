import { describe, it, expect } from 'vitest'
import AiSuggestions from './index'

// Unified-node invariant test for the `ai-suggestions` collection.
describe('ai-suggestions collection node', () => {
  it('exports a valid collection config', () => {
    expect(AiSuggestions.slug).toBe('ai-suggestions')
    expect(Array.isArray(AiSuggestions.fields)).toBe(true)
    expect(AiSuggestions.fields.length).toBeGreaterThan(0)
  })
})
