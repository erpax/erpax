import { describe, it, expect } from 'vitest'
import { attributableExports, concentrationManifest } from './concentration'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  analyzeIndexConcentration,
  childAtomDirs,
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

  // Parsed truth (AST, not regex): readme/index.ts is a clean BARREL — its big `export {…} from './compute'`
  // block is RE-EXPORTS, the hub pattern the concentration law WANTS, not inlined matter. The former regex
  // mis-counted those multi-line re-exports as inline exports and falsely ranked readme a top concentration;
  // moduleShape classifies them correctly, so readme is (rightly) not concentrated. A fast targeted check
  // (one file), not a whole-corpus scan — the bounded-witness law.
  it('readme/index.ts is a clean barrel — re-exports from ./compute, NOT a concentration (the parser corrects the regex)', () => {
    const c = readFileSync(join(process.cwd(), 'src/readme/index.ts'), 'utf8')
    const m = analyzeIndexConcentration(c, childAtomDirs('readme').length)
    expect(m.inlineExportCount).toBe(0) // no matter inlined — it re-exports
    expect(m.reExportCount).toBeGreaterThan(0) // it IS a barrel
    expect(m.concentrationScore).toBeLessThan(CONCENTRATION_SCORE_THRESHOLD)
    expect(isConcentrationViolation(m)).toBe(false) // a well-folded hub is not concentrated
  })
})

describe('rules/concentration — the manifest, not a suggestion', () => {
  it('attributes an inline export to the ONE child whose symbols it uses', () => {
    // cloudflare/index.ts holds kvGet/kvPut/r2Put, and each borrows MediatorContext,
    // auditBindingCall and enforceAuthorized from cloudflare/binding — whose own SKILL
    // says every binding access MUST flow through those wrappers. The wrappers live
    // outside the atom that defines their machinery, and the dependency says so.
    const moves = attributableExports('cloudflare')
    expect(moves.length).toBeGreaterThan(0)
    const kv = moves.find((m) => m.name === 'kvGet')
    expect(kv?.child).toBe('binding')
    expect(kv?.via).toContain('auditBindingCall')
  })

  it('every attribution names exactly one child and cites the symbols it borrows', () => {
    for (const m of attributableExports('cloudflare')) {
      expect(m.child).toBeTruthy()
      expect(m.via.length).toBeGreaterThan(0)
    }
  })

  it('an atom with no child atoms has nothing to attribute', () => {
    expect(attributableExports('rules/hyphen')).toEqual([])
  })

  it('the manifest covers only hubs with a computable move', () => {
    const manifest = concentrationManifest()
    for (const h of manifest) expect(h.movable.length).toBeGreaterThan(0)
    // Sorted largest-first so the campaign has an order.
    for (let i = 1; i < manifest.length; i++) {
      expect(manifest[i - 1]!.movable.length).toBeGreaterThanOrEqual(manifest[i]!.movable.length)
    }
  })
})
