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
export * from '../shared/field'

// Domain-specific named exports
export { createInvoiceNumberField, createInvoiceStatusField, createDueDateField, createPaymentTermsField, createARAnalysisFields } from '@/receivable'
export { unpField, fiscalDeviceNumberField, operatorCodeField, fiscalQrField, saleStatusOptions } from '@/fiscal'
