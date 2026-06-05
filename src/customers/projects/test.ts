import { describe, it, expect } from 'vitest'
import Projects from '@/customers/projects'

// Unified-node invariant test for the `projects` collection.
describe('projects collection node', () => {
  it('exports a valid collection config', () => {
    expect(Projects.slug).toBe('projects')
    expect(Array.isArray(Projects.fields)).toBe(true)
    expect(Projects.fields.length).toBeGreaterThan(0)
  })
})
