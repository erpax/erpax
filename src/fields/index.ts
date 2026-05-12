/**
 * Fields Index — canonical exports for all field definitions.
 *
 * Import shared fields from src/fields/shared.ts
 * Import domain-specific fields from src/fields/<domain>/
 */

// Shared fields (used everywhere)
export * from './shared'

// Domain-specific fields
export * from './accounting'
export { createInvoiceNumberField, createInvoiceStatusField, createDueDateField, createPaymentTermsField, createARAnalysisFields } from './receivables'
export type { PayableFieldConfig } from './payables'
