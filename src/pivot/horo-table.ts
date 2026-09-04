/**
 * pivot/horo-table — horo ring projection for root README (no readme import).
 */
import { existsSync, lstatSync, readdirSync, readFileSync, type Dirent } from 'node:fs'
import { join } from 'node:path'
import { HORO_DIGITS, HORO_MEASURE } from '@/horo'
import { UUID_MATRIX_EDGES, UUID_MATRIX_NODES } from '@/uuid/matrix'
export interface HoroPivotRow {
  readonly digit: number
  readonly measure: string
  readonly atoms: number
  readonly facets: readonly string[]
}

export interface ControlAxisFacet {
  readonly digit: number
  readonly atoms: number
}

export interface HoroPivotTable {
  readonly ring: readonly HoroPivotRow[]
  readonly axis: readonly ControlAxisFacet[]
}

export interface TrinityCorpusRollup {
  readonly atoms: number
  readonly skills: number
  readonly index: number
  readonly tests: number
}

const inDegrees = (): number[] => {
  const deg = new Array<number>(UUID_MATRIX_NODES.length).fill(0)
  for (const e of UUID_MATRIX_EDGES) {
    const t = deg[e.t]
    if (t !== undefined) deg[e.t] = t + 1
  }
  return deg
}

export function horoPivotTable(): HoroPivotTable {
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
  const ring: HoroPivotRow[] = HORO_DIGITS.map((digit, i) => ({
    digit,
    measure: HORO_MEASURE[i] ?? String(digit),
    atoms: (byHoro.get(digit) ?? []).length,
    facets: principal(digit, 6),
  }))
  const axis: ControlAxisFacet[] = [3, 6].map((digit) => ({
    digit,
    atoms: (byHoro.get(digit) ?? []).length,
  }))
  return { ring, axis }
}

const SKIP_DIRS = new Set(['node_modules', 'skills'])

const walkTrinityCounts = (root: string): { skills: number; index: number; tests: number } => {
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
      try {
        if (lstatSync(p).isSymbolicLink()) continue
      } catch {
        continue
      }
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

export function trinityCorpusRollup(cwd?: string): TrinityCorpusRollup
export function trinityCorpusRollup(rollup: TrinityCorpusRollup): TrinityCorpusRollup
export function trinityCorpusRollup(
  arg: string | TrinityCorpusRollup = process.cwd(),
): TrinityCorpusRollup {
  if (typeof arg === 'object' && arg !== null && 'atoms' in arg && 'skills' in arg) return arg
  const counts = walkTrinityCounts(join(arg, 'src'))
  return { atoms: UUID_MATRIX_NODES.length, skills: counts.skills, index: counts.index, tests: counts.tests }
}

export function controlAxisNote(axis: readonly ControlAxisFacet[]): string {
  return `> The control axis governs off the flow ring — \`3\` access · \`6\` hooks (${axis.map((a) => `${a.digit}: ${a.atoms} atoms`).join(' · ')}), \`9\` unity closes and \`0\` is the zeropoint root.`
}

export function horoPivotIntro(table: HoroPivotTable): string {
  const ringAtoms = table.ring.reduce((s, r) => s + r.atoms, 0)
  return `Measure-walk \`${HORO_DIGITS.join('·')}\` · **${table.ring.length}** facets · **${ringAtoms}** ring atoms — principal facets ranked by bond in-degree.`
}

export function renderHoroPivotSection(table: HoroPivotTable): string {
  const L = [
    "### the horo ring — the diamond's facets",
    '',
    horoPivotIntro(table),
    '',
    '| digit | measure | atoms | principal facets |',
    '| ----: | ------- | ----: | ---------------- |',
  ]
  for (const f of table.ring) {
    L.push(`| ${f.digit} | ${f.measure} | ${f.atoms} | ${f.facets.map((a) => `\`${a}\``).join(' · ')} |`)
  }
  L.push('', controlAxisNote(table.axis), '')
  return L.join('\n')
}

export function renderTrinityCorpusSection(rollup: TrinityCorpusRollup): string {
  const sum = rollup.skills + rollup.index + rollup.tests
  return [
    '### the trinity — every atom told three ways',
    '',
    `Trinity legs **${sum}** files across **${rollup.atoms}** atoms — form·code·proof from live scan.`,
    '',
    `- **${rollup.atoms}** atoms — one-word folders`,
    `- **${rollup.skills}** \`SKILL.md\` — the form (antimatter)`,
    `- **${rollup.index}** \`index.ts\` — the code (matter)`,
    `- **${rollup.tests}** \`test.ts\` — the proof`,
    '',
  ].join('\n')
}

export function renderRootPivotHub(
  horo: HoroPivotTable,
  trinity: TrinityCorpusRollup,
  intro?: string,
  opts: { readonly trinity?: boolean } = {},
): string {
  const parts = [intro ?? '—', '', renderHoroPivotSection(horo)]
  if (opts.trinity !== false) parts.push(renderTrinityCorpusSection(trinity))
  return parts.join('\n')
}

export interface TrinityFlags {
  readonly form: 0 | 1
  readonly code: 0 | 1
  readonly proof: 0 | 1
}

/**
 * The trinity legs of a folder — form, code, proof — read by SPELLING-INDEPENDENT names.
 *
 * `index.tsx` is a barrel and `test.tsx` is a proof: the bundler resolves `@/atom` to either, and a
 * React atom cannot spell them otherwise, because JSX does not parse from a `.ts` file. Reading only
 * the `.ts` names recorded every React atom in this corpus as having NO CODE AND NO PROOF — which
 * fed the horo table, the word axes and the readme computation alike.
 *
 * This was the third place the same blindness was found in one pass ([[law]]/folder's trinity, the
 * `ts-only` axis, and here). A filter that selects by NAME cannot see what it does not name, and
 * what it misses is systematically the thing nobody thought to name.
 */
export function trinityFlagsAtDir(dir: string): TrinityFlags {
  const any = (...names: readonly string[]): 0 | 1 => (names.some((n) => existsSync(join(dir, n))) ? 1 : 0)
  return {
    form: any('SKILL.md', 'README.md'),
    code: any('index.ts', 'index.tsx'),
    proof: any('test.ts', 'test.tsx'),
  }
}

export function trinityFlagsOf(atomPath: string, cwd: string = process.cwd()): TrinityFlags {
  return trinityFlagsAtDir(join(cwd, 'src', atomPath))
}

export function sealedFromReadme(cwd: string, atomPath: string): boolean {
  const readme = join(cwd, 'src', atomPath, 'README.md')
  if (!existsSync(readme)) return false
  return /\[\[seal\]\] `1`/.test(readFileSync(readme, 'utf8'))
}
