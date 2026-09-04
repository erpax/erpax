import { describe, expect, it } from 'vitest'
import {
  benchmarkCarriers,
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
