import { describe, expect, it } from 'vitest'

import { duplicatePeriodError, improvementPlanError, periodError, scorecardsField } from '@/fields/array/scorecardsField'

describe('scorecardsField — a vendor carries its own evaluations (ISO 9001 §8.4.1)', () => {
  it('is one array on the party', () => {
    expect(scorecardsField()).toMatchObject({ name: 'scorecards', type: 'array' })
  })

  it('a period ends on or after it starts', () => {
    expect(periodError('2026-03-31', '2026-01-01')).toBe(true)
    expect(periodError('2026-01-01', '2026-01-01')).toBe(true)
    expect(periodError('2025-12-31', '2026-01-01')).toMatch(/ends on or after/)
  })

  it('a conditional or probation recommendation carries an improvement plan', () => {
    expect(improvementPlanError('', 'conditional')).toMatch(/improvement plan/)
    expect(improvementPlanError('  ', 'probation')).toMatch(/improvement plan/)
    expect(improvementPlanError('Fix OTD by Q2', 'probation')).toBe(true)
    expect(improvementPlanError(undefined, 'approved')).toBe(true)
  })

  it('one scorecard per period', () => {
    expect(duplicatePeriodError([{ periodLabel: '2026-Q1' }, { periodLabel: '2026-Q2' }])).toBe(true)
    expect(duplicatePeriodError([{ periodLabel: '2026-Q1' }, { periodLabel: ' 2026-q1 ' }])).toMatch(/one scorecard per period/)
  })
})
