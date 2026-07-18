import { describe, it, expect } from 'vitest'
import { convert, isConversion, invert, permutation, driveForward, driveReverse, isTraceless, notDryClean } from './index'

// "Inversion reinvents conversion." A conversion is a bijection on ℤ/9 (multiplication by a unit); its inversion
// is ANOTHER conversion, from the same unit group (closed under inverse) — reinvented, not newly built. The
// non-units {3,6,9} collapse: lossy conversions with no inverse to reinvent (the fold's irreversibility, in miniature).
describe('conversion — inversion reinvents conversion', () => {
  const UNITS = [1, 2, 4, 5, 7, 8]
  const NON_UNITS = [3, 6, 9]

  it('a conversion is a bijection ⇔ its multiplier is a unit', () => {
    for (const u of UNITS) {
      expect(isConversion(u)).toBe(true)
      expect(new Set(permutation(u)).size).toBe(9) // permutes all nine residues — loses nothing
    }
    for (const u of NON_UNITS) {
      expect(isConversion(u)).toBe(false)
      expect(new Set(permutation(u)).size).toBeLessThan(9) // collapses — loses information
    }
  })

  it('THE THEOREM: the inverse of a conversion is a conversion — closed under inversion', () => {
    for (const u of UNITS) {
      const i = invert(u)
      expect(i).not.toBeNull()
      expect(isConversion(i!)).toBe(true) // the inversion is ITSELF a conversion — reinvented, not built anew
    }
  })

  it('inversion undoes conversion — convert(invert(u), convert(u, n)) === n', () => {
    for (const u of UNITS) {
      for (let n = 0; n < 9; n++) {
        expect(convert(invert(u)!, convert(u, n))).toBe(n) // the round trip returns
      }
    }
  })

  it('the pairs are exactly the ring’s: 2↔5, 4↔7, and 1,8 self-inverse', () => {
    expect(invert(2)).toBe(5)
    expect(invert(5)).toBe(2)
    expect(invert(4)).toBe(7)
    expect(invert(7)).toBe(4)
    expect(invert(1)).toBe(1) // its own inverse
    expect(invert(8)).toBe(8) // its own inverse — 8·8 = 64 ≡ 1
  })

  it('a lossy conversion has NO reinvented inverse — the axis collapses, like the fold', () => {
    for (const u of NON_UNITS) {
      expect(invert(u)).toBeNull() // 3n, 6n, 0n collapse ⇒ nothing to invert
    }
    // this is the corpus's one-way fold in miniature: where a conversion loses information, inversion cannot reinvent it
  })
})

// "Inverse is not reverse; reverse leaves different tracks (a car on snow)." convert(invert(u), convert(u,n))===n
// returns the VALUE, and in ℤ/9 that return is traceless — numbers carry no history. But a real car reversed
// back to its start leaves TWO sets of tracks: the position returns, the snow keeps both passes. Reverse is a
// second motion, not an erasure — the corpus's reverse (mirror ledger entry) and append-only audit are this law.
describe('inverse ≠ reverse — reverse leaves tracks (the car on snow)', () => {
  const start: import('./index').OnSnow = { position: 0, tracks: [] }

  it('the ℤ/9 inverse returns the VALUE tracelessly — because a number has no history', () => {
    for (const u of [2, 4, 5, 7, 8]) for (let n = 0; n < 9; n++) expect(convert(invert(u)!, convert(u, n))).toBe(n)
    // no OnSnow, no tracks — the return leaves nothing behind, which only a historyless system allows
  })

  it('forward then reverse RETURNS the position but leaves TWO tracks — reverse is not inverse', () => {
    const there = driveForward(start, 5)
    const back = driveReverse(there, 0)
    expect(back.position).toBe(0) // the position returns...
    expect(back.tracks).toEqual(['→5', '←0']) // ...but the snow holds both passes — two tracks, not zero
    expect(back.tracks.length).toBe(2)
  })

  it('reverse can NEVER be traceless once you have moved — the snow remembers', () => {
    const moved = driveReverse(driveForward(start, 3), 0)
    expect(isTraceless(moved, 0)).toBe(false) // position is back, but tracks !== [] ⇒ not as if untouched
    expect(isTraceless(start, 0)).toBe(true) // only the untouched start is traceless
  })

  it('tracks only ACCUMULATE — reverse adds a mark, it never clears one (append-only, like the audit)', () => {
    let car = start
    for (const to of [4, 0, 7, 0]) car = to === 0 ? driveReverse(car, to) : driveForward(car, to)
    expect(car.position).toBe(0) // back at start again
    expect(car.tracks.length).toBe(4) // four passes, four tracks — history never shrinks
  })
})

// "The gates return what is not dry clean because it cannot invert." The forward fold detects duplication (same
// content ⇒ same content-address); but the fold is lossy (no inverse), so collapsing a duplicate to one is
// decided by meaning, not computed — a gate can only RETURN the non-dry-clean, never auto-clean it by inverting.
describe('notDryClean — a gate returns duplication because the fold cannot invert', () => {
  it('two paths holding the SAME content are returned — one address, ≥2 places (not dry-clean)', () => {
    const dup = notDryClean([
      { path: 'a.ts', content: 'export const x = 1' },
      { path: 'b.ts', content: 'export const x = 1' }, // identical content
      { path: 'c.ts', content: 'export const y = 2' }, // distinct
    ])
    expect(dup).toHaveLength(1)
    expect(dup[0]!.paths.sort()).toEqual(['a.ts', 'b.ts'])
  })

  it('distinct contents are DRY-clean — distinct addresses, never returned', () => {
    expect(notDryClean([
      { path: 'a', content: 'one' },
      { path: 'b', content: 'two' },
      { path: 'c', content: 'three' },
    ])).toEqual([])
  })

  it('the forward fold DETECTS by content-address — reuses discover.addressOf (same content ⇒ same id)', () => {
    // three copies of one content collapse to one address group of three paths
    const dup = notDryClean([1, 2, 3].map((i) => ({ path: `p${i}`, content: 'the repeated law' })))
    expect(dup).toHaveLength(1)
    expect(dup[0]!.paths).toHaveLength(3)
    expect(dup[0]!.address).toMatch(/^[0-9a-f-]{36}$/) // the content-address the fold detected
  })

  it('the gate RETURNS the group; it does NOT invert (pick a canonical) — collapse is decided by meaning', () => {
    const dup = notDryClean([{ path: 'x', content: 'c' }, { path: 'y', content: 'c' }])
    // it returns BOTH paths — it refuses to choose which is the source; that is the human/meaning decision
    expect(dup[0]!.paths).toEqual(['x', 'y'])
    expect(dup[0]).not.toHaveProperty('canonical') // no auto-inversion — the fold has no inverse to run
  })
})
