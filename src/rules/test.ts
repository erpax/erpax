import { describe, it, expect, afterEach } from 'vitest'
import {
  rulesOf,
  assertRulesHold,
  tightenedFolderLaw,
  accountingStructureViolations,
  forbiddenIntermediateViolations,
  strayTsViolations,
  multiSegmentFileViolations,
  alphanumericNameViolations,
  isMultiSegmentFilename,
  ACCOUNTING_NEST_MAP,
  FORBIDDEN_INTERMEDIATE_SEGMENTS,
  computedBaseline,
  folderGuardians,
  clearRulesCache,
  getRulesCache,
} from '@/rules'
import { performance } from 'node:perf_hooks'

afterEach(() => {
  clearRulesCache()
})

describe('rules — cache', () => {
  it(
    'returns cached rulesOf snapshot on second call (TTL)',
    () => {
      const first = rulesOf()
      const t0 = performance.now()
      const second = rulesOf()
      const elapsed = performance.now() - t0
      console.log(`rulesOf cache hit: ${elapsed.toFixed(1)}ms`)
      expect(second).toBe(first)
      expect(elapsed).toBeLessThan(100)
      expect(getRulesCache()?.snapshot).toBe(first)
    },
    120_000,
  )
})

describe('rules — tightened gate registry', () => {
  const snapshot = rulesOf()

  it('rulesOf exposes every gate axis with finite counts', () => {
    expect(snapshot.axes.length).toBeGreaterThanOrEqual(7)
    for (const a of snapshot.axes) {
      expect(Number.isFinite(a.violations)).toBe(true)
      expect(Number.isFinite(a.baseline)).toBe(true)
      expect(a.source.startsWith('@/')).toBe(true)
    }
    console.log(
      `rules: folder ${snapshot.folder.name.length}+${snapshot.folder.trinity.length} · stray-ts ${snapshot.strayTs.length} · accounting ${snapshot.accountingStructure.length}`,
    )
  })

  it('isMultiSegmentFilename catches hyphen/dot stems at atom root', () => {
    expect(isMultiSegmentFilename('reports.service.ts')).toBe(true)
    expect(isMultiSegmentFilename('foo-bar.ts')).toBe(true)
    expect(isMultiSegmentFilename('index.ts')).toBe(false)
    expect(isMultiSegmentFilename('test.ts')).toBe(false)
    expect(isMultiSegmentFilename('margin.test.ts')).toBe(false)
    expect(isMultiSegmentFilename('foo-bar.test.ts')).toBe(true)
  })

  it('accountingStructureViolations — coa · corpus nested, no forbidden intermediates', () => {
    const v = accountingStructureViolations()
    expect(v.length).toBe(0)
    expect(v.length).toBeLessThanOrEqual(computedBaseline('accounting-structure'))
    for (const nest of Object.values(ACCOUNTING_NEST_MAP)) {
      expect(nest).not.toMatch(/-/)
      expect(nest.split('/')).toHaveLength(1)
    }
  })

  it('forbidden intermediates path · self — corpus-wide scan, zero violations', () => {
    for (const seg of FORBIDDEN_INTERMEDIATE_SEGMENTS) {
      expect(['path', 'self']).toContain(seg)
    }
    const v = forbiddenIntermediateViolations()
    expect(v.length).toBe(0)
    expect(v.length).toBeLessThanOrEqual(computedBaseline('forbidden-intermediate'))
    expect(v.some((row) => row.file === 'path/' || row.file === 'self/')).toBe(false)
  })

  it('tightenedFolderLaw merges stray-ts · multi-segment · forbidden-intermediate · accounting axes', () => {
    const t = tightenedFolderLaw()
    expect(t.length).toBeGreaterThan(0)
    const laws = new Set(t.map((v) => v.law))
    expect(laws.has('stray-ts') || laws.has('multi-segment-file')).toBe(true)
    expect(forbiddenIntermediateViolations().length).toBeLessThanOrEqual(
      computedBaseline('forbidden-intermediate'),
    )
  })

  it('stray-ts and multi-segment guardians hold at ratchet baselines', () => {
    expect(strayTsViolations().length).toBeLessThanOrEqual(computedBaseline('stray-ts'))
    expect(multiSegmentFileViolations().length).toBeLessThanOrEqual(
      computedBaseline('multi-segment-file'),
    )
    expect(alphanumericNameViolations().length).toBeLessThanOrEqual(
      computedBaseline('alphanumeric-name'),
    )
  })

  it('assertRulesHold returns snapshot + guardian cross (fail-closed shape)', () => {
    const verdict = assertRulesHold()
    expect(verdict.snapshot).toBeDefined()
    expect(Array.isArray(verdict.guardians)).toBe(true)
    expect(verdict.guardians.length).toBeGreaterThan(0)
    expect(typeof verdict.sealed).toBe('boolean')
    expect(typeof verdict.reason).toBe('string')
    const folderSeal = folderGuardians(verdict.snapshot.folder)
    expect(verdict.guardians.some((g) => g.axis === 'folder-name' || g.axis === 'name')).toBe(true)
    expect(verdict.guardians.some((g) => g.axis === 'stray-ts')).toBe(true)
    expect(verdict.guardians.some((g) => g.axis === 'alphanumeric-name')).toBe(true)
    expect(verdict.guardians.some((g) => g.axis === 'accounting-structure')).toBe(true)
    expect(verdict.guardians.some((g) => g.axis === 'forbidden-intermediate')).toBe(true)
    expect(verdict.guardians.some((g) => g.axis === 'matrix-crack')).toBe(true)
    if (!folderSeal.sealed) expect(verdict.sealed).toBe(false)
  })

  it('compliant accounting pattern — one-word children coa · corpus', () => {
    const compliant = ['coa', 'corpus']
    for (const nest of compliant) {
      expect(nest).not.toMatch(/-/)
      expect(Object.values(ACCOUNTING_NEST_MAP)).toContain(nest)
    }
    const v = accountingStructureViolations()
    expect(v.every((row) => row.compliant && !row.compliant.includes('-'))).toBe(true)
  })
})
