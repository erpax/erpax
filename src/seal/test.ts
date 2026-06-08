import { describe, it, expect } from 'vitest'
import { guardian } from '@/guardian'
import {
  seal,
  assertSealPropagation,
  parentAtomPath,
  sealPropagatedFromAncestors,
} from '@/seal'
import { verifyDiamond } from '@/diamond'
import type { DiamondModel } from '@/diamond'

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
