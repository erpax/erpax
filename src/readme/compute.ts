/**
 * readme/compute — derive*, render, analytics, computed faces (pure compute hub).
 *
 * All matter-twin logic extracted from index.ts per bindings-only law (d1840104).
 * The index face re-exports this module; CLI stays in ../index.ts.
 *
 * @see ../index.ts — ./paper — ./entropy — ./quantum-thinking
 */
import { readFileSync, writeFileSync, readdirSync, lstatSync, existsSync, mkdirSync, type Dirent } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { createHash } from 'node:crypto'
import {
  UUID_MATRIX_NODES,
  UUID_MATRIX_EDGES,
  UUID_MATRIX_ROOT,
  toUuid,
  nodeOf,
  neighborsOf,
  backlinksOf,
  horoCrossed,
} from '@/uuid/matrix'
import { HORO_DIGITS, horoMeasureOf } from '@/horo'
import { walkSkills, LINK_RE, stripCode, crossSeals } from '@/aura'
import { computeBoundary } from '@/quantum/boundary'
import {
  cloudflareAiAccountingExtras,
  isAiRelatedBinding,
  atomsLinkedByBindingType,
  bindingAtomPath,
  parseWranglerBindings,
  type WranglerBindingEntry,
} from '@/cloudflare'
import { STANDARDS_CATALOGUE } from '../standards/catalogue'
import {
  buildAnalysisTypographyGraph,
  atomTypographyContext,
  type AnalysisTypographyGraph,
  type AtomImpuritySignals,
  type SkillPage,
} from '@/typography'
import { conserves, trialBalance } from '@/conservation'
import { sealPropagatedFromAncestors } from '@/seal'
import { folderMatterState, folderMatterComplete, type FolderMatterState } from '@/law/folder/matter'
import { diamondMembershipOk, diamondMembershipViolations } from '@/diamond/membership'
import {
  computeDiamond,
  deploymentFaces,
  diamondUuid,
  renderDiamondJson,
  type DiamondModel,
} from '@/diamond'
import { renderGithubBrowseNote } from '@/navigation/github-browse'
import {
  horoPivotTable,
  trinityCorpusRollup,
  renderRootPivotHub,
  pivotFolderStats,
  pivotSingleFolder,
  renderPivotTable,
  renderPivotMarkdown,
  type HoroPivotRow,
  type ControlAxisFacet,
} from '@/pivot'
import { deriveOrientSection, plainLanguageOf, bondWordsOf, skillDescriptionOf } from './derive-prose'
import { scientificPaperOf } from './paper'
import {
  collectCorpusPapers,
  emptyMergedPapers,
  mergeCorpusPapers,
  renderMergedPapersSection,
  type MergedCorpusPapers,
} from './paper'
import {
  accountGapsAndSeals,
  aggregateCorpusEntropy,
  mergeCorpusEntropy,
  renderCorpusEntropySection,
  renderFolderEntropySection,
  type CorpusEntropyRollup,
  type FolderEntropyAccounting,
  type CorpusEntropyRenderOpts,
} from './entropy'
import {
  aggregateCorpusQuantumThinking,
  emptyCorpusQuantumThinking,
  mergeCorpusQuantumThinking,
  quantumThinkingOf,
  renderCorpusQuantumThinkingSection,
  renderFolderQuantumThinkingSection,
  type CorpusQuantumThinkingRollup,
  type QuantumThinkingBlock,
  type ThinkingLoadContext,
} from './quantum-thinking'
import { followEveryPathAll, ledgerFromPathWalk, type PathCanonicalEntry } from '@/path'
import { assertPathFollowed, finishedIdeaCrossed, type PathFollowVerdict } from '@/seal'
import { corpusPathWaveBatches } from '@/wave/scheduler'
import { maxWorkTamperPolicy } from '@/wave'
import { rulesOf } from '@/rules'
import { loadEfficiencyStore } from '@/apply/efficiency'
import { renderThisPageSection } from '@/book/render'
import { quantumModeDefault } from '@/quantum/bindings'
import {
  renderBalanceMeetingPivotSection,
  renderQuantumFoldSection,
} from '@/accounting/balance'

export type RingFacet = HoroPivotRow
export type AxisFacet = ControlAxisFacet

/** One wrangler binding related to an atom (via TYPE_LINKS or cloudflare subtree). */
export interface FolderBindingRef {
  readonly type: string
  readonly name: string
  readonly atomPath: string
}

/** One cited standard on an atom (banner · collection factory · catalogue cross-ref). */
export interface FolderStandardRef {
  readonly id: string
  readonly source: 'banner' | 'collection' | 'catalogue'
}

/** Structured per-atom metrics — rolls up to corpus analytics on the root README. */
export interface FolderAnalytics {
  readonly bondDegree: number
  readonly sealed: 0 | 1
  readonly horo: number | null
  readonly variance: number
  readonly balanced: 0 | 1
  readonly trinitySum: number
  readonly bindingCount: number
  readonly standardCount: number
}

/** Horo-ring rollup row for corpus analytics. */
export interface CorpusHoroRollup {
  readonly digit: number
  readonly measure: string
  readonly atoms: number
  readonly sealed: number
}

/** Aggregated metrics from every per-folder README model. */
export interface CorpusAnalytics {
  readonly folderCount: number
  readonly sealed: number
  readonly balanced: number
  readonly meanBondDegree: number
  readonly totalVariance: number
  readonly withBindings: number
  readonly distinctStandards: number
  readonly byHoro: readonly CorpusHoroRollup[]
  readonly entropy: CorpusEntropyRollup
  readonly quantumThinking: CorpusQuantumThinkingRollup
  /** Frozen at deriveModel — renderReadme uses these instead of re-scanning rules. */
  readonly rulesViolationCount?: number
  readonly workTamperProduct?: number
}

/** Canonical Git repo URL — Cloudflare Deploy button clones this repo and reads wrangler.jsonc. */
export const CLOUDFLARE_DEPLOY_REPO_URL = 'https://github.com/erpax/erpax' as const

/** Official Workers Deploy button markdown (@standard Cloudflare Workers deploy-buttons). */
export function cloudflareDeployButtonMarkdown(
  repoUrl: string = CLOUDFLARE_DEPLOY_REPO_URL,
): string {
  const deployUrl = `https://deploy.workers.cloudflare.com/?url=${encodeURIComponent(repoUrl)}`
  return `[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](${deployUrl})`
}

/** The README's content model — a pure projection of the live tree. */
export interface ReadmeModel {
  readonly name: string
  readonly description: string
  readonly version: string
  readonly license: string
  readonly corpusRoot: string
  readonly atoms: number
  readonly bonds: number
  readonly skills: number
  readonly index: number
  readonly tests: number
  readonly ring: readonly RingFacet[]
  readonly axis: readonly AxisFacet[]
  readonly scripts: ReadonlyArray<readonly [string, string]>
  readonly payload: readonly string[]
  readonly stack: readonly string[]
  readonly node: string
  readonly analytics: CorpusAnalytics
  readonly papers: MergedCorpusPapers
}

const SRC = 'src'

/**
 * Computed diamond faces — 100% derived from the live tree; drift fails closed.
 * Every face listed here may live in an atom folder ONLY when regenerated bytes
 * match verify (README via `generateFolderReadme`; others require GENERATED banner
 * until their worker lands).
 */
export const COMPUTED_FACES = ['README.md', 'LLM.md', 'diamond.json'] as const
export type ComputedFace = (typeof COMPUTED_FACES)[number]

/** The self-symlink (src/skills → .) aliases the whole tree — skip it so nothing double-counts. */
const SKIP_DIRS = new Set(['node_modules', 'skills'])

/** Walk the live corpus once, counting the three trinity legs. Skips the self-symlink + dotfiles. */
function walkCounts(root: string): { skills: number; index: number; tests: number } {
  let skills = 0
  let index = 0
  let tests = 0
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || SKIP_DIRS.has(e.name)) continue
      const p = join(dir, e.name)
      // Never traverse a symlink (the .claude/skills self-merge) — it re-roots the whole tree.
      let isSym = false
      try {
        isSym = lstatSync(p).isSymbolicLink()
      } catch {
        continue
      }
      if (isSym) continue
      if (e.isDirectory()) {
        walk(p)
        continue
      }
      if (e.name === 'SKILL.md') skills++
      else if (e.name === 'index.ts') index++
      else if (e.name === 'test.ts') tests++
    }
  }
  walk(root)
  return { skills, index, tests }
}

/** Strip the cross-env / NODE_OPTIONS noise so a script reads as its essential command. */
function cleanScript(cmd: string): string {
  return cmd.replace(/cross-env\s+(?:[A-Z_]+=(?:"[^"]*"|'[^']*'|\S+)\s+)+/g, '').trim()
}

interface PackageJson {
  name?: string
  description?: string
  version?: string
  license?: string
  scripts?: Record<string, string>
  dependencies?: Record<string, string>
  engines?: Record<string, string>
}

/** Derive the README model from the live tree (matrix barrel + fs walk + package.json). Impure: reads fs. */
export function deriveModel(
  cwd: string = process.cwd(),
  analytics?: CorpusAnalytics,
  papers?: MergedCorpusPapers,
): ReadmeModel {
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as PackageJson
  const counts = walkCounts(join(cwd, SRC))
  const { ring, axis } = horoPivotTable()
  const deps = pkg.dependencies ?? {}
  const payload = Object.keys(deps)
    .filter((d) => d.startsWith('@payloadcms/') || d === 'payload')
    .sort()
    .map((d) => `${d} ${deps[d]}`)
  const stack = Object.keys(deps)
    .filter((d) => !(d.startsWith('@payloadcms/') || d === 'payload'))
    .sort()
    .map((d) => `${d} ${deps[d]}`)
  const scripts: Array<readonly [string, string]> = Object.entries(pkg.scripts ?? {})
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([k, v]) => [k, cleanScript(v)] as const)
  const engines = pkg.engines ?? {}
  const entropySnap = readmeCorpusEntropyRenderOpts(cwd, readmeCorpusFrozenAt())
  const baseAnalytics = analytics ?? deriveCorpusAnalytics(cwd)
  return {
    name: pkg.name ?? 'erpax',
    description: pkg.description ?? '',
    version: pkg.version ?? '0.0.0',
    license: pkg.license ?? 'MIT',
    corpusRoot: UUID_MATRIX_ROOT,
    atoms: UUID_MATRIX_NODES.length,
    bonds: UUID_MATRIX_EDGES.length,
    skills: counts.skills,
    index: counts.index,
    tests: counts.tests,
    ring,
    axis,
    scripts,
    payload,
    stack,
    node: Object.entries(engines)
      .map(([k, v]) => `${k} ${v}`)
      .join(' · '),
    analytics: {
      ...baseAnalytics,
      rulesViolationCount: entropySnap.violationCount,
      workTamperProduct: entropySnap.workTamperProduct,
    },
    papers: papers ?? emptyMergedPapers(),
  }
}

/** Deterministic JSON of the model (sorted keys, no whitespace) — the bytes the content-uuid hashes. */
function stableStringify(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) return '[' + value.map(stableStringify).join(',') + ']'
  const obj = value as Record<string, unknown>
  const keys = Object.keys(obj).sort()
  return '{' + keys.map((k) => JSON.stringify(k) + ':' + stableStringify(obj[k])).join(',') + '}'
}

/**
 * The README's own content-uuid — a v8 content-uuid (the matrix coil, `toUuid`)
 * over the canonical model bytes. Same tree ⇒ same model ⇒ same uuid: the README
 * is itself a diamond, addressed by its content. Computed from the model, NOT from
 * the rendered string, so embedding it in the footer creates no self-reference.
 */
export function readmeUuid(model: ReadmeModel): string {
  return toUuid(Buffer.from(stableStringify(model), 'utf8'))
}

