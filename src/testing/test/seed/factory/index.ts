/**
 * Test Seed Factory — three-level seeds with transaction isolation + cleanup.
 *
 * Level 1: unit-test seeds (<500ms, minimal deps).
 * Level 2: integration-test seeds (realistic business data, ~2-5s).
 * Level 3: e2e-test seeds (complete business cycles, ~5-15s).
 *
 * Validates seed data against the per-collection registry below (see
 * `SEED_VALIDATION_REGISTRY`). The registry is the single source of truth for
 * what counts as a "minimal" valid record per collection — it doesn't depend
 * on a runtime Payload instance, so tests can use a `MockPayload` and still
 * get the same `<Label>: <field> is required` error contract that integration
 * tests assert against.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @standard ISO/IEC/IEEE-29119-3:2021 test-documentation
 * @standard ISO/IEC/IEEE-29119-4:2021 test-techniques
 * @audit ISO-19011:2018 audit-trail seed-cleanup
 * @see docs/STANDARDS.md §7
 */

import type { Payload, PayloadRequest, CollectionSlug, RequiredDataFromCollectionSlug, Where } from 'payload';

/**
 * Per-collection validation contract used by `TestSeedFactory.validateData`.
 *
 * Each entry maps a collection slug to (a) a human-friendly label that shows
 * up at the start of every error message and (b) the required fields a seed
 * must populate. Tests in `tests/int/accounting/critical-gaps-verification`
 * pin against the message format `<label>: <field> is required` produced by
 * this table.
 *
 * Add a new collection here when a new `Minimal<X>Seed` lands; do **not**
 * inline the label/required-field arrays in subclasses — that's how we'd end
 * up with the kind of drift the standards system is designed to prevent.
 *
 * @standard ISO/IEC-29119:2022 software-testing
 * @audit ISO-19011:2018 audit-trail seed-validation
 */
/**
 * Which Payload UI surface a seed primarily populates. Lets the seed runner
 * (or a coverage tool) target only the seeds relevant to a UX flow:
 *
 *   - `'admin-data'`   — operational backend data (gl-accounts, journal
 *      entries, customers, vendors, …). Drives the admin /admin/*
 *      collection views.
 *   - `'public-content'` — public website content (Pages, Posts, Header,
 *      Footer globals, marketing). Drives the rendered frontend.
 *   - `'cross-cutting'` — collections that surface in both UIs (Tenants,
 *      Users, Media). Required by either side.
 *   - `'compliance-evidence'` — fixtures whose primary role is producing
 *      audit/SOX evidence (period closes, reconciliations, audit findings).
 *      Show up in admin but the *purpose* is the evidence pack, not
 *      day-to-day data entry.
 *
 * @standard ISO/IEC-29119:2022 software-testing test-fixture-categorization
 * @audit ISO-19011:2018 audit-trail seed-evidence-traceability
 */
export type SeedUiCategory =
  | 'admin-data'
  | 'public-content'
  | 'cross-cutting'
  | 'compliance-evidence';

export interface SeedValidationDomainRule {
  /** Field on the data record that this rule constrains. */
  readonly field: string;
  /** Predicate. Returns `true` when the value is acceptable. */
  readonly check: (value: unknown) => boolean;
  /** Error message thrown when `check` returns false. */
  readonly message: string;
}

/**
 * Cross-field check — receives the whole data record, returns `null` when
 * the record is acceptable or an error message when it isn't. Use for
 * invariants that span multiple fields (e.g. `debitAmount === creditAmount`
 * on a balanced journal entry).
 */
export type SeedValidationCrossFieldCheck = (
  data: Readonly<Record<string, unknown>>,
) => string | null;

export interface SeedValidationContract {
  /** Human-friendly label shown at the start of every validation error. */
  readonly label: string;
  /** Field names a minimal seed record MUST populate. */
  readonly requiredFields: readonly string[];
  /**
   * Per-field domain rules (regex / range / enum). Evaluated after the
   * required-field pass. Skipped when the field is `undefined` so optional
   * fields stay optional. Add a rule here instead of overriding
   * `validateData` in a subclass — that's how the four pre-DRY seeds drifted
   * away from a shared contract.
   */
  readonly domainRules?: readonly SeedValidationDomainRule[];
  /**
   * Cross-field invariants — evaluated after `domainRules`. Each function
   * returns `null` when the record is acceptable or an error message string
   * when it isn't.
   */
  readonly crossFieldChecks?: readonly SeedValidationCrossFieldCheck[];
}

