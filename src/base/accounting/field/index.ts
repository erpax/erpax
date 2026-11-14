/**
 * Base Accounting Fields — multi-tenancy, currency, status, notes factories.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation tenant-field
 * @security ISO-27002 §5.15 access-control
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @see docs/STANDARDS.md §4.2 §4.4
 */

import type { Field } from 'payload'

// Canonical regional defaults & SUPPORTED_CURRENCIES live in
// `@/config/regional/defaults`. Re-exported here so existing collection-side
// imports keep working while the canonical module remains the single source
// of truth (Slice WW: regional-defaults consolidation).
export { SUPPORTED_CURRENCIES, currencyOptions, DEFAULT_CURRENCY } from '@/config/regional/defaults';
import { DEFAULT_CURRENCY as CANON_DEFAULT_CURRENCY, isIso4217Currency } from '@/config/regional/defaults';
