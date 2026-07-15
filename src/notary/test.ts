import { describe, it, expect } from 'vitest'
import { notarize, chainIntact, authenticate, certifiedCopyValid, GENESIS, type NotarialAct } from './index'

const build = (recs: ReadonlyArray<[string, string]>): NotarialAct[] => {
  let p: NotarialAct[] = []
  for (const [rec, at] of recs) p = [...p, notarize(p, rec, at, 'notary:001')]
  return p
}

describe('notary — the legal notarial act as computable structure', () => {
  it('the same instrument notarised twice gets DIFFERENT seals — number, time, and chain make each act unique', () => {
    const p = build([
      ['deed', '2026-07-15T10:00:00Z'],
      ['deed', '2026-07-15T10:01:00Z'],
    ])
    expect(p[0]!.seal).not.toBe(p[1]!.seal) // same record, distinct acts
    expect(p[0]!.number).toBe(1)
    expect(p[1]!.prev).toBe(p[0]!.seal) // chained to its predecessor
  })

  it('every registered act is authentic — its seal is in the register root AND the chain holds', () => {
    const p = build([
      ['a', 't1'],
      ['b', 't2'],
      ['c', 't3'],
      ['d', 't4'],
      ['e', 't5'],
    ])
    for (let i = 0; i < p.length; i++) expect(authenticate(p, i)).toBe(true)
  })

  it('INSERTION is detected — you cannot slip a back-dated page into a bound protocol', () => {
    const p = build([
      ['a', 't1'],
      ['b', 't2'],
      ['c', 't3'],
    ])
    const forged = notarize([p[0]!], 'back-dated deed', 't1.5', 'notary:001')
    const tampered = [p[0]!, forged, p[1]!, p[2]!]
    expect(chainIntact(tampered)).toBe(false) // p[1].prev no longer matches the entry before it
  })

  it('ALTERING a recorded instrument is detected — the seal no longer matches its content', () => {
    const p = build([
      ['original deed', 't1'],
      ['b', 't2'],
    ])
    const altered = { ...p[0]!, record: 'altered deed' }
    expect(certifiedCopyValid(altered)).toBe(false) // re-seal ≠ stored seal
    expect(chainIntact([altered, p[1]!])).toBe(false)
  })

  it('a certified copy is authentic iff it re-seals to the registered act', () => {
    const p = build([['deed', 't1']])
    expect(certifiedCopyValid(p[0]!)).toBe(true)
    expect(certifiedCopyValid({ ...p[0]!, notary: 'impostor' })).toBe(false) // a forged officer breaks the seal
  })

  it('authenticate is TOTAL — out-of-range or empty protocol returns false, never throws', () => {
    expect(authenticate([], 0)).toBe(false)
    expect(authenticate(build([['a', 't1']]), 9)).toBe(false)
    expect(GENESIS).toHaveLength(36) // the genesis seal is a real address (the ⊥ the first act chains from)
  })
})
