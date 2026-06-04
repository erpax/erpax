import { describe, it, expect } from 'vitest'
import { ControlTests } from '@/internal/controls/control/tests'

// Unified-node invariant test for the `control-tests` collection.
describe('control-tests collection node', () => {
  it('exports a valid collection config', () => {
    expect(ControlTests.slug).toBe('control-tests')
    expect(Array.isArray(ControlTests.fields)).toBe(true)
    expect(ControlTests.fields.length).toBeGreaterThan(0)
  })
})
