/**
 * Level-1 minimal accounting seed — single-tenant, single-period fixtures for unit tests.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @accounting US-GAAP ASC-205 presentation-of-financial-statements
 * @audit ISO-19011:2018 audit-trail test-data
 * @quality ISO-25010 maintainability test-fixtures
 * @see docs/STANDARDS.md §4.2
 */

/**
 * Level 1: Minimal Unit Test Seeds for Accounting Plugin.
 *
 * Fast (<500ms), minimal-deps fixtures for unit tests. Each Minimal*Seed
 * is a thin shell over `TestSeedFactory.runSeedLifecycle` — the lifecycle
 * boilerplate (context bootstrap, hook plumbing, success/failure SeedResult)
 * lives on the base class, and field validation comes from
 * `SEED_VALIDATION_REGISTRY` (`src/testing/test-seed-factory.ts`).
 *
 * The fixture data is exported as named constants so tests can assert against
 * the same source of truth a seed produces (instead of re-typing the same
 * literals in two places and watching them drift).
 */

import type { Payload } from 'payload';
import { TestSeedFactory, registerSeedCategory, type SeedResult } from '@/testing';
import { IFRS_MINIMUM_TEMPLATE } from '../templates';

// ─── Fixture constants (derived from `IFRS_MINIMUM_TEMPLATE`) ────────────
//
// The industry template is the single source of truth. These named exports
// are kept so existing tests can keep importing them, but they're now
// computed projections of the template — change the template and every seed
// + test using these constants picks the new shape up automatically.

/**
 * Single tenant — root of every Level-1 seed graph. Derived from
 * `IFRS_MINIMUM_TEMPLATE.tenant` so renaming the template's tenant.code
 * (or switching country) propagates to every spec.
 */
export const MINIMAL_TENANT_DATA = {
  name: IFRS_MINIMUM_TEMPLATE.tenant.name,
  code: IFRS_MINIMUM_TEMPLATE.tenant.code,
  status: 'active',
} as const;

/**
 * Five-account chart skeleton — projection of the template's
 * `chartOfAccounts` plus the runtime `balance` and `status` columns.
 *
 * `{ tenant }` is appended at seed time once the tenant id is known.
 */
export const MINIMAL_GL_ACCOUNTS_DATA = IFRS_MINIMUM_TEMPLATE.chartOfAccounts.map((row) => ({
  ...row,
  balance: 0,
  status: 'active',
}));

/**
 * Three test-only users — one per role exercised by the access-control tests.
 */
export const MINIMAL_USERS_DATA = [
  { email: 'admin@test.local',      password: 'test123', roles: ['admin'],      status: 'active' },
  { email: 'accountant@test.local', password: 'test123', roles: ['accountant'], status: 'active' },
  { email: 'auditor@test.local',    password: 'test123', roles: ['auditor'],    status: 'active' },
] as const;

/**
 * Three FX rates pegged to USD as of `effectiveDate` (defaults to today).
 *
 * `{ tenant, effectiveDate }` are stitched in at seed time.
 */
export const MINIMAL_CURRENCY_RATES_DATA = [
  { fromCurrency: 'USD', toCurrency: 'USD', rate: 1.0,  status: 'active' },
  { fromCurrency: 'EUR', toCurrency: 'USD', rate: 1.1,  status: 'active' },
  { fromCurrency: 'GBP', toCurrency: 'USD', rate: 1.27, status: 'active' },
] as const;

// ─── Seed classes ────────────────────────────────────────────────────────

/**
 * Single-tenant root. The created id lives under the canonical `'tenants'` key
 * (set by `createDocument` via `trackCreatedId`) — callers (`Level1SeedSuite`,
 * `tests/int/accounting/critical-gaps-verification`) read from that key.
 *
 * Note: there is no `'tenantId'` alias key. A pre-DRY iteration used one, but
 * it broke `cleanup()` once `MockPayload.delete` started throwing on missing
 * collections (the alias isn't a real collection slug).
 */
export class MinimalTenantSeed extends TestSeedFactory {
  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('unit', async () => {
      await this.createDocument('tenants', { ...MINIMAL_TENANT_DATA });
    });
  }
}

/**
 * Minimal chart of accounts — five rows, one per accounting element type.
 */
export class MinimalGLAccountsSeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('unit', async () => {
      await this.createDocuments(
        'gl-accounts',
        MINIMAL_GL_ACCOUNTS_DATA.map((row) => ({ ...row, tenant: this.tenantId })),
      );
    });
  }
}

