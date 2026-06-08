/**
 * quantum/word — 64-bit word architecture interacts with digit on the torus ring.
 *
 * @standard ISO/IEC 25010:2023 §5.5 testability
 */
import { describe, it, expect } from 'vitest'
import {
  interact64,
  architectureMask,
  architectureBond,
  architectureBondStable,
  combineArchitectures,
  architectureFoldPaths,
  recordWordOnPath,
  recordArchitectureFoldOnPath,
  wordAddress,
  architectureBits,
  doubleArchitectureBits,
} from '@/quantum/word'
import { TORUS_BITS, DOUBLE_TORUS_BITS, entangle } from '@/quantum'
import { atomPathUuid } from '@/path'
import { DOUBLING } from '@/rodin'
import { wordDigitDualityHolds } from '@/quantum/digit'

describe('quantum/word — 64-bit word ⊕ digit architecture pair', () => {
  it('architectureBits derives from rodin doubling circuit (2^6 = 64 = TORUS_BITS)', () => {
    expect(DOUBLING.length).toBe(6)
    expect(architectureBits()).toBe(1 << DOUBLING.length)
    expect(architectureBits()).toBe(TORUS_BITS)
    expect(architectureMask()).toBe((1n << 64n) - 1n)
  })

  it('interact64 ANDs within the torus ring', () => {
    expect(interact64(0xffffffffffffffffn, 0x0f0f0f0f0f0f0f0fn)).toBe(0x0f0f0f0f0f0f0f0fn)
    expect(interact64(1n << 64n, 1n)).toBe(0n)
  })

  it('combineArchitectures packs two halves into DOUBLE_TORUS_BITS', () => {
    expect(doubleArchitectureBits()).toBe(DOUBLE_TORUS_BITS)
    expect(DOUBLE_TORUS_BITS).toBe(128)
    const packed = combineArchitectures(0xaaaan, 0x5555n)
    expect(packed).toBe((0xaaaan << 64n) | 0x5555n)
  })

  it('architectureBond is stable under entangle order-independence', () => {
    expect(architectureBondStable()).toBe(true)
    expect(architectureBond()).toBe(entangle(atomPathUuid('word'), atomPathUuid('digit')))
  })

  it('wordAddress is deterministic content-address', () => {
    expect(wordAddress('hello')).toBe(wordAddress('hello'))
  })

  it('architectureFoldPaths includes both quantum children and source atoms', () => {
    const paths = architectureFoldPaths()
    expect(paths).toContain('quantum/word')
    expect(paths).toContain('quantum/digit')
    expect(paths).toContain('word')
    expect(paths).toContain('digit')
  })

  it('recordWordOnPath and recordArchitectureFoldOnPath are content-addressed', () => {
    const a = recordWordOnPath({ t: 1 }, '2020-01-01T00:00:00.000Z', null, 0)
    const b = recordWordOnPath({ t: 1 }, '2020-01-01T00:00:00.000Z', null, 0)
    expect(a.entryUuid).toBe(b.entryUuid)
    const fold = recordArchitectureFoldOnPath({ fold: true }, '2020-01-01T00:00:00.000Z', null, 1)
    expect(fold.entryUuid).toMatch(/^[0-9a-f-]{36}$/i)
  })

  it('word ⊕ digit duality holds on the live matrix (digit half)', () => {
    expect(wordDigitDualityHolds()).toBe(true)
  })
})
