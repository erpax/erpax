/**
 * dashboard/nav/Nav — the RENDER of the 7×6 DOUBLE-TORUS navigation.
 *
 * The pure component face of `./index` (the model): it paints the seven
 * sections (rows) × six sub-views (columns) the model lays on the toroidal
 * surface, in the HORO RING order the model composed from `@/horo` — never a
 * hand-kept menu. "Like the horo: left to right then fold and continue" is made
 * visible: each row runs left→right, the merge-point cells (octave-fold seams,
 * `cell.mergePoint`) carry the fold marker, and the active cell glows.
 *
 * WIDGETS ARE PURE — and so is this nav (the corpus rule, `@/dashboard/spec`):
 * it receives only `{ active }` (a row/col coordinate) and renders the grid the
 * model computes. NO fetch, NO state, NO `'use client'`, NO React import (the
 * `react-jsx` runtime) — a SERVER component the renderer (`@/dashboard`) mounts,
 * the access cross gating which cells are reachable elsewhere. The geometry +
 * the horo order live entirely in `./index`; this file only lays it to pixels.
 *
 * The four toroidal moves (`right`/`left`/`down`/`up`, BOTH axes wrapping) and
 * the single serpentine ⟨next⟩ are computed from the model (`navStep` / `navNext`)
 * for the active cell and surfaced as targets — the no-edge double-torus made
 * navigable: every direction lands on a cell, ⟨next⟩ threads all 42 and returns.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @standard NIST INCITS-359 role-based-access-control (cells gate via the cross upstream)
 * @quality ISO-25010 usability navigability bounded-stable-surface
 * @see src/dashboard/nav/index.ts   (the model: navGrid / navStep / navNext / NavCell / NavDirection)
 * @see src/horo/index.ts            (HORO_DIGITS / HORO_MEASURE — the ring this nav projects)
 * @see src/dashboard/index.tsx      (the server renderer that mounts this nav)
 */

import type React from 'react'

import {
  navGrid,
  navStep,
  navNext,
  wrapIndex,
  NAV_ROWS,
  NAV_COLS,
  type NavCell,
  type NavDirection,
} from './index'

// ─── Props — a pure coordinate, nothing else ─────────────────────────
//
// The nav is told ONLY which cell is active (a row/col on the torus). It computes
// everything else (the grid, the section/measure labels, the fold seams, the
// step targets) from the model. A missing/out-of-range `active` wraps onto the
// surface (the torus has no edge) — the origin (0,0) is the default landing.

export interface NavProps {
  /** The active cell's row (0..6) — wraps onto the torus if out of range. */
  readonly activeRow?: number
  /** The active cell's column (0..5) — wraps onto the torus if out of range. */
  readonly activeCol?: number
  /**
   * Optional callback hook id-builder: given a target cell, produce the href/key
   * the surrounding app routes to (e.g. `?row=&col=`). Pure — defaults to a
   * `row-col` data string so the component stays framework-agnostic.
   */
  readonly hrefFor?: (cell: Pick<NavCell, 'row' | 'col'>) => string
}

/** Default target descriptor — a stable `row-col` string (no router assumed). */
function defaultHref(cell: Pick<NavCell, 'row' | 'col'>): string {
  return `${cell.row}-${cell.col}`
}

// ─── One cell tile — the section/sub-view at (row,col) on the surface ─

interface CellTileProps {
  readonly cell: NavCell
  readonly active: boolean
  readonly href: string
}

const CellTile: React.FC<CellTileProps> = ({ cell, active, href }) => {
  // The fold seam (octave boundary) gets a dashed edge + the ∞ fold glyph; the
  // active cell glows; everything else is a quiet tile. Pure className math.
  const base = 'relative flex flex-col justify-between rounded-md border p-2 text-xs transition-colors'
  const tone = active
    ? 'border-blue-500 bg-blue-50 text-blue-900 shadow-sm'
    : cell.mergePoint
      ? 'border-dashed border-amber-400 bg-amber-50 text-amber-900'
      : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'

  return (
    <a
      href={href}
      data-cell={`${cell.row}-${cell.col}`}
      data-walk={cell.walkIndex}
      aria-current={active ? 'true' : undefined}
      className={`${base} ${tone}`}
    >
      <span className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-gray-400">
          {cell.rowDigit}·{cell.colDigit}
        </span>
        {cell.mergePoint && (
          <span aria-label="octave-fold seam" title="octave-fold seam" className="text-amber-500">
            ∞
          </span>
        )}
      </span>
      <span className="truncate font-medium" title={cell.subViewId ?? '—'}>
        {cell.subViewId ?? '—'}
      </span>
      <span className="truncate text-[10px] text-gray-400">{cell.colMeasure}</span>
    </a>
  )
}

