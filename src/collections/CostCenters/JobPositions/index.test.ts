import { describe, it, expect } from 'vitest'
import JobPositions from './index'

// Unified-node invariant test for the `job-positions` collection.
describe('job-positions collection node', () => {
  it('exports a valid collection config', () => {
    expect(JobPositions.slug).toBe('job-positions')
    expect(Array.isArray(JobPositions.fields)).toBe(true)
    expect(JobPositions.fields.length).toBeGreaterThan(0)
  })
})
