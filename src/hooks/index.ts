/**
 * Hooks Index
 *
 * Central export for all Payload hooks used in collections.
 * Organized by concern: validation, immutability, audit, fiscal period, etc.
 */

// Validation Hooks (GL Double-Entry & Fiscal Period)
export { validateDoubleEntry } from '@/validate/double/entry'
export { validateFiscalPeriodPosting } from '@/validate/fiscal/period/posting'

// Immutability & Access Enforcement
export { enforcePostingImmutability } from '@/enforce/posting/immutability'

// Fiscal Period Lifecycle
export { updateFiscalCalendarOnPeriodChange } from '@/update/fiscal/calendar/on/period/change'

// Period-End Closing (Phase B2)
export { validateClosingPeriod } from '@/validate/closing/period'
export { generateReversingEntries } from '@/generate/reversing/entry'

// Multi-Currency Closing (Phase B3)
export { validateMultiCurrencyClosing } from '@/validate/multi/currency/closing'

// Intercompany Fiscal Alignment (Phase B4)
export { validateConsolidationReadiness } from '@/validate/consolidation/readiness'

// Tax Period Integration (Phase B5)
export { validateTaxPeriodClosing } from '@/validate/tax/period/closing'

// Audit & Compliance Reporting (Phase B6)
export { validateAuditComplianceReporting } from '@/validate/audit/compliance/reporting'

// Post-Close Analytics (Phase B7)
export { validatePostCloseAnalytics } from '@/validate/post/close/analytics'
