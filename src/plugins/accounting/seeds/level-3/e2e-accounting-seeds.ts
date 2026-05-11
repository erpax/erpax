/**
 * Level-3 e2e accounting seed — multi-tenant intercompany fixtures for end-to-end tests.
 *
 * Three sub-seeds compose into `Level3SeedSuite`:
 *
 *   - `FullAccountingCycleSeed`   — open / post / close on a single tenant
 *   - `MultiEntitySeed`           — three subsidiaries + intercompany + consolidation
 *   - `RealWorldScenarioSeed`     — overdraft, rounding, prior-period adjustments,
 *                                   bulk volume, failure + reversal
 *
 * Validation lives in `SEED_VALIDATION_REGISTRY` (`src/testing/test-seed-factory.ts`).
 * Lifecycle (createContext / hooks / SeedResult) lives on `TestSeedFactory.runSeedLifecycle`.
 * Cleanup-id aggregation across sub-seeds uses `TestSeedFactory.mergeChildContext`.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting IFRS IAS-21 effects-of-changes-in-foreign-exchange-rates
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @accounting US-GAAP ASC-810 consolidation
 * @accounting US-GAAP ASC-250 accounting-changes-and-error-corrections
 * @audit ISO-19011:2018 audit-trail test-data
 * @quality ISO-25010 maintainability test-fixtures
 * @see docs/STANDARDS.md §4.2
 * @see src/plugins/accounting/seeds/level-1/minimal-accounting-seeds.ts
 */

import type { Payload } from 'payload';
import { TestSeedFactory, registerSeedCategory, type SeedResult } from '@/testing';
import { MINIMAL_GL_ACCOUNTS_DATA } from '../level-1';

// ─── Shared helpers ──────────────────────────────────────────────────────

const pad3 = (n: number): string => String(n).padStart(3, '0');
const pad4 = (n: number): string => String(n).padStart(4, '0');
const ymd = (d: Date): string => d.toISOString().split('T')[0];
const addDays = (d: Date, days: number): Date => new Date(d.getTime() + days * 86_400_000);
const lastDayOfMonth = (d: Date): Date => new Date(d.getFullYear(), d.getMonth() + 1, 0);

/**
 * Single-tenant accounting cycle — opening balance through period-end
 * (depreciation, accrual, prepaid) → trial balance → financial statements
 * → bank reconciliation. Validation contracts pinned in the registry.
 */