/** Prominent orientation block — every surface points to .claude/skills/SKILL.md. */
export function renderOrientSection(cwd: string = process.cwd()): readonly string[] {
  return deriveOrientSection(cwd)
}

/** @deprecated Use renderOrientSection */
export const renderForAiAssistantsSection = renderOrientSection

/** Render the model to the README markdown — PURE (`model → markdown`), so the typography is testable + stable. */
export function renderReadme(
  model: ReadmeModel,
  models?: readonly FolderReadmeModel[],
  entropyRender?: CorpusEntropyRenderOpts,
): string {
  const uuid = readmeUuid(model)
  const L: string[] = []
  L.push(
    '<!-- GENERATED by src/readme/index.ts — the README is a diamond (a content-addressed projection of the live tree).',
    '     Do NOT edit by hand: run `pnpm readme` to regenerate, `pnpm readme:check` to verify (drift fails closed). -->',
    '',
    `# ${model.name}`,
    '',
    `> ${model.description}`,
    '',
    cloudflareDeployButtonMarkdown(),
    '',
    ...renderOrientSection(),
    '## the diamond',
    '',
    plainLanguageOf({ section: 'diamond', model, bonds: bondWordsOf('diamond', 6) }),
    '',
    `- corpus address \`${model.corpusRoot}\``,
    `- **${model.atoms}** atoms · **${model.bonds}** bonds`,
    `- this README \`${uuid}\``,
    '',
    '## [[pivot]]',
    '',
    renderRootPivotHub(
      { ring: model.ring, axis: model.axis },
      trinityCorpusRollup({ atoms: model.atoms, skills: model.skills, index: model.index, tests: model.tests }),
      plainLanguageOf({
        section: 'pivot',
        model,
        horo: { ring: model.ring, axis: model.axis },
        trinity: { atoms: model.atoms, skills: model.skills, index: model.index, tests: model.tests },
      }),
    ),
    ...(models && models.length > 0
      ? ['', '### cross-tab state', '', renderPivotMarkdown(pivotFolderStats(models)), '']
      : []),
    '',
    renderGithubBrowseNote(),
    '',
    '## corpus analytics',
    '',
    plainLanguageOf({ section: 'analytics', model }),
    '',
    `- **${model.analytics.sealed}** / **${model.analytics.folderCount}** sealed · **${model.analytics.balanced}** / **${model.analytics.folderCount}** balanced`,
    `- mean bond degree \`${model.analytics.meanBondDegree}\` · total variance \`${model.analytics.totalVariance}\``,
    `- **${model.analytics.withBindings}** atoms with [[cloudflare]] bindings · **${model.analytics.distinctStandards}** distinct [[standards]] cited`,
    '',
    '| digit | measure | atoms | sealed |',
    '| ----: | ------- | ----: | -----: |',
  )
  for (const row of model.analytics.byHoro) {
    L.push(`| ${row.digit} | ${row.measure} | ${row.atoms} | ${row.sealed} |`)
  }
  const entropyOpts =
    entropyRender ?? {
      violationCount: model.analytics.rulesViolationCount ?? 0,
      workTamperProduct: model.analytics.workTamperProduct ?? 0,
    }
  L.push('', renderCorpusEntropySection(model.analytics.entropy, entropyOpts))
  L.push('', renderCorpusQuantumThinkingSection(model.analytics.quantumThinking))
  if (model.papers.total > 0) {
    L.push('', renderMergedPapersSection(model.papers))
  }
  L.push(
    '',
    '## scripts',
    '',
  )
  for (const [name, cmd] of model.scripts) {
    L.push(`- \`pnpm ${name}\` — \`${cmd}\``)
  }
  L.push(
    '',
    '## payload',
    '',
    model.payload.map((p) => `\`${p}\``).join(' · '),
    '',
    '## stack',
    '',
    model.stack.map((p) => `\`${p}\``).join(' · '),
    '',
    `\`${model.node}\``,
    '',
    '## license',
    '',
    `\`${model.version}\` · \`${model.license}\``,
    '',
    '---',
    '',
    `<sub>generated by \`pnpm readme\` · verified by \`pnpm readme:check\` · this README is a diamond — content-uuid \`${uuid}\`, regenerated from the live tree; any drift fails the gate.</sub>`,
    '',
  )
  return L.join('\n')
}

/** The full pipeline: live tree → README markdown bytes. */
export function generateReadme(cwd: string = process.cwd(), corpus?: ReadmeCorpus | CorpusAnalytics): string {
  if (corpus && 'models' in corpus) {
    return renderReadme(deriveModel(cwd, corpus.analytics, corpus.papers), corpus.models)
  }
  const analytics = corpus as CorpusAnalytics | undefined
  const c = analytics ? undefined : buildReadmeCorpus(cwd)
  return renderReadme(deriveModel(cwd, analytics ?? c?.analytics, c?.papers), c?.models)
}

/** One posting on the debit or credit side — account is an atom wikilink path. */
export interface StatementLine {
  readonly account: string
  readonly amount: number
}

/** Double-entry statement — debits = assets/completeness, credits = liabilities/gaps. */
export interface FolderAccounting {
  readonly debits: readonly StatementLine[]
  readonly credits: readonly StatementLine[]
  readonly totalDebits: number
  readonly totalCredits: number
  readonly variance: number
  readonly balanced: boolean
}

/** Typography frame for an atom — partition · analysis graph bonds. */
export interface FolderTypographyFrame {
  readonly partition: string
  readonly partitionRoot: string
  readonly bondDegree: number
  readonly analysisNeighbors: readonly string[]
  readonly graphRoot: string
}

/** Per-atom README model — 100% derived from the live tree (zero hand prose). */
export interface FolderReadmeModel {
  readonly atomPath: string
  readonly leaf: string
  readonly form: 0 | 1
  readonly code: 0 | 1
  readonly proof: 0 | 1
  readonly uuid: string | null
  readonly horo: number | null
  readonly measure: string | null
  readonly bondsIn: number
  readonly bondsOut: number
  readonly folded: boolean
  readonly linksResolved: number
  readonly linksTotal: number
  readonly escapes: number
  readonly typography: FolderTypographyFrame
  readonly bindings: readonly FolderBindingRef[]
  readonly standards: readonly FolderStandardRef[]
  readonly analytics: FolderAnalytics
  readonly sealed: boolean
  readonly statement: FolderAccounting
  readonly entropy: FolderEntropyAccounting
  readonly quantumThinking: QuantumThinkingBlock
}

const foldedPathSet = (): Set<string> => {
  const s = new Set<string>()
  for (const n of UUID_MATRIX_NODES) {
    if (n.path) s.add(n.path)
  }
  return s
}

export interface FolderReadmeContext {
  readonly resolver: (target: string) => boolean
  readonly folded: Set<string>
  readonly bindingsByAtom?: ReadonlyMap<string, readonly FolderBindingRef[]>
  readonly standardsByAtom?: ReadonlyMap<string, readonly FolderStandardRef[]>
  /** When true, finishedIdeaCrossed receives full lattice walk + canonical ledger. */
  readonly pathFollowGate?: boolean
  /** Cached path ledger for quantum thinking load (single lattice walk). */
  readonly thinkingCtx?: ThinkingLoadContext
}

export interface CorpusPathFollowOpts {
  readonly pathsVisited: ReadonlySet<string>
  readonly pathLedger: readonly PathCanonicalEntry[]
}

let cachedCorpusPathFollow: CorpusPathFollowOpts | null = null
let cachedCorpusPathFollowAt: string | undefined
let cachedThinkingCtx: ThinkingLoadContext | null = null
let cachedThinkingAt: string | undefined
let cachedEntropyRender: CorpusEntropyRenderOpts | null = null
let cachedEntropyRenderAt: string | undefined

/** Stable receipt-chain anchor — typography graph root (content-addressed, not wall clock). */
export function readmeCorpusFrozenAt(graph?: AnalysisTypographyGraph): string {
  return graph?.root ?? UUID_MATRIX_ROOT
}

/** Frozen graph + thinking context — one pass per write/verify (OOM + drift guard). */
export interface ReadmeCorpusFrozenInputs {
  readonly graph: AnalysisTypographyGraph
  readonly ctx: FolderReadmeContext
  readonly at: string
  readonly entropyRender: CorpusEntropyRenderOpts
}

/** Live rules + efficiency snapshot for corpus entropy footer — freeze once per pass. */
export function readmeCorpusEntropyRenderOpts(
  cwd: string = process.cwd(),
  anchor: string = readmeCorpusFrozenAt(),
): CorpusEntropyRenderOpts {
  if (cachedEntropyRender && cachedEntropyRenderAt === anchor) return cachedEntropyRender
  const rulesSnapshot = rulesOf(cwd, { force: true })
  const violationCount = rulesSnapshot.axes.reduce((s, a) => s + a.violations, 0)
  const effLatest = loadEfficiencyStore(cwd).latest
  cachedEntropyRender = {
    violationCount,
    workTamperProduct: effLatest?.workTamperProduct ?? 0,
  }
  cachedEntropyRenderAt = anchor
  return cachedEntropyRender
}

export interface ReadmeCorpusContextOpts {
  readonly pathFollowGate?: boolean
  readonly frozenAt?: string
  readonly frozenGraph?: AnalysisTypographyGraph
  readonly frozenThinkingCtx?: ThinkingLoadContext
}

/** Build frozen typography graph + path ledger once — reuse across waves and verify. */
export function buildReadmeCorpusFrozenInputs(
  cwd: string = process.cwd(),
  opts?: Pick<ReadmeCorpusContextOpts, 'pathFollowGate'>,
): ReadmeCorpusFrozenInputs {
  const graph = buildReadmeTypographyGraph(cwd)
  const at = readmeCorpusFrozenAt(graph)
  const entropyRender = readmeCorpusEntropyRenderOpts(cwd, at)
  const ctx = buildReadmeCorpusContext(cwd, { ...opts, frozenAt: at, frozenGraph: graph })
  return { graph, ctx, at, entropyRender }
}

/** Render root README from wave inputs — reuse frozen graph + receipt chain. */
export function renderRootReadmeInWaves(
  cwd: string = process.cwd(),
  frozen: ReadmeCorpusFrozenInputs = buildReadmeCorpusFrozenInputs(cwd),
  onWave?: (ordinal: number, itemCount: number) => void,
): string {
  const { analytics, papers, models } = deriveReadmeRootInputsInWaves(cwd, onWave, frozen)
  return renderReadme(deriveModel(cwd, analytics, papers), models, frozen.entropyRender)
}

/** Drift gate — two consecutive wave derives must be byte-identical (frozen quantum inputs). */
export function verifyRootReadmeUsesFrozenInputs(cwd: string = process.cwd()): {
  readonly ok: boolean
  readonly expected: string
} {
  const frozen = buildReadmeCorpusFrozenInputs(cwd)
  const a = renderRootReadmeInWaves(cwd, frozen)
  const b = renderRootReadmeInWaves(cwd, frozen)
  return { ok: a === b, expected: a }
}

/** Full-matrix path walk + canonical ledger — cached for readme verify / gravity gate. */
export function corpusPathFollowOpts(at?: string): CorpusPathFollowOpts {
  const timestamp = at ?? readmeCorpusFrozenAt()
  if (!cachedCorpusPathFollow || cachedCorpusPathFollowAt !== timestamp) {
    const paths = followEveryPathAll()
    cachedCorpusPathFollow = {
      pathsVisited: new Set(paths),
      pathLedger: ledgerFromPathWalk(paths, timestamp),
    }
    cachedCorpusPathFollowAt = timestamp
  }
  return cachedCorpusPathFollow
}

/** Reset cached corpus path walk (tests). */
export function resetCorpusPathFollowCache(): void {
  cachedCorpusPathFollow = null
  cachedCorpusPathFollowAt = undefined
  cachedThinkingCtx = null
  cachedThinkingAt = undefined
  cachedEntropyRender = null
  cachedEntropyRenderAt = undefined
}

