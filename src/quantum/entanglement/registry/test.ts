import { describe, it, expect } from 'vitest'
import {
  COLLAPSE_HOOKS, FIELD_ENTANGLEMENT_REGISTRY,
  fieldEntanglementCount, fieldEntanglementKey, entangledFieldsFromRegistry,
} from './index'

describe('quantum/entanglement/registry — which fields collapse together', () => {
  it('the count is derived from the registry, never typed beside it', () => {
    // A count written next to the thing it counts drifts the moment anyone edits the thing.
    expect(fieldEntanglementCount()).toBe(Object.keys(FIELD_ENTANGLEMENT_REGISTRY).length)
  })

  it('a key addresses one field of one collection, and is injective', () => {
    expect(fieldEntanglementKey('invoices', 'total')).toBe(fieldEntanglementKey('invoices', 'total'))
    expect(fieldEntanglementKey('invoices', 'total')).not.toBe(fieldEntanglementKey('invoices', 'subtotal'))
    expect(fieldEntanglementKey('invoices', 'total')).not.toBe(fieldEntanglementKey('orders', 'total'))
  })

  it('every registered entanglement names a collapse hook that EXISTS', () => {
    // The registry declares which hook collapses a field. A hook id with no implementation is a
    // check that cannot fire — the same default-true-by-omission shape [[rules]]/unraised measures.
    const ids = new Set(Object.keys(COLLAPSE_HOOKS))
    expect(ids.size).toBeGreaterThan(0)
    for (const [key, ent] of Object.entries(FIELD_ENTANGLEMENT_REGISTRY)) {
      const hook = (ent as { collapseHook?: string }).collapseHook
      if (hook !== undefined) expect(ids.has(hook), `${key} names an unknown hook: ${hook}`).toBe(true)
    }
  })

  it('every entry is addressable — no empty collection or field', () => {
    for (const [key, ent] of Object.entries(FIELD_ENTANGLEMENT_REGISTRY)) {
      expect(key.length, 'a registry key must address something').toBeGreaterThan(0)
      expect(ent, `${key} has no entanglement body`).toBeTruthy()
    }
  })

  it('a path with no registered fields returns empty rather than throwing', () => {
    expect(entangledFieldsFromRegistry('nothing/registered/here')).toEqual([])
  })

  it('a registered atom path yields its fields, and each is shaped', () => {
    const paths = new Set(
      Object.values(FIELD_ENTANGLEMENT_REGISTRY).map((e) => (e as { atomPath?: string }).atomPath).filter(Boolean),
    )
    for (const p of [...paths].slice(0, 3)) {
      for (const f of entangledFieldsFromRegistry(p as string)) {
        expect(typeof f).toBe('object')
      }
    }
  })
})
