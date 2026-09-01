import { describe, it, expect } from 'vitest'
import { schemaCoverage, standardsUiWaves, standardsIndex, lookupStandard } from './index'

describe('standards/projection — the catalogue seen three ways', () => {
  it('coverage names every gap — a total that hides its uncovered ids is not refutable', () => {
    const c = schemaCoverage()
    expect(c.total).toBeGreaterThan(0)
    expect(c.covered + c.uncovered.length).toBe(c.total)
    expect(c.allCovered).toBe(c.uncovered.length === 0)
    expect(c.root.length).toBeGreaterThan(0)
  })

  it('is memoized on the catalogue root — the same question folds once', () => {
    const a = schemaCoverage()
    const b = schemaCoverage()
    expect(b).toBe(a)
    expect(standardsUiWaves()).toBe(standardsUiWaves())
    expect(standardsIndex()).toBe(standardsIndex())
  })

  it('waves are ordered biggest-impact-first andeach wave seals its own content', () => {
    const waves = standardsUiWaves()
    expect(waves.length).toBeGreaterThan(0)
    for (let i = 1; i < waves.length; i++) {
      expect(waves[i - 1].count).toBeGreaterThanOrEqual(waves[i].count)
    }
    for (const w of waves) {
      expect(w.standards.length).toBe(w.count)
      expect(w.adminGroup).toBe(`compliance/${w.schema}`)
      expect(w.seal.length).toBeGreaterThan(0)
    }
  })

  it('lookup answers by address and REFUSES an id the catalogue does not hold', () => {
    const c = schemaCoverage()
    const known = standardsUiWaves()[0]?.standards[0]
    expect(known).toBeTruthy()
    expect(lookupStandard(known as string)).toBeTruthy()
    expect(lookupStandard('NOT-A-STANDARD-' + c.total)).toBeFalsy()
  })
})
