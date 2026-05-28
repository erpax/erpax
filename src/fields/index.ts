/**
 * Fields Index — canonical exports for all field definitions.
 *
 * All shared fields live in src/fields/shared.ts.
 * Domain-specific field exports are handled via named imports below.
 *
 * @audit Flat namespace to eliminate circular imports and duplicate definitions.
 * No nested barrel exports — all chains resolve directly to src/fields/shared.ts.
 */

// Shared fields (used everywhere)
export * from './shared'

// Domain-specific named exports
export { createInvoiceNumberField, createInvoiceStatusField, createDueDateField, createPaymentTermsField, createARAnalysisFields } from './receivables'
export type { PayableFieldConfig } from './payables'
