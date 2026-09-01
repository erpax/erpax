import { describe, it, expect } from 'vitest'
import type { CollectionConfig, Field } from 'payload'
import { deriveLifecycleEmits, foldCollectionLifecycle } from './index'
import { EMITS_WIRED_KEY } from '@/factory/collection/base'

const statusFields: Field[] = [
  { name: 'status', type: 'select', options: ['draft', 'posted'] } as Field,
]

describe('factory/collection/lifecycle — the events a status field implies', () => {
  it('derives created + one event per transition', () => {
    const emits = deriveLifecycleEmits('invoices', statusFields)
    expect(emits.map((e) => e.event)).toEqual(['invoices:created', 'invoices:draft', 'invoices:posted'])
  })

  it('derives NOTHING without a status select — no field, no lifecycle', () => {
    expect(deriveLifecycleEmits('things', [{ name: 'amount', type: 'number' } as Field])).toEqual([])
  })

  it('leaves an explicitly wired collection alone — derived events are a default, not an override', () => {
    const wired = {
      slug: 'invoices',
      fields: statusFields,
      [EMITS_WIRED_KEY]: true,
    } as unknown as CollectionConfig
    expect(foldCollectionLifecycle(wired)).toBe(wired)
  })

  it('appends producers to afterChange without dropping the existing ones', () => {
    const existing = (() => undefined) as unknown as NonNullable<CollectionConfig['hooks']>['afterChange']
    const c = {
      slug: 'invoices',
      fields: statusFields,
      hooks: { afterChange: [existing] },
    } as unknown as CollectionConfig
    const folded = foldCollectionLifecycle(c)
    expect(folded.hooks?.afterChange?.length).toBeGreaterThan(1)
    expect(folded.hooks?.afterChange?.[0]).toBe(existing)
  })
})
