/**
 * Base Accounting Fields — multi-tenancy, currency, status, notes factories.
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @security ISO-27001 A.5.23 cloud-service-tenant-isolation hostId-field
 * @security ISO-27002 §5.15 access-control
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @see docs/STANDARDS.md §4.2 §4.4
 */

import type { Field } from 'payload'
/**
 * Multi-tenancy field (hostId)
 */
export const multiTenancyField = (): Field => ({
  name: 'tenant',
  type: 'relationship',
  relationTo: 'tenants',
  required: true,
  admin: { hidden: true },
});

/**
 * GL Account reference with denormalized display fields
 */
export const glAccountField = (required = false): Field[] => [
  {
    name: 'glAccount',
    type: 'relationship',
    relationTo: 'gl-accounts',
    required,
  },
  {
    name: 'accountNumber',
    type: 'text',
    admin: { disabled: true },
  },
  {
    name: 'accountName',
    type: 'text',
    admin: { disabled: true },
  },
];

// Canonical regional defaults & SUPPORTED_CURRENCIES live in
// `@/config/regional-defaults`. Re-exported here so existing collection-side
// imports keep working while the canonical module remains the single source
// of truth (Slice WW: regional-defaults consolidation).
export { SUPPORTED_CURRENCIES, currencyOptions, DEFAULT_CURRENCY } from '@/config/regional-defaults';
import { currencyOptions as canonicalCurrencyOptions, DEFAULT_CURRENCY as CANON_DEFAULT_CURRENCY } from '@/config/regional-defaults';

/**
 * Currency select field. Pass a custom `name` for FX-pair fields like
 * `fromCurrency` / `toCurrency`; defaults to `currency` for the typical
 * single-currency case. Default value is the canonical `DEFAULT_CURRENCY`
 * (EUR by house default, env-overridable via `ERPAX_DEFAULT_CURRENCY`).
 */
export const currencyField = (
  defaultValueOrOptions: string | { name?: string; defaultValue?: string; required?: boolean } = CANON_DEFAULT_CURRENCY,
): Field => {
  const opts =
    typeof defaultValueOrOptions === 'string'
      ? { defaultValue: defaultValueOrOptions }
      : defaultValueOrOptions;
  return {
    name: opts.name ?? 'currency',
    type: 'select',
    defaultValue: opts.defaultValue ?? CANON_DEFAULT_CURRENCY,
    ...(opts.required ? { required: true } : {}),
    options: [...canonicalCurrencyOptions],
  };
};

/**
 * Status field with common accounting statuses
 */
export const statusField = (options: { label: string; value: string }[], defaultValue = 'draft'): Field => ({
  name: 'status',
  type: 'select',
  defaultValue,
  options,
});

/**
 * Timestamps and tracking fields
 */
export const timestampFields = (): Field[] => [
  {
    name: 'createdAt',
    type: 'date',
    admin: { disabled: true },
  },
  {
    name: 'updatedAt',
    type: 'date',
    admin: { disabled: true },
  },
];

/**
 * Audit trail fields (who did what and when)
 */
export const auditFields = (): Field[] => [
  {
    name: 'createdBy',
    type: 'relationship',
    relationTo: 'users',
    admin: { disabled: true },
  },
  {
    name: 'approvedBy',
    type: 'relationship',
    relationTo: 'users',
  },
  {
    name: 'approvedAt',
    type: 'date',
    admin: { disabled: true },
  },
];

/**
 * Notes field for additional context
 */
export const notesField = (label = 'Notes'): Field => ({
  name: 'notes',
  type: 'textarea',
  label,
});
