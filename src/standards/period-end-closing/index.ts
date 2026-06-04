/**
 * Period-End Closing Standard (Phase B2)
 *
 * Central export barrel for period-end closing standards implementation.
 * Re-exports services, types, and utilities for use across closing automation,
 * reversing entry generation, and fiscal reporting subsystems.
 *
 * @standard IAS-34:2023 Interim Financial Reporting
 * @standard SAF-T:3.0.2 Standard Audit File for Tax
 * @standard XBRL-GL General Ledger
 * @standard GDPR:2016/679 Art. 32 Security of processing
 * @standard eIDAS:2014/910/EU Electronic signatures
 * @standard SOX:2002 Sec. 404 Internal control assessment
 * @standard NIST-SP-800-92 Audit logging
 */

// Re-export ClosingPeriodChecker service for grep-traceability
export { ClosingPeriodChecker } from '@/services/ClosingPeriodChecker'

// Collections are imported from src/collections/* and wired into payload.config.ts
// They are NOT re-exported here (see src/collections/index.ts for master barrel)

// Type definitions (if needed for external consumption)
// export type { ClosingValidation, ReversalEntry, ... } from '@/services/ClosingPeriodChecker'
