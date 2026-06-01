import { describe, it, expect } from 'vitest'
import Employees from './index'

// Unified-node invariant test for the `employees` collection.
describe('employees collection node', () => {
  it('exports a valid collection config', () => {
    expect(Employees.slug).toBe('employees')
    expect(Array.isArray(Employees.fields)).toBe(true)
    expect(Employees.fields.length).toBeGreaterThan(0)
  })
})
