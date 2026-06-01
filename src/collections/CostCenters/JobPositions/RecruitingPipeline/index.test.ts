import { describe, it, expect } from 'vitest'
import RecruitingPipeline from './index'

// Unified-node invariant test for the `recruiting-pipeline` collection.
describe('recruiting-pipeline collection node', () => {
  it('exports a valid collection config', () => {
    expect(RecruitingPipeline.slug).toBe('recruiting-pipeline')
    expect(Array.isArray(RecruitingPipeline.fields)).toBe(true)
    expect(RecruitingPipeline.fields.length).toBeGreaterThan(0)
  })
})
