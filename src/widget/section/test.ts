import { describe, expect, it } from 'vitest'

import { atomAddress } from '@/atom/address'

import { StatementSection, atomPath } from './index'

describe('widget/section — the six sections that were one', () => {
  it('is a component, and the tint is a parameter rather than a copy', () => {
    expect(typeof StatementSection).toBe('function')
    // Refutable: the declared path is checked against where this file actually LIVES, so a one-
    // letter change reddens the atom ([[rules]]/mirror — restating the literal proves nothing).
    expect(atomPath).toBe(atomAddress(import.meta.url).path)
  })

  it('renders a heading, one row per account, and a total', () => {
    const el = StatementSection({
      title: 'ASSETS',
      rows: [{ accountCode: '1000', accountName: 'Cash', balance: 10 }],
      total: 10,
      totalLabel: 'Total Assets',
    }) as { props: { children: readonly unknown[] } }
    expect(Array.isArray(el.props.children)).toBe(true)
    expect(el.props.children).toHaveLength(3)
  })
})
