import { describe, it, expect } from 'vitest'
import { guardian } from '@/guardian'
import {
  seal,
  assertSealPropagation,
  parentAtomPath,
  sealPropagatedFromAncestors,
  finishedIdeaCrossed,
} from '@/seal'
import { deriveDiamond, verifyDiamond } from '@/diamond'
import type { DiamondModel } from '@/diamond'
import {
  deriveFolderModel,
  buildReadmeCorpusContext,
  buildReadmeTypographyGraph,
} from '@/readme'

/** Live diamond with readme gravity graph — partition plane + balanced statement. */
function deriveSealedDiamond(atomPath: string): DiamondModel {
  return deriveSealedDiamondBatch([atomPath])[0]!
}

function deriveSealedDiamondBatch(atomPaths: readonly string[]): DiamondModel[] {
  const cwd = process.cwd()
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)
  return atomPaths.map((atomPath) => {
    const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
    const model = deriveDiamond(atomPath)
    return {
      ...model,
      trinity: { form: folder.form, code: folder.code, proof: folder.proof },
      sealed: folder.sealed,
    }
  })
}

// The seal (./index.ts) is the AND of its guardians, fail-closed on the empty set.
// It is the whole-corpus verdict the auto-commit/push waves gate on.
describe('seal: the cross of all guardians', () => {
  const hold = guardian({ axis: 'name', violations: 5, baseline: 10 })
  const red = guardian({ axis: 'trinity', violations: 11, baseline: 10 })

  it('is sealed iff every guardian holds', () => {
    expect(seal([hold, guardian({ axis: 'trinity', violations: 9, baseline: 10 })]).sealed).toBe(true)
    expect(seal([hold, red]).sealed).toBe(false)
  })

  it('is fail-closed on an empty set — nothing checked is not sealed', () => {
    expect(seal([]).sealed).toBe(false)
    // @ts-expect-error — a non-array is a broken call and must not pass
    expect(seal(undefined).sealed).toBe(false)
  })

  it('names every red guardian in the reason (no hidden failure)', () => {
    const v = seal([hold, red])
    expect(v.reason).toContain('NOT sealed')
    expect(v.reason).toContain('trinity')
  })
})

describe('seal: folder propagation', () => {
  it('child sealed only when local and ancestors hold', () => {
    expect(assertSealPropagation(true, true)).toBe(true)
    expect(assertSealPropagation(true, false)).toBe(false)
    expect(assertSealPropagation(false, true)).toBe(false)
  })

  it('unsealed parent forbids sealed descendant', () => {
    const sealed = sealPropagatedFromAncestors(
      'agents/mcp',
      true,
      (p) => p === 'agents' || p === 'agents/mcp',
      (p) => p !== 'agents',
    )
    expect(sealed).toBe(false)
  })
})

describe('seal — propagation law (parent subsumes child)', () => {
  it('parentAtomPath strips the leaf segment', () => {
    expect(parentAtomPath('law/folder')).toBe('law')
    expect(parentAtomPath('readme')).toBeNull()
  })

  it('assertSealPropagation is fail-closed when parent unsealed', () => {
    expect(assertSealPropagation(true, false)).toBe(false)
    expect(assertSealPropagation(false, false)).toBe(false)
    expect(assertSealPropagation(true, true)).toBe(true)
  })

  it('sealed child under unsealed parent is impossible (pure fn proof)', () => {
    const states = [
      { parentSealed: false, childLocal: true },
      { parentSealed: false, childLocal: false },
      { parentSealed: true, childLocal: true },
      { parentSealed: true, childLocal: false },
    ] as const
    const impossible = states.filter(
      (s) => !s.parentSealed && assertSealPropagation(s.childLocal, s.parentSealed),
    )
    expect(impossible).toEqual([])
  })

  it('phantom prefix (no atom) forbids sealed descendants', () => {
    const sealed = sealPropagatedFromAncestors(
      'skill/router',
      true,
      (p) => p === 'law',
      () => true,
    )
    expect(sealed).toBe(false)
  })

  it('verifyDiamond flags propagation impurity when parent unsealed', () => {
    const model: DiamondModel = {
      kind: 'atom',
      atomPath: 'child/leaf',
      boundaryUuid: null,
      trinity: { form: 1, code: 1, proof: 1 },
      horo: 1,
      measure: 'base',
      imports: [],
      exports: [],
      escapes: [],
      links: [],
      linksResolved: 0,
      linksTotal: 0,
      folded: true,
      bondsIn: 0,
      bondsOut: 0,
      sealed: true,
    }
    const v = verifyDiamond(model, { parentSealed: false })
    expect(v.sealed).toBe(false)
    expect(v.impurities.some((i) => i.includes('seal propagation'))).toBe(true)
  })
})

