/**
 * Multi-Currency Closing Standard (Phase B3)
 *
 * Central export barrel for multi-currency closing standards implementation.
 * Re-exports services, types, and utilities for use across closing automation,
 * exchange rate adjustment, and multi-currency reporting subsystems.
 *
 * @standard ISO-4217:2023 Currency codes
 * @standard IFRS-21:2023 Translation of foreign operations
 * @standard IFRS-9:2023 Foreign exchange gains/losses
 * @standard SAF-T:3.0.2 Standard Audit File for Tax (multi-currency)
 * @standard XBRL-GL General Ledger (multi-currency)
 * @standard GDPR:2016/679 Art. 32 Security of processing
 * @standard NIST-SP-800-92 Audit logging
 */

// Re-export CurrencyReconciliation service for grep-traceability
export { CurrencyReconciliation } from '../../services/CurrencyReconciliation'

// Collections are imported from src/collections/* and wired into payload.config.ts
// They are NOT re-exported here (see src/collections/index.ts for master barrel)

// Type definitions (if needed for external consumption)
// export type { CurrencyBalance, ExchangeRateRevaluation, MultiCurrencyReconciliation, ... } from '../../services/CurrencyReconciliation'