export class FullAccountingCycleSeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('e2e', async () => {
      const accounts = await this.queryDocuments('gl-accounts', { tenant: this.tenantId });
      if (!accounts.docs || accounts.docs.length < 5) {
        throw new Error('Not enough GL accounts. Please seed Level 1 first.');
      }

      const baseDate = new Date();
      baseDate.setDate(1);
      const monthStart = ymd(baseDate);
      const monthEnd = ymd(lastDayOfMonth(baseDate));
      const tenant = this.tenantId;
      const cashId = accounts.docs[0].id;
      const payablesId = accounts.docs[1].id;
      const equityId = accounts.docs[2].id;
      const revenueId = accounts.docs[3].id;
      const expenseId = accounts.docs[4].id;

      // 1. Opening balance
      await this.createDocument('journal-entries', {
        tenant, entryDate: monthStart, reference: 'JE-OPENING', description: 'Opening balances',
        debitAccountId: cashId, creditAccountId: equityId,
        debitAmount: 500000, creditAmount: 500000, status: 'posted',
      });

      // 2. AR (5 customers + invoices + booking entries)
      const customers = await Promise.all(
        Array.from({ length: 5 }, (_, i) =>
          this.createDocument('customers', {
            tenant, name: `Customer ${i + 1}`, code: `CUST${pad3(i + 1)}`,
            status: 'active', creditLimit: 50000,
          }),
        ),
      );
      for (let i = 0; i < customers.length; i++) {
        const customer = customers[i];
        const invoiceDate = ymd(addDays(baseDate, i + 1));
        const dueDate = ymd(addDays(new Date(invoiceDate), 30));
        const totalAmount = 10000 + (i + 1) * 1000;

        await this.createDocument('invoices', {
          tenant, customerId: customer.id, invoiceNumber: `INV-${pad4(i + 1)}`,
          invoiceDate, dueDate, totalAmount, currency: 'EUR', status: 'issued',
        });
        await this.createDocument('journal-entries', {
          tenant, entryDate: invoiceDate,
          reference: `JE-AR-${pad3(i + 1)}`,
          description: `Invoice INV-${pad4(i + 1)} from ${customer.name}`,
          debitAccountId: cashId, creditAccountId: revenueId,
          debitAmount: totalAmount, creditAmount: totalAmount, status: 'posted',
        });
      }

      // 3. AP (5 vendors + POs + booking entries)
      const vendors = await Promise.all(
        Array.from({ length: 5 }, (_, i) =>
          this.createDocument('vendors', {
            tenant, name: `Vendor ${i + 1}`, code: `VEND${pad3(i + 1)}`, status: 'active',
          }),
        ),
      );
      for (let i = 0; i < vendors.length; i++) {
        const vendor = vendors[i];
        const poDate = ymd(addDays(baseDate, i + 1));
        const dueDate = ymd(addDays(new Date(poDate), 15));
        const totalAmount = 5000 + (i + 1) * 500;

        await this.createDocument('purchase-orders', {
          tenant, vendorId: vendor.id, poNumber: `PO-${pad4(i + 1)}`,
          poDate, dueDate, totalAmount, currency: 'USD', status: 'ordered',
        });
        await this.createDocument('journal-entries', {
          tenant, entryDate: poDate,
          reference: `JE-AP-${pad3(i + 1)}`,
          description: `PO PO-${pad4(i + 1)} from ${vendor.name}`,
          debitAccountId: expenseId, creditAccountId: payablesId,
          debitAmount: totalAmount, creditAmount: totalAmount, status: 'posted',
        });
      }

      // 4. Operating expenses spread across the month (salary / rent / utility)
      const recurring = [
        { kind: 'SALARY', amount: 15000 },
        { kind: 'RENT',   amount: 5000  },
        { kind: 'UTIL',   amount: 2000  },
      ];
      for (let i = 0; i <= 10; i++) {
        const slot = recurring[i % recurring.length];
        const txDate = ymd(addDays(baseDate, 5 + i));
        await this.createDocument('journal-entries', {
          tenant, entryDate: txDate,
          reference: `JE-${slot.kind}-${pad3(i)}`,
          description: `${slot.kind.toLowerCase()} expense`,
          debitAccountId: expenseId, creditAccountId: cashId,
          debitAmount: slot.amount, creditAmount: slot.amount, status: 'posted',
        });
      }

      // 5. Period-end adjusting entries (depreciation / accrual / prepaid)
      const adjustingEntries = [
        { reference: 'JE-DEPR', description: 'Monthly depreciation',
          debitAccountId: expenseId, creditAccountId: cashId,
          debitAmount: 5000, creditAmount: 5000 },
        { reference: 'JE-ACCR', description: 'Accrual for unrecorded expenses',
          debitAccountId: expenseId, creditAccountId: payablesId,
          debitAmount: 10000, creditAmount: 10000 },
        { reference: 'JE-PREP', description: 'Record prepaid expense',
          debitAccountId: cashId, creditAccountId: expenseId,
          debitAmount: 3000, creditAmount: 3000 },
      ];
      for (const e of adjustingEntries) {
        await this.createDocument('journal-entries', {
          tenant, entryDate: monthEnd, ...e, status: 'posted',
        });
      }

      // 6. Trial balance + financial statements + bank reconciliation
      const totals = 500000 + 50000 + 25000 + 36000 + 13000 + 10000 + 3000;
      await this.createDocument('trial-balances', {
        tenant, periodDate: monthEnd, totalDebits: totals, totalCredits: totals,
        status: 'unapproved',
      });
      await this.createDocument('financial-statements', {
        tenant, statementType: 'income-statement',
        periodStartDate: monthStart, periodEndDate: monthEnd,
        currency: 'EUR', revenue: 50000, expenses: 36000, netIncome: 14000,
        status: 'draft',
      });
      await this.createDocument('financial-statements', {
        tenant, statementType: 'balance-sheet', periodDate: monthEnd,
        currency: 'EUR', totalAssets: 550000, totalLiabilities: 100000,
        totalEquity: 450000, status: 'draft',
      });
      await this.createDocument('bank-reconciliations', {
        tenant, reconciliationDate: monthEnd,
        bankStatementBalance: 450000, bookBalance: 450000, status: 'completed',
      });
    });
  }
}

