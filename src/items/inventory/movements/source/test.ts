import { describe, it, expect } from 'vitest'
import { deriveMovements, fromGoodsReceipt, fromReturn, fromShipment } from '@/items/inventory/movements/source'

const NOW = '2026-04-01T00:00:00.000Z'
type GR = Parameters<typeof fromGoodsReceipt>[0]
type SH = Parameters<typeof fromShipment>[0]
type RT = Parameters<typeof fromReturn>[0]

const receipt = {
  id: 'gr1', receivedDate: '2026-03-30T00:00:00.000Z', tenant: { id: 't1' }, status: 'accepted',
  lines: [
    { id: 'l1', item: 'bolt', quantityReceived: 100, quantityDamaged: 4 },
    { id: 'l2', item: { id: 'nut' }, quantityReceived: 50 },
    { id: 'l3', item: 'washer', quantityReceived: 5, quantityDamaged: 5 },
    { id: 'l4', description: 'freight, no item', quantityReceived: 1 },
  ],
}

describe('movements/source — a goods receipt brings in what arrived in good condition', () => {
  const out = fromGoodsReceipt(receipt as unknown as GR)

  it('one inbound movement per usable line, damaged units excluded', () => {
    expect(out.map((m) => [m.item, m.quantity])).toEqual([['bolt', 96], ['nut', 50]])
    expect(out.every((m) => m.kind === 'receipt' && m.quantity > 0)).toBe(true)
  })

  it('traces each movement to its document and line, as a draft in the document tenant', () => {
    expect(out[0]).toMatchObject({ movementId: 'GR-gr1-l1', sourceDocumentType: 'goods_receipt', sourceDocumentId: 'gr1', movementAt: receipt.receivedDate, status: 'draft', tenant: 't1' })
  })
})

describe('movements/source — a shipment takes out, a return brings back', () => {
  it('ships a negative quantity per line, dated by the shipment', () => {
    const out = fromShipment({ id: 's1', shippedAt: '2026-03-31T00:00:00.000Z', lines: [{ id: 'a', item: 'bolt', quantity: 10 }, { id: 'b', quantity: 3 }] } as unknown as SH, NOW)
    expect(out).toMatchObject([{ movementId: 'SH-s1-a', kind: 'sale', item: 'bolt', quantity: -10, movementAt: '2026-03-31T00:00:00.000Z', sourceDocumentType: 'shipment' }])
  })

  it('falls back to now when the shipment carries no date, and yields nothing without lines', () => {
    expect(fromShipment({ id: 's2', lines: [{ id: 'a', item: 'bolt', quantity: 1 }] } as unknown as SH, NOW)[0]!.movementAt).toBe(NOW)
    expect(fromShipment({ id: 's3', lines: null } as unknown as SH, NOW)).toEqual([])
  })

  it('restocks only the return lines marked for it', () => {
    const out = fromReturn({ id: 'r1', restockedAt: NOW, lines: [{ id: 'a', item: 'bolt', quantityReturned: 2, restock: true }, { id: 'b', item: 'nut', quantityReturned: 9, restock: false }] } as unknown as RT, NOW)
    expect(out).toMatchObject([{ movementId: 'RT-r1-a', kind: 'return_in', item: 'bolt', quantity: 2, sourceDocumentType: 'return' }])
  })
})

/** A stand-in for the one read and the writes the hook makes. */
function fake(existing: { movementId: string }[] = []) {
  const calls: Record<string, unknown>[] = []
  const payload = {
    find: async (a: Record<string, unknown>) => { calls.push(a); return { docs: existing } },
    create: async (a: Record<string, unknown>) => { calls.push(a); return a.data },
  }
  const req = { payload }
  const run = (source: Parameters<typeof deriveMovements>[0], doc: unknown, previousDoc?: unknown, context: Record<string, unknown> = {}) =>
    deriveMovements(source)({ doc, previousDoc, req, context } as never)
  return { run, calls, req, created: () => calls.filter((c) => 'data' in c).map((c) => c.data as { movementId: string }) }
}

describe('movements/source — the hook writes them when stock has moved, once', () => {
  it('creates the movements when a receipt is accepted, inside the same request', async () => {
    const f = fake()
    await f.run('goods-receipts', receipt, { status: 'pending' })
    expect(f.created().map((m) => m.movementId)).toEqual(['GR-gr1-l1', 'GR-gr1-l2'])
    expect(f.calls.every((c) => c.req === f.req)).toBe(true)
  })

  it('writes nothing before stock has moved, nor when the document was already there', async () => {
    const f = fake()
    await f.run('goods-receipts', { ...receipt, status: 'pending' }, undefined)
    await f.run('goods-receipts', receipt, { status: 'partial' })
    await f.run('shipments', { id: 's1', status: 'packed', lines: [{ item: 'bolt', quantity: 1 }] }, { status: 'pending' })
    expect(f.calls).toEqual([])
  })

  it('skips a line whose movement already exists', async () => {
    const f = fake([{ movementId: 'GR-gr1-l1' }])
    await f.run('goods-receipts', receipt, { status: 'pending' })
    expect(f.created().map((m) => m.movementId)).toEqual(['GR-gr1-l2'])
  })

  it('does not re-enter on its own writes', async () => {
    const f = fake()
    await f.run('returns', { id: 'r1', status: 'restocked', lines: [{ item: 'bolt', quantityReturned: 1, restock: true }] }, { status: 'received' }, { movementsDerived: true })
    expect(f.calls).toEqual([])
  })
})
