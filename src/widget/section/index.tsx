/**
 * widget/section — one ledger section: a heading, its account rows, and its total. See SKILL.md.
 *
 * @accounting IFRS IAS-1 §54 statement-of-financial-position
 * @standard WCAG 2.2 §1.3.1 info-and-relationships
 */
import React from 'react'
import { formatCurrency } from '@/format/amount'

export const atomPath = 'widget/section' as const

/** Shaped to the domain's `AccountLine`, where the code and the name are both optional. */
export interface SectionRow {
  readonly accountCode?: string | undefined
  readonly accountName?: string | undefined
  readonly balance?: number | undefined
}

export interface StatementSectionProps {
  readonly title: string
  readonly rows: readonly SectionRow[]
  readonly total: number
  readonly totalLabel: string
  /** The heading's tint — the one thing that genuinely differed between the six copies. */
  readonly tint?: string
  readonly dense?: boolean
  /** What to show when there are no rows — an empty section states itself rather than vanishing. */
  readonly emptyLabel?: string
}

/** A heading, its rows, and its total — the body six statement sections each wrote out. */
export const StatementSection: React.FC<StatementSectionProps> = ({
  title,
  rows,
  total,
  totalLabel,
  tint = 'bg-primary/20',
  dense = false,
  emptyLabel,
}) => {
  const pad = dense ? 'py-1' : 'py-2'
  if (rows.length === 0 && emptyLabel !== undefined) {
    return (
      <div className={dense ? 'mb-3' : 'mb-4'}>
        <div className={`font-bold ${tint} px-2 ${pad}${dense ? '' : ' mb-1'}`}>{title}</div>
        <div className="px-2 py-1 text-muted-foreground">{emptyLabel}</div>
      </div>
    )
  }
  return (
    <div className={dense ? 'mb-3' : 'mb-4'}>
      <div className={`font-bold ${tint} px-2 ${pad}${dense ? '' : ' mb-1'}`}>{title}</div>
      {rows.map((row, i) => (
        <div
          key={row.accountCode ?? row.accountName ?? String(i)}
          className={`flex justify-between px-2 py-1 border-b${dense ? '' : ' hover:bg-muted'}`}
        >
          <span>{row.accountName}</span>
          <span className="text-right">{formatCurrency(row.balance ?? 0)}</span>
        </div>
      ))}
      <div className={`flex justify-between px-2 ${pad} bg-muted font-semibold${dense ? '' : ' border-t-2'}`}>
        <span>{totalLabel}</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  )
}

export default StatementSection
