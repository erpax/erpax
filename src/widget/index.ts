/**
 * widget — the atom's public face (its content-uuid contract).
 *
 * The import convention ([[tamper]]/import) is: anything importing a widget
 * reaches this INDEX (`@/widget`), never a deep internal file
 * (`@/widget/TrialBalanceWidget`). This index re-exports the PURE statement
 * widgets the dashboard composes — each a `React.FC<{ data: TVM | null }>` over an
 * `@/analytics` view-model that renders, never fetches (the dashboard/spec law).
 *
 * @audit re-exports only; each widget's truth lives in its own leaf module
 * @see ../dashboard/spec -- ../analytics -- ./TrialBalanceWidget -- ./BalanceSheetWidget -- ./IncomeStatementWidget
 */

export { default as TrialBalanceWidget } from './TrialBalanceWidget'
export { default as BalanceSheetWidget } from './BalanceSheetWidget'
export { default as IncomeStatementWidget } from './IncomeStatementWidget'

// The audit-trail widget — the ⊥ overlay tile (its own spec + audit-events
// localApi DataSource). Re-exported so the dashboard composes it via the atom
// index (`@/widget`), never the deep `./AuditLogWidget` file.
export { default as AuditLogWidget, auditLogWidget, auditLogSource } from './AuditLogWidget'
export type { AuditLogData, AuditLogEntry } from './AuditLogWidget'
