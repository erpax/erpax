/**
 * Test setup utilities — `IsolatedTestEnvironment`, `ParallelTestRunner`,
 * `SeedSnapshot`. Hooks for test setup, isolation, cleanup.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
 * @audit ISO-19011:2018 audit-trail seed-cleanup
 * @see docs/STANDARDS.md §7
 */

import type { Payload } from 'payload';
import { TestSeedFactory, type SeedResult, type CleanupResult } from './test-seed-factory';

/**
 * Test environment with isolated database state
 */
export class IsolatedTestEnvironment {
  private payload: Payload;
  private seedFactory: TestSeedFactory | null = null;
  private seedResult: SeedResult | null = null;
  private cleanupResult: CleanupResult | null = null;
  private isSetup: boolean = false;

  constructor(payload: Payload) {
    this.payload = payload;
  }

  /**
   * Set up test with specific seed factory
   * Prevents multiple setups in same environment
   */
  async setup(factory: TestSeedFactory): Promise<SeedResult> {
    if (this.isSetup) {
      throw new Error(
        'Environment already set up. Call teardown() before calling setup() again.',
      );
    }

    this.seedFactory = factory;
    this.seedResult = await factory.seed();

    if (!this.seedResult.success) {
      throw this.seedResult.error;
    }

    this.isSetup = true;
    return this.seedResult;
  }

  /**
   * Get created document IDs by collection (converts Set to Array)
   */
  getCreatedIds(collection: string): string[] {
    if (!this.seedFactory || !this.seedFactory['context']) {
      return [];
    }
    const idSet = this.seedFactory['context'].createdIds.get(collection);
    return idSet ? Array.from(idSet) : [];
  }

  /**
   * Get first created ID (common for single-record tests)
   */
  getCreatedId(collection: string): string | null {
    const ids = this.getCreatedIds(collection);
    return ids[0] || null;
  }

  /**
   * Query created documents
   */
  async getCreatedDocuments<T>(collection: string) {
    const ids = this.getCreatedIds(collection);
    if (ids.length === 0) return [];

    const results = await this.payload.find({
      collection,
      where: {
        id: { in: ids },
      },
    });

    return results.docs as T[];
  }

  /**
   * Tear down test (cleanup) and return cleanup status
   */
  async teardown(): Promise<CleanupResult | null> {
    if (!this.seedFactory) {
      return null;
    }

    this.cleanupResult = await this.seedFactory.cleanup();
    this.seedFactory = null;
    this.seedResult = null;
    this.isSetup = false;

    return this.cleanupResult;
  }

  /**
   * Get cleanup result from last teardown
   */
  getCleanupResult(): CleanupResult | null {
    return this.cleanupResult;
  }

  /**
   * Get seed statistics
   */
  getStats(): SeedResult | null {
    return this.seedResult;
  }
}

/**
 * Jest test helpers
 */
export function setupTestEnvironment(payload: Payload) {
  let env: IsolatedTestEnvironment;

  beforeEach(() => {
    env = new IsolatedTestEnvironment(payload);
  });

  afterEach(async () => {
    await env.teardown();
  });

  return {
    getEnv: () => env,
    setup: (factory: TestSeedFactory) => env.setup(factory),
    teardown: () => env.teardown(),
  };
}

/**
 * Vitest test helpers
 */
export async function setupVitestEnvironment(payload: Payload) {
  const { beforeEach: vtBeforeEach, afterEach: vtAfterEach } = await import('vitest');

  let env: IsolatedTestEnvironment;

  vtBeforeEach(() => {
    env = new IsolatedTestEnvironment(payload);
  });

  vtAfterEach(async () => {
    await env.teardown();
  });

  return {
    getEnv: () => env,
    setup: (factory: TestSeedFactory) => env.setup(factory),
    teardown: () => env.teardown(),
  };
}

/**
 * Parallel test runner with isolated environments
 */
export class ParallelTestRunner {
  private payload: Payload;
  private maxConcurrent: number = 4;

  constructor(payload: Payload, maxConcurrent?: number) {
    this.payload = payload;
    if (maxConcurrent) this.maxConcurrent = maxConcurrent;
  }

  /**
   * Run multiple tests in parallel with isolated environments
   */
  async runParallel<T>(
    tests: Array<{
      name: string;
      factory: TestSeedFactory;
      test: (env: IsolatedTestEnvironment) => Promise<T>;
    }>,
  ): Promise<Array<{ name: string; result: T; error?: Error }>> {
    const results: Array<{ name: string; result?: T; error?: Error }> = [];
    const queue = [...tests];
    const running: Promise<void>[] = [];

    while (queue.length > 0 || running.length > 0) {
      // Fill up to max concurrent
      while (running.length < this.maxConcurrent && queue.length > 0) {
        const testCase = queue.shift()!;

        const promise = (async () => {
          try {
            const env = new IsolatedTestEnvironment(this.payload);
            await env.setup(testCase.factory);

            const result = await testCase.test(env);
            results.push({ name: testCase.name, result });

            await env.teardown();
          } catch (error) {
            results.push({
              name: testCase.name,
              error: error instanceof Error ? error : new Error(String(error)),
            });
          }

          running.splice(running.indexOf(promise), 1);
        })();

        running.push(promise);
      }

      // Wait for at least one to complete
      if (running.length > 0) {
        await Promise.race(running);
      }
    }

    return results as Array<{ name: string; result: T; error?: Error }>;
  }
}

/**
 * Snapshot testing utilities
 */
export class SeedSnapshot {
  private snapshots: Map<string, any> = new Map();

  /**
   * Save seed state as snapshot
   */
  snapshot(name: string, data: any): void {
    this.snapshots.set(name, JSON.parse(JSON.stringify(data)));
  }

  /**
   * Compare with snapshot
   */
  compare(name: string, data: any): { matches: boolean; diff?: any } {
    const snapshot = this.snapshots.get(name);
    if (!snapshot) {
      return { matches: false, diff: 'Snapshot not found' };
    }

    const current = JSON.parse(JSON.stringify(data));
    const matches = JSON.stringify(snapshot) === JSON.stringify(current);

    return {
      matches,
      diff: !matches ? { expected: snapshot, actual: current } : undefined,
    };
  }

  /**
   * List all snapshots
   */
  listSnapshots(): string[] {
    return Array.from(this.snapshots.keys());
  }

  /**
   * Clear all snapshots
   */
  clear(): void {
    this.snapshots.clear();
  }

  /**
   * Export snapshots for storage
   */
  export(): Record<string, any> {
    const result: Record<string, any> = {};
    for (const [key, value] of this.snapshots) {
      result[key] = value;
    }
    return result;
  }

  /**
   * Import snapshots from storage
   */
  import(data: Record<string, any>): void {
    for (const [key, value] of Object.entries(data)) {
      this.snapshots.set(key, value);
    }
  }
}
