import { describe, expect, it } from 'vitest'

import { corpusAtomToSearchDoc, corpusToSearchDocs, SKILL_RELATION } from './corpus'

describe('search-corpus — code into the content-uuid search surface', () => {
  it('maps an atom to a content-uuid search doc (relationTo:skill, value:uuid)', () => {
    const doc = corpusAtomToSearchDoc({
      route: 'matter',
      name: 'matter',
      description: 'the engagement',
      contentUuid: 'uuid-matter',
    })
    expect(doc.doc).toEqual({ relationTo: SKILL_RELATION, value: 'uuid-matter' })
    expect(doc.slug).toBe('matter')
    expect(doc.meta).toEqual({ title: 'matter', description: 'the engagement' })
    expect(doc.categories).toEqual([])
  })

  it('defines the empty case — blank name falls back to route, missing description is ""', () => {
    const doc = corpusAtomToSearchDoc({ route: 'x', name: '   ', contentUuid: 'u' })
    expect(doc.title).toBe('x')
    expect(doc.meta.title).toBe('x')
    expect(doc.meta.description).toBe('')
  })

  it('the uuid is the router — value carries the content-uuid verbatim, so re-ingest dedups', () => {
    const a = corpusAtomToSearchDoc({ route: 'a', name: 'a', contentUuid: 'same' })
    const b = corpusAtomToSearchDoc({ route: 'a', name: 'a', contentUuid: 'same' })
    expect(a.doc.value).toBe(b.doc.value) // same content ⇒ same address ⇒ one row (merge law)
  })

  it('maps the whole corpus preserving order and addresses', () => {
    const docs = corpusToSearchDocs([
      { route: 'a', name: 'a', contentUuid: 'ua' },
      { route: 'b', name: 'b', contentUuid: 'ub' },
    ])
    expect(docs).toHaveLength(2)
    expect(docs.map((d) => d.doc.value)).toEqual(['ua', 'ub'])
    expect(docs.every((d) => d.doc.relationTo === SKILL_RELATION)).toBe(true)
  })

  it('folds dual partners into the indexed meta — a query for one pole surfaces the other', () => {
    const doc = corpusAtomToSearchDoc({
      route: 'give',
      name: 'give',
      description: 'the outflow',
      dual: ['take'],
      contentUuid: 'u',
    })
    expect(doc.meta.description).toBe('the outflow · dual: take')
  })

  it('a blank-description pole leads with the dual clause (the two-fold law, still indexed)', () => {
    const doc = corpusAtomToSearchDoc({ route: 'give', name: 'give', dual: ['balance', 'take'], contentUuid: 'u' })
    expect(doc.meta.description).toBe('dual: balance, take')
  })
})
