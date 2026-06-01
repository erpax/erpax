/**
 * Shared Field Definitions — reusable across all domains.
 *
 * Consolidated from:
 * - src/plugins/accounting/fields/base-accounting-fields.ts
 * - src/plugins/receivables/fields.ts (money patterns)
 * - src/plugins/payables/fields.ts (money patterns)
 *
 * @standard ISO-4217:2015 currency-codes
 * @standard ISO-8601-1:2019 date-time
 * @standard ISO-27001:2022 A.5.23 cloud-service-tenant-isolation
 * @standard ISO-27002:2022 §5.15 access-control
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @see docs/STANDARDS.md §4.2 §4.4
 */

import type { Field } from 'payload'

/**
 * Canonical regional defaults & SUPPORTED_CURRENCIES live in
 * `@/config/regional-defaults`. Re-exported here so existing collection-side
 * imports keep working while the canonical module remains the single source
 * of truth (Slice WW: regional-defaults consolidation).
 */
export { SUPPORTED_CURRENCIES, currencyOptions, DEFAULT_CURRENCY } from '../../config/regional-defaults'
import { DEFAULT_CURRENCY as CANON_DEFAULT_CURRENCY, isIso4217Currency } from '../../config/regional-defaults'

/**
 * Currency select field. Pass a custom `name` for FX-pair fields like
 * `fromCurrency` / `toCurrency`; defaults to `currency` for the typical
 * single-currency case. Default value is the canonical `DEFAULT_CURRENCY`
 * (EUR by house default, env-overridable via `ERPAX_DEFAULT_CURRENCY`).
 *
 * Slice LLLLLLLLL (2026-05-11) — `allowBlank: true` adds ISO 4217 XXX
 * (No currency) to the option list AND forces `required: false`. The
 * field's runtime fallback is `resolveCurrency()` from
 * `@/services/currency-fallback` — null/empty inputs round-trip to XXX
 * rather than throwing. Use `allowBlank: true` on collections where a
 * provisional or non-monetary row is legitimate (drafts, imports,
 * non-monetary lines).
 *
 * @standard ISO-4217:2015 currency-codes
 */
export const currencyField = (
  defaultValueOrOptions:
    | string
    | {
        name?: string
        defaultValue?: string
        required?: boolean
        allowBlank?: boolean
      } = CANON_DEFAULT_CURRENCY,
): Field => {
  const opts =
    typeof defaultValueOrOptions === 'string'
      ? { defaultValue: defaultValueOrOptions }
      : defaultValueOrOptions

  // ISO 4217 §6.1 — ANY valid currency code is accepted (the `currency` skill),
  // not a closed list; SUPPORTED_CURRENCIES are admin suggestions, not the bound.
  // allowBlank permits the XXX identity element (§6.5 "no currency"); required off then.
  const includeBlank = opts.allowBlank === true

  return {
    name: opts.name ?? 'currency',
    type: 'text',
    defaultValue: opts.defaultValue ?? CANON_DEFAULT_CURRENCY,
    ...(opts.required && !includeBlank ? { required: true } : {}),
    validate: (value: unknown) => {
      if (value === undefined || value === null || value === '') return true
      if (includeBlank && value === 'XXX') return true
      return isIso4217Currency(value) ? true : 'Must be a valid ISO 4217 currency code'
    },
    admin: { description: 'ISO 4217 currency code — any valid code accepted (e.g. EUR, USD, BGN).' },
  }
}

/**
 * Amount field pattern (for debits, credits, payments)
 * @standard ISO-4217:2015 currency decimal-place validation
 */
export const amountField = (
  label: string = 'Amount',
  decimalPlaces: number = 2,
): Field => ({
  name: 'amount',
  type: 'number',
  required: true,
  min: 0,
  validate: (value: unknown) => {
    if (typeof value === 'number' && value !== undefined) {
      const decimalPart = (value.toString().split('.')[1] || '').length
      if (decimalPart > decimalPlaces) {
        return `Amount must have at most ${decimalPlaces} decimal places (ISO 4217)`
      }
    }
    return true
  },
  admin: {
    description: label,
  },
})

