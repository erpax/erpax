#!/usr/bin/env node
/**
 * normalize-imports — the wiring dry-clean: rewrite every cross-unit relative
 * import ("../…") in .ts/.tsx to the uniform "@/…" absolute address
 * (tsconfig paths: @/* → src/*).
 *
 * Why: the [[sequence]] address law says "../x for a non-sibling is a violation."
 * Uniform @/ addressing is depth-INDEPENDENT, so the single-word-folder MOVE that
 * follows (dissolve.mjs) is a pure string remap (@/old → @/new) — no relative-depth
 * recompute that could silently break. tsc-identical (same target files resolved),
 * so it is a safe, committable foundation before the dissolve.
 *
 * Scope: .ts/.tsx only. .mjs/.js run under raw `node` (no tsconfig path map), so
 * their relative imports are LEFT as-is. Same-dir "./x" is left as-is (it moves
 * with its unit). Only "../…" (cross-unit, depth-fragile) is rewritten.
 *
 *   node scripts/normalize-imports.mjs            # DRY-RUN (report only)
 *   node scripts/normalize-imports.mjs --apply    # rewrite in place
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { join, dirname, relative, resolve } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const APPLY = process.argv.includes('--apply')

// never touch generated artefacts (they regenerate from the config/corpus)
const SKIP = [/\.generated\.ts$/, /skills\.index\.ts$/, /installed\.catalogue\.ts$/, /payload-types\.ts$/, /matrix\.generated\.ts$/]
const REWRITE_EXT = ['.ts', '.tsx'] // .mjs/.js excluded — node can't resolve @/

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

// resolve a relative specifier from `fromFile` to an absolute src file, or null
const resolveSpec = (fromFile, spec) => {
  const base = resolve(dirname(fromFile), spec)
  const cands = [
    base, base + '.ts', base + '.tsx', base + '.mjs', base + '.js', base + '.json',
    join(base, 'index.ts'), join(base, 'index.tsx'), join(base, 'index.mjs'), join(base, 'index.js'),
  ]
  for (const c of cands) {
    try { if (statSync(c).isFile()) return c } catch { /* next */ }
  }
  return null
}

// absolute src file → "@/..." specifier (mirror tsc/bundler resolution)
const toAlias = (absFile, originalSpec) => {
  let rel = relative(SRC, absFile).replace(/\\/g, '/')
  rel = rel.replace(/\/index\.(ts|tsx|mjs|js)$/, '') // /index.* → directory
  // drop .ts/.tsx ext (extensionless); keep explicit .mjs/.js/.json
  if (/\.(ts|tsx)$/.test(rel) && !/\.(mjs|js|json)$/.test(originalSpec)) rel = rel.replace(/\.(ts|tsx)$/, '')
  return '@/' + rel
}

// from '..'  |  import '..'  |  import('..')  |  require('..')
const SPEC_RE = /((?:from|import|require)\s*\(?\s*)(['"])(\.\.[^'"]*)\2/g

let filesChanged = 0
let importsConverted = 0
const unresolved = []
const samples = []
for (const file of walk(SRC)) {
  const norm = file.replace(/\\/g, '/')
  if (SKIP.some((re) => re.test(norm))) continue
  if (!REWRITE_EXT.some((x) => file.endsWith(x))) continue
  const src = readFileSync(file, 'utf8')
  let changed = false
  const out = src.replace(SPEC_RE, (m, kw, q, spec) => {
    const abs = resolveSpec(file, spec)
    if (!abs || !abs.startsWith(SRC)) {
      unresolved.push(`${relative(SRC, file)}  →  ${spec}`)
      return m
    }
    const alias = toAlias(abs, spec)
    if (samples.length < 12) samples.push(`${relative(SRC, file)}:  ${spec}  →  ${alias}`)
    changed = true
    importsConverted++
    return `${kw}${q}${alias}${q}`
  })
  if (changed) {
    filesChanged++
    if (APPLY) writeFileSync(file, out)
  }
}

console.log(`\n${APPLY ? '✓ APPLIED' : 'DRY-RUN'}: ${importsConverted} relative imports → @/ across ${filesChanged} .ts/.tsx files\n`)
console.log('samples:')
for (const s of samples) console.log('  ' + s)
if (unresolved.length) {
  console.log(`\n⚠ ${unresolved.length} unresolved relative specifiers (LEFT as-is — inspect):`)
  for (const u of unresolved.slice(0, 30)) console.log('  ' + u)
}
console.log()