/** Cached path ledger for quantum thinking load — one lattice walk per process. */
export function thinkingLoadContext(at?: string): ThinkingLoadContext {
  const timestamp = at ?? readmeCorpusFrozenAt()
  if (!cachedThinkingCtx || cachedThinkingAt !== timestamp) {
    cachedThinkingCtx = {
      pathLedger: ledgerFromPathWalk(followEveryPathAll(), timestamp),
      at: timestamp,
    }
    cachedThinkingAt = timestamp
  }
  return cachedThinkingCtx
}

/** Corpus-level path-follow gate — every matrix path visited before readme verify. */
export function assertCorpusPathFollowGate(at?: string): PathFollowVerdict {
  const { pathsVisited } = corpusPathFollowOpts(at)
  return assertPathFollowed(pathsVisited)
}

const sumAmounts = (lines: readonly StatementLine[]): number =>
  lines.reduce((s, l) => s + l.amount, 0)

const STANDARD_BANNER_RE = /@standard\s+([^\n*]+)/g
const COMPLIANCE_BANNER_RE = /@(?:accounting|compliance|rfc)\s+([^\n*]+)/g
const COLLECTION_STANDARDS_RE = /standards:\s*\[([\s\S]*?)\]/g

const loadWranglerEntries = (cwd: string): readonly WranglerBindingEntry[] => {
  const path = join(cwd, 'wrangler.jsonc')
  if (!existsSync(path)) return []
  try {
    return parseWranglerBindings(readFileSync(path, 'utf8'))
  } catch {
    return []
  }
}

const bindingRefOf = (entry: WranglerBindingEntry): FolderBindingRef => ({
  type: entry.type,
  name: entry.bindingName,
  atomPath: bindingAtomPath(entry.type, entry.bindingName),
})

/** Map each atom path to wrangler bindings (TYPE_LINKS · cloudflare subtree · AI stack). */
export function buildBindingsByAtom(
  entries: readonly WranglerBindingEntry[],
): ReadonlyMap<string, readonly FolderBindingRef[]> {
  const map = new Map<string, FolderBindingRef[]>()
  const add = (atomPath: string, ref: FolderBindingRef): void => {
    const arr = map.get(atomPath) ?? []
    if (!arr.some((r) => r.type === ref.type && r.name === ref.name)) arr.push(ref)
    map.set(atomPath, arr)
  }
  for (const entry of entries) {
    const ref = bindingRefOf(entry)
    add('cloudflare', ref)
    if (isAiRelatedBinding(entry)) add('cloudflare/ai', ref)
    for (const link of atomsLinkedByBindingType(entry.type)) add(link, ref)
  }
  for (const [k, v] of map) {
    map.set(
      k,
      v.sort((a, b) => a.type.localeCompare(b.type) || a.name.localeCompare(b.name)),
    )
  }
  return map
}

const parseStandardsFromText = (
  text: string,
  source: FolderStandardRef['source'],
  acc: Map<string, FolderStandardRef['source']>,
): void => {
  if (source === 'banner') {
    for (const m of text.matchAll(STANDARD_BANNER_RE)) acc.set(m[1]!.trim(), source)
    for (const m of text.matchAll(COMPLIANCE_BANNER_RE)) acc.set(m[1]!.trim(), source)
    return
  }
  for (const m of text.matchAll(COLLECTION_STANDARDS_RE)) {
    for (const sm of m[1]!.matchAll(/['"]([^'"]+)['"]/g)) acc.set(sm[1]!.trim(), source)
  }
}

/** Map each atom path to cited standards (banners · collection factory · catalogue). */
export function buildStandardsByAtom(
  cwd: string,
  atomPaths: readonly string[],
): ReadonlyMap<string, readonly FolderStandardRef[]> {
  const map = new Map<string, readonly FolderStandardRef[]>()
  for (const atomPath of atomPaths) {
    const dir = join(cwd, SRC, atomPath)
    const raw = new Map<string, FolderStandardRef['source']>()
    for (const file of ['index.ts', 'SKILL.md'] as const) {
      const p = join(dir, file)
      if (!existsSync(p)) continue
      try {
        const text = readFileSync(p, 'utf8')
        parseStandardsFromText(text, 'banner', raw)
        if (file === 'index.ts') parseStandardsFromText(text, 'collection', raw)
      } catch {
        /* unreadable — skip */
      }
    }
    const prefix = `src/${atomPath}/`
    for (const entry of STANDARDS_CATALOGUE) {
      if (entry.modules.some((m) => m.path.startsWith(prefix)) && !raw.has(entry.id)) {
        raw.set(entry.id, 'catalogue')
      }
    }
    if (raw.size === 0) continue
    map.set(
      atomPath,
      [...raw.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([id, source]) => ({ id, source })),
    )
  }
  return map
}

/** Build folder analytics facet — pure on folder model fields. */
export function folderAnalyticsOf(
  fields: Pick<
    FolderReadmeModel,
    'typography' | 'sealed' | 'horo' | 'statement' | 'form' | 'code' | 'proof' | 'bindings' | 'standards'
  >,
): FolderAnalytics {
  return {
    bondDegree: fields.typography.bondDegree,
    sealed: fields.sealed ? 1 : 0,
    horo: fields.horo,
    variance: fields.statement.variance,
    balanced: fields.statement.balanced ? 1 : 0,
    trinitySum: fields.form + fields.code + fields.proof,
    bindingCount: fields.bindings.length,
    standardCount: fields.standards.length,
  }
}

/** Roll up per-folder analytics into corpus metrics — pure, deterministic. */
export function aggregateCorpusAnalytics(models: readonly FolderReadmeModel[]): CorpusAnalytics {
  const folderCount = models.length
  let sealed = 0
  let balanced = 0
  let bondSum = 0
  let totalVariance = 0
  let withBindings = 0
  const standardIds = new Set<string>()
  const byHoroAcc = new Map<number, { atoms: number; sealed: number }>()
  for (const m of models) {
    if (m.sealed) sealed++
    if (m.statement.balanced) balanced++
    bondSum += m.analytics.bondDegree
    totalVariance += m.analytics.variance
    if (m.bindings.length > 0) withBindings++
    for (const s of m.standards) standardIds.add(s.id)
    const digit = m.horo ?? 0
    const row = byHoroAcc.get(digit) ?? { atoms: 0, sealed: 0 }
    row.atoms++
    if (m.sealed) row.sealed++
    byHoroAcc.set(digit, row)
  }
  const meanBondDegree = folderCount > 0 ? Math.round((bondSum * 100) / folderCount) / 100 : 0
  const byHoro: CorpusHoroRollup[] = [...byHoroAcc.entries()]
    .sort((a, b) => {
      const ai = HORO_DIGITS.indexOf(a[0] as (typeof HORO_DIGITS)[number])
      const bi = HORO_DIGITS.indexOf(b[0] as (typeof HORO_DIGITS)[number])
      if (ai >= 0 && bi >= 0) return ai - bi
      if (ai >= 0) return -1
      if (bi >= 0) return 1
      return a[0] - b[0]
    })
    .map(([digit, row]) => ({
      digit,
      measure: digit === 0 ? 'off-ring' : horoMeasureOf(digit) ?? String(digit),
      atoms: row.atoms,
      sealed: row.sealed,
    }))
  return {
    folderCount,
    sealed,
    balanced,
    meanBondDegree,
    totalVariance,
    withBindings,
    distinctStandards: standardIds.size,
    byHoro,
    entropy: aggregateCorpusEntropy(models),
    quantumThinking: aggregateCorpusQuantumThinking(models),
  }
}

/** Merge two corpus analytics rollups — wave-batch accumulator (OOM guard). */
export function mergeCorpusAnalytics(a: CorpusAnalytics, b: CorpusAnalytics): CorpusAnalytics {
  const folderCount = a.folderCount + b.folderCount
  const bondSum = a.meanBondDegree * a.folderCount + b.meanBondDegree * b.folderCount
  const byHoroAcc = new Map<number, { atoms: number; sealed: number }>()
  for (const row of [...a.byHoro, ...b.byHoro]) {
    const cur = byHoroAcc.get(row.digit) ?? { atoms: 0, sealed: 0 }
    cur.atoms += row.atoms
    cur.sealed += row.sealed
    byHoroAcc.set(row.digit, cur)
  }
  const byHoro: CorpusHoroRollup[] = [...byHoroAcc.entries()]
    .sort((x, y) => {
      const ai = HORO_DIGITS.indexOf(x[0] as (typeof HORO_DIGITS)[number])
      const bi = HORO_DIGITS.indexOf(y[0] as (typeof HORO_DIGITS)[number])
      if (ai >= 0 && bi >= 0) return ai - bi
      if (ai >= 0) return -1
      if (bi >= 0) return 1
      return x[0] - y[0]
    })
    .map(([digit, row]) => ({
      digit,
      measure: digit === 0 ? 'off-ring' : horoMeasureOf(digit) ?? String(digit),
      atoms: row.atoms,
      sealed: row.sealed,
    }))
  return {
    folderCount,
    sealed: a.sealed + b.sealed,
    balanced: a.balanced + b.balanced,
    meanBondDegree: folderCount > 0 ? Math.round((bondSum * 100) / folderCount) / 100 : 0,
    totalVariance: a.totalVariance + b.totalVariance,
    withBindings: a.withBindings + b.withBindings,
    distinctStandards: a.distinctStandards + b.distinctStandards,
    byHoro,
    entropy: mergeCorpusEntropy(a.entropy, b.entropy),
    quantumThinking: mergeCorpusQuantumThinking(a.quantumThinking, b.quantumThinking),
  }
}

const emptyCorpusAnalytics = (): CorpusAnalytics => ({
  folderCount: 0,
  sealed: 0,
  balanced: 0,
  meanBondDegree: 0,
  totalVariance: 0,
  withBindings: 0,
  distinctStandards: 0,
  byHoro: [],
  entropy: aggregateCorpusEntropy([]),
  quantumThinking: emptyCorpusQuantumThinking(),
})

/** Derive root README inputs in horo waves — analytics + papers without full corpus (OOM guard). */
export function deriveReadmeRootInputsInWaves(
  cwd: string = process.cwd(),
  onWave?: (ordinal: number, itemCount: number) => void,
  frozen: ReadmeCorpusFrozenInputs = buildReadmeCorpusFrozenInputs(cwd),
): {
  readonly analytics: CorpusAnalytics
  readonly papers: MergedCorpusPapers
  readonly models: readonly FolderReadmeModel[]
} {
  const { graph, ctx } = frozen
  const standardIds = new Set<string>()
  const sealedByAtom = new Map<string, boolean>()
  const allModels: FolderReadmeModel[] = []
  let analytics: CorpusAnalytics | undefined
  const policy = maxWorkTamperPolicy()
  for (const wave of corpusPathWaveBatches({}, policy)) {
    onWave?.(wave.ordinal, wave.itemCount)
    const models = wave.items.map((p) => deriveFolderModel(p, cwd, ctx, graph))
    allModels.push(...models)
    for (const m of models) {
      for (const s of m.standards) standardIds.add(s.id)
      sealedByAtom.set(m.atomPath, m.sealed)
    }
    const batch = aggregateCorpusAnalytics(models)
    analytics = analytics ? mergeCorpusAnalytics(analytics, batch) : batch
  }
  const atomPaths = listAtomPaths(cwd)
  const papers = mergeCorpusPapers(
    collectCorpusPapers(cwd, sealedByAtom, atomPaths, { skipRootReadme: true }),
  )
  return {
    analytics: analytics
      ? { ...analytics, distinctStandards: standardIds.size }
      : emptyCorpusAnalytics(),
    papers,
    models: allModels,
  }
}

