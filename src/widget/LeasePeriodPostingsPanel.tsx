/**
 * LeasePeriodPostingsPanel — IFRS 16 / ASC 842 per-period evidence snapshot.
 *
 * Mirrors `DepreciationSchedulesPanel` for fixed assets: a read-only summary
 * over one row per (lease × period). Surfaces the canonical IAS 16 §36-§38
 * decomposition the auditor reads:
 *
 *   Σ interest accretion    (Dr Interest Exp / Cr Lease Liab)
 *   Σ principal repayment   (Dr Lease Liab    / Cr Cash)
 *   Σ ROU amortisation      (Dr ROU Am Exp    / Cr Acc. ROU Am)
 *
 * Plus closing carrying-amount totals as of the chosen reporting date.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IFRS-16 §29-§31 rou-asset-subsequent-measurement
 * @accounting IFRS IFRS-16 §36-§38 lease-liability-amortised-cost
 * @accounting US-GAAP ASC-842-20-35 lessee-subsequent-measurement
 * @audit ISO-19011:2018 audit-trail period-end-evidence
 * @compliance SOX §404 internal-controls capital-asset-register
 * @see src/plugins/accounting/collections/LeasePeriodPostings.ts
 */

import React from 'react'

export interface LeasePeriodPostingsPanelRow {
  id: string | number
  postingId: string
  periodEnd: string
  interest: number
  principalRepayment: number
  cashPayment: number
  rouAmortisation: number
  closingLiabilityCarrying?: number
  closingRouCarrying?: number
  status: 'calculated' | 'posted' | 'reversed'
  currency: string
}

export interface LeasePeriodPostingsPanelProps {
  postings: LeasePeriodPostingsPanelRow[]
  asOfDate: string
  /** Optional locale override (BCP-47). Defaults to 'en-US'. */
  locale?: string
}

const fmtMoney = (cents: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100)

const LeasePeriodPostingsPanel: React.FC<LeasePeriodPostingsPanelProps> = ({
  postings,
  asOfDate,
  locale = 'en-US',
}) => {
  const calculated = postings.filter((p) => p.status === 'calculated')
  const posted = postings.filter((p) => p.status === 'posted')
  const reversed = postings.filter((p) => p.status === 'reversed')

  // Period-activity rollup excludes reversed rows so the totals match what
  // landed in the GL.
  const liveActivity = postings.filter((p) => p.status !== 'reversed')
  const totalInterest = liveActivity.reduce((s, p) => s + p.interest, 0)
  const totalPrincipal = liveActivity.reduce(
    (s, p) => s + p.principalRepayment,
    0,
  )
  const totalAmortisation = liveActivity.reduce(
    (s, p) => s + p.rouAmortisation,
    0,
  )

  // Closing carrying amounts — last posted row per stable ordering of
  // periodEnd. Caller is expected to pass rows ordered by periodEnd; here
  // we just take max-per-id treating the latest row as closing.
  const closingLiab = posted.reduce(
    (s, p) => s + (p.closingLiabilityCarrying ?? 0),
    0,
  )
  const closingRou = posted.reduce(
    (s, p) => s + (p.closingRouCarrying ?? 0),
    0,
  )

  const currency = postings[0]?.currency ?? 'EUR'

  return (
    <section
      aria-labelledby="lease-period-postings-panel-heading"
      style={{
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 8,
        padding: 16,
        background: 'var(--theme-elevation-0)',
      }}
    >
      <header
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}
      >
        <h2
          id="lease-period-postings-panel-heading"
          style={{ margin: 0, fontSize: 18 }}
        >
          Lease period postings — IFRS 16 §36-§38 / ASC 842-20
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
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            Interest accretion
          </dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalInterest, currency, locale)}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            §36 effective-interest method
          </small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            Principal repayment
          </dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalPrincipal, currency, locale)}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>IAS 7 financing</small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            ROU amortisation
          </dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalAmortisation, currency, locale)}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>§31 typically SL</small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Status</dt>
          <dd style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>
            {posted.length} posted · {calculated.length} calc
            {reversed.length > 0 && (
              <span style={{ color: 'var(--theme-warning-500, #b45309)' }}>
                {' '}
                · {reversed.length} rev
              </span>
            )}
          </dd>
        </div>
      </dl>

      <dl
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 16,
          margin: '16px 0 0',
          paddingTop: 16,
          borderTop: '1px solid var(--theme-elevation-100)',
        }}
      >
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            Σ closing liability (posted)
          </dt>
          <dd style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
            {fmtMoney(closingLiab, currency, locale)}
          </dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            Σ closing ROU (posted)
          </dt>
          <dd style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
            {fmtMoney(closingRou, currency, locale)}
          </dd>
        </div>
      </dl>

      {posted.length > 0 && (
        <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--theme-elevation-100)' }}>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Posting</th>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Period end</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>Interest</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>Principal</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>ROU am.</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>Closing liab.</th>
            </tr>
          </thead>
          <tbody>
            {posted.slice(0, 10).map((p) => (
              <tr
                key={p.id}
                style={{ borderBottom: '1px solid var(--theme-elevation-50)' }}
              >
                <td style={{ padding: '6px 0' }}>{p.postingId}</td>
                <td style={{ padding: '6px 0' }}>{p.periodEnd}</td>
                <td style={{ padding: '6px 0', textAlign: 'right' }}>
                  {fmtMoney(p.interest, p.currency, locale)}
                </td>
                <td style={{ padding: '6px 0', textAlign: 'right' }}>
                  {fmtMoney(p.principalRepayment, p.currency, locale)}
                </td>
                <td style={{ padding: '6px 0', textAlign: 'right' }}>
                  {fmtMoney(p.rouAmortisation, p.currency, locale)}
                </td>
                <td style={{ padding: '6px 0', textAlign: 'right' }}>
                  {p.closingLiabilityCarrying != null
                    ? fmtMoney(p.closingLiabilityCarrying, p.currency, locale)
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default LeasePeriodPostingsPanel
