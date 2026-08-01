import { describe, it, expect } from 'vitest'
import {
  amend,
  amendmentIsLegal,
  BITCOIN_GENESIS,
  constitutionDigest,
  constitutionDocument,
  getArticle,
  isNormativeAnchor,
  isUnconditional,
  judge,
  judgeAll,
  LAWS,
  noExpectation,
  noJudgment,
  oneWayEdges,
  prependToAgentPrompt,
  ROOT_RULES,
  unmeasuredRejections,
  verificationCost,
  violatedLaws,
  violatedRules,
  CONSTITUTION,
  type Change,
} from '@/constitution'

/**
 * A constitutional change — the reference fixture every law is measured against. Each field is the
 * obligation of exactly one law, so a test can knock out one field and watch that law, and only
 * that law, go red.
 */
const lawful: Change = {
  atom: 'fixture',
  dualities: [{ builds: 'compute', breaks: 'compute.adversarial' }],
  anchors: ['ISO/IEC 25010:2023 §5.5', `bitcoin:genesis:${BITCOIN_GENESIS}`],
  claims: [{ text: 'verification is always cheap', boundary: 'while the input closure stays sealed' }],
  axes: [{ name: 'build⊕break', ring: [1, 1] }],
  served: [{ result: 'coverage', recompute: 'src/constitution/index.ts' }],
  postings: [{ debit: 'gap', credit: 'seal', amount: 1 }],
  edges: [
    { from: 'erpax', to: 'reader' },
    { from: 'reader', to: 'erpax' },
  ],
  quantities: [{ name: 'coverage', value: 1, derivation: 'pnpm erpax rules check' }],
  keepers: [],
  seed: ['src/constitution/index.ts'],
}

/** The fixture with one obligation knocked out — the only way to test a gate is to make it fire. */
const without = (patch: Partial<Change>): Change => ({ ...lawful, ...patch })

// a unanimous, full-turnout polity
const unanimous = (n: number) => Array.from({ length: n }, (_, i) => ({ voter: 'v' + i, vote: 'for' as const }))

describe('constitution — the 0: society is sovereign, the foundation is entrenched', () => {
  it('the four integrity invariants are entrenched — even a unanimous polity cannot legalise corruption', () => {
    const r = amend('1-integrity', unanimous(1000), 1000) // 100% turnout, 100% for
    expect(r.allowed).toBe(false)
    expect(r.reason).toContain('entrenched')
  })

  it('one-person-one-vote and identity are likewise perpetual', () => {
    expect(amend('4-governance', unanimous(100), 100).allowed).toBe(false)
    expect(amend('0-identity', unanimous(100), 100).allowed).toBe(false)
  })

  it('a non-entrenched article IS amendable by a supermajority of the polity', () => {
    const r = amend('5-rights', unanimous(100), 100) // turnout 1.0, approval 1.0 ≥ 2/3
    expect(r.allowed).toBe(true)
    expect(r.reason).toContain('supermajority')
  })

  it('a non-entrenched amendment FAILS below the supermajority bar', () => {
    const ballots = [
      ...Array.from({ length: 55 }, (_, i) => ({ voter: 'y' + i, vote: 'for' as const })),
      ...Array.from({ length: 45 }, (_, i) => ({ voter: 'n' + i, vote: 'against' as const })),
    ]
    const r = amend('3-sovereignty', ballots, 100) // approval 0.55 < 2/3
    expect(r.allowed).toBe(false)
  })

  it('the constitution is whole — every article present, the integrity core entrenched', () => {
    expect(CONSTITUTION).toHaveLength(7)
    expect(getArticle('1-integrity')?.entrenched).toBe(true)
    expect(getArticle('2-conservation')?.entrenched).toBe(true)
  })
})

