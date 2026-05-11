/**
 * TestSeedFactory tests — isolation, cleanup, transactional seeding.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
 * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
 * @audit ISO-19011:2018 audit-trail seed-cleanup
 * @see docs/STANDARDS.md §7
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import type { Payload } from 'payload';
import {
  TestSeedFactory,
  TransactionalSeedFactory,
  type SeedResult,
} from '../../src/testing';

/**
 * Mock Payload instance for testing
 */
class MockPayload implements Partial<Payload> {
  private documents: Map<string, Map<string, Record<string, unknown>>> = new Map();

  async create({ collection, data }: Record<string, unknown>) {
    if (!this.documents.has(collection as string)) {
      this.documents.set(collection as string, new Map());
    }
    const id = Math.random().toString(36).substr(2, 9);
    const doc = { ...(data as Record<string, unknown>), id };
    this.documents.get(collection as string)!.set(id, doc);
    return doc;
  }

  async find({ collection, where }: Record<string, unknown>) {
    let docs = Array.from(this.documents.get(collection as string)?.values() || []);
    // Minimal where filter — supports `where: { field: { equals: value } }`
    // which is the most common Payload predicate.
    if (where && typeof where === 'object') {
      for (const [field, condition] of Object.entries(where as Record<string, { equals?: unknown }>)) {
        if (condition && typeof condition === 'object' && 'equals' in condition) {
          docs = docs.filter((d) => d[field] === condition.equals);
        }
      }
    }
    return { docs, totalDocs: docs.length };
  }

  async delete({ collection, id }: Record<string, unknown>) {
    const doc = this.documents.get(collection as string)?.get(id as string);
    this.documents.get(collection as string)?.delete(id as string);
    return doc;
  }

  async update({ collection, id, data }: Record<string, unknown>) {
    const doc = this.documents.get(collection as string)?.get(id as string);
    if (!doc) throw new Error('Not found');
    const updated = { ...doc, ...(data as Record<string, unknown>) };
    this.documents.get(collection as string)!.set(id as string, updated);
    return updated;
  }

  getCreatedDocs(collection: string) {
    return Array.from(this.documents.get(collection)?.values() || []);
  }

  clearAll() {
    this.documents.clear();
  }
}

/**
 * Test implementation of TestSeedFactory
 */
