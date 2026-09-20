import { describe, expect, it } from 'vitest'
import {
  TERMINAL,
  ageAt,
  independentRoots,
  judge,
  roots,
  unwalkableRoots,
  walk,
  type Chain,
} from '@/provenance'

/**
 * The real case this atom was built from: the phytoremediation cost advantage. Three modern papers
 * cite it; all three trace to one 1997 report; that report's tables cite a vendor summary and a
 * personal communication.
 */
const REMEDIATION: Chain = {
  claim: 'phytoremediation costs a fraction of excavation per tonne',
  entry: ['rsc-2024', 'review-2021', 'chapter-2019'],
  links: [
    { id: 'rsc-2024', kind: 'secondary', year: 2024, cites: ['gwrtac-1997'] },
    { id: 'review-2021', kind: 'secondary', year: 2021, cites: ['gwrtac-1997'] },
    { id: 'chapter-2019', kind: 'secondary', year: 2019, cites: ['gwrtac-1997'] },
    { id: 'gwrtac-1997', kind: 'secondary', year: 1997, cites: ['phytotech-1997', 'drake-pers-comm'] },
    { id: 'phytotech-1997', kind: 'vendor', year: 1997, cites: [] },
    { id: 'drake-pers-comm', kind: 'personal-communication', year: 1997, cites: [] },
  ],
}

/** The contrast: a figure that reaches an auditable appropriation. */
const SUPERFUND: Chain = {
  claim: 'the FY2026 Superfund appropriation fell 47.4%',
  entry: ['crs-2026'],
  links: [
    { id: 'crs-2026', kind: 'secondary', year: 2026, cites: ['pl-119-74'] },
    { id: 'pl-119-74', kind: 'primary', year: 2026, cites: [] },
  ],
}

describe('provenance — restatement is not corroboration', () => {
  it('counts three modern citations and ONE thing they rest on', () => {
    expect(walk(REMEDIATION).length).toBe(6)
    expect(REMEDIATION.entry.length).toBe(3)
    // Three papers, two roots — and neither root is a source a reader can check.
    expect(independentRoots(REMEDIATION)).toBe(2)
  })

  it('names the roots a reader cannot walk past', () => {
    expect(unwalkableRoots(REMEDIATION).map((l) => l.id).sort())
      .toEqual(['drake-pers-comm', 'phytotech-1997'])
    expect(judge(REMEDIATION, 2026).grounded).toBe(false)
  })

  it('dates the claim at its OLDEST root, not its newest citation', () => {
    // The newest citation says 2024. The claim is from 1997.
    expect(ageAt(REMEDIATION, 2026)).toBe(29)
    expect(judge(REMEDIATION, 2026).rootYear).toBe(1997)
  })

  it('grounds a claim that reaches an auditable primary source', () => {
    const v = judge(SUPERFUND, 2026)
    expect(v.grounded).toBe(true)
    expect(v.unwalkable).toEqual([])
    expect(v.ageYears).toBe(0)
  })
})

describe('provenance — what may end a chain, and what may never', () => {
  it('lets a primary or peer-reviewed source terminate it', () => {
    expect(TERMINAL.has('primary')).toBe(true)
    expect(TERMINAL.has('peer-reviewed')).toBe(true)
  })

  it('never lets a vendor, a conversation or a projection terminate it', () => {
    for (const kind of ['vendor', 'personal-communication', 'market-projection'] as const) {
      expect(TERMINAL.has(kind)).toBe(false)
      const c: Chain = { claim: 'x', entry: ['a'], links: [{ id: 'a', kind, year: 2025, cites: [] }] }
      expect(judge(c, 2026).grounded).toBe(false)
    }
  })

  it('refuses a claim resting on nothing at all', () => {
    const empty: Chain = { claim: 'asserted', entry: [], links: [] }
    expect(roots(empty)).toEqual([])
    expect(judge(empty, 2026).grounded).toBe(false)
  })

  it('refuses a dangling citation rather than treating the gap as a root', () => {
    // 'missing' is cited and not supplied: the chain does not reach a root through it.
    const dangling: Chain = {
      claim: 'points at a paper nobody included',
      entry: ['a'],
      links: [{ id: 'a', kind: 'secondary', year: 2020, cites: ['missing'] }],
    }
    expect(roots(dangling)).toEqual([])
    expect(judge(dangling, 2026).grounded).toBe(false)
  })
})

describe('provenance — a literature that cites itself in a ring does not hang the walker', () => {
  it('terminates on a cycle and reports no root', () => {
    const ring: Chain = {
      claim: 'circular',
      entry: ['a'],
      links: [
        { id: 'a', kind: 'secondary', year: 2020, cites: ['b'] },
        { id: 'b', kind: 'secondary', year: 2021, cites: ['a'] },
      ],
    }
    expect(walk(ring).length).toBe(2)
    expect(independentRoots(ring)).toBe(0)
    expect(judge(ring, 2026).grounded).toBe(false)
  })

  it('counts a diamond once — two paths to one root are one root', () => {
    const diamond: Chain = {
      claim: 'two routes, one origin',
      entry: ['a', 'b'],
      links: [
        { id: 'a', kind: 'secondary', year: 2023, cites: ['r'] },
        { id: 'b', kind: 'secondary', year: 2024, cites: ['r'] },
        { id: 'r', kind: 'primary', year: 2010, cites: [] },
      ],
    }
    expect(independentRoots(diamond)).toBe(1)
    expect(judge(diamond, 2026).grounded).toBe(true)
  })
})
