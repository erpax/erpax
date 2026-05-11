/**
 * Level-2 integration accounting seed — multi-period fixtures for service-level integration tests.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @audit ISO-19011:2018 audit-trail test-data
 * @quality ISO-25010 maintainability test-fixtures
 * @see docs/STANDARDS.md §4.2
 */

/**
 * Level 2: Integration Test Seeds for Accounting Plugin
 * Setup time: 2-5 seconds
 * Creates realistic business data with multi-document relationships
 * Includes GL transactions, journal entries, and accounting cycles
 */

import type { Payload } from 'payload';
import { TestSeedFactory, registerSeedCategory, type SeedResult } from '@/testing';
import { DocumentationPagesSeed } from './documentation-pages';

/**
 * Journal Entry Seed - GL transactions with matched debits/credits.
 *
 * Validation lives in `SEED_VALIDATION_REGISTRY['journal-entries']`
 * (per-field rules + the IFRS IAS-1 / GAAP ASC-105 balance cross-field check).
 * The lifecycle (createContext → hooks → SeedResult) lives on the base class
 * via `runSeedLifecycle`.
 */
export class JournalEntrySeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('integration', async () => {
      const accounts = await this.queryDocuments('gl-accounts', { tenant: this.tenantId });
      if (!accounts.docs || accounts.docs.length < 5) {
        throw new Error('Not enough GL accounts available. Please seed GL accounts first.');
      }

      const baseDate = new Date();
      baseDate.setDate(1); // Start of month
      const entryDate = baseDate.toISOString().split('T')[0];
      const tenant = this.tenantId;
      const cashId = accounts.docs[0].id;
      const equityId = accounts.docs[2].id;
      const revenueId = accounts.docs[3].id;
      const expenseId = accounts.docs[4].id;

      const entries = [
        { tenant, entryDate, reference: 'JE-001-OPENING', description: 'Opening balance - Cash',
          debitAccountId: cashId,    creditAccountId: equityId,  debitAmount: 100000, creditAmount: 100000, status: 'posted' },
        { tenant, entryDate, reference: 'JE-002-REVENUE', description: 'Service revenue earned',
          debitAccountId: cashId,    creditAccountId: revenueId, debitAmount: 5000,   creditAmount: 5000,   status: 'posted' },
        { tenant, entryDate, reference: 'JE-003-EXPENSE', description: 'Operating expenses',
          debitAccountId: expenseId, creditAccountId: cashId,    debitAmount: 1000,   creditAmount: 1000,   status: 'posted' },
      ];
      await this.createDocuments('journal-entries', entries);
    });
  }
}

/**
 * Accounting Cycle Seed — open monthly / quarterly / yearly cycles for the
 * current period. Validation lives in `SEED_VALIDATION_REGISTRY['accounting-cycles']`.
 */
export class AccountingCycleSeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('integration', async () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth();
      const tenant = this.tenantId;
      const pad = (n: number): string => String(n).padStart(2, '0');
      const quarterStart = Math.floor(currentMonth / 3) * 3 + 1;
      const quarterEnd = quarterStart + 2;

      const cycles = [
        {
          tenant,
          periodType: 'monthly',
          periodNumber: currentMonth + 1,
          year: currentYear,
          startDate: `${currentYear}-${pad(currentMonth + 1)}-01`,
          endDate: `${currentYear}-${pad(currentMonth + 1)}-28`,
          status: 'open',
        },
        {
          tenant,
          periodType: 'quarterly',
          periodNumber: Math.floor(currentMonth / 3) + 1,
          year: currentYear,
          startDate: `${currentYear}-${pad(quarterStart)}-01`,
          endDate: `${currentYear}-${pad(quarterEnd)}-30`,
          status: 'open',
        },
        {
          tenant,
          periodType: 'yearly',
          periodNumber: 1,
          year: currentYear,
          startDate: `${currentYear}-01-01`,
          endDate: `${currentYear}-12-31`,
          status: 'open',
        },
      ];
      await this.createDocuments('accounting-cycles', cycles);
    });
  }
}

/**
 * Multi-Currency Seed - Test data with FX transactions
 * Creates transactions across multiple currencies with exchange differences
 */
export class MultiCurrencySeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('integration', async () => {
      const transactionDate = new Date().toISOString().split('T')[0];
      const tenant = this.tenantId;
      const transactions = [
        { tenant, transactionDate, fromCurrency: 'USD', toCurrency: 'EUR', fromAmount: 10000, exchangeRate: 0.92, toAmount: 9200, description: 'Foreign purchase - EUR',     status: 'recorded' },
        { tenant, transactionDate, fromCurrency: 'USD', toCurrency: 'GBP', fromAmount: 8000,  exchangeRate: 0.79, toAmount: 6320, description: 'Foreign purchase - GBP',     status: 'recorded' },
        { tenant, transactionDate, fromCurrency: 'EUR', toCurrency: 'USD', fromAmount: 5000,  exchangeRate: 1.09, toAmount: 5450, description: 'Foreign sale - EUR to USD',  status: 'recorded' },
      ];
      await this.createDocuments('fx-transactions', transactions);
    });
  }
}

