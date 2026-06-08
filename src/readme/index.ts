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
import { readFileSync, writeFileSync, readdirSync, lstatSync, type Dirent } from 'node:fs'
import { join } from 'node:path'
import {
  UUID_MATRIX_NODES,
  UUID_MATRIX_EDGES,
  UUID_MATRIX_ROOT,
  toUuid,
} from '@/uuid/matrix'
import { HORO_DIGITS, HORO_MEASURE } from '@/horo'

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

if (import.meta.url === `file://${process.argv[1]}`) {
  const cwd = process.cwd()
  const out = join(cwd, 'README.md')
  const expected = generateReadme(cwd)
  if (process.argv.includes('--verify')) {
    let actual = ''
    try {
      actual = readFileSync(out, 'utf8')
    } catch {
      console.error('✖ readme:check — README.md is missing. Run `pnpm readme`.')
      process.exit(1)
    }
    if (actual === expected) {
      console.log('✓ readme:check — README is a diamond: committed ≡ regenerated (zero entropy).')
      process.exit(0)
    }
    console.error('✖ readme:check — DRIFT: README.md ≠ the generator output. The README is hand-edited or stale.')
    console.error('  Regenerate it from the tree: `pnpm readme`.')
    process.exit(1)
  }
  writeFileSync(out, expected)
  console.log(`readme: wrote ${out} (${expected.length} bytes) — content-uuid ${readmeUuid(deriveModel(cwd))}`)
}
