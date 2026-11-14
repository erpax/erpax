import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { CLAY, INVENTORY, claySettled, clayTags, clayWitnesses, parseAxiomReport, proofCensus, proved } from '@/utilities/verify/inventory'

describe('verify/inventory — the kernel is quoted, never paraphrased', () => {
  const out = [
    "'Ftl.a_crack_refuses_ftl' does not depend on any axioms",
    "'Ftl.amortized_never_rises' depends on axioms: [propext]",
    "'Orchestrate.decomposition_complete' depends on axioms: [sorryAx]",
    'some unrelated kernel chatter',
  ].join('\n')

  it('reads both shapes the kernel prints, and nothing else', () => {
    const e = parseAxiomReport(out)
    expect(e).toHaveLength(3)
    expect(e[0]?.axiomFree).toBe(true)
    expect(e[1]?.axioms).toEqual(['propext'])
  })

  // The defect this exists to prevent: a line nobody parsed must not read as a proof.
  it('an unparsed line is not an entry', () => {
    expect(parseAxiomReport('nothing here').length).toBe(0)
  })

  it('sorryAx is a STUB, never a proof — it is what the old Wave.lean was full of', () => {
    const e = parseAxiomReport(out)
    expect(e[2]?.stubbed).toBe(true)
    const c = proofCensus(e)
    expect(c).toEqual({ theorems: 3, axiomFree: 1, standardAxioms: 1, stubbed: 1 })
    expect(proved(c)).toBe(2)
  })
})

describe('verify/inventory — what the kernel has checked ABOUT the Clay problems, counted', () => {
  const dir = join(import.meta.dirname, '..', 'lean')
  const sources = Object.fromEntries(readdirSync(dir).filter((f) => f.endsWith('.lean')).map((f) => [f, readFileSync(join(dir, f), 'utf8')]))
  const witnesses = clayWitnesses(INVENTORY, sources)

  it('Riemann has one declared witness: an obstruction, from Symmetry.lean, compiled, no stub', () => {
    const riemann = witnesses.filter((w) => w.problem === 'riemann')
    expect(riemann).toHaveLength(1)
    expect(riemann[0]).toMatchObject({ kind: 'meta', file: 'Symmetry.lean', compiled: true, stubbed: 0 })
    expect(riemann[0]!.theorems).toBeGreaterThanOrEqual(9)
  })

  it('the other six problems have no Lean witness at all', () => {
    for (const problem of CLAY.filter((p) => p !== 'riemann')) expect(witnesses.filter((w) => w.problem === problem), problem).toEqual([])
  })

  it('no Lean file here proves a Clay statement, so nothing is settled', () => {
    expect(claySettled(witnesses)).toEqual([])
    expect(witnesses.filter((w) => w.kind === 'statement' || w.kind === 'partial')).toEqual([])
  })

  it('every declared file compiled: a refusal by the kernel cannot hide behind a tag', () => {
    expect(witnesses.every((w) => w.compiled)).toBe(true)
  })

  it('the detector can go red: a file DECLARED to prove a statement, compiled and unstubbed, settles it', () => {
    const planted = { ...sources, 'Symmetry.lean': `${sources['Symmetry.lean']}\n  Clay: riemann statement\n` }
    expect(claySettled(clayWitnesses(INVENTORY, planted))).toEqual(['riemann'])
  })

  it('...but a stubbed or refused file never settles anything', () => {
    const stub = { files: [{ file: 'X.lean', compiled: true, entries: [{ theorem: 'X.t', axioms: ['sorryAx'], axiomFree: false, stubbed: true }] }] }
    const refused = { files: [{ file: 'X.lean', compiled: false, entries: [] }] }
    const src = { 'X.lean': '  Clay: hodge statement' }
    expect(claySettled(clayWitnesses(stub, src))).toEqual([])
    expect(claySettled(clayWitnesses(refused, src))).toEqual([])
  })

  it('a typo in a tag throws instead of hiding the declaration', () => {
    const files = { files: [{ file: 'X.lean', compiled: true, entries: [] }] }
    expect(() => clayWitnesses(files, { 'X.lean': '  Clay: riman meta' })).toThrow(/not a Clay problem/)
    expect(() => clayWitnesses(files, { 'X.lean': '  Clay: riemann solved' })).toThrow(/not a kind/)
    expect(clayTags('no tag here')).toEqual([])
  })
})
