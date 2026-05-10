/**
 * FinanceAgent contract tests — verifies the agent declares the right
 * collections + subscriptions + emits, and that its onChainStep /
 * onEvent hooks return the expected AgentEffect[] shapes.
 *
 * Slice EEEEE pilot.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect, vi } from 'vitest'
import { FinanceAgent } from './finance.agent'
import type { AgentContext, DomainEvent } from '@/services/agents/types'
import type { SpecChainStep } from '@/services/spec-generator'

function mockCtx(overrides: Partial<AgentContext> = {}): AgentContext {
  return {
    payload: {} as unknown as AgentContext['payload'],
    tenantId: 'tenant-1',
    locale: 'en',
    t: (k) => k,
    emit: vi.fn(),
    audit: vi.fn(),
    capture: vi.fn(),
    mcp: { listTools: () => [], callTool: async () => '' },
    ...overrides,
  }
}

describe('FinanceAgent — declarative contract', () => {
  it('owns the canonical finance collections', () => {
    expect(FinanceAgent.id).toBe('finance')
    expect(FinanceAgent.ownsCollections).toContain('invoices')
    expect(FinanceAgent.ownsCollections).toContain('payments')
    expect(FinanceAgent.ownsCollections).toContain('journal-entries')
    expect(FinanceAgent.ownsCollections).toContain('bank-accounts')
    expect(FinanceAgent.ownsCollections).toContain('account-reconciliations')
  })

  it('subscribes to the upstream cycle events', () => {
    expect(FinanceAgent.subscribesTo).toContain('invoice:activated')
    expect(FinanceAgent.subscribesTo).toContain('payment:received')
    expect(FinanceAgent.subscribesTo).toContain('shipment:delivered')
    expect(FinanceAgent.subscribesTo).toContain('bank:transaction:matched')
  })

  it('emits journal/invoice/payment lifecycle events', () => {
    expect(FinanceAgent.emits).toContain('journal:posted')
    expect(FinanceAgent.emits).toContain('invoice:completed')
    expect(FinanceAgent.emits).toContain('payment:matched')
  })

  it('has no cron (event-driven, not scheduled)', () => {
    expect(FinanceAgent.cron).toBeUndefined()
  })
})

describe('FinanceAgent.onChainStep', () => {
  it('returns [] when the step belongs to a non-finance collection', async () => {
    const ctx = mockCtx()
    const step: SpecChainStep = {
      chainId: 'O2C_GOODS', stepIndex: 1, totalSteps: 9,
      note: 'collection=leads action=qualify',
    }
    const out = await FinanceAgent.onChainStep!(ctx, step)
    expect(out).toEqual([])
  })

  it('emits one audit leaf for any owned-collection step', async () => {
    const ctx = mockCtx()
    const step: SpecChainStep = {
      chainId: 'O2C_GOODS', stepIndex: 7, totalSteps: 9,
      note: 'collection=invoices action=activate',
    }
    const out = await FinanceAgent.onChainStep!(ctx, step)
    expect(out.some((e) => e.kind === 'audit')).toBe(true)
    const audit = out.find((e) => e.kind === 'audit')
    expect(audit).toMatchObject({
      kind: 'audit',
      leaf: expect.objectContaining({
        tenantId: 'tenant-1',
        subjectCollection: 'invoices',
        action: 'activate',
        chainId: 'O2C_GOODS',
        chainStepId: '07-invoices-activate',
      }),
    })
  })

  it('emits invoice:activated on action=activate', async () => {
    const out = await FinanceAgent.onChainStep!(mockCtx(), {
      chainId: 'O2C_GOODS', stepIndex: 7, totalSteps: 9,
      note: 'collection=invoices action=activate',
    })
    expect(out.some((e) => e.kind === 'emit' && e.event.id === 'invoice:activated')).toBe(true)
  })

  it('emits payment:matched + journal:posted on action=receive', async () => {
    const out = await FinanceAgent.onChainStep!(mockCtx(), {
      chainId: 'O2C_GOODS', stepIndex: 8, totalSteps: 9,
      note: 'collection=payments action=receive',
    })
    const emitIds = out.filter((e) => e.kind === 'emit').map((e) => (e as { event: { id: string } }).event.id)
    expect(emitIds).toEqual(expect.arrayContaining(['payment:matched', 'journal:posted']))
  })

  it('emits invoice:completed on action=complete', async () => {
    const out = await FinanceAgent.onChainStep!(mockCtx(), {
      chainId: 'O2C_GOODS', stepIndex: 9, totalSteps: 9,
      note: 'collection=invoices action=complete',
    })
    expect(out.some((e) => e.kind === 'emit' && e.event.id === 'invoice:completed')).toBe(true)
  })

  it('emits journal:posted (bank-reconciliation) on action=reconcile', async () => {
    const out = await FinanceAgent.onChainStep!(mockCtx(), {
      chainId: 'R2R_PERIOD_CLOSE', stepIndex: 3, totalSteps: 8,
      note: 'collection=account-reconciliations action=reconcile',
    })
    const journalEmit = out.find((e) => e.kind === 'emit' && e.event.id === 'journal:posted')
    expect(journalEmit).toBeDefined()
    expect((journalEmit as { event: { payload: { action: string } } }).event.payload.action).toBe('bank-reconciliation')
  })

  it('emits only the audit leaf for unrecognised actions on owned collections', async () => {
    const out = await FinanceAgent.onChainStep!(mockCtx(), {
      chainId: 'X', stepIndex: 1, totalSteps: 1,
      note: 'collection=invoices action=mystery',
    })
    expect(out).toHaveLength(1)
    expect(out[0]!.kind).toBe('audit')
  })
})

describe('FinanceAgent.onEvent', () => {
  it('writes one audit leaf per subscribed event', async () => {
    const ev: DomainEvent = {
      id: 'invoice:activated', tenantId: 'tenant-1',
      payload: { invoiceId: 'inv-1' },
      emittedAt: '2026-05-11T00:00:00Z',
    }
    const out = await FinanceAgent.onEvent!(mockCtx(), ev)
    expect(out).toHaveLength(1)
    expect(out[0]).toMatchObject({
      kind: 'audit',
      leaf: expect.objectContaining({
        subjectCollection: 'audit-events',
        subjectId: 'invoice:activated',
        action: 'finance-handled-event',
      }),
    })
  })
})
