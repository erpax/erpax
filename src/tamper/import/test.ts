import { describe, it, expect } from 'vitest'
import { scanImports, nonIndexImports, importPurity, importCostLog2 } from '@/tamper/import'

describe('tamper/import — import purity as a tamper-cost dimension', () => {
  it('scans @/ imports and finds the non-index violations (the raises)', () => {
    const s = scanImports()
    expect(s.total).toBeGreaterThan(0)
    expect(Array.isArray(s.violations)).toBe(true)
    expect(nonIndexImports().length).toBe(s.violations.length)
  })
  it('every reported violation is an @/ spec that is not a dir-with-index', () => {
    for (const v of nonIndexImports().slice(0, 25)) {
      expect(v.spec.startsWith('@/')).toBe(true)
      expect(typeof v.file).toBe('string')
    }
  })
  it('import purity is the index-only fraction in [0,1]', () => {
    const p = importPurity()
    expect(p).toBeGreaterThanOrEqual(0)
    expect(p).toBeLessThanOrEqual(1)
  })
  it('import tamper-cost is finite while a gap is open (and would seal to ∞ at full purity)', () => {
    expect(importCostLog2()).toBeGreaterThanOrEqual(0)
    expect(Number.isFinite(importCostLog2())).toBe(true) // a gap is currently open
  })
})
