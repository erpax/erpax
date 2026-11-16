import { describe, it, expect } from 'vitest'
import { Categories } from '@/collections/categories'

// Unified-node invariant test for the `categories` collection.
describe('categories collection node', () => {
  it('exports a valid collection config', () => {
    expect(Categories.slug).toBe('categories')
    expect(Array.isArray(Categories.fields)).toBe(true)
    expect(Categories.fields.length).toBeGreaterThan(0)
  })
})

// The nested-docs plugin owns the breadcrumbs (doc, url, label). A hand-written array had `title` where the
// plugin writes `label`, so every breadcrumb label was dropped; the plugin opts a collection in by its
// self-referencing `parent`, which stays.
describe('categories — breadcrumbs belong to the nested-docs plugin', () => {
  it('keeps the parent the plugin looks for and declares no breadcrumbs of its own', () => {
    const named = (n: string) => Categories.fields.find((f) => 'name' in f && f.name === n) as { relationTo?: string } | undefined
    expect(named('parent')?.relationTo).toBe('categories')
    expect(named('breadcrumbs')).toBeUndefined()
  })
})
