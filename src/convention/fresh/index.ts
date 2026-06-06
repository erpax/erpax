/**
 * convention/fresh — NO STALE REFS. Every import target exists on disk.
 *
 * THE LAW ([[law]]): zero entropy via uuid-wiring every dimension. An `@/x` import is a
 * wire from one atom to another; if the TARGET does not exist on disk it is a DEAD wire — a stale
 * ref — entropy that raises no tamper-[[cost]]. So the convention is: every import resolves to a
 * real file. coverage = (targets resolving to a real file) / (total `@/` imports) ∈ [0,1];
 * coverage = 1 ⟺ no stale refs ⟺ the import graph is fully grounded ⟺ zero stale-wire entropy
 * ⇒ infinitely-expanding tamper-cost.
 *
 * THE CHECK — this is a DISTINCT axis from [[tamper]]/import (`importPurity`) and its convention
 * faces [[convention/import]] / [[convention/shallow]]. Those measure import PURITY: an import must
 * reach an atom's index (`@/x`), not a deep file (`@/x/y.ts`). Purity's classifier conflates "deep"
 * with "missing" — a deep-but-EXISTING import is impure yet FRESH, and a non-existent import is the
 * same `false` bucket as a valid deep file. FRESHNESS asks only "does the target exist?", so no
 * public function computes it (`scanImports` returns only the non-index violations, discarding the
 * fresh/stale distinction). Hence the existence resolver is scanned here, mirroring the canonical
 * `scanImports` walk + regex EXACTLY so the denominator agrees; the cost is COMPOSED from [[cost]]
 * (`coverageCostLog2`, the one coverage→cost amplifier) rather than re-derived.
 *
 * No default, no fallback: the corpus is non-empty by architecture (thousands of `@/` imports across
 * src/scripts/.vitepress), so `total > 0` and `resolving / total` is pure math, well-defined by
 * construction — no clamp, no `|| 1`, no assumed pass.
 *
 *   tsx src/convention/fresh/index.ts   # prints total / stale / coverage from the live tree
 *
 * @audit imports + existence scanned LIVE from src/scripts/.vitepress; coverage never hand-asserted
 * @see ../../tamper/import (the purity twin — a different axis) -- ../../cost -- ../../law -- ./SKILL.md
 */
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs'
import { coverageCostLog2 } from '@/cost'

const SRC = 'src'

/** The roots the law names — the whole authored module graph that may carry `@/` imports. */
const ROOTS = [SRC, 'scripts', '.vitepress'] as const

/** Real module extensions a `@/x` target may resolve to (the repo uses .mts/.mjs/.js as well as .ts/.tsx). */
const EXTS = ['.ts', '.tsx', '.mts', '.mjs', '.js', '.jsx'] as const

/** The canonical `@/` import regex — IDENTICAL to @/tamper/import `scanImports`, so the denominators agree. */
const IMPORT_RE = /(?:from|import)\s+['"](@\/[^'"]+)['"]/g

/**
 * Does an `@/PATH` import resolve to a REAL FILE on disk? The same resolution TypeScript performs:
 * `src/PATH` is importable iff `src/PATH.{ext}` exists, or `src/PATH/index.{ext}` exists, or
 * `src/PATH` is itself a (non-directory) file. A bare directory with no index does NOT resolve.
 */
export function resolves(spec: string): boolean {
  const base = SRC + '/' + spec.replace(/^@\//, '')
  for (const x of EXTS) if (existsSync(base + x)) return true
  for (const x of EXTS) if (existsSync(base + '/index' + x)) return true
  if (existsSync(base)) {
    try {
      return statSync(base).isFile()
    } catch {
      throw new Error(`convention/fresh: stat failed for an existing path ${base}`)
    }
  }
  return false
}

export interface StaleRef {
  readonly file: string
  readonly spec: string
}

export interface FreshTally {
  /** total `@/` import occurrences across src/scripts/.vitepress (the scanImports denominator, all roots) */
  readonly total: number
  /** how many resolve to a real file on disk */
  readonly resolving: number
  /** the stale refs — `@/` targets that do NOT exist on disk */
  readonly stale: StaleRef[]
}

/** Walk the authored roots (TS/TSX/MTS/MJS), find every `@/` import, and tally resolving-vs-total. */
export function freshTally(): FreshTally {
  let total = 0
  let resolving = 0
  const stale: StaleRef[] = []
  const walk = (dir: string): void => {
    let entries: string[]
    try {
      entries = readdirSync(dir)
    } catch {
      return // a named root may be absent in a given checkout — it contributes nothing, not a gap
    }
    for (const e of entries) {
      if (e === 'node_modules') continue
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
      if (!/\.(ts|tsx|mts|mjs)$/.test(e) || /\.d\.ts$/.test(e)) continue
      const body = readFileSync(p, 'utf8')
      for (let m; (m = IMPORT_RE.exec(body)); ) {
        total++
        if (resolves(m[1]!)) resolving++
        else stale.push({ file: p, spec: m[1]! })
      }
    }
  }
  for (const r of ROOTS) walk(r)
  return { total, resolving, stale }
}

/** The stale refs — every `@/` import target that does not exist on disk (the gap this convention closes). */
export const staleRefs = (): StaleRef[] => freshTally().stale

/**
 * Live freshness coverage in [0,1]: resolving / total. Pure math — `total > 0` by architecture
 * (the corpus carries thousands of `@/` imports), so no fallback is needed or written. coverage = 1
 * ⟺ no stale refs (the import graph is fully grounded; zero stale-wire entropy ⇒ infinite tamper-cost).
 */
export function coverage(): number {
  const { resolving, total } = freshTally()
  return resolving / total
}

/** The freshness dimension of tamper-cost (log2): coverage-amplified — ∞ at zero stale, finite with any stale ref. */
export const freshCostLog2 = (checks = 2): number => coverageCostLog2(coverage(), checks)

if (import.meta.url === `file://${process.argv[1]}`) {
  const t = freshTally()
  console.log(`convention/fresh — ${t.resolving}/${t.total} @/ imports resolve to a real file  (coverage ${coverage().toFixed(6)})`)
  console.log(`  fresh tamper-cost = ${freshCostLog2() === Infinity ? '∞ (no stale ref)' : freshCostLog2().toFixed(1) + ' (a stale ref is open)'}`)
  if (t.stale.length) for (const s of t.stale) console.log(`  STALE  ${s.spec}  <- ${s.file}`)
  else console.log('  whole — every import target exists on disk. zero stale-wire entropy.')
}
