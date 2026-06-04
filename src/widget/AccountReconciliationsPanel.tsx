/**
 * AccountReconciliationsPanel — IAS 7 reconciliation evidence pack snapshot.
 *
 * Read-only summary card: open/approved/rejected counts + difference
 * total (must be 0 for any approved row).
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-7 statement-of-cash-flows bank-reconciliation
 * @audit ISO-19011:2018 audit-trail period-end-evidence
 * @compliance SOX §404 internal-controls reconciliation-sign-off
 * @security ISO-27002 §5.4 segregation-of-duties
 * @see src/plugins/accounting/collections/AccountReconciliations.ts
 */

import React from 'react'

export interface AccountReconciliationsPanelRow {
  id: string | number
  reconciliationId: string
  kind: 'bank' | 'gl_to_subledger' | 'intercompany'
  asOfDate: string
  difference: number
  status:
    | 'draft'
    | 'pending_review'
    | 'approved'
    | 'rejected'
    | 'reopened'
  currency: string
}

export interface AccountReconciliationsPanelProps {
  reconciliations: AccountReconciliationsPanelRow[]
  asOfDate: string
}

const AccountReconciliationsPanel: React.FC<AccountReconciliationsPanelProps> = ({
  reconciliations,
  asOfDate,
}) => {
  const draft = reconciliations.filter((r) => r.status === 'draft')
  const pending = reconciliations.filter(
    (r) => r.status === 'pending_review' || r.status === 'reopened',
  )
  const approved = reconciliations.filter((r) => r.status === 'approved')
  const rejected = reconciliations.filter((r) => r.status === 'rejected')

  const unbalancedApproved = approved.filter(
    (r) => Math.abs(r.difference) >= 1,
  )

  return (
    <section
      aria-labelledby="acc-recs-panel-heading"
      style={{
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 8,
        padding: 16,
        background: 'var(--theme-elevation-0)',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 id="acc-recs-panel-heading" style={{ margin: 0, fontSize: 18 }}>
          Account reconciliations — IAS 7 / SOX §404
        </h2>
        <small style={{ color: 'var(--theme-elevation-400)' }}>as of {asOfDate}</small>
      </header>

      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 16,
          margin: '16px 0 0',
        }}
      >
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Drafts</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{draft.length}</dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Pending review</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{pending.length}</dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            preparer → reviewer
          </small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Approved</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{approved.length}</dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            {unbalancedApproved.length > 0 ? (
              <span style={{ color: 'var(--theme-error-500, #ef4444)' }}>
                {unbalancedApproved.length} unbalanced ⚠
              </span>
            ) : (
              'all balanced'
            )}
          </small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Rejected</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{rejected.length}</dd>
        </div>
      </dl>
    </section>
  )
}

export default AccountReconciliationsPanel
