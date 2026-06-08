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
import { walkSkills, LINK_RE, stripCode } from '@/aura'

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
}

const SRC = 'src'
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

/** One line of the quantum accounting statement — credit/debit/balance are computed counts. */
export interface AccountingLine {
  readonly facet: string
  readonly credit: number
  readonly debit: number
  readonly balance: number
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
  readonly sealed: boolean
  readonly accounting: readonly AccountingLine[]
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

/** Derive the per-folder completeness model — impure (reads fs + matrix). */
export function deriveFolderModel(
  atomPath: string,
  cwd: string = process.cwd(),
  ctx: FolderReadmeContext = buildFolderReadmeContext(join(cwd, SRC)),
): FolderReadmeModel {
  const dir = join(cwd, SRC, atomPath)
  const form = (existsSync(join(dir, 'SKILL.md')) ? 1 : 0) as 0 | 1
  const code = (existsSync(join(dir, 'index.ts')) || existsSync(join(dir, 'index.tsx')) ? 1 : 0) as 0 | 1
  const proof = (
    existsSync(join(dir, 'test.ts')) || readdirSync(dir).some((f) => f.endsWith('.test.ts')) ? 1 : 0
  ) as 0 | 1
  const leaf = atomPath.split('/').pop() ?? atomPath
  const node = nodeOf(leaf)
  const horo = node?.horo ?? null
  const uuid = node?.uuid ?? null
  const bondsIn = backlinksOf(leaf).length
  const bondsOut = neighborsOf(leaf).length
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
  const codeRequired = code ? 1 : 0
  const trinityCredit = form + code + proof
  const trinityDebit = (code ? 3 : 1) - trinityCredit
  const linkDebit = linksTotal - linksResolved
  const accounting: AccountingLine[] = [
    { facet: 'trinity.form', credit: form, debit: 1 - form, balance: 2 * form - 1 },
    { facet: 'trinity.code', credit: code, debit: codeRequired - code, balance: code - (codeRequired - code) },
    { facet: 'trinity.proof', credit: proof, debit: codeRequired - proof, balance: proof - (codeRequired - proof) },
    { facet: 'lattice.folded', credit: folded ? 1 : 0, debit: folded ? 0 : 1, balance: folded ? 1 : -1 },
    { facet: 'links.resolve', credit: linksResolved, debit: linkDebit, balance: linksResolved - linkDebit },
    { facet: 'bonds.in', credit: bondsIn, debit: 0, balance: bondsIn },
    { facet: 'bonds.out', credit: bondsOut, debit: 0, balance: bondsOut },
  ]
  const sealed =
    (!code || (form && code && proof)) &&
    folded &&
    linksResolved === linksTotal &&
    (horo === null || HORO_DIGITS.includes(horo as (typeof HORO_DIGITS)[number]))
  return {
    atomPath,
    leaf,
    form,
    code,
    proof,
    uuid,
    horo,
    measure: measureOf(horo),
    bondsIn,
    bondsOut,
    folded,
    linksResolved,
    linksTotal,
    sealed,
    accounting,
  }
}

/** Content-uuid of the folder model bytes (same tree ⇒ same uuid). */
export function folderReadmeUuid(model: FolderReadmeModel): string {
  return toUuid(Buffer.from(stableStringify(model), 'utf8'))
}

/** Render folder README — pure; every token is a computed facet ([[diamond]] · [[purity]] · [[seal]]). */
export function renderFolderReadme(model: FolderReadmeModel): string {
  const uuid = folderReadmeUuid(model)
  const L: string[] = [
    '<!-- GENERATED by src/readme/index.ts — quantum accounting statement; do NOT edit by hand. -->',
    '',
    `# ${model.leaf}`,
    '',
    `> atom \`${model.atomPath}\` · horo \`${model.horo ?? '—'}\` \`${model.measure ?? '—'}\` · sealed \`${model.sealed ? 1 : 0}\``,
    '',
    '## quantum accounting',
    '',
    '| facet | credit | debit | balance |',
    '| ----- | -----: | ----: | ------: |',
  ]
  for (const row of model.accounting) {
    L.push(`| ${row.facet} | ${row.credit} | ${row.debit} | ${row.balance} |`)
  }
  L.push(
    '',
    '## identity',
    '',
    `- uuid \`${model.uuid ?? '—'}\``,
    `- bonds in \`${model.bondsIn}\` · out \`${model.bondsOut}\``,
    `- trinity form·code·proof \`${model.form}\`·\`${model.code}\`·\`${model.proof}\``,
    `- links \`${model.linksResolved}\` / \`${model.linksTotal}\``,
    `- folded \`${model.folded ? 1 : 0}\``,
    '',
    '## seal',
    '',
    `- \`${model.sealed ? 'sealed' : 'unsealed'}\` — [[purity]] · [[seal]] · [[diamond]]`,
    '',
    '---',
    '',
    `<sub>content-uuid \`${uuid}\` · \`pnpm readme\` · \`pnpm readme:check\`</sub>`,
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
  const ctx = buildFolderReadmeContext(join(cwd, SRC))
  return renderFolderReadme(deriveFolderModel(atomPath, cwd, ctx))
}

/** Write README.md in every atom folder; returns count written. */
export function materializeFolderReadmes(cwd: string = process.cwd()): number {
  const ctx = buildFolderReadmeContext(join(cwd, SRC))
  let n = 0
  for (const atomPath of listAtomPaths(cwd)) {
    const body = renderFolderReadme(deriveFolderModel(atomPath, cwd, ctx))
    writeFileSync(join(cwd, SRC, atomPath, 'README.md'), body)
    n++
  }
  return n
}

export function verifyFolderReadmes(cwd: string = process.cwd()): { ok: boolean; drift: string[] } {
  const ctx = buildFolderReadmeContext(join(cwd, SRC))
  const drift: string[] = []
  for (const atomPath of listAtomPaths(cwd)) {
    const expected = renderFolderReadme(deriveFolderModel(atomPath, cwd, ctx))
    const path = join(cwd, SRC, atomPath, 'README.md')
    let actual = ''
    try {
      actual = readFileSync(path, 'utf8')
    } catch {
      drift.push(atomPath + ' (missing)')
      continue
    }
    if (actual !== expected) drift.push(atomPath)
  }
  return { ok: drift.length === 0, drift }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const cwd = process.cwd()
  const verify = process.argv.includes('--verify')
  const foldersOnly = process.argv.includes('--folders-only')
  const expectedRoot = generateReadme(cwd)
  const ctx = buildFolderReadmeContext(join(cwd, SRC))
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
    const { ok, drift } = verifyFolderReadmes(cwd)
    if (!ok) {
      console.error(`✖ readme:check — ${drift.length} folder README(s) drift: ${drift.slice(0, 5).join(', ')}${drift.length > 5 ? '…' : ''}`)
      failed = true
    }
    if (failed) process.exit(1)
    console.log(`✓ readme:check — root + ${listAtomPaths(cwd).length} folder READMEs ≡ regenerated (zero entropy).`)
    process.exit(0)
  }
  if (!foldersOnly) {
    writeFileSync(join(cwd, 'README.md'), expectedRoot)
    console.log(`readme: wrote README.md — content-uuid ${readmeUuid(deriveModel(cwd))}`)
  }
  const n = materializeFolderReadmes(cwd)
  console.log(`readme: wrote ${n} folder README.md files`)
}
