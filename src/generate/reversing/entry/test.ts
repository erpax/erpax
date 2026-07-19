import { describe, it, expect, vi } from 'vitest'
import { generateReversingEntries } from '@/generate/reversing/entry'

// The pin this atom was missing: the period-lock check is FAIL-CLOSED. A lock query that
// THROWS is not an open period — it is an unverified one, and the hook must refuse, never
// warn-and-continue (the empty-try period-lock class, SOX §404). An ABSENT lock doc stays
// open-by-design: no lock exists, the reversal proceeds to its own emptiness check.

const args = (payload: unknown) =>
  ({
    operation: 'update',
    previousDoc: { closingStatus: 'approved' },
    data: {
      closingStatus: 'posted',
      reversalEntriesGenerated: false,
      fiscalYear: 2026,
      fiscalPeriodNumber: 3,
      closingDate: '2026-03-31',
      entity: 'entity-1',
      closingEntries: [],
    },
    req: { payload },
  }) as never

describe('generateReversingEntries — the period lock is fail-closed', () => {
  it('a lock query that THROWS refuses the post — never warn-and-continue', async () => {
    const payload = {
      find: vi.fn().mockRejectedValue(new Error('D1 unavailable')),
      logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    }
    await expect(generateReversingEntries(args(payload))).rejects.toThrow(/unverifiable period/)
  })

  it('an ABSENT lock doc is open-by-design — the hook proceeds past the lock stage', async () => {
    const payload = {
      find: vi.fn().mockResolvedValue({ docs: [] }),
      logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
    }
    // no closingEntries ⇒ returns quietly AFTER the lock stage — reaching there is the assertion
    await expect(generateReversingEntries(args(payload))).resolves.toBeUndefined()
    expect(payload.find).toHaveBeenCalledTimes(1)
  })
})
