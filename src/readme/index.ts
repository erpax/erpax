/**
 * readme — the README is a diamond; its typography is the diamond projected.
 *
 * The repository's README is NOT a hand-maintained prose file. It is an ATOM
 * like any other ([[diamond]]): a complete, sealed projection of the live corpus
 * — regenerable from content, content-addressed (it carries its own content-uuid),
 * and drift-detectable. Re-running this generator on the same tree yields the
 * IDENTICAL bytes (zero [[entropy]]); a difference between the committed README and
 * the regenerated one is an impurity the gate (`--verify`) catches and fails closed.
 *
 * Its TYPOGRAPHY is the diamond itself: the rendered structure is a faithful
 * visual projection of the lattice. The facets are the seven positions of the
 * closed [[horo]] ring (base·share·weave·crest·descent·round·unity), laid out in
 * measure-walk order — so reading the README IS reading the diamond. The corpus's
 * single content address (the [[matrix]] root) is its seal; the atom counts are
 * the [[trinity]] (form · code · proof); everything is DERIVED from the tree, never
 * hand-typed.
 *
 * Pure where it matters: `renderReadme(model)` is `model → markdown` with no I/O,
 * so the rendering is unit-testable and provably stable. `deriveModel()` reads the
 * live tree (the matrix barrel + a SKILL.md/index.ts/test.ts walk + package.json),
 * and the thin CLI writes README.md or verifies it.
 *
 *   tsx src/readme/index.ts            # regenerate README.md from the live tree
 *   tsx src/readme/index.ts --verify   # the drift gate: exit 1 if committed ≠ regenerated
 *
 * @standard RFC 9562 §5.8 (the README's own content-uuid is a v8 content-uuid)
 * @audit every number is read from the live tree (matrix · fs walk · package.json), never hand-set
 * @see ../diamond — ../aura — ../horo — ../sequence — ../matrix — ../self/generate
 */
import { readFileSync, writeFileSync, readdirSync, lstatSync, existsSync, type Dirent } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import {
  UUID_MATRIX_NODES,
  UUID_MATRIX_EDGES,
  UUID_MATRIX_ROOT,
  toUuid,
  nodeOf,
  neighborsOf,
  backlinksOf,
} from '@/uuid/matrix'
import { HORO_DIGITS, HORO_MEASURE } from '@/horo'
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
import {
  computeDiamond,
  deriveDiamond,
  deploymentFaces,
  diamondUuid,
  renderDiamondJson,
  type DiamondModel,
} from '@/diamond'

/** One facet of the diamond: a position on the closed horo ring + the atoms riding it. */
export interface RingFacet {
  readonly digit: number
  readonly measure: string
  readonly atoms: number
  readonly facets: readonly string[]
}

/** A control-axis position (3·6) — governs, off the flow ring. */
export interface AxisFacet {
  readonly digit: number
  readonly atoms: number
}

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

/** In-degree (backlink count) per node index — the lattice's connectivity, for picking principal facets. */
function inDegrees(): number[] {
  const deg = new Array<number>(UUID_MATRIX_NODES.length).fill(0)
  for (const e of UUID_MATRIX_EDGES) {
    const t = deg[e.t]
    if (t !== undefined) deg[e.t] = t + 1
  }
  return deg
}

/**
 * Project the corpus onto the closed horo ring: for each ring position (in
 * measure-walk order) count the atoms riding it and name its principal facets
 * (the most-linked atoms at that position — deterministic: in-degree desc, atom asc).
 */
