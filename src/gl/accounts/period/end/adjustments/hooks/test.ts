/**
 * Replaces a generated leftover-wave placeholder that asserted the source `toMatch(/\bexport\b/)` —
 * a tautology under a heading, the shape rules/refutable exists to refuse. These are behavioural:
 * each one fails if the hook stops rethrowing, stops logging, or stops back-linking.
 */
import { describe, expect, it, vi } from 'vitest'

import { PostingOverrideNested, type PostingService, withPostingService } from '@/journal/entry/service'

import { periodEndAdjustmentPostingHook } from './adjustment'

/**
 * The rethrow these hooks carry — "DO NOT SWALLOW: the ledger and the record silently disagreeing" —
 * had no test, and the reason was coupling rather than the TDZ: each hook reached the posting
 * singleton directly, so exercising its failure path meant booting Payload and making a real posting
 * fail. `postingService()` is the seam; this substitutes for one call and proves the failure surfaces.
 */
const logger = () => ({ warn: vi.fn(), error: vi.fn(), info: vi.fn() })

const reqWith = (log = logger()) =>
  ({
    user: { id: 'u1' },
    payload: { logger: log, update: vi.fn().mockResolvedValue({}) },
  }) as never

const posted = {
  id: 'adj-1',
  tenant: 't1',
  status: 'posted',
  adjustmentType: 'accrual',
  description: 'year-end accrual',
  debitAccount: 'acc-debit',
  creditAccount: 'acc-credit',
  adjustmentAmount: 250,
  period: '2026-01-31',
}
const draft = { ...posted, status: 'draft', id: 'adj-1' }

const failing = (where: 'createEntry' | 'postEntry', err: Error): PostingService => ({
  createEntry: where === 'createEntry' ? vi.fn().mockRejectedValue(err) : vi.fn().mockResolvedValue({ id: 'je-1' }),
  postEntry: where === 'postEntry' ? vi.fn().mockRejectedValue(err) : vi.fn().mockResolvedValue(undefined),
}) as unknown as PostingService

describe('period-end-adjustment — the JE failure is NOT swallowed', () => {
  it('a failing createEntry surfaces to the caller instead of a green 200', async () => {
    const boom = new Error('journal entry rejected: unbalanced')
    await expect(
      withPostingService(failing('createEntry', boom), () =>
        periodEndAdjustmentPostingHook({ doc: posted, previousDoc: draft, req: reqWith(), operation: 'update' } as never),
      ),
    ).rejects.toThrow('journal entry rejected: unbalanced')
  })

  it('a failing postEntry also surfaces — the row is posted, the ledger is not', async () => {
    const boom = new Error('period is locked')
    await expect(
      withPostingService(failing('postEntry', boom), () =>
        periodEndAdjustmentPostingHook({ doc: posted, previousDoc: draft, req: reqWith(), operation: 'update' } as never),
      ),
    ).rejects.toThrow('period is locked')
  })

  it('and it LOGS before rethrowing — the auditor gets the reason, not only the failure', async () => {
    const log = logger()
    await expect(
      withPostingService(failing('postEntry', new Error('locked')), () =>
        periodEndAdjustmentPostingHook({ doc: posted, previousDoc: draft, req: reqWith(log), operation: 'update' } as never),
      ),
    ).rejects.toThrow()
    expect(log.error).toHaveBeenCalled()
  })

  it('the happy path back-links the journal entry onto the adjustment', async () => {
    const svc = {
      createEntry: vi.fn().mockResolvedValue({ id: 'je-99' }),
      postEntry: vi.fn().mockResolvedValue(undefined),
    } as unknown as PostingService
    const req = reqWith()
    await withPostingService(svc, () =>
      periodEndAdjustmentPostingHook({ doc: posted, previousDoc: draft, req, operation: 'update' } as never),
    )
    expect((svc.createEntry as ReturnType<typeof vi.fn>)).toHaveBeenCalled()
    expect((req as unknown as { payload: { update: ReturnType<typeof vi.fn> } }).payload.update).toHaveBeenCalledWith(
      expect.objectContaining({ data: { journalEntry: 'je-99' } }),
    )
  })

  it('an already-linked adjustment does not post twice — idempotent', async () => {
    const svc = { createEntry: vi.fn(), postEntry: vi.fn() } as unknown as PostingService
    await withPostingService(svc, () =>
      periodEndAdjustmentPostingHook({
        doc: { ...posted, journalEntry: 'je-existing' },
        previousDoc: draft,
        req: reqWith(),
        operation: 'update',
      } as never),
    )
    expect(svc.createEntry).not.toHaveBeenCalled()
  })
})

describe('the seam cannot leak', () => {
  it('the override is restored even when the body throws', async () => {
    const { postingService, journalEntryService } = await import('@/journal/entry/service')
    await expect(
      withPostingService({ createEntry: vi.fn(), postEntry: vi.fn() } as unknown as PostingService, () => {
        throw new Error('body failed')
      }),
    ).rejects.toThrow('body failed')
    expect(postingService()).toBe(journalEntryService) // back to production, not the stub
  })

  it('NESTING IS REFUSED — a forgotten restore cannot quietly retarget another test', async () => {
    const stub = { createEntry: vi.fn(), postEntry: vi.fn() } as unknown as PostingService
    await expect(withPostingService(stub, () => withPostingService(stub, async () => 'inner'))).rejects.toThrow(
      PostingOverrideNested,
    )
  })
})
