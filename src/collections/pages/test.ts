import { describe, it, expect } from 'vitest'
import { Pages } from '@/collections/pages'

// Unified-node invariant test for the `pages` collection.
describe('pages collection node', () => {
  it('exports a valid collection config', () => {
    expect(Pages.slug).toBe('pages')
    expect(Array.isArray(Pages.fields)).toBe(true)
    expect(Pages.fields.length).toBeGreaterThan(0)
  })
})

// The nested-docs plugin owns the breadcrumbs (doc, url, label); see the categories test for why.
describe('pages — breadcrumbs belong to the nested-docs plugin', () => {
  it('keeps the parent the plugin looks for and declares no breadcrumbs of its own', () => {
    const named = (n: string) => Pages.fields.find((f) => 'name' in f && f.name === n) as { relationTo?: string } | undefined
    expect(named('parent')?.relationTo).toBe('pages')
    expect(named('breadcrumbs')).toBeUndefined()
  })
})
