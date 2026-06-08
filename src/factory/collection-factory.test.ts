/**
 * Factory dedup smoke test — Slice HHHHHHHH (2026-05-11).
 *
 * Regression guard for Slice GGGGGGGG: when a legacy collection inlines
 * `multiTenancyField()` / `notesField()` / `...auditFields()` /
 * `statusField()` in its fields thunk, the factory must skip its own
 * injection of the matching name (not double-inject and trip Payload's
 * `DuplicateFieldName` sanitizer).
 *
 * Without this test the FixedAssets-class regression could re-land
 * silently any time the factory body is refactored.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability — factory dedup contract
 * @audit ISO 19011:2018 §6.4.6 — regression-guard for shared-field collision
 */
import { describe, it, expect } from 'vitest'
import type { Field } from 'payload'
import { createAccountingCollection } from './collection-factory'
import {
  notesField, auditFields, statusField, currencyField,
} from '@/fields'
import { HORO_DIGITS, HORO_MEASURE } from '@/horo'
import type { HoroState } from '@/horo'

/** Tenant is now injected by plugin-multi-tenant; tests inline a literal to exercise dedup. */
const tenantField: Field = { name: 'tenant', type: 'relationship', relationTo: 'tenants' }

/** Helper: count occurrences of a field name in a fields array. */
function countByName(fields: ReadonlyArray<unknown>, name: string): number {
  let n = 0
  for (const f of fields) {
    if (f && typeof f === 'object' && 'name' in f && (f as { name?: unknown }).name === name) n++
  }
  return n
}