/**
 * Date field pattern
 * @standard ISO-8601-1:2019 date-time
 */
export const dateField = (label: string = 'Date'): Field => ({
  name: 'date',
  type: 'date',
  required: true,
  admin: {
    description: label,
  },
})

/**
 * Common code field pattern (for accounts, items, addresses, etc.)
 */
export const codeField: Field = {
  name: 'code',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  admin: {
    description: 'Unique identifier code',
  },
}

/**
 * Description field pattern
 */
export const descriptionField: Field = {
  name: 'description',
  type: 'textarea',
  admin: {
    description: 'Additional details and notes',
  },
}

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
]

/**
 * Status field with common statuses
 */
export const statusField = (
  options: { label: string; value: string }[],
  defaultValue = 'draft',
): Field => ({
  name: 'status',
  type: 'select',
  defaultValue,
  options,
})

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
]

/**
 * Audit trail fields (who did what and when).
 *
 * Pass `{ readOnly: true }` for collections that expose the approval lifecycle
 * to the admin UI (the approver should *see* who/when, just not edit it).
 * Default keeps the historical hidden/disabled admin UI for fully-system-managed
 * audit columns.
 *
 * @standard ISO-19011:2018 audit-trail
 * @security ISO-27002 §5.4 segregation-of-duties approver-visibility
 */
export const auditFields = (
  options: {
    /** Show `approvedBy` / `approvedAt` as readOnly in admin UI instead of disabled. */
    readOnly?: boolean
  } = {},
): Field[] => [
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
    ...(options.readOnly ? { admin: { readOnly: true } } : {}),
  },
  {
    name: 'approvedAt',
    type: 'date',
    admin: options.readOnly ? { readOnly: true } : { disabled: true },
  },
]

/**
 * Notes field for additional context
 */
export const notesField = (label = 'Notes'): Field => ({
  name: 'notes',
  type: 'textarea',
  label,
})

/**
 * Account type field — standard GL account classifications
 * @accounting IAS-1 financial-position reporting-entities
 */
export const accountTypeField: Field = {
  name: 'type',
  type: 'select',
  required: true,
  options: [
    { label: 'Asset', value: 'asset' },
    { label: 'Liability', value: 'liability' },
    { label: 'Equity', value: 'equity' },
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
    { label: 'Cost of Goods Sold', value: 'cogs' },
  ],
  index: true,
  admin: {
    description: 'Account classification for reporting',
  },
}

/**
 * Debit/Credit entry type field
 */
export const debitCreditField: Field = {
  name: 'type',
  type: 'select',
  required: true,
  options: [
    { label: 'Debit', value: 'debit' },
    { label: 'Credit', value: 'credit' },
  ],
  admin: {
    description: 'Debit or Credit to account',
  },
}

/**
 * Invoice status field — standard workflow progression
 */
export const invoiceStatusField: Field = {
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'draft',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Review', value: 'review' },
    { label: 'Issued', value: 'issued' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Complete', value: 'complete' },
    { label: 'Cancelled', value: 'cancelled' },
  ],
  index: true,
  admin: {
    description: 'Invoice workflow status',
  },
}

/**
 * Payment status field — standard payment lifecycle
 */
export const paymentStatusField: Field = {
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'pending',
  options: [
    { label: 'Pending', value: 'pending' },
    { label: 'Authorized', value: 'authorized' },
    { label: 'Posted', value: 'posted' },
    { label: 'Completed', value: 'completed' },
    { label: 'Failed', value: 'failed' },
    { label: 'Cancelled', value: 'cancelled' },
  ],
  index: true,
  admin: {
    description: 'Payment processing status',
  },
}

/**
 * Statement status field — bank reconciliation workflow
 */
export const statementStatusField: Field = {
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'pending',
  options: [
    { label: 'Pending', value: 'pending' },
    { label: 'Cleared', value: 'cleared' },
    { label: 'Reconciled', value: 'reconciled' },
  ],
  index: true,
  admin: {
    description: 'Bank statement line status',
  },
}

