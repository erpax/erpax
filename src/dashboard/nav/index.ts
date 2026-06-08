/**
 * dashboard/nav — THE NAVIGATION: a 7×6 DOUBLE-TORUS over the corpus.
 *
 * "Like the horo: left to right then fold and continue." Seven sections (rows) ×
 * six sub-views (columns) = 42 cells, traversed toroidally — along a row
 * left→right, then FOLD/wrap to the next row, BOTH axes wrapping (no edges: the
 * rodin double-torus surface). The seven rows mirror the top-level sections (the
 * seven dashboards); the six columns are each dashboard's sub-views (its widget
 * tiles, cycled to fill the ring). This IS the corpus navigation.
 *
 * The traversal order is the HORO RING, COMPOSED from `@/horo` — never hardcoded:
 *   • the SIX columns are the doubling helix `[1,2,4,8,7,5]` (the multiplicative
 *     6-cycle of (ℤ/9ℤ)*, `HORO_DIGITS` minus the unity close 9) — left→right IS
 *     the dance step order, each column a measure name (`HORO_MEASURE`).
 *   • the SEVEN rows are the full `HORO_DIGITS` `[1,2,4,8,7,5,9]` — seven positions
 *     for seven sections; row 7 (digit 9, unity/close) FOLDS to the next octave's
 *     base (`nextOctave`: 9→1), so the last row's fold returns to the first — the
 *     ring closes, the torus has no top/bottom edge.
 *   • a cell's (row,col) "merge points" — the gateways between rings where the
 *     composed step is 1 or 9 (`isMergePoint`) — are surfaced so the UI can mark
 *     the fold seams (octave boundaries) on the surface.
 *
 * BOTH axes are modular (`% rows`, `% cols`): stepping right off the last column
 * wraps to the first column of the SAME row; stepping down off the last row wraps
 * to the first row — and the serpentine "fold and continue" threads the 42 cells
 * as ONE closed walk (`toroidalWalk`) so a single ⟨next⟩ traverses the whole
 * surface and returns to the origin. This is pure data (no React, no fetch) — the
 * renderer (a server component) lays the cells out and the cross gates which are
 * reachable; the nav itself only computes the toroidal geometry + the horo order.
 *
 * @standard ECMA-262 ECMAScript-2024 baseline
 * @quality ISO-25010 usability navigability bounded-stable-surface
 * @see src/horo/index.ts                 (HORO_DIGITS / HORO_MEASURE / composeSteps / nextOctave / isMergePoint)
 * @see src/dashboard/dashboards.ts       (the seven sections this navigation lays out)
 * @see src/dashboard/spec/index.ts       (the WidgetSpec sub-views that fill the columns)
 */

import {
  HORO_DIGITS,
  HORO_MEASURE,
  composeSteps,
  isMergePoint,
  nextOctave,
  type HoroStep,
} from '@/horo'
import type { DashboardSpec } from '@/dashboard/spec'
import { DASHBOARDS } from '../dashboards'

// The pure RENDER of this model — re-exported so `@/dashboard/nav` is the single
// face (model + component): the renderer imports `Nav` from here, never the deep
// `./Nav` file (the corpus import convention, [[tamper]]/import).
export { default as Nav } from './Nav'
export type { NavProps } from './Nav'

/** The torus has SEVEN rows — one per horo position (one per top-level section). */
export const NAV_ROWS = HORO_DIGITS.length // 7

/**
 * The torus has SIX columns — the doubling helix `[1,2,4,8,7,5]`, i.e. the
 * `HORO_DIGITS` ring with the unity close (9) removed. Six sub-views per section;
 * the 9 is the FOLD between rows (the octave seam), not a column.
 */
export const NAV_COLS_DIGITS: readonly HoroStep[] = HORO_DIGITS.filter((d) => d !== 9)
export const NAV_COLS = NAV_COLS_DIGITS.length // 6

