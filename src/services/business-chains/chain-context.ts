/**
 * Shared chain context — DRY scaffolding for chain seeds + tests.
 *
 * Slice KKKK (2026-05-10): every chain seed needs the same prerequisites
 * (tenant + legal-entity + user + chart-of-accounts + fiscal-period).
 * Authoring 15 chain seeds against 15 ad-hoc setups would re-introduce
 * the entropy this slice exists to fix; this module is the canonical
 * setup.
 *
 * Usage:
 *   const ctx = await createChainContext(payload)
 *   await runChain(BUSINESS_CHAINS.P2P_THREE_WAY_MATCH, ctx, ...)
 *
 * Tests can pass a custom `tenantSlug` + `legalEntityName` to keep
 * fixtures isolated, but defaults are fine for the happy-path case.
 *
 * @audit ISO-19011:2018 audit-trail seed-evidence
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes
 */

import type { Payload } from 'payload'

export interface ChainContext {
  readonly tenantId: string
  readonly userId: string
  readonly legalEntityId: string
  readonly fiscalPeriodId: string
  readonly arAccountId: string  // 1200 — Accounts Receivable
  readonly apAccountId: string  // 2100 — Accounts Payable
  readonly cashAccountId: string // 1010 — Cash
  readonly revenueAccountId: string // 4000 — Revenue
  readonly cogsAccountId: string // 5000 — COGS
  readonly inventoryAccountId: string // 1300 — Inventory
  readonly customerId: string
  readonly vendorId: string
}

export interface ChainContextOptions {
  /** Slug for the seeded tenant. Defaults to `chain-test-<random>`. */
  readonly tenantSlug?: string
  /** Country for the legal-entity (ISO 3166-1 alpha-2). Defaults to `BG`. */
  readonly countryCode?: string
  /** Functional currency. Defaults to `EUR`. */
  readonly currency?: string
  /** Fiscal period label. Defaults to `2026-04`. */
  readonly periodLabel?: string
}

/**
 * Set up the shared prerequisites for any chain. Returns the IDs the
 * chain steps need to reference. Idempotent within a single test run
 * (caller should `payload.delete()` between tests when isolation matters).
 */
