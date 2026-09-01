import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import { createAccountingCollection, COLLECTION_DIAMOND_KEY } from './index'

const names = (fields: ReadonlyArray<Field>): string[] =>
  fields.map((f) => (f as { name?: string }).name ?? '').filter(Boolean)

const opts = (slug: string, extra: Record<string, unknown> = {}) => ({
  slug,
  labels: { singular: slug, plural: slug + 's' },
  useAsTitle: 'amount',
  defaultColumns: ['amount'],
  fields: () => [{ name: 'amount', type: 'number' } as Field],
  ...extra,
})

describe('factory/collection/base — the plumbing a collection never writes', () => {
  it('injects the shared spine once — a duplicate field name is a broken admin', () => {
    const c = createAccountingCollection(opts('base-probe'))
    const n = names(c.fields)
    expect(new Set(n).size).toBe(n.length)
    expect(n).toContain('amount')
    // the tamper-proof content-uuid is injected by default — Law 8, never opt-in
    expect(n).toContain('uuid')
    expect(n).toContain('createdBy')
  })

  it('attaches the computed diamond at config-build, never at runtime', () => {
    const c = createAccountingCollection(opts('base-diamond'))
    expect((c as Record<string, unknown>)[COLLECTION_DIAMOND_KEY]).toBeTruthy()
  })

  it('REFUSES a collection with no fields — neither the option nor the legacy thunk', () => {
    const { fields: _drop, ...noFields } = opts('base-no-fields')
    expect(() => createAccountingCollection(noFields as never)).toThrow()
  })

  it('THROWS on a disharmonious horo ring — a bad flow dies at build, not in production', () => {
    expect(() => createAccountingCollection(opts('base-bad-ring', { horoStates: ['draft', 'draft'] }))).toThrow()
  })
})
