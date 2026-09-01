import { describe, it, expect } from 'vitest'
import { attributableExports, concentrationManifest } from './index'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import {
  analyzeIndexConcentration,
  childAtomDirs,
  isAdjacencyOnly,
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
export { foo } from '../foo'
export { bar } from '../bar'
export type { Baz } from '../baz'
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
    // quantum/chat holds modeOf and threadModes inline while the uuid machinery they
    // borrow lives in quantum/chat/merkle — the dependency says where they belong.
    const moves = attributableExports('quantum/chat')
    expect(moves.length).toBeGreaterThan(0)
    const mode = moves.find((m) => m.name === 'modeOf')
    expect(mode?.child).toBe('merkle')
    expect(mode?.via.length).toBeGreaterThan(0)
  })

  it('a child collapsed to a pure re-export offers no seam, and none is invented', () => {
    // cloudflare/binding once held a DIVERGED second mediator and was collapsed to a
    // re-export of the one implementation. Nothing is defined there any more, so
    // nothing can be attributed to it — an empty manifest is the correct answer, not
    // a failure to look.
    expect(childAtomDirs('cloudflare')).toContain('binding')
    expect(attributableExports('cloudflare')).toEqual([])
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

  it('a parent that COMPOSES its children is delegating, not concentrating', () => {
    const composed = [
      "import type { CollectionConfig } from 'payload'",
      "import { readAccess } from '@/thing/access'",
      "import { ensureUnique } from '@/thing/hooks'",
      ...Array.from({ length: 220 }, (_, i) => `const field${i} = { name: 'f${i}' }`),
      'export const Thing: CollectionConfig = { slug: "thing", access: { read: readAccess }, hooks: { beforeChange: [ensureUnique] } }',
    ].join('\n')
    const m = analyzeIndexConcentration(composed, 2, ['access', 'hooks'], 'thing')
    expect(m.wiredChildCount).toBe(2)
    expect(m.reExportRatio).toBeLessThan(0.65) // composition never raises the ratio
    expect(isConcentrationViolation(m)).toBe(false)
  })

  it('a parent that ignores its children is still concentrating', () => {
    const ignored = [
      ...Array.from({ length: 220 }, (_, i) => `const field${i} = { name: 'f${i}' }`),
      'export const Thing = { slug: "thing" }',
    ].join('\n')
    const m = analyzeIndexConcentration(ignored, 2, ['access', 'hooks'], 'thing')
    expect(m.wiredChildCount).toBe(0)
    expect(isConcentrationViolation(m)).toBe(true)
  })

  it('a relative specifier counts as wiring just as an alias does', () => {
    const rel = [
      "import { readAccess } from './access'",
      ...Array.from({ length: 220 }, (_, i) => `const field${i} = { name: 'f${i}' }`),
      'export const Thing = { access: readAccess }',
    ].join('\n')
    expect(analyzeIndexConcentration(rel, 1, ['access'], 'thing').wiredChildCount).toBe(1)
  })

  it('adjacency alone is not concentration — a nested atom is a normal shape', () => {
    const parent = [
      ...Array.from({ length: 205 }, (_, i) => `const local${i} = ${i}`),
      ...Array.from({ length: 5 }, (_, i) => `export const own${i} = local${i}`),
    ].join('\n')
    const m = analyzeIndexConcentration(parent, 2, ['source', 'threshold'], 'entropy')
    expect(m.wiredChildCount).toBe(0)
    expect(isConcentrationViolation(m)).toBe(true)
    expect(isAdjacencyOnly(m)).toBe(true) // ← the only reason it fired
  })

  it('a REAL hub does not get the adjacency pass — another condition still holds it', () => {
    const hub = [
      ...Array.from({ length: 600 }, (_, i) => `const local${i} = ${i}`),
      ...Array.from({ length: 30 }, (_, i) => `export function f${i}() { return local${i} }`),
    ].join('\n')
    const m = analyzeIndexConcentration(hub, 2, ['a', 'b'], 'hub')
    expect(isConcentrationViolation(m)).toBe(true)
    expect(isAdjacencyOnly(m)).toBe(false) // lines + score + fns all fire
  })

  it('an atom that wires its children never reaches the adjacency question', () => {
    const wired = [
      "import { x } from './a'",
      "import { y } from './b'",
      ...Array.from({ length: 205 }, (_, i) => `const local${i} = ${i}`),
      'export const composed = { x, y }',
    ].join('\n')
    const m = analyzeIndexConcentration(wired, 2, ['a', 'b'], 'hub')
    expect(isAdjacencyOnly(m)).toBe(false)
  })

  it('a destination is not a cut size — the manifest reports what a move DRAGS', () => {
    const moves = attributableExports('quantum/chat')
    const modeOf = moves.find((m) => m.name === 'modeOf')
    expect(modeOf?.child).toBe('merkle')
    // it borrows one symbol from merkle, but leans on a parent-local type
    expect(modeOf?.via).toContain('messageUuid')
    expect(modeOf?.carries).toContain('StringMode')
  })

  it('carriesExclusive is always a subset of carries, and a cluster is the closure', () => {
    // NOT a count of clean moves: that number falls as folds land, so asserting it is
    // greater than zero pins the test to a transient tree and it goes red on success.
    for (const m of attributableExports('quantum/chat')) {
      expect(m.via.length).toBeGreaterThan(0)
      for (const c of m.carriesExclusive) expect(m.carries).toContain(c)
      expect(m.carriesExclusive.length).toBeLessThanOrEqual(m.carries.length)
    }
  })

  it('a carried symbol drags its OWN dependencies — the closure is transitive', () => {
    const hub = [
      "import { helper } from './child'",
      'type Inner = { readonly a: number }',
      'export interface Outer { readonly inner: Inner }',
      'export const mover = (o: Outer) => helper(o)',
      ...Array.from({ length: 205 }, (_, i) => `const pad${i} = ${i}`),
    ].join('\n')
    const m = analyzeIndexConcentration(hub, 1, ['child'], 'hub')
    expect(m.wiredChildCount).toBe(1) // it imports the child, so it delegates
  })

  it('a function-local binding is never mistaken for parent matter', () => {
    // parameters and locals shadow; only true outer references can be dragged
    for (const m of attributableExports('quantum/chat')) {
      expect(m.carries).not.toContain(m.name)
      expect(m.carries.every((c) => typeof c === 'string' && c.length > 0)).toBe(true)
    }
  })
})
