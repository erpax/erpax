/**
 * Stripe webhook handler tests — subscription/invoice sync, dunning.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @rfc 9110 http-semantics webhook-delivery
 * @rfc 8615 well-known-uri webhook-discovery
 * @standard ISO-4217:2015 currency-codes
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @compliance PCI-DSS-4.0 §3.5 protect-stored-cardholder-data tokenized
 * @security ISO-27001 A.5.17 authentication-information webhook-signing-secret
 * @see docs/STANDARDS.md §3 §4.4 §7
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  findPayloadSubscriptionByStripeId,
  updateSubscriptionStatus,
  handleSubscriptionSync,
  handleInvoiceSync,
  handleInvoicePaid,
  handleInvoicePaymentFailed,
} from '@/utilities/billing/stripeWebhookHandlers'
import Stripe from 'stripe'

/** Minimal Payload mock shape — methods used + spread escape hatch. */
type MockPayload = {
  find: ReturnType<typeof vi.fn>
  create: ReturnType<typeof vi.fn>
  update: ReturnType<typeof vi.fn>
  findByID: ReturnType<typeof vi.fn>
  logger: {
    info: ReturnType<typeof vi.fn>
    warn: ReturnType<typeof vi.fn>
    error: ReturnType<typeof vi.fn>
  }
} & Record<string, unknown>