export async function createChainContext(
  payload: Payload,
  opts: ChainContextOptions = {},
): Promise<ChainContext> {
  const slug = opts.tenantSlug ?? `chain-test-${Math.random().toString(36).slice(2, 10)}`
  const countryCode = opts.countryCode ?? 'BG'
  const currency = opts.currency ?? 'EUR'
  const periodLabel = opts.periodLabel ?? '2026-04'

  // ─── Tenant + user ────────────────────────────────────────────────
  const tenant = (await payload.create({
    collection: 'tenants',
    data: { name: `Chain Test ${slug}`, slug, defaultCurrency: currency },
    overrideAccess: true,
  })) as unknown as { id: string }

  const user = (await payload.create({
    collection: 'users',
    data: {
      email: `${slug}@chain-test.local`,
      password: 'chain-test-pwd-only',
      tenants: [{ tenant: tenant.id, role: 'admin' }],
    },
    overrideAccess: true,
  })) as unknown as { id: string }

  // ─── Legal entity (IFRS-10 §B86 reporting unit) ───────────────────
  const legalEntity = (await payload.create({
    collection: 'legal-entities',
    data: {
      tenant: tenant.id,
      legalName: `Chain Test ${slug} Ltd`,
      countryCode,
      registrationNumber: `CT-${slug}`,
      consolidationMethod: 'not_consolidated',
      consolidationStatus: 'head',
      isHeadEntity: true,
      functionalCurrency: currency,
      presentationCurrency: currency,
      reportingFramework: 'ifrs',
      effectiveFrom: new Date('2026-01-01').toISOString(),
      status: 'active',
    },
    overrideAccess: true,
  })) as unknown as { id: string }

  // ─── Fiscal period ────────────────────────────────────────────────
  const fiscalPeriod = (await payload.create({
    collection: 'fiscal-periods',
    data: {
      tenant: tenant.id,
      label: periodLabel,
      startDate: new Date('2026-04-01').toISOString(),
      endDate: new Date('2026-04-30').toISOString(),
      status: 'open',
    },
    overrideAccess: true,
  })) as unknown as { id: string }

  // ─── Minimal chart of accounts ────────────────────────────────────
  const accounts: Record<string, string> = {}
  const COA = [
    { number: '1010', name: 'Cash', kind: 'asset' as const,     id: 'cashAccountId' },
    { number: '1200', name: 'Accounts Receivable', kind: 'asset' as const, id: 'arAccountId' },
    { number: '1300', name: 'Inventory', kind: 'asset' as const, id: 'inventoryAccountId' },
    { number: '2100', name: 'Accounts Payable', kind: 'liability' as const, id: 'apAccountId' },
    { number: '4000', name: 'Revenue', kind: 'revenue' as const, id: 'revenueAccountId' },
    { number: '5000', name: 'Cost of Goods Sold', kind: 'expense' as const, id: 'cogsAccountId' },
  ]
  for (const a of COA) {
    const created = (await payload.create({
      collection: 'gl-accounts',
      data: {
        tenant: tenant.id,
        accountNumber: a.number,
        accountName: a.name,
        accountType: a.kind,
        currency,
        isActive: true,
      },
      overrideAccess: true,
    })) as unknown as { id: string }
    accounts[a.id] = created.id
  }

  // ─── Customer + vendor ────────────────────────────────────────────
  const customer = (await payload.create({
    collection: 'customers',
    data: {
      tenant: tenant.id,
      name: `Chain Test Customer (${slug})`,
      currency,
      countryCode,
    },
    overrideAccess: true,
  })) as unknown as { id: string }

  const vendor = (await payload.create({
    collection: 'vendors',
    data: {
      tenant: tenant.id,
      name: `Chain Test Vendor (${slug})`,
      currency,
      countryCode,
    },
    overrideAccess: true,
  })) as unknown as { id: string }

  return {
    tenantId: tenant.id,
    userId: user.id,
    legalEntityId: legalEntity.id,
    fiscalPeriodId: fiscalPeriod.id,
    arAccountId:        accounts.arAccountId,
    apAccountId:        accounts.apAccountId,
    cashAccountId:      accounts.cashAccountId,
    revenueAccountId:   accounts.revenueAccountId,
    cogsAccountId:      accounts.cogsAccountId,
    inventoryAccountId: accounts.inventoryAccountId,
    customerId: customer.id,
    vendorId: vendor.id,
  }
}

/**
 * Tear down a chain context. Caller-managed: invoke at the end of a
 * test to keep DB clean. Order matters because of FK dependencies.
 */
export async function teardownChainContext(payload: Payload, ctx: ChainContext): Promise<void> {
  // Best-effort: tests run in their own transaction scope in the
  // canonical pattern; this helper covers fixture-style tests.
  for (const collection of [
    'usage-records', 'invoices', 'payments', 'gl-postings', 'journal-entries',
    'goods-receipts', 'purchase-orders', 'vendor-quotes', 'purchase-requisitions',
    'inventory-movements', 'work-orders', 'bills-of-materials',
    'projects', 'project-tasks', 'project-milestones', 'wip-snapshots',
    'recurring-journals', 'provisions', 'commitments-and-contingencies', 'government-grants',
    'csrd-disclosures', 'carbon-emissions', 'transfer-pricing-files',
    'lease-modifications', 'lease-period-postings', 'leases',
    'leads', 'opportunities', 'activities', 'sales-commissions',
    'fx-transactions', 'bank-reconciliations', 'account-reconciliations',
    'intercompany-transactions', 'consolidation-eliminations',
    'gl-accounts', 'fiscal-periods', 'customers', 'vendors',
    'legal-entities', 'audit-events',
  ] as const) {
    try {
      await payload.delete({
        collection: collection as Parameters<Payload['delete']>[0]['collection'],
        where: { tenant: { equals: ctx.tenantId } },
        overrideAccess: true,
      })
    } catch {
      // best-effort
    }
  }
}