/**
 * Three subsidiaries + per-entity chart-of-accounts + intercompany sale +
 * consolidation eliminations + consolidated trial balance. Used by the
 * IFRS-10 / ASC-810 consolidation specs.
 */
export class MultiEntitySeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly parentTenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('e2e', async () => {
      const baseDate = new Date();
      baseDate.setDate(1);
      const monthStart = ymd(baseDate);
      const lastDay = ymd(lastDayOfMonth(baseDate));

      // 1. Three subsidiaries
      const entityIds: string[] = [];
      for (let i = 1; i <= 3; i++) {
        const entity = await this.createDocument('tenants', {
          name: `Subsidiary ${i}`, code: `ENTITY${i}`,
          parentHostId: this.parentTenantId, status: 'active',
        });
        entityIds.push(entity.id);
      }

      // 2. Per-entity chart of accounts (IFRS IAS-1 minimal + intercompany A/R, A/P, revenue, expense)
      const chartOfAccounts = [
        ...MINIMAL_GL_ACCOUNTS_DATA.map((row) => ({ ...row })),
        { accountNumber: '1500', accountName: 'Receivables from affiliate', accountType: 'asset',     balance: 0, status: 'active' },
        { accountNumber: '2500', accountName: 'Payables to affiliate',      accountType: 'liability', balance: 0, status: 'active' },
        { accountNumber: '4100', accountName: 'Intercompany revenue',       accountType: 'revenue',   balance: 0, status: 'active' },
        { accountNumber: '5100', accountName: 'Intercompany expenses',      accountType: 'expense',   balance: 0, status: 'active' },
      ];

      const accountsByEntity: Record<string, Array<{ id: string; accountName: string }>> = {};
      for (const entityId of entityIds) {
        const created = await this.createDocuments(
          'gl-accounts',
          chartOfAccounts.map((a) => ({ ...a, tenant: entityId })),
        );
        accountsByEntity[entityId] = created.map((d) => ({ id: d.id, accountName: d.accountName }));
      }

      const find = (entityId: string, name: string): string => {
        const acct = accountsByEntity[entityId].find((a) => a.accountName === name);
        if (!acct) throw new Error(`Account "${name}" missing on ${entityId}`);
        return acct.id;
      };

      // 3. Opening balances per entity
      for (let i = 0; i < entityIds.length; i++) {
        const entityId = entityIds[i];
        await this.createDocument('journal-entries', {
          tenant: entityId, entryDate: monthStart,
          reference: `JE-OPENING-${i + 1}`,
          description: `Opening balance for ${i + 1}`,
          debitAccountId: find(entityId, 'Cash'),
          creditAccountId: find(entityId, 'Equity'),
          debitAmount: 100000, creditAmount: 100000, status: 'posted',
        });
      }

      // 4. Intercompany sales (entity i → entity i+1)
      const icAmount = 50000;
      const icDateStr = ymd(addDays(baseDate, 10));
      for (let i = 0; i < entityIds.length - 1; i++) {
        const fromId = entityIds[i];
        const toId = entityIds[i + 1];

        await this.createDocument('journal-entries', {
          tenant: fromId, entryDate: icDateStr,
          reference: `JE-IC-${i + 1}`, description: `Intercompany sale to Entity ${i + 2}`,
          debitAccountId: find(fromId, 'Receivables from affiliate'),
          creditAccountId: find(fromId, 'Intercompany revenue'),
          debitAmount: icAmount, creditAmount: icAmount, status: 'posted',
        });
        await this.createDocument('journal-entries', {
          tenant: toId, entryDate: icDateStr,
          reference: `JE-IC-${i + 2}`, description: `Intercompany purchase from Entity ${i + 1}`,
          debitAccountId: find(toId, 'Intercompany expenses'),
          creditAccountId: find(toId, 'Payables to affiliate'),
          debitAmount: icAmount, creditAmount: icAmount, status: 'posted',
        });
        await this.createDocument('intercompany-transactions', {
          fromHostId: fromId, toHostId: toId, transactionDate: icDateStr,
          reference: `IC-${pad3(i + 1)}`,
          description: `IC sale from Entity ${i + 1} to Entity ${i + 2}`,
          debitAmount: icAmount, creditAmount: icAmount, status: 'posted',
        });
      }

      // 5. Per-entity trial balances + consolidated trial balance
      let consolidatedDebits = 0;
      let consolidatedCredits = 0;
      for (const entityId of entityIds) {
        await this.createDocument('trial-balances', {
          tenant: entityId, periodDate: lastDay,
          totalDebits: 150000, totalCredits: 150000, status: 'unapproved',
        });
        consolidatedDebits += 150000;
        consolidatedCredits += 150000;
      }

      // 6. Consolidation eliminations (revenue/expense + A/R-A/P)
      for (let i = 0; i < entityIds.length - 1; i++) {
        const fromId = entityIds[i];
        const toId = entityIds[i + 1];
        for (const eliminationType of [
          'intercompany-revenue-expense',
          'intercompany-receivables-payables',
        ]) {
          await this.createDocument('consolidation-eliminations', {
            consolidationDate: lastDay, eliminationType,
            fromHostId: fromId, toHostId: toId,
            debitAmount: icAmount, creditAmount: icAmount,
            description: `Eliminate ${eliminationType} between Entity ${i + 1} and ${i + 2}`,
            status: 'posted',
          });
        }
      }

      await this.createDocument('trial-balances', {
        tenant: this.parentTenantId, periodDate: lastDay, isConsolidated: true,
        totalDebits: consolidatedDebits, totalCredits: consolidatedCredits,
        status: 'unapproved',
      });
    });
  }
}

