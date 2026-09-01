/**
 * canonical — an installed package that is never called is a hand-roll waiting to happen.
 *
 * Minimum tokens come from minimum prose and maximum code. "Use packages canonically" as PROSE costs ~550
 * tokens in every agent's system prompt on every turn, forever, and still relies on the agent choosing to
 * obey. The same law as a GATE costs zero tokens and cannot be violated ([[rules]]: a law is obeyed only
 * when a gate blocks its violation, not when it is written down).
 *
 * The violation is mechanical: a package in `dependencies` whose exports are never called in `src/`. It was
 * real three times — `plugin-nested-docs` installed and never called while 9 collections hand-rolled a
 * `parent` tree; `plugin-multi-tenant` imported but never called beside a hand-rolled `tenantCollectionsConfig`;
 * `plugin-seo` installed and never called. Each is either dead weight or a re-implementation.
 *
 * Export names are READ from the package (`r2Storage` cannot be derived from `@payloadcms/storage-r2`) — the
 * package is the authority on its own API, never a guess from its name.
 *
 * @standard ISO/IEC 25010:2023 §5.5 reusability — use the dependency or drop it
 *
 * Composes [[rules]] · [[law]].
 */
import { readFileSync, readdirSync, existsSync, type Dirent } from 'node:fs'
import { join } from 'node:path'

/** Packages whose canonical API erpax must call rather than re-implement. */
const GOVERNED = (dep: string): boolean =>
  dep.startsWith('@payloadcms/plugin-') || dep.startsWith('@payloadcms/storage-')

/** Generated bundles restate every symbol — they are not evidence a package is used. */
const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$/

/** An installed package with no call site in `src/`. */
export interface UnwiredPackage {
  readonly dep: string
  /** the exports that were looked for — read from the package, never guessed from its name */
  readonly api: readonly string[]
}

/** The package's own exported callables, read from its type face — the authority on its API. */
export function exportNamesOf(pkgDir: string): string[] {
  const names = new Set<string>()
  for (const face of ['dist/index.d.ts', 'dist/exports/index.d.ts', 'index.d.ts']) {
    const p = join(pkgDir, face)
    if (!existsSync(p)) continue
    let text: string
    try {
      text = readFileSync(p, 'utf8')
    } catch {
      continue
    }
    for (const m of text.matchAll(/export\s+declare\s+(?:const|function)\s+([A-Za-z_$][\w$]*)/g)) {
      names.add(m[1]!)
    }
    for (const m of text.matchAll(/export\s*\{([^}]*)\}/g)) {
      for (const part of m[1]!.split(',')) {
        const name = part.trim().split(/\s+as\s+/).pop()?.trim()
        if (name && /^[A-Za-z_$][\w$]*$/.test(name)) names.add(name)
      }
    }
  }
  return [...names]
}

/** Every hand-written `.ts`/`.tsx` in src, concatenated — the call-site evidence. */
const sourceText = (cwd: string): string => {
  const parts: string[] = []
  const walk = (dir: string): void => {
    let entries: Dirent[]
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      const p = join(dir, e.name)
      if (e.isDirectory()) {
        if (e.name !== 'node_modules' && e.name !== 'worktrees') walk(p)
        continue
      }
      if (!/\.tsx?$/.test(e.name) || GENERATED.test(e.name)) continue
      try {
        parts.push(readFileSync(p, 'utf8'))
      } catch {
        /* unreadable — not evidence either way */
      }
    }
  }
  walk(join(cwd, 'src'))
  return parts.join('\n')
}

/**
 * Governed packages that are installed but never called — each is dead weight or a re-implementation.
 * A package counts as used when ANY of its own exports appears as a call in hand-written `src/`.
 */
export function unwiredPackages(cwd: string = process.cwd()): UnwiredPackage[] {
  const pkg = JSON.parse(readFileSync(join(cwd, 'package.json'), 'utf8')) as {
    dependencies?: Record<string, string>
  }
  const src = sourceText(cwd)
  const out: UnwiredPackage[] = []
  for (const dep of Object.keys(pkg.dependencies ?? {}).filter(GOVERNED)) {
    const api = exportNamesOf(join(cwd, 'node_modules', dep))
    if (api.length === 0) continue // no readable API face — cannot judge, never guess
    const used = api.some((name) => new RegExp(`\\b${name}\\s*\\(`).test(src))
    if (!used) out.push({ dep, api })
  }
  return out.sort((a, b) => (a.dep < b.dep ? -1 : 1))
}

/**
 * Gate: use the dependency or drop it. Ratchets — the tree carries known unwired packages, so it fails on
 * getting WORSE and the ceiling drops as each is wired or removed.
 */
export function assertPackagesCanonical(cwd: string = process.cwd(), ceiling: number): void {
  const unwired = unwiredPackages(cwd)
  if (unwired.length <= ceiling) return
  const lines = unwired.map((u) => `  ${u.dep} — never called (exports: ${u.api.slice(0, 4).join(', ')}…)`)
  throw new Error(
    `✖ canonical — ${unwired.length} installed package(s) never called (ceiling ${ceiling}). Use it through its API or drop it:\n${lines.join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const unwired = unwiredPackages()
  console.log(`canonical — ${unwired.length} installed-but-never-called package(s):`)
  for (const u of unwired) console.log(`  ${u.dep} (exports: ${u.api.slice(0, 5).join(', ')})`)
}

/** @index-cross.foldback child=rules/canonical parent=rules — this cross folds back into its parent. */
