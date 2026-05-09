/**
 * LeasesPanel — IFRS 16 / ASC 842 lessee snapshot.
 *
 * Read-only summary card: count of active leases, aggregate ROU asset
 * carrying amount, lease liability carrying amount, and split by
 * recognition exemption (short-term / low-value / on-balance).
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IFRS-16 leases lessee-disclosure
 * @accounting US-GAAP ASC-842-20 lessee-accounting
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/collections/Leases.ts
 */

import React from 'react'

export interface LeasesPanelLease {
  id: string | number
  leaseNumber: string
  classification:
    | 'finance'
    | 'operating'
    | 'short_term'
    | 'low_value'
  status: string
  rouAssetCarrying: number
  liabilityCarrying: number
  endDate: string
  currency: string
}

export interface LeasesPanelProps {
  leases: LeasesPanelLease[]
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

const LeasesPanel: React.FC<LeasesPanelProps> = ({ leases, asOfDate, locale = 'en-US' }) => {
  const active = leases.filter((l) => l.status === 'active')
  const exempt = active.filter(
    (l) => l.classification === 'short_term' || l.classification === 'low_value',
  )
  const onBalance = active.filter(
    (l) => l.classification === 'finance' || l.classification === 'operating',
  )

  const currency = leases[0]?.currency ?? 'EUR'
  const totalRou = onBalance.reduce((s, l) => s + l.rouAssetCarrying, 0)
  const totalLiab = onBalance.reduce((s, l) => s + l.liabilityCarrying, 0)

  return (
    <section
      aria-labelledby="leases-panel-heading"
      style={{
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 8,
        padding: 16,
        background: 'var(--theme-elevation-0)',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 id="leases-panel-heading" style={{ margin: 0, fontSize: 18 }}>
          Leases — IFRS 16 / ASC 842
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
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Active leases</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{active.length}</dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>On-balance ROU</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalRou, currency, locale)}
          </dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Lease liability</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalLiab, currency, locale)}
          </dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            Recognition-exempt
          </dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{exempt.length}</dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            short-term + low-value (off-BS)
          </small>
        </div>
      </dl>

      {active.length > 0 && (
        <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--theme-elevation-100)' }}>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Lease</th>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Class</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>ROU asset</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>Liability</th>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Ends</th>
            </tr>
          </thead>
          <tbody>
            {active.slice(0, 10).map((l) => (
              <tr key={l.id} style={{ borderBottom: '1px solid var(--theme-elevation-50)' }}>
                <td style={{ padding: '6px 0' }}>{l.leaseNumber}</td>
                <td style={{ padding: '6px 0' }}>{l.classification}</td>
                <td style={{ padding: '6px 0', textAlign: 'right' }}>
                  {fmtMoney(l.rouAssetCarrying, l.currency, locale)}
                </td>
                <td style={{ padding: '6px 0', textAlign: 'right' }}>
                  {fmtMoney(l.liabilityCarrying, l.currency, locale)}
                </td>
                <td style={{ padding: '6px 0' }}>{l.endDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default LeasesPanel
