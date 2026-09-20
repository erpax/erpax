import { describe, expect, it } from 'vitest'
import { parseAxiomReport, proofCensus, proved } from '@/verify/inventory'

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
