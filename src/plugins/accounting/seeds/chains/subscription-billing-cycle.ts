/**
 * Subscription billing cycle — canonical seed (Slice XXXX rewrite).
 *
 * Subscription activated → UsageRecords accumulated → Invoice issued
 * → Payment received → Invoice paid.
 *
 * XXXX (2026-05-10): rewritten against the REAL Subscriptions schema
 * (the SaaS tenant↔plan binding):
 *   - Subscriptions has NO `customer/currency/monthlyAmount/activatedAt`
 *     fields. It binds `tenant` (unique) → `plan` (FK to
 *     subscriptionPlans), with status + period start/end dates.
 *   - We seed an inline subscription-plan fixture (name/slug/monthlyUSD/
 *     billingCadence/limits) so the FK resolves.
 *   - The customer-billing semantics (currency/amount) live on the
 *     downstream Invoice + Payment rows.
 *
 * @standard IFRS-15 §35 over-time-recognition
 * @standard IFRS-15 §B16-B19 usage-based-revenue
 */

import type { ChainImpls, ChainStepImpl } from '@/services/business-chains/run-chain'

const ts = () => Date.now().toString(36)
const MONTHLY_FEE_CENTS = 99_00 // €99/mo
const USAGE_UNITS = 5
const USAGE_RATE_CENTS = 50 // €0.50/unit

const activate: ChainStepImpl = async (payload, ctx, state) => {
  // Subscriptions FK plan → subscriptionPlans. Seed an inline plan.
  const plan = await payload.create({
    collection: 'subscriptionPlans',
    data: {
      name: `Chain Test Plan ${ts()}`,
      slug: `chain-plan-${ts()}`,
      monthlyUSD: 99,
      billingCycle: 'monthly',
      limits: { invoicesPerMonth: 1000 },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.planId = plan.id
  const sub = await payload.create({
    collection: 'subscriptions',
    data: {
      tenant: ctx.tenantId,
      plan: plan.id,
      status: 'active',
      currentPeriodStart: new Date('2026-04-01').toISOString(),
      currentPeriodEnd: new Date('2026-04-30').toISOString(),
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.subscriptionId = sub.id
  return 'subscription:activated'
}

const recordUsage: ChainStepImpl = async (payload, ctx, state) => {
  await payload.create({
    collection: 'usage-records',
    data: {
      tenant: ctx.tenantId,
      eventId: `usage-${Date.now()}`,
      feature: 'invoicing_metered',
      meterKind: 'count',
      quantity: USAGE_UNITS,
      eventTime: new Date().toISOString(),
      billingPeriod: '2026-04',
      subscription: state.subscriptionId,
      rate: USAGE_RATE_CENTS,
      currency: 'EUR',
      amount: USAGE_UNITS * USAGE_RATE_CENTS,
      status: 'recorded',
    } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'usage:recorded'
}

const ensureAddress = async (
  payload: Parameters<ChainStepImpl>[0],
  ctx: Parameters<ChainStepImpl>[1],
  state: Parameters<ChainStepImpl>[2],
): Promise<string> => {
  if (state.addressId) return state.addressId as string
  const a = await payload.create({
    collection: 'addresses',
    data: { tenant: ctx.tenantId, addressLine1: '1 Sub Street', city: 'Sofia', postalCode: '1000', country: 'BG' } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.addressId = a.id
  return a.id
}

const issueInvoice: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const totalCents = MONTHLY_FEE_CENTS + USAGE_UNITS * USAGE_RATE_CENTS
  const invoice = await payload.create({
    collection: 'invoices',
    data: {
      tenant: ctx.tenantId,
      number: `SUB-INV-${Date.now()}`,
      typeStatus: { invoiceType: 'subscription', invoiceTypeCode: '380', confirmed: true },
      status: 'active',
      parties: { seller: addressId, buyer: addressId },
      dates: {
        date: new Date().toISOString(),
        issuedAt: new Date().toISOString(),
        dueAt: new Date(Date.now() + 30 * 86_400_000).toISOString(),
      },
      amounts: {
        itemTotal: totalCents,
        netTotal: totalCents,
        taxTotal: 0,
        totalAmount: totalCents,
        totalDue: totalCents,
      },
      billingTax: { currencyCode: 'EUR' },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.invoiceId = invoice.id
  return 'subscription:invoiced'
}

const receivePayment: ChainStepImpl = async (payload, ctx, state) => {
  const addressId = await ensureAddress(payload, ctx, state)
  const totalCents = MONTHLY_FEE_CENTS + USAGE_UNITS * USAGE_RATE_CENTS
  const payment = await payload.create({
    collection: 'payments',
    data: {
      tenant: ctx.tenantId,
      transactionNumber: `SUB-PMT-${Date.now()}`,
      paymentKind: 'received',
      status: 'received',
      invoice: state.invoiceId,
      parties: { sender: addressId, receiver: addressId },
      amounts: { amount: totalCents, currencyCode: 'EUR' },
      dates: { receivedAt: new Date().toISOString() },
    } as Record<string, unknown>,
    overrideAccess: true,
  }) as unknown as { id: string }
  state.paymentId = payment.id
  return 'payment:received'
}

const markInvoicePaid: ChainStepImpl = async (payload, ctx, state) => {
  await payload.update({
    collection: 'invoices',
    id: state.invoiceId as string,
    data: { status: 'paid' } as Record<string, unknown>,
    overrideAccess: true,
  })
  return 'invoice:completed'
}

export const subscriptionBillingCycleImpls: ChainImpls = [
  activate, recordUsage, issueInvoice, receivePayment, markInvoicePaid,
]
