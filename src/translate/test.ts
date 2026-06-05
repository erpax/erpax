/**
 * translate — green by construction: humanize is deterministic, the DB override
 * wins, and the singular/plural matrix is strict. Tests inconsistencies — a
 * non-pluralized model/collection pair fails the matrix invariant loudly.
 * @see ./index.ts, ./SKILL.md
 */
import { describe, it, expect } from 'vitest'
import {
  humanize,
  dropdownOptions,
  resolveLabel,
  pluralOf,
  singularOf,
  isStrictPair,
} from '@/translate'

describe('translate — humanize keys + enforce the singular/plural matrix', () => {
  it('humanizes computed keys into Title-Case default labels', () => {
    expect(humanize('description')).toBe('Description')
    expect(humanize('label.singular')).toBe('Label Singular')
    expect(humanize('lineItems')).toBe('Line Items')
    expect(humanize('invoice:activated')).toBe('Invoice Activated')
  })

  it('dropdown options pair the humanized label with the raw key value (deduped)', () => {
    expect(dropdownOptions(['name', 'name', 'createdAt'])).toEqual([
      { label: 'Name', value: 'name' },
      { label: 'Created At', value: 'createdAt' },
    ])
  })

  // THE override law: the DB value overwrites the humanized default; else the default; never the raw key.
  it('resolveLabel: DB override > humanized default (never the raw key)', () => {
    expect(resolveLabel('lineItems')).toBe('Line Items') // computed default
    expect(resolveLabel('lineItems', 'Артикули')).toBe('Артикули') // DB override wins
    expect(resolveLabel('lineItems', '   ')).toBe('Line Items') // blank override ignored
  })

  // THE strict matrix: model singular ↔ collection plural; the translation↔translations pair holds.
  it('strict singular-model / plural-collection: translation ↔ translations', () => {
    expect(pluralOf('translation')).toBe('translations')
    expect(singularOf('translations')).toBe('translation')
    expect(isStrictPair('translation', 'translations')).toBe(true)
    expect(pluralOf('entity')).toBe('entities') // consonant + y → ies
    expect(pluralOf('box')).toBe('boxes') // → es
  })

  // Inconsistency: a model that equals its collection (no plural) breaks the matrix.
  it('a non-pluralized pair is rejected (the matrix invariant fails loudly)', () => {
    expect(isStrictPair('translation', 'translation')).toBe(false)
  })
})