describe('createAccountingCollection — Slice GGGGGGGG dedup', () => {
  it('legacy 2-arg form: user thunk inlines tenant + notes; factory must not double-inject', () => {
    const cfg = createAccountingCollection(
      {
        slug: 'dedup-legacy',
        labels: { singular: 'X', plural: 'Xs' },
        useAsTitle: 'name',
        defaultColumns: ['name'],
      },
      () => [
        tenantField,
        { name: 'name', type: 'text', required: true },
        notesField(),                            // inlined — factory must skip
      ],
    )
    expect(countByName(cfg.fields, 'tenant')).toBe(1)
    expect(countByName(cfg.fields, 'notes')).toBe(1)
  })

  it('legacy 2-arg: user thunk inlines all shared fields; no duplicate names anywhere', () => {
    const cfg = createAccountingCollection(
      {
        slug: 'dedup-legacy-all',
        labels: { singular: 'X', plural: 'Xs' },
        useAsTitle: 'name',
        defaultColumns: ['name'],
      },
      () => [
        tenantField,
        { name: 'name', type: 'text' },
        currencyField('EUR'),
        statusField(
          [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }],
          'a',
        ),
        ...auditFields(),
        notesField(),
      ],
    )
    // Every name in the final array should appear exactly once.
    const names = cfg.fields
      .filter((f): f is Field & { name: string } =>
        typeof f === 'object' && f !== null && 'name' in f && typeof (f as { name?: unknown }).name === 'string',
      )
      .map((f) => f.name)
    const seen = new Set<string>()
    const dups: string[] = []
    for (const n of names) {
      if (seen.has(n)) dups.push(n)
      seen.add(n)
    }
    expect(dups).toEqual([])
  })

  it('modern 1-arg form: user does NOT inline shared fields; factory injects them', () => {
    const cfg = createAccountingCollection({
      slug: 'dedup-modern',
      labels: { singular: 'X', plural: 'Xs' },
      useAsTitle: 'name',
      defaultColumns: ['name'],
      fields: () => [
        { name: 'name', type: 'text', required: true },
      ],
    })
    // Factory injects audit fields + notes (tenant is owned by plugin-multi-tenant).
    expect(countByName(cfg.fields, 'tenant')).toBe(0)
    expect(countByName(cfg.fields, 'createdBy')).toBe(1)
    expect(countByName(cfg.fields, 'approvedBy')).toBe(1)
    expect(countByName(cfg.fields, 'approvedAt')).toBe(1)
    expect(countByName(cfg.fields, 'notes')).toBe(1)
  })

  it('per-entry auditFields dedup: user inlines only approvedAt; factory injects createdBy + approvedBy', () => {
    const cfg = createAccountingCollection({
      slug: 'dedup-partial-audit',
      labels: { singular: 'X', plural: 'Xs' },
      useAsTitle: 'name',
      defaultColumns: ['name'],
      fields: () => [
        { name: 'name', type: 'text' },
        // User pre-declares approvedAt with a custom shape; factory must
        // skip its own approvedAt but still inject createdBy + approvedBy.
        { name: 'approvedAt', type: 'date', admin: { readOnly: true, description: 'CUSTOM' } },
      ],
    })
    expect(countByName(cfg.fields, 'approvedAt')).toBe(1)
    expect(countByName(cfg.fields, 'createdBy')).toBe(1)
    expect(countByName(cfg.fields, 'approvedBy')).toBe(1)
  })

  // ── Slice horo-cut1 — flow-state harmony ride the closed ring ──
  const FULL_RING: ReadonlyArray<HoroState> = HORO_DIGITS.map((step, i) => ({
    code: HORO_MEASURE[i],
    step,
  }))

  it('horoStates: injects a measure-ordered `state` select + write validator', () => {
    const cfg = createAccountingCollection({
      slug: 'horo-modern',
      labels: { singular: 'X', plural: 'Xs' },
      useAsTitle: 'name',
      defaultColumns: ['name'],
      horoStates: FULL_RING,
      horoStateDefault: 'base',
      fields: () => [{ name: 'name', type: 'text' }],
    })
    expect(countByName(cfg.fields, 'state')).toBe(1)
    const stateField = cfg.fields.find(
      (f): f is Field & { name: string } =>
        typeof f === 'object' && f !== null && 'name' in f && (f as { name?: unknown }).name === 'state',
    )
    expect(stateField?.type).toBe('select')
    // @ts-expect-error select options
    expect(stateField.options.map((o: { value: string }) => o.value)).toEqual(HORO_MEASURE.slice())
    // The write-time harmony validator is wired into beforeChange.
    expect((cfg.hooks?.beforeChange ?? []).length).toBeGreaterThan(0)
  })

  it('horoStates: a custom field name is honoured and deduped', () => {
    const cfg = createAccountingCollection({
      slug: 'horo-named',
      labels: { singular: 'X', plural: 'Xs' },
      useAsTitle: 'name',
      defaultColumns: ['name'],
      horoStateName: 'lifecycle',
      horoStates: FULL_RING,
      fields: () => [{ name: 'name', type: 'text' }],
    })
    expect(countByName(cfg.fields, 'lifecycle')).toBe(1)
    expect(countByName(cfg.fields, 'state')).toBe(0)
  })

  it('horoStates: a disharmonious ring THROWS at config-build (fail closed)', () => {
    expect(() =>
      createAccountingCollection({
        slug: 'horo-escape',
        labels: { singular: 'X', plural: 'Xs' },
        useAsTitle: 'name',
        defaultColumns: ['name'],
        // Only 3 states — off the seven-position ring.
        horoStates: FULL_RING.slice(0, 3),
        fields: () => [{ name: 'name', type: 'text' }],
      }),
    ).toThrow(/horoStates disharmony/)
  })

  it('opt-out: injectAuditFields=false suppresses factory injection entirely', () => {
    const cfg = createAccountingCollection({
      slug: 'opt-out-audit',
      labels: { singular: 'X', plural: 'Xs' },
      useAsTitle: 'name',
      defaultColumns: ['name'],
      injectAuditFields: false,
      fields: () => [{ name: 'name', type: 'text' }],
    })
    expect(countByName(cfg.fields, 'createdBy')).toBe(0)
    expect(countByName(cfg.fields, 'approvedBy')).toBe(0)
    expect(countByName(cfg.fields, 'approvedAt')).toBe(0)
  })
})