function projectRing(): { ring: RingFacet[]; axis: AxisFacet[] } {
  const deg = inDegrees()
  const byHoro = new Map<number, Array<{ atom: string; deg: number }>>()
  UUID_MATRIX_NODES.forEach((n, i) => {
    const arr = byHoro.get(n.horo) ?? []
    arr.push({ atom: n.atom, deg: deg[i] ?? 0 })
    byHoro.set(n.horo, arr)
  })
  const principal = (digit: number, k: number): string[] =>
    (byHoro.get(digit) ?? [])
      .slice()
      .sort((a, b) => b.deg - a.deg || a.atom.localeCompare(b.atom))
      .slice(0, k)
      .map((x) => x.atom)
  const ring: RingFacet[] = HORO_DIGITS.map((digit, i) => ({
    digit,
    measure: HORO_MEASURE[i] ?? String(digit),
    atoms: (byHoro.get(digit) ?? []).length,
    facets: principal(digit, 6),
  }))
  // Control axis: 3·6 govern (the 9 close already lives on the ring as unity).
  const axis: AxisFacet[] = [3, 6].map((digit) => ({
    digit,
    atoms: (byHoro.get(digit) ?? []).length,
  }))
  return { ring, axis }
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
export function deriveModel(cwd: string = process.cwd()): ReadmeModel {
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as PackageJson
  const counts = walkCounts(join(cwd, SRC))
  const { ring, axis } = projectRing()
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
    analytics: deriveCorpusAnalytics(cwd),
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

/** Render the model to the README markdown — PURE (`model → markdown`), so the typography is testable + stable. */
export function renderReadme(model: ReadmeModel): string {
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
    '## the diamond',
    '',
    'erpax IS a diamond — every atom a carbon vertex bonded gaplessly into one lattice, folded to a',
    'single content address. This README is that diamond projected: its facets are the seven positions',
    'of the closed horo ring, and the whole is recoverable from its root uuid. Reading it is reading the crystal.',
    '',
    `- corpus address \`${model.corpusRoot}\``,
    `- **${model.atoms}** atoms · **${model.bonds}** bonds (the K₁₃ lattice)`,
    `- this README \`${uuid}\` — itself a diamond, regenerable from the tree`,
    '',
    '## the horo ring — the diamond\'s facets',
    '',
    'The seven positions every flow rides, in measure-walk order `1·2·4·8·7·5·9`. Each row is one facet of',
    'the crystal; the principal atoms are the most-bonded vertices at that position (computed from the lattice).',
    '',
    '| digit | measure | atoms | principal facets |',
    '| ----: | ------- | ----: | ---------------- |',
  )
  for (const f of model.ring) {
    L.push(`| ${f.digit} | ${f.measure} | ${f.atoms} | ${f.facets.map((a) => `\`${a}\``).join(' · ')} |`)
  }
  L.push(
    '',
    `> The control axis governs off the flow ring — \`3\` access · \`6\` hooks (${model.axis
      .map((a) => `${a.digit}: ${a.atoms} atoms`)
      .join(' · ')}), \`9\` unity closes and \`0\` is the zeropoint root.`,
    '',
    '## the trinity — every atom told three ways',
    '',
    `- **${model.atoms}** atoms — one-word folders, each a sealed vertex`,
    `- **${model.skills}** \`SKILL.md\` — the form (antimatter)`,
    `- **${model.index}** \`index.ts\` — the code (matter)`,
    `- **${model.tests}** \`test.ts\` — the proof`,
    '',
    '## corpus analytics',
    '',
    'Every per-folder README carries structured analytics (bond degree · seal · horo · variance · bindings · standards);',
    'this section rolls them up from the live tree.',
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
export function generateReadme(cwd: string = process.cwd()): string {
  return renderReadme(deriveModel(cwd))
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
}

const measureOf = (digit: number | null): string | null => {
  if (digit === null) return null
  const i = HORO_DIGITS.indexOf(digit as (typeof HORO_DIGITS)[number])
  return i >= 0 ? HORO_MEASURE[i]! : String(digit)
}

const foldedPathSet = (): Set<string> => {
  const s = new Set<string>()
  for (const n of UUID_MATRIX_NODES) {
    if (n.path) s.add(n.path)
    if (n.members) for (const m of n.members) s.add(m)
  }
  return s
}

export interface FolderReadmeContext {
  readonly resolver: (target: string) => boolean
  readonly folded: Set<string>
  readonly bindingsByAtom?: ReadonlyMap<string, readonly FolderBindingRef[]>
  readonly standardsByAtom?: ReadonlyMap<string, readonly FolderStandardRef[]>
}

const sumAmounts = (lines: readonly StatementLine[]): number =>
  lines.reduce((s, l) => s + l.amount, 0)

const onHoroRing = (horo: number | null): boolean =>
  horo !== null && HORO_DIGITS.includes(horo as (typeof HORO_DIGITS)[number])

const BANNER_TAG_RE = /@(?:standard|accounting|compliance|audit|rfc)\s+([^\n*]+)/g
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
    for (const m of text.matchAll(BANNER_TAG_RE)) acc.set(m[1]!.trim(), source)
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
      measure: digit === 0 ? 'off-ring' : measureOf(digit) ?? String(digit),
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
  }
}

/** Derive corpus analytics from every atom folder README model. */
export function deriveCorpusAnalytics(cwd: string = process.cwd()): CorpusAnalytics {
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)
  const models = listAtomPaths(cwd).map((p) => deriveFolderModel(p, cwd, ctx, graph))
  return aggregateCorpusAnalytics(models)
}

