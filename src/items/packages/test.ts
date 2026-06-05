import { describe, it, expect } from 'vitest'
import Packages from '@/items/packages'

// Unified-node invariant test for the `packages` collection.
describe('packages collection node', () => {
  it('exports a valid collection config', () => {
    expect(Packages.slug).toBe('packages')
    expect(Array.isArray(Packages.fields)).toBe(true)
    expect(Packages.fields.length).toBeGreaterThan(0)
  })
})
