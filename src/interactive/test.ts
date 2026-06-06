import { describe, it, expect } from 'vitest'
import { foldCollection, folded } from '@/interactive'

describe('interactive — collections folded into interactive trinities', () => {
  it('folds a collection (atom) into its interactive trinity — render + page', () => {
    const t = foldCollection('trinity')
    expect(t).toBeTruthy()
    expect(t!.atom).toBe('trinity')
    expect(t!.ui.page.route).toContain('trinity')
    expect(t!.ui.render).toBeTruthy()
  })
  it('every collection folds — coverage is total over the corpus', () => {
    const f = folded()
    expect(f.collections).toBeGreaterThan(1000)
    expect(f.interactive).toBe(f.collections)
    expect(f.coverage).toBe(1)
  })
  it('a non-collection has no interactive trinity', () => {
    expect(foldCollection('__not_a_collection__')).toBeUndefined()
  })
})