/** One cell on the 7×6 toroidal surface: a section (row) × a sub-view (column). */
export interface NavCell {
  /** Row index 0..6 (the section / dashboard). */
  readonly row: number
  /** Column index 0..5 (the sub-view within the section). */
  readonly col: number
  /** The horo digit of this row (`HORO_DIGITS[row]`). */
  readonly rowDigit: HoroStep
  /** The horo digit of this column (`NAV_COLS_DIGITS[col]`, the doubling helix). */
  readonly colDigit: HoroStep
  /** The measure name of this column (`HORO_MEASURE` aligned to the column digit). */
  readonly colMeasure: string
  /** The section this row maps to (cyclic over the seven dashboards). */
  readonly section: DashboardSpec
  /** The section's sub-view id at this column (cyclic over its widgets), or null if the section has none. */
  readonly subViewId: string | null
  /**
   * Position in the single serpentine "fold and continue" walk (0..41) — the
   * order ⟨next⟩ visits this cell when threading the whole surface as one ring.
   */
  readonly walkIndex: number
  /**
   * True when (rowDigit ∘ colDigit) is a merge point (composed step 1 or 9) — a
   * gateway between rings, i.e. an octave-fold seam to mark on the surface.
   */
  readonly mergePoint: boolean
}

/** Wrap an index onto a modular axis (negative-safe). The torus has no edge. */
export function wrapIndex(i: number, size: number): number {
  return ((i % size) + size) % size
}

const SECTIONS: readonly DashboardSpec[] = DASHBOARDS

/** The section a row maps to (cyclic, in case sections ≠ exactly 7). */
function sectionForRow(row: number): DashboardSpec {
  return SECTIONS[wrapIndex(row, SECTIONS.length)]
}

/** A section's sub-view id at a column (its widgets cycled to fill the 6 columns). */
function subViewForCell(section: DashboardSpec, col: number): string | null {
  const ws = section.widgets
  if (ws.length === 0) return null
  return ws[wrapIndex(col, ws.length)].id
}

/**
 * The serpentine "left→right then fold" walk index for (row, col): even rows run
 * left→right, odd rows run right→left, so the END of one row sits ADJACENT to the
 * start of the next — the fold continues without a jump (boustrophedon, the horo's
 * "fold and continue"). The walk wraps (row 6's tail folds back to row 0's head),
 * making the 42 cells one closed ring on the torus.
 */
export function walkIndexOf(row: number, col: number): number {
  const r = wrapIndex(row, NAV_ROWS)
  const c = wrapIndex(col, NAV_COLS)
  const within = r % 2 === 0 ? c : NAV_COLS - 1 - c
  return r * NAV_COLS + within
}

/** Build the single NavCell at (row, col). Pure; computed from the horo ring. */
export function navCell(row: number, col: number): NavCell {
  const r = wrapIndex(row, NAV_ROWS)
  const c = wrapIndex(col, NAV_COLS)
  const rowDigit = HORO_DIGITS[r]
  const colDigit = NAV_COLS_DIGITS[c]
  const section = sectionForRow(r)
  // Column measure: align to the column digit's position in the full ring.
  const colMeasure = HORO_MEASURE[HORO_DIGITS.indexOf(colDigit)]
  return {
    row: r,
    col: c,
    rowDigit,
    colDigit,
    colMeasure,
    section,
    subViewId: subViewForCell(section, c),
    walkIndex: walkIndexOf(r, c),
    mergePoint: isMergePoint(rowDigit, colDigit),
  }
}

/** The full 7×6 toroidal grid, row-major (each inner array is one section's six sub-views). */
export function navGrid(): readonly (readonly NavCell[])[] {
  const grid: NavCell[][] = []
  for (let row = 0; row < NAV_ROWS; row++) {
    const cells: NavCell[] = []
    for (let col = 0; col < NAV_COLS; col++) cells.push(navCell(row, col))
    grid.push(cells)
  }
  return grid
}

/**
 * The 42 cells in serpentine WALK order — the single closed "left→right then fold
 * and continue" traversal of the whole surface (index 0 = (row0,col0), then along
 * row 0, fold into row 1 right→left, …, then row 6's tail folds back to the origin).
 */
export function toroidalWalk(): readonly NavCell[] {
  const all: NavCell[] = []
  for (let row = 0; row < NAV_ROWS; row++)
    for (let col = 0; col < NAV_COLS; col++) all.push(navCell(row, col))
  return all.slice().sort((a, b) => a.walkIndex - b.walkIndex)
}

/** A toroidal move on the surface — the four directions, both axes wrapping. */
export type NavDirection = 'right' | 'left' | 'down' | 'up'

