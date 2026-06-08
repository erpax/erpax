/**
 * spec-gen — the test-layer twin of `.claude/skills/aura/scan.mjs`.
 *
 * Registry-driven: the source of truth for chains is `BUSINESS_CHAINS`
 * (src/services/business-chains/registry.ts), NOT scattered `@chainStep`
 * banners. For each registry chain it maps the repo's `@invariant` banners
 * to the chain by its step-collection FILES, measures translatability with
 * the real `translatePredicate`, and checks the chain's declared
 * `seedFile`/`testFile`. Reports the GAP between the registry and a green
 * generated test:
 *   - no-seed / no-test : the chain's declared seed/test files don't exist
 *   - todo              : @invariant predicates the translator can't render
 * gap = chains without seed+test  +  Σ todo — driven to 0 like the tsc tail.
 *
 * SCAN only (never writes). Mirrors the generate→link→re-scan loop.
 * Usage:  pnpm spec:gen [--json] [--chain=ID]
 * @see src/services/business-chains/registry.ts, src/services/spec-generator/*
 */

import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { BUSINESS_CHAINS } from '@/business/chain'
import { extractCorpus } from '@/spec/generator'
import { translatePredicate, generateChainTestFromRegistry } from '@/spec/generator'
import type { SpecInvariant } from '@/spec/generator'

const repoRoot = process.cwd()
const json = process.argv.includes('--json')
const onlyChain = (process.argv.find((a) => a.startsWith('--chain=')) || '').split('=')[1]
const emitChain = (process.argv.find((a) => a.startsWith('--emit=')) || '').split('=')[1]

const isTranslatable = (inv: SpecInvariant): boolean =>
  inv.form === 'ts'
    ? Boolean(inv.tsCode)
    : Boolean(inv.predicate && translatePredicate(inv.predicate) !== null)

/** Map a chain's @invariant banners via its step-collection files. */
function invariantsForChain(corpus: ReturnType<typeof extractCorpus>, chainId: string): SpecInvariant[] {
  const chain = BUSINESS_CHAINS[chainId]
  if (!chain) return []
  const cols = new Set(chain.steps.map((s) => s.collection))
  return corpus.collections.filter((c) => cols.has(c.slug)).flatMap((c) => [...c.invariants])
}

// --emit=CHAIN: preview the registry-generated test SOURCE on stdout. Writes
// nothing — the test imports a seed that must be authored before it can run.
if (emitChain) {
  const chain = BUSINESS_CHAINS[emitChain]
  if (!chain) { console.error(`no chain '${emitChain}' in BUSINESS_CHAINS`); process.exit(2) }
  const gen = generateChainTestFromRegistry(chain, invariantsForChain(extractCorpus(repoRoot), emitChain))
  console.error(`// preview — ${gen.chainId}: ${gen.invariantCount} invariants, ${gen.translatedCount} translated · target ${chain.testFile}\n`)
  console.log(gen.source)
  process.exit(0)
}

interface Row {
  chainId: string
  steps: number
  collections: number
  invariants: number
  translatable: number
  todo: number
  hasSeed: boolean
  hasTest: boolean
}

function scan(): Row[] {
  const corpus = extractCorpus(repoRoot)
  let ids = Object.keys(BUSINESS_CHAINS)
  if (onlyChain) ids = ids.filter((id) => id === onlyChain)

  const rows: Row[] = []
  for (const id of ids) {
    const chain = BUSINESS_CHAINS[id]
    const cols = new Set(chain.steps.map((s) => s.collection))
    const invs = invariantsForChain(corpus, id)
    const translatable = invs.filter(isTranslatable).length
    rows.push({
      chainId: id,
      steps: chain.steps.length,
      collections: cols.size,
      invariants: invs.length,
      translatable,
      todo: invs.length - translatable,
      hasSeed: existsSync(join(repoRoot, chain.seedFile)),
      hasTest: existsSync(join(repoRoot, chain.testFile)),
    })
  }
  return rows.sort((a, b) => a.chainId.localeCompare(b.chainId))
}

const rows = scan()
const totalTodo = rows.reduce((s, r) => s + r.todo, 0)
const noSeed = rows.filter((r) => !r.hasSeed).length
const noTest = rows.filter((r) => !r.hasTest).length
const ready = rows.filter((r) => r.hasSeed && r.hasTest && r.todo === 0).length
const gap = rows.filter((r) => !(r.hasSeed && r.hasTest)).length + totalTodo

if (json) {
  console.log(JSON.stringify({ registryChains: rows.length, ready, noSeed, noTest, totalTodo, gap, rows }, null, 2))
} else {
  const L: string[] = []
  L.push(`spec-gen scan (registry-driven) — ${rows.length} chains, ${ready} ready (seed + test + all invariants translatable)`)
  L.push(`gap = ${gap}  (missing-seed ${noSeed} · missing-test ${noTest} · todo-invariants ${totalTodo})`)
  L.push('')
  L.push('chain                              steps cols  inv  tr  todo  seed test')
  for (const r of rows) {
    L.push(
      `  ${r.chainId.padEnd(32)} ${String(r.steps).padStart(5)} ${String(r.collections).padStart(4)} ` +
      `${String(r.invariants).padStart(4)} ${String(r.translatable).padStart(3)} ${String(r.todo).padStart(5)}  ` +
      `${(r.hasSeed ? 'yes' : 'NO').padEnd(4)} ${r.hasTest ? 'yes' : 'NO'}`,
    )
  }
  if (gap === 0) L.push('\nspec layer whole — every registry chain seeded, tested, and translatable. ✓')
  else L.push('\nMINT queue: author the missing seedFile/testFile (registry-declared paths), rewrite TODO predicates.')
  console.log(L.join('\n'))
}

process.exit(gap === 0 ? 0 : 1)