/** Derive corpus analytics in horo waves — one batch at a time (OOM guard). */
export function deriveCorpusAnalyticsInWaves(
  cwd: string = process.cwd(),
  onWave?: (ordinal: number, itemCount: number) => void,
): CorpusAnalytics {
  return deriveReadmeRootInputsInWaves(cwd, onWave).analytics
}

/** Derive corpus analytics from folder models — no MD/TS paper scan (fast path for deriveModel). */
export function deriveCorpusAnalytics(cwd: string = process.cwd()): CorpusAnalytics {
  const { graph, ctx } = buildReadmeCorpusFrozenInputs(cwd)
  const models = listAtomPaths(cwd).map((p) => deriveFolderModel(p, cwd, ctx, graph))
  return aggregateCorpusAnalytics(models)
}

/** One corpus scan — folder models + analytics (reuse across root README + materialize). */
export interface ReadmeCorpus {
  readonly models: readonly FolderReadmeModel[]
  readonly ctx: FolderReadmeContext
  readonly graph: AnalysisTypographyGraph
  readonly analytics: CorpusAnalytics
  readonly papers: MergedCorpusPapers
}

export function buildReadmeCorpus(
  cwd: string = process.cwd(),
  opts?: Pick<ReadmeCorpusContextOpts, 'pathFollowGate'>,
): ReadmeCorpus {
  const { graph, ctx } = buildReadmeCorpusFrozenInputs(cwd, opts)
  const atomPaths = listAtomPaths(cwd)
  const models = atomPaths.map((p) => deriveFolderModel(p, cwd, ctx, graph))
  const sealedByAtom = new Map(models.map((m) => [m.atomPath, m.sealed]))
  const rawPapers = collectCorpusPapers(cwd, sealedByAtom, atomPaths, { skipRootReadme: true })
  return {
    models,
    ctx,
    graph,
    analytics: aggregateCorpusAnalytics(models),
    papers: mergeCorpusPapers(rawPapers),
  }
}

type FolderAccountingInput = Pick<
  FolderReadmeModel,
  | 'atomPath'
  | 'form'
  | 'code'
  | 'proof'
  | 'folded'
  | 'linksResolved'
  | 'linksTotal'
  | 'escapes'
  | 'horo'
  | 'uuid'
  | 'bondsIn'
  | 'bondsOut'
  | 'typography'
>

/** Build debit/credit lines from completeness signals — pure, no fs. */
function buildFolderAccounting(fields: FolderAccountingInput): FolderAccounting {
  const debits: StatementLine[] = []
  const credits: StatementLine[] = []
  const post = (debitAccount: string, debit: number, creditAccount: string, credit: number): void => {
    if (debit > 0) {
      debits.push({ account: debitAccount, amount: debit })
      credits.push({ account: '[[balance]]', amount: debit })
    }
    if (credit > 0) {
      credits.push({ account: creditAccount, amount: credit })
      debits.push({ account: '[[balance]]', amount: credit })
    }
  }
  const codeRequired = fields.code ? 1 : 0
  post('[[asset]]/[[trinity]]/form', fields.form, '[[liability]]/[[trinity]]/form', 1 - fields.form)
  post('[[asset]]/[[trinity]]/code', fields.code, '[[liability]]/[[trinity]]/code', codeRequired - fields.code)
  post(
    '[[asset]]/[[trinity]]/proof',
    fields.proof,
    '[[liability]]/[[trinity]]/proof',
    codeRequired - fields.proof,
  )
  post(
    '[[asset]]/[[lattice]]/folded',
    fields.folded ? 1 : 0,
    '[[liability]]/[[lattice]]/unfolded',
    fields.folded ? 0 : 1,
  )
  const linksSealed = fields.linksTotal === 0 || fields.linksResolved === fields.linksTotal
  post(
    '[[asset]]/[[links]]/resolved',
    linksSealed ? 1 : fields.linksResolved,
    '[[liability]]/[[links]]/dangling',
    linksSealed ? 0 : fields.linksTotal - fields.linksResolved,
  )
  const ring = horoCrossed(fields.atomPath, fields.horo)
  post('[[asset]]/[[horo]]/ring', ring ? 1 : 0, '[[liability]]/[[horo]]/off-ring', ring ? 0 : 1)
  post(
    '[[asset]]/[[identity]]/uuid',
    fields.uuid ? 1 : 0,
    '[[liability]]/[[identity]]/uuid',
    fields.uuid ? 0 : 1,
  )
  post(
    '[[asset]]/[[boundary]]/barrel',
    fields.escapes === 0 ? 1 : 0,
    '[[liability]]/[[boundary]]/escape',
    fields.escapes,
  )
  post(
    '[[asset]]/[[typography]]/partition',
    fields.typography.partitionRoot ? 1 : 0,
    '[[liability]]/[[typography]]/partition',
    fields.typography.partitionRoot ? 0 : 1,
  )
  const totalDebits = sumAmounts(debits)
  const totalCredits = sumAmounts(credits)
  const ledger = debits.map((d) => ({ debit: d.amount, credit: 0 })).concat(
    credits.map((c) => ({ debit: 0, credit: c.amount })),
  )
  const variance = trialBalance(ledger)
  return {
    debits,
    credits,
    totalDebits,
    totalCredits,
    variance,
    balanced: conserves(ledger),
  }
}

/** Sum [[liability]] gap postings — impurity mass; incomplete readmes must not exert [[gravity]]. */
export const folderLiabilityGap = (statement: FolderAccounting): number =>
  statement.credits
    .filter((c) => c.account.includes('[[liability]]'))
    .reduce((s, c) => s + c.amount, 0)

/** Gravity held ⇔ matter complete and diamond membership pure — seal / statement / graph-weight gate. */
export const folderGravityHeld = (
  matterState: FolderMatterState,
  membershipOk: boolean,
): boolean => folderMatterComplete(matterState) && membershipOk

/**
 * No-gravity law: incomplete readmes report variance ≠ 0 and balanced false.
 * Journal postings always conserve via [[balance]] contra; purity variance is liability-gap mass.
 */
export function applyFolderGravityGate(
  statement: FolderAccounting,
  matterState: FolderMatterState,
  membershipOk: boolean,
  membershipViolationCount = 0,
): FolderAccounting {
  const gravityHeld = folderGravityHeld(matterState, membershipOk)
  let purityVariance = folderLiabilityGap(statement)
  if (!membershipOk) purityVariance += Math.max(1, membershipViolationCount)
  const balanced = gravityHeld && purityVariance === 0
  return { ...statement, variance: purityVariance, balanced }
}

/**
 * Derive the debit/credit statement for a folder diamond.
 * Debits = [[asset]] completeness; credits = [[liability]] gaps/impurities.
 * Balanced ⇔ zero liability-gap mass AND folder gravity held ⇔ zero [[entropy]] purity.
 */
export function deriveFolderAccounting(
  input: FolderReadmeModel | string,
  cwd: string = process.cwd(),
  ctx?: FolderReadmeContext,
): FolderAccounting {
  if (typeof input === 'string') return deriveFolderModel(input, cwd, ctx).statement
  return buildFolderAccounting(input)
}

/** Load every SKILL.md as a typography page (one corpus scan). */
export function loadSkillPages(cwd: string = process.cwd()): SkillPage[] {
  const srcRoot = join(cwd, SRC)
  return walkSkills(srcRoot)
    .map((sk) => ({
      path: relative(srcRoot, dirname(sk)).replace(/\\/g, '/'),
      text: readFileSync(sk, 'utf8'),
    }))
    .sort((a, b) => a.path.localeCompare(b.path))
}

/** Impurity signals for analysis-graph levers — derived from folder facts + boundary + crosses. */
export function collectImpuritySignals(
  cwd: string = process.cwd(),
  ctx: FolderReadmeContext = buildFolderReadmeContext(join(cwd, SRC)),
): Record<string, AtomImpuritySignals> {
  const srcRoot = join(cwd, SRC)
  const { unsealed } = crossSeals(srcRoot)
  const unsealedBases = new Set(unsealed.map((c) => c.base))
  const out: Record<string, AtomImpuritySignals> = {}
  for (const atomPath of listAtomPaths(cwd)) {
    const m = deriveFolderModel(atomPath, cwd, ctx)
    const deadLinks = m.linksTotal - m.linksResolved
    const sig: AtomImpuritySignals = {
      ...(deadLinks > 0 ? { deadLinks } : {}),
      ...(!m.sealed
        ? (() => {
            let impurities = 0
            if (m.code && (!m.form || !m.proof)) impurities++
            if (!m.folded) impurities++
            if (deadLinks > 0) impurities++
            if (m.horo !== null && m.measure === String(m.horo)) impurities++
            return impurities > 0 ? { diamondImpurities: impurities } : {}
          })()
        : {}),
      ...(unsealedBases.has(m.leaf) ? { unsealedCross: true } : {}),
      ...((): Partial<AtomImpuritySignals> => {
        const barrel = join(srcRoot, atomPath, 'index.ts')
        if (!existsSync(barrel)) return {}
        try {
          const escapes = computeBoundary(barrel, srcRoot).escapes.length
          return escapes > 0 ? { escapes } : {}
        } catch {
          return {}
        }
      })(),
    }
    if (Object.keys(sig).length > 0) out[atomPath] = sig
  }
  return out
}

/** Build the unified typography graph once per readme materialize pass. */
export function buildReadmeTypographyGraph(cwd: string = process.cwd()): AnalysisTypographyGraph {
  const ctx = buildFolderReadmeContext(join(cwd, SRC))
  return buildAnalysisTypographyGraph(loadSkillPages(cwd), collectImpuritySignals(cwd, ctx))
}

/** Build link resolver + fold ledger once per corpus scan. */
export function buildFolderReadmeContext(srcRoot: string): FolderReadmeContext {
  const pathset = new Set<string>()
  const leaf = new Set<string>()
  for (const sk of walkSkills(srcRoot)) {
    const rel = relative(srcRoot, dirname(sk)).replace(/\\/g, '/')
    pathset.add(rel.toLowerCase())
    const parts = rel.split('/')
    leaf.add(parts[parts.length - 1]!.toLowerCase())
  }
  const resolver = (target: string): boolean => {
    const t = target.trim().toLowerCase()
    return t.includes('/') ? pathset.has(t) : leaf.has(t)
  }
  return { resolver, folded: foldedPathSet() }
}

/** Folder context + wrangler bindings + standards index (one corpus scan). */
export function buildReadmeCorpusContext(
  cwd: string = process.cwd(),
  opts?: ReadmeCorpusContextOpts,
): FolderReadmeContext {
  const srcRoot = join(cwd, SRC)
  const base = buildFolderReadmeContext(srcRoot)
  const atomPaths = listAtomPaths(cwd)
  const frozenAt = opts?.frozenAt ?? readmeCorpusFrozenAt(opts?.frozenGraph)
  const pathFollow = opts?.pathFollowGate ? corpusPathFollowOpts(frozenAt) : undefined
  const thinkingCtx: ThinkingLoadContext =
    opts?.frozenThinkingCtx ??
    (pathFollow
      ? { pathLedger: pathFollow.pathLedger, at: frozenAt }
      : thinkingLoadContext(frozenAt))
  return {
    ...base,
    bindingsByAtom: buildBindingsByAtom(loadWranglerEntries(cwd)),
    standardsByAtom: buildStandardsByAtom(cwd, atomPaths),
    pathFollowGate: opts?.pathFollowGate,
    thinkingCtx,
  }
}

