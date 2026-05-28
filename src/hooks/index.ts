/**
 * Hooks Index
 *
 * Central export for all Payload hooks used in collections.
 * Organized by concern: validation, immutability, audit, fiscal period, etc.
 */

// Validation Hooks (GL Double-Entry & Fiscal Period)
export { validateDoubleEntry } from './validateDoubleEntry'
export { validateFiscalPeriodPosting } from './validateFiscalPeriodPosting'

// Immutability & Access Enforcement
export { enforcePostingImmutability } from './enforcePostingImmutability'

// Fiscal Period Lifecycle
export { updateFiscalCalendarOnPeriodChange } from './updateFiscalCalendarOnPeriodChange'

// Period-End Closing (Phase B2)
export { validateClosingPeriod } from './validateClosingPeriod'
export { generateReversingEntries } from './generateReversingEntries'

// Multi-Currency Closing (Phase B3)
export { validateMultiCurrencyClosing } from './validateMultiCurrencyClosing'

// Intercompany Fiscal Alignment (Phase B4)
export { validateConsolidationReadiness } from './validateConsolidationReadiness'

// Tax Period Integration (Phase B5)
export { validateTaxPeriodClosing } from './validateTaxPeriodClosing'

// Audit & Compliance Reporting (Phase B6)
export { validateAuditComplianceReporting } from './validateAuditComplianceReporting'

// Post-Close Analytics (Phase B7)
export { validatePostCloseAnalytics } from './validatePostCloseAnalytics'