/**
 * Build a Payload `select` field driven by a standards-registry options
 * array. Pass any `*_OPTIONS` constant from `src/standards/<id>/index.ts`.
 *
 * @example
 *   taxonomySelect('scope', GHG_SCOPE_OPTIONS, { defaultValue: 'scope_1' })
 *   taxonomySelect('incoterms', INCOTERM_OPTIONS, { required: true })
 */
export const taxonomySelect = <T extends string>(
  name: string,
  options: ReadonlyArray<{ label: string; value: T }>,
  opts: {
    required?: boolean
    defaultValue?: T
    description?: string
    hasMany?: boolean
    index?: boolean
  } = {},
): Field =>
  // SelectField is discriminated on `hasMany`; a single spread-built literal
  // can't satisfy either union arm, so assert the assembled select field.
  ({
    name,
    type: 'select',
    ...(opts.required ? { required: true } : {}),
    ...(opts.defaultValue !== undefined ? { defaultValue: opts.defaultValue } : {}),
    ...(opts.hasMany ? { hasMany: true } : {}),
    ...(opts.index ? { index: true } : {}),
    options: options.map((o) => ({ label: o.label, value: o.value })),
    ...(opts.description ? { admin: { description: opts.description } } : {}),
  }) as Field

/**
 * Tenant-unique human-readable reference (e.g. `INV-2026-001`,
 * `PROV-2026-001`, `WIP-2026-04-PRJ-001`). Recurs in 30+ collections.
 *
 * Defaults: `text`, required, unique, indexed.
 */
export const referenceField = (
  opts: { name?: string; description?: string; required?: boolean } = {},
): Field => ({
  name: opts.name ?? 'reference',
  type: 'text',
  required: opts.required ?? true,
  unique: true,
  index: true,
  ...(opts.description
    ? { admin: { description: opts.description } }
    : {}),
})

/**
 * Reference to the IFRS-10 §B86 reporting legal entity. Recurs across
 * accounting / consolidation / ESG / TP collections; should always be
 * the same shape so consolidation can join unambiguously.
 */
export const legalEntityField = (
  opts: { required?: boolean; description?: string } = {},
): Field => ({
  name: 'legalEntity',
  type: 'relationship',
  relationTo: 'legal-entities',
  ...(opts.required ? { required: true } : {}),
  admin: {
    description:
      opts.description ??
      'Reporting legal entity per IFRS-10 §B86 (distinct from `tenants` DB partition).',
  },
})

/**
 * ISO 3166-1 alpha-2 country code as a text field with the standard
 * description + indexing. Recurs across 20+ collections (legal-entities,
 * customers, vendors, tax-jurisdictions, tracking-events, customs-
 * declarations, etc.).
 *
 * Validation against the canonical alpha-2 set lives in
 * `src/standards/iso-3166-1/validate.ts`; collections SHOULD invoke it
 * from a `validate` hook when strict checking is needed.
 *
 * @standard ISO 3166-1:2020 country-codes
 */
export const countryCodeField = (
  opts: { name?: string; required?: boolean; description?: string } = {},
): Field => ({
  name: opts.name ?? 'countryCode',
  type: 'text',
  ...(opts.required ? { required: true } : {}),
  index: true,
  admin: {
    description:
      opts.description ?? 'ISO 3166-1 alpha-2 country code (e.g. BG, DE, RO).',
  },
})

/**
 * NACE Rev.2 economic activity code text field (e.g. `62.01`).
 * Companion section enum lives in `src/standards/nace-rev2/`.
 *
 * @standard EU Regulation (EC) No 1893/2006 NACE Rev.2
 */
export const naceCodeField = (
  opts: { name?: string; description?: string } = {},
): Field => ({
  name: opts.name ?? 'naceCode',
  type: 'text',
  admin: {
    description:
      opts.description ??
      'NACE Rev.2 economic activity code (e.g. `62.01`). Used by EU CSRD ESRS 2 §80(b) sector classification.',
  },
})