const frameOf = (
  graph: AnalysisTypographyGraph | undefined,
  atomPath: string,
  bondsIn: number,
  bondsOut: number,
): FolderTypographyFrame => {
  if (!graph) {
    const partition = atomPath.split('/')[0] ?? atomPath
    return { partition, partitionRoot: '', bondDegree: bondsIn + bondsOut, analysisNeighbors: [], graphRoot: '' }
  }
  const ctx = atomTypographyContext(graph, atomPath, bondsIn, bondsOut)
  return {
    partition: ctx.partition,
    partitionRoot: ctx.partitionRoot,
    bondDegree: ctx.bondDegree,
    analysisNeighbors: ctx.analysisNeighbors,
    graphRoot: graph.root,
  }
}

/** Derive the per-folder completeness model — impure (reads fs + matrix). */
export function deriveFolderModel(
  atomPath: string,
  cwd: string = process.cwd(),
  ctx: FolderReadmeContext = buildFolderReadmeContext(join(cwd, SRC)),
  graph?: AnalysisTypographyGraph,
): FolderReadmeModel {
  const dir = join(cwd, SRC, atomPath)
  const form = (existsSync(join(dir, 'SKILL.md')) ? 1 : 0) as 0 | 1
  const code = (existsSync(join(dir, 'index.ts')) || existsSync(join(dir, 'index.tsx')) ? 1 : 0) as 0 | 1
  const hasTestTs = existsSync(join(dir, 'test.ts'))
  const matterState = folderMatterState(form, code, hasTestTs)
  const membershipOk = diamondMembershipOk(atomPath, cwd)
  const membershipViolationCount = membershipOk ? 0 : diamondMembershipViolations(atomPath, cwd).length
  const gravityHeld = folderGravityHeld(matterState, membershipOk)
  // Proof leg = test.ts for code atoms (colocated *.test.ts does not complete the trinity).
  const proof = (code ? (hasTestTs ? 1 : 0) : 0) as 0 | 1
  const leaf = atomPath.split('/').pop() ?? atomPath
  const node = nodeOf(atomPath) ?? nodeOf(leaf)
  const matrixAtom = node?.atom ?? leaf
  const horo = node?.horo ?? null
  const uuid = node?.uuid ?? null
  const bondsIn = backlinksOf(matrixAtom).length
  const bondsOut = neighborsOf(matrixAtom).length
  const folded = ctx.folded.has(atomPath)
  let linksTotal = 0
  let linksResolved = 0
  try {
    const skill = readFileSync(join(dir, 'SKILL.md'), 'utf8')
    const text = stripCode(skill)
    const re = new RegExp(LINK_RE.source, LINK_RE.flags)
    for (let m; (m = re.exec(text)); ) {
      linksTotal++
      if (ctx.resolver(m[1]!)) linksResolved++
    }
  } catch {
    /* no SKILL.md — links stay 0 */
  }
  let escapes = 0
  let boundaryImports: string[] = []
  let boundaryExports: string[] = []
  let boundaryEscapes: string[] = []
  const barrel = join(dir, 'index.ts')
  if (existsSync(barrel)) {
    try {
      const b = computeBoundary(barrel, join(cwd, SRC))
      escapes = b.escapes.length
      boundaryImports = [...b.imports]
      boundaryExports = [...b.exports]
      boundaryEscapes = [...b.escapes]
    } catch {
      escapes = 0
    }
  }
  let typography = frameOf(graph, atomPath, bondsIn, bondsOut)
  if (!gravityHeld) typography = { ...typography, bondDegree: 0, analysisNeighbors: [] }
  const fields: FolderAccountingInput = {
    atomPath,
    form,
    code,
    proof,
    folded,
    linksResolved,
    linksTotal,
    escapes,
    horo,
    uuid,
    bondsIn,
    bondsOut,
    typography,
  }
  let statement = buildFolderAccounting(fields)
  if (atomPath === 'cloudflare' || atomPath === 'cloudflare/ai') {
    try {
      const extras = cloudflareAiAccountingExtras(cwd)
      if (extras.aiBindingCount > 0) {
        const debits = [...statement.debits]
        const credits = [...statement.credits]
        const post = (debitAccount: string, debit: number): void => {
          if (debit > 0) {
            debits.push({ account: debitAccount, amount: debit })
            credits.push({ account: '[[balance]]', amount: debit })
          }
        }
        post(extras.aiDebitAccount, extras.aiBindingCount)
        if (atomPath === 'cloudflare') {
          post(extras.wranglerDebitAccount, extras.wranglerBindingCount)
        }
        const totalDebits = sumAmounts(debits)
        const totalCredits = sumAmounts(credits)
        const ledger = debits
          .map((d) => ({ debit: d.amount, credit: 0 }))
          .concat(credits.map((c) => ({ debit: 0, credit: c.amount })))
        statement = {
          debits,
          credits,
          totalDebits,
          totalCredits,
          variance: trialBalance(ledger),
          balanced: conserves(ledger),
        }
      }
    } catch {
      /* wrangler.jsonc absent — skip CF accounting extras */
    }
  }
  statement = applyFolderGravityGate(statement, matterState, membershipOk, membershipViolationCount)
  const localSealed = Boolean(
    gravityHeld &&
      folded &&
      linksResolved === linksTotal &&
      horoCrossed(atomPath, horo) &&
      uuid !== null &&
      escapes === 0 &&
      statement.balanced,
  )
  const ancestorCache = new Map<string, boolean>()
  const ancestorSealed = (prefix: string): boolean => {
    let v = ancestorCache.get(prefix)
    if (v === undefined) {
      v = deriveFolderModel(prefix, cwd, ctx, graph).sealed
      ancestorCache.set(prefix, v)
    }
    return v
  }
  const sealed = sealPropagatedFromAncestors(
    atomPath,
    localSealed,
    (p) => existsSync(join(cwd, SRC, p, 'SKILL.md')),
    ancestorSealed,
  )
  const bindings = ctx.bindingsByAtom?.get(atomPath) ?? []
  const standards = ctx.standardsByAtom?.get(atomPath) ?? []
  const analytics = folderAnalyticsOf({
    typography,
    sealed,
    horo,
    statement,
    form,
    code,
    proof,
    bindings,
    standards,
  })
  const pathFollow = ctx.pathFollowGate ? corpusPathFollowOpts(ctx.thinkingCtx?.at) : undefined
  const crossSnapshot: DiamondModel = {
    kind: 'atom',
    atomPath,
    boundaryUuid: null,
    trinity: { form, code, proof },
    horo,
    measure: horoMeasureOf(horo),
    imports: boundaryImports,
    exports: boundaryExports,
    escapes: boundaryEscapes,
    links: [],
    linksResolved,
    linksTotal,
    folded,
    bondsIn,
    bondsOut,
    sealed,
  }
  const cross = finishedIdeaCrossed(crossSnapshot, {
    ancestorsSealed: ancestorSealed,
    isAtom: (p) => existsSync(join(cwd, SRC, p, 'SKILL.md')),
    ...(pathFollow
      ? { pathsVisited: pathFollow.pathsVisited, pathLedger: pathFollow.pathLedger }
      : {}),
  })
  const entropy = accountGapsAndSeals({
    atomPath,
    form,
    code,
    proof,
    horo,
    sealed,
    statement,
    typography,
    membershipViolations: membershipOk ? [] : diamondMembershipViolations(atomPath, cwd),
    crossImpurities: cross.impurities,
    membershipOk,
    gravityHeld,
  })
  const folderDraft = {
    atomPath,
    uuid,
    entropy,
    linksTotal,
    linksResolved,
    typography,
    sealed,
    statement,
  }
  const quantumThinking = quantumThinkingOf(folderDraft, cwd, ctx.thinkingCtx)
  return {
    ...fields,
    atomPath,
    leaf,
    measure: horoMeasureOf(horo),
    bindings,
    standards,
    analytics,
    sealed,
    statement,
    entropy,
    quantumThinking,
  }
}

/** Content-uuid of the folder model bytes (same tree ⇒ same uuid). */
export function folderReadmeUuid(model: FolderReadmeModel): string {
  return toUuid(Buffer.from(stableStringify(model), 'utf8'))
}

const fmtLine = (line: StatementLine | undefined): string =>
  line ? `${line.account} \`${line.amount}\`` : ''

/** Render folder README — pure; every token is a computed facet ([[diamond]] · [[purity]] · [[seal]]). */
export function renderFolderReadme(model: FolderReadmeModel): string {
  const uuid = folderReadmeUuid(model)
  const { statement } = model
  const rows = Math.max(statement.debits.length, statement.credits.length)
  const L: string[] = [
    '<!-- GENERATED by src/readme/index.ts — debit/credit statement; do NOT edit by hand. -->',
    '',
    `# ${model.leaf}`,
    '',
    `> atom \`${model.atomPath}\` · horo \`${model.horo ?? '—'}\` \`${model.measure ?? '—'}\` · [[balance]] \`${statement.balanced ? 1 : 0}\` · [[seal]] \`${model.sealed ? 1 : 0}\``,
    '',
    renderThisPageSection(model),
    '## [[debit]] · [[credit]]',
    '',
    `> account code \`${model.atomPath}\` · currency \`eb\` (entropy-bit)`,
    '',
    '| [[debit]] | [[credit]] |',
    '| -------- | --------- |',
  ]
  for (let i = 0; i < rows; i++) {
    L.push(`| ${fmtLine(statement.debits[i])} | ${fmtLine(statement.credits[i])} |`)
  }
  L.push(
    `| Σ \`${statement.totalDebits}\` | Σ \`${statement.totalCredits}\` |`,
    '',
    `> [[balance]] \`${statement.variance}\` · [[conservation]] \`${statement.balanced ? 1 : 0}\` · [[entry]] · [[purity]]`,
    '',
    renderFolderQuantumThinkingSection(model.quantumThinking),
    renderFolderEntropySection(model.entropy, model.atomPath),
    '## typography graph',
    '',
    `- partition \`${model.typography.partition}\` · sub-root \`${model.typography.partitionRoot || '—'}\``,
    `- bond degree \`${model.typography.bondDegree}\` · analysis neighbors ${
      model.typography.analysisNeighbors.length > 0
        ? model.typography.analysisNeighbors.map((n) => `\`${n}\``).join(' · ')
        : '—'
    }`,
    `- graph root \`${model.typography.graphRoot || '—'}\``,
    '',
    '## [[cloudflare]] bindings',
    '',
    ...(model.bindings.length > 0
      ? model.bindings.map(
          (b) => `- \`${b.type}\`/\`${b.name}\` · atom \`${b.atomPath}\``,
        )
      : ['—']),
    '',
    '## [[standards]]',
    '',
    ...(model.standards.length > 0
      ? model.standards.map((s) => `- \`${s.id}\` · ${s.source}`)
      : ['—']),
    '',
    '## [[pivot]]',
    '',
    renderBalanceMeetingPivotSection(model),
    ...(quantumModeDefault() ? [renderQuantumFoldSection(model), ''] : []),
    ...(() => {
      const axes = ['seal', 'balance', 'gravity', 'trinity', 'horo'] as const
      const pivots = pivotSingleFolder(model)
      return axes.flatMap((axis) => [
        renderPivotTable(pivots.tables.find((t) => t.axis === axis)!),
      ])
    })(),
    '',
    '## analytics',
    '',
    `- bond degree \`${model.analytics.bondDegree}\` · sealed \`${model.analytics.sealed}\` · horo \`${model.analytics.horo ?? '—'}\``,
    `- variance \`${model.analytics.variance}\` · balanced \`${model.analytics.balanced}\` · trinity sum \`${model.analytics.trinitySum}\``,
    `- bindings \`${model.analytics.bindingCount}\` · standards \`${model.analytics.standardCount}\``,
    '',
    '## identity',
    '',
    `- uuid \`${model.uuid ?? '—'}\``,
    `- bonds in \`${model.bondsIn}\` · out \`${model.bondsOut}\``,
    `- trinity form·code·proof \`${model.form}\`·\`${model.code}\`·\`${model.proof}\``,
    `- links \`${model.linksResolved}\` / \`${model.linksTotal}\``,
    `- folded \`${model.folded ? 1 : 0}\` · escapes \`${model.escapes}\``,
    '',
    '## [[seal]]',
    '',
    `- \`${model.sealed ? 'sealed' : 'unsealed'}\` — [[purity]] · [[seal]] · [[diamond]]`,
    '',
    '---',
    '',
    `<sub>content-uuid \`${uuid}\` · framed by typography partition \`${model.typography.partition}\` bonds \`${model.typography.bondDegree}\` · \`pnpm readme\` · \`pnpm readme:check\`</sub>`,
    '',
  )
  return L.join('\n')
}

