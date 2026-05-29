/**
 * Sale immutability tests — mirror of the supto/reverse law: a completed sale
 * is frozen; only closed → reversed (+ reversedBy) is permitted.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard BG Наредба-Н-18 §СУПТО no-delete · reversal-only
 * @see src/services/sales/sale-immutability.ts
 */

import { describe, it, expect } from 'vitest'
import type { CollectionBeforeChangeHook } from 'payload'
import { enforceSaleImmutability } from './sale-immutability'

type HookArgs = Parameters<CollectionBeforeChangeHook>[0]

const run = (data: Record<string, unknown>, originalDoc: Record<string, unknown> | undefined, operation: 'create' | 'update') =>
  enforceSaleImmutability({ data, originalDoc, operation, req: {}, collection: undefined, context: {} } as unknown as HookArgs)

const CLOSED = { unp: '12345678-0042-0000001', status: 'closed', total: 1_200_00, items: [{ amount: 1_200_00 }] }

describe('enforceSaleImmutability', () => {
  it('allows edits while the sale is open', () => {
    expect(() => run({ total: 999 }, { status: 'open', total: 100 }, 'update')).not.toThrow()
  })

  it('allows the open → closed finalisation', () => {
    expect(() => run({ status: 'closed' }, { status: 'open' }, 'update')).not.toThrow()
  })

  it('rejects changing money on a closed sale', () => {
    expect(() => run({ total: 999 }, CLOSED, 'update')).toThrow(/immutable/)
  })

  it('rejects changing the items on a closed sale', () => {
    expect(() => run({ items: [{ amount: 1 }] }, CLOSED, 'update')).toThrow(/immutable/)
  })

  it('rejects changing the УНП on a closed sale', () => {
    expect(() => run({ unp: '12345678-0042-0000002' }, CLOSED, 'update')).toThrow(/immutable/)
  })

  it('permits the closed → reversed seal (сторно back-link)', () => {
    expect(() => run({ status: 'reversed', reversedBy: 'sale-2' }, CLOSED, 'update')).not.toThrow()
  })

  it('rejects any other transition off a completed sale', () => {
    expect(() => run({ status: 'open' }, CLOSED, 'update')).toThrow(/may only transition to 'reversed'/)
  })

  it('is a no-op on create', () => {
    expect(() => run({ total: 5 }, undefined, 'create')).not.toThrow()
  })
})
