import { describe, it, expect } from 'vitest'
import WorkflowInstances from './index'

// Unified-node invariant test for the `workflow-instances` collection.
describe('workflow-instances collection node', () => {
  it('exports a valid collection config', () => {
    expect(WorkflowInstances.slug).toBe('workflow-instances')
    expect(Array.isArray(WorkflowInstances.fields)).toBe(true)
    expect(WorkflowInstances.fields.length).toBeGreaterThan(0)
  })
})
