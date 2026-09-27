/**
 * unfolded — an export with no caller is entropy; with exactly one, it is un-folded.
 *
 * Computed, not asserted: identifier frequency from the GRAMMAR, so a comment, a string and a
 * re-export clause all name a symbol without using it. CANDIDATES, never a purge list — the
 * published-package face, dynamic reach and substitute surfaces are argued in ./SKILL.md.
 *
 * @standard ISO/IEC 25010:2023 §5.5 — reusability: a function called once is inlined, deleted, or reused
 */
import { allFiles, textOf, astOf } from '@/syntax/cache'
import ts from 'typescript'
import { join, relative } from 'node:path'

import { shapesOf } from '@/rules/collapse'

/** Generated bundles restate every symbol — they are not evidence of use. */
const GENERATED = /skills\.index\.ts$|payload-types\.ts$|\.generated\.ts$/
const SOURCE = /\.tsx?$/

/** An exported symbol and how many times it is referenced beyond its own definition. */
export interface UnfoldedExport {
  readonly name: string
  readonly file: string
  /** references anywhere in `src` beyond the definition itself. */
  readonly sites: number
}

export interface UnfoldedReport {
  readonly files: number
  readonly exports: number
  /** never referenced — not even by a test. */
  readonly dead: readonly UnfoldedExport[]
  /** referenced exactly once — un-folded: inline it, delete it, or make it reused. */
  readonly single: readonly UnfoldedExport[]
}

/**
 * Filtered from the ONE shared walk ([[syntax]]/cache) — the predicate is the old walk's, transcribed.
 * Populations diffed file by file before the swap: 7,410 = 7,410, empty in both directions.
 */
const sourceFiles = (root: string): string[] =>
  allFiles(root.endsWith('/src') ? root.slice(0, -4) : root).filter(
    (f) =>
      SOURCE.test(f) && !GENERATED.test(f.slice(f.lastIndexOf('/') + 1)) && !f.includes('/worktrees/'),
  ) as string[]

/** Every exported symbol with ≤1 reference — the un-folded set. One pass, frequency-counted. */
/** One export with its real call-site count AND the atom (folder) it lives in — the shared scan. */
export interface ScannedExport {
  readonly name: string
  readonly file: string
  /** the atom the export lives in — path relative to src minus the filename, e.g. 'rules/collapse'. */
  readonly atom: string
  readonly sites: number
}

/** Every src export with its call-site count and atom — the ONE scan `unfoldedExports` + `deadAtoms` share (DRY). */
/**
 * Identifier occurrences in one file, counted from the GRAMMAR — a `ts.Identifier` cannot occur in a
 * comment or a string, and an import clause NAMES without using. See ./SKILL.md § prose as usage.
 */
function identifierFrequency(file: string, text: string): ReadonlyMap<string, number> {
  const freq = new Map<string, number>()
  const src = astOf(file, text)
  const visit = (node: ts.Node): void => {
    // Plumbing, not use: the whole clause is skipped rather than its identifiers counted.
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) return
    if (ts.isIdentifier(node)) freq.set(node.text, (freq.get(node.text) ?? 0) + 1)
    ts.forEachChild(node, visit)
  }
  ts.forEachChild(src, visit)
  return freq
}

