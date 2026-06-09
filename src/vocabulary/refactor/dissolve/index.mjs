#!/usr/bin/env node
/**
 * dissolve — execute the single-word matrix migration: drop the grouping prefix,
 * split every multi-word folder name (camelCase / hyphen / underscore) into nested
 * single-word folders, apply the STRICT naming law (singular MODEL · plural
 * COLLECTION), then remap @/ imports (depth-independent after normalize) and rewire
 * the prefix-root registries.
 *
 * Naming law: a unit under `collections/` is a COLLECTION → its last word is PLURAL
 * (invoices, entries); everything else is a MODEL → last word SINGULAR (invoice,
 * tag, scope). Plurality IS the kind — and it resolves collisions (collection `tags`
 * ⊕ field → `tag`). The address law: location = word-path, no prefix.
 *
 *   node scripts/dissolve.mjs            # DRY-RUN: plan + collisions
 *   node scripts/dissolve.mjs --apply    # execute: move + @/ remap + barrel + repo-root
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, renameSync, existsSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'

const ROOT = process.cwd()
const SRC = join(ROOT, 'src')
const APPLY = process.argv.includes('--apply')

// domain groupings are prefixes too — all is accountable (src = the chart of accounts), so a dedicated
// `accounting/` folder is a useless prefix; its units dissolve to their standard-given entity words.
const PREFIXES = new Set(['services', 'collections', 'hooks', 'fields', 'access', 'components', 'utilities', 'endpoints', 'standards', 'accounting'])
// generated artefacts: MOVE with their unit (so siblings resolve) but never content-remap
const GENERATED = [/\.generated\.ts$/, /skills\.index\.ts$/, /installed\.catalogue\.ts$/, /payload-types\.ts$/]

// ── strict inflection ──
const UNCOUNTABLE = new Set(['analytics', 'data', 'metadata', 'media', 'status', 'series', 'species', 'info', 'config', 'access', 'progress', 'business', 'process', 'compliance', 'audit', 'tax', 'news', 'schema', 'cross', 'harness'])
const IRREGULAR_S = { people: 'person', children: 'child', analyses: 'analysis', bases: 'basis', crises: 'crisis', diagnoses: 'diagnosis', indices: 'index', matrices: 'matrix', vertices: 'vertex', criteria: 'criterion', phenomena: 'phenomenon' }
const IRREGULAR_P = Object.fromEntries(Object.entries(IRREGULAR_S).map(([p, s]) => [s, p]))
const singular = (w) => {
  const lw = w.toLowerCase()
  if (UNCOUNTABLE.has(lw) || lw.length < 3) return w
  if (IRREGULAR_S[lw]) return IRREGULAR_S[lw]
  if (/[^aeiou]ies$/.test(lw)) return w.slice(0, -3) + 'y'        // categories→category
  if (/(ches|shes|sses|xes|zes)$/.test(lw)) return w.slice(0, -2) // boxes→box
  if (/[^s]s$/.test(lw)) return w.slice(0, -1)                    // accounts→account
  return w
}
const plural = (w) => {
  const lw = w.toLowerCase()
  if (UNCOUNTABLE.has(lw)) return w
  if (IRREGULAR_P[lw]) return IRREGULAR_P[lw]
  if (/s$/.test(lw)) return w                                     // already plural
  if (/[^aeiou]y$/.test(lw)) return w.slice(0, -1) + 'ies'        // category→categories
  if (/(ch|sh|ss|x|z)$/.test(lw)) return w + 'es'
  return w + 's'
}

const splitWords = (s) =>
  s.replace(/[-_]/g, ' ').replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2').split(/\s+/).filter(Boolean).map((w) => w.toLowerCase())

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
  let segs = rel.split('/')
  if (!PREFIXES.has(segs[0])) return null
  // drop ALL leading grouping prefixes (collections/accounting → both gone — all is accountable)
  let isCollection = false
  while (segs.length > 1 && PREFIXES.has(segs[0])) { if (segs[0] === 'collections') isCollection = true; segs = segs.slice(1) }
  const filename = segs.pop()
  const dirSegs = segs
  if (dirSegs.length === 0) return { kind: /^index\.tsx?$/.test(filename) ? 'BARREL' : 'ROOTATOM', to: null }
  const words = dirSegs.flatMap(splitWords)
  // strict naming law: inflect the LAST word (the entity) by kind
  words[words.length - 1] = isCollection ? plural(words[words.length - 1]) : singular(words[words.length - 1])
  return { kind: filename.endsWith('.mjs') ? 'MJS' : 'UNIT', to: [...words, filename].join('/') }
}

const allFiles = walk(SRC).map((f) => relative(SRC, f).replace(/\\/g, '/'))
const moves = []
const barrels = []
const mjs = []
for (const rel of allFiles) {
  const t = transform(rel)
  if (!t) continue
  if (t.kind === 'BARREL') { barrels.push(rel); continue }
  if (t.kind === 'ROOTATOM') continue
  if (t.to === rel) continue
  const m = { from: rel, to: t.to, kind: t.kind, gen: GENERATED.some((re) => re.test(rel)) }
  moves.push(m)
  if (t.kind === 'MJS') mjs.push(m)
}

const stripExt = (p) => p.replace(/\.(ts|tsx|mjs|js)$/, '')
const stripIndex = (p) => p.replace(/\/index$/, '')
// module key: link/index.ts & link/index.tsx both → "link" (same import specifier = collision)
const moduleKey = (p) => stripIndex(stripExt(p))
const byTarget = new Map()
for (const m of moves) { const k = moduleKey(m.to); byTarget.set(k, [...(byTarget.get(k) ?? []), m.from]) }
const collisions = [...byTarget].filter(([, f]) => f.length > 1)
const collisionTargets = new Set(collisions.map(([k]) => k))
const remap = new Map()
const dirMove = new Map()
for (const m of moves) {
  if (collisionTargets.has(moduleKey(m.to))) continue
  const o = stripIndex(stripExt(m.from)), n = stripIndex(stripExt(m.to))
  if (o !== n) remap.set('@/' + o, '@/' + n)
  if (/\/index\.tsx?$/.test(m.from)) dirMove.set(dirname(m.from), dirname(m.to))
}

const fmt = (n) => n.toLocaleString('en-US')
if (!APPLY) {
  console.log(`\n── dissolve plan (strict singular-model · plural-collection) ──`)
  console.log(`moves: ${fmt(moves.length)} (${mjs.length} mjs, ${moves.filter((m) => m.gen).length} generated)  ·  @/ remaps: ${fmt(remap.size)}  ·  barrels: ${barrels.length}`)
  console.log(`\n── COLLISIONS (judgment merge — SKIPPED) : ${collisions.length} ──`)
  for (const [to, f] of collisions) console.log(`  ${to}  ⊕ ${f.join(' · ')}`)
  console.log(`\n── inflection samples ──`)
  for (const m of moves.filter((x) => x.from.split('/').slice(1, -1).length).slice(0, 8)) console.log(`  ${m.from.padEnd(46)} → ${m.to}`)
}

if (APPLY) {
  let moved = 0
  for (const m of moves) {
    if (collisionTargets.has(moduleKey(m.to))) continue
    const newAbs = join(SRC, m.to)
    mkdirSync(dirname(newAbs), { recursive: true })
    renameSync(join(SRC, m.from), newAbs)
    moved++
  }
  const pairs = [...remap].sort((a, b) => b[0].length - a[0].length).map(([o, n]) => [new RegExp(o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "(?=['\"/])", 'g'), n])
  const remapFile = (abs, { skipGen = false, root = false } = {}) => {
    if (!/\.(ts|tsx)$/.test(abs)) return 0
    if (skipGen && GENERATED.some((re) => re.test(abs.replace(/\\/g, '/')))) return 0
    let txt = readFileSync(abs, 'utf8'); const b = txt
    if (root) txt = txt.replace(/(['"])\.{1,2}\/src\//g, '$1@/') // root file ./src/ ../src/ → @/ (then remapped)
    for (const [re, n] of pairs) txt = txt.replace(re, n)
    if (txt !== b) { writeFileSync(abs, txt); return 1 }
    return 0
  }
  let remapped = 0
  for (const abs of walk(SRC)) remapped += remapFile(abs, { skipGen: true })
  // repo-root files that reference src (tests, worker) via @/ or ./src/
  let rootRemapped = 0
  for (const d of ['tests']) if (existsSync(join(ROOT, d))) for (const abs of walk(join(ROOT, d))) rootRemapped += remapFile(abs, { root: true })
  for (const f of ['worker.ts']) if (existsSync(join(ROOT, f))) rootRemapped += remapFile(join(ROOT, f), { root: true })
  // barrels: ./X re-export → @/<new>
  for (const b of barrels) {
    const abs = join(SRC, b), bdir = dirname(b)
    let txt = readFileSync(abs, 'utf8')
    txt = txt.replace(/(['"])(\.\/[^'"]+)\1/g, (m, q, spec) => {
      const nd = dirMove.get(join(bdir, spec).replace(/\\/g, '/'))
      return nd ? `${q}@/${nd}${q}` : m
    })
    writeFileSync(abs, txt)
  }
  // package.json .mjs script paths
  const pkgPath = join(ROOT, 'package.json'); let pkg = readFileSync(pkgPath, 'utf8')
  for (const m of mjs) { const o = 'src/' + m.from, n = 'src/' + m.to; if (pkg.includes(o)) pkg = pkg.split(o).join(n) }
  writeFileSync(pkgPath, pkg)
  console.log(`✓ moved ${fmt(moved)} · remapped @/ in ${fmt(remapped)} src + ${rootRemapped} root files · ${barrels.length} barrels · SKIPPED ${collisions.length} collisions: ${collisions.map(([t]) => t).join(', ')}`)
}
console.log()
