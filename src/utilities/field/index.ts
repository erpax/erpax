/**
 * Fields Index — canonical exports for all field definitions.
 *
 * All shared fields live in src/shared/field.ts.
 * Domain-specific field exports are handled via named imports below.
 *
 * @audit Flat namespace to eliminate circular imports and duplicate definitions.
 * No nested barrel exports — all chains resolve directly to src/shared/field.ts.
 */

// Shared fields (used everywhere)

// Domain-specific named exports
export { createInvoiceNumberField, createInvoiceStatusField, createDueDateField, createPaymentTermsField, createARAnalysisFields } from '@/utilities/receivable'
export { saleStatusOptions } from '@/utilities/fiscal'

// Child atoms — the accessors a hook uses to reach a field's value
export * from '@/utilities/field/nested'
export * from '@/utilities/field/relation'