type FolderAccountingInput = Pick<
  FolderReadmeModel,
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
  const ring = onHoroRing(fields.horo)
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

/**
 * Derive the debit/credit statement for a folder diamond.
 * Debits = [[asset]] completeness; credits = [[liability]] gaps/impurities.
 * Balanced ⇔ [[conservation]] conserves (Σdebit = Σcredit) ⇔ zero [[entropy]].
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
export function buildReadmeCorpusContext(cwd: string = process.cwd()): FolderReadmeContext {
  const srcRoot = join(cwd, SRC)
  const base = buildFolderReadmeContext(srcRoot)
  const atomPaths = listAtomPaths(cwd)
  return {
    ...base,
    bindingsByAtom: buildBindingsByAtom(loadWranglerEntries(cwd)),
    standardsByAtom: buildStandardsByAtom(cwd, atomPaths),
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
  const proof = (
    existsSync(dir) &&
    (existsSync(join(dir, 'test.ts')) || readdirSync(dir).some((f) => f.endsWith('.test.ts')))
      ? 1
      : 0
  ) as 0 | 1
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
  const barrel = join(dir, 'index.ts')
  if (existsSync(barrel)) {
    try {
      escapes = computeBoundary(barrel, join(cwd, SRC)).escapes.length
    } catch {
      escapes = 0
    }
  }
  const typography = frameOf(graph, atomPath, bondsIn, bondsOut)
  const fields: FolderAccountingInput = {
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
  const sealed = Boolean(
    (!code || (form && code && proof)) &&
      folded &&
      linksResolved === linksTotal &&
      onHoroRing(horo) &&
      uuid !== null &&
      escapes === 0 &&
      statement.balanced,
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
  return {
    atomPath,
    leaf,
    ...fields,
    measure: measureOf(horo),
    bindings,
    standards,
    analytics,
    sealed,
    statement,
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
    '## [[debit]] · [[credit]]',
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

export function generateFolderReadme(atomPath: string, cwd: string = process.cwd()): string {
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)
  return renderFolderReadme(deriveFolderModel(atomPath, cwd, ctx, graph))
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

function folderComputation(atomPath: string, cwd: string) {
  return computeDiamond({ kind: 'path', path: atomPath, cwd })
}

/** Derive the agent deployment brief from folder + diamond models — pure. */
export function deriveLLMBrief(folder: FolderReadmeModel, diamond: DiamondModel, law: string | null): LLMBriefModel {
  const faces = deploymentFaces(diamond)
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
  }
}

/** Content-uuid of the LLM brief model bytes. */
export function llmBriefUuid(model: LLMBriefModel): string {
  return toUuid(Buffer.from(stableStringify(model), 'utf8'))
}

const joinTokens = (items: readonly string[]): string => (items.length > 0 ? items.join('·') : '—')