describe('finishedIdeaCrossed — sealed diamond crossed in all directions', () => {
  it('form-only atom is unfinished (trinity.code + trinity.proof missing)', () => {
    const model = deriveDiamond('quantum/digit')
    const folder = deriveSealedDiamond('quantum/digit')
    expect(folder.trinity).toEqual({ form: 1, code: 1, proof: 1 })
    const unfinished: DiamondModel = { ...model, trinity: { form: 1, code: 0, proof: 0 }, sealed: false }
    const v = finishedIdeaCrossed(unfinished)
    expect(v.crossed).toBe(false)
    expect(v.impurities.some((i) => i.includes('trinity.code'))).toBe(true)
    expect(v.impurities.some((i) => i.includes('trinity.proof'))).toBe(true)
  })

  it('sealed trinity atom crosses on the live matrix (seal)', () => {
    const model = deriveSealedDiamond('seal')
    const ctx = buildReadmeCorpusContext()
    const folder = deriveFolderModel('seal', process.cwd(), ctx, buildReadmeTypographyGraph())
    const v = finishedIdeaCrossed(model, { entropyAccounting: folder.entropy })
    expect(model.sealed).toBe(true)
    expect(model.trinity).toEqual({ form: 1, code: 1, proof: 1 })
    expect(v.crossed).toBe(true)
    expect(v.impurities).toEqual([])
  })

  it('quantum/log crosses after trinity collapse (demo finished idea)', () => {
    const model = deriveSealedDiamond('quantum/log')
    const v = finishedIdeaCrossed(model)
    expect(model.trinity).toEqual({ form: 1, code: 1, proof: 1 })
    expect(model.sealed).toBe(true)
    expect(v.crossed).toBe(true)
    expect(v.impurities).toEqual([])
  })

  const quantumTrinityCollapsed = [
    'quantum/bindings',
    'quantum/deploy',
    'quantum/device',
    'quantum/digit',
    'quantum/emr',
    'quantum/export',
    'quantum/fs',
    'quantum/generator',
    'quantum/import',
    'quantum/literature',
    'quantum/mcp',
    'quantum/number',
    'quantum/pi',
    'quantum/request',
    'quantum/security',
    'quantum/snapshot',
    'quantum/society',
  ] as const

  it('P0 quantum trinity-collapsed atoms cross (finishedIdeaCrossed batch)', () => {
    for (const model of deriveSealedDiamondBatch(quantumTrinityCollapsed)) {
      const v = finishedIdeaCrossed(model)
      expect(model.trinity, model.atomPath).toEqual({ form: 1, code: 1, proof: 1 })
      expect(model.sealed, model.atomPath).toBe(true)
      expect(v.crossed, model.atomPath).toBe(true)
      expect(v.impurities, model.atomPath).toEqual([])
    }
  }, 120_000)

  it('synthetic incomplete model fails closed on every missing leg', () => {
    const model: DiamondModel = {
      kind: 'atom',
      atomPath: 'no/such/atom',
      boundaryUuid: null,
      trinity: { form: 1, code: 0, proof: 0 },
      horo: 99,
      measure: null,
      imports: [],
      exports: [],
      escapes: [],
      links: [],
      linksResolved: 0,
      linksTotal: 0,
      folded: false,
      bondsIn: 0,
      bondsOut: 0,
      sealed: false,
    }
    const v = finishedIdeaCrossed(model)
    expect(v.crossed).toBe(false)
    expect(v.impurities.length).toBeGreaterThan(3)
  })

  it('entropy gate: gapsAccounted && sealsAccounted required when accounting supplied', () => {
    const model = deriveSealedDiamond('seal')
    const emptyAcct = {
      unit: 'eb' as const,
      gaps: [],
      seals: [],
      totalGapEb: 0,
      totalSealEb: 0,
      netEntropyEb: 0,
      sealGapRatio: 0,
    }
    const v = finishedIdeaCrossed(model, { entropyAccounting: emptyAcct })
    expect(v.crossed).toBe(false)
    expect(v.impurities.some((i) => i.includes('entropy:'))).toBe(true)
  })

  it('access crosses on control-axis horo (band:control · 3·6·9, not flow ring)', () => {
    const model = deriveDiamond('access')
    const v = finishedIdeaCrossed({
      ...model,
      trinity: { form: 1, code: 1, proof: 1 },
      sealed: true,
    })
    expect(model.horo).toBe(3)
    expect(v.crossed).toBe(true)
    expect(v.impurities).toEqual([])
  })
})
