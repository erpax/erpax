/**
 * УНП sequence hook tests — mirror of the supto/number law:
 * per-fiscal-device gapless sequence, frozen on creation.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО УНП
 * @see src/services/sales/unp-sequence.ts
 */

import { describe, it, expect, vi } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import { assignSaleUnpHook } from '@/sale/unp-sequence'

type HookArgs = Parameters<CollectionBeforeChangeHook>[0]

/** Build a beforeChange arg whose `req.payload.find` returns the given prior docs. */
const ctx = (priorDocs: Array<{ unpSequence: number }>): { find: ReturnType<typeof vi.fn> } => ({
  find: vi.fn().mockResolvedValue({ docs: priorDocs }),
})

const run = (
  hook: CollectionBeforeChangeHook,
  args: { data: Record<string, unknown>; operation: 'create' | 'update'; originalDoc?: Record<string, unknown>; find: ReturnType<typeof vi.fn> },
) =>
  hook({
    data: args.data,
    operation: args.operation,
    originalDoc: args.originalDoc,
    req: { payload: { find: args.find } },
    collection: undefined,
    context: {},
  } as unknown as HookArgs)

describe('assignSaleUnpHook — per-ФУ gapless УНП', () => {
  const hook = assignSaleUnpHook('sales')

  it('assigns 0000001 for the first sale on a fiscal device', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = { fiscalDeviceNumber: '12345678', operatorCode: '0042', tenant: 't1' }
    const out = (await run(hook, { data, operation: 'create', find })) as { unp: string; unpSequence: number }
    expect(out.unp).toBe('12345678-0042-0000001')
    expect(out.unpSequence).toBe(1)
  })

  it('advances gaplessly from the prior max sequence', async () => {
    const { find } = ctx([{ unpSequence: 41 }])
    const data: Record<string, unknown> = { fiscalDeviceNumber: '12345678', operatorCode: '0042', tenant: 't1' }
    const out = (await run(hook, { data, operation: 'create', find })) as { unp: string; unpSequence: number }
    expect(out.unp).toBe('12345678-0042-0000042')
    expect(out.unpSequence).toBe(42)
    // scoped query: by device + tenant, newest first
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'sales',
        where: { fiscalDeviceNumber: { equals: '12345678' }, tenant: { equals: 't1' } },
        sort: '-unpSequence',
      }),
    )
  })

  it('defaults the operator code to 0000 when absent', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = { fiscalDeviceNumber: '00000001', tenant: 't1' }
    const out = (await run(hook, { data, operation: 'create', find })) as { unp: string }
    expect(out.unp).toBe('00000001-0000-0000001')
  })

  it('is idempotent — keeps an already-valid УНП', async () => {
    const { find } = ctx([{ unpSequence: 99 }])
    const data: Record<string, unknown> = { unp: '12345678-0042-0000005', fiscalDeviceNumber: '12345678' }
    const out = (await run(hook, { data, operation: 'create', find })) as { unp: string }
    expect(out.unp).toBe('12345678-0042-0000005')
    expect(find).not.toHaveBeenCalled()
  })

  it('does nothing for an OPEN draft without a fiscal device (numbered later)', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = { operatorCode: '0042' }
    const out = (await run(hook, { data, operation: 'create', find })) as { unp?: string }
    expect(out.unp).toBeUndefined()
    expect(find).not.toHaveBeenCalled()
  })

  it('rejects creating a CLOSED cash/card sale without a fiscal device (no СУПТО bypass)', async () => {
    const { find } = ctx([])
    await expect(
      run(hook, { data: { status: 'closed', paymentType: 'card', operatorCode: '0042' }, operation: 'create', find }),
    ).rejects.toThrow(/no СУПТО bypass/)
  })

  it('allows a CLOSED bank-transfer sale without a device (чл. 3 ал. 1 — out of scope)', async () => {
    const { find } = ctx([])
    const out = (await run(hook, {
      data: { status: 'closed', paymentType: 'bank_transfer' },
      operation: 'create',
      find,
    })) as { unp?: string }
    expect(out.unp).toBeUndefined() // lawfully unfiscalized
    expect(find).not.toHaveBeenCalled()
  })

  it('rejects closing an unnumbered sale that has no fiscal device (no bypass)', async () => {
    const { find } = ctx([])
    await expect(
      run(hook, { data: { status: 'closed' }, operation: 'update', originalDoc: {}, find }),
    ).rejects.toThrow(/no СУПТО bypass/)
  })

  it('assigns the УНП when an unnumbered sale is closed on its device', async () => {
    const { find } = ctx([{ unpSequence: 6 }])
    const out = (await run(hook, {
      data: { status: 'closed', operatorCode: '0042' },
      operation: 'update',
      originalDoc: { fiscalDeviceNumber: '12345678' },
      find,
    })) as { unp: string; unpSequence: number }
    expect(out.unp).toBe('12345678-0042-0000007')
    expect(out.unpSequence).toBe(7)
  })

  it('freezes the УНП on update — rejects a change', async () => {
    const { find } = ctx([])
    await expect(
      run(hook, {
        data: { unp: '12345678-0042-0000002' },
        operation: 'update',
        originalDoc: { unp: '12345678-0042-0000001' },
        find,
      }),
    ).rejects.toThrow(/frozen at creation/)
  })

  it('leaves the УНП untouched on a non-mutating update', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = { unp: '12345678-0042-0000001', status: 'closed' }
    const out = (await run(hook, { data, operation: 'update', originalDoc: { unp: '12345678-0042-0000001' }, find })) as { unp: string }
    expect(out.unp).toBe('12345678-0042-0000001')
    expect(find).not.toHaveBeenCalled()
  })
})
