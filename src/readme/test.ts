/**
 * readme — the proof that the README is a diamond.
 *
 * Two properties carry the law:
 *   1. ZERO ENTROPY (stability) — the generator is deterministic: same tree ⇒
 *      identical bytes (run twice, byte-for-byte equal; render twice, equal).
 *   2. CONTENT-ADDRESSED — the README's uuid is a v8 content-uuid of its model;
 *      it is stable under regeneration and changes when the model changes (drift
 *      is detectable, the gate can fail closed).
 *   3. TYPOGRAPHY = THE DIAMOND — the rendered facets ARE the closed horo ring
 *      in measure-walk order (reading the README is reading the crystal).
 *
 * Pure unit test — no Payload, no network. It touches the generator's pure
 * surface (`renderReadme`, `readmeUuid`) on a fixed model AND the live pipeline
 * (`deriveModel`/`generateReadme`) which reads the static matrix + a fs walk.
 */
import { describe, it, expect } from 'vitest'
import { join } from 'node:path'
import { erpaxSelfAccount } from '@/accounting'
import {
  deriveModel,
  renderReadme,
  readmeUuid,
  cloudflareDeployButtonMarkdown,
  CLOUDFLARE_DEPLOY_REPO_URL,
  deriveFolderModel,
  deriveFolderAccounting,
  buildFolderReadmeContext,
  buildReadmeCorpusContext,
  buildReadmeTypographyGraph,
  renderFolderReadme,
  folderReadmeUuid,
  listAtomPaths,
  aggregateCorpusAnalytics,
  buildBindingsByAtom,
  type ReadmeModel,
  scientificPaperOf,
  scientificPaperOfTs,
  mergeCorpusPapers,
  paperUuid,
  emptyMergedPapers,
  collectCorpusPapers,
  renderMergedPapersSection,
  accountGapsAndSeals,
  toComparableUnit,
  assertGapsAccounted,
  assertSealsAccounted,
  aggregateCorpusEntropy,
  renderCorpusEntropySection,
  renderFolderEntropySection,
  loadAgentThinking,
  transformThinkingToQuantum,
  quantumThinkingOf,
  renderFolderQuantumThinkingSection,
  renderCorpusQuantumThinkingSection,
  aggregateCorpusQuantumThinking,
  emptyCorpusQuantumThinking,
  assertCorpusPathFollowGate,
  corpusPathFollowOpts,
  resetCorpusPathFollowCache,
  COMPARABLE_UNIT,
  LANDAUER_BIT,
  GAP_BASE_WEIGHT,
} from '@/readme'
import { followEveryPathAll } from '@/path'
import { deriveDiamond } from '@/diamond'
import { finishedIdeaCrossed } from '@/seal'
import { parseWranglerBindings } from '@/cloudflare'
import { readFileSync, existsSync } from 'node:fs'
import { conserves } from '@/conservation'
import { HORO_DIGITS, HORO_MEASURE } from '@/horo'
import { UUID_MATRIX_ROOT } from '@/uuid/matrix'

const FIXED: ReadmeModel = {
  name: 'erpax',
  description: 'a fixed model for the pure render test',
  version: '1.0.0',
  license: 'MIT',
  corpusRoot: UUID_MATRIX_ROOT,
  atoms: 3,
  bonds: 2,
  skills: 3,
  index: 1,
  tests: 1,
  ring: HORO_DIGITS.map((digit, i) => ({
    digit,
    measure: HORO_MEASURE[i]!,
    atoms: i,
    facets: ['alpha', 'beta'],
  })),
  axis: [
    { digit: 3, atoms: 5 },
    { digit: 6, atoms: 7 },
  ],
  scripts: [['readme', 'tsx src/readme/index.ts']],
  payload: ['payload 4.0.0'],
  stack: ['zod 3.25.76'],
  node: 'node >=20',
  analytics: {
    folderCount: 3,
    sealed: 1,
    balanced: 3,
    meanBondDegree: 4.5,
    totalVariance: 0,
    withBindings: 0,
    distinctStandards: 2,
    byHoro: [{ digit: 1, measure: 'base', atoms: 1, sealed: 1 }],
    entropy: {
      unit: 'eb',
      totalGapEb: 0,
      totalSealEb: 3,
      netEntropyEb: -3,
      sealGapRatio: 1,
      sealedMass: 1,
      unsealedMass: 2,
      bySector: [{ partition: 'readme', folders: 1, gapEb: 0, sealEb: 3, netEb: -3 }],
    },
    quantumThinking: emptyCorpusQuantumThinking(),
  },
  papers: emptyMergedPapers(),
}