// Mock Payload instance
const createMockPayload = (overrides: Partial<MockPayload> = {}): MockPayload => ({
  find: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  findByID: vi.fn(),
  logger: {
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
  ...overrides,
})

const createMockStripeSubscription = (overrides: Partial<Stripe.Subscription> = {}): Stripe.Subscription => ({
  id: 'sub_123',
  object: 'subscription',
  billing_cycle_anchor: 0,
  collection_method: 'charge_automatically',
  created: Math.floor(Date.now() / 1000),
  currency: 'usd',
  customer: 'cus_123',
  current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
  current_period_start: Math.floor(Date.now() / 1000),
  default_payment_method: null,
  default_source: null,
  default_tax_rates: [],
  description: null,
  discount: null,
  ended_at: null,
  items: {
    object: 'list',
    data: [
      {
        id: 'si_123',
        object: 'subscription_item',
        billing_thresholds: null,
        created: Math.floor(Date.now() / 1000),
        currency: 'usd',
        custom_price: null,
        metadata: {},
        price: {
          id: 'price_123',
          object: 'price',
          active: true,
          billing_scheme: 'per_unit',
          created: Math.floor(Date.now() / 1000),
          currency: 'usd',
          custom_unit_amount: null,
          livemode: false,
          lookup_key: null,
          metadata: {},
          nickname: null,
          product: 'prod_123',
          recurring: { aggregate_usage: null, interval: 'month', interval_count: 1, usage_type: 'licensed' },
          tax_behavior: 'unspecified',
          tiers_mode: null,
          transform_quantity: null,
          type: 'recurring',
          unit_amount: 2900,
          unit_amount_decimal: '2900',
        },
        quantity: 1,
        subscription: 'sub_123',
        tax_rates: [],
      },
    ],
    has_more: false,
    total_count: 1,
    url: '/v1/subscription_items',
  },
  latest_invoice: null,
  livemode: false,
  metadata: {},
  next_pending_invoice_item_invoice: null,
  on_behalf_of: null,
  pause_at: null,
  paused_at: null,
  payment_settings: {
    default_mandate: null,
    payment_method_options: null,
    payment_method_types: null,
    save_default_payment_method: 'off',
  },
  pending_invoice_item_interval: null,
  pending_setup_intent: null,
  pending_update: null,
  schedule: null,
  start_date: Math.floor(Date.now() / 1000),
  status: 'active',
  test_clock: null,
  transfer_data: null,
  trial_end: null,
  trial_settings: null,
  trial_start: null,
  ...overrides,
}) as unknown as Stripe.Subscription

const createMockStripeInvoice = (overrides: Partial<Stripe.Invoice> = {}): Stripe.Invoice => ({
  id: 'in_123',
  object: 'invoice',
  account_country: 'US',
  account_name: null,
  account_tax_ids: null,
  amount_due: 2900,
  amount_paid: 0,
  amount_remaining: 2900,
  application: null,
  application_fee: null,
  attempt_count: 0,
  attempted: false,
  auto_advance: true,
  automatic_tax: { enabled: false, status: null },
  billing_reason: 'subscription_cycle',
  charge: null,
  collection_method: 'charge_automatically',
  created: Math.floor(Date.now() / 1000),
  currency: 'usd',
  custom_fields: null,
  customer: 'cus_123',
  default_payment_method: null,
  default_source: null,
  default_tax_rates: [],
  description: null,
  discount: null,
  discounts: [],
  due_date: null,
  ending_balance: null,
  footer: null,
  from_invoice: null,
  hosted_invoice_url: null,
  invoice_pdf: null,
  last_finalization_error: null,
  latest_revision: null,
  lines: {
    object: 'list',
    data: [
      {
        id: 'il_123',
        object: 'line_item',
        amount: 2900,
        amount_excluding_tax: 2900,
        billing_details: null,
        currency: 'usd',
        custom_price: null,
        description: 'Pro Plan - Monthly',
        discount_amounts: [],
        discountable: true,
        discounts: [],
        invoice_item: 'ii_123',
        livemode: false,
        metadata: {},
        period: { end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, start: Math.floor(Date.now() / 1000) },
        plan: null,
        price: {
          id: 'price_123',
          object: 'price',
          active: true,
          billing_scheme: 'per_unit',
          created: Math.floor(Date.now() / 1000),
          currency: 'usd',
          custom_unit_amount: null,
          livemode: false,
          lookup_key: null,
          metadata: {},
          nickname: null,
          product: 'prod_123',
          recurring: { aggregate_usage: null, interval: 'month', interval_count: 1, usage_type: 'licensed' },
          tax_behavior: 'unspecified',
          tiers_mode: null,
          transform_quantity: null,
          type: 'recurring',
          unit_amount: 2900,
          unit_amount_decimal: '2900',
        },
        proration: false,
        proration_details: { credited_items: null },
        quantity: 1,
        subscription: 'sub_123',
        subscription_item: 'si_123',
        tax_amounts: [],
        test_id: null,
        type: 'subscription',
        unit_amount_excluding_tax: 2900,
      },
    ],
    has_more: false,
    total_count: 1,
    url: '/v1/invoices/in_123/lines',
  },
  livemode: false,
  metadata: {},
  next_payment_attempt: null,
  number: null,
  on_behalf_of: null,
  paid: false,
  paid_out_of_band: false,
  payment_intent: null,
  payment_settings: { default_mandate: null, payment_method_options: null, payment_method_types: null },
  period_end: Math.floor(Date.now() / 1000),
  period_start: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60,
  post_payment_actions: null,
  quote: null,
  receipt_number: null,
  rendering: null,
  rendering_options: null,
  revision_number: 0,
  scheduled_finalization_window_days: null,
  source_invoice: null,
  statement_descriptor: null,
  status: 'open',
  status_transitions: { finalized_at: null, marked_uncollectible_at: null, paid_at: null, voided_at: null },
  subscription: 'sub_123',
  subtotal: 2900,
  subtotal_excluding_tax: 2900,
  tax: null,
  test_clock: null,
  total: 2900,
  total_discount_amounts: [],
  total_excluding_tax: 2900,
  total_tax_amounts: [],
  transfer_data: null,
  url: 'https://invoice.stripe.com/i/123',
  ...overrides,
}) as unknown as Stripe.Invoice

describe('stripeWebhookHandlers', () => {
  let mockPayload: MockPayload

  beforeEach(() => {
    mockPayload = createMockPayload()
  })

  describe('findPayloadSubscriptionByStripeId', () => {
    it('should find subscription by Stripe ID', async () => {
      const mockSubscription = { id: 'payload-sub-123', stripeSubscriptionId: 'sub_123' }
      mockPayload.find.mockResolvedValue({ docs: [mockSubscription] })

      const result = await findPayloadSubscriptionByStripeId(mockPayload, 'sub_123')

      expect(result).toEqual(mockSubscription)
      expect(mockPayload.find).toHaveBeenCalledWith({
        collection: 'subscriptions',
        where: { stripeSubscriptionId: { equals: 'sub_123' } },
        limit: 1,
        depth: 2,
      })
    })

    it('should return null when not found', async () => {
      mockPayload.find.mockResolvedValue({ docs: [] })

      const result = await findPayloadSubscriptionByStripeId(mockPayload, 'sub_nonexistent')

      expect(result).toBeNull()
    })
  })

  describe('updateSubscriptionStatus', () => {
    it('should update subscription status with logging', async () => {
      mockPayload.update.mockResolvedValue({})

      await updateSubscriptionStatus(mockPayload, 'sub-123', 'active', 'Test reason')

      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'sub-123',
        data: {
          status: 'active',
          lastStatusChange: expect.any(Date),
          lastStatusChangeReason: 'Test reason',
        },
      })
      expect(mockPayload.logger.info).toHaveBeenCalled()
    })
  })

  describe('handleSubscriptionSync', () => {
    it('should create new Payload subscription from Stripe subscription', async () => {
      const stripeSubscription = createMockStripeSubscription()
      mockPayload.find
        .mockResolvedValueOnce({ docs: [] }) // no existing subscription
        .mockResolvedValueOnce({ docs: [{ id: 'tenant-123' }] }) // find tenant
        .mockResolvedValueOnce({ docs: [{ id: 'plan-123' }] }) // find plan

      mockPayload.create.mockResolvedValue({ id: 'new-sub-id' })

      await handleSubscriptionSync(
        { event: {} as unknown as Stripe.Event, payload: mockPayload },
        stripeSubscription,
      )

      expect(mockPayload.create).toHaveBeenCalledWith({
        collection: 'subscriptions',
        data: expect.objectContaining({
          tenant: 'tenant-123',
          plan: 'plan-123',
          status: 'active',
          stripeSubscriptionId: 'sub_123',
          stripeCustomerId: 'cus_123',
        }),
      })
    })

    it('should update existing subscription', async () => {
      const stripeSubscription = createMockStripeSubscription({ status: 'past_due' })
      const existingSubscription = { id: 'existing-sub-id', status: 'active' }

      mockPayload.find.mockResolvedValueOnce({ docs: [existingSubscription] })
      mockPayload.update.mockResolvedValue({})

      await handleSubscriptionSync(
        { event: {} as unknown as Stripe.Event, payload: mockPayload },
        stripeSubscription,
      )

      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'existing-sub-id',
        data: expect.objectContaining({
          status: 'past_due',
        }),
      })
    })
  })

  describe('handleInvoiceSync', () => {
    it('should create new invoice from Stripe invoice', async () => {
      const stripeInvoice = createMockStripeInvoice()
      const mockSubscription = { id: 'payload-sub-123', tenant: 'tenant-123' }

      mockPayload.find
        .mockResolvedValueOnce({ docs: [mockSubscription] }) // find subscription
        .mockResolvedValueOnce({ docs: [] }) // check existing invoice

      mockPayload.create.mockResolvedValue({ id: 'new-invoice-id' })

      await handleInvoiceSync({ event: {} as unknown as Stripe.Event, payload: mockPayload }, stripeInvoice)

      expect(mockPayload.create).toHaveBeenCalledWith({
        collection: 'invoices',
        data: expect.objectContaining({
          tenant: 'tenant-123',
          subscription: 'payload-sub-123',
          stripeInvoiceId: 'in_123',
          status: 'open',
          amountDue: 2900,
        }),
      })
    })

    it('should update existing invoice', async () => {
      const stripeInvoice = createMockStripeInvoice({ status: 'paid', amount_paid: 2900 })
      const mockSubscription = { id: 'payload-sub-123', tenant: 'tenant-123' }
      const existingInvoice = { id: 'existing-invoice-id' }

      mockPayload.find
        .mockResolvedValueOnce({ docs: [mockSubscription] }) // find subscription
        .mockResolvedValueOnce({ docs: [existingInvoice] }) // check existing invoice

      mockPayload.update.mockResolvedValue({})

      await handleInvoiceSync({ event: {} as unknown as Stripe.Event, payload: mockPayload }, stripeInvoice)

      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'invoices',
        id: 'existing-invoice-id',
        data: expect.objectContaining({
          status: 'paid',
          amountPaid: 2900,
        }),
      })
    })
  })

  describe('handleInvoicePaid', () => {
    it('should mark invoice as paid and update subscription', async () => {
      const stripeInvoice = createMockStripeInvoice({ paid: true })
      const mockInvoice = {
        id: 'invoice-123',
        subscription: { id: 'sub-123' },
      }

      mockPayload.find.mockResolvedValueOnce({ docs: [mockInvoice] })
      mockPayload.update.mockResolvedValue({})

      await handleInvoicePaid({ event: {} as unknown as Stripe.Event, payload: mockPayload }, stripeInvoice)

      // Should update invoice status to paid
      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'invoices',
        id: 'invoice-123',
        data: expect.objectContaining({
          status: 'paid',
          paidAt: expect.any(Date),
        }),
      })

      // Should update subscription to active
      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'sub-123',
        data: expect.objectContaining({
          status: 'active',
        }),
      })
    })
  })

  describe('handleInvoicePaymentFailed', () => {
    it('should increment attempt count and set past_due status', async () => {
      const stripeInvoice = createMockStripeInvoice()
      const mockInvoice = {
        id: 'invoice-123',
        subscription: { id: 'sub-123' },
        attemptCount: 0,
      }

      mockPayload.find.mockResolvedValueOnce({ docs: [mockInvoice] })
      mockPayload.update.mockResolvedValue({})

      await handleInvoicePaymentFailed(
        { event: {} as unknown as Stripe.Event, payload: mockPayload },
        stripeInvoice,
      )

      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'invoices',
        id: 'invoice-123',
        data: expect.objectContaining({
          attemptCount: 1,
          lastAttemptAt: expect.any(Date),
        }),
      })

      expect(mockPayload.update).toHaveBeenCalledWith({
        collection: 'subscriptions',
        id: 'sub-123',
        data: expect.objectContaining({
          status: 'past_due',
        }),
      })
    })
  })
})