/** Every atom folder (a SKILL.md path) under src/. */
export function listAtomPaths(cwd: string = process.cwd()): string[] {
  const root = join(cwd, SRC)
  return walkSkills(root)
    .map((sk) => relative(root, dirname(sk)).replace(/\\/g, '/'))
    .sort()
}

export interface AtomBasis {
  readonly atoms: number
  /** Irreducible generators — own executable logic; the basis to KEEP. */
  readonly basis: number
  /** Rosetta combinations of the basis — derivable, purge candidates. */
  readonly combinations: number
  readonly vocabOnly: number
  readonly barrelOnly: number
  readonly composeNoLogic: number
  /** combinations ÷ atoms — the share of the corpus that is derivable. */
  readonly combinationShare: number
}

const REEXPORT_LINE = /^\s*export\s+(\{[^}]*\}|\*|type\s)/
const IMPORT_LINE = /^\s*import\s/
const OWN_LOGIC = /\b(function|class)\b|=>|export const \w+ =/

/**
 * Classify every atom as an irreducible GENERATOR (own logic — keep) or a rosetta
 * COMBINATION (vocab-prose · barrel · compose-only — derivable from the basis + link
 * graph). The corpus infinity is combinations of a small basis ([[dissolution]]/universal):
 * this reports how much is derivable. Pure fs scan — reused by `erpax doctor corpus`.
 */
export function atomBasisScan(cwd: string = process.cwd()): AtomBasis {
  const root = join(cwd, SRC)
  let atoms = 0
  let vocabOnly = 0
  let barrelOnly = 0
  let composeNoLogic = 0
  let basis = 0
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    const names = new Set(entries.filter((e) => e.isFile()).map((e) => e.name))
    if (names.has('SKILL.md') || names.has('index.ts')) {
      atoms++
      if (!names.has('index.ts')) {
        vocabOnly++
      } else {
        let lines: string[] = []
        try {
          lines = readFileSync(join(dir, 'index.ts'), 'utf8').split('\n')
        } catch {
          /* unreadable — treat as basis, don't purge blind */
        }
        const code = lines.filter((l) => {
          const s = l.trim()
          return s !== '' && !s.startsWith('//') && !s.startsWith('/*') && !s.startsWith('*')
        })
        const ownLogic = code.filter((l) => OWN_LOGIC.test(l) && !REEXPORT_LINE.test(l))
        if (code.every((l) => REEXPORT_LINE.test(l) || IMPORT_LINE.test(l) || ['', '}', ')'].includes(l.trim()))) {
          barrelOnly++
        } else if (ownLogic.length === 0) {
          composeNoLogic++
        } else {
          basis++
        }
      }
    }
    for (const e of entries) {
      if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'worktrees') walk(join(dir, e.name))
    }
  }
  walk(root)
  const combinations = vocabOnly + barrelOnly + composeNoLogic
  return {
    atoms,
    basis,
    combinations,
    vocabOnly,
    barrelOnly,
    composeNoLogic,
    combinationShare: atoms > 0 ? combinations / atoms : 0,
  }
}

export interface FoldFamily {
  readonly parent: string
  readonly kind: 'enum' | 'compound'
  readonly members: readonly string[]
}

const REF_RE = /@\/([a-zA-Z0-9/_-]+)/g
const WIKI_RE = /\[\[([a-zA-Z0-9/_-]+)\]\]/g

/** Never a corpus atom — node_modules and nested git worktrees (untracked duplicate checkouts). */
const FOLD_SKIP_DIRS = new Set(['node_modules', 'worktrees'])

/**
 * English affix prefixes — `un⊕X`, `de⊕X`, `re⊕X` … are real words (unemployment, delimited),
 * NOT namespace compounds. An affix as PARENT is always a false positive: reject the whole family.
 * Contrast legitimate namespace families (it/wp/tv country-org codes, nonprofit enum) — those parents
 * are not affixes and survive.
 */
const AFFIX_PREFIXES = new Set(['un', 'de', 're', 'pre', 'non', 'over', 'under', 'dis', 'mis'])

let cachedSchemaTerms: Set<string> | null = null
let cachedSchemaTermsCwd: string | undefined

/**
 * Every real schema.org term, lowercased + alphanumeric-normalised (dictionary-free real-word guard).
 * Comprehensive parse of `sti/vocabulary/schemaorg.jsonld`: each `@id` local name, `rdfs:label`,
 * `skos:prefLabel`, and — because identifier terms end `…Code` (`iso6523Code`, `icaoCode`, `iataCode`) —
 * the `code`-stripped stem. Captures gtin8 · sha256 · iso6523 · iata · icao as real terms. Absent file
 * (isolated test cwd) ⇒ empty set (the affix guard still fires). Cached per cwd — parsed once.
 */
function schemaOrgTerms(cwd: string): Set<string> {
  if (cachedSchemaTerms && cachedSchemaTermsCwd === cwd) return cachedSchemaTerms
  const terms = new Set<string>()
  const norm = (s: string): string => s.toLowerCase().replace(/[^a-z0-9]/g, '')
  const add = (v: unknown): void => {
    if (typeof v === 'string') {
      const n = norm(v)
      if (!n) return
      terms.add(n)
      if (n.endsWith('code') && n.length > 4) terms.add(n.slice(0, -4))
    } else if (Array.isArray(v)) {
      v.forEach(add)
    } else if (v && typeof v === 'object' && '@value' in (v as Record<string, unknown>)) {
      add((v as Record<string, unknown>)['@value'])
    }
  }
  try {
    const raw = readFileSync(join(cwd, SRC, 'sti', 'vocabulary', 'schemaorg.jsonld'), 'utf8')
    const graph = (JSON.parse(raw) as { '@graph'?: Array<Record<string, unknown>> })['@graph'] ?? []
    for (const n of graph) {
      const id = n['@id']
      if (typeof id === 'string' && id.includes(':')) add(id.slice(id.indexOf(':') + 1))
      add(n['rdfs:label'])
      add(n['skos:prefLabel'])
    }
  } catch {
    /* absent in an isolated cwd — affix guard alone carries the test */
  }
  cachedSchemaTerms = terms
  cachedSchemaTermsCwd = cwd
  return terms
}

/**
 * Fold plan — the reused fold-manifest computation ([[rules]] rosetta · the fold algebra
 * on names). A safe foldable family is a parent atom with ≥2 orphaned children whose leaf
 * is `parent ⊕ suffix`: an ENUM child (digit-code suffix, e.g. `percentile10`) or a
 * COMPOUND child (suffix is another existing atom, e.g. `itcooperative` = `it⊕cooperative`).
 * Dictionary-free real-word guard: a COMPOUND family is rejected when its parent is an English
 * affix (`un⊕`, `de⊕`, `under⊕` … are real words, not namespaces) or when a member's full leaf is
 * an actual schema.org term (`amends`). ENUM families (parent+digit) stay always-safe. Members are
 * deduped by leaf (untracked `worktrees/` checkouts are skipped) so the ≥2 rule counts distinct atoms.
 * Read-only — deletion stays human-confirmed. Replaces the throwaway research scripts of 2026-07-15.
 */
export function foldPlan(cwd: string = process.cwd()): readonly FoldFamily[] {
  const root = join(cwd, SRC)
  const leafOf = new Map<string, string>() // atomPath -> leaf
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    const names = entries.filter((e) => e.isFile()).map((e) => e.name)
    if (names.includes('SKILL.md') || names.includes('index.ts')) {
      const ap = relative(root, dir).replace(/\\/g, '/')
      leafOf.set(ap, ap.split('/').pop() ?? ap)
    }
    for (const e of entries) if (e.isDirectory() && !FOLD_SKIP_DIRS.has(e.name)) walk(join(dir, e.name))
  }
  walk(root)
  const vocab = new Set(leafOf.values())
  const schemaTerms = schemaOrgTerms(cwd)
  // inbound references — an atom is orphaned when nothing imports its path or links its leaf
  const refs = new Set<string>()
  const links = new Set<string>()
  const scan = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory() && !FOLD_SKIP_DIRS.has(e.name)) scan(p)
      else if (e.isFile() && e.name !== 'skills.index.ts' && /\.(ts|tsx|md)$/.test(e.name)) {
        let t = ''
        try {
          t = readFileSync(p, 'utf8')
        } catch {
          continue
        }
        for (const m of t.matchAll(REF_RE)) refs.add(m[1]!)
        for (const m of t.matchAll(WIKI_RE)) links.add(m[1]!.split('/').pop()!)
      }
    }
  }
  scan(root)
  const orphan = (ap: string, leaf: string): boolean =>
    ![...refs].some((r) => r === ap || r.startsWith(ap + '/')) && !links.has(leaf)
  const enumF = new Map<string, Set<string>>()
  const compF = new Map<string, Set<string>>()
  const push = (m: Map<string, Set<string>>, parent: string, leaf: string): void => {
    const s = m.get(parent) ?? new Set<string>()
    s.add(leaf)
    m.set(parent, s)
  }
  for (const [ap, leaf] of leafOf) {
    if (!orphan(ap, leaf)) continue
    for (let i = leaf.length - 1; i >= 2; i--) {
      const parent = leaf.slice(0, i)
      const suf = leaf.slice(i)
      if (!vocab.has(parent) || parent === leaf) continue
      if (/^\d[a-z0-9]*$/.test(suf)) push(enumF, parent, leaf)
      // COMPOUND: reject affix parents (real words) and members that are real schema.org terms.
      else if (vocab.has(suf) && !AFFIX_PREFIXES.has(parent) && !schemaTerms.has(leaf)) push(compF, parent, leaf)
      break
    }
  }
  const out: FoldFamily[] = []
  for (const [parent, members] of enumF) if (members.size >= 2) out.push({ parent, kind: 'enum', members: [...members] })
  for (const [parent, members] of compF) if (members.size >= 2) out.push({ parent, kind: 'compound', members: [...members] })
  return out.sort((a, b) => b.members.length - a.members.length)
}

export interface StandardsDimension {
  readonly position: number
  readonly ray: string
  readonly atoms: number
  readonly withStandard: number
  readonly coverage: number
  readonly distinctStandards: number
}
export interface SevenDimStandards {
  readonly dimensions: readonly StandardsDimension[]
  /** The invariant: standards present in every one of the 7 ring dimensions simultaneously. */
  readonly metInAll: boolean
  readonly offRing: number
}

const RAY_OF: Readonly<Record<number, string>> = {
  1: 'base', 2: 'share', 4: 'weave', 8: 'crest', 7: 'descent', 5: 'round', 9: 'unity',
}
const FORMAL_STD = /^(ISO|IEC|IFRS|RFC|W3C|EN|ETSI|NIST|WCAG|GDPR|SOX)/i

/**
 * The 7-dimensional standards invariant ([[rosetta]] · [[horo]] · [[standards]]): for each of the
 * 7 ring positions (base·share·weave·crest·descent·round·unity), is a formal standard present?
 * "Standards met in all 7 dimensions simultaneously" is metInAll. Pure fs scan over SKILL.md
 * frontmatter (horo) + @standard banners. Instruments the invariant the reorganization holds to.
 */
