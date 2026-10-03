import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { digitalRootOfUuid } from '@/digit'
import {
  nibbleSum32,
  hexitValue,
  benchmarkCarriers,
  carrierBreakEven,
  packingLosesAtOne,
  digitalRootPacked,
  hexCharsAreFastest,
  hexitPackedIsFastest,
  hexitsPackExactly,
  sampleHex,
  toBigint,
  toBytes,
  toU32x4,
} from '@/quantum/hexbit'

describe('quantum/hexbit — how a 128-bit address is represented decides what the fold costs', () => {
  it('32 hexits × 4 bits is exactly 128 bits, with nothing left over', () => {
    expect(hexitsPackExactly()).toBe(true)
    expect(sampleHex(1)).toHaveLength(32)
  })

  it('the sample is deterministic — a benchmark seeded by a clock cannot be rerun', () => {
    expect(sampleHex(7)).toBe(sampleHex(7))
    expect(sampleHex(7)).not.toBe(sampleHex(8))
    expect(sampleHex(3)).toMatch(/^[0-9a-f]{32}$/)
  })

  it('every carrier holds the SAME 128 bits — otherwise the comparison is between two problems', () => {
    for (const seed of [0, 1, 42, 999]) {
      const hex = sampleHex(seed)
      const big = toBigint(hex)
      const bytes = toBytes(hex)
      const u32 = toU32x4(hex)
      expect(big.toString(16).padStart(32, '0')).toBe(hex)
      expect([...bytes].map((b) => b.toString(16).padStart(2, '0')).join('')).toBe(hex)
      expect([...u32].map((w) => w.toString(16).padStart(8, '0')).join('')).toBe(hex)
      expect(bytes).toHaveLength(16)
      expect(u32).toHaveLength(4)
    }
  })

  it('ranks all four carriers and reports a relative of 1 for the winner', () => {
    const rs = benchmarkCarriers(2_000, 3)
    expect(rs).toHaveLength(4)
    expect(new Set(rs.map((r) => r.carrier)).size).toBe(4)
    expect(rs[0]!.relative).toBe(1)
    // sorted fastest-first, and each figure agrees with its own reciprocal
    for (let i = 1; i < rs.length; i++) expect(rs[i]!.nsPerOp).toBeGreaterThanOrEqual(rs[i - 1]!.nsPerOp)
    for (const r of rs) expect(r.opsPerSecond).toBeGreaterThan(0)
  })

  // The claim is asserted structurally, never by pinning a timing: a threshold in a test would
  // fail on a loaded machine and prove nothing about the code.
  // This test asserted `u32x4` is rank 1 and FLAKED — u32x4 and bytes sit within 1.4× of each
  // other, so a strict winner is a timing threshold wearing a structural claim, which is the
  // exact trap this atom's own SKILL warns about. What is structural is the SEPARATION: chars
  // do 32 parseInt calls per op against four ANDs, measured at 126–183×. Assert that.
  it('hexbits PACKED beat hexbits as CHARACTERS by orders of scale', () => {
    const rs = benchmarkCarriers(4_000, 3)
    const chars = rs.find((r) => r.carrier === 'hex-string')!
    const packed = rs.find((r) => r.carrier === 'u32x4')!
    expect(chars.nsPerOp).toBeGreaterThan(packed.nsPerOp * 3)
    expect(hexCharsAreFastest(rs)).toBe(false)
    expect(rs[rs.length - 1]!.carrier).toBe('hex-string') // slowest, every time
  })

  it('the two BIT carriers both beat both non-bit carriers — the ranking that is not flaky', () => {
    const rs = benchmarkCarriers(4_000, 3)
    const rank = (c: string): number => rs.findIndex((r) => r.carrier === c)
    expect(rank('u32x4')).toBeLessThan(rank('hex-string'))
    expect(rank('bytes')).toBeLessThan(rank('hex-string'))
    expect(rank('bigint')).toBeLessThan(rank('hex-string'))
  })
})

