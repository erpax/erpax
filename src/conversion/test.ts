import { describe, it, expect } from 'vitest'
import { convert, isConversion, invert, permutation } from './index'

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