export function scanExports(cwd: string = process.cwd()): ScannedExport[] {
  const files = sourceFiles(join(cwd, 'src'))
  const freq = new Map<string, number>()
  const defs = new Map<string, string>()
  for (const f of files) {
    let t: string
    try {
      t = textOf(f)
    } catch {
      continue
    }
    for (const m of t.matchAll(/export\s+(?:async\s+)?(?:function|const)\s+([A-Za-z_$][\w$]*)/g)) {
      if (!defs.has(m[1]!)) defs.set(m[1]!, relative(cwd, f).replace(/\\/g, '/'))
    }
    for (const [id, n] of identifierFrequency(f, t)) freq.set(id, (freq.get(id) ?? 0) + n)
  }
  const out: ScannedExport[] = []
  for (const [name, file] of defs) {
    const rel = file.replace(/^src\//, '')
    const atom = rel.includes('/') ? rel.slice(0, rel.lastIndexOf('/')) : rel.replace(/\.[^.]+$/, '')
    out.push({ name, file, atom, sites: (freq.get(name) ?? 1) - 1 })
  }
  return out
}

export function unfoldedExports(cwd: string = process.cwd()): UnfoldedReport {
  const all = scanExports(cwd)
  const dead = all.filter((e) => e.sites === 0).map(({ name, file, sites }) => ({ name, file, sites }))
  const single = all.filter((e) => e.sites === 1).map(({ name, file, sites }) => ({ name, file, sites }))
  const byName = (a: UnfoldedExport, b: UnfoldedExport): number => (a.name < b.name ? -1 : 1)
  return {
    files: sourceFiles(join(cwd, 'src')).length,
    exports: all.length,
    dead: dead.sort(byName),
    single: single.sort(byName),
  }
}

/** An atom where EVERY export is unreferenced — a folder that is dead WHOLE. */
export interface DeadAtom {
  readonly atom: string
  readonly exports: number
}

/**
 * Fold the scattered dead exports into the ACTIONABLE unit: atoms where every export is unreferenced — the
 * 'folders to go' shortlist. CANDIDATES, never a purge list ([[rules]]/unfolded's own law): an `@erpax/*` public
 * face has no in-repo caller BY DESIGN, and a dynamically-reached symbol is invisible to this lexical scan — so
 * each still needs a human's eye. But this turns 444 scattered exports into the handful of whole-dead atoms.
 */
export function deadAtoms(cwd: string = process.cwd()): DeadAtom[] {
  // A Payload collection atom is registered DYNAMICALLY through the barrel (Object.values), invisible to a
  // lexical scan — so its lone export reads as dead when the table is live. Exclude any atom whose path maps to
  // a booted collection slug (shapesOf is the config's own answer — coordinated DRY, the collapse tool reused).
  const slugs = new Set(shapesOf(cwd).map((s) => s.slug))
  const isCollection = (atom: string): boolean => {
    // a slug is the atom's TRAILING segments joined with '-' (bank/accounts/bank/reconciliations →
    // bank-reconciliations), so test every suffix, not just the leaf.
    const segs = atom.split('/')
    for (let i = 0; i < segs.length; i++) if (slugs.has(segs.slice(i).join('-'))) return true
    return false
  }
  const byAtom = new Map<string, ScannedExport[]>()
  for (const e of scanExports(cwd)) {
    if (e.atom.startsWith('app/')) continue // the app tree is framework-owned, not a corpus atom
    byAtom.set(e.atom, [...(byAtom.get(e.atom) ?? []), e])
  }
  const out: DeadAtom[] = []
  for (const [atom, exps] of byAtom) {
    if (isCollection(atom)) continue // live via dynamic registration, not dead
    if (exps.length > 0 && exps.every((e) => e.sites === 0)) out.push({ atom, exports: exps.length })
  }
  return out.sort((a, b) => b.exports - a.exports || (a.atom < b.atom ? -1 : 1))
}

/**
 * Gate: the un-folded set may not grow. Ratchets — the tree carries a known count, so it fails on getting
 * WORSE and the ceiling drops as each export is inlined, deleted, or genuinely reused.
 */
export function assertExportsFolded(cwd: string = process.cwd(), ceiling: number): void {
  const r = unfoldedExports(cwd)
  const total = r.dead.length + r.single.length
  if (total <= ceiling) return
  throw new Error(
    `✖ unfolded — ${total} un-folded export(s) exceeds the ceiling ${ceiling} (${r.dead.length} never referenced · ${r.single.length} single-use). Inline it, delete it, or make it reused.`,
  )
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const r = unfoldedExports()
  console.log(
    `unfolded — ${r.exports} exports across ${r.files} files · ${r.dead.length} never referenced · ${r.single.length} single-use`,
  )
  for (const e of r.dead.slice(0, 10)) console.log(`  dead   ${e.name}  (${e.file})`)
  for (const e of r.single.slice(0, 5)) console.log(`  single ${e.name}  (${e.file})`)
}

/** @index-cross.foldback child=rules/unfolded parent=rules — this cross folds back into its parent. */

/**
 * A **substitute surface** — an export whose emptiness is its purpose, because `host-math` forbids
 * the global it wraps everywhere else. See ./SKILL.md § substitute surfaces.
 *
 * @invariant a wrapper of a forbidden global is never reported as dead weight
 */
const SUBSTITUTED_GLOBALS: readonly string[] = ['Math']

export function substituteWrappers(cwd: string = process.cwd()): readonly UnfoldedExport[] {
  const { dead } = unfoldedExports(cwd)
  return dead.filter((e) => {
    const text = textOf(join(cwd, e.file))
    const at = text.indexOf(`export const ${e.name} =`)
    if (at < 0) return false
    const nl = text.indexOf('\n', at)
    const line = nl === -1 ? text.slice(at) : text.slice(at, nl)
    const rhs = line.slice(line.indexOf('=') + 1).trim()
    // Strip one arrow head — `(x: number): number =>` — leaving the body. A substitute is one line.
    const arrow = rhs.indexOf('=>')
    const body = (arrow === -1 ? rhs : rhs.slice(arrow + 2)).trim()
    return SUBSTITUTED_GLOBALS.some((g) => body.startsWith(`${g}.`))
  })
}
