#!/usr/bin/env node
/**
 * dissolve — plan/execute the single-word matrix migration: drop the grouping
 * prefix, split every multi-word folder name (camelCase / hyphen / underscore)
 * into nested single-word folders, then remap @/ imports (depth-independent,
 * thanks to normalize-imports.mjs) and rewire the prefix-root registries.
 *
 * The address law ([[sequence]]): location = (word path), no prefix. Same target
 * word ⇒ an accountable collection (merge, never last-wins) — flagged + SKIPPED
 * by --apply (left in place for judgment merge).
 *
 * Files are classified:
 *   UNIT    — a file under a prefix with a real word path → MOVES to src/<words>/…
 *   BARREL  — a prefix-root index.ts (collections/index.ts …) → REGISTRY, rewired not moved
 *   ROOTATOM— a prefix-root SKILL.md (access/SKILL.md …) → the grouping word stays an atom
 *   MJS     — a .mjs under a prefix → moves; its package.json script path is rewired
 *
 *   node scripts/dissolve.mjs                 # DRY-RUN: the plan + collisions + barrels
 *   node scripts/dissolve.mjs --emit          # also write scripts/.dissolve-plan.json
 *   node scripts/dissolve.mjs --apply         # EXECUTE: move + @/ remap + barrel rewire
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, renameSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const EMIT = process.argv.includes('--emit')
const APPLY = process.argv.includes('--apply')

const PREFIXES = new Set(['services', 'collections', 'hooks', 'fields', 'access', 'components', 'utilities', 'endpoints', 'standards'])
const SKIP_FILE = [/\.generated\.ts$/, /skills\.index\.ts$/, /installed\.catalogue\.ts$/, /payload-types\.ts$/, /matrix\.generated\.ts$/]

// camelCase + hyphen/underscore → lowercase words. GLAccounts→[gl,accounts]
const splitWords = (s) =>
  s
    .replace(/[-_]/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.toLowerCase())

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else out.push(p)
  }
  return out
}

const transform = (rel) => {
  const segs = rel.split('/')
  if (!PREFIXES.has(segs[0])) return null
  const filename = segs.pop()
  const dirSegs = segs.slice(1)
  if (dirSegs.length === 0) return { kind: /^index\.tsx?$/.test(filename) ? 'BARREL' : 'ROOTATOM', to: null }
  const words = dirSegs.flatMap(splitWords)
  return { kind: filename.endsWith('.mjs') ? 'MJS' : 'UNIT', to: [...words, filename].join('/') }
}

const allFiles = walk(SRC).map((f) => relative(SRC, f).replace(/\\/g, '/'))
const moves = []
const barrels = []
const rootatoms = []
const mjs = []
for (const rel of allFiles) {
  if (SKIP_FILE.some((re) => re.test(rel))) continue
  const t = transform(rel)
  if (!t) continue
  if (t.kind === 'BARREL') { barrels.push(rel); continue }
  if (t.kind === 'ROOTATOM') { rootatoms.push(rel); continue }
  if (t.to === rel) continue
  const m = { from: rel, to: t.to, kind: t.kind }
  moves.push(m)
  if (t.kind === 'MJS') mjs.push(m)
}

const byTarget = new Map()
for (const m of moves) byTarget.set(m.to, [...(byTarget.get(m.to) ?? []), m.from])
const collisions = [...byTarget].filter(([, froms]) => froms.length > 1)
const collisionTargets = new Set(collisions.map(([to]) => to))

// @/ remap: @/<oldNoExt|oldDir> → @/<newNoExt|newDir>
const stripExt = (p) => p.replace(/\.(ts|tsx|mjs|js)$/, '')
const stripIndex = (p) => p.replace(/\/index$/, '')
const remap = new Map()
for (const m of moves) {
  if (collisionTargets.has(m.to)) continue
  const o = stripIndex(stripExt(m.from))
  const n = stripIndex(stripExt(m.to))
  if (o !== n) remap.set('@/' + o, '@/' + n)
}
// dir-level move map (for barrel ./re-export rewrite): oldDir → newDir
const dirMove = new Map()
for (const m of moves) {
  if (collisionTargets.has(m.to)) continue
  if (/\/index\.tsx?$/.test(m.from)) dirMove.set(dirname(m.from), dirname(m.to))
}

const fmt = (n) => n.toLocaleString('en-US')
if (!APPLY) {
  console.log(`\n── dissolve plan — the single-word matrix (after @/ normalization) ──`)
  console.log(`UNIT moves (.ts/.tsx):   ${fmt(moves.length - mjs.length)}`)
  console.log(`MJS moves:               ${fmt(mjs.length)}`)
  console.log(`@/ remap rules:          ${fmt(remap.size)}`)
  console.log(`prefix barrels (rewire): ${barrels.length}  → ${barrels.join(', ')}`)
  console.log(`prefix root-atoms (stay):${rootatoms.length}`)
  console.log(`\n── ⚠ COLLISIONS (accountable MERGE, judgment — SKIPPED by --apply) : ${collisions.length} ──`)
  for (const [to, froms] of collisions) console.log(`  ${to}\n      ⊕ ${froms.join('\n      ⊕ ')}`)
}

if (EMIT) {
  writeFileSync(join(ROOT, 'scripts', '.dissolve-plan.json'), JSON.stringify({ moves, barrels, rootatoms, collisions, remap: Object.fromEntries(remap), dirMove: Object.fromEntries(dirMove) }, null, 2))
  console.log(`emitted scripts/.dissolve-plan.json`)
}

if (APPLY) {
  // 1. move files (skip collisions — left in place for judgment merge)
  let moved = 0
  for (const m of moves) {
    if (collisionTargets.has(m.to)) continue
    const oldAbs = join(SRC, m.from)
    const newAbs = join(SRC, m.to)
    mkdirSync(dirname(newAbs), { recursive: true })
    renameSync(oldAbs, newAbs)
    moved++
  }
  // 2. @/ remap across all .ts/.tsx (longest key first; boundary-anchored)
  const pairs = [...remap].sort((a, b) => b[0].length - a[0].length).map(([o, n]) => [new RegExp(o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "(?=['\"/])", 'g'), n])
  let remapped = 0
  for (const abs of walk(SRC)) {
    if (!/\.(ts|tsx)$/.test(abs) || SKIP_FILE.some((re) => re.test(abs.replace(/\\/g, '/')))) continue
    let txt = readFileSync(abs, 'utf8')
    const before = txt
    for (const [re, n] of pairs) txt = txt.replace(re, n)
    if (txt !== before) { writeFileSync(abs, txt); remapped++ }
  }
  // 3. rewire the prefix barrels: ./X re-export → @/<new>
  let barrelsRewired = 0
  for (const b of barrels) {
    const abs = join(SRC, b)
    const bdir = dirname(b)
    let txt = readFileSync(abs, 'utf8')
    txt = txt.replace(/(['"])(\.\/[^'"]+)\1/g, (m, q, spec) => {
      const target = join(bdir, spec).replace(/\\/g, '/') // e.g. collections/Categories
      const nd = dirMove.get(target)
      return nd ? `${q}@/${nd}${q}` : m
    })
    writeFileSync(abs, txt)
    barrelsRewired++
  }
  // 4. rewire package.json script paths for moved .mjs
  let pkgFixed = 0
  const pkgPath = join(ROOT, 'package.json')
  let pkg = readFileSync(pkgPath, 'utf8')
  for (const m of mjs) {
    const oldP = 'src/' + m.from
    const newP = 'src/' + m.to
    if (pkg.includes(oldP)) { pkg = pkg.split(oldP).join(newP); pkgFixed++ }
  }
  writeFileSync(pkgPath, pkg)
  console.log(`✓ APPLIED: moved ${fmt(moved)} files, remapped @/ in ${fmt(remapped)} files, rewired ${barrelsRewired} barrels, ${pkgFixed} package.json script paths`)
  console.log(`  SKIPPED ${collisions.length} collisions (left in place — merge by judgment): ${collisions.map(([t]) => t).join(', ')}`)
  console.log(`  ⚠ verify: tsc, then merge collisions, then regen generated artefacts`)
}
console.log()
