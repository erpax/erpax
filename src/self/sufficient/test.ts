/**
 * self/sufficient — the law proved. Green by construction: decreasing external
 * dependence increases the effective tampering cost; full self-sufficiency at
 * full coverage is uncrackable. @see ./index.ts, src/self/sufficient/SKILL.md
 */
import { describe, it, expect } from 'vitest'
import {
  selfSufficiencyVerdict,
  internalise,
  selfSufficientCrackVerdict,
  nextDirection,
  internalLeads,
  selfSufficientNext,
  leadCross,
  type ExternalDependency,
} from '@/self/sufficient'
import { ERPAX_DIGEST_BITS } from '@/cost'

const DEPS: ReadonlyArray<ExternalDependency> = [
  { id: 'anthropic-api', kind: 'ai-model', compromiseBits: 40, internalisable: true },
  { id: 'plaid', kind: 'service', compromiseBits: 64 },
]

describe('self/sufficient: the weakest external link binds', () => {
  it('no liabilities ⇒ the digest/anchor floor binds, fully self-sufficient', () => {
    const v = selfSufficiencyVerdict({})
    expect(v.binding).not.toBe('dependency')
    expect(v.effectiveCostBits).toBe(ERPAX_DIGEST_BITS)
    expect(v.selfSufficiency).toBe(1)
    expect(v.weakestLink).toBeNull()
  })
  it('a cheap external dependency caps the effective cost at its compromise bits', () => {
    const v = selfSufficiencyVerdict({ liabilities: DEPS })
    expect(v.binding).toBe('dependency')
    expect(v.effectiveCostBits).toBe(40) // the AI-model API, not the 2^106 digest
    expect(v.weakestLink).toBe('anthropic-api')
    expect(v.dependenceCount).toBe(2)
    expect(v.selfSufficiency).toBeCloseTo(40 / ERPAX_DIGEST_BITS, 6)
  })
})

describe('self/sufficient: decrease dependence ⇒ increase tampering cost', () => {
  it('internalising the binding dependency raises the floor', () => {
    const before = selfSufficiencyVerdict({ liabilities: DEPS })
    const { liabilities: afterDeps, verdict: after } = internalise(DEPS, 'anthropic-api')
    expect(after.effectiveCostBits).toBeGreaterThan(before.effectiveCostBits) // 64 > 40
    expect(after.weakestLink).toBe('plaid')
    const { verdict: full } = internalise(afterDeps, 'plaid')
    expect(full.binding).not.toBe('dependency')
    expect(full.effectiveCostBits).toBe(ERPAX_DIGEST_BITS) // the digest floor — fully self-sufficient
    expect(full.selfSufficiency).toBe(1)
  })
  it('internalisation is monotonic — removing a dep never lowers the cost', () => {
    let deps = DEPS
    let prev = selfSufficiencyVerdict({ liabilities: deps }).effectiveCostBits
    for (const id of ['anthropic-api', 'plaid']) {
      const step = internalise(deps, id)
      expect(step.verdict.effectiveCostBits).toBeGreaterThanOrEqual(prev)
      deps = step.liabilities
      prev = step.verdict.effectiveCostBits
    }
  })
})

describe('self/sufficient: the bridge to tamper-cost', () => {
  it('a cheap dependency makes the crack verdict bound by it (the weak anchor)', () => {
    const v = selfSufficientCrackVerdict({ liabilities: DEPS })
    expect(v.crackCostLog2).toBe(40)
    expect(v.binding).toBe('anchor') // the external dep IS the binding anchor
  })
  it('fully self-sufficient + full coverage ⇒ infinite crack cost', () => {
    const v = selfSufficientCrackVerdict({ liabilities: [], coverage: 1 })
    expect(v.crackCostLog2).toBe(Number.POSITIVE_INFINITY)
    expect(v.note).toMatch(/100% coverage/)
  })
})

