/**
 * Tenant types — configuration shape for each independent app instance.
 *
 * Slice HHH (2026-05-10): renamed from `Host*` to `Tenant*` lexically;
 * no backward compat. The "host" alias coined in the Ruby ERPAX port is
 * fully retired. `AccountingStandard` enumerates the supported
 * accounting frameworks per tenant.
 *
 * @standard ISO-17442-1:2020 lei legal-entity-identifier
 * @standard ISO-3166-1:2020 country-codes
 * @standard ISO-4217:2015 currency-codes
 * @standard BCP-47 language-tag
 * @accounting IFRS International-Financial-Reporting-Standards
 * @accounting US-GAAP ASC-105 generally-accepted-accounting-principles
 * @accounting CN-ASBE Chinese-Accounting-Standards-for-Business-Enterprises
 * @accounting IN-IndAS Indian-Accounting-Standards
 * @accounting JP-J-GAAP Japanese-GAAP
 * @accounting GB-FRS UK-Financial-Reporting-Standards
 * @compliance GDPR Art.4(7) data-controller
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation
 * @see docs/STANDARDS.md §3 §4.2
 */

export type TenantStatus = 'draft' | 'active' | 'suspended' | 'archived';
export type AccountingStandard = 'IFRS' | 'GAAP' | 'ASBE' | 'INDAS' | 'JGAAP' | 'FRS' | 'CUSTOM';
export type FiscalYearEnd = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' |
                            'July' | 'August' | 'September' | 'October' | 'November' | 'December';

/**
 * Tenant configuration — one row per independent app instance.
 * Like WordPress multisite or Shopify: each tenant is its own configurable site.
 */
export interface Tenant {
  id: string;
  name: string;
  slug: string;
  description?: string;

  // Business configuration
  country: string; // ISO 3166-1 alpha-2 code (US, CN, DE, GB, etc.)
  accountingStandard: AccountingStandard; // Determined by country
  currency: string; // ISO 4217 code (USD, CNY, EUR, GBP, etc.)
  locale: string; // BCP 47 language tag (en-US, zh-CN, de-DE, etc.)

  // Financial configuration
  fiscalYearEnd: FiscalYearEnd;
  defaultTaxRate: number; // Percentage (0-100)

  // SSL & Domain
  domainName?: string;
  sslEnabled: boolean;
  sslCertificatePath?: string;

  // Status & Lifecycle
  status: TenantStatus;
  activatedAt?: Date;
  suspendedAt?: Date;
  archivedAt?: Date;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;

  // Configuration
  customAccountingRules?: Record<string, unknown>;
  seedTemplate?: string; // Which seed template was used
  seedsLoaded: boolean;
}

/** Tenant create DTO. */
export interface CreateTenantRequest {
  name: string;
  slug?: string;
  description?: string;
  country: string;
  accountingStandard?: AccountingStandard; // Optional - auto-determined from country
  currency: string;
  locale: string;
  fiscalYearEnd: FiscalYearEnd;
  defaultTaxRate?: number;
  domainName?: string;
  seedTemplate?: string;
}

/** Tenant update DTO. */
export interface UpdateTenantRequest {
  name?: string;
  description?: string;
  currency?: string;
  locale?: string;
  fiscalYearEnd?: FiscalYearEnd;
  defaultTaxRate?: number;
  domainName?: string;
  customAccountingRules?: Record<string, unknown>;
}

/** Tenant batch operation request. */
export interface BatchTenantActionRequest {
  tenantIds: string[];
  action: 'activate' | 'suspend' | 'resetStatus' | 'enableSSL' | 'disableSSL' | 'archive';
  reason?: string; // For audit trail
}

/** Tenant batch operation response. */
export interface BatchTenantActionResponse {
  action: string;
  totalRequested: number;
  successful: number;
  failed: number;
  errors: Array<{ tenantId: string; error: string }>;
  timestamp: Date;
}

/** Tenant statistics snapshot. */
export interface TenantStatistics {
  tenantId: string;
  status: TenantStatus;
  accountCount: number;
  invoiceCount: number;
  billCount: number;
  journalEntryCount: number;
  totalAmount: number; // In tenant's currency
  lastActivityAt: Date;
}

/**
 * Tenant scope context attached to requests for multi-tenant isolation.
 */
export interface TenantContext {
  tenantId: string;
  tenant: Tenant;
  userId: string;
  userRole: string;
  permissions: string[];
}

/** Tenant filter options for list queries. */
export interface TenantFilterOptions {
  status?: TenantStatus | TenantStatus[];
  country?: string | string[];
  accountingStandard?: AccountingStandard | AccountingStandard[];
  currency?: string | string[];
  searchTerm?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

/** Tenant pagination options. */
export interface TenantPaginationOptions {
  page: number;
  pageSize: number;
  sortBy?: 'name' | 'createdAt' | 'status' | 'country';
  sortOrder?: 'asc' | 'desc';
}

/** Tenant list response envelope. */
export interface TenantListResponse {
  tenants: Tenant[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/** Tenant lifecycle state machine. */
export const TENANT_STATUS_TRANSITIONS: Record<TenantStatus, TenantStatus[]> = {
  draft: ['active', 'archived'],
  active: ['suspended', 'archived'],
  suspended: ['active', 'archived'],
  archived: [], // Terminal state
};

/** Status labels for the admin UI. */
export const TENANT_STATUS_LABELS: Record<TenantStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  suspended: 'Suspended',
  archived: 'Archived',
};

/** Status colors for the admin UI. */
export const TENANT_STATUS_COLORS: Record<TenantStatus, string> = {
  draft: 'gray',
  active: 'green',
  suspended: 'yellow',
  archived: 'red',
};

/**
 * Country / Currency / Locale tables — derived from the canonical
 * `COUNTRY_PROFILES` in `@/config/regional-defaults`.
 *
 * These thin projections preserve the legacy `COUNTRY_TO_*` API for
 * existing callers while collapsing the source of truth into one file.
 * For new code, import `getTenantDefaults`, `getCountryCurrency`, or
 * `getCountryLocale` directly from `@/config/regional-defaults`.
 *
 * Pre-Slice-WW: BG was missing from `COUNTRY_TO_LOCALE` (defaulted to
 * undefined → string runtime errors); now `bg-BG` is present here as
 * the house default per the canonical profile.
 */
import { COUNTRY_PROFILES } from '../../config/regional-defaults';

export const COUNTRY_TO_STANDARD: Record<string, AccountingStandard> = Object.fromEntries(
  Object.entries(COUNTRY_PROFILES).map(([country, p]) => [country, p.accountingStandard]),
) as Record<string, AccountingStandard>;

export const COUNTRY_TO_CURRENCY: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_PROFILES).map(([country, p]) => [country, p.currency]),
);

export const COUNTRY_TO_LOCALE: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_PROFILES).map(([country, p]) => [country, p.locale]),
);