describe('readme — the README is a diamond', () => {
  it('renderReadme includes For AI assistants entry block', () => {
    const md = renderReadme(FIXED)
    expect(md).toContain('## For AI assistants')
    expect(md).toContain('.claude/skills/SKILL.md')
    expect(md).toContain('https://github.com/erpax/erpax')
  })

  it('renderReadme is PURE and STABLE: same model ⇒ byte-identical markdown', () => {
    expect(renderReadme(FIXED)).toBe(renderReadme(FIXED))
  })

  it('readmeUuid is a conformant v8 content-uuid, stable under recomputation', () => {
    const u = readmeUuid(FIXED)
    expect(u).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-8[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
    expect(readmeUuid(FIXED)).toBe(u)
  })

  it('the uuid is content-addressed: a model change yields a different uuid (drift detectable)', () => {
    const drifted: ReadmeModel = { ...FIXED, atoms: FIXED.atoms + 1 }
    expect(readmeUuid(drifted)).not.toBe(readmeUuid(FIXED))
  })

  it('embeds its own content-uuid in the rendered diamond (the seal)', () => {
    const md = renderReadme(FIXED)
    expect(md).toContain(readmeUuid(FIXED))
    expect(md).toContain(FIXED.corpusRoot) // the corpus root seal (computed matrix root)
  })

  it('prominently embeds the Cloudflare Deploy button after the description', () => {
    const md = renderReadme(FIXED)
    const desc = md.indexOf('> a fixed model for the pure render test')
    const button = md.indexOf(cloudflareDeployButtonMarkdown())
    const diamond = md.indexOf('## the diamond')
    expect(button).toBeGreaterThan(desc)
    expect(button).toBeLessThan(diamond)
    expect(cloudflareDeployButtonMarkdown()).toContain(encodeURIComponent(CLOUDFLARE_DEPLOY_REPO_URL))
  })

  it('TYPOGRAPHY = the diamond: facets are the closed horo ring in measure-walk order', () => {
    const md = renderReadme(FIXED)
    // Every measure name appears as a facet row, in order, after the ring header.
    const ringHeader = md.indexOf('| digit | measure | atoms | principal facets |')
    expect(ringHeader).toBeGreaterThan(-1)
    let cursor = ringHeader
    for (let i = 0; i < HORO_MEASURE.length; i++) {
      const row = md.indexOf(`| ${HORO_DIGITS[i]} | ${HORO_MEASURE[i]} |`, cursor)
      expect(row).toBeGreaterThan(cursor)
      cursor = row
    }
  })

  it('deriveModel reads the LIVE tree: a complete, sane projection', () => {
    const m = deriveModel()
    expect(m.atoms).toBeGreaterThan(0)
    expect(m.bonds).toBeGreaterThan(0)
    expect(m.skills).toBeGreaterThan(0)
    expect(m.index).toBeGreaterThan(0)
    expect(m.tests).toBeGreaterThan(0)
    expect(m.ring).toHaveLength(HORO_DIGITS.length)
    expect(m.ring.map((r) => r.digit)).toEqual([...HORO_DIGITS])
    expect(m.corpusRoot).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('deriveModel includes corpus analytics rollup', () => {
    const m = deriveModel()
    expect(m.analytics.folderCount).toBeGreaterThan(100)
    expect(m.analytics.byHoro.length).toBeGreaterThan(0)
    expect(m.analytics.distinctStandards).toBeGreaterThan(10)
  })

  it('ZERO ENTROPY: renderReadme on deriveModel is byte-identical', () => {
    const m = deriveModel()
    expect(renderReadme(m)).toBe(renderReadme(m))
  })
})

describe('readme — per-folder debit/credit statement', () => {
  it('deriveFolderModel is computed from the live tree', () => {
    const m = deriveFolderModel('readme')
    expect(m.atomPath).toBe('readme')
    expect(m.form).toBe(1)
    expect(m.code).toBe(1)
    expect(m.statement.debits.length).toBeGreaterThan(0)
    expect(m.statement.credits.length).toBeGreaterThan(0)
  })

  it('deriveFolderAccounting uses [[conservation]] — balanced ⇔ Σdebit = Σcredit', () => {
    const m = deriveFolderModel('readme')
    const stmt = deriveFolderAccounting(m)
    expect(stmt.totalDebits - stmt.totalCredits).toBe(stmt.variance)
    const ledger = stmt.debits
      .map((d) => ({ debit: d.amount, credit: 0 }))
      .concat(stmt.credits.map((c) => ({ debit: 0, credit: c.amount })))
    expect(stmt.balanced).toBe(conserves(ledger))
    expect(stmt.debits.some((d) => d.account.includes('[[asset]]'))).toBe(true)
    expect(stmt.credits.some((c) => c.account.includes('[[liability]]'))).toBe(true)
  })

  it('renderReadme includes [[pivot]] when folder models are supplied', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const models = ['readme', 'seal'].map((p) => deriveFolderModel(p, process.cwd(), ctx, graph))
    const md = renderReadme(FIXED, models)
    expect(md).toContain('## [[pivot]]')
    expect(md).toContain('### [[seal]]')
    expect(md).toContain('| state | count | share % |')
  })

  it('renderFolderReadme is stable and renders debit · credit table', () => {
    const m = deriveFolderModel('readme')
    const md = renderFolderReadme(m)
    expect(renderFolderReadme(m)).toBe(md)
    expect(md).toContain('## [[debit]] · [[credit]]')
    expect(md).toContain('| [[debit]] | [[credit]] |')
    expect(md).toContain('[[asset]]/[[trinity]]/form')
    expect(md).toContain('[[conservation]]')
    expect(md).toContain(folderReadmeUuid(m))
  })

  it('lists atom paths from SKILL.md walk', () => {
    expect(listAtomPaths().length).toBeGreaterThan(100)
    expect(listAtomPaths()).toContain('readme')
  })

  it('renderFolderReadme includes pivot gate tables', () => {
    const m = deriveFolderModel('readme')
    const md = renderFolderReadme(m)
    expect(md).toContain('## [[pivot]]')
    expect(md).toContain('### [[seal]]')
  })

  it('renderFolderReadme includes typography graph frame', () => {
    const graph = buildReadmeTypographyGraph()
    const ctx = buildFolderReadmeContext(join(process.cwd(), 'src'))
    const m = deriveFolderModel('typography', process.cwd(), ctx, graph)
    const md = renderFolderReadme(m)
    expect(md).toContain('## typography graph')
    expect(md).toContain('partition `typography`')
    expect(m.typography.graphRoot).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('sealed sample atom has balanced debit/credit journal', () => {
    const graph = buildReadmeTypographyGraph()
    const ctx = buildFolderReadmeContext(join(process.cwd(), 'src'))
    const sealed = deriveFolderModel('typography', process.cwd(), ctx, graph)
    if (!sealed.sealed) return
    const stmt = sealed.statement
    const ledger = stmt.debits
      .map((d) => ({ debit: d.amount, credit: 0 }))
      .concat(stmt.credits.map((c) => ({ debit: 0, credit: c.amount })))
    expect(stmt.balanced).toBe(true)
    expect(conserves(ledger)).toBe(true)
    expect(stmt.totalDebits).toBe(stmt.totalCredits)
  })

  it('buildReadmeTypographyGraph merges wikilink and analysis edges', () => {
    const g = buildReadmeTypographyGraph()
    expect(g.wikilinkCount).toBeGreaterThan(100)
    expect(g.analysisCount).toBeGreaterThan(0)
    expect(g.organs.length).toBeGreaterThanOrEqual(8)
  })

  it('cloudflare atom README lists wrangler bindings', () => {
    const ctx = buildReadmeCorpusContext()
    const m = deriveFolderModel('cloudflare', process.cwd(), ctx)
    const md = renderFolderReadme(m)
    expect(m.bindings.length).toBeGreaterThan(20)
    expect(md).toContain('## [[cloudflare]] bindings')
    expect(md).toContain('d1_databases')
    expect(md).toContain('## analytics')
  })

  it('readme atom cites standards from banners', () => {
    const ctx = buildReadmeCorpusContext()
    const m = deriveFolderModel('readme', process.cwd(), ctx)
    expect(m.standards.some((s) => s.id.includes('RFC 9562'))).toBe(true)
    expect(renderFolderReadme(m)).toContain('## [[standards]]')
  })

  it('empty or incomplete folders are not sealed', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const incomplete = deriveFolderModel('agents/mcp', process.cwd(), ctx, graph)
    expect(incomplete.code).toBe(1)
    expect(incomplete.proof).toBe(1)
    expect(incomplete.sealed).toBe(false)
    const stray = deriveFolderModel('skill/router', process.cwd(), ctx, graph)
    expect(stray.sealed).toBe(false)
    const vocab = deriveFolderModel('law', process.cwd(), ctx, graph)
    if (vocab.code === 0 && vocab.form === 1) expect(vocab.sealed || !vocab.folded).toBeTruthy()
  })

  it('incomplete readme exerts no gravity — sealed false, balanced false, variance ≠ 0, no graph bond weight', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const m = deriveFolderModel('card', process.cwd(), ctx, graph)
    expect(m.code).toBe(1)
    expect(m.proof).toBe(0)
    expect(m.sealed).toBe(false)
    expect(m.statement.balanced).toBe(false)
    expect(m.statement.variance).toBeGreaterThan(0)
    expect(m.typography.bondDegree).toBe(0)
    expect(m.analytics.balanced).toBe(0)
    expect(m.analytics.sealed).toBe(0)
  })

  it('diamond membership stray forbids gravity even when trinity complete', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const m = deriveFolderModel('agents/mcp', process.cwd(), ctx, graph)
    expect(m.sealed).toBe(false)
    expect(m.statement.balanced).toBe(false)
    expect(m.statement.variance).toBeGreaterThan(0)
    expect(m.typography.bondDegree).toBe(0)
  })

  it('sealed atoms have pure diamond membership', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const sample = ['law/folder', 'trading/api', 'readme', 'seal']
    for (const p of sample) {
      const m = deriveFolderModel(p, process.cwd(), ctx, graph)
      if (m.sealed) {
        expect(m.form).toBe(1)
        if (m.code) expect(m.proof).toBe(1)
      }
    }
  })

  it('aggregateCorpusAnalytics is deterministic on a fixed slice', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const sample = ['readme', 'cloudflare', 'database', 'standards', 'horo']
    const models = sample.map((p) => deriveFolderModel(p, process.cwd(), ctx, graph))
    expect(aggregateCorpusAnalytics(models)).toEqual(aggregateCorpusAnalytics(models))
  })

  it('buildBindingsByAtom maps TYPE_LINKS atoms', () => {
    const text = readFileSync(join(process.cwd(), 'wrangler.jsonc'), 'utf8')
    const map = buildBindingsByAtom(parseWranglerBindings(text))
    expect((map.get('database') ?? []).some((b) => b.name === 'D1')).toBe(true)
  })

  it('seal propagation: phantom prefix forbids sealed descendants (skill/router)', () => {
    const ctx = buildReadmeCorpusContext()
    const m = deriveFolderModel('skill/router', process.cwd(), ctx)
    expect(existsSync(join(process.cwd(), 'src/skill/SKILL.md'))).toBe(false)
    expect(m.sealed).toBe(false)
  })

  it('seal propagation: nested child inherits parent seal (law/folder)', () => {
    const ctx = buildReadmeCorpusContext()
    const parent = deriveFolderModel('law', process.cwd(), ctx)
    const child = deriveFolderModel('law/folder', process.cwd(), ctx)
    if (parent.sealed) expect(child.sealed).toBe(true)
    else expect(child.sealed).toBe(false)
  })
})

