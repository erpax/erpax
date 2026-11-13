import { describe, it, expect } from 'vitest'
import { caseMarkdown, citedLean, lawOf, restrict, statementsOf, testsIn, withCase } from '@/verify/case'
import type { Record_ } from '@/verify/latex'

const lean = `namespace Coil

def crosses (n : Nat) : Nat := n * (n - 1) / 2

theorem trinity_is_the_coil (n : Nat) (h : n ≤ 64) :
    (crosses n = n ↔ n = 0 ∨ n = 3) := by
  decide

lemma helper : 1 = 1 := rfl

theorem not_reported : 2 = 2 := rfl
end Coil`

const record: Record_ = {
  sourcesHash: 'abc',
  lean: 'Lean 4',
  files: [
    { file: 'Coil.lean', compiled: true, entries: [
      { theorem: 'Coil.trinity_is_the_coil', axioms: [], axiomFree: true, stubbed: false },
      { theorem: 'Coil.helper', axioms: ['propext'], axiomFree: false, stubbed: false },
    ] },
    { file: 'Other.lean', compiled: true, entries: [{ theorem: 'Other.x', axioms: [], axiomFree: true, stubbed: false }] },
  ],
}

describe('verify/case — the parts are read, never re-typed', () => {
  it('reads each theorem as its source states it, under the file namespace, on one line', () => {
    const s = statementsOf(lean)
    expect(s.map((x) => x.name)).toEqual(['Coil.trinity_is_the_coil', 'Coil.helper', 'Coil.not_reported'])
    expect(s[0]!.statement).toBe('theorem trinity_is_the_coil (n : Nat) (h : n ≤ 64) : (crosses n = n ↔ n = 0 ∨ n = 3)')
    expect(statementsOf('def x := 1')).toEqual([])
  })

  it('finds the Lean files a document names, its law, and its test count', () => {
    expect(citedLean('see `Coil.lean` and Coil.lean, then Mirror.lean; not a.lean or leaning')).toEqual(['Coil.lean', 'Mirror.lean'])
    expect(lawOf('x\n\n**Law — [[law]]: one\ncoil each way.**\n')).toBe('[[law]]: one coil each way.')
    expect(lawOf('no law here')).toBeUndefined()
    expect(testsIn("it('a', () => {})\n  test('b', () => {})\n// it('c')\nsplit('x')")).toBe(2)
  })

  it('restricts the record to the cited files', () => {
    expect(restrict(record, ['Coil.lean']).files.map((f) => f.file)).toEqual(['Coil.lean'])
  })
})

describe('verify/case — claim · argument · evidence · assumptions, in that order', () => {
  const section = caseMarkdown({ claim: 'one coil each way.', record: restrict(record, ['Coil.lean']), sources: { 'Coil.lean': lean }, unknown: [], tests: 3 })

  it('keeps the four parts in a fixed order', () => {
    const at = ['## Proof', '**Claim.**', '**Argument.**', '**Evidence.**', '**Assumptions.**'].map((p) => section.indexOf(p))
    expect(at.every((i) => i >= 0)).toBe(true)
    expect([...at].sort((a, b) => a - b)).toEqual(at)
  })

  it('shows only theorems the kernel reported — a theorem in the source and not in the record is left out', () => {
    expect(section).toContain('theorem trinity_is_the_coil')
    expect(section).toContain('theorem helper')
    expect(section).not.toContain('not_reported')
    expect(section).not.toContain('Other.x')
  })

  it('carries the generated LaTeX record and names every axiom used', () => {
    expect(section).toMatch(/```latex\n% GENERATED from the kernel record/)
    expect(section).toContain('Coil.trinity\\_is\\_the\\_coil')
    expect(section).toContain('axioms used: propext')
    expect(section).toContain('3 test case(s) also stand beside it')
  })

  it('a document citing no proof is shown as having none — tests are stated as weaker evidence', () => {
    const weak = caseMarkdown({ claim: 'a law', record: restrict(record, []), sources: {}, unknown: [], tests: 4 })
    expect(weak).toContain('No formal proof is cited')
    expect(weak).toContain('4 test case(s)')
    expect(weak).not.toContain('```lean')
  })

  it('names a cited file the kernel record does not know, and a refused or stubbed one', () => {
    const r: Record_ = { ...record, files: [{ file: 'Bad.lean', compiled: false, entries: [] }, { file: 'S.lean', compiled: true, entries: [{ theorem: 'S.t', axioms: [], axiomFree: true, stubbed: true }] }] }
    const out = caseMarkdown({ record: r, sources: {}, unknown: ['Ghost.lean'], tests: 0 })
    expect(out).toContain('refused by the kernel: Bad.lean')
    expect(out).toContain('stubbed: S.t')
    expect(out).toContain('cited but not in the kernel record: Ghost.lean')
    expect(out).toContain('This document states no law of its own.')
  })

  it('shows nothing rather than an empty frame, and never appends a second section', () => {
    expect(caseMarkdown({ record: restrict(record, []), sources: {}, unknown: [], tests: 0 })).toBe('')
    expect(withCase('# doc', '')).toBe('# doc')
    expect(withCase('# doc\n', section)).toBe(`# doc\n\n${section}\n`)
    expect(withCase(`# doc\n\n${section}\n`, section)).toBe(`# doc\n\n${section}\n`)
  })
})