/**
 * Real-world edge cases: overdraft, FX rounding, prior-period adjustment,
 * bulk transaction volume, failure + reversal, concurrent transactions.
 */
export class RealWorldScenarioSeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('e2e', async () => {
      const accounts = await this.queryDocuments('gl-accounts', { tenant: this.tenantId });
      if (!accounts.docs || accounts.docs.length < 5) {
        throw new Error('Not enough GL accounts. Please seed Level 1 first.');
      }

      const baseDate = new Date();
      baseDate.setDate(1);
      const monthStart = ymd(baseDate);
      const monthEnd = ymd(lastDayOfMonth(baseDate));
      const tenant = this.tenantId;
      const cashId = accounts.docs[0].id;
      const payablesId = accounts.docs[1].id;
      const equityId = accounts.docs[2].id;
      const revenueId = accounts.docs[3].id;
      const expenseId = accounts.docs[4].id;

      // 1. Overdraft (negative balance scenario)
      await this.createDocument('journal-entries', {
        tenant, entryDate: monthStart, reference: 'JE-OVERDRAFT',
        description: 'Bank overdraft scenario',
        debitAccountId: cashId, creditAccountId: equityId,
        debitAmount: -50000, creditAmount: -50000, status: 'posted',
      });

      // 2. FX rounding (5 transactions with 0.01-cent precision)
      const roundingDate = ymd(addDays(baseDate, 9));
      for (let i = 1; i <= 5; i++) {
        const amount = Math.round(1234.567 * i * 100) / 100;
        await this.createDocument('journal-entries', {
          tenant, entryDate: roundingDate,
          reference: `JE-ROUND-${pad3(i)}`,
          description: `Transaction with rounding ${i}`,
          debitAccountId: cashId, creditAccountId: revenueId,
          debitAmount: amount, creditAmount: amount, status: 'posted',
        });
      }

      // 3. Rounding adjustment + tracking row
      await this.createDocument('journal-entries', {
        tenant, entryDate: monthEnd, reference: 'JE-ROUND-ADJUST',
        description: 'Rounding adjustment for forex conversions',
        debitAccountId: cashId, creditAccountId: payablesId,
        debitAmount: 0.15, creditAmount: 0.15, status: 'posted',
      });
      await this.createDocument('rounding-adjustments', {
        tenant, adjustmentDate: monthEnd,
        fromCurrency: 'USD', toCurrency: 'EUR', roundingAmount: 0.15,
        reason: 'Rounding on forex conversion for multiple transactions',
        status: 'posted',
      });

      // 4. Prior-period adjustment (ASC-250 / IAS-8 §42)
      const priorMonth = new Date(baseDate);
      priorMonth.setMonth(priorMonth.getMonth() - 1);
      const priorMonthStr = ymd(priorMonth);

      await this.createDocument('journal-entries', {
        tenant, entryDate: monthStart, reference: 'JE-PPA',
        description: 'Prior period adjustment for inventory',
        debitAccountId: expenseId, creditAccountId: cashId,
        debitAmount: 25000, creditAmount: 25000, status: 'posted',
      });
      await this.createDocument('prior-period-adjustments', {
        tenant, adjustmentDate: priorMonthStr, postDate: monthStart,
        reference: 'JE-PPA',
        reason: 'Correction of prior period inventory count',
        impactedPeriods: ['2024-12'],
        debitAccountId: expenseId, creditAccountId: cashId,
        amount: 25000, status: 'approved',
      });

      // 5. Bulk transaction volume (50 entries)
      for (let i = 1; i <= 50; i++) {
        const txDate = ymd(addDays(baseDate, Math.min(Math.floor(i / 2), 27)));
        const amount = 1000 + i * 10;
        const debitFirst = i % 2 === 0;
        await this.createDocument('journal-entries', {
          tenant, entryDate: txDate, reference: `JE-BULK-${pad4(i)}`,
          description: `Bulk transaction ${i}`,
          debitAccountId: debitFirst ? cashId : expenseId,
          creditAccountId: debitFirst ? expenseId : cashId,
          debitAmount: amount, creditAmount: amount, status: 'posted',
        });
      }

      // 6. Failure + reversal flow
      await this.createDocument('journal-entries', {
        tenant, entryDate: monthStart, reference: 'JE-FAILED',
        description: 'Failed transaction (pending reversal)',
        debitAccountId: cashId, creditAccountId: revenueId,
        debitAmount: 10000, creditAmount: 10000, status: 'error',
      });
      await this.createDocument('journal-entries', {
        tenant, entryDate: monthStart, reference: 'JE-REVERSAL',
        description: 'Reversal of failed transaction JE-FAILED',
        debitAccountId: revenueId, creditAccountId: cashId,
        debitAmount: 10000, creditAmount: 10000, status: 'posted',
      });
      await this.createDocument('transaction-failures', {
        tenant, transactionDate: monthStart, reference: 'JE-FAILED',
        reason: 'Insufficient funds', statusCode: 'INSUFFICIENT_FUNDS',
        reversalReference: 'JE-REVERSAL', status: 'resolved',
      });

      // 7. Concurrent transactions (10 entries on the same date)
      const concurrentDate = ymd(addDays(baseDate, 14));
      for (let i = 1; i <= 10; i++) {
        const debitFirst = i % 5 === 0;
        await this.createDocument('journal-entries', {
          tenant, entryDate: concurrentDate,
          reference: `JE-CONCURRENT-${pad3(i)}`,
          description: `Concurrent transaction ${i}`,
          debitAccountId: debitFirst ? cashId : expenseId,
          creditAccountId: debitFirst ? expenseId : cashId,
          debitAmount: 5000, creditAmount: 5000, status: 'posted',
        });
      }
    });
  }
}