export function standardsDimensions(cwd: string = process.cwd()): SevenDimStandards {
  const root = join(cwd, SRC)
  const dim = new Map<number, { atoms: number; withStd: number; stds: Set<string> }>()
  for (const p of Object.keys(RAY_OF)) dim.set(Number(p), { atoms: 0, withStd: 0, stds: new Set() })
  let offRing = 0
  const walk = (d: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    if (entries.some((e) => e.isFile() && e.name === 'SKILL.md')) {
      let t = ''
      try {
        t = readFileSync(join(d, 'SKILL.md'), 'utf8')
      } catch {
        /* skip */
      }
      const fm = t.startsWith('---') ? t.split('---')[1] ?? '' : ''
      const hm = /^horo:\s*(\d+)/m.exec(fm)
      const horo = hm ? Number(hm[1]) : null
      const stds = new Set<string>()
      for (const m of t.matchAll(/@standard\s+([A-Za-z0-9][\w./:-]+)/g)) {
        if (FORMAL_STD.test(m[1]!)) stds.add(m[1]!)
      }
      const bucket = horo !== null ? dim.get(horo) : undefined
      if (bucket) {
        bucket.atoms++
        if (stds.size > 0) {
          bucket.withStd++
          for (const s of stds) bucket.stds.add(s)
        }
      } else offRing++
    }
    for (const e of entries) if (e.isDirectory() && e.name !== 'node_modules' && e.name !== 'worktrees') walk(join(d, e.name))
  }
  walk(root)
  const dimensions = [1, 2, 4, 8, 7, 5, 9].map((position) => {
    const b = dim.get(position)!
    return {
      position,
      ray: RAY_OF[position]!,
      atoms: b.atoms,
      withStandard: b.withStd,
      coverage: b.atoms > 0 ? b.withStd / b.atoms : 0,
      distinctStandards: b.stds.size,
    }
  })
  return { dimensions, metInAll: dimensions.every((x) => x.withStandard > 0), offRing }
}

/** Derive folder README model — frozen typography graph + receipt chain (write ≡ verify). */
export function deriveFolderReadme(
  atomPath: string,
  cwd: string = process.cwd(),
  frozen: ReadmeCorpusFrozenInputs = buildReadmeCorpusFrozenInputs(cwd),
): FolderReadmeModel {
  return deriveFolderModel(atomPath, cwd, frozen.ctx, frozen.graph)
}

export function generateFolderReadme(atomPath: string, cwd: string = process.cwd()): string {
  return renderFolderReadme(deriveFolderReadme(atomPath, cwd))
}

export function verifyFolderReadmes(cwd: string = process.cwd()): { ok: boolean; drift: string[] } {
  return verifyComputedFaces(cwd).readme
}

/** Agent deployment brief — token-dense projection of DiamondModel for LLM context. */
export interface LLMBriefModel {
  readonly atomPath: string
  readonly leaf: string
  readonly uuid: string | null
  readonly diamondUuid: string
  readonly horo: number | null
  readonly measure: string | null
  readonly trinity: `${0 | 1}·${0 | 1}·${0 | 1}`
  readonly sealed: 0 | 1
  readonly imports: readonly string[]
  readonly exports: readonly string[]
  readonly escapes: readonly string[]
  readonly links: `${number}/${number}`
  readonly folded: 0 | 1
  readonly bondsIn: number
  readonly bondsOut: number
  readonly neighborsOut: readonly string[]
  readonly neighborsIn: readonly string[]
  readonly analysisNeighbors: readonly string[]
  readonly faces: readonly [boolean, boolean, boolean]
  readonly law: string | null
  /** SKILL frontmatter description — when to use this atom (self-sufficient trigger). */
  readonly description: string | null
  /** Usage / methods face from SKILL.md — how to invoke. */
  readonly usage: string | null
  /** Results / proof face from SKILL.md — what success looks like. */
  readonly proof: string | null
}

const LAW_RE = /\*\*Law — \[\[law\]\]:\s*(.+?)\*\*/g

/** Extract the last law line from SKILL.md — pure on text input. */
export function lawLineOf(skillText: string): string | null {
  let last: string | null = null
  for (const m of skillText.matchAll(LAW_RE)) {
    last = m[1]!.trim()
  }
  return last
}

/** Read law line from atom folder SKILL.md. */
export function lawLineForAtom(atomPath: string, cwd: string = process.cwd()): string | null {
  try {
    return lawLineOf(readFileSync(join(cwd, SRC, atomPath, 'SKILL.md'), 'utf8'))
  } catch {
    return null
  }
}

function folderComputation(
  atomPath: string,
  cwd: string,
  graph?: AnalysisTypographyGraph,
  ctx?: FolderReadmeContext,
) {
  return computeDiamond({
    kind: 'path',
    path: atomPath,
    cwd,
    ...(graph !== undefined && ctx !== undefined ? { graph, ctx } : {}),
  })
}

const clipLlm = (text: string | null, max = 480): string | null => {
  if (!text?.trim()) return null
  const t = text.replace(/\s+/g, ' ').trim()
  return t.length <= max ? t : `${t.slice(0, max - 1).trimEnd()}…`
}

/** Derive the agent deployment brief from folder + diamond models — pure when cwd omitted. */
export function deriveLLMBrief(
  folder: FolderReadmeModel,
  diamond: DiamondModel,
  law: string | null,
  cwd?: string,
): LLMBriefModel {
  const faces = deploymentFaces(diamond)
  let description: string | null = cwd ? skillDescriptionOf(folder.atomPath, cwd) : null
  let usage: string | null = null
  let proof: string | null = null
  if (cwd) {
    try {
      const paper = scientificPaperOf(
        readFileSync(join(cwd, SRC, folder.atomPath, 'SKILL.md'), 'utf8'),
        'SKILL.md',
        folder.sealed,
      )
      if (!description) description = clipLlm(paper.abstract)
      usage = clipLlm(paper.methods)
      proof = clipLlm(paper.results ?? law)
    } catch {
      /* vocabulary-only or missing SKILL */
    }
  }
  return {
    atomPath: folder.atomPath,
    leaf: folder.leaf,
    uuid: folder.uuid,
    diamondUuid: diamondUuid(diamond),
    horo: folder.horo,
    measure: folder.measure,
    trinity: `${folder.form}·${folder.code}·${folder.proof}`,
    sealed: folder.sealed ? 1 : 0,
    imports: [...diamond.imports].sort(),
    exports: [...diamond.exports].sort(),
    escapes: [...diamond.escapes].sort(),
    links: `${folder.linksResolved}/${folder.linksTotal}`,
    folded: folder.folded ? 1 : 0,
    bondsIn: folder.bondsIn,
    bondsOut: folder.bondsOut,
    neighborsOut: neighborsOf(folder.leaf).map((n) => n.atom).sort(),
    neighborsIn: backlinksOf(folder.leaf).map((n) => n.atom).sort(),
    analysisNeighbors: [...folder.typography.analysisNeighbors],
    faces: [faces.worker, faces.plugin, faces.pwa],
    law,
    description: clipLlm(description),
    usage,
    proof: clipLlm(proof ?? law),
  }
}

/** Content-uuid of the LLM brief model bytes. */
export function llmBriefUuid(model: LLMBriefModel): string {
  return toUuid(Buffer.from(stableStringify(model), 'utf8'))
}

const joinTokens = (items: readonly string[]): string => (items.length > 0 ? items.join('·') : '—')

const exportPreview = (exports: readonly string[], max = 16): string => {
  if (exports.length === 0) return '—'
  if (exports.length <= max) return exports.join(' · ')
  return `${exports.slice(0, max).join(' · ')} · …+${exports.length - max}`
}

/** Render LLM.md — self-sufficient agent deployment face (no SKILL.md required to act). */
export function renderLLM(model: LLMBriefModel): string {
  const uuid = llmBriefUuid(model)
  const L: string[] = [
    '<!-- GENERATED by src/readme/index.ts — agent deployment face; do NOT edit by hand.',
    '     Self-sufficient: when · usage · law · code · graph. Run `pnpm readme` to regenerate. -->',
    '',
    `# ${model.leaf}`,
    '',
    '## when',
    '',
    model.description ?? '—',
    '',
    '## usage',
    '',
    model.usage ?? `import from \`@/${model.atomPath}\` · read \`index.ts\``,
    '',
    '## law',
    '',
    model.law ?? model.proof ?? '—',
    '',
    '## code',
    '',
    `entry \`@/${model.atomPath}\` · sealed \`${model.sealed}\` · trinity \`${model.trinity}\``,
    `exports ${exportPreview(model.exports)}`,
    `imports ${joinTokens(model.imports)}`,
    '',
    '## graph',
    '',
    `path \`${model.atomPath}\` · uuid \`${model.uuid ?? '—'}\` · diamond \`${model.diamondUuid}\``,
    `horo \`${model.horo ?? '—'}\` \`${model.measure ?? '—'}\` · links \`${model.links}\` · folded \`${model.folded}\``,
    `bonds in \`${model.bondsIn}\` out \`${model.bondsOut}\` · faces worker·plugin·pwa \`${model.faces.map((f) => (f ? 1 : 0)).join('·')}\``,
    `neighbors → ${joinTokens(model.neighborsOut)} · ← ${joinTokens(model.neighborsIn)}`,
    `analysis ${joinTokens(model.analysisNeighbors)}`,
    '',
    '---',
    '',
    `<sub>content-uuid \`${uuid}\` · \`pnpm readme\` · \`pnpm computed:check\`</sub>`,
    '',
  ]
  return L.join('\n')
}

/** Derive machine-readable diamond snapshot — pure. */
export function deriveDiamondJson(diamond: DiamondModel): Record<string, unknown> {
  return JSON.parse(renderDiamondJson(diamond).trim()) as Record<string, unknown>
}

export { renderDiamondJson }

export interface ComputedFaceDrift {
  readonly readme: { ok: boolean; drift: string[] }
  readonly llm: { ok: boolean; drift: string[] }
  readonly diamond: { ok: boolean; drift: string[] }
}

/** Write README.md + LLM.md + diamond.json for explicit paths only (fast batch). Balanced ledger entries skip derive + write. */
export function materializeComputedFacesForPaths(
  paths: readonly string[],
  cwd: string = process.cwd(),
  graph?: AnalysisTypographyGraph,
  ctx?: FolderReadmeContext,
  ledger?: { readonly prev: CorpusFoldLedger; readonly next: CorpusFoldLedger },
): number {
  const frozen =
    graph !== undefined && ctx !== undefined
      ? { graph, ctx }
      : buildReadmeCorpusFrozenInputs(cwd)
  const g = graph ?? frozen.graph
  const c = ctx ?? frozen.ctx
  let n = 0
  for (const atomPath of paths) {
    const folder = deriveFolderModel(atomPath, cwd, c, g)
    const law = lawLineForAtom(atomPath, cwd)
    const inFold = ledger ? atomInputFold(atomPath, folder, law, cwd) : null
    if (ledger && inFold) {
      const entry = ledger.prev[atomPath]
      if (entry?.in === inFold && entry.out === atomFacesFold(atomPath, cwd)) {
        ledger.next[atomPath] = entry
        continue
      }
    }
    const computation = folderComputation(atomPath, cwd, g, c)
    const diamond = computation.model
    const dir = join(cwd, SRC, atomPath)
    writeFileSync(join(dir, 'README.md'), renderFolderReadme(folder))
    writeFileSync(join(dir, 'LLM.md'), renderLLM(deriveLLMBrief(folder, diamond, law, cwd)))
    writeFileSync(join(dir, 'diamond.json'), renderDiamondJson(diamond, computation.stages))
    if (ledger && inFold) {
      const out = atomFacesFold(atomPath, cwd)
      if (out) ledger.next[atomPath] = { in: inFold, out }
    }
    n++
  }
  return n
}

