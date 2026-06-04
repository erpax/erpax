/**
 * PayrollRunsPanel — IAS 19 / ASC 710 payroll cycle snapshot.
 *
 * Read-only summary card: count of runs by status (draft / approved /
 * posted / disbursed / settled), aggregate gross + net, employer-side
 * accruals total.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-19 employee-benefits
 * @accounting US-GAAP ASC-710 compensation-general
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/collections/PayrollRuns.ts
 */

import React from 'react'

export interface PayrollRunsPanelRun {
  id: string | number
  runId: string
  status:
    | 'draft'
    | 'calculated'
    | 'pending_review'
    | 'approved'
    | 'posted'
    | 'disbursed'
    | 'settled'
    | 'reversed'
    | 'cancelled'
  paySchedule: 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'off_cycle'
  periodEnd: string
  paymentDate: string
  employeeCount?: number
  totalGross?: number
  totalNet?: number
  totalEmployerSideAccruals?: number
  currency: string
}

export interface PayrollRunsPanelProps {
  runs: PayrollRunsPanelRun[]
  asOfDate: string
  locale?: string
}

const fmtMoney = (cents: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100)

const PayrollRunsPanel: React.FC<PayrollRunsPanelProps> = ({
  runs,
  asOfDate,
  locale = 'en-US',
}) => {
  const inFlight = runs.filter(
    (r) =>
      r.status !== 'cancelled' &&
      r.status !== 'reversed' &&
      r.status !== 'settled',
  )
  const settled = runs.filter((r) => r.status === 'settled')
  const totalGross = inFlight.reduce(
    (s, r) => s + (r.totalGross ?? 0),
    0,
  )
  const totalNet = inFlight.reduce((s, r) => s + (r.totalNet ?? 0), 0)
  const totalAccruals = inFlight.reduce(
    (s, r) => s + (r.totalEmployerSideAccruals ?? 0),
    0,
  )
  const currency = runs[0]?.currency ?? 'EUR'

  return (
    <section
      aria-labelledby="payroll-runs-panel-heading"
      style={{
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 8,
        padding: 16,
        background: 'var(--theme-elevation-0)',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 id="payroll-runs-panel-heading" style={{ margin: 0, fontSize: 18 }}>
          Payroll runs — IAS 19 / ASC 710
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
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>In-flight runs</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{inFlight.length}</dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            {settled.length} settled
          </small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Σ gross (Wages Exp)</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalGross, currency, locale)}
          </dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Σ net (Net Payable)</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalNet, currency, locale)}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            pain.001 disbursement
          </small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Employer accruals</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalAccruals, currency, locale)}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            SS + pension + payroll tax
          </small>
        </div>
      </dl>
    </section>
  )
}

export default PayrollRunsPanel