const SAMPLE_SKILL = `---
name: sample
description: Use when testing paper extraction — a fixed SKILL fixture.
contentUuid: "aaaaaaaa-bbbb-8ccc-dddd-eeeeeeeeeeee"
standards:
  - "RFC 9562"
---
# sample

First paragraph of the atom body for abstract fallback.

## Usage

\`\`\`
pnpm test
\`\`\`

**Law — [[law]]: sample law line for proof detection.**

@standard RFC 9562 §5.8
@see [[readme]] · [[law]]
`

const SAMPLE_INDEX_TS = `/**
 * sample — exports for paper extraction test.
 * @standard RFC 9562
 */
import { toUuid } from '@/uuid/matrix'

export function sampleFn(): string {
  return 'ok'
}

export const SAMPLE = 1
`

const SAMPLE_TEST_TS = `import { describe, it, expect } from 'vitest'
import { sampleFn } from './index'

describe('sample', () => {
  it('works', () => {
    expect(sampleFn()).toBe('ok')
  })
})
`

describe('readme — scientific papers (MD + TS)', () => {
  it('scientificPaperOf extracts MD sections from SKILL.md', () => {
    const p = scientificPaperOf(SAMPLE_SKILL, 'src/sample/SKILL.md', true)
    expect(p.medium).toBe('md')
    expect(p.kind).toBe('SKILL')
    expect(p.title).toBe('sample')
    expect(p.abstract).toContain('Use when testing paper extraction')
    expect(p.methods).toContain('pnpm test')
    expect(p.results).toContain('sample law line')
    expect(p.references).toContain('RFC 9562')
    expect(p.uuid).toBe('aaaaaaaa-bbbb-8ccc-dddd-eeeeeeeeeeee')
    expect(p.proof).toBe(true)
    expect(p.gravity).toBe(true)
  })

  it('scientificPaperOfTs extracts hypothesis · methods · results · proof', () => {
    const index = scientificPaperOfTs(SAMPLE_INDEX_TS, 'src/sample/index.ts', true, { hasTest: true })
    expect(index.medium).toBe('ts')
    expect(index.kind).toBe('index')
    expect(index.abstract).toContain('sampleFn')
    expect(index.methods).toContain('@/uuid/matrix')
    expect(index.results).toContain('2 exported')
    expect(index.proof).toBe(true)
    expect(index.references.some((r) => r.includes('RFC 9562'))).toBe(true)

    const test = scientificPaperOfTs(SAMPLE_TEST_TS, 'src/sample/test.ts', false, { hasIndex: true })
    expect(test.kind).toBe('test')
    expect(test.results).toContain('test blocks')
    expect(test.proof).toBe(true)
  })

  it('mergeCorpusPapers folds MD + TS with gravity-gated references', () => {
    const md = scientificPaperOf(SAMPLE_SKILL, 'src/sample/SKILL.md', true)
    const ts = scientificPaperOfTs(SAMPLE_INDEX_TS, 'src/sample/index.ts', false)
    const merged = mergeCorpusPapers([md, ts])
    expect(merged.total).toBe(2)
    expect(merged.md.total).toBe(1)
    expect(merged.ts.total).toBe(1)
    expect(merged.distinctReferences).toContain('RFC 9562')
    expect(merged.gravityHeld).toBe(1)
  })

  it('paperUuid is stable and content-addressed', () => {
    const p = scientificPaperOf(SAMPLE_SKILL, 'src/sample/SKILL.md')
    expect(paperUuid(p)).toBe(paperUuid(p))
    expect(paperUuid(p)).toMatch(/^[0-9a-f-]{36}$/)
  })

  it('renderReadme includes merged papers when model carries corpus rollup', () => {
    const merged = mergeCorpusPapers([
      scientificPaperOf(SAMPLE_SKILL, 'src/sample/SKILL.md', true),
      scientificPaperOfTs(SAMPLE_INDEX_TS, 'src/sample/index.ts', true, { hasTest: true }),
    ])
    const model: ReadmeModel = { ...FIXED, papers: merged }
    const md = renderReadme(model)
    expect(md).toContain('## the corpus — merged papers')
    expect(md).toContain('scientificPaperOfTs')
    expect(renderMergedPapersSection(merged)).toContain('MD **1** · TS **1**')
  })

  it('collectCorpusPapers gathers MD + TS from a live atom slice', () => {
    const ctx = buildReadmeCorpusContext()
    const sample = ['readme', 'law', 'seal', 'accounting', 'horo']
    const models = sample.map((p) => deriveFolderModel(p, process.cwd(), ctx))
    const sealed = new Map(models.map((m) => [m.atomPath, m.sealed]))
    const papers = collectCorpusPapers(process.cwd(), sealed, sample)
    const merged = mergeCorpusPapers(papers)
    expect(papers.length).toBeGreaterThan(sample.length * 2)
    expect(merged.md.byKind.SKILL).toBe(sample.length)
    expect(merged.ts.byKind.index).toBeGreaterThanOrEqual(1)
    expect(papers.some((p) => p.path === 'src/readme/SKILL.md' && p.proof)).toBe(true)
    expect(papers.some((p) => p.path === 'src/readme/index.ts' && p.medium === 'ts')).toBe(true)
  })

  it('renderReadme includes corpus entropy rollup in comparable units', () => {
    const md = renderReadme(FIXED)
    expect(md).toContain('## corpus entropy')
    expect(md).toContain('gap mass `0` eb')
    expect(renderCorpusEntropySection(FIXED.analytics.entropy)).toContain(COMPARABLE_UNIT)
  })
})