/**
 * Three test users, one per role.
 */
export class MinimalUsersSeed extends TestSeedFactory {
  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('unit', async () => {
      await this.createDocuments(
        'users',
        MINIMAL_USERS_DATA.map((row) => ({ ...row })),
      );
    });
  }
}

/**
 * Three USD-pegged FX rates effective today.
 */
export class MinimalCurrencyRatesSeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('unit', async () => {
      const baseDate = new Date().toISOString().split('T')[0];
      await this.createDocuments(
        'currency-rates',
        MINIMAL_CURRENCY_RATES_DATA.map((row) => ({
          ...row,
          tenant: this.tenantId,
          effectiveDate: baseDate,
        })),
      );
    });
  }
}

// ─── Pages — three-level nested structure ────────────────────────────────

/**
 * Page nesting fixture: `home` → `about` → `team` (three levels deep).
 *
 * The seed inserts each page in dependency order so the `parent` foreign-key
 * resolves at insert time, then writes a `breadcrumbs` array consistent with
 * the `Pages.breadcrumbs` field shape (`{ doc, title, url }` per ancestor).
 *
 * Each entry below documents what the seed *adds* on top of these literals
 * (tenant, parent id, breadcrumbs, _status, publishedAt).
 */
export const MINIMAL_PAGES_DATA = [
  {
    /** Root page — no parent, breadcrumbs = `[self]`. */
    title: 'Home',
    slug: 'home',
    parentSlug: null,
  },
  {
    /** Mid-level — parent = `home`, breadcrumbs = `[home, self]`. */
    title: 'About',
    slug: 'about',
    parentSlug: 'home',
  },
  {
    /** Leaf — parent = `about`, breadcrumbs = `[home, about, self]`. */
    title: 'Team',
    slug: 'team',
    parentSlug: 'about',
  },
] as const;

/**
 * Build the canonical breadcrumbs array for a page given its ancestor chain
 * (root-first). Mirrors the shape Payload's afterChange hook would have
 * produced — required because the MockPayload used in unit tests doesn't
 * fire collection hooks.
 */
const buildBreadcrumbs = (
  ancestors: ReadonlyArray<{ id: string; title: string; slug: string }>,
  self: { id: string; title: string; slug: string },
): Array<{ doc: string; title: string; url: string }> => {
  const chain = [...ancestors, self];
  return chain.map((node, idx) => ({
    doc: node.id,
    title: node.title,
    url: '/' + chain.slice(0, idx + 1).map((n) => n.slug).join('/'),
  }));
};

/**
 * Seeds the canonical three-level page nest (`home` → `about` → `team`)
 * with `parent` references and `breadcrumbs` arrays populated. Validation
 * lives in `SEED_VALIDATION_REGISTRY['pages']`.
 *
 * Cleanup ordering: `TestSeedFactory.cleanup` walks `createdIds` entries in
 * reverse — `team` is added last and deleted first, satisfying the FK
 * dependency (parent must outlive its children).
 */
export class MinimalPagesSeed extends TestSeedFactory {
  constructor(payload: Payload, private readonly tenantId: string) {
    super(payload);
  }

  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('unit', async () => {
      const publishedAt = new Date().toISOString();
      const created = new Map<string, { id: string; title: string; slug: string }>();

      for (const fixture of MINIMAL_PAGES_DATA) {
        const ancestors: Array<{ id: string; title: string; slug: string }> = [];
        let cursor = fixture.parentSlug as string | null;
        while (cursor) {
          const ancestor = created.get(cursor);
          if (!ancestor) {
            throw new Error(`Page nesting: parent '${cursor}' not yet created — fixture order violates dependency`);
          }
          ancestors.unshift(ancestor);
          // Find the ancestor's own parent in the fixture array.
          const ancestorFixture = MINIMAL_PAGES_DATA.find((p) => p.slug === ancestor.slug);
          cursor = ancestorFixture?.parentSlug ?? null;
        }

        const parent = fixture.parentSlug ? created.get(fixture.parentSlug)?.id : undefined;
        const selfPlaceholder = { id: 'pending', title: fixture.title, slug: fixture.slug };
        const breadcrumbsForCreate = buildBreadcrumbs(ancestors, selfPlaceholder);

        const doc = await this.createDocument('pages', {
          tenant: this.tenantId,
          title: fixture.title,
          slug: fixture.slug,
          ...(parent ? { parent } : {}),
          breadcrumbs: breadcrumbsForCreate,
          _status: 'published',
          publishedAt,
        });

        // Patch the just-created `doc.id` into the trailing breadcrumb so the
        // self-reference is correct for any consumer reading the seed result.
        const finalBreadcrumbs = buildBreadcrumbs(ancestors, {
          id: doc.id,
          title: fixture.title,
          slug: fixture.slug,
        });
        (doc as { breadcrumbs?: unknown }).breadcrumbs = finalBreadcrumbs;

        created.set(fixture.slug, { id: doc.id, title: fixture.title, slug: fixture.slug });
      }
    });
  }
}

