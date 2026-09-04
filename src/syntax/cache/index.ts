import ts from 'typescript'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/**
 * syntax/cache — read once, parse once, and let every gate share the answer.
 *
 * Same content ⇒ same parse is a THEOREM: a SourceFile is a pure function of (text, target,
 * setParentNodes), so sharing one cannot change an answer. Scope is ONE PROCESS — a gate run is a
 * snapshot of the tree; across runs, [[gate]]/receipt reuses by content hash.
 *
 * @see ./SKILL.md — the measurement, including the half that costs more than it saves.
 */

const texts = new Map<string, string>()
const asts = new Map<string, ts.SourceFile>()
const walks = new Map<string, readonly string[]>()

/** File bytes, read at most once per process. */
export function textOf(file: string): string {
  const hit = texts.get(file)
  if (hit !== undefined) return hit
  const text = readFileSync(file, 'utf8')
  texts.set(file, text)
  return text
}

/** The parsed grammar, at most once per process. `setParentNodes` is on: gates ask for enclosures. */
export function astOf(file: string, text: string = textOf(file)): ts.SourceFile {
  const hit = asts.get(file)
  if (hit !== undefined) return hit
  const src = ts.createSourceFile(file, text, ts.ScriptTarget.ESNext, true)
  if (retaining) asts.set(file, src)
  return src
}

/**
 * Retaining parsed trees is OPT-IN: it buys 0.6s and costs ~500 MB, because 26 MB of source expands
 * ~19× as a tree. Sharing the TEXT is the cheap half — faster AND 19× lighter. Measured table in
 * ./SKILL.md; the trade belongs to whoever knows the machine, so it is never taken silently.
 */
let retaining = false

/** Turn AST retention on for a caller that will pass over the corpus more than once. */
export const retainAsts = (on: boolean): void => {
  retaining = on
  if (!on) asts.clear()
}

/** What a walk collects — named, so a caller states its filter instead of passing a closure. */
export type Corpus = 'source' | 'test' | 'skill' | 'all'

const MATCH: Readonly<Record<Corpus, (name: string) => boolean>> = {
  source: (n) => /\.tsx?$/.test(n) && !/\.d\.ts$/.test(n),
  test: (n) => n === 'test.ts' || n === 'test.tsx',
  skill: (n) => n === 'SKILL.md',
  all: () => true,
}

/** Every file of a kind under `src`, walked once per (root, kind). Sorted, so two reports diff. */
export function corpusFiles(cwd: string = process.cwd(), kind: Corpus = 'source'): readonly string[] {
  const root = join(cwd, 'src')
  const key = `${kind} ${root}`
  const hit = walks.get(key)
  if (hit !== undefined) return hit
  const match = MATCH[kind]
  const out: string[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue
      const p = join(d, e.name)
      if (e.isDirectory()) walk(p)
      else if (match(e.name)) out.push(p)
    }
  }
  walk(root)
  out.sort()
  walks.set(key, out)
  return out
}

/** What the cache is holding — a receipt a caller can print instead of guessing at the saving. */
export function cacheStats(): {
  readonly texts: number
  readonly asts: number
  readonly walks: number
  readonly bytes: number
} {
  let bytes = 0
  for (const t of texts.values()) bytes += t.length
  return { texts: texts.size, asts: asts.size, walks: walks.size, bytes }
}

/** Drop everything. For a test that mutates the tree between assertions — never for a gate run. */
export function clearCache(): void {
  texts.clear()
  asts.clear()
  walks.clear()
}
