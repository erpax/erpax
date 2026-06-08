import { describe, it, expect } from 'vitest'
import {
  analyzeIndexConcentration,
  concentrationFixSuggestion,
  concentrationViolations,
  CONCENTRATION_LINE_THRESHOLD,
  CONCENTRATION_SCORE_THRESHOLD,
  isConcentrationViolation,
  topConcentrations,
} from '@/rules/concentration'

describe('rules/concentration — analyzeIndexConcentration', () => {
  it('hub re-export barrel scores low', () => {
    const hub = `/** hub — re-exports only */
export { foo } from './foo'
export { bar } from './bar'
export type { Baz } from './baz'
`
    const m = analyzeIndexConcentration(hub, 2)
    expect(m.reExportRatio).toBe(1)
    expect(m.concentrationScore).toBeLessThan(CONCENTRATION_SCORE_THRESHOLD)
    expect(isConcentrationViolation(m)).toBe(false)
  })

  it('monolithic inline logic scores high', () => {
    const lines = Array.from({ length: CONCENTRATION_LINE_THRESHOLD + 50 }, (_, i) =>
      i % 20 === 0 ? `export function fn${i}() { return ${i} }` : `  const x${i} = ${i}`,
    ).join('\n')
    const m = analyzeIndexConcentration(lines, 3)
    expect(m.lineCount).toBeGreaterThanOrEqual(CONCENTRATION_LINE_THRESHOLD)
    expect(isConcentrationViolation(m)).toBe(true)
  })

  it('concentrationFixSuggestion names child atoms and distribute wave', () => {
    const suggestion = concentrationFixSuggestion({
      atomPath: 'accounting',
      metrics: analyzeIndexConcentration('export function x() {}', 2),
      childAtoms: ['coa', 'corpus'],
    })
    expect(suggestion).toContain('accounting/')
    expect(suggestion).toContain('coa')
    expect(suggestion).toContain('navigation/distribute')
  })
})

describe('rules/concentration — live corpus scan', () => {
  it('concentrationViolations returns ranked violations with metrics', () => {
    const v = concentrationViolations()
    expect(Array.isArray(v)).toBe(true)
    for (const row of v.slice(0, 5)) {
      expect(row.law).toBe('logic-concentration')
      expect(row.metrics.concentrationScore).toBeGreaterThan(0)
      expect(row.fixSuggestion).toContain('re-exports only')
    }
    console.log(`logic-concentration violations: ${v.length}`)
  })

  it('topConcentrations returns top 10 by score', () => {
    const top = topConcentrations(undefined, 10)
    expect(top.length).toBe(10)
    expect(top[0]!.metrics.concentrationScore).toBeGreaterThanOrEqual(top[9]!.metrics.concentrationScore)
    console.log(
      'top concentrations:',
      top.map((t) => `${t.atomPath} score=${t.metrics.concentrationScore.toFixed(2)} lines=${t.metrics.lineCount}`).join(' · '),
    )
  })

  it('readme/index.ts ranks among top concentrations', () => {
    const top = topConcentrations(undefined, 10)
    const readme = top.find((t) => t.atomPath === 'readme')
    expect(readme).toBeTruthy()
    expect(readme!.metrics.lineCount).toBeGreaterThan(CONCENTRATION_LINE_THRESHOLD)
  })
})