// ─── The directional compass — the four toroidal moves + ⟨next⟩ ──────
//
// Computed from the model for the active cell. BOTH axes wrap, so every button is
// always live (no disabled edge): the double-torus surface is total.

interface CompassProps {
  readonly active: Pick<NavCell, 'row' | 'col'>
  readonly hrefFor: (cell: Pick<NavCell, 'row' | 'col'>) => string
}

const DIRECTIONS: ReadonlyArray<{ dir: NavDirection; glyph: string; label: string }> = [
  { dir: 'up', glyph: '↑', label: 'up' },
  { dir: 'left', glyph: '←', label: 'left' },
  { dir: 'right', glyph: '→', label: 'right' },
  { dir: 'down', glyph: '↓', label: 'down' },
]

const Compass: React.FC<CompassProps> = ({ active, hrefFor }) => {
  const next = navNext(active)
  return (
    <nav aria-label="toroidal navigation" className="flex flex-wrap items-center gap-2">
      {DIRECTIONS.map(({ dir, glyph, label }) => {
        const target = navStep(active, dir)
        return (
          <a
            key={dir}
            href={hrefFor(target)}
            aria-label={`${label} (wraps on the torus)`}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            {glyph}
          </a>
        )
      })}
      <a
        href={hrefFor(next)}
        aria-label="next (serpentine fold-and-continue)"
        className="inline-flex h-8 items-center justify-center gap-1 rounded-md border border-blue-300 bg-blue-50 px-3 text-blue-800 hover:bg-blue-100"
      >
        <span aria-hidden>⟨next⟩</span>
      </a>
    </nav>
  )
}

// ─── The double-torus grid — seven section rows × six sub-view columns ─

/**
 * Nav — the pure 7×6 double-torus. Renders the model's `navGrid()`: one row per
 * section (its title leads the row), one column per horo-measure sub-view, the
 * merge-point cells marked as fold seams, the active cell glowing, and the
 * toroidal compass (the four wrapping moves + the serpentine ⟨next⟩). No fetch,
 * no state — the renderer mounts it, the cross gates reachability upstream.
 */
const Nav: React.FC<NavProps> = ({ activeRow = 0, activeCol = 0, hrefFor = defaultHref }) => {
  const grid = navGrid()
  const aRow = wrapIndex(activeRow, NAV_ROWS)
  const aCol = wrapIndex(activeCol, NAV_COLS)

  // Column headers = the horo measures of the first row's cells (the doubling
  // helix order); they are identical down every column (column digit is fixed).
  const columnMeasures = grid[0].map((c) => c.colMeasure)

  return (
    <div className="flex flex-col gap-4" data-nav="double-torus" data-rows={NAV_ROWS} data-cols={NAV_COLS}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Navigation</h2>
        <Compass active={{ row: aRow, col: aCol }} hrefFor={hrefFor} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate" style={{ borderSpacing: '0.375rem' }}>
          <thead>
            <tr>
              <th className="text-left text-xs font-medium text-gray-500">section ╲ measure</th>
              {columnMeasures.map((m, c) => (
                <th key={c} className="text-left text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((rowCells, r) => (
              <tr key={r}>
                <th
                  scope="row"
                  className={`max-w-[10rem] truncate text-left text-xs font-medium ${
                    r === aRow ? 'text-blue-800' : 'text-gray-700'
                  }`}
                  title={rowCells[0].section.title}
                >
                  {rowCells[0].section.title}
                </th>
                {rowCells.map((cell) => (
                  <td key={cell.col} className="align-top">
                    <CellTile
                      cell={cell}
                      active={cell.row === aRow && cell.col === aCol}
                      href={hrefFor(cell)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-gray-400">
        7×6 double-torus · rows = horo positions, columns = doubling helix · ∞ marks an octave-fold
        seam · both axes wrap (no edge).
      </p>
    </div>
  )
}

export default Nav
