import { describe, it, expect } from 'vitest'
import EmployeeContracts from './index'

const fields = EmployeeContracts.fields as Array<{ name?: string; type?: string; relationTo?: string }>
const names = fields.map((f) => f.name).filter(Boolean) as string[]
const field = (n: string) => fields.find((f) => f.name === n)

describe('employees/contracts — the employment contract (the labour anchor)', () => {
  it('is a homonym distinct by path — its own slug, never the IFRS-15 customer contract', () => {
    expect(EmployeeContracts.slug).toBe('employee-contracts') // customers/contracts owns `contracts`
    expect(EmployeeContracts.labels?.singular).toBe('Employment Contract')
  })

  it('anchors labour: the employee party is required; the employer is the tenant, not a field', () => {
    expect(field('employee')?.relationTo).toBe('employees')
    expect(fields.find((f) => f.name === 'employee')).toMatchObject({ required: true })
    expect(names).not.toContain('employer') // multi-tenant scope, per etrima employer_id → accounts
  })

  it('legalGround is OPEN TEXT — a select would reject real data (one article written four ways)', () => {
    expect(field('legalGround')?.type).toBe('text')
    expect(field('legalGround')?.type).not.toBe('select')
  })

  it('endDate is optional — absent IS the indefinite contract (30%), not missing data', () => {
    expect(field('endDate')?.type).toBe('date')
    expect(fields.find((f) => f.name === 'endDate')).not.toMatchObject({ required: true })
    expect(field('startDate')?.type).toBe('date')
  })

  it('carries the live columns mined from the real 919 rows', () => {
    for (const n of ['number', 'legalGround', 'startDate', 'endDate', 'payRate', 'payPeriod', 'terms', 'position']) {
      expect(names).toContain(n)
    }
  })

  it('DEAD upstream columns are NOT ported — porting an unused column invents a domain', () => {
    for (const dead of [
      'declared', // 0/919 — the НАП registration lifecycle was never tracked
      'delivered', // 0/919
      'retiredSince', // 1/919
      'hoursPerDay', // 17/919
      'daysPerWeek', // 17/919
      'noticeMonths', // 16/919
      'paidAnnualLeaveDays', // 17/919
      'probationaryMonths', // 16/919
    ]) {
      expect(names).not.toContain(dead)
    }
  })

  it('separates the term from the lifecycle (started/stopped are not startDate/endDate)', () => {
    expect(names).toContain('startedAt') // 591/919 commenced
    expect(names).toContain('stoppedAt') // 11/919 ceased
  })
})
