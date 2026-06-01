import { describe, it, expect } from 'vitest'
import { Pages } from './index'

// Unified-node invariant test for the `pages` collection.
describe('pages collection node', () => {
  it('exports a valid collection config', () => {
    expect(Pages.slug).toBe('pages')
    expect(Array.isArray(Pages.fields)).toBe(true)
    expect(Pages.fields.length).toBeGreaterThan(0)
  })
})