describe('hexbit — the packed carrier, and what it actually buys', () => {
  it('agrees with the string form on every sample: a faster wrong answer is not an advantage', () => {
    let disagreements = 0
    for (let i = 0; i < 5_000; i++) {
      const h = sampleHex(i)
      if (digitalRootOfUuid(h) !== digitalRootPacked(toU32x4(h))) disagreements++
    }
    expect(disagreements).toBe(0)
  })

  it('agrees across the hyphenated and bare spellings of the same uuid', () => {
    for (let i = 0; i < 200; i++) {
      const h = sampleHex(i)
      const dashed = `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
      expect(digitalRootOfUuid(dashed)).toBe(digitalRootOfUuid(h))
    }
  })

  // The finding, stated so it can fail: packing is NOT free, so a one-shot sum is faster off the
  // string. Asserted as a DIRECTION at k=1 rather than by searching for the crossing point — the
  // crossing point moved under parallel load and made this suite flaky once already, which is the
  // same trap the carrier ranking above is worded to avoid. The measured k lives in the CLI face.
  it('does not pay for a single operation — the carrier advantage is amortised, not intrinsic', () => {
    expect(packingLosesAtOne(4_000)).toBe(true)
  })
})

describe('hexbit — the cross formulas: the hexit sum by one multiply, the hex char by one expression', () => {
  // the two loops the crosses replaced, kept here as the REFERENCE the crosses must agree with
  const nibbleLoop = (w: Uint32Array): number => {
    let n = 0
    for (let i = 0; i < 4; i++) {
      let v = w[i]!
      for (let k = 0; k < 8; k++) {
        n += v & 0xf
        v >>>= 4
      }
    }
    return n === 0 ? 0 : ((n - 1) % 9) + 1
  }
  const branched = (c: number): number => (c >= 48 && c <= 57 ? c - 48 : c >= 97 && c <= 102 ? c - 87 : c >= 65 && c <= 70 ? c - 55 : 0)
  const samples = Array.from({ length: 20_000 }, (_, i) => sampleHex(i)).concat(['0'.repeat(32), 'f'.repeat(32), 'ABCDEF0123456789abcdef0123456789'])

  it('agrees with the nibble loop and the three-branch value on every sample, both alphabets, and the two edges', () => {
    for (const h of samples) {
      expect(digitalRootPacked(toU32x4(h))).toBe(nibbleLoop(toU32x4(h)))
      for (const ch of h) expect(hexitValue(ch.charCodeAt(0))).toBe(branched(ch.charCodeAt(0)))
    }
    expect(nibbleSum32(0xffffffff)).toBe(120) // the bound the multiply rests on: four bytes of 30
    expect(nibbleSum32(0)).toBe(0)
  })

  it('the cross is faster than the loop it replaced — the ranking, not the timing', () => {
    const packed = samples.map(toU32x4)
    const timeMin = (f: () => void): number => {
      f()
      let best = Number.POSITIVE_INFINITY
      for (let r = 0; r < 5; r++) {
        const t0 = process.hrtime.bigint()
        f()
        const dt = Number(process.hrtime.bigint() - t0)
        if (dt < best) best = dt
      }
      return best
    }
    let sink = 0
    const cross = timeMin(() => { for (const w of packed) sink += digitalRootPacked(w) })
    const loop = timeMin(() => { for (const w of packed) sink += nibbleLoop(w) })
    expect(sink).toBeGreaterThan(0)
    expect(cross).toBeLessThan(loop)
  })

  it('the Lean twin decides the two bounds and the character cross, without axioms', () => {
    const lean = readFileSync(join(process.cwd(), 'src/verify/lean/Hexbit.lean'), 'utf8')
    for (const t of ['nibble_pair_fits', 'four_bytes_fit', 'cross_is_value']) expect(lean).toContain(`theorem ${t}`)
    expect(lean).toContain('def hexCross (c : Nat) : Nat := (c % 16) + 9 * ((c / 64) % 2)')
    expect(lean).not.toMatch(/\bsorry\b/)
  })
})