/**
 * Step from a cell in one of the four directions; BOTH axes wrap (`right` off the
 * last column → column 0 of the same row; `down` off the last row → row 0). No
 * edge: every move lands on a cell — the double-torus surface is total.
 */
export function navStep(cell: Pick<NavCell, 'row' | 'col'>, dir: NavDirection): NavCell {
  switch (dir) {
    case 'right':
      return navCell(cell.row, cell.col + 1)
    case 'left':
      return navCell(cell.row, cell.col - 1)
    case 'down':
      return navCell(cell.row + 1, cell.col)
    case 'up':
      return navCell(cell.row - 1, cell.col)
  }
}

/**
 * ⟨next⟩ along the single serpentine ring — advance one step in the closed
 * "fold and continue" walk (wraps from the last cell back to the origin). This is
 * the one-button traversal that threads all 42 cells and returns to start.
 */
export function navNext(cell: Pick<NavCell, 'row' | 'col'>): NavCell {
  const idx = walkIndexOf(cell.row, cell.col)
  const next = wrapIndex(idx + 1, NAV_ROWS * NAV_COLS)
  // Invert the serpentine index back to (row, col).
  const row = Math.floor(next / NAV_COLS)
  const within = next % NAV_COLS
  const col = row % 2 === 0 ? within : NAV_COLS - 1 - within
  return navCell(row, col)
}

/**
 * The row→row fold map: which section a row's unity-close (digit 9 via
 * `nextOctave`) hands off to. Row 6 (digit 9) folds to the next octave's base
 * (→ row 0); every other row's "close" continues to the next row. The fold seam
 * is where the torus wraps top→bottom — the octave boundary made navigable.
 */
export function rowFold(row: number): number {
  const r = wrapIndex(row, NAV_ROWS)
  // The unity position (digit 9) is the last row; its octave-base (1) is row 0.
  return HORO_DIGITS[r] === 9 ? 0 : wrapIndex(r + 1, NAV_ROWS)
}

/**
 * Surface invariant — the geometry is harmonic by construction. Used by the test
 * layer: exactly 7×6 = 42 cells, the walk is a permutation 0..41 (one closed ring,
 * no gaps/dupes), both axes wrap (no edge), the columns are the doubling helix
 * (no unity), and the fold closes 9→1 (`composeSteps` lands the close on unity).
 */
export interface NavInvariant {
  readonly rows: number
  readonly cols: number
  readonly cells: number
  readonly walkIsPermutation: boolean
  readonly axesWrap: boolean
  readonly columnsAreHelix: boolean
  readonly foldClosesRing: boolean
  readonly ok: boolean
}

export function navInvariant(): NavInvariant {
  const cells = NAV_ROWS * NAV_COLS
  const walk = toroidalWalk()
  const indices = walk.map((c) => c.walkIndex).sort((a, b) => a - b)
  const walkIsPermutation =
    indices.length === cells && indices.every((v, i) => v === i)

  // Both axes wrap: stepping right off the last column returns to col 0; stepping
  // down off the last row returns to row 0 — for an arbitrary witness cell.
  const wRight = navStep({ row: 2, col: NAV_COLS - 1 }, 'right')
  const wDown = navStep({ row: NAV_ROWS - 1, col: 3 }, 'down')
  const axesWrap = wRight.col === 0 && wRight.row === 2 && wDown.row === 0 && wDown.col === 3

  // Columns are the doubling helix (no 9), in dance order.
  const columnsAreHelix =
    NAV_COLS_DIGITS.length === 6 &&
    !NAV_COLS_DIGITS.includes(9 as HoroStep) &&
    NAV_COLS_DIGITS.every((d, i) => d === HORO_DIGITS[i])

  // The fold closes the ring: the unity row (digit 9) composes back to unity
  // (9 ∘ 9 = 9) and its nextOctave is the base (1) = row 0.
  const unityRow = HORO_DIGITS.indexOf(9 as HoroStep)
  const foldClosesRing =
    composeSteps(9, 9) === 9 && nextOctave(9) === 1 && rowFold(unityRow) === 0

  const ok = walkIsPermutation && axesWrap && columnsAreHelix && foldClosesRing
  return {
    rows: NAV_ROWS,
    cols: NAV_COLS,
    cells,
    walkIsPermutation,
    axesWrap,
    columnsAreHelix,
    foldClosesRing,
    ok,
  }
}
