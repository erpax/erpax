/**
 * CostCentersPanel — IFRS 8 / ASC 280 segment dimension snapshot.
 *
 * Read-only summary card: cost-center hierarchy depth, count by kind
 * (region / country / business unit / department / team / project),
 * and a flag for which centers are reportable segments under IFRS 8 §13.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @accounting IFRS IFRS-8 operating-segments
 * @accounting US-GAAP ASC-280 segment-reporting
 * @audit ISO-19011:2018 audit-trail
 * @see src/plugins/accounting/collections/CostCenters.ts
 */

import React from 'react'

export type CostCenterKind =
  | 'region'
  | 'country'
  | 'business_unit'
  | 'department'
  | 'team'
  | 'project'
  | 'cost_pool'
  | 'profit_center'

export interface CostCentersPanelCenter {
  id: string | number
  costCenterCode: string
  name: string
  kind: CostCenterKind
  parent?: string | number | null
  reportableSegment: boolean
  status: string
  manager?: string
}

export interface CostCentersPanelProps {
  costCenters: CostCentersPanelCenter[]
  asOfDate: string
}

const KIND_LABELS: Record<CostCenterKind, string> = {
  region: 'Regions',
  country: 'Countries',
  business_unit: 'Business units',
  department: 'Departments',
  team: 'Teams',
  project: 'Projects',
  cost_pool: 'Cost pools',
  profit_center: 'Profit centers',
}

const CostCentersPanel: React.FC<CostCentersPanelProps> = ({ costCenters, asOfDate }) => {
  const active = costCenters.filter((c) => c.status === 'active')
  const reportable = active.filter((c) => c.reportableSegment)

  const byKind = active.reduce<Record<string, number>>((acc, c) => {
    acc[c.kind] = (acc[c.kind] ?? 0) + 1
    return acc
  }, {})

  // Compute hierarchy depth — distance from root for each node.
  const depthOf = (id: string | number, visited = new Set<string | number>()): number => {
    if (visited.has(id)) return 0
    visited.add(id)
    const c = active.find((x) => x.id === id)
    if (!c || !c.parent) return 1
    return 1 + depthOf(c.parent, visited)
  }
  const maxDepth = active.reduce((m, c) => Math.max(m, depthOf(c.id)), 0)

  return (
    <section
      aria-labelledby="cost-centers-panel-heading"
      style={{
        border: '1px solid var(--theme-elevation-100)',
        borderRadius: 8,
        padding: 16,
        background: 'var(--theme-elevation-0)',
      }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 id="cost-centers-panel-heading" style={{ margin: 0, fontSize: 18 }}>
          Cost centers — IFRS 8 / ASC 280
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
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Active centers</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{active.length}</dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>Hierarchy depth</dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{maxDepth}</dd>
        </div>
        <div>
          <dt style={{ fontSize: 12, color: 'var(--theme-elevation-400)' }}>
            Reportable segments
          </dt>
          <dd style={{ margin: 0, fontSize: 24, fontWeight: 600 }}>{reportable.length}</dd>
          <small style={{ color: 'var(--theme-elevation-400)' }}>
            IFRS 8 §13 — 10% threshold
          </small>
        </div>
      </dl>

      {Object.keys(byKind).length > 0 && (
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
          {(Object.keys(byKind) as CostCenterKind[]).map((k) => (
            <li
              key={k}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '6px 10px',
                background: 'var(--theme-elevation-50)',
                borderRadius: 6,
                fontSize: 13,
              }}
            >
              <span>{KIND_LABELS[k] ?? k}</span>
              <strong>{byKind[k]}</strong>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default CostCentersPanel