/**
 * Combined Level-1 suite — runs each Minimal*Seed in dependency order and
 * merges every child's `createdIds` into this seed's context so a single
 * `cleanup()` removes everything.
 */
export class Level1SeedSuite extends TestSeedFactory {
  async seed(): Promise<SeedResult> {
    return this.runSeedLifecycle('unit', async () => {
      // 1. Tenant (root of every other reference).
      const tenantSeed = new MinimalTenantSeed(this.payload);
      const tenantResult = await tenantSeed.seed();
      if (!tenantResult.success) throw tenantResult.error;
      const tenantId = Array.from(
        tenantSeed['context']!.createdIds.get('tenants') ?? new Set<string>(),
      )[0];
      if (!tenantId) throw new Error('Failed to create tenant');

      // 2. GL accounts.
      const glSeed = new MinimalGLAccountsSeed(this.payload, tenantId);
      const glResult = await glSeed.seed();
      if (!glResult.success) throw glResult.error;

      // 3. Users.
      const userSeed = new MinimalUsersSeed(this.payload);
      const userResult = await userSeed.seed();
      if (!userResult.success) throw userResult.error;

      // 4. Currency rates.
      const rateSeed = new MinimalCurrencyRatesSeed(this.payload, tenantId);
      const rateResult = await rateSeed.seed();
      if (!rateResult.success) throw rateResult.error;

      // 5. Pages — three-level nest (home → about → team) so the e2e admin
      // walk-through has populated rows + breadcrumbs to capture.
      const pagesSeed = new MinimalPagesSeed(this.payload, tenantId);
      const pagesResult = await pagesSeed.seed();
      if (!pagesResult.success) throw pagesResult.error;

      // Aggregate every child's createdIds for unified cleanup.
      this.mergeChildContext(tenantSeed);
      this.mergeChildContext(glSeed);
      this.mergeChildContext(userSeed);
      this.mergeChildContext(rateSeed);
      this.mergeChildContext(pagesSeed);
    });
  }
}

// ─── UI-category registration ────────────────────────────────────────────
//
// Categorize each seed by which Payload UI surface it primarily populates.
// `Tenants` and `Users` are cross-cutting (admin + frontend rely on both);
// `gl-accounts` and `currency-rates` are admin-data only; `Pages` is
// public-content; the suite spans cross-cutting + admin-data + public-content
// depending on which sub-seed runs.

registerSeedCategory({
  id: 'level-1.minimal-tenant',
  category: 'cross-cutting',
  description: 'Single tenant — root reference for every other Level-1 seed.',
  ctor: MinimalTenantSeed,
});
registerSeedCategory({
  id: 'level-1.minimal-gl-accounts',
  category: 'admin-data',
  description: '5-account IFRS chart skeleton (one per IAS-1 §54 element type).',
  ctor: MinimalGLAccountsSeed,
});
registerSeedCategory({
  id: 'level-1.minimal-users',
  category: 'cross-cutting',
  description: 'Three role-tagged test users (admin / accountant / auditor).',
  ctor: MinimalUsersSeed,
});
registerSeedCategory({
  id: 'level-1.minimal-currency-rates',
  category: 'admin-data',
  description: 'Three USD-pegged FX rates for multi-currency tests.',
  ctor: MinimalCurrencyRatesSeed,
});
registerSeedCategory({
  id: 'level-1.minimal-pages',
  category: 'public-content',
  description: 'Three-level page nest (home → about → team) with breadcrumbs.',
  ctor: MinimalPagesSeed,
});
registerSeedCategory({
  id: 'level-1.suite',
  category: 'cross-cutting',
  description: 'Composes all Level-1 seeds in dependency order.',
  ctor: Level1SeedSuite,
});