describe('self/sufficient — nextDirection: derive the next move from within (ask the machine)', () => {
  it('ranks the corpus frontier by the standing queue (regression first, cosmetic last)', () => {
    const intents = [
      'rename the widget for tidiness',
      'the accounting posting hook is broken and does not boot',
      'close the audit gap the director signs under SOX §404',
      'the pre-push gate is red and blocks deploy',
      'fold the dead stray helper (debt)',
    ]
    const ranked = nextDirection(intents)
    expect(ranked[0]!.intent).toMatch(/broken and does not boot/) // regression, rank 5
    expect(ranked[0]!.rank).toBe(5)
    expect(ranked[ranked.length - 1]!.intent).toMatch(/tidiness/) // cosmetic, rank 1
    // strictly non-increasing rank — a real ordering
    for (let i = 1; i < ranked.length; i++) expect(ranked[i]!.rank).toBeLessThanOrEqual(ranked[i - 1]!.rank)
  })

  it('is self-sufficient: an empty frontier yields no direction (nothing to ask the operator either)', () => {
    expect(nextDirection([])).toEqual([])
  })

  it('auditor/signer-facing outranks blocks-everything outranks debt', () => {
    const [a, b, c] = nextDirection(['a dead-code debt gap', 'the build gate', 'the auditor SOX control'])
    expect(a!.rank).toBeGreaterThan(b!.rank) // auditor (4) > build (3)
    expect(b!.rank).toBeGreaterThan(c!.rank) // build (3) > debt (2)
  })
})

/**
 * The standing queue is a set of KEYWORDS, and four of them matched the wrong words.
 *
 * `nextDirection` is how the corpus orders its own frontier, so a mis-ranking here mis-directs every
 * autonomous wave. These are the live strings that were wrongly ranked, pinned so they stay ranked
 * correctly — [[rules]]/probe's law at the ranker.
 */
describe('self/sufficient — the queue matches words, not letters', () => {
  const rank = (intent: string): number => nextDirection([intent])[0]!.rank

  it('does NOT read an ordinary -red participle as a regression', () => {
    // `red\b` matched shared · measured · required · covered · considered, and this corpus writes
    // "measured" in nearly every sentence it produces — so rank 5 fired on prose.
    for (const s of ['shared vocabulary regenerated', 'measured across the corpus', 'required by the statute']) {
      expect(rank(s)).toBe(0)
    }
    expect(rank('red gate bypass-math is above baseline')).toBe(5)
  })

  it('does NOT read aggregate/delegate/mitigate as a blocking gate', () => {
    // `gate` matched them all, and this tree exports `aggregateCorpusEntropy`.
    for (const s of ['aggregate the corpus entropy', 'delegate to the child atom', 'investigate the tangle']) {
      expect(rank(s)).toBe(0)
    }
    expect(rank('the pre-push gate blocks the push')).toBe(3)
  })

  it('does NOT read a deadline as dead code', () => {
    expect(rank('deadline for the release')).toBe(0)
    expect(rank('dead weight — nothing reaches this atom')).toBe(2)
  })

  it('DOES read the hyphenated spelling this corpus actually uses', () => {
    // `unfold` missed `un-folded`, which is how the SKILLs write it everywhere.
    expect(rank('1207 un-folded exports')).toBe(2)
    expect(rank('unfolded export with one caller')).toBe(2)
  })
})

/**
 * Self-sufficiency needs a frontier the corpus GENERATES, not one a person typed.
 */
