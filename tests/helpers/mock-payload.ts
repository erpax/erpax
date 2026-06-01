/**
 * Shared in-memory MockPayload — the canonical Payload stub for unit-level
 * test specs that don't (and shouldn't) boot a real D1.
 *
 * Replaces three drifted copies that lived inline in:
 *   - tests/int/accounting/critical-gaps-verification.int.spec.ts
 *   - tests/int/accounting/level-2-integration.int.spec.ts
 *   - tests/int/accounting/level-3-e2e.int.spec.ts
 *
 * The previous copies disagreed on id-generation (random suffix vs counter),
 * `where` semantics (subset of operators), and reset hook name (`reset` vs
 * `clearAll`). This module unifies them on a deterministic counter id, supports
 * the operators the test suite actually uses (`{id: {in: [...]}}`), and
 * exposes both `reset()` and `clearAll()` so existing call sites keep working.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-double
 * @audit ISO-19011:2018 audit-trail test-fixture
 * @see src/testing/test-seed-factory.ts
 */

import type { Config } from 'payload';

/**
 * Minimal subset of Payload's collection-config shape that the test suite
 * actually needs. Wider than `Partial<CollectionConfig>` would be, narrower
 * than the real shape — covers `slug`, `labels`, and `fields` (with the
 * field props the SEED_VALIDATION_REGISTRY rules read).
 */
export interface MockCollectionConfig {
  slug: string;
  labels?: { singular?: string; plural?: string };
  fields: ReadonlyArray<{
    name: string;
    type: string;
    required?: boolean;
    relationshipTo?: string;
  }>;
}

/**
 * Where-clause operator surface understood by `MockPayload.find`. Mirrors
 * the subset of Payload's where-shape exercised by the integration specs.
 */
type WhereClause =
  | Record<string, unknown>
  | { [key: string]: { in?: unknown[]; equals?: unknown } };

interface MockPayloadOptions {
  /**
   * Collection definitions surfaced through `payload.config.collections`.
   * Optional — only needed for tests that read schema via
   * `PayloadConfigDiscovery.initialize(payload)`.
   */
  collections?: ReadonlyArray<MockCollectionConfig>;
}

export class MockPayload {
  private readonly documents = new Map<string, Map<string, Record<string, unknown>>>();
  private readonly idCounter = new Map<string, number>();

  /** Schema surface read by `PayloadConfigDiscovery.initialize()`. */
  readonly config: Partial<Config>;

  constructor(options: MockPayloadOptions = {}) {
    this.config = {
      collections: (options.collections ?? []) as unknown as Config['collections'],
    };
  }

  // ─── Mutation API ──────────────────────────────────────────────────────

  async create({
    collection,
    data,
  }: {
    collection: string;
    data: Record<string, unknown>;
  }): Promise<Record<string, unknown>> {
    if (!this.documents.has(collection)) {
      this.documents.set(collection, new Map());
    }
    const next = (this.idCounter.get(collection) ?? 0) + 1;
    this.idCounter.set(collection, next);
    const id = `${collection}-${next}`;
    const doc = { ...data, id };
    this.documents.get(collection)!.set(id, doc);
    return doc;
  }

  async delete({
    collection,
    id,
  }: {
    collection: string;
    id: string;
  }): Promise<{ id: string }> {
    // Real Payload throws "Not Found" when deleting a missing document.
    // Match that contract — `TestSeedFactory.cleanup` relies on the
    // resulting failure landing in `cleanupResult.failures` (see the
    // critical-gaps "should track cleanup failures" test).
    const bucket = this.documents.get(collection);
    if (!bucket || !bucket.has(id)) {
      throw new Error(`MockPayload: ${collection}/${id} not found`);
    }
    bucket.delete(id);
    return { id };
  }

  // ─── Read API ──────────────────────────────────────────────────────────

  async find({
    collection,
    where,
  }: {
    collection: string;
    where?: WhereClause;
  }): Promise<{ docs: Record<string, unknown>[]; totalDocs: number }> {
    const all = Array.from(this.documents.get(collection)?.values() ?? []);
    if (!where) return { docs: all, totalDocs: all.length };

    const docs = all.filter((doc) => {
      for (const [key, condition] of Object.entries(where)) {
        if (condition && typeof condition === 'object') {
          const c = condition as { in?: unknown[]; equals?: unknown };
          if (c.in && !c.in.includes(doc[key])) return false;
          if ('equals' in c && doc[key] !== c.equals) return false;
        } else if (doc[key] !== condition) {
          return false;
        }
      }
      return true;
    });
    return { docs, totalDocs: docs.length };
  }

  async findByID({
    collection,
    id,
  }: {
    collection: string;
    id: string;
  }): Promise<Record<string, unknown> | null> {
    return this.documents.get(collection)?.get(id) ?? null;
  }

  // ─── Test-only inspection / cleanup ────────────────────────────────────

  /** Read all documents for a collection. */
  getDocuments(collection: string): Record<string, unknown>[] {
    return Array.from(this.documents.get(collection)?.values() ?? []);
  }

  /** Drop every document and reset id counters. Idiomatic name. */
  reset(): void {
    this.documents.clear();
    this.idCounter.clear();
  }

  /** Alias for `reset` — kept so the critical-gaps spec keeps compiling. */
  clearAll(): void {
    this.reset();
  }
}
