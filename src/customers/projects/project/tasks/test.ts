import { describe, it, expect } from 'vitest'
import ProjectTasks from '@/customers/projects/project/tasks'

// Unified-node invariant test for the `project-tasks` collection.
describe('project-tasks collection node', () => {
  it('exports a valid collection config', () => {
    expect(ProjectTasks.slug).toBe('project-tasks')
    expect(Array.isArray(ProjectTasks.fields)).toBe(true)
    expect(ProjectTasks.fields.length).toBeGreaterThan(0)
  })
})
