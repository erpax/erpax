import { describe, it, expect } from 'vitest'
import AiModels from './index'

// Unified-node invariant test for the `ai-models` collection.
describe('ai-models collection node', () => {
  it('exports a valid collection config', () => {
    expect(AiModels.slug).toBe('ai-models')
    expect(Array.isArray(AiModels.fields)).toBe(true)
    expect(AiModels.fields.length).toBeGreaterThan(0)
  })
})
