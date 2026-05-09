/**
 * Test Seed Factory — three-level seeds with transaction isolation + cleanup.
 *
 * Level 1: unit-test seeds (<500ms, minimal deps).
 * Level 2: integration-test seeds (realistic business data, ~2-5s).
 * Level 3: e2e-test seeds (complete business cycles, ~5-15s).
 *
 * Validates seed data against actual Payload configuration via `config-discovery`.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
 * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
 * @audit ISO-19011:2018 audit-trail seed-cleanup
 * @see docs/STANDARDS.md §7
 */

import type { Payload, PayloadRequest } from 'payload';
import { getDiscovery } from './config-discovery';

/**
 * Seed context containing payload instance and metadata
 */
export interface SeedContext {
  payload: Payload;
  req?: PayloadRequest;
  transactionId?: string;
  seedLevel: 'unit' | 'integration' | 'e2e';
  environmentId: string; // Unique ID for this seed environment (prevents ID collisions)
  createdIds: Map<string, Set<string>>; // Collection -> Set of IDs (prevents duplicates)
  startTime: number;
}

/**
 * Seed result with statistics
 */
export interface SeedResult {
  success: boolean;
  seedLevel: 'unit' | 'integration' | 'e2e';
  totalTime: number;
  itemsCreated: number;
  collections: Record<string, number>;
  error?: Error;
}

/**
 * Cleanup operation result
 */
export interface CleanupResult {
  success: boolean;
  totalTime: number;
  itemsDeleted: number;
  failures: Array<{
    collection: string;
    id: string;
    error: Error;
  }>;
}

/**
 * Cleanup strategy options
 */
export type CleanupStrategy = 'transaction-rollback' | 'cascade-delete' | 'soft-delete' | 'none';

/**
 * Seed factory hooks
 */
export interface SeedHooks {
  beforeSeed?: (ctx: SeedContext) => Promise<void>;
  afterSeed?: (ctx: SeedContext, result: SeedResult) => Promise<void>;
  beforeCleanup?: (ctx: SeedContext) => Promise<void>;
  afterCleanup?: (ctx: SeedContext) => Promise<void>;
}

/**
 * Base TestSeedFactory class
 * Provides common functionality for all seed levels
 */
export abstract class TestSeedFactory {
  protected payload: Payload;
  protected cleanupStrategy: CleanupStrategy = 'cascade-delete';
  protected hooks: SeedHooks = {};
  protected context: SeedContext | null = null;

  constructor(payload: Payload) {
    this.payload = payload;
  }

  /**
   * Set cleanup strategy for seed data
   */
  setCleanupStrategy(strategy: CleanupStrategy): this {
    this.cleanupStrategy = strategy;
    return this;
  }

  /**
   * Register seed lifecycle hooks
   */
  registerHooks(hooks: SeedHooks): this {
    this.hooks = { ...this.hooks, ...hooks };
    return this;
  }