/**
 * Path-batch materialize with frozen typography graph + receipt chain.
 * Two passes — graph root and receipt chain converge after batch writes.
 */
export function materializeComputedFacesForPathsStable(
  paths: readonly string[],
  cwd: string = process.cwd(),
): number {
  let n = 0
  for (let pass = 0; pass < 2; pass++) {
    const frozen = buildReadmeCorpusFrozenInputs(cwd)
    n += materializeComputedFacesForPaths(paths, cwd, frozen.graph, frozen.ctx)
  }
  return n
}

/** Write README.md + LLM.md + diamond.json in every atom folder; returns count written. */
export function materializeComputedFaces(
  cwd: string = process.cwd(),
  corpus: ReadmeCorpus = buildReadmeCorpus(cwd),
  paths?: readonly string[],
): number {
  if (paths && paths.length > 0) return materializeComputedFacesForPathsStable(paths, cwd)
  const { models } = corpus
  let n = 0
  for (const folder of models) {
    const atomPath = folder.atomPath
    const computation = folderComputation(atomPath, cwd, corpus.graph, corpus.ctx)
    const diamond = computation.model
    const law = lawLineForAtom(atomPath, cwd)
    const dir = join(cwd, SRC, atomPath)
    writeFileSync(join(dir, 'README.md'), renderFolderReadme(folder))
    writeFileSync(join(dir, 'LLM.md'), renderLLM(deriveLLMBrief(folder, diamond, law, cwd)))
    writeFileSync(join(dir, 'diamond.json'), renderDiamondJson(diamond, computation.stages))
    n++
  }
  return n
}

/** Drift gate for all computed faces per folder. */
export function verifyComputedFaces(
  cwd: string = process.cwd(),
  corpus: ReadmeCorpus = buildReadmeCorpus(cwd),
): ComputedFaceDrift {
  const { models } = corpus
  const readmeDrift: string[] = []
  const llmDrift: string[] = []
  const diamondDrift: string[] = []
  for (const folder of models) {
    driftCheckOf(folder.atomPath, folder, cwd, readmeDrift, llmDrift, diamondDrift, corpus.graph, corpus.ctx)
  }
  return {
    readme: { ok: readmeDrift.length === 0, drift: readmeDrift },
    llm: { ok: llmDrift.length === 0, drift: llmDrift },
    diamond: { ok: diamondDrift.length === 0, drift: diamondDrift },
  }
}

const driftCheckOf = (
  atomPath: string,
  folder: FolderReadmeModel,
  cwd: string,
  readmeDrift: string[],
  llmDrift: string[],
  diamondDrift: string[],
  graph?: AnalysisTypographyGraph,
  ctx?: FolderReadmeContext,
  ledger?: { readonly prev: CorpusFoldLedger; readonly next: CorpusFoldLedger },
): void => {
  const law = lawLineForAtom(atomPath, cwd)
  const inFold = ledger ? atomInputFold(atomPath, folder, law, cwd) : null
  if (ledger && inFold) {
    const entry = ledger.prev[atomPath]
    if (entry?.in === inFold && entry.out === atomFacesFold(atomPath, cwd)) {
      ledger.next[atomPath] = entry
      return
    }
  }
  const computation = folderComputation(atomPath, cwd, graph, ctx)
  const diamond = computation.model
  const dir = join(cwd, SRC, atomPath)
  const expectedReadme = renderFolderReadme(folder)
  const expectedLlm = renderLLM(deriveLLMBrief(folder, diamond, law, cwd))
  const expectedDiamond = renderDiamondJson(diamond, computation.stages)
  let balanced = true
  const check = (name: string, expected: string, drift: string[]): void => {
    const path = join(dir, name)
    let actual = ''
    try {
      actual = readFileSync(path, 'utf8')
    } catch {
      drift.push(atomPath + ' (missing)')
      balanced = false
      return
    }
    if (actual !== expected) {
      drift.push(atomPath)
      balanced = false
    }
  }
  check('README.md', expectedReadme, readmeDrift)
  check('LLM.md', expectedLlm, llmDrift)
  check('diamond.json', expectedDiamond, diamondDrift)
  if (ledger && inFold && balanced) {
    const out = atomFacesFold(atomPath, cwd)
    if (out) ledger.next[atomPath] = { in: inFold, out }
  }
}

/** Drift gate for explicit paths only (fast batch). */
export function verifyComputedFacesForPaths(
  paths: readonly string[],
  cwd: string = process.cwd(),
): ComputedFaceDrift {
  const { graph, ctx } = buildReadmeCorpusFrozenInputs(cwd)
  const readmeDrift: string[] = []
  const llmDrift: string[] = []
  const diamondDrift: string[] = []
  for (const atomPath of paths) {
    const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
    driftCheckOf(atomPath, folder, cwd, readmeDrift, llmDrift, diamondDrift, graph, ctx)
  }
  return {
    readme: { ok: readmeDrift.length === 0, drift: readmeDrift },
    llm: { ok: llmDrift.length === 0, drift: llmDrift },
    diamond: { ok: diamondDrift.length === 0, drift: diamondDrift },
  }
}

/** Drift gate in horo waves — 7×441 paths, one batch at a time (OOM guard). Balanced ledger entries skip derivation. */
export function verifyComputedFacesInWaves(
  cwd: string = process.cwd(),
  onWave?: (ordinal: number, itemCount: number, driftSoFar: number) => void,
): ComputedFaceDrift {
  const readmeDrift: string[] = []
  const llmDrift: string[] = []
  const diamondDrift: string[] = []
  const { graph, ctx } = buildReadmeCorpusFrozenInputs(cwd, { pathFollowGate: true })
  const ledger = { prev: readCorpusFoldLedger(cwd), next: {} as CorpusFoldLedger }
  const policy = maxWorkTamperPolicy()
  for (const wave of corpusPathWaveBatches({}, policy)) {
    for (const atomPath of wave.items) {
      const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
      driftCheckOf(atomPath, folder, cwd, readmeDrift, llmDrift, diamondDrift, graph, ctx, ledger)
    }
    onWave?.(wave.ordinal, wave.itemCount, readmeDrift.length + llmDrift.length + diamondDrift.length)
  }
  if (readmeDrift.length + llmDrift.length + diamondDrift.length === 0) writeCorpusFoldLedger(ledger.next, cwd)
  return {
    readme: { ok: readmeDrift.length === 0, drift: readmeDrift },
    llm: { ok: llmDrift.length === 0, drift: llmDrift },
    diamond: { ok: diamondDrift.length === 0, drift: diamondDrift },
  }
}

/** Materialize computed faces in horo waves — 7×441 paths (OOM guard). */
export function materializeComputedFacesInWaves(
  cwd: string = process.cwd(),
  onWave?: (ordinal: number, itemCount: number, written: number) => void,
): number {
  const { graph, ctx } = buildReadmeCorpusFrozenInputs(cwd, { pathFollowGate: true })
  const ledger = { prev: readCorpusFoldLedger(cwd), next: {} as CorpusFoldLedger }
  let total = 0
  const policy = maxWorkTamperPolicy()
  for (const wave of corpusPathWaveBatches({}, policy)) {
    const n = materializeComputedFacesForPaths(wave.items, cwd, graph, ctx, ledger)
    total += n
    onWave?.(wave.ordinal, wave.itemCount, total)
  }
  writeCorpusFoldLedger(ledger.next, cwd)
  return total
}

/** @deprecated Use materializeComputedFaces — writes README.md only. */
export function materializeFolderReadmes(cwd: string = process.cwd()): number {
  return materializeComputedFaces(cwd)
}

/**
 * Corpus fold root — the whole payload (inputs ⊕ generated faces) folded to one digest in one walk
 * ([[quantum]]/cache: content IS the key, a changed input is a different key). A matching root means
 * every face-drift verdict from the sealed run still holds — zero recompute on an unchanged tree.
 */
export function corpusFoldRoot(cwd: string = process.cwd()): string {
  const hash = createHash('sha256')
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
      if (e.isSymbolicLink()) continue
      if (e.isDirectory() && (e.name === 'node_modules' || e.name === 'worktrees')) continue
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        walk(p)
        continue
      }
      hash.update(relative(cwd, p))
      hash.update(readFileSync(p))
    }
  }
  walk(join(cwd, SRC))
  for (const extra of ['package.json', 'wrangler.jsonc', 'README.md']) {
    try {
      hash.update(readFileSync(join(cwd, extra)))
    } catch {
      /* absent extra input — root still deterministic */
    }
  }
  return hash.digest('hex')
}

export interface CorpusFoldReceipt {
  readonly root: string
  readonly faces: number
  readonly at: string
}

const foldReceiptPath = (cwd: string): string => join(cwd, 'node_modules', '.cache', 'erpax', 'fold.json')

/** Read the sealed fold receipt — null when absent or unreadable (falls through to full verify). */
export function readCorpusFoldReceipt(cwd: string = process.cwd()): CorpusFoldReceipt | null {
  try {
    const r = JSON.parse(readFileSync(foldReceiptPath(cwd), 'utf8')) as CorpusFoldReceipt
    return typeof r.root === 'string' && r.root.length > 0 ? r : null
  } catch {
    return null
  }
}

/** Seal the fold after a GREEN full verify — local accelerator only (gitignored cache dir). */
export function sealCorpusFold(root: string, faces: number, cwd: string = process.cwd()): CorpusFoldReceipt {
  const receipt: CorpusFoldReceipt = { root, faces, at: new Date().toISOString() }
  const path = foldReceiptPath(cwd)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(receipt, null, 2) + '\n')
  return receipt
}

/**
 * Per-atom double-torus ledger — double-entry compute accounting ([[accounting]] · [[quantum]]).
 * Debit lobe `in`: the atom's input closure folded to one digest (files + graph row — the inhale).
 * Credit lobe `out`: its three faces folded to one digest (the exhale). A balanced entry means the
 * sealed verdict still holds — the atom skips computeDiamond + renders; CPU scales with the CHANGE.
 */
export interface AtomFoldEntry {
  readonly in: string
  readonly out: string
}
export type CorpusFoldLedger = Record<string, AtomFoldEntry>

const foldLedgerPath = (cwd: string): string => join(cwd, 'node_modules', '.cache', 'erpax', 'fold-ledger.json')

export function readCorpusFoldLedger(cwd: string = process.cwd()): CorpusFoldLedger {
  try {
    return JSON.parse(readFileSync(foldLedgerPath(cwd), 'utf8')) as CorpusFoldLedger
  } catch {
    return {}
  }
}

export function writeCorpusFoldLedger(ledger: CorpusFoldLedger, cwd: string = process.cwd()): void {
  const path = foldLedgerPath(cwd)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(path, JSON.stringify(ledger))
}


/** Debit fold — folder model (carries the graph row) + law + every non-face file in the atom dir. */
export function atomInputFold(atomPath: string, folder: FolderReadmeModel, law: string | null, cwd: string): string {
  const h = createHash('sha256')
  h.update(JSON.stringify(folder))
  h.update(law ?? '')
  const dir = join(cwd, SRC, atomPath)
  let entries: Dirent[] = []
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    /* vanished atom — distinct empty fold */
  }
  for (const e of entries.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
    if (!e.isFile() || (COMPUTED_FACES as readonly string[]).includes(e.name)) continue
    h.update(e.name)
    try {
      h.update(readFileSync(join(dir, e.name)))
    } catch {
      /* unreadable input — fold the name only */
    }
  }
  return h.digest('hex')
}

/** Credit fold — the three on-disk faces to one digest; null when any face is missing. */
export function atomFacesFold(atomPath: string, cwd: string): string | null {
  const dir = join(cwd, SRC, atomPath)
  const h = createHash('sha256')
  for (const face of COMPUTED_FACES) {
    try {
      h.update(readFileSync(join(dir, face)))
    } catch {
      return null
    }
  }
  return h.digest('hex')
}
