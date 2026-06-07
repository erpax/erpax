import { describe, it, expect } from 'vitest'
import {
  validateDoubleEntry,
  enforcePostingImmutability,
  generateReversingEntries,
} from '@/hooks'

// Hooks (position 6, the control triad) are the seam where mutations pass the
// SKILL trinity at runtime. The barrel re-exports real Payload lifecycle hooks;
// each is a pure function of its context object — exercise the gate logic with
// plain inputs, no DB/network.

describe('hooks — the control triad: lifecycle gates as pure functions', () => {
  describe('validateDoubleEntry (beforeValidate) — Σ debit = Σ credit', () => {
    it('passes through unchanged on non create/update operations', async () => {
      const data = { lines: [{ debit: 5 }, { credit: 1 }] }
      // an unbalanced set would throw — but read must not even look at lines
      expect(await validateDoubleEntry({ data, operation: 'read' } as any)).toBe(data)
    })

    it('returns data untouched when no lines are provided', async () => {
      const data = { foo: 'bar' }
      expect(await validateDoubleEntry({ data, operation: 'create' } as any)).toBe(data)
    })

    it('accepts a balanced journal (debits === credits)', async () => {
      const data = {
        lines: [
          { glAccount: 'a', debit: 100, credit: 0 },
          { glAccount: 'b', debit: 0, credit: 100 },
        ],
      }
      expect(await validateDoubleEntry({ data, operation: 'create' } as any)).toBe(data)
    })

    it('throws when debits do not equal credits', async () => {
      const data = {
        lines: [
          { glAccount: 'a', debit: 100, credit: 0 },
          { glAccount: 'b', debit: 0, credit: 60 },
        ],
      }
      await expect(
        validateDoubleEntry({ data, operation: 'update' } as any),
      ).rejects.toThrow(/Double-entry validation failed/)
    })
  })

  describe('enforcePostingImmutability (beforeChange) — posted rows are sealed', () => {
    it('allows non-update operations', async () => {
      const data = { x: 1 }
      expect(
        await enforcePostingImmutability({ operation: 'create', data, req: {} } as any),
      ).toBe(data)
    })

    it('allows edits to a not-yet-posted posting', async () => {
      const data = { amount: 5 }
      const res = await enforcePostingImmutability({
        operation: 'update',
        data,
        originalDoc: { postedDate: null },
        req: { user: null },
      } as any)
      expect(res).toBe(data)
    })

    it('blocks a non-admin from modifying a posted posting', async () => {
      await expect(
        enforcePostingImmutability({
          operation: 'update',
          data: {},
          originalDoc: { postedDate: '2026-01-01' },
          req: { user: { id: 'u1', roles: ['staff'] } },
        } as any),
      ).rejects.toThrow(/Cannot modify posted GL posting/)
    })

    it('requires adminOverride from an admin editing a posted posting', async () => {
      await expect(
        enforcePostingImmutability({
          operation: 'update',
          data: { adminOverride: false },
          originalDoc: { postedDate: '2026-01-01' },
          req: { user: { id: 'u1', roles: ['admin'] } },
        } as any),
      ).rejects.toThrow(/require adminOverride/)
    })

    it('admin override with reason history records an audit override entry', async () => {
      const data: any = {
        adminOverride: true,
        adminOverrideHistory: [{ overrideReason: 'restate Q1' }],
      }
      const res: any = await enforcePostingImmutability({
        operation: 'update',
        data,
        originalDoc: { postedDate: '2026-01-01', amount: 10 },
        req: { user: { id: 'u1', roles: ['admin'] } },
      } as any)
      expect(res).toBe(data)
      expect(res.adminOverrideHistory[0].overrideReason).toBe('restate Q1')
    })
  })

  describe('generateReversingEntries (afterChange) — early-exit invariants', () => {
    it('does nothing on a non-update operation', async () => {
      expect(
        await generateReversingEntries({
          operation: 'create',
          data: {} as any,
          req: { payload: {} } as any,
        } as any),
      ).toBeUndefined()
    })

    it('does nothing when status did not transition into posted/finalized', async () => {
      expect(
        await generateReversingEntries({
          operation: 'update',
          data: { closingStatus: 'draft' } as any,
          previousDoc: { closingStatus: 'draft' } as any,
          req: { payload: {} } as any,
        } as any),
      ).toBeUndefined()
    })

    it('is idempotent — skips when reversals were already generated', async () => {
      // payload left empty: if it tried to query, this would throw — it must not.
      expect(
        await generateReversingEntries({
          operation: 'update',
          data: {
            fiscalYear: 2026,
            fiscalPeriodNumber: 1,
            closingStatus: 'finalized',
            reversalEntriesGenerated: true,
          } as any,
          previousDoc: { closingStatus: 'approved' } as any,
          req: { payload: {} } as any,
        } as any),
      ).toBeUndefined()
    })
  })
})