  /**
   * Create seed context with unique environment ID for isolation
   */
  protected createContext(seedLevel: 'unit' | 'integration' | 'e2e'): SeedContext {
    return {
      payload: this.payload,
      seedLevel,
      environmentId: `env-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdIds: new Map(),
      startTime: Date.now(),
    };
  }

  /**
   * Track created document ID (prevents duplicates with Set)
   */
  protected trackCreatedId(collection: string, id: string): void {
    if (!this.context) throw new Error('Seed context not initialized');

    // Use Set to prevent duplicate tracking
    if (!this.context.createdIds.has(collection)) {
      this.context.createdIds.set(collection, new Set());
    }
    this.context.createdIds.get(collection)!.add(id);
  }

  /**
   * Validate data before creation against actual Payload configuration
   * Override in subclasses for additional custom validation
   * @throws Error if validation fails
   */
  protected async validateData(collection: string, data: Record<string, unknown>): Promise<void> {
    try {
      // Get config discovery instance
      const discovery = getDiscovery();

      // Check if collection exists in config
      const exists = await discovery.collectionExists(collection);
      if (!exists) {
        throw new Error(`Collection "${collection}" not found in Payload configuration`);
      }

      // Validate against required fields from config
      const errors = await discovery.validateData(collection, data);
      if (errors.length > 0) {
        throw new Error(errors.join('; '));
      }
    } catch (error) {
      // Re-throw with more context
      if (error instanceof Error) {
        throw new Error(`Validation failed for ${collection}: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Create document and track ID
   * Validates data against actual Payload configuration
   */
  protected async createDocument<T extends Record<string, unknown>>(
    collection: string,
    data: T,
  ): Promise<T & { id: string }> {
    if (!this.context) throw new Error('Seed context not initialized');

    // Validate before creation (against actual Payload config)
    await this.validateData(collection, data);

    const result = await this.payload.create({
      collection,
      data,
    });

    this.trackCreatedId(collection, result.id);
    return result;
  }

  /**
   * Create multiple documents
   */
  protected async createDocuments<T extends Record<string, unknown>>(
    collection: string,
    dataArray: T[],
  ): Promise<(T & { id: string })[]> {
    const results: (T & { id: string })[] = [];

    for (const data of dataArray) {
      const result = await this.createDocument(collection, data);
      results.push(result);
    }

    return results;
  }

  /**
   * Query documents (useful for relationships)
   */
  protected async queryDocuments(collection: string, query?: Record<string, unknown>) {
    return await this.payload.find({
      collection,
      where: query,
    });
  }

  /**
   * Abstract method - each seed level implements this
   */
  abstract seed(): Promise<SeedResult>;

  /**
   * Cleanup all created documents with detailed result reporting
   */
  async cleanup(): Promise<CleanupResult> {
    const startTime = Date.now();
    const failures: CleanupResult['failures'] = [];
    let itemsDeleted = 0;

    if (!this.context) {
      return {
        success: true,
        totalTime: 0,
        itemsDeleted: 0,
        failures: [],
      };
    }

    if (this.hooks.beforeCleanup) {
      await this.hooks.beforeCleanup(this.context);
    }

    // Clean up in reverse order (dependencies first)
    const collectionsToClean = Array.from(this.context.createdIds.entries()).reverse();

    for (const [collection, ids] of collectionsToClean) {
      for (const id of ids) {
        try {
          await this.payload.delete({
            collection,
            id,
          });
          itemsDeleted++;
        } catch (error) {
          failures.push({
            collection,
            id,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      }
    }

    if (this.hooks.afterCleanup) {
      await this.hooks.afterCleanup(this.context);
    }

    this.context = null;

    return {
      success: failures.length === 0,
      totalTime: Date.now() - startTime,
      itemsDeleted,
      failures,
    };
  }

  /**
   * Get seeding statistics
   */
  protected getStats(): Omit<SeedResult, 'success' | 'error'> {
    if (!this.context) throw new Error('Seed context not initialized');

    let totalItems = 0;
    const collections: Record<string, number> = {};

    for (const [collection, ids] of this.context.createdIds.entries()) {
      const count = ids.size; // Set.size instead of Array.length
      collections[collection] = count;
      totalItems += count;
    }

    return {
      seedLevel: this.context.seedLevel,
      totalTime: Date.now() - this.context.startTime,
      itemsCreated: totalItems,
      collections,
    };
  }
}

/**
 * Transaction-based seed factory (for databases that support transactions)
 * Provides automatic rollback on test completion
 */
export abstract class TransactionalSeedFactory extends TestSeedFactory {
  /**
   * Start transaction
   * Override in database-specific implementations
   */
  async startTransaction(): Promise<string> {
    // Default: no transaction support
    return '';
  }

  /**
   * Rollback transaction
   * Override in database-specific implementations
   */
  async rollbackTransaction(_transactionId: string): Promise<void> {
    // Default: no-op
  }

  /**
   * Commit transaction
   * Override in database-specific implementations
   */
  async commitTransaction(_transactionId: string): Promise<void> {
    // Default: no-op
  }

  /**
   * Override cleanup to use transaction rollback if available
   */
  async cleanup(): Promise<void> {
    if (this.cleanupStrategy === 'transaction-rollback' && this.context?.transactionId) {
      await this.rollbackTransaction(this.context.transactionId);
    } else {
      await super.cleanup();
    }
  }
}
