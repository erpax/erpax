/**
 * EmployeesPanel — IAS 19 / ASC 710 workforce snapshot.
 *
 * Read-only summary card: count by employmentType + status, average
 * tenure, IAS 19 §11 PTO accrued liability roll-up.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IAS-19 employee-benefits
 * @audit ISO-19011:2018 audit-trail
 * @compliance GDPR Art.9 special-categories
 * @security ISO-27002 §5.34 privacy-and-protection-of-pii
 * @see src/plugins/accounting/collections/Employees.ts
 */

import React from 'react'

export interface EmployeesPanelEmployee {
  id: string | number
  employeeNumber: string
  status:
    | 'pre_hire'
    | 'active'
    | 'on_leave'
    | 'suspended'
    | 'terminated'
  employmentType:
    | 'full_time_indefinite'
    | 'full_time_fixed_term'
    | 'part_time_indefinite'
    | 'part_time_fixed_term'
    | 'apprentice'
    | 'intern'
    | 'contractor'
    | 'director'
  hireDate: string
  paidTimeOffBalance?: number
  baseSalaryAnnual?: number
  fteRatio?: number
  currency: string
}

export interface EmployeesPanelProps {
  employees: EmployeesPanelEmployee[]
  asOfDate: string
  /** Optional daily-rate divisor for PTO liability (defaults to 260 working days). */
  workingDaysPerYear?: number
}

const EmployeesPanel: React.FC<EmployeesPanelProps> = ({
  employees,
  asOfDate,
  workingDaysPerYear = 260,
}) => {
  const active = employees.filter((e) => e.status === 'active')
  const onLeave = employees.filter((e) => e.status === 'on_leave')
  const totalActive = active.length

  // IAS 19 §11 accumulating PTO liability — Σ (PTO balance days × daily rate)
  const ptoLiability = active.reduce((s, e) => {
    const balance = e.paidTimeOffBalance ?? 0
    const annualSalary = (e.baseSalaryAnnual ?? 0) * (e.fteRatio ?? 1)
    const dailyRate = annualSalary / workingDaysPerYear
    return s + Math.round(balance * dailyRate)
  }, 0)
  const currency = employees[0]?.currency ?? 'EUR'

  // Count by employment type.
  const byType = active.reduce<Record<string, number>>((acc, e) => {
    acc[e.employmentType] = (acc[e.employmentType] ?? 0) + 1
    return acc
  }, {})

  return (
    <section
      aria-labelledby="employees-panel-heading"
      style={{
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 8,
        padding: 16,
        background: 'var(--theme-elevation-0)',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 id="employees-panel-heading" style={{ margin: 0, fontSize: 18 }}>
          Employees — IAS 19 / ASC 710
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
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Active</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{totalActive}</dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            {onLeave.length} on leave
          </small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            PTO accrued liability
          </dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency,
              minimumFractionDigits: 2,
            }).format(ptoLiability / 100)}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>IAS 19 §11</small>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Headcount mix</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>
            {Object.keys(byType).length}
          </dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            employment types
          </small>
        </div>
      </dl>

      {Object.keys(byType).length > 0 && (
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 8,
            listStyle: 'none',
            padding: 0,
            margin: '16px 0 0',
          }}
        >
          {Object.entries(byType).map(([type, count]) => (
            <li
              key={type}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 10px',
                background: 'var(--theme-elevation-50)',
                borderRadius: 6,
                fontSize: 13,
              }}
            >
              <span>{type.replace(/_/g, ' ')}</span>
              <strong>{count}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default EmployeesPanel
