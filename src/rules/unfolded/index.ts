/**
 * unfolded — an export with no caller is entropy; with exactly one, it is un-folded.
 *
 * "Single-use code is entropy" sat in the agent laws as PROSE — read every turn by every agent, in every
 * session, while 693 violations lived under it. Nobody disobeyed it; there was nothing to disobey. A
 * sentence is decoration ([[rules]]: a law is obeyed only when a gate blocks its violation).
 *
 * Computed, not asserted: one pass over `src` builds an identifier frequency, then each exported symbol is
 * looked up in it. A barrel (`export * from './x'`) never names the symbol, so re-export cannot inflate a
 * count — only a real reference does.
 *
 * HONEST BOUNDARY — these are CANDIDATES, never a purge list:
 *  - erpax ships as `@erpax/*` packages, so an export may be the PUBLIC face with no in-repo caller.
 *  - a symbol reached dynamically (`obj[name]`) is invisible to a lexical scan.
 *  - `sites === 1` counts a test as a site: an export used only by its own test exists to be tested rather
 *    than used, which is the law's target — but that is a per-case judgement, not a verdict.
 * A blind sweep here would delete the package's public API and call it DRY.
 *
 * @standard ISO/IEC 25010:2023 §5.5 — reusability: a function called once is inlined, deleted, or reused
 *
 * Composes [[rules]] · [[law]].
 */
import { readFileSync, readdirSync, type Dirent } from 'node:fs'
import { join, relative } from 'node:path'

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

const sourceFiles = (root: string): string[] => {
  const out: string[] = []
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
      if (SOURCE.test(e.name) && !GENERATED.test(e.name)) out.push(p)
    }
  }
  walk(root)
  return out
}

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
export function scanExports(cwd: string = process.cwd()): ScannedExport[] {
  const files = sourceFiles(join(cwd, 'src'))
  const freq = new Map<string, number>()
  const defs = new Map<string, string>()
  for (const f of files) {
    let t: string
    try {
      t = readFileSync(f, 'utf8')
    } catch {
      continue
    }
    for (const m of t.matchAll(/export\s+(?:async\s+)?(?:function|const)\s+([A-Za-z_$][\w$]*)/g)) {
      if (!defs.has(m[1]!)) defs.set(m[1]!, relative(cwd, f).replace(/\\/g, '/'))
    }
    // An import/re-export NAMES the symbol without USING it — plumbing, not a call site. Counting it makes
    // a genuine single-use (import + one call) look reused, which hides exactly what this gate is for.
    const used = t
      .replace(/import\s+[^;]*?from\s+['"][^'"]+['"];?/gs, '')
      .replace(/export\s*\{[^}]*\}\s*from\s+['"][^'"]+['"];?/gs, '')
    for (const m of used.matchAll(/\b[A-Za-z_$][\w$]*\b/g)) freq.set(m[0]!, (freq.get(m[0]!) ?? 0) + 1)
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
  const byAtom = new Map<string, ScannedExport[]>()
  for (const e of scanExports(cwd)) {
    if (e.atom.startsWith('app/')) continue // the app tree is framework-owned, not a corpus atom
    byAtom.set(e.atom, [...(byAtom.get(e.atom) ?? []), e])
  }
  const out: DeadAtom[] = []
  for (const [atom, exps] of byAtom) {
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