describe('readme — entropy gaps · seals (comparable units)', () => {
  it('toComparableUnit maps different gap types to the same eb scale', () => {
    const trinity = toComparableUnit({ side: 'gap', category: 'trinity', amount: 1 })
    const stray = toComparableUnit({ side: 'gap', category: 'stray', amount: 1 })
    const unfolded = toComparableUnit({ side: 'gap', category: 'unfolded', amount: 1 })
    expect(trinity).toBeGreaterThan(stray)
    expect(unfolded).toBeGreaterThan(stray)
    expect(trinity + stray + unfolded).toBeGreaterThan(trinity)
  })

  it('seal credits offset gap debits on a sealed sample folder', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const m = deriveFolderModel('seal', process.cwd(), ctx, graph)
    const acct = m.entropy
    expect(acct.unit).toBe('eb')
    expect(acct.totalSealEb).toBeGreaterThan(0)
    if (m.sealed) {
      expect(acct.netEntropyEb).toBeLessThanOrEqual(0)
      expect(acct.seals.some((s) => s.category === 'diamond')).toBe(true)
    }
  })

  it('incomplete folder posts gap debits and stays unsealed', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const m = deriveFolderModel('card', process.cwd(), ctx, graph)
    expect(m.entropy.totalGapEb).toBeGreaterThan(0)
    expect(m.sealed).toBe(false)
    expect(m.statement.balanced).toBe(false)
  })

  it('accountGapsAndSeals sums trinity + stray gaps in comparable units', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const incomplete = deriveFolderModel('agents/mcp', process.cwd(), ctx, graph)
    const acct = accountGapsAndSeals({
      atomPath: incomplete.atomPath,
      form: incomplete.form,
      code: incomplete.code,
      proof: incomplete.proof,
      horo: incomplete.horo,
      sealed: incomplete.sealed,
      statement: incomplete.statement,
      typography: incomplete.typography,
      membershipViolations: [],
      crossImpurities: ['trinity.proof missing (test.ts)', 'not folded into matrix'],
      membershipOk: true,
      gravityHeld: false,
    })
    expect(acct.totalGapEb).toBeGreaterThan(GAP_BASE_WEIGHT.trinity! + GAP_BASE_WEIGHT.unfolded!)
  })

  it('cross-folder comparison: sealed folder net eb ≤ incomplete folder net eb', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const sealed = deriveFolderModel('seal', process.cwd(), ctx, graph)
    const incomplete = deriveFolderModel('card', process.cwd(), ctx, graph)
    expect(sealed.entropy.netEntropyEb).toBeLessThan(incomplete.entropy.netEntropyEb)
  })

  it('aggregateCorpusEntropy rolls up sample slice in eb', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const sample = ['readme', 'seal', 'card', 'cloudflare']
    const models = sample.map((p) => deriveFolderModel(p, process.cwd(), ctx, graph))
    const rollup = aggregateCorpusEntropy(models)
    expect(rollup.unit).toBe('eb')
    expect(rollup.totalGapEb).toBeGreaterThan(0)
    expect(rollup.bySector.length).toBeGreaterThan(0)
    expect(rollup.sealedMass + rollup.unsealedMass).toBe(sample.length)
  })

  it('renderFolderReadme includes entropy gaps · seals section', () => {
    const m = deriveFolderModel('readme')
    const md = renderFolderReadme(m)
    expect(md).toContain('## [[entropy]] — gaps · seals')
    expect(md).toContain('eb')
    expect(md).toContain(renderFolderEntropySection(m.entropy, m.atomPath).slice(0, 40))
  })

  it('renderFolderReadme shows account code header on balance sheet', () => {
    const m = deriveFolderModel('seal')
    const md = renderFolderReadme(m)
    expect(md).toContain('> account code `seal`')
    expect(md).toContain('currency `eb`')
    expect(md).toContain('## [[debit]] · [[credit]]')
  })

  it('entropy section postings match erpaxSelfAccount net and totals', () => {
    const ctx = buildReadmeCorpusContext()
    const graph = buildReadmeTypographyGraph()
    const m = deriveFolderModel('seal', process.cwd(), ctx, graph)
    const section = renderFolderEntropySection(m.entropy, m.atomPath)
    const doc = erpaxSelfAccount(m)
    expect(section).toContain(`> account code \`${m.atomPath}\``)
    expect(section).toContain(`Σ gap \`${m.entropy.totalGapEb}\` eb`)
    expect(section).toContain(`Σ seal \`${m.entropy.totalSealEb}\` eb`)
    expect(section).toContain(`net residual \`${m.entropy.netEntropyEb}\` eb`)
    expect(doc.netEntropyEb).toBe(m.entropy.netEntropyEb)
    expect(doc.accountCode).toBe(m.atomPath)
    expect(doc.currency).toBe('eb')
    expect(doc.isBalanced).toBe(true)
  })

  it('assertGapsAccounted fails closed on silent impurities', () => {
    const acct = accountGapsAndSeals({
      atomPath: 'x',
      form: 1,
      code: 0,
      proof: 0,
      horo: null,
      sealed: false,
      statement: { debits: [], credits: [], balanced: false, variance: 1 },
      typography: { partition: 'x', partitionRoot: '' },
      crossImpurities: [],
    })
    const v = assertGapsAccounted(acct, ['trinity.proof missing (test.ts)'])
    expect(v.accounted).toBe(false)
    expect(v.silent.length).toBeGreaterThan(0)
  })

  it('assertGapsAccounted fails closed when sealed atom retains gap lines', () => {
    const acct = accountGapsAndSeals({
      atomPath: 'seal',
      form: 1,
      code: 1,
      proof: 1,
      horo: 1,
      sealed: true,
      statement: {
        debits: [],
        credits: [{ account: '[[liability]]/[[trinity]]/proof', amount: 1 }],
        balanced: false,
        variance: 1,
      },
      typography: { partition: 'seal', partitionRoot: 'abc' },
      crossImpurities: ['trinity.proof missing (test.ts)'],
    })
    expect(acct.gaps.length).toBeGreaterThan(0)
    const open = assertGapsAccounted(acct, [], { sealed: false })
    expect(open.accounted).toBe(true)
    const v = assertGapsAccounted(acct, [], { sealed: true })
    expect(v.accounted).toBe(false)
    expect(v.silent.some((s) => s.startsWith('sealed gap line:'))).toBe(true)
  })

  it('assertSealsAccounted requires diamond seal credit when sealed', () => {
    const acct = accountGapsAndSeals({
      atomPath: 'seal',
      form: 1,
      code: 1,
      proof: 1,
      horo: 1,
      sealed: true,
      statement: { debits: [], credits: [], balanced: true, variance: 0 },
      typography: { partition: 'seal', partitionRoot: 'abc' },
    })
    expect(assertSealsAccounted(acct, true).accounted).toBe(true)
    expect(LANDAUER_BIT).toBe(1)
  })
})

