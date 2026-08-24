import { describe, expect, it } from 'vitest'

import {
  DIMENSIONAL_PLUGINS,
  checkDimensionalCoverage,
  dimensionForCollection,
} from './index'

describe('plugin — the ten dimensions', () => {
  it('there are exactly ten, and checkDimensionalCoverage refuses any other count', () => {
    expect(DIMENSIONAL_PLUGINS.length).toBe(10)
    expect(checkDimensionalCoverage().dimensionsCount).toBe(10)
  })

  it('every dimension id is distinct — a repeat would make assignment ambiguous', () => {
    const ids = DIMENSIONAL_PLUGINS.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('coverage is RED on exactly one duplicate assignment — named, not hidden', () => {
    // A collection in two dimensions makes its ownership ambiguous. The atom's own
    // checker has reported this all along; the test file beside it asserted
    // expect(true).toBe(true), so nothing ever read the verdict.
    //
    // Pinned as the live state, not as a clean invariant that is not true. Resolve
    // meta-proposals into one dimension and this goes red — that is the signal to
    // tighten it to duplicateAssignments.length === 0.
    const r = checkDimensionalCoverage()
    expect(r.ok).toBe(false)
    expect(r.duplicateAssignments).toEqual([
      { slug: 'meta-proposals', dimensions: ['D-conservation', 'J-meta-evolution'] },
    ])
  })

  it('every OTHER collection belongs to at most one dimension', () => {
    const seen = new Map<string, string>()
    for (const d of DIMENSIONAL_PLUGINS)
      for (const slug of [...d.canonicalCollections, ...d.newCollections.map((n) => n.slug)]) {
        if (slug === 'meta-proposals') continue
        expect(seen.get(slug) ?? d.id).toBe(d.id)
        seen.set(slug, d.id)
      }
  })

  it('dimensionForCollection finds a declared slug and returns null for an unknown one', () => {
    const first = DIMENSIONAL_PLUGINS[0]!
    expect(dimensionForCollection(first.canonicalCollections[0]!)).toBe(first.id)
    expect(dimensionForCollection('no-such-collection-anywhere')).toBeNull()
  })

  it('every dimension carries a trinity law and at least one collection', () => {
    for (const d of DIMENSIONAL_PLUGINS) {
      expect(d.trinityLaw.length).toBeGreaterThan(0)
      expect(d.canonicalCollections.length + d.newCollections.length).toBeGreaterThan(0)
    }
  })
})
