/**
 * Accounting plugin components — shadcn/ui + Recharts React components.
 *
 * Core Components:
 *   • TrialBalance - Display GL accounts with debit/credit balances
 *   • GLPostingReconciliation - Match GL postings with source documents
 *   • PeriodEndChecklist - Step-by-step period closing verification
 *   • AuditTrailViewer - Transaction history with filtering
 *
 * All components use shadcn/ui for UI elements and Recharts for visualizations.
 * Fully typed with TypeScript interfaces for data binding.
 *
 * @standard SAF-T:2.0 reporting
 * @accounting IFRS-16 presentation
 * @audit ISO-19011:2018 internal-audit
 */

export { TrialBalance, type TrialBalanceProps, type GLAccount } from './trial-balance'
export {
  GLPostingReconciliation,
  type GLPostingReconciliationProps,
  type GLPostingRecord,
} from './gl-posting-reconciliation'
export {
  PeriodEndChecklist,
  type PeriodEndChecklistProps,
  type ChecklistItem,
} from './period-end-checklist'
export {
  AuditTrailViewer,
  type AuditTrailViewerProps,
  type AuditRecord,
} from './audit-trail-viewer'

// Component registry for plugin loader
export const components = {
  TrialBalance: 'TrialBalance',
  GLPostingReconciliation: 'GLPostingReconciliation',
  PeriodEndChecklist: 'PeriodEndChecklist',
  AuditTrailViewer: 'AuditTrailViewer',
}
