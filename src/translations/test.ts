import { describe, it, expect } from 'vitest'
import translations from '@/translations'
import type { Field } from 'payload'

// translations — the per-tenant override layer above the platform default
// (./index.ts via the accounting-collection factory). The proof cross: the
// `scope` enum is the flat-but-groupable namespace; `value` (the override
// itself) is Payload `localized:true` so Accept-Language selects the locale;
// `translationKey`/`scope`/`value` are the required override identity; and
// provenance (contentUuid · relatedTo) carries Conservation Laws 8 & 10.

const hasName = (f: Field): f is Extract<Field, { name: string }> =>
  'name' in f && typeof (f as { name?: unknown }).name === 'string'

const byName = (fields: Field[], name: string): Extract<Field, { name: string }> | undefined =>
  fields.filter(hasName).find((f) => f.name === name)

describe('translations — the tenant override collection', () => {
  it('is the `translations` collection titled by its key', () => {
    expect(translations.slug).toBe('translations')
    expect(translations.admin?.useAsTitle).toBe('translationKey')
    expect(Array.isArray(translations.fields)).toBe(true)
    expect(translations.fields.length).toBeGreaterThan(0)
  })

  it('the scope enum is exactly the namespace declared by the atom', () => {
    const scope = byName(translations.fields, 'scope') as
      | { type?: string; required?: boolean }
      | undefined
    expect(scope?.type).toBe('select')
    expect(scope?.required).toBe(true)
    const values = (
      (scope as { options?: Array<{ value: string }> } | undefined)?.options ?? []
    ).map((o) => o.value)
    expect(values).toEqual([
      'mcp-tool',
      'ui-surface',
      'event-label',
      'notification-template',
      'standard-citation',
      'chain-step',
      'other',
    ])
  })

  it('the override value is required AND localized — Accept-Language picks the locale', () => {
    const value = byName(translations.fields, 'value') as
      | { type?: string; required?: boolean; localized?: boolean }
      | undefined
    expect(value?.type).toBe('textarea')
    expect(value?.required).toBe(true)
    expect(value?.localized).toBe(true)
  })

  it('key is a required indexed scope-local key; the translator note is localized too', () => {
    const key = byName(translations.fields, 'key') as
      | { type?: string; required?: boolean; index?: boolean }
      | undefined
    expect(key?.type).toBe('text')
    expect(key?.required).toBe(true)
    expect(key?.index).toBe(true)

    const note = byName(translations.fields, 'note')
    expect(note?.type).toBe('textarea')
    expect((note as { localized?: boolean } | undefined)?.localized).toBe(true)
  })

  it('provenance fields carry Conservation Law 8 (content-uuid) and 10 (relatedTo)', () => {
    const contentUuid = byName(translations.fields, 'contentUuid')
    expect(contentUuid?.type).toBe('text')
    expect((contentUuid as { index?: boolean } | undefined)?.index).toBe(true)

    const relatedTo = byName(translations.fields, 'relatedTo')
    expect(relatedTo?.type).toBe('array')
    // each edge names a collection, a docId, and a typed edge kind
    const edgeFields = (relatedTo as { fields?: Field[] } | undefined)?.fields ?? []
    const collectionEdge = byName(edgeFields, 'collection') as { required?: boolean } | undefined
    const docIdEdge = byName(edgeFields, 'docId') as { required?: boolean } | undefined
    expect(collectionEdge?.required).toBe(true)
    expect(docIdEdge?.required).toBe(true)
    const edgeKind = byName(edgeFields, 'edgeKind')
    expect(edgeKind?.type).toBe('select')
    expect((edgeKind as { defaultValue?: string } | undefined)?.defaultValue).toBe('translates')
  })

  it('activation window + role-profile share hints exist for scheduled rollouts', () => {
    expect(byName(translations.fields, 'effectiveFrom')?.type).toBe('date')
    expect(byName(translations.fields, 'effectiveUntil')?.type).toBe('date')
    expect(byName(translations.fields, 'sharedAcrossRoleProfile')?.type).toBe('text')
  })
})
