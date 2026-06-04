import { describe, it, expect } from 'vitest'
import ProjectMilestones from '@/customers/projects/project/milestones'

// Unified-node invariant test for the `project-milestones` collection.
describe('project-milestones collection node', () => {
  it('exports a valid collection config', () => {
    expect(ProjectMilestones.slug).toBe('project-milestones')
    expect(Array.isArray(ProjectMilestones.fields)).toBe(true)
    expect(ProjectMilestones.fields.length).toBeGreaterThan(0)
  })
})
