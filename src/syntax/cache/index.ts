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
const kinds = new Map<string, readonly string[]>()

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

/**
 * EVERY file under `src`, walked once per root — the one traversal every gate filters.
 *
 * Sorted, so two gates reading one tree produce diffable reports.
 */
export function allFiles(cwd: string = process.cwd()): readonly string[] {
  const root = join(cwd, 'src')
  const hit = walks.get(root)
  if (hit !== undefined) return hit
  const out: string[] = []
  const walk = (d: string): void => {
    let entries: import('node:fs').Dirent[]
    try {
      entries = readdirSync(d, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      // Only `node_modules` is universal. DOTFILES ARE KEPT: skipping them here looked harmless —
      // no `.ts` file starts with a dot — but [[rules]]/reference walks every file regardless of
      // extension, and dropping two `.proposals.json` would have moved its count. A shared walk
      // must be the true superset; every narrowing belongs to the gate that wants it.
      if (e.name === 'node_modules') continue
      const p = join(d, e.name)
      // a SYMLINKED directory is not recursed into: `isDirectory()` is false for a link, which is
      // the same behaviour the gates' own walks had by explicitly skipping symlinks
      if (e.isDirectory()) walk(p)
      else out.push(p)
    }
  }
  walk(root)
  out.sort()
  walks.set(root, out)
  return out
}

/** A named population, filtered from the one walk — and memoised, so a repeat call costs nothing. */
export function corpusFiles(cwd: string = process.cwd(), kind: Corpus = 'source'): readonly string[] {
  const all = allFiles(cwd)
  if (kind === 'all') return all
  const key = `${kind} ${join(cwd, 'src')}`
  const hit = kinds.get(key)
  if (hit !== undefined) return hit
  const match = MATCH[kind]
  const out = all.filter((f) => match(f.slice(f.lastIndexOf('/') + 1)))
  kinds.set(key, out)
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
  kinds.clear()
}
