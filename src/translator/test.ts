import { describe, it, expect } from 'vitest'
import {
  interlingua,
  areTranslations,
  vocabularySize,
  EUROPEAN_LANGUAGES,
  isEuropean,
  translate,
  zeroShot,
  europeanCoverage,
  type Lexeme,
} from '@/translator'

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

describe('translator — all European languages, self-sufficient via the interlingua', () => {
  it('covers the 24 official EU languages (BCP-47)', () => {
    expect(EUROPEAN_LANGUAGES.length).toBe(24)
    expect(isEuropean('bg')).toBe(true)
    expect(isEuropean('en')).toBe(true)
    expect(isEuropean('xx')).toBe(false)
  })
  it('translates through the interlingua, offline — zero-shot pivot on the shared meaning-uuid', () => {
    const lex: Lexeme[] = [{ uuid: 'u1', forms: { en: 'merge', de: 'verschmelzen', fr: 'fusionner' } }]
    expect(translate(lex, 'verschmelzen', 'de', 'fr')).toBe('fusionner') // de→fr, never paired directly
    expect(translate(lex, 'merge', 'en', 'bg')).toBeUndefined() // honest: coverage is data-bound
    expect(zeroShot('de', 'fr')).toBe(true)
  })
  it('europeanCoverage reports the languages the lexicon actually carries', () => {
    const lex: Lexeme[] = [{ uuid: 'u1', forms: { en: 'merge', de: 'verschmelzen' } }]
    expect(europeanCoverage(lex).sort()).toEqual(['de', 'en'])
  })
})
