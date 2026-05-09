/**
 * Host (tenant) types — configuration shape for each independent app instance.
 *
 * Learned from Ruby ERPAX Domain model. `AccountingStandard` enumerates the
 * supported accounting frameworks per host.
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

export type HostStatus = 'draft' | 'active' | 'suspended' | 'archived';
export type AccountingStandard = 'IFRS' | 'GAAP' | 'ASBE' | 'INDAS' | 'JGAAP' | 'FRS' | 'CUSTOM';
export type FiscalYearEnd = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' |
                            'July' | 'August' | 'September' | 'October' | 'November' | 'December';

/**
 * Host Configuration
 * Each host represents a separate, configurable application instance
 * Like WordPress multisite or Shopify - each site is independent
 */
export interface Host {
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
  status: HostStatus;
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

/**
 * Host Create/Update DTO
 */
export interface CreateHostRequest {
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

export interface UpdateHostRequest {
  name?: string;
  description?: string;
  currency?: string;
  locale?: string;
  fiscalYearEnd?: FiscalYearEnd;
  defaultTaxRate?: number;
  domainName?: string;
  customAccountingRules?: Record<string, unknown>;
}

/**
 * Host Batch Operation Request
 */
export interface BatchHostActionRequest {
  tenantIds: string[];
  action: 'activate' | 'suspend' | 'resetStatus' | 'enableSSL' | 'disableSSL' | 'archive';
  reason?: string; // For audit trail
}

/**
 * Host Batch Operation Response
 */
export interface BatchHostActionResponse {
  action: string;
  totalRequested: number;
  successful: number;
  failed: number;
  errors: Array<{ tenantId: string; error: string }>;
  timestamp: Date;
}

/**
 * Host Statistics
 */
export interface HostStatistics {
  tenantId: string;
  status: HostStatus;
  accountCount: number;
  invoiceCount: number;
  billCount: number;
  journalEntryCount: number;
  totalAmount: number; // In host's currency
  lastActivityAt: Date;
}

/**
 * Host Scope Context
 * Attached to requests for multi-tenant isolation
 */
export interface HostContext {
  tenantId: string;
  host: Host;
  userId: string;
  userRole: string;
  permissions: string[];
}

/**
 * Host Filter Options
 */
export interface HostFilterOptions {
  status?: HostStatus | HostStatus[];
  country?: string | string[];
  accountingStandard?: AccountingStandard | AccountingStandard[];
  currency?: string | string[];
  searchTerm?: string;
  createdAfter?: Date;
  createdBefore?: Date;
}

/**
 * Host Pagination
 */
export interface HostPaginationOptions {
  page: number;
  pageSize: number;
  sortBy?: 'name' | 'createdAt' | 'status' | 'country';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Host List Response
 */
export interface HostListResponse {
  hosts: Host[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

/**
 * Host Status Transitions (State Machine)
 */
export const HOST_STATUS_TRANSITIONS: Record<HostStatus, HostStatus[]> = {
  draft: ['active', 'archived'],
  active: ['suspended', 'archived'],
  suspended: ['active', 'archived'],
  archived: [], // Terminal state
};

/**
 * Host Status Labels for UI
 */
export const HOST_STATUS_LABELS: Record<HostStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  suspended: 'Suspended',
  archived: 'Archived',
};

/**
 * Host Status Colors for UI
 */
export const HOST_STATUS_COLORS: Record<HostStatus, string> = {
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
import { COUNTRY_PROFILES } from '@/config/regional-defaults';

export const COUNTRY_TO_STANDARD: Record<string, AccountingStandard> = Object.fromEntries(
  Object.entries(COUNTRY_PROFILES).map(([country, p]) => [country, p.accountingStandard]),
) as Record<string, AccountingStandard>;

export const COUNTRY_TO_CURRENCY: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_PROFILES).map(([country, p]) => [country, p.currency]),
);

export const COUNTRY_TO_LOCALE: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_PROFILES).map(([country, p]) => [country, p.locale]),
);
