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
export function unfoldedExports(cwd: string = process.cwd()): UnfoldedReport {
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
  const dead: UnfoldedExport[] = []
  const single: UnfoldedExport[] = []
  for (const [name, file] of defs) {
    const sites = (freq.get(name) ?? 1) - 1 // minus the definition itself
    if (sites === 0) dead.push({ name, file, sites })
    else if (sites === 1) single.push({ name, file, sites })
  }
  const byName = (a: UnfoldedExport, b: UnfoldedExport): number => (a.name < b.name ? -1 : 1)
  return { files: files.length, exports: defs.size, dead: dead.sort(byName), single: single.sort(byName) }
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
