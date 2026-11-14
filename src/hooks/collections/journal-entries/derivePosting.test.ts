import { describe, it, expect } from 'vitest'
import { derivePosting, postingFor } from '@/hooks/collections/journal-entries/derivePosting'

const entry = {
  id: 'je-1',
  entryDate: '2026-03-31T00:00:00.000Z',
  sourceType: 'invoice' as const,
  sourceId: 'inv-9',
  tenant: { id: 't1' },
  status: 'posted' as const,
  lines: [
    { glAccount: { id: 'acc-ar' }, accountNumber: '411', accountName: 'Receivables', debit: 120, credit: 0, currency: 'EUR' },
    { glAccount: 'acc-rev', accountNumber: '701', debit: null, credit: 100 },
    { glAccount: 'acc-vat', accountNumber: '4532', credit: 20 },
  ],
}
type Entry = Parameters<typeof postingFor>[0]

describe('journal/entries/posting — the posting is the entry, restated', () => {
  const posting = postingFor(entry as unknown as Entry)

  it('carries the entry date, its source and a line per account', () => {
    expect(posting).toMatchObject({ postingId: 'GLP-je-1', sourceType: 'invoice', sourceId: 'inv-9', sourceDate: entry.entryDate, journalEntry: 'je-1', status: 'posted', tenant: 't1' })
    expect(posting.accountsAffected.map((a) => a.glAccount)).toEqual(['acc-ar', 'acc-rev', 'acc-vat'])
  })

  it('inherits the entry balance — totals equal, a missing side is zero', () => {
    const debit = posting.accountsAffected.reduce((n, a) => n + a.debitAmount, 0)
    const credit = posting.accountsAffected.reduce((n, a) => n + a.creditAmount, 0)
    expect(debit).toBe(120)
    expect(credit).toBe(120)
  })

  it('names the source as the ledger does, and falls back to the entry when it has no source id', () => {
    expect(postingFor({ ...entry, sourceType: 'manual', sourceId: null } as unknown as Entry)).toMatchObject({ sourceType: 'manual_entry', sourceId: 'je-1' })
    expect(postingFor({ ...entry, sourceType: 'bank_reconciliation' } as unknown as Entry).sourceType).toBe('bank_statement')
    expect(postingFor({ ...entry, sourceType: 'lease_period' } as unknown as Entry).sourceType).toBe('period_end_adjustment')
  })
})

/** A stand-in for the one read and one write the hook makes. */
function fake(existing: unknown[] = [], fail?: Error) {
  const calls: Record<string, unknown>[] = []
  const payload = {
    find: async (args: Record<string, unknown>) => { calls.push(args); return { docs: existing } },
    create: async (args: Record<string, unknown>) => { calls.push(args); if (fail) throw fail; return args.data },
  }
  const req = { payload }
  const run = (doc: unknown, previousDoc?: unknown, context: Record<string, unknown> = {}) =>
    derivePosting({ doc, previousDoc, req, context } as unknown as Parameters<typeof derivePosting>[0])
  return { run, calls, req, created: () => calls.filter((c) => 'data' in c) }
}

describe('journal/entries/posting — the hook writes it once, on the transition', () => {
  it('creates the posting when an entry becomes posted, inside the same request', async () => {
    const f = fake()
    await f.run(entry, { status: 'draft' })
    expect(f.created()).toHaveLength(1)
    expect(f.created()[0]!.data).toMatchObject({ postingId: 'GLP-je-1', postingDate: entry.entryDate, entity: 't1' })
    expect(f.calls.every((c) => c.req === f.req)).toBe(true)
  })

  it('writes nothing for a draft, for an entry already posted, or for its own write', async () => {
    const f = fake()
    await f.run({ ...entry, status: 'draft' }, undefined)
    await f.run(entry, { status: 'posted' })
    await f.run(entry, { status: 'draft' }, { postingDerived: true })
    expect(f.calls).toEqual([])
  })

  it('writes no second posting for an entry that already has one', async () => {
    const f = fake([{ id: 'p1', postingId: 'GLP-je-1' }])
    await f.run(entry, { status: 'draft' })
    expect(f.created()).toEqual([])
  })

  it('does not swallow a refusal — an entry the ledger rejects has not been posted', async () => {
    const f = fake([], new Error('fiscal period unresolved'))
    await expect(f.run(entry, { status: 'draft' })).rejects.toThrow('fiscal period unresolved')
  })
})
