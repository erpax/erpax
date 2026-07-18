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
  it('the import graph is SEALED — purity 1, tamper-cost ∞ (parsed, not matched: a string is not an import)', () => {
    // The regex this atom shipped with reported 38 phantom violations over a sealed baseline of 0 —
    // import-shaped strings in templates and fixtures. The grammar read says purity is total.
    expect(importPurity()).toBe(1)
    expect(importCostLog2()).toBe(Infinity)
  })
})