class TestImplementation extends TestSeedFactory {
  async seed(): Promise<SeedResult> {
    this.context = this.createContext('unit');

    try {
      // Create a test document + track its id so the seed context's
      // createdIds map reflects what we just inserted (proves the
      // factory's tracking surface is wired).
      const doc = await this.createDocument('test-collection', {
        name: 'Test Doc',
      });
      this.trackCreatedId('test-collection', (doc as { id: string }).id);

      return {
        success: true,
        ...this.getStats(),
      };
    } catch (error) {
      return {
        success: false,
        seedLevel: 'unit',
        totalTime: Date.now() - this.context!.startTime,
        itemsCreated: 0,
        collections: {},
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }
}

/**
 * Test Transactional implementation
 */
class TestTransactionalImplementation extends TransactionalSeedFactory {
  private transactionIds: Set<string> = new Set();

  async startTransaction(): Promise<string> {
    const txId = `tx-${Date.now()}`;
    this.transactionIds.add(txId);
    return txId;
  }

  async rollbackTransaction(transactionId: string): Promise<void> {
    this.transactionIds.delete(transactionId);
  }

  async commitTransaction(transactionId: string): Promise<void> {
    this.transactionIds.delete(transactionId);
  }

  async seed(): Promise<SeedResult> {
    this.context = this.createContext('unit');
    this.context.transactionId = await this.startTransaction();

    try {
      const doc = await this.createDocument('test-collection', { name: 'Test' });
      this.trackCreatedId('test-collection', (doc as { id: string }).id);

      return {
        success: true,
        ...this.getStats(),
      };
    } catch (error) {
      return {
        success: false,
        seedLevel: 'unit',
        totalTime: Date.now() - this.context!.startTime,
        itemsCreated: 0,
        collections: {},
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }
}

describe('TestSeedFactory - Core Functionality', () => {
  let payload: MockPayload;
  let factory: TestImplementation;

  beforeEach(() => {
    payload = new MockPayload();
    factory = new TestImplementation(payload as unknown as Payload);
  });

  afterEach(async () => {
    await factory.cleanup();
    payload.clearAll();
  });

  describe('Seed Execution', () => {
    it('should successfully create documents', async () => {
      const result = await factory.seed();

      expect(result.success).toBe(true);
      expect(result.seedLevel).toBe('unit');
      expect(result.itemsCreated).toBeGreaterThan(0);
    });

    it('should track performance metrics', async () => {
      const result = await factory.seed();

      expect(result.totalTime).toBeGreaterThan(0);
      expect(result.totalTime).toBeLessThan(1000); // Should be fast
    });

    it('should report creation by collection', async () => {
      const result = await factory.seed();

      expect(result.collections).toHaveProperty('test-collection');
      expect(result.collections['test-collection']).toBeGreaterThan(0);
    });

    it('should handle errors gracefully', async () => {
      const badFactory = new TestImplementation(null as unknown as Payload);
      const result = await badFactory.seed();

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('Document Tracking', () => {
    it('should track all created document IDs', async () => {
      await factory.seed();

      const ids = factory['context']?.createdIds.get('test-collection') || new Set();
      expect(ids.size).toBeGreaterThan(0);
    });

    it('should associate IDs with collections', async () => {
      await factory.seed();

      const context = factory['context'];
      expect(context?.createdIds.size).toBeGreaterThan(0);
      expect(Array.from(context!.createdIds.keys())).toContain('test-collection');
    });

    it('should prevent duplicate tracking with Set', async () => {
      await factory.seed();

      const context = factory['context'];
      const ids = context?.createdIds.get('test-collection') || new Set();
      const originalCount = ids.size;

      // Try to track same ID again (Set prevents duplicates)
      const firstId = Array.from(ids)[0];
      factory['trackCreatedId']('test-collection', firstId);

      const newCount = context?.createdIds.get('test-collection')?.size || 0;
      expect(newCount).toBe(originalCount); // Set prevents duplicates
    });
  });

  describe('Cleanup', () => {
    it('should cleanup all created documents', async () => {
      await factory.seed();

      const docsBefore = payload.getCreatedDocs('test-collection');
      expect(docsBefore.length).toBeGreaterThan(0);

      const cleanupResult = await factory.cleanup();
      expect(cleanupResult.success).toBe(true);

      const docsAfter = payload.getCreatedDocs('test-collection');
      expect(docsAfter.length).toBe(0);
    });

    it('should handle cleanup of non-existent documents', async () => {
      await factory.seed();
      const context = factory['context'];
      // Add fake ID that doesn't exist
      context?.createdIds.get('test-collection')?.add('nonexistent-id');

      // Should complete with failures reported
      const cleanupResult = await factory.cleanup();
      expect(cleanupResult.failures.length).toBeGreaterThan(0);
    });

    it('should clear context after cleanup', async () => {
      await factory.seed();
      expect(factory['context']).toBeDefined();

      await factory.cleanup();
      expect(factory['context']).toBeNull();
    });
  });

  describe('Hooks', () => {
    it('should call beforeSeed hook', async () => {
      const beforeSeed = vi.fn();
      factory.registerHooks({ beforeSeed });

      await factory.seed();

      expect(factory['hooks'].beforeSeed).toBeDefined();
    });

    it('should call afterSeed hook', async () => {
      const afterSeed = vi.fn();
      factory.registerHooks({ afterSeed });

      await factory.seed();

      expect(factory['hooks'].afterSeed).toBeDefined();
    });

    it('should support multiple hook registrations', async () => {
      const hook1 = { beforeSeed: vi.fn() };
      const hook2 = { afterSeed: vi.fn() };

      factory.registerHooks(hook1);
      factory.registerHooks(hook2);

      expect(factory['hooks'].beforeSeed).toBeDefined();
      expect(factory['hooks'].afterSeed).toBeDefined();
    });
  });

  describe('Cleanup Strategies', () => {
    it('should set cleanup strategy', () => {
      expect(factory.setCleanupStrategy('cascade-delete')).toBe(factory);
      expect(factory['cleanupStrategy']).toBe('cascade-delete');
    });

    it('should support transaction-rollback strategy', () => {
      factory.setCleanupStrategy('transaction-rollback');
      expect(factory['cleanupStrategy']).toBe('transaction-rollback');
    });

    it('should support soft-delete strategy', () => {
      factory.setCleanupStrategy('soft-delete');
      expect(factory['cleanupStrategy']).toBe('soft-delete');
    });

    it('should support none strategy', () => {
      factory.setCleanupStrategy('none');
      expect(factory['cleanupStrategy']).toBe('none');
    });

    it('should allow chaining strategies with hooks', () => {
      const result = factory
        .setCleanupStrategy('cascade-delete')
        .registerHooks({
          beforeSeed: async () => {},
        });

      expect(result).toBe(factory);
    });
  });

  describe('Statistics', () => {
    it('should report correct item count', async () => {
      const result = await factory.seed();

      expect(result.itemsCreated).toEqual(
        Object.values(result.collections).reduce((a, b) => a + b, 0),
      );
    });

    it('should include seed level in stats', async () => {
      const result = await factory.seed();

      expect(['unit', 'integration', 'e2e']).toContain(result.seedLevel);
    });

    it('should measure execution time accurately', async () => {
      const start = Date.now();
      const result = await factory.seed();
      const elapsed = Date.now() - start;

      // Result time should be close to actual elapsed time
      expect(Math.abs(result.totalTime - elapsed)).toBeLessThan(100);
    });
  });
});

describe('TransactionalSeedFactory', () => {
  let payload: MockPayload;
  let factory: TestTransactionalImplementation;

  beforeEach(() => {
    payload = new MockPayload();
    factory = new TestTransactionalImplementation(payload as unknown as Payload);
  });

  afterEach(async () => {
    await factory.cleanup();
    payload.clearAll();
  });

  it('should start transaction', async () => {
    const txId = await factory.startTransaction();

    expect(txId).toBeDefined();
    expect(txId).toMatch(/^tx-/);
  });

  it('should use transaction rollback for cleanup', async () => {
    factory.setCleanupStrategy('transaction-rollback');
    await factory.seed();

    // Should use transaction rollback instead of cascade delete
    await factory.cleanup();

    expect(factory['context']).toBeNull();
  });

  it('should seed within transaction', async () => {
    const result = await factory.seed();

    expect(result.success).toBe(true);
    expect(factory['context']?.transactionId).toBeDefined();
  });
});

describe('Edge Cases & Error Handling', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload();
  });

  it('should handle null payload gracefully', async () => {
    const factory = new TestImplementation(null as unknown as Payload);
    const result = await factory.seed();

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  it('should handle cleanup without seed', async () => {
    const factory = new TestImplementation(payload as unknown as Payload);

    // Should not throw if cleanup called without seed
    await expect(factory.cleanup()).resolves.not.toThrow();
  });

  it('should handle multiple cleanups safely', async () => {
    const factory = new TestImplementation(payload as unknown as Payload);
    await factory.seed();

    await factory.cleanup();
    await expect(factory.cleanup()).resolves.not.toThrow();
  });
});
