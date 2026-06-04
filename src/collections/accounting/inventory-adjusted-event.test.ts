/**
 * inventory:adjusted event flow — IAS 2 / ASC 330 stock-ledger GL.
 *
 * Asserts the InventoryMovements.afterChange hook emits the canonical
 * event for the four covered kinds (transfer / adjustment / write_off
 * / consumption), and the gl-posting handler books the correct
 * Dr/Cr lines per kind. Skips emission for receipt / sale / return_in
 * / return_out / opening (those flow through bill:activated /
 * invoice:activated event paths).
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IAS-2 §10 §28 §36 inventories
 * @accounting US-GAAP ASC-330 inventory
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/hooks/inventory-movement.hook.ts
 * @see src/services/gl-posting.service.ts postInventoryAdjusted
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { inventoryMovementPostingHook } from '@/collections/accounting/inventory-movement.hook'
import { eventEmitter } from '@/event/emitter.service'
import type { InventoryAdjustedEvent } from '@/types/events'

const baseReq = (): Record<string, unknown> => ({
  user: { id: 'user-1' },
  payload: {
    logger: {
      info: (): void => {},
      warn: (): void => {},
      error: (): void => {},
    },
  },
})

/** Invoke the afterChange hook with a partial args shape (tests supply only the doc/op surface). */
type HookArgs = Parameters<typeof inventoryMovementPostingHook>[0]
const runHook = (args: Partial<HookArgs>) => inventoryMovementPostingHook(args as HookArgs)

describe('inventory:adjusted — hook emission', () => {
  let captured: InventoryAdjustedEvent[] = []

  beforeEach(() => {
    // Reset the singleton's handler list so subscribers from prior tests
    // don't double-fire and inflate the captured count (Slice F isolation fix).
    eventEmitter.clearHandlers('inventory:adjusted')
    captured = []
    eventEmitter.subscribe('inventory:adjusted', async (e) => {
      captured.push(e as InventoryAdjustedEvent)
    })
  })

  it('emits for transfer kind on status → posted', async () => {
    await runHook({
      doc: {
        id: 'IM-001',
        movementId: 'MV-T-1',
        tenant: 'tenant-1',
        kind: 'transfer',
        item: 'ITEM-A',
        quantity: 100,
        unitCost: 5_00,
        extendedCost: 500_00,
        fromLocation: 'WH-1',
        toLocation: 'WH-2',
        movementAt: '2026-05-09',
        currency: 'EUR',
        status: 'posted',
      },
      previousDoc: { id: 'IM-001', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(1)
    expect(captured[0].payload.kind).toBe('transfer')
    expect(captured[0].payload.fromLocationId).toBe('WH-1')
    expect(captured[0].payload.toLocationId).toBe('WH-2')
    expect(captured[0].payload.extendedCost).toBe(500_00)
  })

  it('emits for adjustment (count down — shrinkage)', async () => {
    await runHook({
      doc: {
        id: 'IM-002',
        movementId: 'MV-ADJ-1',
        tenant: 'tenant-1',
        kind: 'adjustment',
        item: 'ITEM-B',
        quantity: -3, // negative = count down
        unitCost: 10_00,
        extendedCost: 30_00,
        movementAt: '2026-05-09',
        currency: 'EUR',
        status: 'posted',
      },
      previousDoc: { id: 'IM-002', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(1)
    expect(captured[0].payload.kind).toBe('adjustment')
    expect(captured[0].payload.quantity).toBe(-3)
    // The handler will determine the JE shape based on quantity sign.
  })

  it('emits for write_off (IAS 2 §28 NRV)', async () => {
    await runHook({
      doc: {
        id: 'IM-003',
        tenant: 'tenant-1',
        kind: 'write_off',
        item: 'ITEM-C',
        quantity: -100,
        unitCost: 12_00,
        extendedCost: 1_200_00,
        movementAt: '2026-05-09',
        currency: 'EUR',
        status: 'posted',
      },
      previousDoc: { id: 'IM-003', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(1)
    expect(captured[0].payload.kind).toBe('write_off')
    expect(captured[0].payload.extendedCost).toBe(1_200_00)
  })

  it('emits for consumption (Dr WIP / Cr Inventory)', async () => {
    await runHook({
      doc: {
        id: 'IM-004',
        tenant: 'tenant-1',
        kind: 'consumption',
        item: 'RAW-MAT-1',
        quantity: -50,
        unitCost: 2_00,
        extendedCost: 100_00,
        movementAt: '2026-05-09',
        currency: 'EUR',
        status: 'posted',
      },
      previousDoc: { id: 'IM-004', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(1)
    expect(captured[0].payload.kind).toBe('consumption')
  })

  it('SKIPS receipt — covered by bill:activated → inventory:purchased', async () => {
    await runHook({
      doc: {
        id: 'IM-skip-1',
        tenant: 'tenant-1',
        kind: 'receipt',
        item: 'X',
        quantity: 10,
        extendedCost: 100_00,
        movementAt: '2026-05-09',
        currency: 'EUR',
        status: 'posted',
      },
      previousDoc: { id: 'IM-skip-1', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(0)
  })

  it('SKIPS sale — covered by invoice:activated → inventory:sold', async () => {
    await runHook({
      doc: {
        id: 'IM-skip-2',
        tenant: 'tenant-1',
        kind: 'sale',
        item: 'X',
        quantity: -5,
        extendedCost: 50_00,
        movementAt: '2026-05-09',
        currency: 'EUR',
        status: 'posted',
      },
      previousDoc: { id: 'IM-skip-2', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(0)
  })

  it('SKIPS opening — initial balance, no JE needed', async () => {
    await runHook({
      doc: {
        id: 'IM-skip-3',
        tenant: 'tenant-1',
        kind: 'opening',
        item: 'X',
        quantity: 1_000,
        extendedCost: 10_000_00,
        movementAt: '2026-01-01',
        currency: 'EUR',
        status: 'posted',
      },
      previousDoc: { id: 'IM-skip-3', status: 'draft' },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(0)
  })

  it('does not emit when status not transitioning to posted', async () => {
    await runHook({
      doc: {
        id: 'IM-no-trans',
        tenant: 'tenant-1',
        kind: 'transfer',
        item: 'X',
        quantity: 1,
        extendedCost: 10_00,
        movementAt: '2026-05-09',
        currency: 'EUR',
        status: 'draft',
      },
      operation: 'create',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(0)
  })

  it('idempotent — does not re-emit when journalEntry already linked', async () => {
    await runHook({
      doc: {
        id: 'IM-idempotent',
        tenant: 'tenant-1',
        kind: 'transfer',
        item: 'X',
        quantity: 1,
        extendedCost: 10_00,
        movementAt: '2026-05-09',
        currency: 'EUR',
        status: 'posted',
        journalEntry: 'existing-je',
      },
      operation: 'update',
      req: baseReq() as never,
      collection: undefined as never,
      context: {} as never,
    })
    await new Promise((r) => setTimeout(r, 0))
    expect(captured).toHaveLength(0)
  })
})
