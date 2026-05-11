/**
 * Dunning job tests — overdue-receivable collection workflow.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IFRS-9 expected-credit-loss impairment
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-326 credit-losses-cecl
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @standard EN-16931:2017 dunning-notice
 * @standard ISO-8601-1:2019 date-time
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §3 §5 §7
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  processDunningCycle,
  reinstateSubscription,
  suspendSubscription,
} from '@/jobs/dunningJob'

/** Minimal Payload mock — methods this dunning job exercises. */
type MockPayload = {
  find: ReturnType<typeof vi.fn>
  update: ReturnType<typeof vi.fn>
  findByID: ReturnType<typeof vi.fn>
  logger: {
    info: ReturnType<typeof vi.fn>
    warn: ReturnType<typeof vi.fn>
    error: ReturnType<typeof vi.fn>
  }
} & Record<string, unknown>

const createMockPayload = (overrides: Partial<MockPayload> = {}): MockPayload => ({
  find: vi.fn(),
  update: vi.fn(),
  findByID: vi.fn(),
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
  ...overrides,
})

const createMockInvoice = (overrides: Record<string, unknown> = {}) => ({
  id: 'invoice-123',
  status: 'open',
  dueAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  pastDueSinceAt: null,
  subscription: 'subscription-123',
  ...overrides,
})

const createMockSubscription = (overrides: Record<string, unknown> = {}) => ({
  id: 'subscription-123',
  status: 'active',
  ...overrides,
})

describe('dunningJob', () => {
  let mockPayload: MockPayload

  beforeEach(() => {
    mockPayload = createMockPayload()
  })

  describe('processDunningCycle', () => {
    it('should mark invoice as past due on first run', async () => {
      const invoice = createMockInvoice()
      const subscription = createMockSubscription()

      mockPayload.find.mockResolvedValueOnce({
        docs: [invoice],
      })
      mockPayload.findByID.mockResolvedValueOnce(subscription)
      mockPayload.update.mockResolvedValue({})

      await processDunningCycle(mockPayload)

      // Should update invoice with pastDueSinceAt
      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'invoices',
        id: 'invoice-123',
        data: expect.objectContaining({
          pastDueSinceAt: expect.any(Date),
          gracePeriodEndsAt: expect.any(Date),
          suspensionScheduledFor: expect.any(Date),
        }),
      })

      // Should update subscription to past_due
      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'subscription-123',
        data: expect.objectContaining({
          status: 'past_due',
        }),
      })
    })

    it('should transition to grace_period after 3 days', async () => {
      const pastDueSinceAt = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      const invoice = createMockInvoice({
        pastDueSinceAt,
      })
      const subscription = createMockSubscription({ status: 'past_due' })

      mockPayload.find.mockResolvedValueOnce({
        docs: [invoice],
      })
      mockPayload.findByID.mockResolvedValueOnce(subscription)
      mockPayload.update.mockResolvedValue({})

      await processDunningCycle(mockPayload)

      // Should transition subscription to grace_period
      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'subscription-123',
        data: expect.objectContaining({
          status: 'grace_period',
          lastStatusChangeReason: 'Entered grace period',
        }),
      })
    })

    it('should transition to suspended after 7 days', async () => {
      const pastDueSinceAt = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      const invoice = createMockInvoice({
        pastDueSinceAt,
      })
      const subscription = createMockSubscription({ status: 'grace_period' })

      mockPayload.find.mockResolvedValueOnce({
        docs: [invoice],
      })
      mockPayload.findByID.mockResolvedValueOnce(subscription)
      mockPayload.update.mockResolvedValue({})

      await processDunningCycle(mockPayload)

      // Should transition to suspended
      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'subscription-123',
        data: expect.objectContaining({
          status: 'suspended',
          lastStatusChangeReason: 'Suspended after grace period',
        }),
      })
    })

    it('should handle multiple invoices', async () => {
      const invoices = [createMockInvoice(), createMockInvoice({ id: 'invoice-456' })]
      const subscription = createMockSubscription()

      mockPayload.find.mockResolvedValueOnce({ docs: invoices })
      mockPayload.findByID.mockResolvedValue(subscription)
      mockPayload.update.mockResolvedValue({})

      await processDunningCycle(mockPayload)

      // Should process both invoices
      expect(mockPayload.update).toHaveBeenCalledTimes(4) // 2 invoice updates + 2 subscription updates
    })

    it('should skip invoices without subscription', async () => {
      const invoice = createMockInvoice()

      mockPayload.find.mockResolvedValueOnce({ docs: [invoice] })
      mockPayload.findByID.mockResolvedValueOnce(null)

      await processDunningCycle(mockPayload)

      expect(mockPayload.logger.warn).toHaveBeenCalled()
      // Should not update anything
      expect(mockPayload.update).not.toHaveBeenCalled()
    })

    it('should handle errors gracefully', async () => {
      mockPayload.find.mockRejectedValueOnce(new Error('Database error'))

      await expect(processDunningCycle(mockPayload)).rejects.toThrow('Database error')
      expect(mockPayload.logger.error).toHaveBeenCalled()
    })
  })

  describe('reinstateSubscription', () => {
    it('should update subscription to active', async () => {
      mockPayload.update.mockResolvedValue({})

      await reinstateSubscription(mockPayload, 'sub-123', 'Payment received')

      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'sub-123',
        data: expect.objectContaining({
          status: 'active',
          lastStatusChangeReason: 'Payment received',
        }),
      })
      expect(mockPayload.logger.info).toHaveBeenCalled()
    })
  })

  describe('suspendSubscription', () => {
    it('should update subscription to suspended', async () => {
      mockPayload.update.mockResolvedValue({})

      await suspendSubscription(mockPayload, 'sub-123', 'Manual suspension')

      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'sub-123',
        data: expect.objectContaining({
          status: 'suspended',
          lastStatusChangeReason: 'Manual suspension',
        }),
      })
      expect(mockPayload.logger.warn).toHaveBeenCalled()
    })
  })
})
