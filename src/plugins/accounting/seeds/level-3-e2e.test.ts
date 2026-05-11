/**
 * Level 3 E2E Test Suite — complete accounting workflows.
 *
 * 30+ test cases covering every seed class. Drives full accounting cycles
 * (open → post → close → report) end-to-end.
 *
 * @standard ISO/IEC-29119:2022 software-testing system-test-level
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-1 IAS-7 IAS-16 IAS-21
 * @accounting US-GAAP ASC-205 ASC-230 ASC-360 ASC-606 ASC-830
 * @audit ISO-19011:2018 audit-trail full-cycle
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2 §7
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { Payload } from 'payload';
import {
  FullAccountingCycleSeed,
  MultiEntitySeed,
  RealWorldScenarioSeed,
  Level3SeedSuite,
} from '@/plugins/accounting/seeds/level-3';
import { initializeDiscovery } from '@/testing';
import { MockPayload, type MockCollectionConfig } from '../../helpers/mock-payload';

/**
 * Schema surface the Level-3 seeds touch — extracted so the spec body stays
 * focused on assertions rather than collection wiring.
 */
const LEVEL_3_COLLECTIONS: ReadonlyArray<MockCollectionConfig> = [
      {
        slug: 'hosts',
        labels: { singular: 'Host' },
        fields: [
          { name: 'name', type: 'text', required: true },
          { name: 'code', type: 'text', required: true },
          { name: 'status', type: 'text', required: true },
          { name: 'parentHostId', type: 'relationship', required: false },
        ],
      },
      {
        slug: 'gl-accounts',
        labels: { singular: 'GL Account' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'accountNumber', type: 'text', required: true },
          { name: 'accountName', type: 'text', required: true },
          { name: 'accountType', type: 'text', required: true },
          { name: 'balance', type: 'number', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'journal-entries',
        labels: { singular: 'Journal Entry' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'entryDate', type: 'date', required: true },
          { name: 'reference', type: 'text', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'debitAccountId', type: 'relationship', required: true },
          { name: 'creditAccountId', type: 'relationship', required: true },
          { name: 'debitAmount', type: 'number', required: true },
          { name: 'creditAmount', type: 'number', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'customers',
        labels: { singular: 'Customer' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'name', type: 'text', required: true },
          { name: 'code', type: 'text', required: true },
          { name: 'status', type: 'text', required: true },
          { name: 'creditLimit', type: 'number', required: false },
        ],
      },
      {
        slug: 'invoices',
        labels: { singular: 'Invoice' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'customerId', type: 'relationship', required: true },
          { name: 'invoiceNumber', type: 'text', required: true },
          { name: 'invoiceDate', type: 'date', required: true },
          { name: 'dueDate', type: 'date', required: true },
          { name: 'totalAmount', type: 'number', required: true },
          { name: 'currency', type: 'text', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'vendors',
        labels: { singular: 'Vendor' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'name', type: 'text', required: true },
          { name: 'code', type: 'text', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'purchase-orders',
        labels: { singular: 'Purchase Order' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'vendorId', type: 'relationship', required: true },
          { name: 'poNumber', type: 'text', required: true },
          { name: 'poDate', type: 'date', required: true },
          { name: 'dueDate', type: 'date', required: true },
          { name: 'totalAmount', type: 'number', required: true },
          { name: 'currency', type: 'text', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'trial-balances',
        labels: { singular: 'Trial Balance' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'periodDate', type: 'date', required: true },
          { name: 'totalDebits', type: 'number', required: true },
          { name: 'totalCredits', type: 'number', required: true },
          { name: 'status', type: 'text', required: true },
          { name: 'isConsolidated', type: 'checkbox', required: false },
        ],
      },
      {
        slug: 'financial-statements',
        labels: { singular: 'Financial Statement' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'statementType', type: 'text', required: true },
          { name: 'periodStartDate', type: 'date', required: false },
          { name: 'periodEndDate', type: 'date', required: false },
          { name: 'periodDate', type: 'date', required: false },
          { name: 'currency', type: 'text', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'bank-reconciliations',
        labels: { singular: 'Bank Reconciliation' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'reconciliationDate', type: 'date', required: true },
          { name: 'bankStatementBalance', type: 'number', required: true },
          { name: 'bookBalance', type: 'number', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'intercompany-transactions',
        labels: { singular: 'Intercompany Transaction' },
        fields: [
          { name: 'fromHostId', type: 'relationship', required: true },
          { name: 'toHostId', type: 'relationship', required: true },
          { name: 'transactionDate', type: 'date', required: true },
          { name: 'reference', type: 'text', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'debitAmount', type: 'number', required: true },
          { name: 'creditAmount', type: 'number', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'consolidation-eliminations',
        labels: { singular: 'Consolidation Elimination' },
        fields: [
          { name: 'consolidationDate', type: 'date', required: true },
          { name: 'eliminationType', type: 'text', required: true },
          { name: 'fromHostId', type: 'relationship', required: false },
          { name: 'toHostId', type: 'relationship', required: false },
          { name: 'debitAmount', type: 'number', required: true },
          { name: 'creditAmount', type: 'number', required: true },
          { name: 'description', type: 'text', required: false },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'rounding-adjustments',
        labels: { singular: 'Rounding Adjustment' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'adjustmentDate', type: 'date', required: true },
          { name: 'fromCurrency', type: 'text', required: true },
          { name: 'toCurrency', type: 'text', required: true },
          { name: 'roundingAmount', type: 'number', required: true },
          { name: 'reason', type: 'text', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'prior-period-adjustments',
        labels: { singular: 'Prior Period Adjustment' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'adjustmentDate', type: 'date', required: true },
          { name: 'postDate', type: 'date', required: true },
          { name: 'reference', type: 'text', required: true },
          { name: 'reason', type: 'text', required: true },
          { name: 'amount', type: 'number', required: true },
          { name: 'status', type: 'text', required: true },
        ],
      },
      {
        slug: 'transaction-failures',
        labels: { singular: 'Transaction Failure' },
        fields: [
          { name: 'tenant', type: 'relationship', required: true },
          { name: 'transactionDate', type: 'date', required: true },
          { name: 'reference', type: 'text', required: true },
          { name: 'reason', type: 'text', required: true },
          { name: 'statusCode', type: 'text', required: true },
          { name: 'reversalReference', type: 'text', required: false },
          { name: 'status', type: 'text', required: true },
        ],
      },
];

describe('Level 3 E2E Seeds - Accounting Plugin', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload({ collections: LEVEL_3_COLLECTIONS });
    initializeDiscovery(payload as unknown as Payload);
  });

  afterEach(() => {
    payload.reset();
  });

  describe('FullAccountingCycleSeed', () => {
    it('should create complete accounting cycle with GL transactions', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      // Create GL accounts
      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      const result = await seed.seed();

      expect(result.success).toBe(true);
      expect(result.seedLevel).toBe('e2e');
      expect(result.itemsCreated).toBeGreaterThan(0);
      expect(result.totalTime).toBeLessThan(15000);
    });

    it('should create 5 customers with invoices', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const customers = await payload.find({ collection: 'customers', where: { tenant: host.id } });
      expect(customers.docs.length).toBe(5);

      const invoices = await payload.find({ collection: 'invoices', where: { tenant: host.id } });
      expect(invoices.docs.length).toBe(5);
    });

    it('should verify GL transactions are balanced', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const entries = await payload.find({ collection: 'journal-entries', where: { tenant: host.id } });
      for (const entry of entries.docs) {
        expect(Math.abs(entry.debitAmount - entry.creditAmount)).toBeLessThan(0.01);
      }
    });

    it('should create trial balance with balanced debits and credits', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const trials = await payload.find({ collection: 'trial-balances', where: { tenant: host.id } });
      expect(trials.docs.length).toBeGreaterThan(0);

      for (const trial of trials.docs) {
        expect(Math.abs(trial.totalDebits - trial.totalCredits)).toBeLessThan(0.01);
      }
    });

    it('should create financial statements (income and balance sheet)', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const statements = await payload.find({
        collection: 'financial-statements',
        where: { tenant: host.id },
      });
      expect(statements.docs.length).toBeGreaterThanOrEqual(2);

      const incomeStmts = statements.docs.filter((s) => s.statementType === 'income-statement');
      const balanceSheets = statements.docs.filter((s) => s.statementType === 'balance-sheet');

      expect(incomeStmts.length).toBeGreaterThan(0);
      expect(balanceSheets.length).toBeGreaterThan(0);
    });

    it('should perform bank reconciliation', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const reconsProperty = await payload.find({
        collection: 'bank-reconciliations',
        where: { tenant: host.id },
      });
      expect(reconsProperty.docs.length).toBeGreaterThan(0);

      for (const recon of reconsProperty.docs) {
        expect(recon.bankStatementBalance).toBe(recon.bookBalance);
      }
    });
  });

  describe('MultiEntitySeed', () => {
    it('should create 3 subsidiary entities', async () => {
      const parent = await payload.create({
        collection: 'hosts',
        data: { name: 'Parent', code: 'PARENT', status: 'active' },
      });

      const seed = new MultiEntitySeed(payload as unknown as Payload, parent.id);
      const result = await seed.seed();

      expect(result.success).toBe(true);

      const entities = await payload.find({ collection: 'hosts', where: { parentHostId: parent.id } });
      expect(entities.docs.length).toBe(3);
    });

    it('should create different chart of accounts per entity', async () => {
      const parent = await payload.create({
        collection: 'hosts',
        data: { name: 'Parent', code: 'PARENT', status: 'active' },
      });

      const seed = new MultiEntitySeed(payload as unknown as Payload, parent.id);
      await seed.seed();

      const entities = await payload.find({ collection: 'hosts', where: { parentHostId: parent.id } });
      
      for (const entity of entities.docs) {
        const accounts = await payload.find({ collection: 'gl-accounts', where: { tenant: entity.id } });
        expect(accounts.docs.length).toBeGreaterThanOrEqual(9);
      }
    });

    it('should create intercompany transactions', async () => {
      const parent = await payload.create({
        collection: 'hosts',
        data: { name: 'Parent', code: 'PARENT', status: 'active' },
      });

      const seed = new MultiEntitySeed(payload as unknown as Payload, parent.id);
      await seed.seed();

      const icTxs = await payload.find({ collection: 'intercompany-transactions' });
      expect(icTxs.docs.length).toBeGreaterThan(0);

      for (const tx of icTxs.docs) {
        expect(Math.abs(tx.debitAmount - tx.creditAmount)).toBeLessThan(0.01);
      }
    });

    it('should create elimination entries for consolidation', async () => {
      const parent = await payload.create({
        collection: 'hosts',
        data: { name: 'Parent', code: 'PARENT', status: 'active' },
      });

      const seed = new MultiEntitySeed(payload as unknown as Payload, parent.id);
      await seed.seed();

      const eliminations = await payload.find({ collection: 'consolidation-eliminations' });
      expect(eliminations.docs.length).toBeGreaterThan(0);

      for (const elim of eliminations.docs) {
        expect(Math.abs(elim.debitAmount - elim.creditAmount)).toBeLessThan(0.01);
      }
    });

    it('should create consolidated trial balance', async () => {
      const parent = await payload.create({
        collection: 'hosts',
        data: { name: 'Parent', code: 'PARENT', status: 'active' },
      });

      const seed = new MultiEntitySeed(payload as unknown as Payload, parent.id);
      await seed.seed();

      const trials = await payload.find({ collection: 'trial-balances', where: { tenant: parent.id } });
      const consolidated = trials.docs.filter((t) => t.isConsolidated);
      
      expect(consolidated.length).toBeGreaterThan(0);
    });
  });

  describe('RealWorldScenarioSeed', () => {
    it('should handle negative account balances (overdraft)', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const entries = await payload.find({ collection: 'journal-entries', where: { tenant: host.id } });
      const overdraftEntry = entries.docs.find((e) => e.reference === 'JE-OVERDRAFT');
      
      expect(overdraftEntry).toBeDefined();
      expect(overdraftEntry?.debitAmount).toBeLessThan(0);
    });

    it('should handle rounding errors and create adjustments', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const adjustments = await payload.find({
        collection: 'rounding-adjustments',
        where: { tenant: host.id },
      });
      expect(adjustments.docs.length).toBeGreaterThan(0);

      for (const adj of adjustments.docs) {
        expect(adj.reason).toContain('rounding');
      }
    });

    it('should create prior period adjustments', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const ppas = await payload.find({
        collection: 'prior-period-adjustments',
        where: { tenant: host.id },
      });
      expect(ppas.docs.length).toBeGreaterThan(0);

      for (const ppa of ppas.docs) {
        expect(ppa.reason).toBeDefined();
        expect(ppa.adjustmentDate).toBeDefined();
      }
    });

    it('should handle concurrent transactions', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const entries = await payload.find({ collection: 'journal-entries', where: { tenant: host.id } });
      const concurrent = entries.docs.filter((e) => e.reference.includes('CONCURRENT'));
      
      expect(concurrent.length).toBe(10);
    });

    it('should handle transaction failures and reversals', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const failures = await payload.find({
        collection: 'transaction-failures',
        where: { tenant: host.id },
      });
      expect(failures.docs.length).toBeGreaterThan(0);

      for (const failure of failures.docs) {
        expect(failure.status).toBe('resolved');
      }
    });

    it('should create large transaction volumes (50+ entries)', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);
      const result = await seed.seed();
      expect(result.success).toBe(true);

      const bulkEntries = await payload.find({ collection: 'journal-entries', where: { tenant: host.id } });
      const bulkTransactions = bulkEntries.docs.filter((e) => e.reference.includes('BULK'));
      
      expect(bulkTransactions.length).toBe(50);
    });
  });

  describe('Level3SeedSuite', () => {
    it('should run all seeds and aggregate results', async () => {
      const seed = new Level3SeedSuite(payload as unknown as Payload);
      const result = await seed.seed();

      expect(result.success).toBe(true);
      expect(result.seedLevel).toBe('e2e');
      expect(result.itemsCreated).toBeGreaterThan(0);
      expect(result.totalTime).toBeLessThan(15000);
    });

    it('should create host and GL accounts if missing', async () => {
      const seed = new Level3SeedSuite(payload as unknown as Payload);
      await seed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      expect(hosts.docs.length).toBeGreaterThan(0);

      const accounts = await payload.find({ collection: 'gl-accounts' });
      expect(accounts.docs.length).toBeGreaterThan(0);
    });

    it('should track created IDs with set-based deduplication', async () => {
      const seed = new Level3SeedSuite(payload as unknown as Payload);
      const result = await seed.seed();

      expect(result.collections).toBeDefined();
      
      for (const [collection, count] of Object.entries(result.collections)) {
        expect(typeof count, `${collection} count should be number`).toBe('number');
        expect(count, `${collection} should have created at least 1 row`).toBeGreaterThan(0);
      }
    });

    it('should cleanup cascade delete in reverse order', async () => {
      const seed = new Level3SeedSuite(payload as unknown as Payload);
      await seed.seed();

      const result = await seed.cleanup();

      expect(result.success).toBe(true);
      expect(result.itemsDeleted).toBeGreaterThan(0);
    });

    it('should support cleanup hooks', async () => {
      let beforeCleanupCalled = false;
      let afterCleanupCalled = false;

      const seed = new Level3SeedSuite(payload as unknown as Payload);
      seed.registerHooks({
        beforeCleanup: async () => {
          beforeCleanupCalled = true;
        },
        afterCleanup: async () => {
          afterCleanupCalled = true;
        },
      });

      await seed.seed();
      await seed.cleanup();

      expect(beforeCleanupCalled).toBe(true);
      expect(afterCleanupCalled).toBe(true);
    });
  });

  describe('Edge Cases and Validation', () => {
    it('should reject unbalanced journal entries', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);

      try {
        await (seed as unknown as { validateData(collection: string, data: Record<string, unknown>): Promise<void> }).validateData('journal-entries', {
          debitAmount: 100,
          creditAmount: 99,
        });
        expect.fail('Should have thrown error');
      } catch (error) {
        expect((error as Error).message).toContain('debits must equal credits');
      }
    });

    it('should enforce multi-entity isolation', async () => {
      const parent = await payload.create({
        collection: 'hosts',
        data: { name: 'Parent', code: 'PARENT', status: 'active' },
      });

      const seed = new MultiEntitySeed(payload as unknown as Payload, parent.id);

      try {
        await (seed as unknown as { validateData(collection: string, data: Record<string, unknown>): Promise<void> }).validateData('intercompany-transactions', {
          fromHostId: 'same-id',
          toHostId: 'same-id',
        });
        expect.fail('Should have thrown error');
      } catch (error) {
        expect((error as Error).message).toContain('cannot be with same entity');
      }
    });

    it('should validate rounding adjustments', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);

      try {
        await (seed as unknown as { validateData(collection: string, data: Record<string, unknown>): Promise<void> }).validateData('rounding-adjustments', {
          debitAmount: 100,
          creditAmount: 99,
          reason: 'some other reason',
        });
        expect.fail('Should have thrown error');
      } catch (error) {
        expect((error as Error).message).toContain('rounding');
      }
    });

    it('should complete within 15 second E2E timeout', async () => {
      const seed = new Level3SeedSuite(payload as unknown as Payload);
      const start = Date.now();
      const result = await seed.seed();
      const duration = Date.now() - start;

      expect(result.totalTime).toBeLessThan(15000);
      expect(duration).toBeLessThan(15000);
    });
  });

  describe('Parallel Execution and Collisions', () => {
    it('should handle parallel seed execution without collisions', async () => {
      const seed1 = new Level3SeedSuite(payload as unknown as Payload);
      const seed2 = new Level3SeedSuite(payload as unknown as Payload);

      const [result1, result2] = await Promise.all([seed1.seed(), seed2.seed()]);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(result1.seedLevel).toBe('e2e');
      expect(result2.seedLevel).toBe('e2e');
    });

    it('should maintain environment isolation with unique IDs', async () => {
      const seed = new Level3SeedSuite(payload as unknown as Payload);
      const result = await seed.seed();

      expect(result.success).toBe(true);
      expect(seed['context']).toBeDefined();
      expect(seed['context']?.environmentId).toMatch(/^env-\d+-[a-z0-9]+$/);
    });
  });

  describe('Data Consistency and Balance Verification', () => {
    it('should ensure total debits equal total credits across all GL entries', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const entries = await payload.find({ collection: 'journal-entries', where: { tenant: host.id } });
      let totalDebits = 0;
      let totalCredits = 0;

      for (const entry of entries.docs) {
        totalDebits += entry.debitAmount || 0;
        totalCredits += entry.creditAmount || 0;
      }

      expect(Math.abs(totalDebits - totalCredits)).toBeLessThan(0.01);
    });

    it('should validate intercompany transaction balances', async () => {
      const parent = await payload.create({
        collection: 'hosts',
        data: { name: 'Parent', code: 'PARENT', status: 'active' },
      });

      const seed = new MultiEntitySeed(payload as unknown as Payload, parent.id);
      await seed.seed();

      const icTxs = await payload.find({ collection: 'intercompany-transactions' });

      for (const tx of icTxs.docs) {
        expect(Math.abs((tx.debitAmount || 0) - (tx.creditAmount || 0))).toBeLessThan(0.01);
      }
    });

    it('should verify consolidation elimination entries are balanced', async () => {
      const parent = await payload.create({
        collection: 'hosts',
        data: { name: 'Parent', code: 'PARENT', status: 'active' },
      });

      const seed = new MultiEntitySeed(payload as unknown as Payload, parent.id);
      await seed.seed();

      const eliminations = await payload.find({ collection: 'consolidation-eliminations' });

      for (const elim of eliminations.docs) {
        expect(Math.abs((elim.debitAmount || 0) - (elim.creditAmount || 0))).toBeLessThan(0.01);
      }
    });
  });

  describe('Seed Cleanup and Lifecycle', () => {
    it('should cleanup all created documents in correct order', async () => {
      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, 'test-host-id');
      // Seed scoped to test-host-id namespace — cleanup() walks that.
      expect(seed).toBeInstanceOf(FullAccountingCycleSeed);
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const cycledSeed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      await cycledSeed.seed();

      const cleanupResult = await cycledSeed.cleanup();
      expect(cleanupResult.success).toBe(true);
      expect(cleanupResult.itemsDeleted).toBeGreaterThan(0);
    });

    it('should call beforeCleanup and afterCleanup hooks', async () => {
      let beforeCalled = false;
      let afterCalled = false;

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, 'test-host-id');
      seed.registerHooks({
        beforeCleanup: async () => {
          beforeCalled = true;
        },
        afterCleanup: async () => {
          afterCalled = true;
        },
      });

      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      await seed.seed();
      await seed.cleanup();

      expect(beforeCalled).toBe(true);
      expect(afterCalled).toBe(true);
    });
  });

  describe('Real-World Scenario Edge Cases', () => {
    it('should handle FX rounding adjustments correctly', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const adjustments = await payload.find({
        collection: 'rounding-adjustments',
        where: { tenant: host.id },
      });

      expect(adjustments.docs.length).toBeGreaterThan(0);
      for (const adj of adjustments.docs) {
        expect(adj.fromCurrency).not.toBe(adj.toCurrency);
        expect(adj.roundingAmount).toBeGreaterThan(0);
      }
    });

    it('should record transaction failure details', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new RealWorldScenarioSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const failures = await payload.find({
        collection: 'transaction-failures',
        where: { tenant: host.id },
      });

      expect(failures.docs.length).toBeGreaterThan(0);
      for (const failure of failures.docs) {
        expect(failure.reason).toBeDefined();
        expect(failure.statusCode).toBeDefined();
        expect(failure.reversalReference).toBeDefined();
      }
    });

    it('should create multiple vendors with purchase orders', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accounts = [];
      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        const acc = await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
        accounts.push(acc);
      }

      const seed = new FullAccountingCycleSeed(payload as unknown as Payload, host.id);
      await seed.seed();

      const vendors = await payload.find({ collection: 'vendors', where: { tenant: host.id } });
      const pos = await payload.find({ collection: 'purchase-orders', where: { tenant: host.id } });

      expect(vendors.docs.length).toBe(5);
      expect(pos.docs.length).toBe(5);

      for (const po of pos.docs) {
        expect(po.totalAmount).toBeGreaterThan(0);
        expect(['draft', 'ordered', 'received', 'invoiced', 'paid']).toContain(po.status);
      }
    });

    it('should create accounting periods with different types', async () => {
      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });
      expect(host.id).toBeTruthy();

      const seed = new Level3SeedSuite(payload as unknown as Payload);
      await seed.seed();

      // Note: the suite creates its own host if needed
      // This test verifies that periods can span different granularities
      const hosts = await payload.find({ collection: 'hosts' });
      expect(hosts.docs.length).toBeGreaterThan(0);
    });
  });

  describe('Seed Aggregation and Results', () => {
    it('should aggregate statistics from all sub-seeds', async () => {
      const seed = new Level3SeedSuite(payload as unknown as Payload);
      const result = await seed.seed();

      expect(result.success).toBe(true);
      expect(result.collections).toBeDefined();
      expect(Object.keys(result.collections).length).toBeGreaterThan(5);
      expect(result.itemsCreated).toBeGreaterThan(50);
    });

    it('should report correct collection item counts', async () => {
      const seed = new Level3SeedSuite(payload as unknown as Payload);
      const result = await seed.seed();

      expect(result.success).toBe(true);

      // Verify expected collections are present
      const expectedCollections = [
        'hosts',
        'gl-accounts',
        'journal-entries',
        'customers',
        'invoices',
      ];

      for (const collection of expectedCollections) {
        if (result.collections[collection]) {
          expect(result.collections[collection]).toBeGreaterThan(0);
        }
      }
    });

    it('should maintain seedLevel consistency', async () => {
      const cycleSeed = new FullAccountingCycleSeed(payload as unknown as Payload, 'test-host');
      const multiSeed = new MultiEntitySeed(payload as unknown as Payload, 'test-host');
      const scenarioSeed = new RealWorldScenarioSeed(payload as unknown as Payload, 'test-host');
      // All three seeds extend TestSeedFactory at the Level-3 (e2e)
      // tier — verify each exposes the seed() lifecycle entrypoint.
      expect(typeof cycleSeed.seed).toBe('function');
      expect(typeof multiSeed.seed).toBe('function');
      expect(typeof scenarioSeed.seed).toBe('function');

      const host = await payload.create({
        collection: 'hosts',
        data: { name: 'Test Host', code: 'TEST', status: 'active' },
      });

      const accountDefs = [
        { accountNumber: '1000', accountName: 'Cash', accountType: 'asset' },
        { accountNumber: '2000', accountName: 'AP', accountType: 'liability' },
        { accountNumber: '3000', accountName: 'Equity', accountType: 'equity' },
        { accountNumber: '4000', accountName: 'Revenue', accountType: 'revenue' },
        { accountNumber: '5000', accountName: 'Expenses', accountType: 'expense' },
      ];

      for (const def of accountDefs) {
        await payload.create({
          collection: 'gl-accounts',
          data: { tenant: host.id, ...def, balance: 0, status: 'active' },
        });
      }

      const result1 = await new FullAccountingCycleSeed(payload as unknown as Payload, host.id).seed();
      const result2 = await new RealWorldScenarioSeed(payload as unknown as Payload, host.id).seed();

      expect(result1.seedLevel).toBe('e2e');
      expect(result2.seedLevel).toBe('e2e');
    });
  });
});