// ─── Reusable predicates ────────────────────────────────────────────────
//
// Hoisted so domain rules across multiple collections share the same check
// (e.g. ISO-4217 currency codes appear on currency-rates today + likely on
// FX-pair fields tomorrow). Adding a new shared predicate here is preferred
// over inlining a regex twice.

const isUppercaseAlnumUnderscore = (v: unknown): boolean =>
  typeof v === 'string' && /^[A-Z0-9_]+$/.test(v);
const isEmail = (v: unknown): boolean =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isAccountNumber = (v: unknown): boolean =>
  typeof v === 'string' && /^\d+$/.test(v);
const isCurrencyCode = (v: unknown): boolean =>
  typeof v === 'string' && /^[A-Z]{3}$/.test(v);
const isPositiveFinite = (v: unknown): boolean =>
  typeof v === 'number' && Number.isFinite(v) && v > 0;
const isYmdDatePrefix = (v: unknown): boolean =>
  typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v);

const ACCOUNT_TYPES = ['asset', 'liability', 'equity', 'revenue', 'expense'] as const;
const USER_ROLES = ['admin', 'accountant', 'auditor'] as const;

export const SEED_VALIDATION_REGISTRY: Readonly<Record<string, SeedValidationContract>> = {
  tenants: {
    label: 'Tenant',
    requiredFields: ['name', 'code', 'status'],
    domainRules: [
      {
        field: 'code',
        check: isUppercaseAlnumUnderscore,
        message: 'Tenant: code must be uppercase alphanumeric with underscores only',
      },
    ],
  },
  'gl-accounts': {
    label: 'GL account',
    requiredFields: ['accountNumber', 'accountName', 'accountType', 'status'],
    domainRules: [
      {
        field: 'accountType',
        check: (v) => typeof v === 'string' && (ACCOUNT_TYPES as readonly string[]).includes(v),
        message: `GL account: accountType must be one of: ${ACCOUNT_TYPES.join(', ')}`,
      },
      {
        field: 'accountNumber',
        check: isAccountNumber,
        message: 'GL account: accountNumber must be numeric',
      },
    ],
  },
  users: {
    // Field names mirror the actual `Users` collection (`src/collections/Users/`)
    // which uses `roles: string[]` per NIST INCITS-359 RBAC — not a singular
    // `role`. The pre-DRY registry/test contract drifted to a non-existent
    // `role` field; aligned here.
    label: 'User',
    requiredFields: ['email', 'password', 'roles', 'status'],
    domainRules: [
      {
        field: 'email',
        check: isEmail,
        message: 'User: email must be a valid email address',
      },
      {
        field: 'roles',
        check: (v) =>
          Array.isArray(v) &&
          v.length > 0 &&
          v.every(
            (r) => typeof r === 'string' && (USER_ROLES as readonly string[]).includes(r),
          ),
        message: `User: roles must be a non-empty array of: ${USER_ROLES.join(', ')}`,
      },
    ],
  },
  'currency-rates': {
    label: 'Currency rate',
    requiredFields: ['fromCurrency', 'toCurrency', 'rate', 'effectiveDate', 'status'],
    domainRules: [
      {
        field: 'rate',
        check: isPositiveFinite,
        message: 'Currency rate: rate must be a positive number',
      },
      {
        field: 'fromCurrency',
        check: isCurrencyCode,
        message: 'Currency rate: fromCurrency must be a valid 3-letter currency code',
      },
      {
        field: 'toCurrency',
        check: isCurrencyCode,
        message: 'Currency rate: toCurrency must be a valid 3-letter currency code',
      },
      {
        field: 'effectiveDate',
        check: isYmdDatePrefix,
        message: 'Currency rate: effectiveDate must be a valid date (YYYY-MM-DD)',
      },
    ],
  },
  // ─── Level-2 collections (integration seeds) ────────────────────────────
  'journal-entries': {
    label: 'Journal entry',
    requiredFields: [
      'tenant',
      'entryDate',
      'reference',
      'debitAccountId',
      'creditAccountId',
      'debitAmount',
      'creditAmount',
      'status',
    ],
    domainRules: [
      {
        field: 'entryDate',
        check: isYmdDatePrefix,
        message: 'Journal entry: entryDate must be a valid date (YYYY-MM-DD)',
      },
    ],
    crossFieldChecks: [
      // IFRS IAS-1 / GAAP ASC-105 — every journal entry must balance.
      (data) => {
        const debit = typeof data.debitAmount === 'number' ? data.debitAmount : 0;
        const credit = typeof data.creditAmount === 'number' ? data.creditAmount : 0;
        return Math.abs(debit - credit) > 0.01
          ? 'Journal entry: debitAmount must equal creditAmount (balanced entry)'
          : null;
      },
    ],
  },
  'accounting-cycles': {
    label: 'Accounting cycle',
    requiredFields: ['tenant', 'periodType', 'startDate', 'endDate', 'status'],
    domainRules: [
      {
        field: 'periodType',
        check: (v) => typeof v === 'string' && ['monthly', 'quarterly', 'yearly'].includes(v),
        message: 'Accounting cycle: periodType must be one of: monthly, quarterly, yearly',
      },
      {
        field: 'startDate',
        check: isYmdDatePrefix,
        message: 'Accounting cycle: startDate must be a valid date (YYYY-MM-DD)',
      },
      {
        field: 'endDate',
        check: isYmdDatePrefix,
        message: 'Accounting cycle: endDate must be a valid date (YYYY-MM-DD)',
      },
    ],
  },
  'fx-transactions': {
    label: 'FX transaction',
    requiredFields: [
      'tenant',
      'transactionDate',
      'fromCurrency',
      'toCurrency',
      'fromAmount',
      'exchangeRate',
      'toAmount',
      'status',
    ],
    domainRules: [
      {
        field: 'fromCurrency',
        check: isCurrencyCode,
        message: 'FX transaction: fromCurrency must be a valid 3-letter currency code',
      },
      {
        field: 'toCurrency',
        check: isCurrencyCode,
        message: 'FX transaction: toCurrency must be a valid 3-letter currency code',
      },
      {
        field: 'exchangeRate',
        check: isPositiveFinite,
        message: 'FX transaction: exchangeRate must be positive',
      },
    ],
    crossFieldChecks: [
      (data) =>
        data.fromCurrency === data.toCurrency
          ? 'FX transaction: fromCurrency and toCurrency must be different'
          : null,
    ],
  },
  'role-scoped-access': {
    label: 'Role-scoped access',
    requiredFields: [
      'tenant',
      'role',
      'resourceType',
      'canCreate',
      'canRead',
      'canUpdate',
      'canDelete',
      'scope',
    ],
    domainRules: [
      {
        field: 'role',
        // Adds 'manager' to the base USER_ROLES list — role-scoped access
        // covers org roles broader than the auth USER_ROLES.
        check: (v) =>
          typeof v === 'string' && ['admin', 'accountant', 'auditor', 'manager'].includes(v),
        message: 'Role-scoped access: role must be one of: admin, accountant, auditor, manager',
      },
    ],
  },
  // ─── Pages (Payload website template) ──────────────────────────────────
  pages: {
    label: 'Page',
    requiredFields: ['title', 'slug', 'tenant'],
    domainRules: [
      {
        field: 'slug',
        // Lowercase URL slug — letters, digits, single-hyphen separators.
        // Pinned by Pages.slugField + ensureUniqueSlugWithinTenant convention.
        check: (v) => typeof v === 'string' && /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(v),
        message: 'Page: slug must be lowercase letters/digits with single-hyphen separators',
      },
      {
        field: '_status',
        check: (v) => typeof v === 'string' && ['draft', 'published'].includes(v),
        message: 'Page: _status must be one of: draft, published',
      },
    ],
  },
  // ─── Level-3 collections (e2e seeds) ────────────────────────────────────
  customers: {
    label: 'Customer',
    requiredFields: ['tenant', 'name', 'code', 'status'],
  },
  invoices: {
    label: 'Invoice',
    requiredFields: [
      'tenant',
      'customerId',
      'invoiceNumber',
      'invoiceDate',
      'dueDate',
      'totalAmount',
      'currency',
      'status',
    ],
    domainRules: [
      {
        field: 'totalAmount',
        check: (v) => typeof v === 'number' && v >= 0,
        message: 'Invoice: totalAmount must be positive',
      },
      {
        field: 'status',
        check: (v) =>
          typeof v === 'string' && ['draft', 'issued', 'paid', 'cancelled'].includes(v),
        message: 'Invoice: invalid status',
      },
      { field: 'currency', check: isCurrencyCode, message: 'Invoice: currency must be ISO-4217' },
    ],
  },
  vendors: {
    label: 'Vendor',
    requiredFields: ['tenant', 'name', 'code', 'status'],
  },
  'purchase-orders': {
    label: 'PO',
    requiredFields: [
      'tenant',
      'vendorId',
      'poNumber',
      'poDate',
      'dueDate',
      'totalAmount',
      'currency',
      'status',
    ],
    domainRules: [
      {
        field: 'totalAmount',
        check: (v) => typeof v === 'number' && v >= 0,
        message: 'PO: totalAmount must be positive',
      },
      {
        field: 'status',
        check: (v) =>
          typeof v === 'string' &&
          ['draft', 'ordered', 'received', 'invoiced', 'paid'].includes(v),
        message: 'PO: invalid status',
      },
      { field: 'currency', check: isCurrencyCode, message: 'PO: currency must be ISO-4217' },
    ],
  },
  'trial-balances': {
    label: 'Trial balance',
    requiredFields: ['tenant', 'periodDate', 'totalDebits', 'totalCredits', 'status'],
    crossFieldChecks: [
      // IFRS IAS-1 / GAAP ASC-105 — trial balance must balance.
      (data) => {
        const d = typeof data.totalDebits === 'number' ? data.totalDebits : 0;
        const c = typeof data.totalCredits === 'number' ? data.totalCredits : 0;
        return Math.abs(d - c) > 0.01
          ? 'Trial balance: debits must equal credits'
          : null;
      },
    ],
  },
  'financial-statements': {
    label: 'Financial statement',
    requiredFields: ['tenant', 'statementType', 'currency', 'status'],
    domainRules: [
      {
        field: 'currency',
        check: isCurrencyCode,
        message: 'Financial statement: currency must be ISO-4217',
      },
    ],
  },
  'bank-reconciliations': {
    label: 'Bank reconciliation',
    requiredFields: ['tenant', 'reconciliationDate', 'bankStatementBalance', 'bookBalance', 'status'],
  },
  'intercompany-transactions': {
    // Slice TTT: renamed `fromHostId`/`toHostId` → `fromTenant`/`toTenant`
    // per the Slice HHH host→tenant unification (no backward compat).
    label: 'Intercompany',
    requiredFields: [
      'fromTenant',
      'toTenant',
      'transactionDate',
      'reference',
      'debitAmount',
      'creditAmount',
      'status',
    ],
    crossFieldChecks: [
      (data) =>
        data.fromTenant === data.toTenant
          ? 'Intercompany: cannot be with same entity'
          : null,
      (data) => {
        const d = typeof data.debitAmount === 'number' ? data.debitAmount : 0;
        const c = typeof data.creditAmount === 'number' ? data.creditAmount : 0;
        return d !== c ? 'Intercompany: debits must equal credits' : null;
      },
    ],
  },
  'consolidation-eliminations': {
    label: 'Elimination',
    requiredFields: [
      'consolidationDate',
      'eliminationType',
      'debitAmount',
      'creditAmount',
      'status',
    ],
    crossFieldChecks: [
      (data) => {
        const d = typeof data.debitAmount === 'number' ? data.debitAmount : 0;
        const c = typeof data.creditAmount === 'number' ? data.creditAmount : 0;
        return d !== c ? 'Elimination: debits must equal credits' : null;
      },
    ],
  },
  'rounding-adjustments': {
    label: 'Rounding',
    requiredFields: [
      'tenant',
      'adjustmentDate',
      'fromCurrency',
      'toCurrency',
      'roundingAmount',
      'reason',
      'status',
    ],
    domainRules: [
      {
        field: 'reason',
        check: (v) => typeof v === 'string' && v.toLowerCase().includes('rounding'),
        message: 'Rounding: reason must specify rounding',
      },
    ],
  },
  'prior-period-adjustments': {
    label: 'PPA',
    requiredFields: [
      'tenant',
      'adjustmentDate',
      'postDate',
      'reference',
      'reason',
      'amount',
      'status',
    ],
  },
  'transaction-failures': {
    label: 'Transaction failure',
    requiredFields: [
      'tenant',
      'transactionDate',
      'reference',
      'reason',
      'statusCode',
      'status',
    ],
  },
  // ─── External-API + evidence-pack landing collections ──────────────────
  'api-audit-events': {
    label: 'API audit event',
    requiredFields: ['tenant', 'eventId', 'kind', 'country', 'source', 'resultOk'],
    domainRules: [
      {
        field: 'country',
        check: (v) => typeof v === 'string' && /^[A-Z]{2}$/.test(v),
        message: 'API audit event: country must be ISO-3166-1 alpha-2',
      },
    ],
  },
  'evidence-attestations': {
    label: 'Evidence attestation',
    requiredFields: ['tenant', 'attestationId', 'workflow', 'country', 'capturedAt', 'pdfA'],
    domainRules: [
      {
        field: 'country',
        check: (v) => typeof v === 'string' && /^[A-Z]{2}$/.test(v),
        message: 'Evidence attestation: country must be ISO-3166-1 alpha-2',
      },
      {
        field: 'pdfA',
        check: (v) => typeof v === 'string' && ['1b', '2b', '2a', '3b'].includes(v),
        message: 'Evidence attestation: pdfA must be one of: 1b, 2b, 2a, 3b',
      },
    ],
  },
};

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

  /**
   * Which Payload UI surface this seed primarily populates. Subclasses
   * SHOULD override (default `'admin-data'` covers the historical
   * accounting-collections case so existing seeds keep their semantics
   * without an explicit annotation).
   *
   * Read by the runtime registry below + tooling (coverage report,
   * admin-evidence walk-through) to filter seeds by UI surface.
   */
  static readonly uiCategory: SeedUiCategory = 'admin-data';

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
   * Validate data before creation against the per-collection registry.
   *
   * Two passes:
   *   1. Required fields → throws `<Label>: <field> is required` (contract
   *      pinned by the critical-gaps-verification suite).
   *   2. Domain rules → throws the rule's `message`. Rules with `field` not
   *      present on the record are skipped, so optional fields stay optional.
   *
   * Subclasses should *not* override this — add a new entry to
   * `SEED_VALIDATION_REGISTRY` instead. Per-class overrides are how the
   * pre-DRY seeds drifted apart in the first place.
   *
   * @throws Error on the first failing required field or domain rule.
   */
  protected async validateData(collection: string, data: Record<string, unknown>): Promise<void> {
    const contract = SEED_VALIDATION_REGISTRY[collection];
    if (!contract) {
      // Unregistered collection — defer to subclass / runtime for validation.
      return;
    }

    for (const field of contract.requiredFields) {
      const value = data[field];
      if (value === undefined || value === null || value === '') {
        throw new Error(`${contract.label}: ${field} is required`);
      }
    }

    if (contract.domainRules) {
      for (const rule of contract.domainRules) {
        const value = data[rule.field];
        if (value === undefined) continue; // optional fields stay optional
        if (!rule.check(value)) {
          throw new Error(rule.message);
        }
      }
    }

    if (contract.crossFieldChecks) {
      for (const check of contract.crossFieldChecks) {
        const message = check(data);
        if (message) {
          throw new Error(message);
        }
      }
    }
  }

  /**
   * Standard seed lifecycle: createContext → beforeSeed → `work()` →
   * afterSeed → return SeedResult. Subclasses just supply `work`.
   *
   * Replaces the ~35-line try/catch boilerplate that every seed used to
   * inline. Failures are caught here so callers always get a structured
   * `SeedResult` (success vs. error) instead of having to wrap each call
   * site in another try/catch.
   *
   * @standard ISO/IEC-29119:2022 software-testing test-fixture
   */
  protected async runSeedLifecycle(
    level: SeedContext['seedLevel'],
    work: () => Promise<void>,
  ): Promise<SeedResult> {
    this.context = this.createContext(level);
    const startTime = this.context.startTime;
    try {
      if (this.hooks.beforeSeed) {
        await this.hooks.beforeSeed(this.context);
      }
      await work();
      const stats = this.getStats();
      if (this.hooks.afterSeed) {
        await this.hooks.afterSeed(this.context, { success: true, ...stats });
      }
      return { success: true, ...stats };
    } catch (error) {
      return {
        success: false,
        seedLevel: level,
        totalTime: Date.now() - startTime,
        itemsCreated: 0,
        collections: {},
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  /**
   * Merge a child seed's `createdIds` into this seed's context.
   *
   * Suite-level seeds (`Level1SeedSuite`, `Level2SeedSuite`, …) that compose
   * multiple sub-seeds use this to aggregate cleanup tracking under one
   * lifecycle. Replaces ~6 lines of duplicate for-loop boilerplate per child.
   */
  protected mergeChildContext(child: TestSeedFactory): void {
    if (!this.context) throw new Error('Seed context not initialized');
    const childCtx = (child as unknown as { context: SeedContext | null }).context;
    if (!childCtx) return;
    for (const [collection, ids] of childCtx.createdIds) {
      let target = this.context.createdIds.get(collection);
      if (!target) {
        target = new Set<string>();
        this.context.createdIds.set(collection, target);
      }
      for (const id of ids) target.add(id);
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
      collection: collection as CollectionSlug,
      data: data as RequiredDataFromCollectionSlug<CollectionSlug>,
    });

    this.trackCreatedId(collection, result.id);
    return result as unknown as T & { id: string };
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
  protected async queryDocuments(collection: string, query?: Where) {
    return await this.payload.find({
      collection: collection as CollectionSlug,
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
            collection: collection as CollectionSlug,
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
  async cleanup(): Promise<CleanupResult> {
    if (this.cleanupStrategy === 'transaction-rollback' && this.context?.transactionId) {
      const startTime = Date.now();
      await this.rollbackTransaction(this.context.transactionId);
      // Clear context after rollback, mirroring the base cleanup — the
      // transaction (and its tracked ids) are gone, so the context must not leak.
      this.context = null;
      return { success: true, totalTime: Date.now() - startTime, itemsDeleted: 0, failures: [] };
    }
    return await super.cleanup();
  }
}

// ─── UI-category registry ────────────────────────────────────────────────
//
// Discovery surface for tools that want to enumerate seeds by Payload UI
// surface (admin-evidence walk-through, per-surface coverage reports,
// per-surface seed runners). Seed classes opt in by importing
// `registerSeedCategory` and calling it at module-load — keeps the registry
// decoupled from the seed-class hierarchy itself.

export type SeedConstructor = new (...args: never[]) => TestSeedFactory;

interface SeedCategoryEntry {
  readonly id: string;
  readonly category: SeedUiCategory;
  readonly description: string;
  readonly ctor: SeedConstructor;
}

const SEED_CATEGORY_REGISTRY = new Map<string, SeedCategoryEntry>();

/**
 * Register a seed class with its UI category + a one-line description.
 * Idempotent: re-registering the same id replaces the entry (lets seed
 * modules safely re-import in tests).
 */
export function registerSeedCategory(entry: SeedCategoryEntry): void {
  SEED_CATEGORY_REGISTRY.set(entry.id, entry);
}

/**
 * Read the full registry. Tools enumerate this to surface seeds by
 * category (e.g. "run only admin-data seeds before the admin-evidence
 * walk-through" or "which compliance-evidence seeds are not pinned by a
 * test").
 */
export function getSeedCategoryRegistry(): ReadonlyArray<SeedCategoryEntry> {
  return [...SEED_CATEGORY_REGISTRY.values()];
}

/**
 * Filter the registry by category — convenience wrapper for the common
 * "give me all admin-data seeds" call.
 */
export function getSeedsByCategory(
  category: SeedUiCategory,
): ReadonlyArray<SeedCategoryEntry> {
  return getSeedCategoryRegistry().filter((e) => e.category === category);
}