/**
 * Role-Scoped Data Seed — one row per (role, resourceType) tuple binding a
 * permission set + scope.
 *
 * Note: the row's `role` field is **singular** (one role per row) and matches
 * the actual `role-scoped-access` schema. The Users collection uses plural
 * `roles: string[]` (NIST INCITS-359 RBAC) — different collection, different
 * shape.
 */
export class RoleScopedDataSeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('integration', async () => {
      const tenant = this.tenantId;
      const configs = [
        { tenant, role: 'admin',      resourceType: 'journal-entries', canCreate: true,  canRead: true, canUpdate: true,  canDelete: true,  scope: 'all' },
        { tenant, role: 'accountant', resourceType: 'journal-entries', canCreate: true,  canRead: true, canUpdate: true,  canDelete: false, scope: 'own' },
        { tenant, role: 'auditor',    resourceType: 'journal-entries', canCreate: false, canRead: true, canUpdate: false, canDelete: false, scope: 'all' },
        { tenant, role: 'accountant', resourceType: 'gl-accounts',     canCreate: false, canRead: true, canUpdate: false, canDelete: false, scope: 'all' },
      ];
      await this.createDocuments('role-scoped-access', configs);
    });
  }
}

/**
 * Combined Level 2 Seed Suite
 * Creates all integration seeds in optimized order
 * Requires Level 1 seeds to be run first
 */
export class Level2SeedSuite extends TestSeedFactory {
  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('integration', async () => {
      // Resolve the tenant from the Level-1 fixture.
      const tenants = await this.queryDocuments('tenants', { code: 'TEST_TENANT' });
      if (!tenants.docs || tenants.docs.length === 0) {
        throw new Error(
          'No test tenant found. Please run Level 1 seeds first to create required tenant.',
        );
      }
      const tenantId = tenants.docs[0].id;
      this.trackCreatedId('tenants', tenantId);

      // Run sub-seeds in dependency order, then aggregate every child's
      // createdIds into ours via the shared `mergeChildContext` helper —
      // single cleanup() drops the whole graph.
      //
      // DocumentationPagesSeed lands last because it depends on the `home`
      // page from Level-1 (MinimalPagesSeed) — and only fails soft if `home`
      // is missing, so the suite still completes against a stripped-down
      // setup that hasn't run Level-1.
      const children = [
        new JournalEntrySeed(this.payload, tenantId),
        new AccountingCycleSeed(this.payload, tenantId),
        new MultiCurrencySeed(this.payload, tenantId),
        new RoleScopedDataSeed(this.payload, tenantId),
        new DocumentationPagesSeed(this.payload, tenantId),
      ];
      for (const child of children) {
        const result = await child.seed();
        if (!result.success) {
          // Documentation pages are non-critical to the suite contract — a
          // missing `home` (Level-1 didn't run) shouldn't fail the whole
          // Level-2 run. Other seeds remain hard failures.
          if (child instanceof DocumentationPagesSeed) {
            continue;
          }
          throw result.error;
        }
        this.mergeChildContext(child);
      }
    });
  }
}

// ─── UI-category registration ────────────────────────────────────────────
//
// Operational accounting collections — admin-data. Documentation pages are
// public-content. The suite spans both via DocumentationPagesSeed.

registerSeedCategory({
  id: 'level-2.journal-entries',
  category: 'admin-data',
  description: 'Three balanced journal entries (opening / revenue / expense).',
  ctor: JournalEntrySeed,
});
registerSeedCategory({
  id: 'level-2.accounting-cycles',
  category: 'admin-data',
  description: 'Open monthly / quarterly / yearly cycles for the current period.',
  ctor: AccountingCycleSeed,
});
registerSeedCategory({
  id: 'level-2.multi-currency',
  category: 'admin-data',
  description: 'Three FX transactions (USD↔EUR, USD↔GBP) with exchange rates.',
  ctor: MultiCurrencySeed,
});
registerSeedCategory({
  id: 'level-2.role-scoped-access',
  category: 'admin-data',
  description: 'Role-based access configurations for journal-entries + gl-accounts.',
  ctor: RoleScopedDataSeed,
});
registerSeedCategory({
  id: 'level-2.documentation-pages',
  category: 'public-content',
  description: 'Nested platform-overview docs hub (5 pages) under the home root.',
  ctor: DocumentationPagesSeed,
});
registerSeedCategory({
  id: 'level-2.suite',
  category: 'cross-cutting',
  description: 'Composes Level-2 admin-data + documentation-pages seeds.',
  ctor: Level2SeedSuite,
});
