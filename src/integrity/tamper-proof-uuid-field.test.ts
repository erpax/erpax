/**
 * Tests for tamperProofUuidField + tamperProofBeforeChangeHook.
 * Slice SSSSS.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  tamperProofUuidField,
  tamperProofBeforeChangeHook,
  TAMPER_PROOF_COLLECTIONS_REGISTRY,
  isTamperProofCollection,
  registerTamperProofCollection,
} from './tamper-proof-uuid-field'
import { verifyContentUuid } from './content-uuid'
import { encodeStructured, SLOT_TAGS, CAPABILITIES } from '@/uuid/format'

beforeEach(() => {
  TAMPER_PROOF_COLLECTIONS_REGISTRY.clear()
})

describe('tamperProofUuidField', () => {
  it('returns a single-field array for clean spread', () => {
    const fields = tamperProofUuidField('invoices')
    expect(fields).toHaveLength(1)
    expect((fields[0] as { name?: string }).name).toBe('uuid')
    expect(fields[0]!.type).toBe('text')
  })

  it('declares uuid as unique + index + required + read-only in admin', () => {
    const [field] = tamperProofUuidField('invoices')
    expect(field).toMatchObject({
      name: 'uuid', type: 'text', unique: true, index: true, required: true,
      admin: expect.objectContaining({ readOnly: true }),
    })
  })

  it('registers the collection slug in the opt-in registry as a side effect', () => {
    expect(TAMPER_PROOF_COLLECTIONS_REGISTRY.has('invoices')).toBe(false)
    tamperProofUuidField('invoices')
    expect(TAMPER_PROOF_COLLECTIONS_REGISTRY.has('invoices')).toBe(true)
    expect(isTamperProofCollection('invoices')).toBe(true)
  })

  it('registry is idempotent across re-registration', () => {
    registerTamperProofCollection('invoices')
    registerTamperProofCollection('invoices')
    expect(TAMPER_PROOF_COLLECTIONS_REGISTRY.size).toBe(1)
  })
})

describe('tamperProofBeforeChangeHook — create', () => {
  it('stamps a structured uuidv8 (slot=collectionRow + TAMPER_PROOF) on initial create', async () => {
    const hook = tamperProofBeforeChangeHook('invoices')
    const data = { tenant: 't1', amount: 100, currency: 'EUR' }
    const result = await hook({
      data, operation: 'create', req: {} as never, collection: {} as never,
    } as never)
    // Slice ZZZZZZZZZ-cut1 — expected uuid is structured uuidv8 with
    // slot=collectionRow + TAMPER_PROOF capability, content =
    // stripped(data), tenant from the row's tenant field.
    const expected = encodeStructured({
      slotTag: SLOT_TAGS.collectionRow,
      capabilities: CAPABILITIES.TAMPER_PROOF,
      schemaVersion: 1,
      content: { tenant: 't1', amount: 100, currency: 'EUR' },
      tenantId: 't1',
    })
    expect((result as { uuid: string }).uuid).toBe(expected)
    // Sanity: it's v8, not v5.
    expect((result as { uuid: string }).uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-/)
  })

  it('verifies — verifyContentUuid passes on the stamped row', async () => {
    const hook = tamperProofBeforeChangeHook('invoices')
    const stamped = await hook({
      data: { tenant: 't1', amount: 100 }, operation: 'create',
      req: {} as never, collection: {} as never,
    } as never) as Record<string, unknown> & { uuid: string }
    expect(verifyContentUuid(stamped, 't1').ok).toBe(true)
  })

  it('resolves tenantId from a relationship object too', async () => {
    const hook = tamperProofBeforeChangeHook('invoices')
    const result = await hook({
      data: { tenant: { id: 't1', name: 'Acme' }, amount: 100 },
      operation: 'create', req: {} as never, collection: {} as never,
    } as never)
    expect(typeof (result as { uuid: string }).uuid).toBe('string')
  })
})

describe('tamperProofBeforeChangeHook — update', () => {
  it('recomputes uuid from the MERGED post-update doc (structured uuidv8)', async () => {
    const hook = tamperProofBeforeChangeHook('invoices')
    const original = { tenant: 't1', amount: 100, currency: 'EUR', uuid: 'old-uuid' }
    const result = await hook({
      data: { amount: 250 }, originalDoc: original,
      operation: 'update', req: {} as never, collection: {} as never,
    } as never) as { uuid: string }
    const expected = encodeStructured({
      slotTag: SLOT_TAGS.collectionRow,
      capabilities: CAPABILITIES.TAMPER_PROOF,
      schemaVersion: 1,
      content: { tenant: 't1', amount: 250, currency: 'EUR' },
      tenantId: 't1',
    })
    expect(result.uuid).toBe(expected)
  })

  it('throws when a user tries to override uuid manually', async () => {
    const hook = tamperProofBeforeChangeHook('invoices')
    await expect(hook({
      data: { uuid: 'i-am-pretending' },
      originalDoc: { uuid: 'real-uuid', tenant: 't1', amount: 100 },
      operation: 'update', req: {} as never, collection: {} as never,
    } as never)).rejects.toThrow(/Conservation Law 8 violation.*invoices.*manual uuid changes/)
  })

  it('does NOT throw when incoming uuid matches stored (idempotent re-save)', async () => {
    const hook = tamperProofBeforeChangeHook('invoices')
    const result = await hook({
      data: { uuid: 'same', amount: 100 },
      originalDoc: { uuid: 'same', tenant: 't1', amount: 100 },
      operation: 'update', req: {} as never, collection: {} as never,
    } as never)
    expect((result as { uuid: string }).uuid).toBeDefined()
  })

  it('does NOT throw on restoreVersion — recomputes from the snapshot ALONE, not merged', async () => {
    const hook = tamperProofBeforeChangeHook('invoices')
    // The current row carries a different uuid; restoreVersion replays a prior
    // snapshot that legitimately carries its own (prior) uuid. The hook must NOT
    // treat that as a manual tamper, and must re-stamp from the RESTORED content
    // (amount 100), not the current doc (amount 250).
    const result = (await hook({
      data: { tenant: 't1', amount: 100, uuid: 'e1da2699-3ad2-803d-ba00-5b8e998518dd' },
      originalDoc: { tenant: 't1', amount: 250, uuid: 'be659290-af21-822e-ba00-64dc4d2e977e' },
      operation: 'update',
      req: { context: { isRestoringVersion: true } } as never,
      collection: {} as never,
    } as never)) as { uuid: string }
    const expected = encodeStructured({
      slotTag: SLOT_TAGS.collectionRow,
      capabilities: CAPABILITIES.TAMPER_PROOF,
      schemaVersion: 1,
      content: { tenant: 't1', amount: 100 },
      tenantId: 't1',
    })
    expect(result.uuid).toBe(expected) // from the snapshot (100), not the merge (250)
    expect(verifyContentUuid(result, 't1').ok).toBe(true) // the restored row is Law-8 consistent
  })
})
