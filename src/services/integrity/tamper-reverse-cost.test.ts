/**
 * Tamper-Reversibility-Cost tests — Conservation Law 55.
 *
 * Slice PPPPPPPPP-cont (2026-05-11). Pins the formal claim that
 * tamper cost grows multiplicatively with chain depth × stream
 * count × dimension count × signature security.
 *
 *   1. Genesis-depth-1 leaf with Ed25519 alone meets eIDAS QES.
 *   2. Cost grows linearly in `leafDepth` (cascade re-sealing).
 *   3. Cost grows logarithmically in `streamCount` and
 *      `dimensionCount` (parallel search budget).
 *   4. Regulatory threshold predicates correctly classify common
 *      compliance levels.
 *
 * @audit Conservation Law 55 tamper-reversibility-cost
 */
import { describe, it, expect } from 'vitest'
import {
  computeTamperReverseCost,
  meetsThreshold,
} from './tamper-reverse-cost'

describe('computeTamperReverseCost', () => {
  it('Ed25519 at depth 1 already exceeds eIDAS QES (112 bits)', () => {
    const cost = computeTamperReverseCost({
      leafDepth: 1, streamCount: 1, dimensionCount: 1,
    })
    expect(cost.totalBits).toBe(128)            // 128 × 1 + 0 + 0
    expect(cost.meetsThreshold).toBe(true)
    expect(meetsThreshold(cost, 'eidas-qes')).toBe(true)
  })

  it('cost grows linearly in leafDepth (cascade re-sealing)', () => {
    const d1 = computeTamperReverseCost({ leafDepth: 1, streamCount: 1, dimensionCount: 1 })
    const d10 = computeTamperReverseCost({ leafDepth: 10, streamCount: 1, dimensionCount: 1 })
    const d100 = computeTamperReverseCost({ leafDepth: 100, streamCount: 1, dimensionCount: 1 })
    expect(d10.totalBits).toBe(d1.totalBits * 10)
    expect(d100.totalBits).toBe(d1.totalBits * 100)
  })

  it('cost grows logarithmically in streamCount', () => {
    const s1 = computeTamperReverseCost({ leafDepth: 1, streamCount: 1, dimensionCount: 1 })
    const s10 = computeTamperReverseCost({ leafDepth: 1, streamCount: 10, dimensionCount: 1 })
    // log2(10) ≈ 3.32 → rounded to nearest int: +3
    expect(s10.totalBits - s1.totalBits).toBeGreaterThanOrEqual(3)
    expect(s10.totalBits - s1.totalBits).toBeLessThanOrEqual(4)
  })

  it('cost grows logarithmically in dimensionCount', () => {
    const d1 = computeTamperReverseCost({ leafDepth: 1, streamCount: 1, dimensionCount: 1 })
    // 10 dimensions per Slice LLLLLLLL
    const d10 = computeTamperReverseCost({ leafDepth: 1, streamCount: 1, dimensionCount: 10 })
    expect(d10.totalBits - d1.totalBits).toBeGreaterThanOrEqual(3)
  })

  it('production-typical leaf far exceeds every named threshold', () => {
    // Tenant 6 months in: depth=10000 leaves, 20 streams, 10 dims, Ed25519.
    const cost = computeTamperReverseCost({
      leafDepth: 10000, streamCount: 20, dimensionCount: 10,
    })
    expect(meetsThreshold(cost, 'gdpr-art-32')).toBe(true)
    expect(meetsThreshold(cost, 'eidas-qes')).toBe(true)
    expect(meetsThreshold(cost, 'pci-dss-§3.6')).toBe(true)
    expect(meetsThreshold(cost, 'nist-category-5')).toBe(true)
    expect(meetsThreshold(cost, 'post-quantum')).toBe(true)
  })

  it('rejects depth < 1 (genesis has nothing to tamper)', () => {
    expect(() => computeTamperReverseCost({
      leafDepth: 0, streamCount: 1, dimensionCount: 1,
    })).toThrow(/leafDepth must be ≥ 1/)
  })

  it('weak signature (RSA-PSS 80-bit hypothetical) below eIDAS QES at depth 1', () => {
    const weak = computeTamperReverseCost({
      leafDepth: 1, streamCount: 1, dimensionCount: 1,
      signatureBitsPerSeal: 80, thresholdBits: 112,
    })
    expect(weak.totalBits).toBe(80)
    expect(weak.meetsThreshold).toBe(false)
    expect(meetsThreshold(weak, 'eidas-qes')).toBe(false)
    expect(meetsThreshold(weak, 'gdpr-art-32')).toBe(true)   // still meets GDPR
  })
})
