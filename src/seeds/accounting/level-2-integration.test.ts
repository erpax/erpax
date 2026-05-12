/**
 * Level 2 Integration Tests — multi-document relationships, realistic seeds.
 *
 * @standard ISO/IEC-29119:2022 software-testing integration-test-level
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @audit ISO-19011:2018 audit-trail
 * @see docs/STANDARDS.md §4.2 §7
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { Payload } from 'payload';
import {
  JournalEntrySeed,
  AccountingCycleSeed,
  MultiCurrencySeed,
  RoleScopedDataSeed,
  Level2SeedSuite,
} from '@/services/accounting/seeds/level-2';
import { MinimalTenantSeed, MinimalGLAccountsSeed } from '@/services/accounting/seeds/level-1';
import { initializeDiscovery } from '@/testing';
import { MockPayload, type MockCollectionConfig } from '../../helpers/mock-payload';

/**
 * Schema surface the Level-2 seeds touch — extracted so the spec body stays
 * focused on assertions rather than collection wiring.
 */
const LEVEL_2_COLLECTIONS: ReadonlyArray<MockCollectionConfig> = [
  {
    slug: 'tenants',
    labels: { singular: 'Tenant' },
    fields: [
      { name: 'name', type: 'text', required: true },
      { name: 'code', type: 'text', required: true },
      { name: 'status', type: 'text', required: true },
    ],
  },
  {
    slug: 'gl-accounts',
    labels: { singular: 'GL Account' },
    fields: [
      { name: 'tenant', type: 'relationship', required: true, relationshipTo: 'tenants' },
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
      { name: 'tenant', type: 'relationship', required: true, relationshipTo: 'tenants' },
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
    slug: 'accounting-cycles',
    labels: { singular: 'Accounting Cycle' },
    fields: [
      { name: 'tenant', type: 'relationship', required: true, relationshipTo: 'tenants' },
      { name: 'periodType', type: 'text', required: true },
      { name: 'periodNumber', type: 'number', required: true },
      { name: 'year', type: 'number', required: true },
      { name: 'startDate', type: 'date', required: true },
      { name: 'endDate', type: 'date', required: true },
      { name: 'status', type: 'text', required: true },
    ],
  },
  {
    slug: 'fx-transactions',
    labels: { singular: 'FX Transaction' },
    fields: [
      { name: 'tenant', type: 'relationship', required: true, relationshipTo: 'tenants' },
      { name: 'transactionDate', type: 'date', required: true },
      { name: 'fromCurrency', type: 'text', required: true },
      { name: 'toCurrency', type: 'text', required: true },
      { name: 'fromAmount', type: 'number', required: true },
      { name: 'exchangeRate', type: 'number', required: true },
      { name: 'toAmount', type: 'number', required: true },
      { name: 'description', type: 'text', required: false },
      { name: 'status', type: 'text', required: true },
    ],
  },
  {
    slug: 'role-scoped-access',
    labels: { singular: 'Role Scoped Access' },
    fields: [
      { name: 'tenant', type: 'relationship', required: true, relationshipTo: 'tenants' },
      { name: 'role', type: 'text', required: true },
      { name: 'resourceType', type: 'text', required: true },
      { name: 'canCreate', type: 'checkbox', required: true },
      { name: 'canRead', type: 'checkbox', required: true },
      { name: 'canUpdate', type: 'checkbox', required: true },
      { name: 'canDelete', type: 'checkbox', required: true },
      { name: 'scope', type: 'text', required: true },
    ],
  },
];

describe('Level 2 Integration Seeds - Accounting Plugin', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload({ collections: LEVEL_2_COLLECTIONS });
    initializeDiscovery(payload as unknown as Payload);
  });

  describe('JournalEntrySeed', () => {
    it('should create balanced GL transactions', async () => {
      // Setup: Create host and GL accounts
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      const hostResult = await tenantSeed.seed();
      expect(hostResult.success).toBe(true);

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const glSeed = new MinimalGLAccountsSeed(payload as unknown as Payload, tenantId);
      const glResult = await glSeed.seed();
      expect(glResult.success).toBe(true);

      // Test: Create journal entries
      const seed = new JournalEntrySeed(payload as unknown as Payload, tenantId);
      const result = await seed.seed();

      expect(result.success).toBe(true);
      expect(result.itemsCreated).toBeGreaterThan(0);
      expect(result.collections['journal-entries']).toBeDefined();

      // Verify entries are balanced
      const entries = await payload.find({ collection: 'journal-entries' });
      for (const entry of entries.docs) {
        expect(Math.abs(entry.debitAmount - entry.creditAmount)).toBeLessThan(0.01);
      }
    });

    it('should validate balanced debits and credits', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const seed = new JournalEntrySeed(payload as unknown as Payload, tenantId);

      // Should fail with unbalanced amounts
      await expect(
        seed['createDocument']('journal-entries', {
          tenantId,
          entryDate: '2024-01-01',
          reference: 'JE-INVALID',
          debitAmount: 1000,
          creditAmount: 999,
          status: 'posted',
        }),
      ).rejects.toThrow('balanced entry');
    });

    it('should require valid entry dates', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const seed = new JournalEntrySeed(payload as unknown as Payload, tenantId);

      // Should fail with invalid date
      await expect(
        seed['createDocument']('journal-entries', {
          tenantId,
          entryDate: 'invalid-date',
          reference: 'JE-INVALID',
          debitAmount: 1000,
          creditAmount: 1000,
          status: 'posted',
        }),
      ).rejects.toThrow('valid date');
    });
  });

  describe('AccountingCycleSeed', () => {
    it('should create accounting cycles for different periods', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const seed = new AccountingCycleSeed(payload as unknown as Payload, tenantId);
      const result = await seed.seed();

      expect(result.success).toBe(true);
      expect(result.itemsCreated).toBeGreaterThan(0);

      const cycles = await payload.find({ collection: 'accounting-cycles' });
      expect(cycles.docs.length).toBeGreaterThan(0);

      // Verify cycle types
      const periodTypes = new Set(cycles.docs.map((c) => c.periodType));
      expect(periodTypes.has('monthly')).toBe(true);
      expect(periodTypes.has('quarterly')).toBe(true);
      expect(periodTypes.has('yearly')).toBe(true);
    });

    it('should validate period types', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const seed = new AccountingCycleSeed(payload as unknown as Payload, tenantId);

      // Should fail with invalid period type
      await expect(
        seed['createDocument']('accounting-cycles', {
          tenantId,
          periodType: 'invalid',
          periodNumber: 1,
          year: 2024,
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          status: 'open',
        }),
      ).rejects.toThrow('periodType must be one of');
    });
  });

  describe('MultiCurrencySeed', () => {
    it('should create FX transactions with proper exchange rates', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const seed = new MultiCurrencySeed(payload as unknown as Payload, tenantId);
      const result = await seed.seed();

      expect(result.success).toBe(true);
      expect(result.itemsCreated).toBeGreaterThan(0);

      const txns = await payload.find({ collection: 'fx-transactions' });
      expect(txns.docs.length).toBeGreaterThan(0);

      // Verify exchange rate calculations
      for (const txn of txns.docs) {
        const calculated = txn.fromAmount * txn.exchangeRate;
        expect(Math.abs(calculated - txn.toAmount)).toBeLessThan(1);
      }
    });

    it('should validate different currencies', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const seed = new MultiCurrencySeed(payload as unknown as Payload, tenantId);

      // Should fail with same currency
      await expect(
        seed['createDocument']('fx-transactions', {
          tenantId,
          transactionDate: '2024-01-01',
          fromCurrency: 'USD',
          toCurrency: 'USD',
          fromAmount: 1000,
          exchangeRate: 1.0,
          toAmount: 1000,
          status: 'recorded',
        }),
      ).rejects.toThrow('must be different');
    });
  });

  describe('RoleScopedDataSeed', () => {
    it('should create role-based access configurations', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const seed = new RoleScopedDataSeed(payload as unknown as Payload, tenantId);
      const result = await seed.seed();

      expect(result.success).toBe(true);
      expect(result.itemsCreated).toBeGreaterThan(0);

      const configs = await payload.find({ collection: 'role-scoped-access' });
      expect(configs.docs.length).toBeGreaterThan(0);

      // Verify role coverage
      const roles = new Set(configs.docs.map((c) => c.role));
      expect(roles.has('admin')).toBe(true);
      expect(roles.has('accountant')).toBe(true);
      expect(roles.has('auditor')).toBe(true);
    });

    it('should validate role values', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const hosts = await payload.find({ collection: 'hosts' });
      const tenantId = hosts.docs[0].id;

      const seed = new RoleScopedDataSeed(payload as unknown as Payload, tenantId);

      // Should fail with invalid role
      await expect(
        seed['createDocument']('role-scoped-access', {
          tenantId,
          role: 'invalid-role',
          resourceType: 'journal-entries',
          canCreate: true,
          canRead: true,
          canUpdate: false,
          canDelete: false,
          scope: 'all',
        }),
      ).rejects.toThrow('role must be one of');
    });
  });

  describe('Level2SeedSuite', () => {
    it('should run complete Level 2 seed suite', async () => {
      // First, seed Level 1 data
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const glSeed = new MinimalGLAccountsSeed(payload as unknown as Payload, 'host-1');
      await glSeed.seed();

      // Run Level 2 suite
      const suite = new Level2SeedSuite(payload as unknown as Payload);
      const result = await suite.seed();

      expect(result.success).toBe(true);
      expect(result.seedLevel).toBe('integration');
      expect(result.totalTime).toBeLessThan(5000); // Should complete in < 5 seconds
    });

    it('should require Level 1 seeds to be run first', async () => {
      // Don't seed Level 1 - just try Level 2
      const suite = new Level2SeedSuite(payload as unknown as Payload);
      const result = await suite.seed();

      expect(result.success).toBe(false);
      expect(result.error?.message).toContain('test host found');
    });

    it('should track all created IDs for cleanup', async () => {
      // Setup Level 1
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const glSeed = new MinimalGLAccountsSeed(payload as unknown as Payload, 'host-1');
      await glSeed.seed();

      // Run Level 2
      const suite = new Level2SeedSuite(payload as unknown as Payload);
      const result = await suite.seed();

      expect(result.success).toBe(true);

      // Verify all collections are tracked
      expect(Object.keys(result.collections).length).toBeGreaterThan(0);
      expect(result.collections['journal-entries']).toBeDefined();
      expect(result.collections['accounting-cycles']).toBeDefined();
    });
  });

  describe('Level 2 Integration Patterns', () => {
    it('should support seed hooks', async () => {
      let beforeCalled = false;
      let afterCalled = false;

      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const glSeed = new MinimalGLAccountsSeed(payload as unknown as Payload, 'host-1');
      await glSeed.seed();

      const seed = new JournalEntrySeed(payload as unknown as Payload, 'host-1');
      seed.registerHooks({
        beforeSeed: async () => {
          beforeCalled = true;
        },
        afterSeed: async () => {
          afterCalled = true;
        },
      });

      await seed.seed();

      expect(beforeCalled).toBe(true);
      expect(afterCalled).toBe(true);
    });

    it('should cleanup created documents on demand', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      await tenantSeed.seed();

      const glSeed = new MinimalGLAccountsSeed(payload as unknown as Payload, 'host-1');
      await glSeed.seed();

      const seed = new JournalEntrySeed(payload as unknown as Payload, 'host-1');
      await seed.seed();

      // Verify entries were created
      let entries = await payload.find({ collection: 'journal-entries' });
      const initialCount = entries.docs.length;
      expect(initialCount).toBeGreaterThan(0);

      // Cleanup
      const cleanupResult = await seed.cleanup();
      expect(cleanupResult.success).toBe(true);

      // Verify entries were deleted
      entries = await payload.find({ collection: 'journal-entries' });
      expect(entries.docs.length).toBeLessThan(initialCount);
    });
  });

  afterEach(() => {
    payload.reset();
  });
});