describe('self/sufficient — leads the corpus finds about itself', () => {
  const src = {
    guardians: () => [
      { axis: 'accounting-wave', violations: 249, baseline: 0, ok: false },
      { axis: 'unit', violations: 0, baseline: 0, ok: true },
    ],
    crosses: () => ['copy × unfolded'],
    unreached: () => ['payable/aging', 'readme/audit'],
    // The populations are what makes a guardian's finding MEET an atom: `accounting-wave 249` names
    // no atom, so on counts alone nothing can ever corroborate.
    populations: () => [
      { law: 'copy', members: ['readme/audit', 'utility/span'] },
      { law: 'mirror', members: ['readme/audit'] },
    ],
    boundary: () => [{ name: 'eu', state: 'unreachable' }, { name: 'bg', state: 'unchanged' }],
  }

  it('emits one lead per measured finding, and skips what is fine', () => {
    const leads = internalLeads(src)
    expect(leads.filter((l) => l.source === 'guardian')).toHaveLength(1) // the green axis is not a lead
    expect(leads.filter((l) => l.source === 'boundary')).toHaveLength(1) // `unchanged` is not a lead
    expect(leads).toHaveLength(8)
  })

  it('every lead names its target and scope — never re-extracted from the sentence', () => {
    for (const l of internalLeads(src)) {
      expect(l.target).toBeTruthy()
      expect(l.intent).toContain(l.target)
    }
  })

  it('every emitted intent is ranked ABOVE zero — an unrankable lead cannot be acted on', () => {
    for (const d of selfSufficientNext(src)) expect(d.rank).toBeGreaterThan(0)
  })

  it('needs nothing injected to be safe: no sources means no leads, never a throw', () => {
    expect(internalLeads()).toEqual([])
    expect(selfSufficientNext()).toEqual([])
  })

  it('crosses the sources, and a target two of them name is CORROBORATED', () => {
    const x = leadCross(internalLeads(src))
    expect(x.corroborated.map((c) => c.target)).toEqual(['readme/audit'])
    expect(x.corroborated[0]!.sources).toEqual(['law:copy', 'law:mirror', 'unreached'])
    expect(x.corroborated[0]!.scope).toBe('atom')
    // a target only one source names is never corroborated
    expect(x.corroborated.some((c) => c.target === 'payable/aging')).toBe(false)
    expect(x.corroborated.some((c) => c.target === 'utility/span')).toBe(false)
  })

  /**
   * The defect this replaced: the old cross compared an axis NAME against an atom PATH as one set, so
   * it could only ever report absence. The fixture had to name an atom `accounting-wave` to make the
   * assertion pass — evidence built to match, which is [[rules]]/mirror one atom over.
   */
  it('never corroborates ACROSS scopes — an axis name is not an atom path', () => {
    const x = leadCross([
      { source: 'guardian', scope: 'axis', target: 'unreached', intent: 'i', evidence: 'e' },
      { source: 'unreached', scope: 'atom', target: 'unreached', intent: 'i', evidence: 'e' },
    ])
    expect(x.corroborated).toEqual([])
    // and it says WHY: each is alone in its scope, so its silence is incomparability, not independence
    expect(x.incommensurable).toEqual(['guardian', 'unreached'])
    expect(x.orthogonal).toEqual([])
  })

  it('names the sources that meet nothing — independent signal, found by nobody else', () => {
    const x = leadCross(internalLeads(src))
    // boundary, cross and guardian are each ALONE in their scope: nothing to be crossed against
    expect(x.incommensurable).toEqual(['boundary', 'cross', 'guardian'])
    // within the atom scope, `unreached` meets the law populations, so nothing there is orthogonal
    expect(x.orthogonal).toEqual([])
    expect(x.scopes).toEqual({ axis: 1, atom: 3, boundary: 1, cross: 1 })
  })

  /**
   * The base-rate trap: a source naming most of the universe agrees with everything by chance. Here
   * `copy` holds 2 of the 3 atoms any law names, so its meeting `mirror` (1 atom) is EXPECTED at
   * 0.67 — and it measured 1, a lift of 1.5. A count alone would have called it a finding.
   */
  it('says whether an agreement beats chance, not merely that it happened', () => {
    const x = leadCross(internalLeads(src))
    for (const a of x.agreement) {
      expect(a.shared).toBeGreaterThan(0)
      expect(a.lift).toBeGreaterThan(0)
      // lift is the ratio the reader judges by; it must be derived, never the raw count restated
      expect(a.lift).toBeCloseTo(a.shared / a.expected, 10)
    }
    expect(x.agreement.some((a) => a.a === 'law:copy' && a.b === 'law:mirror')).toBe(true)
  })

  it('reports DIRECTIONAL containment: mirror sits wholly inside copy at the atom scope', () => {
    const x = leadCross(internalLeads(src))
    const m = x.carried.find((c) => c.source === 'law:mirror' && c.inside === 'law:copy')
    expect(m?.share).toBe(1)
    expect(m?.scope).toBe('atom')
  })
})