describe('constitution — the nine laws, each with its enforcing invariant', () => {
  it('a lawful change is SEALED — all nine hold at fraction 1', () => {
    const v = judge(lawful)
    expect(v.verdicts).toHaveLength(9)
    expect(v.holds).toBe(true)
    expect(v.sealed).toBe(true)
    expect(v.coverage).toBe(1)
    expect(violatedLaws(lawful)).toEqual([])
  })

  // ── 1 Duality ────────────────────────────────────────────────────────────────────────────────
  it('1 duality — a build with no adversarial counterpart is unsealed; coverage cannot reach 1', () => {
    const buildOnly = without({ dualities: [{ builds: 'compute' }] })
    const v = judge(buildOnly)
    const duality = v.verdicts.find((x) => x.law === 'duality')!
    expect(duality.holds).toBe(false)
    expect(duality.fraction).toBeLessThan(1)
    expect(duality.reason).toContain('build-only')
    expect(v.sealed).toBe(false)
    // and it fails CLOSED on the empty case — a change that builds nothing proves nothing
    expect(judge(without({ dualities: [] })).verdicts.find((x) => x.law === 'duality')!.holds).toBe(false)
  })

  // ── 2 Legality ───────────────────────────────────────────────────────────────────────────────
  it('2 legality — a flow with no valid normative anchor fails closed', () => {
    expect(judge(without({ anchors: [] })).holds).toBe(false)
    expect(violatedLaws(without({ anchors: [] }))).toContain('legality')
    expect(violatedLaws(without({ anchors: ['because I said so'] }))).toContain('legality')
    // the anchor families are real, and the genesis anchor must carry the real hash
    expect(isNormativeAnchor('RFC 9562 §5.8')).toBe(true)
    expect(isNormativeAnchor('NIST SP 800-63')).toBe(true)
    expect(isNormativeAnchor(`bitcoin:genesis:${BITCOIN_GENESIS}`)).toBe(true)
    expect(isNormativeAnchor('bitcoin:genesis:deadbeef')).toBe(false)
  })

  it('2 legality — the constitution is reformed only through the rules', () => {
    const unanimousPolity = unanimous(100)
    // an amendment that is itself unconstitutional never reaches the ballot
    const bad = amendmentIsLegal('5-rights', without({ anchors: [] }), unanimousPolity, 100)
    expect(bad.allowed).toBe(false)
    expect(bad.reason).toContain('legality')
    // a lawful amendment still cannot touch an entrenched article
    expect(amendmentIsLegal('1-integrity', lawful, unanimousPolity, 100).allowed).toBe(false)
    // a lawful amendment to a non-entrenched article passes the supermajority door
    expect(amendmentIsLegal('5-rights', lawful, unanimousPolity, 100).allowed).toBe(true)
  })

  // ── 3 Honest boundaries ──────────────────────────────────────────────────────────────────────
  it('3 boundary — an unconditional guarantee with no stated boundary blocks the build', () => {
    const naked = without({ claims: [{ text: 'forgery is impossible' }] })
    expect(judge(naked).holds).toBe(false)
    expect(violatedLaws(naked)).toContain('boundary')
    // the same claim WITH its open edge named passes
    expect(judge(without({ claims: [{ text: 'forgery is impossible', boundary: 'under the sealed-input assumption' }] })).holds).toBe(true)
    expect(isUnconditional('coverage is infinite')).toBe(true)
    expect(isUnconditional('coverage is 11/17')).toBe(false)
  })

  // ── 4 Balance ────────────────────────────────────────────────────────────────────────────────
  it('4 balance — a principle driven so hard it breaks its dual is caught; expansion is gated on the fraction', () => {
    const broken = without({ axes: [{ name: 'build⊕break', ring: [9, 0] }] })
    const v = judge(broken).verdicts.find((x) => x.law === 'balance')!
    expect(v.holds).toBe(false)
    expect(v.fraction).toBe(0)
    expect(v.reason).toContain('dual broken')
    // balance is a COMPUTED fraction, not a flag: 1 and 3 on one axis reads 1/3
    const lean = judge(without({ axes: [{ name: 'a⊕b', ring: [1, 3] }] })).verdicts.find((x) => x.law === 'balance')!
    expect(lean.fraction).toBeCloseTo(1 / 3, 10)
    expect(lean.holds).toBe(false)
  })

  // ── 5 Service ────────────────────────────────────────────────────────────────────────────────
  it('5 service — every served result ships a recompute path, or it is offered for belief', () => {
    const belief = without({ served: [{ result: 'trust score' }] })
    expect(violatedLaws(belief)).toContain('service')
    expect(judge(belief).verdicts.find((x) => x.law === 'service')!.reason).toContain('belief')
    // a prose promise is not a recompute path; a command or a module is
    expect(violatedLaws(without({ served: [{ result: 'x', recompute: 'trust me' }] }))).toContain('service')
    expect(judge(without({ served: [{ result: 'x', recompute: 'tsx src/constitution/index.ts' }] })).holds).toBe(true)
  })

  // ── 6 Conservation ───────────────────────────────────────────────────────────────────────────
  it('6 conservation — Σdebit = Σcredit; an unmatched extraction is caught', () => {
    const extraction = without({ postings: [{ debit: 'value', credit: '', amount: 5 }] })
    const v = judge(extraction).verdicts.find((x) => x.law === 'conservation')!
    expect(v.holds).toBe(false)
    expect(v.reason).toContain('unmatched extraction')
    // an imbalance is caught as a computed residual, not a boolean
    const skewed = without({
      postings: [
        { debit: 'a', credit: 'b', amount: 3 },
        { debit: 'c', credit: '', amount: 1 },
      ],
    })
    expect(judge(skewed).verdicts.find((x) => x.law === 'conservation')!.fraction).toBeLessThan(1)
    expect(judge(without({ postings: [] })).holds).toBe(false)
  })

  // ── 7 Reciprocity ────────────────────────────────────────────────────────────────────────────
  it('7 reciprocity — a one-way edge marks the pair unsealed; reciprocity = 1 or nothing', () => {
    const oneWay = without({ edges: [{ from: 'erpax', to: 'reader' }] })
    const v = judge(oneWay).verdicts.find((x) => x.law === 'reciprocity')!
    expect(v.holds).toBe(false)
    expect(v.fraction).toBe(0)
    expect(oneWayEdges(oneWay)).toEqual([{ from: 'erpax', to: 'reader' }])
    expect(oneWayEdges(lawful)).toEqual([])
    // half-mutual is half — the fraction is computed across bound edges
    const half = without({
      edges: [
        { from: 'a', to: 'b' },
        { from: 'b', to: 'a' },
        { from: 'a', to: 'c' },
      ],
    })
    expect(judge(half).verdicts.find((x) => x.law === 'reciprocity')!.fraction).toBeCloseTo(2 / 3, 10)
  })

  // ── 8 Reproducibility ────────────────────────────────────────────────────────────────────────
  it('8 reproducibility — a quantity with no executable derivation is rejected as hand-asserted', () => {
    const quoted = without({ quantities: [{ name: 'speedup', value: 1000 }] })
    const v = judge(quoted).verdicts.find((x) => x.law === 'reproducibility')!
    expect(v.holds).toBe(false)
    expect(v.reason).toContain('hand-asserted')
    // citing prose is not a derivation — only a command or a module in the tree
    expect(violatedLaws(without({ quantities: [{ name: 'x', value: 1, derivation: 'see the SKILL' }] }))).toContain(
      'reproducibility',
    )
    expect(judge(without({ quantities: [] })).holds).toBe(false)
  })

  // ── 9 Regeneration ───────────────────────────────────────────────────────────────────────────
  it('9 regeneration — single-keeper deps are flagged; no seed means nothing to regrow from', () => {
    const kept = without({ keepers: ['the one admin who holds the key'] })
    const v = judge(kept).verdicts.find((x) => x.law === 'regeneration')!
    expect(v.holds).toBe(false)
    expect(v.fraction).toBe(1 / 2)
    expect(v.reason).toContain('single keeper')
    expect(judge(without({ seed: [] })).verdicts.find((x) => x.law === 'regeneration')!.fraction).toBe(0)
  })

  it('9 regeneration — the corpus re-verifies from seed in O(N): nine evaluations per change, no cross-talk', () => {
    const corpus = (n: number): Change[] => Array.from({ length: n }, (_, i) => ({ ...lawful, atom: 'a' + i }))
    // the cost function IS the algorithm's shape: doubling the corpus doubles the work, exactly
    expect(verificationCost(corpus(100))).toBe(2 * verificationCost(corpus(50)))
    expect(verificationCost(corpus(50))).toBe(9 * 50)
    // and the pass actually emits that many verdicts — one per law per change, nothing quadratic
    const judged = judgeAll(corpus(50))
    expect(judged.flatMap((x) => x.verdicts)).toHaveLength(verificationCost(corpus(50)))
    expect(judged.every((x) => x.sealed)).toBe(true)
  })

  // ── the document ─────────────────────────────────────────────────────────────────────────────
  it('the document is computed from the articles and the laws, and heads the agent prompt', () => {
    const doc = constitutionDocument()
    for (const a of CONSTITUTION) expect(doc).toContain(a.title)
    for (const l of LAWS) expect(doc).toContain(l.statement)
    expect(doc).toContain(BITCOIN_GENESIS)
    // content-addressed: same document, same address
    expect(constitutionDigest()).toMatch(/^[0-9a-f]{64}$/)
    expect(constitutionDigest()).toBe(constitutionDigest())
    // and it goes FIRST — an anchor read after the act is a post-mortem
    const prompt = prependToAgentPrompt('do the work')
    expect(prompt.startsWith(doc)).toBe(true)
    expect(prompt.endsWith('do the work')).toBe(true)
    expect(prompt).toContain(constitutionDigest())
  })

  it('the nine laws are nine, each with a statement and an enforcing invariant', () => {
    expect(LAWS).toHaveLength(9)
    expect(new Set(LAWS.map((l) => l.id)).size).toBe(9)
    for (const l of LAWS) {
      expect(l.statement.length).toBeGreaterThan(0)
      expect(l.invariant.length).toBeGreaterThan(0)
    }
  })
})

