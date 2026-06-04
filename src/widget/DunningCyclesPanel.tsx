/**
 * DunningCyclesPanel — IFRS 9 / CECL collection-process snapshot.
 *
 * Read-only summary card: cycles by stage (reminder → first demand →
 * second demand → legal handover → written off), aggregate amount
 * overdue, and pause flags.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IFRS-9 §5.5 expected-credit-loss
 * @accounting US-GAAP ASC-326-20 cecl-credit-losses
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/collections/DunningCycles.ts
 */

import React from 'react'

export type DunningStage =
  | 'reminder'
  | 'first_demand'
  | 'second_demand'
  | 'legal_handover'
  | 'written_off'

export interface DunningCyclesPanelCycle {
  id: string | number
  cycleId: string
  currentStage: DunningStage
  amountOverdue: number
  daysPastDue: number
  paused: boolean
  status: string
  currency: string
}

export interface DunningCyclesPanelProps {
  cycles: DunningCyclesPanelCycle[]
  asOfDate: string
  locale?: string
}

const STAGE_LABELS: Record<DunningStage, string> = {
  reminder: '1 — Reminder',
  first_demand: '2 — First demand',
  second_demand: '3 — Second demand',
  legal_handover: '4 — Legal handover',
  written_off: '5 — Written off',
}

const STAGE_COLORS: Record<DunningStage, string> = {
  reminder: '#3b82f6',
  first_demand: '#f59e0b',
  second_demand: '#ef4444',
  legal_handover: '#7c2d12',
  written_off: '#525252',
}

const fmtMoney = (cents: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(cents / 100)

const DunningCyclesPanel: React.FC<DunningCyclesPanelProps> = ({
  cycles,
  asOfDate,
  locale = 'en-US',
}) => {
  const active = cycles.filter((c) => c.status === 'active' && !c.paused)
  const paused = cycles.filter((c) => c.paused)
  const totalOverdue = active.reduce((s, c) => s + c.amountOverdue, 0)
  const currency = cycles[0]?.currency ?? 'EUR'

  const byStage = active.reduce<Record<DunningStage, { count: number; amount: number }>>(
    (acc, c) => {
      acc[c.currentStage] ??= { count: 0, amount: 0 }
      acc[c.currentStage].count += 1
      acc[c.currentStage].amount += c.amountOverdue
      return acc
    },
    {} as Record<DunningStage, { count: number; amount: number }>,
  )

  return (
    <section
      aria-labelledby="dunning-cycles-panel-heading"
      style={{
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 8,
        padding: 16,
        background: 'var(--theme-elevation-0)',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 id="dunning-cycles-panel-heading" style={{ margin: 0, fontSize: 18 }}>
          Dunning cycles — IFRS 9 / CECL
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
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Active cycles</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{active.length}</dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Total overdue</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {fmtMoney(totalOverdue, currency, locale)}
          </dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Paused</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{paused.length}</dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            disputes / payment plans
          </small>
        </div>
      </dl>

      {(Object.entries(byStage) as Array<[DunningStage, { count: number; amount: number }]>).length >
        0 && (
        <table style={{ width: '100%', marginTop: 16, borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--theme-elevation-100)' }}>
              <th style={{ textAlign: 'left', padding: '8px 0' }}>Stage</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>Cycles</th>
              <th style={{ textAlign: 'right', padding: '8px 0' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(['reminder', 'first_demand', 'second_demand', 'legal_handover', 'written_off'] as DunningStage[])
              .filter((s) => byStage[s])
              .map((s) => (
                <tr key={s} style={{ borderBottom: '1px solid var(--theme-elevation-50)' }}>
                  <td style={{ padding: '6px 0', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      aria-hidden
                      style={{
                        display: 'inline-block',
                        width: 10,
                        height: 10,
                        borderRadius: 999,
                        background: STAGE_COLORS[s],
                      }}
                    />
                    {STAGE_LABELS[s]}
                  </td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>{byStage[s].count}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>
                    {fmtMoney(byStage[s].amount, currency, locale)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default DunningCyclesPanel
