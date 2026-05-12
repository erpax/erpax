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
 * Multi-tenancy field — single source of truth for the per-collection
 * `tenant` foreign key that drives ISO 27001 A.5.23 / ISO 27002 §5.15
 * cloud-tenant isolation.
 *
 * Defaults to a hidden admin field. Pass options to opt out of the
 * defaults when a collection legitimately needs the field visible (e.g.
 * billing-side collections where ops needs to see tenant assignment),
 * unique (single-row-per-tenant pattern), or annotated.
 *
 * @standard ISO-27001:2022 A.5.23 cloud-service-tenant-isolation
 * @standard ISO-27002:2022 §5.15 access-control
 */
export const multiTenancyField = (
  options: {
    /** Enforce a single row per tenant (e.g. tenant-level subscription). */
    unique?: boolean
    /** Admin-UI description shown next to the field. */
    description?: string
    /** Override the default `hidden: true` admin behaviour. */
    hidden?: boolean
  } = {},
): Field => {
  const hidden = options.hidden ?? true
  return {
    name: 'tenant',
    type: 'relationship',
    relationTo: 'tenants',
    required: true,
    ...(options.unique ? { unique: true } : {}),
    admin: {
      hidden,
      ...(options.description ? { description: options.description } : {}),
    },
  }
}

/**
 * Currency select field. Pass a custom `name` for FX-pair fields like
 * `fromCurrency` / `toCurrency`; defaults to `currency` for the typical
 * single-currency case. Default value is the canonical `DEFAULT_CURRENCY`
 * (EUR by house default, env-overridable via `ERPAX_DEFAULT_CURRENCY`).
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
      } = 'EUR',
): Field => {
  const opts =
    typeof defaultValueOrOptions === 'string'
      ? { defaultValue: defaultValueOrOptions }
      : defaultValueOrOptions

  const currencyOptions = [
    { label: 'EUR — Euro', value: 'EUR' },
    { label: 'USD — US Dollar', value: 'USD' },
    { label: 'GBP — British Pound', value: 'GBP' },
    { label: 'JPY — Japanese Yen', value: 'JPY' },
    { label: 'CHF — Swiss Franc', value: 'CHF' },
    { label: 'AUD — Australian Dollar', value: 'AUD' },
    { label: 'CAD — Canadian Dollar', value: 'CAD' },
    { label: 'SEK — Swedish Krona', value: 'SEK' },
    { label: 'NOK — Norwegian Krone', value: 'NOK' },
    { label: 'DKK — Danish Krone', value: 'DKK' },
    { label: 'BGN — Bulgarian Lev', value: 'BGN' },
  ]

  const blankOption = { label: 'XXX — No currency (ISO 4217)', value: 'XXX' }
  const includeBlank = opts.allowBlank === true
  const optionsList = includeBlank
    ? [...currencyOptions.filter((o) => o.value !== 'XXX'), blankOption]
    : [...currencyOptions]

  return {
    name: opts.name ?? 'currency',
    type: 'select',
    defaultValue: opts.defaultValue ?? 'EUR',
    ...(opts.required && !includeBlank ? { required: true } : {}),
    options: optionsList,
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
 * Audit trail fields (who did what and when)
 */
export const auditTrailFields = (options: { readOnly?: boolean } = {}): Field[] => [
  {
    name: 'createdBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      readOnly: options.readOnly ?? true,
      disabled: true,
    },
  },
  {
    name: 'updatedBy',
    type: 'relationship',
    relationTo: 'users',
    admin: {
      readOnly: options.readOnly ?? true,
      disabled: true,
    },
  },
  {
    name: 'createdAt',
    type: 'date',
    admin: {
      readOnly: options.readOnly ?? true,
      disabled: true,
    },
  },
  {
    name: 'updatedAt',
    type: 'date',
    admin: {
      readOnly: options.readOnly ?? true,
      disabled: true,
    },
  },
]
