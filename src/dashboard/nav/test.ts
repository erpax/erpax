/**
 * dashboard/nav — REGRESSION GATE for the 7×6 DOUBLE-TORUS geometry.
 *
 * The nav is the corpus navigation laid on a toroidal surface: SEVEN sections
 * (rows) × SIX sub-views (columns) = 42 cells, traversed "left→right then fold
 * and continue", BOTH axes wrapping (no edge). This gate pins three load-bearing
 * properties — and pins them to their SOURCE so a refactor that hardcodes the
 * order (or breaks the wrap) fails here:
 *   1. the grid is exactly 7×6 = 42 cells (one closed serpentine ring, no gaps);
 *   2. the traversal order DERIVES from `@/horo` (the columns ARE the doubling
 *      helix `[1,2,4,8,7,5]`, the rows ARE `HORO_DIGITS` — not a hand-kept list);
 *   3. it WRAPS on BOTH axes (stepping right off the last column / down off the
 *      last row folds back) — the double-torus is total.
 *
 * @see ./index.ts        (navGrid / navCell / navStep / navNext / navInvariant)
 * @see ../../horo/index.ts (HORO_DIGITS / HORO_MEASURE — the ring this nav projects)
 */
import { describe, it, expect } from 'vitest'

import { HORO_DIGITS, HORO_MEASURE } from '@/horo'
import {
  NAV_ROWS,
  NAV_COLS,
  NAV_COLS_DIGITS,
  navGrid,
  navCell,
  navStep,
  navNext,
  toroidalWalk,
  navInvariant,
  wrapIndex,
} from '@/dashboard/nav'

describe('the 7×6 double-torus is exactly 42 cells (one closed ring, no gaps/dupes)', () => {
  it('the surface is 7 rows × 6 columns', () => {
    expect(NAV_ROWS).toBe(7)
    expect(NAV_COLS).toBe(6)
  })

  it('navGrid is a 7×6 matrix → 42 cells', () => {
    const grid = navGrid()
    expect(grid).toHaveLength(7)
    expect(grid.every((row) => row.length === 6)).toBe(true)
    expect(grid.flat()).toHaveLength(42)
  })

  it('the serpentine walk is a permutation of 0..41 (one closed ring, no gaps/dupes)', () => {
    const walk = toroidalWalk()
    expect(walk).toHaveLength(42)
    const indices = walk.map((c) => c.walkIndex).sort((a, b) => a - b)
    expect(indices).toEqual(Array.from({ length: 42 }, (_, i) => i))
    // navInvariant agrees the geometry is harmonic by construction.
    expect(navInvariant().ok).toBe(true)
    expect(navInvariant().cells).toBe(42)
    expect(navInvariant().walkIsPermutation).toBe(true)
  })
})

describe('the traversal order DERIVES from @/horo (not a hardcoded list)', () => {
  it('the SEVEN rows ARE the full HORO_DIGITS ring, in measure order', () => {
    // The model exposes one row per horo digit; reading down the rows IS the ring.
    expect(NAV_ROWS).toBe(HORO_DIGITS.length)
    const rowDigits = navGrid().map((row) => row[0].rowDigit)
    expect(rowDigits).toEqual([...HORO_DIGITS])
  })

  it('the SIX columns ARE the doubling helix [1,2,4,8,7,5] — HORO_DIGITS minus the unity close (9)', () => {
    // This is the multiplicative 6-cycle of (ℤ/9ℤ)*; if the columns were a
    // hand-kept list this would diverge from HORO_DIGITS.filter(d => d !== 9).
    expect([...NAV_COLS_DIGITS]).toEqual([1, 2, 4, 8, 7, 5])
    expect([...NAV_COLS_DIGITS]).toEqual(HORO_DIGITS.filter((d) => d !== 9))
    expect(NAV_COLS_DIGITS.includes(9 as never)).toBe(false)
    // And the grid's columns project that exact helix on every row.
    const colDigitsRow0 = navGrid()[0].map((c) => c.colDigit)
    expect(colDigitsRow0).toEqual([1, 2, 4, 8, 7, 5])
  })

  it('each column carries the HORO_MEASURE name aligned to its helix digit (the dance step)', () => {
    // colMeasure is read from HORO_MEASURE at the digit's position in the full ring
    // — derived from horo, never a parallel label list.
    for (const cell of navGrid()[0]) {
      const expected = HORO_MEASURE[HORO_DIGITS.indexOf(cell.colDigit)]
      expect(cell.colMeasure).toBe(expected)
    }
    // sanity: column 0 is 'base' (digit 1), column 3 is 'crest' (digit 8).
    expect(navGrid()[0][0].colMeasure).toBe('base')
    expect(navGrid()[0][3].colMeasure).toBe('crest')
  })
})

describe('the surface WRAPS on BOTH axes (the double-torus has no edge)', () => {
  it('stepping RIGHT off the last column folds to column 0 of the SAME row', () => {
    const last = navCell(2, NAV_COLS - 1)
    const wrapped = navStep(last, 'right')
    expect(wrapped.col).toBe(0)
    expect(wrapped.row).toBe(2)
  })

  it('stepping LEFT off column 0 folds to the last column of the SAME row', () => {
    const first = navCell(2, 0)
    const wrapped = navStep(first, 'left')
    expect(wrapped.col).toBe(NAV_COLS - 1)
    expect(wrapped.row).toBe(2)
  })

  it('stepping DOWN off the last row folds to row 0 of the SAME column', () => {
    const bottom = navCell(NAV_ROWS - 1, 3)
    const wrapped = navStep(bottom, 'down')
    expect(wrapped.row).toBe(0)
    expect(wrapped.col).toBe(3)
  })

  it('stepping UP off row 0 folds to the last row of the SAME column', () => {
    const top = navCell(0, 3)
    const wrapped = navStep(top, 'up')
    expect(wrapped.row).toBe(NAV_ROWS - 1)
    expect(wrapped.col).toBe(3)
  })

  it('navInvariant confirms both axes wrap', () => {
    expect(navInvariant().axesWrap).toBe(true)
  })

  it('the single ⟨next⟩ ring threads all 42 cells and returns to the origin (closed walk)', () => {
    // One button, the whole surface: 42 ⟨next⟩ steps from (0,0) visit 42 DISTINCT
    // cells and land back on (0,0) — the toroidal walk is one closed ring.
    const seen = new Set<string>()
    let cur = navCell(0, 0)
    for (let i = 0; i < NAV_ROWS * NAV_COLS; i++) {
      seen.add(`${cur.row},${cur.col}`)
      cur = navNext(cur)
    }
    expect(seen.size).toBe(42)
    expect(cur.row).toBe(0)
    expect(cur.col).toBe(0)
  })

  it('wrapIndex is modular and negative-safe (the axis has no edge)', () => {
    expect(wrapIndex(6, 6)).toBe(0)
    expect(wrapIndex(-1, 6)).toBe(5)
    expect(wrapIndex(7, 7)).toBe(0)
    expect(wrapIndex(-1, 7)).toBe(6)
  })
})