/**
 * Level-3 orchestrator — looks up (or creates) the test tenant, ensures the
 * Level-1 chart-of-accounts is present, then runs every sub-seed and
 * aggregates their createdIds for unified cleanup.
 */
export class Level3SeedSuite extends TestSeedFactory {
  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('e2e', async () => {
      // Tenant lookup — collection slug is `'tenants'` (Decision B + Slice HHH
      // pending). The local var reflects the actual semantics.
      const tenants = await this.queryDocuments('tenants', { code: 'TEST_TENANT' });
      let tenantId: string;
      if (tenants.docs && tenants.docs.length > 0) {
        tenantId = tenants.docs[0].id;
      } else {
        const tenant = await this.createDocument('tenants', {
          name: 'Level 3 Test Tenant', code: 'TEST_TENANT_L3', status: 'active',
        });
        tenantId = tenant.id;
      }
      this.trackCreatedId('tenants', tenantId);

      // Ensure chart of accounts exists — reuse Level-1's canonical fixture
      // so the schema for "minimal CoA" lives in one place.
      const glAccounts = await this.queryDocuments('gl-accounts', { tenant: tenantId });
      if (!glAccounts.docs || glAccounts.docs.length < 5) {
        await this.createDocuments(
          'gl-accounts',
          MINIMAL_GL_ACCOUNTS_DATA.map((row) => ({ ...row, tenant: tenantId })),
        );
      }

      // Sub-seeds in dependency order; mergeChildContext aggregates cleanup ids.
      const children = [
        new FullAccountingCycleSeed(this.payload, tenantId),
        new MultiEntitySeed(this.payload, tenantId),
        new RealWorldScenarioSeed(this.payload, tenantId),
      ];
      for (const child of children) {
        const result = await child.seed();
        if (!result.success) throw result.error;
        this.mergeChildContext(child);
      }
    });
  }
}

// ─── UI-category registration ────────────────────────────────────────────
//
// Level-3 seeds are evidence-heavy by design — full accounting cycles,
// multi-entity consolidation, real-world edge cases. They produce admin-data
// rows but their primary purpose is the SOX §404 / ISO-19011 evidence pack.

registerSeedCategory({
  id: 'level-3.full-accounting-cycle',
  category: 'compliance-evidence',
  description: 'Open → AR → AP → adjusting entries → trial balance → IS/BS → bank reconciliation.',
  ctor: FullAccountingCycleSeed,
});
registerSeedCategory({
  id: 'level-3.multi-entity',
  category: 'compliance-evidence',
  description: 'Three subsidiaries + intercompany sales + consolidation eliminations.',
  ctor: MultiEntitySeed,
});
registerSeedCategory({
  id: 'level-3.real-world-scenario',
  category: 'compliance-evidence',
  description: 'Overdraft + FX rounding + prior-period adj + bulk volume + failure/reversal flow.',
  ctor: RealWorldScenarioSeed,
});
registerSeedCategory({
  id: 'level-3.suite',
  category: 'compliance-evidence',
  description: 'Composes all Level-3 e2e seeds; one cleanup tears the whole graph down.',
  ctor: Level3SeedSuite,
});
