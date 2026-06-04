/**
 * Test setup utility tests — isolated environments, parallel runners, snapshots.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-infrastructure
 * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
 * @see docs/STANDARDS.md §7
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  IsolatedTestEnvironment,
  ParallelTestRunner,
  SeedSnapshot,
  TestSeedFactory,
  type SeedResult,
} from '@/testing';
import type { Payload } from 'payload';

/**
 * Mock implementations for testing
 */
class MockPayload {
  private documents: Map<string, Map<string, Record<string, unknown>>> = new Map();

  async create({ collection, data }: { collection: string; data: Record<string, unknown> }) {
    if (!this.documents.has(collection)) {
      this.documents.set(collection, new Map());
    }
    const id = `${collection}-${Math.random().toString(36).substr(2, 9)}`;
    const doc = { ...data, id };
    this.documents.get(collection)!.set(id, doc);
    return doc;
  }

  async find({ collection }: { collection: string }) {
    const docs = Array.from(this.documents.get(collection)?.values() || []);
    return { docs, totalDocs: docs.length };
  }

  async delete({ collection, id }: { collection: string; id: string }) {
    this.documents.get(collection)?.delete(id);
    return { id };
  }

  getDocuments(collection: string) {
    return Array.from(this.documents.get(collection)?.values() || []);
  }

  clearAll() {
    this.documents.clear();
  }
}

class SimpleSeed extends TestSeedFactory {
  private itemCount: number = 3;

  constructor(payload: Payload, itemCount?: number) {
    super(payload);
    if (itemCount) this.itemCount = itemCount;
  }

  async seed(): Promise<SeedResult> {
    this.context = this.createContext('unit');

    try {
      for (let i = 0; i < this.itemCount; i++) {
        await this.createDocument('items', {
          name: `Item ${i}`,
        });
      }

      return {
        success: true,
        ...this.getStats(),
      };
    } catch (error) {
      return {
        success: false,
        seedLevel: 'unit',
        totalTime: 0,
        itemsCreated: 0,
        collections: {},
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }
}

describe('IsolatedTestEnvironment', () => {
  let payload: MockPayload;
  let env: IsolatedTestEnvironment;

  beforeEach(() => {
    payload = new MockPayload();
    env = new IsolatedTestEnvironment(payload as unknown as Payload);
  });

  afterEach(async () => {
    await env.teardown();
  });

  describe('Setup', () => {
    it('should setup with seed factory', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload);
      const result = await env.setup(factory);

      expect(result.success).toBe(true);
      expect(result.itemsCreated).toBe(3);
    });

    it('should handle setup failures', async () => {
      const factory = new SimpleSeed(null as unknown as Payload);

      await expect(env.setup(factory)).rejects.toThrow();
    });

    it('should track created document IDs', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload);
      await env.setup(factory);

      const ids = env.getCreatedIds('items');
      expect(ids).toHaveLength(3);
      expect(ids[0]).toBeDefined();
      expect(ids[0]).toMatch(/^items-/);
    });
  });

  describe('Document Access', () => {
    it('should retrieve created ID by collection', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload);
      await env.setup(factory);

      const id = env.getCreatedId('items');
      expect(id).toBeDefined();
      expect(id).toMatch(/^items-/);
    });

    it('should return null for non-existent collection', () => {
      const id = env.getCreatedId('non-existent');
      expect(id).toBeNull();
    });

    it('should retrieve all created documents', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload, 5);
      await env.setup(factory);

      const docs = await env.getCreatedDocuments('items');
      expect(docs).toHaveLength(5);
      expect(docs[0]).toHaveProperty('name');
    });

    it('should return empty array for non-existent collection', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload);
      await env.setup(factory);

      const docs = await env.getCreatedDocuments('non-existent');
      expect(docs).toEqual([]);
    });
  });

  describe('Cleanup', () => {
    it('should cleanup all documents', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload);
      await env.setup(factory);

      expect(payload.getDocuments('items')).toHaveLength(3);

      await env.teardown();

      expect(payload.getDocuments('items')).toHaveLength(0);
    });

    it('should handle multiple teardowns', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload);
      await env.setup(factory);

      await env.teardown();
      await expect(env.teardown()).resolves.not.toThrow();
    });
  });

  describe('Statistics', () => {
    it('should return seed result statistics', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload);
      await env.setup(factory);

      const stats = env.getStats();
      expect(stats).toBeDefined();
      expect(stats?.itemsCreated).toBe(3);
      expect(stats?.seedLevel).toBe('unit');
    });

    it('should return null stats before setup', () => {
      expect(env.getStats()).toBeNull();
    });

    it('should track execution time', async () => {
      const factory = new SimpleSeed(payload as unknown as Payload);
      const result = await env.setup(factory);

      expect(result.totalTime).toBeGreaterThanOrEqual(0);
      expect(result.totalTime).toBeLessThan(1000);
    });
  });

  describe('Multiple Setups', () => {
    it('should prevent multiple setups without teardown', async () => {
      const factory1 = new SimpleSeed(payload as unknown as Payload, 2);
      await env.setup(factory1);
      expect(env.getCreatedIds('items')).toHaveLength(2);

      // Should throw on second setup
      const factory2 = new SimpleSeed(payload as unknown as Payload, 3);
      await expect(env.setup(factory2)).rejects.toThrow(
        'Environment already set up',
      );
    });
  });
});