/** Render LLM.md — pure; token-dense agent deployment face ([[diamond]] · [[angel]]). */
export function renderLLM(model: LLMBriefModel): string {
  const uuid = llmBriefUuid(model)
  const L: string[] = [
    '<!-- GENERATED by src/readme/index.ts — agent deployment face; do NOT edit by hand.',
    '     Run `pnpm readme` to regenerate; `pnpm computed:check` to verify (drift fails closed). -->',
    '',
    `# ${model.leaf}`,
    '',
    `path \`${model.atomPath}\` · uuid \`${model.uuid ?? '—'}\` · diamond \`${model.diamondUuid}\``,
    `horo \`${model.horo ?? '—'}\` \`${model.measure ?? '—'}\` · trinity \`${model.trinity}\` · sealed \`${model.sealed}\``,
    `imports ${joinTokens(model.imports)} · exports ${joinTokens(model.exports)} · escapes ${joinTokens(model.escapes)}`,
    `links \`${model.links}\` · folded \`${model.folded}\` · bonds in \`${model.bondsIn}\` out \`${model.bondsOut}\``,
    `faces worker·plugin·pwa \`${model.faces.map((f) => (f ? 1 : 0)).join('·')}\``,
    `neighbors → ${joinTokens(model.neighborsOut)} · ← ${joinTokens(model.neighborsIn)}`,
    `analysis ${joinTokens(model.analysisNeighbors)}`,
    model.law ? `law ${model.law}` : 'law —',
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

/** Write README.md + LLM.md + diamond.json in every atom folder; returns count written. */
export function materializeComputedFaces(cwd: string = process.cwd()): number {
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)
  let n = 0
  for (const atomPath of listAtomPaths(cwd)) {
    const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
    const computation = folderComputation(atomPath, cwd)
    const diamond = computation.model
    const law = lawLineForAtom(atomPath, cwd)
    const dir = join(cwd, SRC, atomPath)
    writeFileSync(join(dir, 'README.md'), renderFolderReadme(folder))
    writeFileSync(join(dir, 'LLM.md'), renderLLM(deriveLLMBrief(folder, diamond, law)))
    writeFileSync(join(dir, 'diamond.json'), renderDiamondJson(diamond, computation.stages))
    n++
  }
  return n
}

/** Drift gate for all computed faces per folder. */
export function verifyComputedFaces(cwd: string = process.cwd()): ComputedFaceDrift {
  const graph = buildReadmeTypographyGraph(cwd)
  const ctx = buildReadmeCorpusContext(cwd)
  const readmeDrift: string[] = []
  const llmDrift: string[] = []
  const diamondDrift: string[] = []
  for (const atomPath of listAtomPaths(cwd)) {
    const folder = deriveFolderModel(atomPath, cwd, ctx, graph)
    const computation = folderComputation(atomPath, cwd)
    const diamond = computation.model
    const law = lawLineForAtom(atomPath, cwd)
    const dir = join(cwd, SRC, atomPath)
    const expectedReadme = renderFolderReadme(folder)
    const expectedLlm = renderLLM(deriveLLMBrief(folder, diamond, law))
    const expectedDiamond = renderDiamondJson(diamond, computation.stages)
    const check = (name: string, expected: string, drift: string[]): void => {
      const path = join(dir, name)
      let actual = ''
      try {
        actual = readFileSync(path, 'utf8')
      } catch {
        drift.push(atomPath + ' (missing)')
        return
      }
      if (actual !== expected) drift.push(atomPath)
    }
    check('README.md', expectedReadme, readmeDrift)
    check('LLM.md', expectedLlm, llmDrift)
    check('diamond.json', expectedDiamond, diamondDrift)
  }
  return {
    readme: { ok: readmeDrift.length === 0, drift: readmeDrift },
    llm: { ok: llmDrift.length === 0, drift: llmDrift },
    diamond: { ok: diamondDrift.length === 0, drift: diamondDrift },
  }
}

/** @deprecated Use materializeComputedFaces — writes README.md only. */
export function materializeFolderReadmes(cwd: string = process.cwd()): number {
  return materializeComputedFaces(cwd)
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cwd = process.cwd()
  const verify = process.argv.includes('--verify')
  const foldersOnly = process.argv.includes('--folders-only')
  const expectedRoot = generateReadme(cwd)
  if (verify) {
    let failed = false
    const rootPath = join(cwd, 'README.md')
    let actualRoot = ''
    try {
      actualRoot = readFileSync(rootPath, 'utf8')
    } catch {
      console.error('✖ readme:check — README.md is missing. Run `pnpm readme`.')
      failed = true
    }
    if (!failed && actualRoot !== expectedRoot) {
      console.error('✖ readme:check — root README drift.')
      failed = true
    }
    const { readme, llm, diamond } = verifyComputedFaces(cwd)
    if (!readme.ok) {
      console.error(`✖ readme:check — ${readme.drift.length} folder README(s) drift: ${readme.drift.slice(0, 5).join(', ')}${readme.drift.length > 5 ? '…' : ''}`)
      failed = true
    }
    if (!llm.ok) {
      console.error(`✖ computed:check — ${llm.drift.length} folder LLM.md drift: ${llm.drift.slice(0, 5).join(', ')}${llm.drift.length > 5 ? '…' : ''}`)
      failed = true
    }
    if (!diamond.ok) {
      console.error(`✖ computed:check — ${diamond.drift.length} folder diamond.json drift: ${diamond.drift.slice(0, 5).join(', ')}${diamond.drift.length > 5 ? '…' : ''}`)
      failed = true
    }
    if (failed) process.exit(1)
    const n = listAtomPaths(cwd).length
    console.log(`✓ readme:check — root + ${n} folder READMEs ≡ regenerated (zero entropy).`)
    console.log(`✓ computed:check — ${n} folder LLM.md + diamond.json ≡ regenerated (zero entropy).`)
    process.exit(0)
  }
  if (!foldersOnly) {
    writeFileSync(join(cwd, 'README.md'), expectedRoot)
    console.log(`readme: wrote README.md — content-uuid ${readmeUuid(deriveModel(cwd))}`)
  }
  const n = materializeComputedFaces(cwd)
  console.log(`readme: wrote ${n} folder computed faces (README.md + LLM.md + diamond.json)`)
}