describe('constitution — the two rules at the root, of which the nine are lemmas', () => {
  it('a lawful change satisfies both rules', () => {
    expect(noExpectation(lawful).holds).toBe(true)
    expect(noJudgment(lawful).holds).toBe(true)
    expect(violatedRules(lawful)).toEqual([])
    expect(judge(lawful).rules.map((r) => r.rule)).toEqual(['no-expectation', 'no-judgment'])
  })

  it('every law reduces to exactly one rule, and the two partition the nine', () => {
    const byRule = { 'no-expectation': 0, 'no-judgment': 0 } as Record<string, number>
    for (const l of LAWS) byRule[l.rule] += 1
    expect(byRule['no-expectation'] + byRule['no-judgment']).toBe(LAWS.length)
    expect(byRule['no-expectation']).toBeGreaterThan(0)
    expect(byRule['no-judgment']).toBeGreaterThan(0)
    // the lemmas under each rule ARE that rule's laws — the reduction, not a second list
    const v = judge(lawful)
    for (const r of v.rules) {
      expect(r.lemmas.map((l) => l.law)).toEqual(LAWS.filter((l) => l.rule === r.rule).map((l) => l.id))
    }
    expect(v.verdicts).toHaveLength(9)
  })

  // ── Rule 1 ───────────────────────────────────────────────────────────────────────────────────
  it('1 no expectation — an asserted-but-unproven quantity fails, and it fails AT THE RULE', () => {
    const overclaim = without({ quantities: [{ name: 'speedup', value: 1000 }] })
    expect(noExpectation(overclaim).holds).toBe(false)
    expect(noExpectation(overclaim).reason).toContain('reproducibility')
    expect(violatedRules(overclaim)).toEqual(['no-expectation'])
    // the OTHER rule is untouched — a broken lemma implicates its rule and no other
    expect(noJudgment(overclaim).holds).toBe(true)
  })

  it('1 no expectation — every claim must ship the command that recomputes it', () => {
    const belief = without({ served: [{ result: 'trust score' }] })
    expect(violatedRules(belief)).toEqual(['no-expectation'])
    // a claim with a real recompute command satisfies the rule
    expect(noExpectation(without({ served: [{ result: 'x', recompute: 'pnpm check' }] })).holds).toBe(true)
  })

  // ── Rule 2 ───────────────────────────────────────────────────────────────────────────────────
  it('2 no judgment — a rejection resting on expectation alone fails', () => {
    const judged = without({ rejections: [{ subject: 'the contributor’s design' }] })
    expect(noJudgment(judged).holds).toBe(false)
    expect(noJudgment(judged).reason).toContain('rejected on expectation alone')
    expect(violatedRules(judged)).toEqual(['no-judgment'])
    expect(unmeasuredRejections(judged)).toHaveLength(1)
    // prose is not a measurement — only a command or a module in the tree
    expect(noJudgment(without({ rejections: [{ subject: 'x', basis: 'it feels wrong' }] })).holds).toBe(false)
  })

  it('2 no judgment — DISCERNMENT is kept: a rejection citing a measurement is lawful', () => {
    const discerned = without({ rejections: [{ subject: 'the failing design', basis: 'pnpm check' }] })
    expect(noJudgment(discerned).holds).toBe(true)
    expect(unmeasuredRejections(discerned)).toEqual([])
    expect(judge(discerned).holds).toBe(true)
    // and a change that rejects NOTHING has nothing to condemn — the rule is satisfied, not vacated
    expect(unmeasuredRejections(lawful)).toEqual([])
    expect(noJudgment(lawful).holds).toBe(true)
  })

  it('the whole verdict IS the two rules — holds ⟺ both hold', () => {
    for (const c of [lawful, without({ quantities: [] }), without({ rejections: [{ subject: 's' }] })]) {
      expect(judge(c).holds).toBe(noExpectation(c).holds && noJudgment(c).holds)
    }
  })

  it('the two sentences head the document and every agent prompt', () => {
    const doc = constitutionDocument()
    expect(doc.startsWith(ROOT_RULES['no-expectation'])).toBe(true)
    expect(doc.split('\n')[1]).toBe(ROOT_RULES['no-judgment'])
    expect(doc).toContain('Discernment is kept')
    expect(prependToAgentPrompt('do the work').startsWith(ROOT_RULES['no-expectation'])).toBe(true)
    // each law names the rule it is a lemma of, in the document the agent reads
    for (const l of LAWS) expect(doc).toContain(`${l.title} [${l.rule}]`)
  })
})
