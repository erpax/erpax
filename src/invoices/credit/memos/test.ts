import { describe, it, expect } from 'vitest'
import CreditMemos, { committed, coveredByRefunds, withinAmount, memoPresets, paidStages, refunded, withRefundStages } from '@/invoices/credit/memos'

describe('credit-memos collection node', () => {
  it('exports a valid collection config', () => {
    expect(CreditMemos.slug).toBe('credit-memos')
    expect(CreditMemos.fields.length).toBeGreaterThan(0)
  })
})

// A refund is no longer a collection: it is a line on the memo it pays out.
describe('credit-memos — a refund is the cash-out stage of the memo', () => {
  const NOW = '2026-11-13T00:00:00.000Z'
  const line = (amount: number, status: string): { amount: number; status: string; refundedAt?: string | null; settledAt?: string | null } => ({ amount, status })

  it('counts only the lines that reached the customer', () => {
    expect(refunded({ refunds: [line(300, 'settled'), line(200, 'issued'), line(900, 'pending'), line(900, 'failed'), line(900, 'voided')] })).toBe(500)
    expect(refunded({})).toBe(0)
  })

  it('a partial refund leaves the memo open; covering the amount settles it', () => {
    const partial = withRefundStages({ amount: 1000, status: 'issued', refunds: [line(400, 'settled')] }, NOW)
    expect(partial.status).toBe('issued')
    const full = withRefundStages({ amount: 1000, status: 'issued', refunds: [line(400, 'settled'), line(600, 'settled')] }, NOW)
    expect(full.status).toBe('settled')
  })

  it('an issued line has left but not arrived — it does not settle the memo', () => {
    expect(coveredByRefunds({ amount: 1000, refunds: [line(1000, 'issued')] })).toBe(false)
    expect(withRefundStages({ amount: 1000, status: 'issued', refunds: [line(1000, 'issued')] }, NOW).status).toBe('issued')
  })

  it('never settles a draft or a voided memo, and never a memo of no amount', () => {
    for (const status of ['draft', 'pending_approval', 'voided']) {
      expect(withRefundStages({ amount: 100, status, refunds: [line(100, 'settled')] }, NOW).status).toBe(status)
    }
    expect(coveredByRefunds({ amount: 0, refunds: [] })).toBe(false)
  })

  it('stamps a line once when it is issued and once when it settles', () => {
    const [issued, settled, pending] = withRefundStages({ amount: 9, status: 'draft', refunds: [line(1, 'issued'), line(1, 'settled'), line(1, 'pending')] }, NOW).refunds!
    expect(issued).toMatchObject({ refundedAt: NOW })
    expect(issued!.settledAt).toBeUndefined()
    expect(settled).toMatchObject({ refundedAt: NOW, settledAt: NOW })
    expect(pending!.refundedAt).toBeUndefined()
    const kept = withRefundStages({ amount: 9, status: 'draft', refunds: [{ amount: 1, status: 'settled', refundedAt: 'then', settledAt: 'then' }] }, NOW).refunds![0]
    expect(kept).toMatchObject({ refundedAt: 'then', settledAt: 'then' })
  })

  it('refuses lines that promise more than the memo credits; a failed or voided line promises nothing', () => {
    expect(committed({ refunds: [line(600, 'pending'), line(300, 'settled'), line(900, 'failed'), line(900, 'voided')] })).toBe(900)
    expect(withinAmount([line(600, 'pending'), line(400, 'settled')], { siblingData: { amount: 1000 } })).toBe(true)
    expect(withinAmount([line(600, 'pending'), line(401, 'issued')], { siblingData: { amount: 1000 } })).toMatch(/promise 1001, more than the memo's 1000/)
    expect(withinAmount([line(600, 'settled'), line(900, 'failed')], { siblingData: { amount: 1000 } })).toBe(true)
    expect(withinAmount(undefined, { siblingData: { amount: 0 } })).toBe(true)
    const refunds = CreditMemos.fields.find((x) => 'name' in x && x.name === 'refunds') as { validate?: unknown }
    expect(refunds.validate).toBe(withinAmount)
  })

  it('keeps every refund fact on the line, and the saved list stands where the collection stood', () => {
    const refunds = CreditMemos.fields.find((f) => 'name' in f && f.name === 'refunds') as { fields: { name: string; options?: { value: string }[] }[] }
    const names = refunds.fields.map((f) => f.name)
    for (const n of ['amount', 'method', 'stripeRefundId', 'status', 'refundedAt', 'settledAt', 'failureReason', 'journalEntry']) expect(names, n).toContain(n)
    const statuses = refunds.fields.find((f) => f.name === 'status')!.options!.map((o) => o.value)
    for (const s of paidStages()) expect(statuses).toContain(s)
    expect(memoPresets().map((p) => [p.title, p.relatedCollection])).toEqual([['Credit memos', 'credit-memos'], ['Refunds', 'credit-memos']])
  })
})