describe('readme — quantum thinking (load → transform → render)', () => {
  const cwd = process.cwd()

  it('loadAgentThinking gathers path ledger + session + improve receipts for quantum/emr', () => {
    const m = deriveFolderModel('quantum/emr', cwd, buildReadmeCorpusContext(cwd))
    const thinking = loadAgentThinking('quantum/emr', cwd, { pathLedger: corpusPathFollowOpts().pathLedger }, m)
    expect(thinking.atomPath).toBe('quantum/emr')
    expect(thinking.pathLedger.length).toBeGreaterThanOrEqual(1)
    expect(thinking.receipts.some((r) => r.kind === 'path.ledger')).toBe(true)
    expect(thinking.decisions.some((d) => d.startsWith('law:'))).toBe(true)
  })

  it('transformThinkingToQuantum emits superposition · collapse · seal', () => {
    const m = deriveFolderModel('quantum/emr', cwd, buildReadmeCorpusContext(cwd))
    const thinking = loadAgentThinking('quantum/emr', cwd, { pathLedger: corpusPathFollowOpts().pathLedger }, m)
    const block = transformThinkingToQuantum(thinking, 'quantum/emr', m.sealed)
    expect(block.superposition.length).toBeGreaterThan(0)
    expect(block.collapse.length).toBeGreaterThan(0)
    expect(block.seal.pathFollow).toBe(true)
    expect(block.seal.entryUuids.length).toBeGreaterThan(0)
  })

  it('quantumThinkingOf integrates in deriveFolderModel single pass', () => {
    const m = deriveFolderModel('quantum/emr', cwd, buildReadmeCorpusContext(cwd))
    expect(m.quantumThinking.atomPath).toBe('quantum/emr')
    expect(m.quantumThinking.superposition.length).toBeGreaterThan(0)
    expect(m.quantumThinking.collapse.some((c) => c.startsWith('law:'))).toBe(true)
  })

  it('renderFolderReadme includes ## quantum thinking before entropy', () => {
    const m = deriveFolderModel('quantum/emr', cwd, buildReadmeCorpusContext(cwd))
    const md = renderFolderReadme(m)
    const qIdx = md.indexOf('## quantum thinking')
    const eIdx = md.indexOf('## [[entropy]]')
    expect(qIdx).toBeGreaterThan(-1)
    expect(eIdx).toBeGreaterThan(qIdx)
    expect(md).toContain(renderFolderQuantumThinkingSection(m.quantumThinking).slice(0, 30))
  })

  it('aggregateCorpusQuantumThinking rolls up folder blocks', () => {
    const ctx = buildReadmeCorpusContext(cwd)
    const emr = deriveFolderModel('quantum/emr', cwd, ctx)
    const readme = deriveFolderModel('readme', cwd, ctx)
    const rollup = aggregateCorpusQuantumThinking([
      { atomPath: emr.atomPath, quantumThinking: emr.quantumThinking, typography: emr.typography },
      { atomPath: readme.atomPath, quantumThinking: readme.quantumThinking, typography: readme.typography },
    ])
    expect(rollup.atomsWithThinking).toBeGreaterThanOrEqual(2)
    expect(rollup.totalSuperposition).toBeGreaterThan(0)
    expect(renderCorpusQuantumThinkingSection(rollup)).toContain('corpus quantum thinking')
  })

  it('renderReadme includes corpus quantum thinking rollup', () => {
    const corpus = buildReadmeCorpusContext(cwd)
    const models = ['quantum/emr', 'readme'].map((p) => deriveFolderModel(p, cwd, corpus))
    const analytics = aggregateCorpusAnalytics(models)
    const model = deriveModel(cwd, analytics)
    const md = renderReadme(model)
    expect(md).toContain('## corpus quantum thinking')
    expect(md).toContain('superposition mass')
  })
})

