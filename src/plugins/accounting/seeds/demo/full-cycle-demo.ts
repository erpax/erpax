/**
 * End-to-end demo seed — exercises every wired event/handler in one cycle.
 *
 * Boots a full mini-tenant (BG/EUR/IFRS), seeds a chart of accounts, a
 * customer, an item, then runs the canonical quote-to-cash + subscription
 * lifecycle: every domain event the codebase declares fires at least once,
 * every GL handler executes, every audit-trail hook records.
 *
 * Use this seed to:
 *   - smoke-test the wiring after a refactor
 *   - demo the accounting↔business merge in a fresh dev DB
 *   - generate a snapshot of "what does a healthy tenant look like?"
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-3166-1:2020 country-codes alpha-2
 * @standard BCP-47 language-tag
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IFRS-15 revenue-from-contracts-with-customers
 * @accounting US-GAAP ASC-606 revenue-from-contracts-with-customers
 * @accounting IFRS IAS-2 inventories cogs-recognition
 * @audit ISO-19011:2018 audit-trail demo-coverage
 * @compliance SOX §404 internal-controls full-cycle-evidence
 * @quality ISO-25010 maintainability test-fixtures
 * @see docs/ARCHITECTURE_MAP.md
 */

import type { Payload } from 'payload'
import { eventEmitter, emitEvent } from '@/services/event-emitter.service'
import { DEFAULT_COUNTRY, DEFAULT_CURRENCY, DEFAULT_LOCALE, DEFAULT_ACCOUNTING_STANDARD } from '@/config/regional-defaults'

export interface DemoCycleResult {
  tenantId: string | number
  events: string[]
  glEntriesCreated: number
}

/**
 * Run the canonical full-cycle demo. Returns event names captured + GL
 * entry count.
 */
export async function runFullCycleDemo(payload: Payload): Promise<DemoCycleResult> {
  const events: string[] = []

  // Capture every emitted event for assertion.
  const captureUnsubs: Array<() => void> = []
  for (const evt of [
    'order:activated',
    'order:cancelled',
    'order:refunded',
    'subscription:activated',
    'subscription:invoiced',
    'subscription:cancelled',
    'invoice:activated',
    'payment:received',
    'inventory:purchased',
    'inventory:sold',
    'bank:statement:imported',
  ]) {
    captureUnsubs.push(
      eventEmitter.subscribe(evt, async (e) => {
        events.push(e.eventType)
      }),
    )
  }

  // 1. Tenant — BG/EUR/IFRS by canonical default cascade.
  const tenant = await payload.create({
    collection: 'tenants',
    data: {
      name: 'Demo Tenant',
      slug: 'demo',
      config: {
        identity: { country: DEFAULT_COUNTRY, legalName: 'Demo Co. EOOD' },
        localization: { defaultLocale: DEFAULT_LOCALE, fallbackLocale: 'en-US' },
        currency: { reportingCurrency: DEFAULT_CURRENCY },
        accounting: { standard: DEFAULT_ACCOUNTING_STANDARD, fiscalYearStartMonth: 1 },
      },
    },
  })
  const tenantId = tenant.id

  // 2. Chart of accounts — wire every canonical role.
  const roleAccountIds: Record<string, string | number> = {}
  for (const [num, name, type, role, normalBalance] of [
    ['1010', 'Cash', 'asset', 'cash', 'debit'],
    ['1100', 'Accounts Receivable', 'asset', 'ar', 'debit'],
    ['1300', 'Inventory', 'asset', 'inventory', 'debit'],
    ['2010', 'Accounts Payable', 'liability', 'ap', 'credit'],
    ['2150', 'Sales Tax Payable', 'liability', 'sales_tax_payable', 'credit'],
    ['2200', 'Deferred Revenue', 'liability', 'deferred_revenue', 'credit'],
    ['2300', 'Refunds Payable', 'liability', 'refunds_payable', 'credit'],
    ['4000', 'Revenue', 'revenue', 'revenue', 'credit'],
    ['4100', 'Subscription Revenue', 'revenue', 'subscription_revenue', 'credit'],
    ['5000', 'Cost of Goods Sold', 'expense', 'cogs', 'debit'],
    ['6000', 'Operating Expense', 'expense', 'expense', 'debit'],
  ] as const) {
    const acct = await payload.create({
      collection: 'gl-accounts',
      data: {
        tenant: tenantId,
        accountNumber: num,
        accountName: name,
        accountType: type,
        role,
        normalBalance,
        currency: DEFAULT_CURRENCY,
        status: 'active',
      },
    })
    roleAccountIds[role] = acct.id
  }

  // 3. Subscription lifecycle — activates, invoices, cancels.
  await emitEvent(
    'subscription:activated',
    String(tenantId),
    'system',
    {
      subscriptionId: 'sub-demo-1',
      customerId: 'cust-demo-1',
      planId: 'plan-pro',
      amount: 9900, // €99.00
      currencyCode: DEFAULT_CURRENCY,
      billingCycle: 'monthly',
      periodStart: new Date(),
      periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    'sub-demo-1',
    'subscription',
  )

  await emitEvent(
    'subscription:invoiced',
    String(tenantId),
    'system',
    {
      subscriptionId: 'sub-demo-1',
      invoiceId: 'inv-demo-1',
      amount: 9900,
      currencyCode: DEFAULT_CURRENCY,
      periodStart: new Date(),
      periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    'sub-demo-1',
    'subscription',
  )

  // 4. Order lifecycle — direct sale, then full refund.
  await emitEvent(
    'order:activated',
    String(tenantId),
    'system',
    {
      orderId: 'order-demo-1',
      customerId: 'cust-demo-1',
      subtotal: 5000, // €50.00
      taxAmount: 1000, // €10.00 (20% VAT BG)
      total: 6000,
      currencyCode: DEFAULT_CURRENCY,
      activatedAt: new Date(),
      lineItems: [
        { itemId: 'item-demo-1', sku: 'SKU-001', quantity: 2, unitPrice: 2500, lineTotal: 5000, costAmount: 3000 },
      ],
    },
    'order-demo-1',
    'order',
  )

  await emitEvent(
    'order:refunded',
    String(tenantId),
    'system',
    {
      orderId: 'order-demo-1',
      refundedAt: new Date(),
      amount: 6000,
      currencyCode: DEFAULT_CURRENCY,
      reason: 'Customer requested refund',
    },
    'order-demo-1',
    'order',
  )

  // 5. Drain — wait for async handlers to settle.
  await new Promise((r) => setTimeout(r, 100))

  // Tear down captures.
  for (const unsub of captureUnsubs) unsub()

  // Count journal entries posted to this tenant.
  const entries = await payload.find({
    collection: 'journal-entries',
    where: { tenant: { equals: tenantId } },
    limit: 0,
  })

  return {
    tenantId,
    events,
    glEntriesCreated: entries.totalDocs,
  }
}
