/**
 * tamper/import — IMPORT PURITY as a tamper-cost dimension. The law: "anything importing not from
 * index raises." Each atom's `index.ts` is its public content-uuid contract; an import that reaches
 * a deep internal (`@/x/y.ts` — a file, not `@/x` or a sub-atom `@/x/y` that is itself a dir/index)
 * bypasses the seal. That is an uncovered coupling: a tamper can change the internal without the
 * public face noticing — so a non-index import is a GAP, and it lowers tamper-[[cost]] through the
 * very coverage law tamper-cost already uses (coverage → 1 ⇒ ∞).
 *
 * `nonIndexImports` finds the violations (the raises); `importPurity` is the index-only fraction;
 * `importCostLog2` prices the gap. At full purity the import graph is sealed — the dimension is ∞.
 * This is the [[duality]] imported↔declared made a cost: the import graph IS the config, so an
 * import past the index is config written outside the seal.
 *
 *   tsx src/tamper/import/index.ts
 *
 * @audit imports read from source; an index import resolves to a dir carrying index.ts, a deep one to a file
 * @see ../cost -- ../../cost -- ../../duality -- ./SKILL.md
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { coverageCostLog2 } from '@/cost'

const SRC = 'src'

export interface ImportViolation {
  readonly file: string
  readonly spec: string
}

/** An `@/PATH` import is from an INDEX iff PATH is a directory carrying an index.ts (the atom's face). */
function isIndexImport(spec: string): boolean {
  const base = SRC + '/' + spec.replace(/^@\//, '')
  try {
    return statSync(base).isDirectory() && existsSync(base + '/index.ts')
  } catch {
    return false
  }
}

/** Scan the source: total `@/` imports + the non-index violations (the raises). */
export function scanImports(root = SRC): { total: number; violations: ImportViolation[] } {
  const violations: ImportViolation[] = []
  let total = 0
  const re = /(?:from|import)\s+['"](@\/[^'"]+)['"]/g
  const walk = (dir: string): void => {
    for (const e of readdirSync(dir)) {
      const p = dir + '/' + e
      let st
      try {
        st = statSync(p)
      } catch {
        continue
      }
      if (st.isDirectory()) {
        walk(p)
        continue
      }
      if (!/\.(ts|tsx)$/.test(e) || /\.d\.ts$/.test(e)) continue
      const body = readFileSync(p, 'utf8')
      for (let m; (m = re.exec(body)); ) {
        total++
        if (!isIndexImport(m[1]!)) violations.push({ file: p.slice(root.length + 1), spec: m[1]! })
      }
    }
  }
  walk(root)
  return { total, violations }
}

/** The non-index imports — the violations that must raise. */
export const nonIndexImports = (root = SRC): ImportViolation[] => scanImports(root).violations

/** The index-only fraction of all `@/` imports — the import-graph coverage. */
export function importPurity(root = SRC): number {
  const s = scanImports(root)
  return s.total === 0 ? 1 : 1 - s.violations.length / s.total
}

/** The import dimension of tamper-cost (log2): coverage-amplified — ∞ at full purity, finite with any gap. */
export const importCostLog2 = (root = SRC, checks = 2): number => coverageCostLog2(importPurity(root), checks)

if (import.meta.url === 'file://' + process.argv[1]) {
  const s = scanImports()
  const purity = importPurity()
  console.log('tamper/import — import purity (anything importing not from index raises):')
  console.log('  @/ imports ' + s.total + ' · non-index (raises) ' + s.violations.length + ' · purity ' + (100 * purity).toFixed(1) + '%')
  console.log('  import tamper-cost = ' + (importCostLog2() === Infinity ? '∞ (sealed)' : importCostLog2().toFixed(1) + ' (a gap is open)'))
  console.log('  sample violations: ' + s.violations.slice(0, 6).map((v) => v.spec).join(', '))
}
