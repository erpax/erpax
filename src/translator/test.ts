import { describe, it, expect } from 'vitest'
import { interlingua, areTranslations, vocabularySize } from '@/translator'

// erpax as the interlingua translator: the content-uuid is the universal intermediate
// representation; surface forms that share it are translations.
describe('translator — the content-uuid interlingua', () => {
  it('interlingua is deterministic — the same surface form always routes to the same meaning-uuid', () => {
    expect(interlingua('merge')).toBe(interlingua('merge'))
    expect(interlingua('merge')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/)
  })
  it('forms sharing the interlingua are translations; distinct concepts are not', () => {
    expect(areTranslations('merge', 'merge')).toBe(true)
    expect(areTranslations('merge', 'gravity')).toBe(false)
  })
  it('the vocabulary is the matrix concepts (non-empty)', () => {
    expect(vocabularySize()).toBeGreaterThan(0)
  })
})
