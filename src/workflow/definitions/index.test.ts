import { describe, it, expect } from 'vitest'
import WorkflowDefinitions from '@/workflow/definitions'

// Unified-node invariant test for the `workflow-definitions` collection.
describe('workflow-definitions collection node', () => {
  it('exports a valid collection config', () => {
    expect(WorkflowDefinitions.slug).toBe('workflow-definitions')
    expect(Array.isArray(WorkflowDefinitions.fields)).toBe(true)
    expect(WorkflowDefinitions.fields.length).toBeGreaterThan(0)
  })
})