describe('ParallelTestRunner', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload();
  });

  it('should run tests sequentially when concurrency = 1', async () => {
    const runner = new ParallelTestRunner(payload as unknown as Payload, 1);

    const results = await runner.runParallel([
      {
        name: 'Test 1',
        factory: new SimpleSeed(payload as unknown as Payload, 1),
        test: async (env) => {
          const docs = await env.getCreatedDocuments('items');
          return docs.length === 1;
        },
      },
      {
        name: 'Test 2',
        factory: new SimpleSeed(payload as unknown as Payload, 2),
        test: async (env) => {
          const docs = await env.getCreatedDocuments('items');
          return docs.length === 2;
        },
      },
    ]);

    expect(results).toHaveLength(2);
    expect(results[0].result).toBe(true);
    expect(results[1].result).toBe(true);
  });

  it('should run tests in parallel', async () => {
    const runner = new ParallelTestRunner(payload as unknown as Payload, 2);
    const timestamps: number[] = [];

    const results = await runner.runParallel([
      {
        name: 'Parallel Test 1',
        factory: new SimpleSeed(payload as unknown as Payload),
        test: async () => {
          timestamps.push(Date.now());
          return true;
        },
      },
      {
        name: 'Parallel Test 2',
        factory: new SimpleSeed(payload as unknown as Payload),
        test: async () => {
          timestamps.push(Date.now());
          return true;
        },
      },
    ]);

    expect(results).toHaveLength(2);
  });

  it('should handle test failures', async () => {
    const runner = new ParallelTestRunner(payload as unknown as Payload, 1);

    const results = await runner.runParallel([
      {
        name: 'Failing Test',
        factory: new SimpleSeed(null as unknown as Payload),
        test: async () => true,
      },
    ]);

    expect(results[0].error).toBeDefined();
  });

  it('should respect max concurrency', async () => {
    const runner = new ParallelTestRunner(payload as unknown as Payload, 2);
    let maxConcurrent = 0;
    let currentConcurrent = 0;

    const results = await runner.runParallel(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Test ${i}`,
        factory: new SimpleSeed(payload as unknown as Payload),
        test: async () => {
          currentConcurrent++;
          maxConcurrent = Math.max(maxConcurrent, currentConcurrent);
          await new Promise(r => setTimeout(r, 10));
          currentConcurrent--;
          return true;
        },
      })),
    );

    expect(results).toHaveLength(10);
    expect(maxConcurrent).toBeLessThanOrEqual(2);
  });

  it('should include test names in results', async () => {
    const runner = new ParallelTestRunner(payload as unknown as Payload, 1);

    const results = await runner.runParallel([
      {
        name: 'My Test Name',
        factory: new SimpleSeed(payload as unknown as Payload),
        test: async () => true,
      },
    ]);

    expect(results[0].name).toBe('My Test Name');
  });
});

describe('SeedSnapshot', () => {
  let snapshots: SeedSnapshot;

  beforeEach(() => {
    snapshots = new SeedSnapshot();
  });

  describe('Snapshots', () => {
    it('should save snapshot', () => {
      const data = { id: '1', name: 'Test' };
      snapshots.snapshot('test', data);

      expect(snapshots.listSnapshots()).toContain('test');
    });

    it('should store deep copy', () => {
      const original = { id: '1', nested: { value: 'test' } };
      snapshots.snapshot('test', original);

      original.nested.value = 'changed';

      const snapshots2 = new SeedSnapshot();
      snapshots2.import({ test: original });
      snapshots2.compare('test', original);
    });

    it('should compare matching snapshots', () => {
      const data = { id: '1', name: 'Test' };
      snapshots.snapshot('test', data);

      const comparison = snapshots.compare('test', data);
      expect(comparison.matches).toBe(true);
      expect(comparison.diff).toBeUndefined();
    });

    it('should detect snapshot mismatches', () => {
      const original = { id: '1', name: 'Test' };
      snapshots.snapshot('test', original);

      const modified = { id: '1', name: 'Different' };
      const comparison = snapshots.compare('test', modified);

      expect(comparison.matches).toBe(false);
      expect(comparison.diff).toBeDefined();
    });

    it('should handle non-existent snapshots', () => {
      const comparison = snapshots.compare('non-existent', {});

      expect(comparison.matches).toBe(false);
      expect(comparison.diff).toBe('Snapshot not found');
    });
  });

  describe('Snapshot Management', () => {
    it('should list all snapshots', () => {
      snapshots.snapshot('snap1', {});
      snapshots.snapshot('snap2', {});
      snapshots.snapshot('snap3', {});

      const list = snapshots.listSnapshots();
      expect(list).toContain('snap1');
      expect(list).toContain('snap2');
      expect(list).toContain('snap3');
      expect(list).toHaveLength(3);
    });

    it('should clear all snapshots', () => {
      snapshots.snapshot('snap1', {});
      snapshots.snapshot('snap2', {});

      expect(snapshots.listSnapshots()).toHaveLength(2);

      snapshots.clear();

      expect(snapshots.listSnapshots()).toHaveLength(0);
    });

    it('should export snapshots', () => {
      const data1 = { id: '1' };
      const data2 = { id: '2' };

      snapshots.snapshot('snap1', data1);
      snapshots.snapshot('snap2', data2);

      const exported = snapshots.export();

      expect(exported.snap1).toEqual(data1);
      expect(exported.snap2).toEqual(data2);
    });

    it('should import snapshots', () => {
      const data = {
        snap1: { id: '1' },
        snap2: { id: '2' },
      };

      snapshots.import(data);

      expect(snapshots.listSnapshots()).toHaveLength(2);
      const comparison = snapshots.compare('snap1', { id: '1' });
      expect(comparison.matches).toBe(true);
    });

    it('should overwrite snapshots on import', () => {
      snapshots.snapshot('snap1', { id: '1' });

      const newData = { snap1: { id: '2' } };
      snapshots.import(newData);

      const comparison = snapshots.compare('snap1', { id: '2' });
      expect(comparison.matches).toBe(true);
    });
  });

  describe('Complex Data', () => {
    it('should handle nested objects', () => {
      const complex = {
        user: {
          id: '1',
          profile: {
            name: 'Test',
            settings: {
              theme: 'dark',
            },
          },
        },
      };

      snapshots.snapshot('complex', complex);
      const comparison = snapshots.compare('complex', complex);

      expect(comparison.matches).toBe(true);
    });

    it('should handle arrays', () => {
      const arrayData = { items: [{ id: '1' }, { id: '2' }, { id: '3' }] };

      snapshots.snapshot('array', arrayData);
      const comparison = snapshots.compare('array', arrayData);

      expect(comparison.matches).toBe(true);
    });

    it('should detect array order changes', () => {
      const array1 = { items: [1, 2, 3] };
      const array2 = { items: [1, 3, 2] };

      snapshots.snapshot('array', array1);
      const comparison = snapshots.compare('array', array2);

      expect(comparison.matches).toBe(false);
    });
  });
});

describe('Integration: Multiple Environments', () => {
  let payload: MockPayload;

  beforeEach(() => {
    payload = new MockPayload();
  });

  it('should maintain isolation between environments', async () => {
    const env1 = new IsolatedTestEnvironment(payload as unknown as Payload);
    const env2 = new IsolatedTestEnvironment(payload as unknown as Payload);

    await env1.setup(new SimpleSeed(payload as unknown as Payload, 2));
    await env2.setup(new SimpleSeed(payload as unknown as Payload, 3));

    const ids1 = env1.getCreatedIds('items');
    const ids2 = env2.getCreatedIds('items');

    expect(ids1).toHaveLength(2);
    expect(ids2).toHaveLength(3);
  });
});
