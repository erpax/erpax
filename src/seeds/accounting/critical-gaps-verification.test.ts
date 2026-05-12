/**
 * Critical Gaps Verification Tests — validate every blocking gap from
 * gap analysis is fixed.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @audit ISO-19011:2018 audit-trail
 * @compliance SOX §404 internal-controls
 * @see docs/STANDARDS.md §4.2 §7
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  MinimalTenantSeed,
  MinimalGLAccountsSeed,
  MinimalUsersSeed,
  MinimalCurrencyRatesSeed,
  Level1SeedSuite,
} from '@/services/accounting/seeds/level-1';
import { IsolatedTestEnvironment } from '@/testing';
import { MockPayload } from '../../helpers/mock-payload';
import type { Payload } from 'payload';

describe('GAP 1: ID Collision Prevention (environmentId)', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload();
  });

  it('should generate unique environment IDs for parallel tests', async () => {
    const seed1 = new MinimalTenantSeed(payload as unknown as Payload);
    const seed2 = new MinimalTenantSeed(payload as unknown as Payload);

    const result1 = await seed1.seed();
    const result2 = await seed2.seed();

    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);

    // Both seeds should have successfully created their own isolated contexts
    expect(seed1['context']?.environmentId).toBeDefined();
    expect(seed2['context']?.environmentId).toBeDefined();
    expect(seed1['context']?.environmentId).not.toBe(seed2['context']?.environmentId);
  });

  it('should track created IDs separately in isolated environments', async () => {
    const seed1 = new MinimalTenantSeed(payload as unknown as Payload);
    const seed2 = new MinimalTenantSeed(payload as unknown as Payload);

    await seed1.seed();
    await seed2.seed();

    const ids1 = seed1['context']?.createdIds.get('hosts');
    const ids2 = seed2['context']?.createdIds.get('hosts');

    expect(ids1).toBeDefined();
    expect(ids2).toBeDefined();
    expect(ids1!.size).toBe(1);
    expect(ids2!.size).toBe(1);

    // IDs should be different (from different hosts created)
    const id1 = Array.from(ids1!)[0];
    const id2 = Array.from(ids2!)[0];
    expect(id1).not.toBe(id2);
  });
});

describe('GAP 2: Multiple Setups Prevention', () => {
  let payload: MockPayload;
  let env: IsolatedTestEnvironment;

  beforeEach(() => {
    payload = new MockPayload();
    env = new IsolatedTestEnvironment(payload as unknown as Payload);
  });

  afterEach(async () => {
    await env.teardown();
  });

  it('should prevent multiple setups in same environment', async () => {
    const seed1 = new MinimalTenantSeed(payload as unknown as Payload);
    await env.setup(seed1);

    const seed2 = new MinimalTenantSeed(payload as unknown as Payload);
    await expect(env.setup(seed2)).rejects.toThrow(
      'Environment already set up. Call teardown() before calling setup() again.',
    );
  });

  it('should allow setup after teardown', async () => {
    const seed1 = new MinimalTenantSeed(payload as unknown as Payload);
    await env.setup(seed1);
    await env.teardown();

    const seed2 = new MinimalTenantSeed(payload as unknown as Payload);
    await expect(env.setup(seed2)).resolves.not.toThrow();
  });
});

describe('GAP 3: Cleanup Status Reporting', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload();
  });

  it('should return CleanupResult with success status', async () => {
    const seed = new MinimalTenantSeed(payload as unknown as Payload);
    await seed.seed();

    const cleanupResult = await seed.cleanup();

    expect(cleanupResult).toBeDefined();
    expect(cleanupResult.success).toBe(true);
    expect(cleanupResult.totalTime).toBeGreaterThanOrEqual(0);
    expect(cleanupResult.itemsDeleted).toBeGreaterThan(0);
    expect(cleanupResult.failures).toEqual([]);
  });

  it('should track cleanup failures', async () => {
    const seed = new MinimalTenantSeed(payload as unknown as Payload);
    await seed.seed();

    // Simulate a deletion failure by using a broken ID
    seed['context']!.createdIds.set('hosts', new Set(['fake-id-that-wont-delete']));

    const cleanupResult = await seed.cleanup();

    expect(cleanupResult.success).toBe(false);
    expect(cleanupResult.failures.length).toBeGreaterThan(0);
  });

  it('should report cleanup statistics', async () => {
    const seed = new Level1SeedSuite(payload as unknown as Payload);
    const seedResult = await seed.seed();

    if (seedResult.success) {
      const cleanupResult = await seed.cleanup();

      expect(cleanupResult.totalTime).toBeGreaterThanOrEqual(0);
      expect(cleanupResult.itemsDeleted).toBeGreaterThan(0);
      expect(typeof cleanupResult.totalTime).toBe('number');
      expect(typeof cleanupResult.itemsDeleted).toBe('number');
    }
  });
});

describe('GAP 4: Seed Data Validation', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload();
  });

  describe('MinimalTenantSeed validation', () => {
    it('should validate required host fields', async () => {
      const seed = new MinimalTenantSeed(payload as unknown as Payload);
      seed['context'] = seed['createContext']('unit');

      // Missing name
      await expect(
        seed['createDocument']('hosts', {
          code: 'TEST',
          status: 'active',
        }),
      ).rejects.toThrow('Host: name is required');

      // Missing code
      await expect(
        seed['createDocument']('hosts', {
          name: 'Test Host',
          status: 'active',
        }),
      ).rejects.toThrow('Host: code is required');

      // Missing status
      await expect(
        seed['createDocument']('hosts', {
          name: 'Test Host',
          code: 'TEST',
        }),
      ).rejects.toThrow('Host: status is required');
    });
  });

  describe('MinimalGLAccountsSeed validation', () => {
    it('should validate required GL account fields', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      const hostResult = await tenantSeed.seed();
      expect(hostResult.success).toBe(true);
      const tenantId = Array.from(tenantSeed['context']!.createdIds.get('hosts') || new Set())[0];

      const glSeed = new MinimalGLAccountsSeed(payload as unknown as Payload, tenantId);
      glSeed['context'] = glSeed['createContext']('unit');

      // Missing accountNumber
      await expect(
        glSeed['createDocument']('gl-accounts', {
          tenantId,
          accountName: 'Cash',
          accountType: 'asset',
          status: 'active',
        }),
      ).rejects.toThrow('GL account: accountNumber is required');

      // Missing accountName
      await expect(
        glSeed['createDocument']('gl-accounts', {
          tenantId,
          accountNumber: '1000',
          accountType: 'asset',
          status: 'active',
        }),
      ).rejects.toThrow('GL account: accountName is required');

      // Missing accountType
      await expect(
        glSeed['createDocument']('gl-accounts', {
          tenantId,
          accountNumber: '1000',
          accountName: 'Cash',
          status: 'active',
        }),
      ).rejects.toThrow('GL account: accountType is required');

      // Missing status
      await expect(
        glSeed['createDocument']('gl-accounts', {
          tenantId,
          accountNumber: '1000',
          accountName: 'Cash',
          accountType: 'asset',
        }),
      ).rejects.toThrow('GL account: status is required');
    });
  });

  describe('MinimalUsersSeed validation', () => {
    // Field surface mirrors `Users` collection (NIST INCITS-359 RBAC):
    //   roles: string[]   ← plural array, not singular `role`
    it('should validate required user fields', async () => {
      const seed = new MinimalUsersSeed(payload as unknown as Payload);
      seed['context'] = seed['createContext']('unit');

      // Missing email
      await expect(
        seed['createDocument']('users', {
          password: 'test123',
          roles: ['admin'],
          status: 'active',
        }),
      ).rejects.toThrow('User: email is required');

      // Missing password
      await expect(
        seed['createDocument']('users', {
          email: 'test@test.local',
          roles: ['admin'],
          status: 'active',
        }),
      ).rejects.toThrow('User: password is required');

      // Missing roles
      await expect(
        seed['createDocument']('users', {
          email: 'test@test.local',
          password: 'test123',
          status: 'active',
        }),
      ).rejects.toThrow('User: roles is required');

      // Missing status
      await expect(
        seed['createDocument']('users', {
          email: 'test@test.local',
          password: 'test123',
          roles: ['admin'],
        }),
      ).rejects.toThrow('User: status is required');
    });
  });

  describe('MinimalCurrencyRatesSeed validation', () => {
    it('should validate required currency rate fields', async () => {
      const tenantSeed = new MinimalTenantSeed(payload as unknown as Payload);
      const hostResult = await tenantSeed.seed();
      expect(hostResult.success).toBe(true);
      const tenantId = Array.from(tenantSeed['context']!.createdIds.get('hosts') || new Set())[0];

      const rateSeed = new MinimalCurrencyRatesSeed(payload as unknown as Payload, tenantId);
      rateSeed['context'] = rateSeed['createContext']('unit');

      // Missing fromCurrency
      await expect(
        rateSeed['createDocument']('currency-rates', {
          tenantId,
          toCurrency: 'USD',
          rate: 1.0,
          effectiveDate: '2024-01-01',
          status: 'active',
        }),
      ).rejects.toThrow('Currency rate: fromCurrency is required');

      // Missing toCurrency
      await expect(
        rateSeed['createDocument']('currency-rates', {
          tenantId,
          fromCurrency: 'EUR',
          rate: 1.0,
          effectiveDate: '2024-01-01',
          status: 'active',
        }),
      ).rejects.toThrow('Currency rate: toCurrency is required');

      // Missing rate
      await expect(
        rateSeed['createDocument']('currency-rates', {
          tenantId,
          fromCurrency: 'EUR',
          toCurrency: 'USD',
          effectiveDate: '2024-01-01',
          status: 'active',
        }),
      ).rejects.toThrow('Currency rate: rate is required');

      // Missing effectiveDate
      await expect(
        rateSeed['createDocument']('currency-rates', {
          tenantId,
          fromCurrency: 'EUR',
          toCurrency: 'USD',
          rate: 1.0,
          status: 'active',
        }),
      ).rejects.toThrow('Currency rate: effectiveDate is required');

      // Missing status
      await expect(
        rateSeed['createDocument']('currency-rates', {
          tenantId,
          fromCurrency: 'EUR',
          toCurrency: 'USD',
          rate: 1.0,
          effectiveDate: '2024-01-01',
        }),
      ).rejects.toThrow('Currency rate: status is required');
    });
  });
});

describe('GAP 4b: Duplicate ID Detection (Set-based tracking)', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload();
  });

  it('should prevent duplicate ID tracking with Set', async () => {
    const seed = new MinimalTenantSeed(payload as unknown as Payload);
    await seed.seed();

    const hostIds = seed['context']?.createdIds.get('hosts');
    expect(hostIds).toBeInstanceOf(Set);
    expect(hostIds?.size).toBe(1);

    // Try adding duplicate (Set prevents it)
    const firstId = Array.from(hostIds!)[0];
    hostIds?.add(firstId);

    expect(hostIds?.size).toBe(1); // Still 1, not 2
  });

  it('should use Set for efficient ID tracking', async () => {
    const seed = new Level1SeedSuite(payload as unknown as Payload);
    const result = await seed.seed();

    if (result.success) {
      for (const [collection, ids] of seed['context']!.createdIds.entries()) {
        expect(ids, `collection ${collection} should track created IDs as a Set`).toBeInstanceOf(Set);
      }
    }
  });
});

describe('Integration: All Blocking Gaps Fixed', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload();
  });

  it('should complete full Level 1 seed suite with all fixes', async () => {
    const suite = new Level1SeedSuite(payload as unknown as Payload);
    const seedResult = await suite.seed();

    expect(seedResult.success).toBe(true);
    expect(seedResult.itemsCreated).toBeGreaterThan(0);
    expect(seedResult.totalTime).toBeLessThan(500); // Should be fast (unit test level)

    const cleanupResult = await suite.cleanup();

    expect(cleanupResult.success).toBe(true);
    expect(cleanupResult.itemsDeleted).toBe(seedResult.itemsCreated);
    expect(cleanupResult.failures).toEqual([]);
  });

  it('should handle complete seed lifecycle with isolation', async () => {
    const env = new IsolatedTestEnvironment(payload as unknown as Payload);

    const suite = new Level1SeedSuite(payload as unknown as Payload);
    const setupResult = await env.setup(suite);

    expect(setupResult.success).toBe(true);

    const ids = env.getCreatedIds('hosts');
    expect(ids.length).toBeGreaterThan(0);

    const cleanupResult = await env.teardown();

    expect(cleanupResult?.success).toBe(true);
  });
});
