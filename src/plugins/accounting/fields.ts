/**
 * @erpax/accounting/fields — reusable Payload field definitions.
 *
 * @standard ISO-4217:2015 currency-codes amount-fields
 * @standard ISO-8601-1:2019 date-time date-fields
 * @standard ISO-3166-1:2020 country-codes
 * @accounting IFRS IAS-1 presentation-of-financial-statements
 * @see docs/STANDARDS.md §4.2
 */

import type { Field } from 'payload'

/**
 * Common code field pattern (for accounts, items, addresses, etc.)
 * PATTERN: Applied to all master data collections
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
 * PATTERN: Applied to most collections for audit trail
 */
export const descriptionField: Field = {
  name: 'description',
  type: 'textarea',
  admin: {
    description: 'Additional details and notes',
  },
}

/**
 * Amount field pattern (for debits, credits, payments)
 * PATTERN: Applied to all monetary fields
 * COMPLIANT: ISO 4217 decimal place validation (typically 2 decimal places)
 */
export const amountField = (label: string = 'Amount', decimalPlaces: number = 2): Field => ({
  name: 'amount',
  type: 'number',
  required: true,
  min: 0,
  validate: (value) => {
    if (typeof value === 'number' && value !== undefined) {
      // Enforce ISO 4217 decimal place requirements
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
 * PATTERN: Applied to all transaction dates
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
 * Account type field (for Accounts collection)
 * PATTERN: Asset, Liability, Equity, Income, Expense, COGS
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
 * Debit/Credit field pattern (for Entries)
 * PATTERN: Type is always 'debit' or 'credit'
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
 * Invoice status field
 * PATTERN: draft → review → issued → confirmed → complete/cancelled
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
 * Payment status field
 * PATTERN: pending → authorized → posted
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
 * Statement status field
 * PATTERN: pending → cleared → reconciled
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

// Backwards-compat re-exports — canonical definitions live in
// `./fields/base-accounting-fields`. Pre-existing inline duplicates
// were removed (Slice purge: standard-DRY drift sweep).
export {
  multiTenancyField,
  currencyField,
} from './fields/base-accounting-fields'
