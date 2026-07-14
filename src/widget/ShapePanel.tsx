/**
 * ShapePanel — the ONE universal collection projection (rosetta fold: less files
 * do more). Renders any collection's read surface from a computed view-model:
 * row count, status pivot, latest rows. 210 collections × this one component =
 * 100% dashboard coverage; the per-collection WidgetSpec is COMPUTED from the
 * collection's shape signature by `shapeWidgetSpec` (src/dashboard/dashboards.ts),
 * never hand-written.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard ISO/IEC 25010:2023 §5.4 reusability — one projection for all shapes
 * @see src/dashboard/dashboards.ts (shapeWidgetSpec — the computed binding)
 * @see src/factory/collection-factory.ts (collectionSignature — the shape basis)
 */

import React from 'react'

export interface ShapePanelRow {
  readonly title: string
  readonly status?: string
  readonly updatedAt?: string
}

export interface ShapePanelVM {
  readonly slug: string
  readonly label: string
  readonly signature: ReadonlyArray<string>
  readonly count: number
  readonly statusPivot: ReadonlyArray<{ readonly value: string; readonly count: number }>
  readonly latest: ReadonlyArray<ShapePanelRow>
  /** The CSS-variable bus ([[signal]] uuidSignalCssVars) — identity IS appearance;
   * JS writes once per event, the cascade animates (no re-render loop). */
  readonly cssVars?: Readonly<Record<string, string>>
}

const box: React.CSSProperties = {
  border: '1px solid var(--theme-elevation-150)',
  borderLeft: '3px solid hsl(var(--erpax-hue, 210) 70% 50%)',
  borderRadius: 6,
  padding: '0.75rem 1rem',
  background: 'var(--theme-elevation-50)',
  transition: 'border-color var(--erpax-spin-ms, 900ms) ease',
}

export const ShapePanel: React.FC<{ data: ShapePanelVM | null }> = ({ data }) => {
  if (!data) return <div style={box}>—</div>
  return (
    <div style={{ ...box, ...(data.cssVars as React.CSSProperties) }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <strong>{data.label}</strong>
        <span style={{ opacity: 0.7 }}>{data.count}</span>
      </div>
      <div style={{ fontSize: '0.75rem', opacity: 0.6, margin: '0.15rem 0 0.5rem' }}>
        {data.signature.length > 0 ? data.signature.join(' · ') : 'plain'}
      </div>
      {data.statusPivot.length > 0 && (
        <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {data.statusPivot.map((s) => (
            <span key={s.value} style={{ fontSize: '0.8rem' }}>
              {s.value} <strong>{s.count}</strong>
            </span>
          ))}
        </div>
      )}
      <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.85rem' }}>
        {data.latest.map((r, i) => (
          <li key={i}>
            {r.title}
            {r.status ? <span style={{ opacity: 0.6 }}> · {r.status}</span> : null}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShapePanel
