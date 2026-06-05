/**
 * dashboard — green by construction: a model's links partition into its related
 * collections (plural, registered) and models (singular), or the invariant fails.
 * @see ./index.ts, ./SKILL.md
 */
import { describe, it, expect } from 'vitest'
import { modelDashboard } from '@/dashboard'

const collectionSlugs = ['translations', 'invoices', 'users']

describe('dashboard — each model wired with its related links + collections', () => {
  it("partitions a model's links into related collections (plural, registered) and models (singular)", () => {
    const d = modelDashboard({
      model: 'translation',
      links: ['translations', 'message', 'word', 'invoices', 'translation'], // self-link dropped
      collectionSlugs,
    })
    expect(d.relatedCollections).toEqual([
      { collection: 'translations', model: 'translation' },
      { collection: 'invoices', model: 'invoice' },
    ])
    expect(d.relatedModels).toEqual(['message', 'word'])
    // the self-link never appears as its own relation
    expect([...d.relatedModels, ...d.relatedCollections.map((c) => c.collection)]).not.toContain('translation')
  })

  it('a collection card pairs the plural slug with its singular model (the matrix)', () => {
    const d = modelDashboard({ model: 'x', links: ['translations'], collectionSlugs })
    expect(d.relatedCollections[0]).toEqual({ collection: 'translations', model: 'translation' })
  })

  // Inconsistency: a singular atom that is NOT a registered collection is a related MODEL, never a collection.
  it('a singular atom (not a registered collection) is a related model, not a collection', () => {
    const d = modelDashboard({ model: 'x', links: ['message'], collectionSlugs })
    expect(d.relatedModels).toEqual(['message'])
    expect(d.relatedCollections).toHaveLength(0)
  })
})