describe('readme — path-follow gravity gate', () => {
  it('assertCorpusPathFollowGate — full lattice walk passes', () => {
    resetCorpusPathFollowCache()
    const gate = assertCorpusPathFollowGate('2026-06-08T12:00:00.000Z')
    expect(gate.followed).toBe(true)
    expect(gate.coverage).toBe(1)
    expect(gate.missing).toEqual([])
  })

  it('corpusPathFollowOpts pairs followEveryPathAll with canonical ledger', () => {
    resetCorpusPathFollowCache()
    const { pathsVisited, pathLedger } = corpusPathFollowOpts('2026-06-08T12:00:00.000Z')
    expect(pathsVisited.size).toBe(followEveryPathAll().length)
    expect(pathLedger).toHaveLength(followEveryPathAll().length)
    expect(pathLedger[0]!.prevEntryUuid).toBeNull()
    expect(pathLedger[1]!.prevEntryUuid).toBe(pathLedger[0]!.entryUuid)
  })

  it('finishedIdeaCrossed with full lattice walk has no path lattice impurity', () => {
    const pathsVisited = new Set(followEveryPathAll())
    const diamond = deriveDiamond('path')
    const cross = finishedIdeaCrossed(diamond, { pathsVisited })
    expect(cross.impurities.some((i) => i.includes('path lattice'))).toBe(false)
  })
})
