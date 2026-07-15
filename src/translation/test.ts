import { describe, it, expect } from 'vitest'
import { defineTranslation, renderIn, resolveByWord, translateVia, pairCoverage, trainingCoverage, roundTrips } from '@/translation'
import { messageUuid, splitWords } from '@/message'
import { defaultLocale } from '@/i18n/localization'

// The translation model — green by construction: it is exactly the messaging-uuid
// (../message) applied to a keyed source string, en-sourced + per-locale.
describe('translation model', () => {
  it('ports a message to a content-addressed, word-split, en-sourced entry', () => {
    const t = defineTranslation('description', 'Age is a dimension')
    expect(t.key).toBe('description')
    expect(t.source).toBe('Age is a dimension')
    expect(t.uuid).toBe(messageUuid('Age is a dimension'))
    expect(t.words).toEqual(splitWords('Age is a dimension'))
    expect(t.values[defaultLocale]).toBe('Age is a dimension')
  })

  it('is deterministic and merges locale overrides over the en source', () => {
    const mk = () => defineTranslation('x', 'hello world', { bg: 'здравей свят' })
    expect(mk()).toEqual(mk())
    expect(mk().values.en).toBe('hello world')
    expect(mk().values.bg).toBe('здравей свят')
  })
})

describe('translation — the rosetta pivot: any language/dialect ↔ any, through the shared uuid', () => {
  const table = [
    defineTranslation('greet', 'hello world', { bg: 'здравей свят', de: 'hallo welt' }),
    defineTranslation('heart', 'heart', { bg: 'сърце' }),
  ]

  it('renderIn projects a concept into a locale — en is the source, unregistered is the seed (null)', () => {
    expect(renderIn(table[0]!, 'en')).toBe('hello world')
    expect(renderIn(table[0]!, 'bg')).toBe('здравей свят')
    expect(renderIn(table[0]!, 'ja')).toBeNull() // not yet translated — the seed, not fabricated
  })

  it('translateVia routes ANY→ANY through the uuid — bg→de never stored, computed via the pivot', () => {
    const r = translateVia(table, 'здравей свят', 'bg', 'de')
    expect(r?.value).toBe('hallo welt') // bg → uuid → de, no bg-de table
    expect(r?.seed).toBe(false)
    expect(r?.uuid).toBe(table[0]!.uuid) // the shared interlingua address
  })

  it('the target seed is surfaced, never faked — de→ja returns seed:true with the uuid', () => {
    const r = translateVia(table, 'hallo welt', 'de', 'ja')
    expect(r?.value).toBeNull()
    expect(r?.seed).toBe(true) // ja rendering is the model/dictionary job
  })

  it('an unregistered word is not a concept — returns null (the model handles free text)', () => {
    expect(translateVia(table, 'unregistered phrase', 'en', 'bg')).toBeNull()
    expect(resolveByWord(table, 'сърце', 'bg')?.source).toBe('heart') // reverse: word → concept
  })

  it('save-all: L languages cover L² directed pairs from just L renderings per concept', () => {
    expect(pairCoverage(30)).toEqual({ renderingsPerConcept: 30, directedPairs: 900 })
    expect(pairCoverage(1)).toEqual({ renderingsPerConcept: 1, directedPairs: 1 })
  })
})

describe('translation — training + testing the intelligence (honest coverage, no fabrication)', () => {
  const table = [
    defineTranslation('greet', 'hello world', { bg: 'здравей свят', de: 'hallo welt' }),
    defineTranslation('heart', 'heart', { bg: 'сърце' }),
  ]

  it('trainingCoverage measures how trained it is — the ratio is honest, not 1 until renderings are filled', () => {
    const c = trainingCoverage(table, ['en', 'bg', 'de', 'ja'])
    expect(c.byLocale.en).toBe(2) // both concepts have the source
    expect(c.byLocale.bg).toBe(2) // both have bg
    expect(c.byLocale.de).toBe(1) // only greet has de
    expect(c.byLocale.ja).toBe(0) // ja is untrained — the seed
    expect(c.total).toBe(8) // 2 concepts × 4 locales
    expect(c.ratio).toBeCloseTo(5 / 8) // honestly < 1: the intelligence is not fully trained
  })

  it('round-trip consistency — a registered pair returns the original through the pivot both ways', () => {
    expect(roundTrips(table, 'hello world', 'en', 'bg')).toBe(true) // en→bg→en === en
    expect(roundTrips(table, 'hello world', 'en', 'de')).toBe(true)
    expect(roundTrips(table, 'hello world', 'en', 'ja')).toBe(false) // ja untrained — cannot round-trip
  })
})
