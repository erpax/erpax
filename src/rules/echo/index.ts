/**
 * echo — a path that restates itself has not folded its meaning.
 *
 * The law: every word matters in a path, and the path IS the message ([[path]]). If a meaning-word repeats
 * within one path, the path is saying the same thing twice — the meaning is not folded, and it cannot be
 * immediately realised, because the reader hits the same word and learns nothing new. That is the "unfolded
 * linear logic" this corpus already names (`ecommerce/configure/ecommerce/plugin`), measured.
 *
 * The standout is real and deep: `compliance/frameworks/compliance/requirements/compliance/gaps` — the word
 * `compliance` THREE times. The path should fold to what each segment ADDS: frameworks · requirements · gaps
 * are the concepts; `compliance` is the shared root said once, or the atom's home, never re-stamped at every
 * level.
 *
 * WHAT IT MUST NOT FLAG — the framework's namespace is not this corpus's ([[run]]/load learned it the hard
 * way: `src/pages` collided with Next's reserved dir). Next reserves `page.tsx`, `route.ts`, `layout.tsx`
 * under `app/`, so `app/posts/page/page.tsx` repeats `page` by the FRAMEWORK's rule, not the corpus's — the
 * `app/` tree is excluded, exactly as the one-word law cannot see a framework-owned name.
 *
 * @standard ISO/IEC 25010:2023 §5.6 — modularity/understandability: a name conveys its meaning
 *
 * Composes [[path]] · [[rules]] · [[law]].
 */
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

/** Canonical atom path. */
export const atomPath = 'echo' as const

const GENERATED = /skills\.index|payload-types|\.generated\./
/** Next.js owns these names under app/ — a repeat there is the framework's rule, not the corpus's. */
const FRAMEWORK = /^src\/app\//
const NOISE = new Set(['index', 'ts', 'tsx', 'test'])

/** A path's meaning-words: segments and filename-stem words (hyphen · dot · camelCase all split to words). */
export function pathWords(path: string): string[] {
  return path
    .replace(/^src\//, '')
    .replace(/\.(tsx?|md)$/, '')
    .split(/[/.\-]/)
    .flatMap((s) => s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(/\s+/))
    .map((w) => w.toLowerCase())
    .filter((w) => w && !NOISE.has(w))
}

/** A path whose meaning-word repeats — it restates itself, and needs refactoring. */
export interface Echo {
  readonly path: string
  readonly word: string
  /** How many times the word appears — 3 for the compliance triple. */
  readonly times: number
}

/**
 * Every path that restates a meaning-word — computed over the atom tree, framework namespace excluded.
 *
 * @invariant a word repeated within one path is reported once, with its multiplicity
 * @invariant the app/ tree is NOT judged — a repeated `page`/`route` there is Next's rule, not the corpus's
 */
export function echoes(cwd: string = process.cwd()): Echo[] {
  const out: Echo[] = []
  const walk = (dir: string): void => {
    let entries: ReturnType<typeof readdirSync>
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
      const rel = p.slice(cwd.length + 1).replace(/\\/g, '/')
      if (!/\.tsx?$/.test(e.name) || GENERATED.test(rel) || FRAMEWORK.test(rel)) continue
      const counts = new Map<string, number>()
      for (const w of pathWords(rel)) counts.set(w, (counts.get(w) ?? 0) + 1)
      for (const [word, times] of counts) if (times > 1) out.push({ path: rel, word, times })
    }
  }
  walk(join(cwd, 'src'))
  return out.sort((a, b) => b.times - a.times)
}

/** Gate: ratchets. A path that restates itself is unfolded; the ceiling drops as each is refactored. */
export function assertNoNewEchoes(cwd: string = process.cwd(), ceiling: number): void {
  const found = echoes(cwd)
  const paths = new Set(found.map((e) => e.path)).size
  if (paths <= ceiling) return
  throw new Error(
    `✖ echo — ${paths} path(s) restate a word (ceiling ${ceiling}). The path is the message; a repeated word is not folded:\n${found
      .slice(0, 8)
      .map((e) => `  ${e.path}  ↺ ${e.word}×${e.times}`)
      .join('\n')}`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const found = echoes()
  const paths = new Set(found.map((e) => e.path)).size
  console.log(`echo — ${paths} path(s) restate a meaning-word (the path says it twice):\n`)
  for (const e of found.slice(0, 12)) console.log(`  ${e.path}  ↺ ${e.word}×${e.times}`)
}
