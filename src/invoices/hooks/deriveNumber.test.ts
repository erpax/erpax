/**
 * Invoice number collapse — deriveInvoiceNumber beforeValidate hook.
 *
 * @standard EN-16931:2017 BT-1 invoice-number
 * @standard ISO/IEC-29119:2022 software-testing
 * @see src/invoices/hooks/deriveNumber.ts
 */

import { describe, it, expect, vi } from 'vitest'
import type { CollectionBeforeValidateHook } from 'payload'
import {
  deriveInvoiceNumber,
  deriveInvoiceNumberFromBonds,
  formatInvoiceNumber,
  invoiceNumberPrefix,
  nextInvoiceSequence,
} from './deriveNumber'

type HookArgs = Parameters<CollectionBeforeValidateHook>[0]

const ctx = (priorDocs: Array<{ number?: string }>) => ({
  find: vi.fn().mockResolvedValue({ docs: priorDocs }),
})

const run = (args: {
  data: Record<string, unknown>
  operation: 'create' | 'update'
  originalDoc?: Record<string, unknown>
  find: ReturnType<typeof vi.fn>
}) =>
  deriveInvoiceNumber({
    data: args.data,
    operation: args.operation,
    originalDoc: args.originalDoc,
    req: { payload: { find: args.find } },
    collection: undefined,
    context: {},
  } as unknown as HookArgs)

const year = new Date().getFullYear()

describe('deriveInvoiceNumber — helpers', () => {
  it('formats tenant-scoped sequential numbers', () => {
    expect(formatInvoiceNumber('INV', year, 1)).toBe(`INV-${year}-001`)
    expect(formatInvoiceNumber('BILL', year, 42)).toBe(`BILL-${year}-042`)
  })

  it('collapses from explicit number, fiscal.unp, then protocolNumber', () => {
    expect(deriveInvoiceNumberFromBonds({ number: 'EXPLICIT-1' })).toBe('EXPLICIT-1')
    expect(
      deriveInvoiceNumberFromBonds({
        fiscal: { unp: 'UNP-123' },
        protocolNumber: 'PROT-9',
      }),
    ).toBe('UNP-123')
    expect(deriveInvoiceNumberFromBonds({ protocolNumber: 'PROT-9' })).toBe('PROT-9')
  })

  it('selects prefix from invoice type', () => {
    expect(invoiceNumberPrefix({ typeStatus: { invoiceType: 'bill' } })).toBe('BILL')
    expect(invoiceNumberPrefix({ typeStatus: { invoiceType: 'credit_note' } })).toBe('CN')
    expect(invoiceNumberPrefix({})).toBe('INV')
  })
})

describe('deriveInvoiceNumber — issued collapse', () => {
  it('does nothing while status remains draft', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = { status: 'draft' }
    const out = (await run({ data, operation: 'create', find })) as { number?: string }
    expect(out.number).toBeUndefined()
    expect(find).not.toHaveBeenCalled()
  })

  it('collapses from fiscal.unp on first issuance', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = {
      status: 'issued',
      fiscal: { unp: 'UNP-777' },
    }
    const out = (await run({ data, operation: 'create', find })) as { number: string }
    expect(out.number).toBe('UNP-777')
    expect(find).not.toHaveBeenCalled()
  })

  it('collapses from protocolNumber when no higher-priority bond', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = {
      status: 'confirmed',
      protocolNumber: 'PROT-42',
    }
    const out = (await run({ data, operation: 'create', find })) as { number: string }
    expect(out.number).toBe('PROT-42')
    expect(find).not.toHaveBeenCalled()
  })

  it('preserves prevNumber on re-validation when bonds are absent', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = { status: 'issued' }
    const out = (await run({
      data,
      operation: 'update',
      originalDoc: { status: 'draft', number: 'INV-2024-099' },
      find,
    })) as { number: string }
    expect(out.number).toBe('INV-2024-099')
    expect(find).not.toHaveBeenCalled()
  })
})

describe('deriveInvoiceNumber — frozen after issue', () => {
  it('rejects changing the number on an already-issued invoice', async () => {
    const { find } = ctx([])
    await expect(
      run({
        data: { status: 'issued', number: 'INV-NEW' },
        operation: 'update',
        originalDoc: { status: 'issued', number: 'INV-OLD' },
        find,
      }),
    ).rejects.toThrow(/frozen after issuance/)
  })

  it('restores prevNumber when incoming number is cleared', async () => {
    const { find } = ctx([])
    const out = (await run({
      data: { status: 'paid' },
      operation: 'update',
      originalDoc: { status: 'issued', number: 'INV-2026-001' },
      find,
    })) as { number: string }
    expect(out.number).toBe('INV-2026-001')
    expect(find).not.toHaveBeenCalled()
  })

  it('allows a non-mutating update with the same number', async () => {
    const { find } = ctx([])
    const out = (await run({
      data: { status: 'issued', number: 'INV-2026-001', totalAmount: 100 },
      operation: 'update',
      originalDoc: { status: 'issued', number: 'INV-2026-001' },
      find,
    })) as { number: string }
    expect(out.number).toBe('INV-2026-001')
    expect(find).not.toHaveBeenCalled()
  })
})

describe('deriveInvoiceNumber — sequence fallback', () => {
  it('allocates INV-YYYY-001 when no bonds exist', async () => {
    const { find } = ctx([])
    const data: Record<string, unknown> = { status: 'issued', tenant: 'tenant-1' }
    const out = (await run({ data, operation: 'create', find })) as { number: string }
    expect(out.number).toBe(`INV-${year}-001`)
    expect(find).toHaveBeenCalledWith(
      expect.objectContaining({
        collection: 'invoices',
        where: {
          and: [
            { number: { like: `INV-${year}-%` } },
            { tenant: { equals: 'tenant-1' } },
          ],
        },
        sort: '-number',
      }),
    )
  })

  it('advances from the prior max tenant-scoped sequence', async () => {
    const { find } = ctx([{ number: `BILL-${year}-007` }, { number: `BILL-${year}-003` }])
    const data: Record<string, unknown> = {
      status: 'active',
      tenant: 'tenant-1',
      typeStatus: { invoiceType: 'bill' },
    }
    const out = (await run({ data, operation: 'create', find })) as { number: string }
    expect(out.number).toBe(`BILL-${year}-008`)
  })
})

describe('nextInvoiceSequence', () => {
  it('ignores numbers that do not match prefix-year pattern', async () => {
    const find = vi.fn().mockResolvedValue({
      docs: [{ number: `INV-${year}-005` }, { number: 'LEGACY-99' }],
    })
    const seq = await nextInvoiceSequence(
      { payload: { find } } as HookArgs['req'],
      'tenant-1',
      'INV',
      year,
    )
    expect(seq).toBe(6)
  })
})
