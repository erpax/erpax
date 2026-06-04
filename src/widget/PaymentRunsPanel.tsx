/**
 * PaymentRunsPanel — ISO 20022 batch payment run snapshot.
 *
 * Read-only summary card: count of runs by status (draft / approved /
 * exported / submitted / settled / rejected), aggregate control sum
 * by message type (pain.001 vs pain.008).
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO-20022 pain.001 customer-credit-transfer-initiation
 * @standard ISO-20022 pain.008 customer-direct-debit-initiation
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/collections/PaymentRuns.ts
 */

import React from 'react'

export interface PaymentRunsPanelRun {
  id: string | number
  runId: string
  messageType: 'pain_001' | 'pain_008'
  status:
    | 'draft'
    | 'pending_review'
    | 'approved'
    | 'exported'
    | 'submitted'
    | 'settled'
    | 'rejected'
    | 'cancelled'
  numberOfTransactions: number
  controlSum: number
  currency: string
  requestedExecutionDate: string
}

export interface PaymentRunsPanelProps {
  runs: PaymentRunsPanelRun[]
  asOfDate: string
  locale?: string
}

const STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  pending_review: 'Pending review',
  approved: 'Approved',
  exported: 'Exported',
  submitted: 'Submitted',
  settled: 'Settled',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
}

const fmtMoney = (cents: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100)

const PaymentRunsPanel: React.FC<PaymentRunsPanelProps> = ({
  runs,
  asOfDate,
  locale = 'en-US',
}) => {
  const inFlight = runs.filter(
    (r) => r.status !== 'settled' && r.status !== 'cancelled' && r.status !== 'rejected',
  )
  const ap = inFlight.filter((r) => r.messageType === 'pain_001')
  const ar = inFlight.filter((r) => r.messageType === 'pain_008')

  const apTotal = ap.reduce((s, r) => s + r.controlSum, 0)
  const arTotal = ar.reduce((s, r) => s + r.controlSum, 0)
  const currency = runs[0]?.currency ?? 'EUR'

  const byStatus = inFlight.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1
    return acc
  }, {})

  return (
    <section
      aria-labelledby="payment-runs-panel-heading"
      style={{
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 8,
        padding: 16,
        background: 'var(--theme-elevation-0)',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 id="payment-runs-panel-heading" style={{ margin: 0, fontSize: 18 }}>
          Payment runs — ISO 20022
        </h2>
        <small style={{ color: 'var(--theme-elevation-400)' }}>as of {asOfDate}</small>
      </header>

      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 16,
          margin: '16px 0 0',
        }}
      >
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            AP outbound (pain.001)
          </dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(apTotal, currency, locale)}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            {ap.length} run{ap.length === 1 ? '' : 's'}
          </small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            AR inbound (pain.008)
          </dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(arTotal, currency, locale)}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            {ar.length} run{ar.length === 1 ? '' : 's'}
          </small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>In-flight</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{inFlight.length}</dd>
        </div>
      </dl>

      {Object.keys(byStatus).length > 0 && (
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', padding: 0, margin: '16px 0 0' }}>
          {Object.entries(byStatus).map(([status, count]) => (
            <li
              key={status}
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                background: 'var(--theme-elevation-50)',
                fontSize: 12,
              }}
            >
              {STATUS_LABELS[status] ?? status}: <strong>{count}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PaymentRunsPanel
