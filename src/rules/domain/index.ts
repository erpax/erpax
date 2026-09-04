import { readFileSync, readdirSync } from 'node:fs'
import { extname, join, relative } from 'node:path'

/**
 * rules/domain — a law is enforced on the surfaces its checker READS, and nowhere else.
 *
 * @see ./SKILL.md
 */

/** Surfaces a text gate cannot judge. DECLARED, in the open, so the exemption is arguable. */
const OPAQUE = new Set(['.webp', '.png', '.jpg', '.jpeg', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.pdf', '.zip', '.olean'])

/** Faces the corpus regenerates. A gate reading them would be judging its own output. */
const DERIVED = new Set(['diamond.json', 'payload-types.ts', 'skills.index.ts'])

const walk = (dir: string, out: string[] = []): string[] => {
  let entries: import('node:fs').Dirent[]
  try {
    entries = readdirSync(dir, { withFileTypes: true })
  } catch {
    return out
  }
  for (const e of entries) {
    if (e.name.startsWith('.') || e.name === 'node_modules') continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (!DERIVED.has(e.name)) out.push(p)
  }
  return out
}

/** Every file extension present under `src`, with how many files carry it. */
export function corpusSurfaces(cwd: string = process.cwd()): Map<string, number> {
  const out = new Map<string, number>()
  for (const f of walk(join(cwd, 'src'))) {
    const x = extname(f)
    if (x) out.set(x, (out.get(x) ?? 0) + 1)
  }
  return out
}

/**
 * Every module that can enforce: the registry's own imports UNION every `src/rules/*` child.
 *
 * The first version took the registry's imports alone and reported `.md` as blind — while
 * [[rules]]/prose and [[rules]]/reference plainly read it. The instrument's own domain was too
 * narrow, which is the exact defect it was written to find. It is not shipped on a number I
 * knew was wrong.
 */
export function gateSources(cwd: string = process.cwd()): string[] {
  const out: string[] = []
  const add = (p: string): void => {
    try {
      readFileSync(p)
      out.push(p)
    } catch {
      /* not a module */
    }
  }
  let registry = ''
  try {
    registry = readFileSync(join(cwd, 'src/rules/index.ts'), 'utf8')
  } catch {
    return []
  }
  add(join(cwd, 'src/rules/index.ts'))
  for (const m of registry.matchAll(/^import\s+[^'"]*from\s+'@\/([^']+)'/gm)) {
    add(join(cwd, 'src', m[1]!, 'index.ts'))
    add(join(cwd, 'src', m[1]!, 'index.tsx'))
    add(join(cwd, 'src', `${m[1]!}.ts`))
  }
  try {
    for (const e of readdirSync(join(cwd, 'src/rules'), { withFileTypes: true })) {
      if (e.isDirectory()) add(join(cwd, 'src/rules', e.name, 'index.ts'))
    }
  } catch {
    /* no children */
  }
  return [...new Set(out)]
}

/** Extension → the gate modules whose own source names it. */
export function surfacesRead(cwd: string = process.cwd()): Map<string, string[]> {
  const out = new Map<string, string[]>()
  for (const file of gateSources(cwd)) {
    let src = ''
    try {
      src = readFileSync(file, 'utf8')
    } catch {
      continue
    }
    const rel = relative(join(cwd, 'src'), file).replace(/\/index\.tsx?$/, '')
    for (const ext of new Set([...src.matchAll(/['"`](\.[a-z]{1,5})['"`]/g)].map((m) => m[1]!))) {
      out.set(ext, [...(out.get(ext) ?? []), rel])
    }
  }
  return out
}

export interface UnreadSurface {
  readonly extension: string
  readonly files: number
}

/**
 * Surfaces the corpus HAS and no wired gate reads.
 *
 * Not "a gate with a narrow domain" — a narrow domain is usually right, and judging that would
 * bury the signal. This is the sharper thing: a class of file every law is silent about, where
 * conformance defaults to true because nothing is looking.
 */
export function unreadSurfaces(cwd: string = process.cwd()): UnreadSurface[] {
  const read = surfacesRead(cwd)
  return [...corpusSurfaces(cwd)]
    .filter(([ext]) => !OPAQUE.has(ext) && (read.get(ext) ?? []).length === 0)
    .map(([extension, files]) => ({ extension, files }))
    .sort((a, b) => b.files - a.files)
}

/** Fails closed on a NEW blind surface. The ceiling ratchets down as each gets a reader. */
export function assertSurfacesRead(cwd: string = process.cwd(), ceiling: number): void {
  const blind = unreadSurfaces(cwd)
  if (blind.length <= ceiling) return
  throw new Error(
    `✖ rules/domain — ${blind.length} surface(s) no wired gate reads (ceiling ${ceiling}):\n` +
      blind.map((s) => `  ${s.extension}  ${s.files} file(s)`).join('\n'),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const read = surfacesRead()
  console.log(`rules/domain — ${gateSources().length} wired gate module(s)\n`)
  for (const [ext, n] of [...corpusSurfaces()].sort((a, b) => b[1] - a[1])) {
    const by = read.get(ext) ?? []
    const state = OPAQUE.has(ext) ? 'opaque (declared)' : by.length === 0 ? 'NO GATE READS THIS' : `${by.length} gate(s)`
    console.log(`  ${ext.padEnd(9)} ${String(n).padStart(6)} files   ${state}`)
  }
  console.log(`\nblind surfaces: ${unreadSurfaces().length}`)
}
