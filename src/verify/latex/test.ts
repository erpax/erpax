import { describe, expect, it } from 'vitest'
import { agreement, hashIn, leads, record, refusedFiles, render, tex, theoremsIn, theoremsOf } from '@/verify/latex'

describe('verify/latex — render and read back are inverse on the theorem set', () => {
  it('round-trips every theorem the kernel reported', () => {
    const r = record()
    expect(theoremsIn(render(r))).toEqual([...theoremsOf(r)])
  })

  it('agrees with the live record', () => {
    const a = agreement(render())
    expect(a.missingFromDocument).toEqual([])
    expect(a.missingFromRecord).toEqual([])
    expect(a.hashMatches).toBe(true)
    expect(a.agrees).toBe(true)
  })

  it('carries the sources hash, so the document names the bytes it describes', () => {
    expect(hashIn(render())).toBe(record().sourcesHash)
  })
})

describe('verify/latex — the silent omission, planted so the check is seen to fire', () => {
  it('REFUSES a document that drops one theorem', () => {
    const full = render()
    const victim = theoremsOf()[0] as string
    const cut = full
      .split('\n')
      .filter((l) => !l.includes(tex(victim)))
      .join('\n')
    const a = agreement(cut)
    expect(a.agrees).toBe(false)
    expect(a.missingFromDocument).toContain(victim)
  })

  it('REFUSES a document naming a theorem the kernel never reported', () => {
    const forged = render().replace('\\end{tabular}', '  Invented.theorem & Nowhere.lean & axiom-free \\\\\n\\end{tabular}')
    const a = agreement(forged)
    expect(a.agrees).toBe(false)
    expect(a.missingFromRecord).toContain('Invented.theorem')
  })

  it('REFUSES a document whose hash does not name these sources', () => {
    const stale = render().replace(/^% sources [0-9a-f]+$/m, '% sources deadbeefdeadbeef')
    const a = agreement(stale)
    expect(a.hashMatches).toBe(false)
    expect(a.agrees).toBe(false)
  })

  it('catches BOTH directions independently — neither implies the other', () => {
    const full = render()
    const victim = theoremsOf()[1] as string
    const swapped = full
      .split('\n')
      .map((l) => (l.includes(tex(victim)) ? '  Substitute.theorem & X.lean & axiom-free \\\\' : l))
      .join('\n')
    const a = agreement(swapped)
    expect(a.missingFromDocument).toContain(victim)
    expect(a.missingFromRecord).toContain('Substitute.theorem')
  })
})

describe('verify/latex — what the document may not quietly leave out', () => {
  it('renders a row for a refused file rather than skipping it', () => {
    const r = {
      sourcesHash: 'abc123',
      lean: '4.33.1',
      files: [{ file: 'Broken.lean', compiled: false, entries: [] }],
    }
    const out = render(r)
    expect(out).toContain('REFUSED')
    expect(out).toContain('Broken.lean')
  })

  it('renders a stubbed theorem AS stubbed — never as merely carrying axioms', () => {
    const r = {
      sourcesHash: 'abc123',
      lean: '4.33.1',
      files: [{ file: 'X.lean', compiled: true, entries: [{ theorem: 'X.claim', axiomFree: false, stubbed: true }] }],
    }
    expect(render(r)).toContain('STUBBED')
  })

  it('reports the live tree as having no refused file', () => {
    expect(refusedFiles()).toEqual([])
  })
})

describe('verify/latex — escaping, because theorem names are full of underscores', () => {
  it('escapes what LaTeX would read as syntax', () => {
    expect(tex('a_b')).toBe('a\\_b')
    expect(tex('100%')).toBe('100\\%')
    expect(tex('a&b')).toBe('a\\&b')
    expect(tex('\\')).toBe('\\textbackslash{}')
  })

  it('survives the round trip through an escaped name', () => {
    const r = {
      sourcesHash: 'abc123',
      lean: '4.33.1',
      files: [{ file: 'X.lean', compiled: true, entries: [{ theorem: 'Path.ancestor_lawful', axiomFree: true, stubbed: false }] }],
    }
    expect(theoremsIn(render(r))).toEqual(['Path.ancestor_lawful'])
  })
})

describe('verify/latex — the leads, which a clean-looking document would omit', () => {
  it('exposes every lead the record holds', () => {
    const a = agreement(render())
    expect(a.hiddenLeads).toEqual([])
  })

  it('REFUSES a document that drops a lead row while keeping every theorem', () => {
    const r = {
      sourcesHash: 'abc123',
      lean: '4.33.1',
      files: [
        {
          file: 'X.lean',
          compiled: true,
          entries: [
            { theorem: 'X.clean', axiomFree: true, stubbed: false },
            { theorem: 'X.leans', axiomFree: false, stubbed: false },
          ],
        },
      ],
    }
    const full = render(r)
    expect(agreement(full, r).agrees).toBe(true)
    // Every theorem still present; only the LEAD row removed. This is the shape of the lie.
    const tidied = full.split('\n').filter((l) => !l.trimStart().startsWith('LEAD-')).join('\n')
    const a = agreement(tidied, r)
    expect(theoremsIn(tidied)).toEqual(['X.clean', 'X.leans'])
    expect(a.missingFromDocument).toEqual([])
    expect(a.hiddenLeads).toEqual(['X.leans'])
    expect(a.agrees).toBe(false)
  })

  it('orders leads by what it costs to believe the claim — stubbed, refused, then axioms', () => {
    const r = {
      sourcesHash: 'abc123',
      lean: '4.33.1',
      files: [
        { file: 'A.lean', compiled: true, entries: [{ theorem: 'A.leans', axiomFree: false, stubbed: false }] },
        { file: 'B.lean', compiled: true, entries: [{ theorem: 'B.stub', axiomFree: false, stubbed: true }] },
        { file: 'C.lean', compiled: false, entries: [] },
      ],
    }
    expect(leads(r).map((l) => l.kind)).toEqual(['stubbed', 'refused', 'axioms'])
  })

  it('says NONE rather than leaving the section empty when nothing is open', () => {
    const r = {
      sourcesHash: 'abc123',
      lean: '4.33.1',
      files: [{ file: 'A.lean', compiled: true, entries: [{ theorem: 'A.clean', axiomFree: true, stubbed: false }] }],
    }
    expect(leads(r)).toEqual([])
    expect(render(r)).toContain('(none)')
  })
})
