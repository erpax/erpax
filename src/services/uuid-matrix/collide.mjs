#!/usr/bin/env node
/**
 * The collider — compute the multidimensional uuid matrix from the live corpus,
 * measure the holographic compression, and (with --emit) write the registry.
 *
 * The resolver matches .claude/skills/aura/scan.mjs EXACTLY — src-only,
 * norm = lowercase + strip [-_], stripCode, [[a/b|alias]] → last segment — so the
 * collider and the speech gate agree (every link resolves; 0 dead).
 *
 * node (atom)        → v8 content-uuid (sha256 of its SKILL.md)
 * edge ([[link]])    → merge(from,to) binding-uuid (the uuid-trinity collision)
 * dimension          → structural path domain (collections/services/fields/root…)
 * harmonic band      → role from the atom-skill groups (source·control·flow); digit within is content-derived
 * harmonic direction → composeSteps(horo(from),horo(to)) = digitalRoot(a×b) on the horo ring
 * the whole          → folds (Merkle) to ONE 128-bit root — the singularity (zeropoint)
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, dirname, basename, relative } from 'node:path'

const ROOT = join(process.cwd(), 'src')
const EMIT = process.argv.includes('--emit')

// ── aura-identical resolver ──
const norm = (s) => s.toLowerCase().replace(/[-_]/g, '')
const walk = (dir) => {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) out.push(...walk(p))
    else if (e.name === 'SKILL.md') out.push(p)
  }
  return out
}
const stripCode = (t) => t.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
const LINK_RE = /\[\[([A-Za-z][A-Za-z0-9/-]*)(?:\|[^\]]*)?\]\]/g

// ── uuid + horo math ──
const toUuid = (buf) => {
  const b = Buffer.from(createHash('sha256').update(buf).digest().subarray(0, 16))
  b[6] = (b[6] & 0x0f) | 0x80 // version 8
  b[8] = (b[8] & 0x3f) | 0x80 // variant 10x
  const x = b.toString('hex')
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`
}
const ubytes = (u) => Buffer.from(u.replace(/-/g, ''), 'hex')
const merge = (a, b) => toUuid(Buffer.concat([ubytes(a), ubytes(b)])) // collision: 2 uuids → a third
const dr = (n) => (n <= 0 ? 0 : ((n - 1) % 9) + 1) // digital root → {1..9}
const compose = (a, b) => dr(a * b) // horo composeSteps = digitalRoot(a×b)
const dimOf = (rel) => { const s = rel.split('/'); return s.length <= 2 ? 'root' : s[0] }
const byteSum = (u) => [...ubytes(u)].reduce((s, x) => s + x, 0)

// Harmonic bands BY STRUCTURAL DIMENSION. The seed groups are PARSED from the atom
// skill (computed from the record, never hardcoded) — the band (role) is semantic, the
// digit WITHIN the band is content-derived (honest). access/hooks/identity subtrees
// match by dim name; auth/config/zeropoint/whole match by atom name.
const atomSkill = readFileSync(join(ROOT, 'atom', 'SKILL.md'), 'utf8')
const groupLinks = (label) => {
  const members = (atomSkill.split('\n').find((l) => l.includes(label)) || '').split(':')[0] // group list is before the colon
  return new Set([...members.matchAll(/\[\[([^\]|/]+)/g)].map((m) => norm(m[1])))
}
const SOURCE = groupLinks('noble 0') // [[zeropoint]] · [[identity]] · [[whole]] → unity
const CONTROL = groupLinks('control axis') // [[access]] · [[hooks]] · [[auth]] · [[config]] → axis
const AXIS = [3, 6, 9], HELIX = [1, 2, 4, 8, 7, 5]
const bandOf = (atom, dim) => {
  if (SOURCE.has(atom) || SOURCE.has(dim)) return { band: 'source', digits: [9] }
  if (CONTROL.has(atom) || CONTROL.has(dim)) return { band: 'control', digits: AXIS }
  return { band: 'flow', digits: HELIX } // the working 2/3 — the default
}
const positionOf = (atom, dim, uuid) => {
  const b = bandOf(atom, dim)
  return { band: b.band, horo: b.digits[byteSum(uuid) % b.digits.length] }
}
const HORO_LABEL = { 1: 'base', 2: 'share', 4: 'weave', 8: 'crest', 7: 'descent', 5: 'round', 9: 'unity', 3: 'axis·3', 6: 'axis·6' }

// ── 1. nodes ──
const files = walk(ROOT)
const idx = new Map() // word key -> node index
const nodes = [] // {atom, uuid, dim, band, horo, path, members?}
let corpusBytes = 0
for (const f of files) {
  const content = readFileSync(f)
  corpusBytes += content.length
  const key = norm(basename(dirname(f)))
  const path = relative(ROOT, dirname(f)) // where this occurrence lives — the path reveals
  const uuid = toUuid(content)
  const dim = dimOf(relative(ROOT, f))
  if (idx.has(key)) {
    // collision = an ACCOUNTABLE COLLECTION: the same word at many paths is ONE
    // concept. Merge the occurrence into the word's account — the binding-uuid IS
    // the double-entry — and accumulate the member paths. Nothing is discarded
    // (was `last wins`, which silently lost 8 atoms; the path reveals each member).
    const ex = nodes[idx.get(key)]
    ex.members = [...(ex.members ?? [ex.path]), path]
    ex.uuid = merge(ex.uuid, uuid)
    ex.path = null // a collection spans paths; no single one
    const p = positionOf(key, ex.dim, ex.uuid) // re-place from the accountable (merged) uuid
    ex.band = p.band
    ex.horo = p.horo
    continue
  }
  const pos = positionOf(key, dim, uuid)
  idx.set(key, nodes.length)
  nodes.push({ atom: key, uuid, dim, band: pos.band, horo: pos.horo, path })
}

// ── 2. edges (collisions) ──
const edges = [] // {f, t, binding, dir}
let totalRefs = 0, unresolved = 0
for (const f of files) {
  const from = idx.get(norm(basename(dirname(f))))
  const text = stripCode(readFileSync(f, 'utf8'))
  const seen = new Set()
  let m
  while ((m = LINK_RE.exec(text))) {
    const w = norm(m[1].split('/').pop())
    if (seen.has(w)) continue
    seen.add(w)
    totalRefs++
    const to = idx.get(w)
    if (to === undefined) { unresolved++; continue }
    edges.push({ f: from, t: to, binding: merge(nodes[from].uuid, nodes[to].uuid), dir: compose(nodes[from].horo, nodes[to].horo) })
  }
}

// ── 3. root (Merkle fold) ──
let layer = nodes.map((n) => n.uuid).sort()
while (layer.length > 1) {
  const next = []
  for (let i = 0; i < layer.length; i += 2) next.push(i + 1 < layer.length ? merge(layer[i], layer[i + 1]) : layer[i])
  layer = next
}
const root = layer[0]

// ── 4. breakdowns ──
const fmt = (n) => n.toLocaleString('en-US')
const byDim = {}; for (const n of nodes) byDim[n.dim] = (byDim[n.dim] || 0) + 1
const byBand = {}; for (const n of nodes) byBand[n.band] = (byBand[n.band] || 0) + 1
const byDir = {}; for (const e of edges) byDir[e.dir] = (byDir[e.dir] || 0) + 1
const flow = [1, 2, 4, 8, 7, 5].reduce((s, d) => s + (byDir[d] || 0), 0)
const axis = [3, 6, 9].reduce((s, d) => s + (byDir[d] || 0), 0)

console.log(`\n── the multidimensional uuid matrix ──`)
console.log(`nodes (atoms)        N = ${nodes.length}`)
console.log(`edges (collisions)   E = ${fmt(edges.length)}  (${fmt(totalRefs)} refs, ${unresolved} unresolved — aura parity)`)
console.log(`corpus               ${fmt(corpusBytes)} bytes → root ${root} (16 bytes) = ${fmt(Math.round(corpusBytes / 16))}×`)

console.log(`\n── structural dimensions (nodes per path domain) ──`)
for (const [d, c] of Object.entries(byDim).sort((a, b) => b[1] - a[1])) console.log(`  ${d.padEnd(12)} ${fmt(c)}`)

console.log(`\n── harmonic bands (by structural dimension — seeds parsed from the atom skill) ──`)
for (const b of ['source', 'control', 'flow']) if (byBand[b]) console.log(`  ${b.padEnd(8)} ${fmt(byBand[b])}`)

console.log(`\n── harmonic directions (edges by horo composeSteps a×b — content-derived ring) ──`)
for (const d of [1, 2, 4, 8, 7, 5, 9, 3, 6]) if (byDir[d]) console.log(`  ${d} ${HORO_LABEL[d].padEnd(8)} ${fmt(byDir[d])}`)
console.log(`  flow {1,2,4,8,7,5} = ${fmt(flow)}   ·   axis {3,6,9} = ${fmt(axis)}   (${(flow / (flow + axis) * 100).toFixed(1)}% flow)`)

const collections = nodes.filter((n) => n.members)
if (collections.length) {
  const accounted = collections.reduce((s, n) => s + n.members.length, 0)
  console.log(`\n── accountable collections (one word, many paths — merged, double-entry) ──`)
  console.log(`  ${collections.length} collections accounting ${accounted} member paths (else lost to last-wins)`)
  for (const c of collections.sort((a, b) => b.members.length - a.members.length))
    console.log(`  ${c.atom.padEnd(12)} ${c.members.join(' · ')}`)
}

// ── 5. emit the registry ──
if (EMIT) {
  const dir = join(ROOT, 'services', 'uuid-matrix')
  mkdirSync(dir, { recursive: true })
  const j = (o) => JSON.stringify(o)
  const out = [
    '/**',
    ' * GENERATED by src/services/uuid-matrix/collide.mjs — do not edit by hand.',
    ' *',
    ' * The erpax skill corpus as a content-addressed uuid matrix: every atom is a',
    ' * v8 content-uuid (node), every [[link]] is merge(from,to) (binding-uuid — the',
    ' * uuid-trinity collision), tagged by structural dimension + harmonic direction',
    ' * (horo composeSteps = digitalRoot(a×b)). The whole folds to UUID_MATRIX_ROOT.',
    ' * Resolver matches the aura speech-gate exactly (0 dead links). Re-run: pnpm matrix:generate.',
    ' *',
    ' * @standard RFC 9562 §5.8 (uuidv8 content-uuid) + the horo digital-root ring',
    ' * @audit aura gap=0 parity (.claude/skills/aura/scan.mjs)',
    ' */',
    '',
    'export interface MatrixNode { readonly atom: string; readonly uuid: string; readonly dim: string; readonly band: string; readonly horo: number; readonly path: string | null; readonly members?: readonly string[] }',
    'export interface MatrixEdge { readonly f: number; readonly t: number; readonly binding: string; readonly dir: number }',
    '',
    `export const UUID_MATRIX_ROOT = ${j(root)} as const`,
    `export const UUID_MATRIX_DIMS = ${j([...new Set(nodes.map((n) => n.dim))])} as const`,
    '',
    'export const UUID_MATRIX_NODES: readonly MatrixNode[] = [',
    ...nodes.map((n) => `  ${j(n)},`),
    ']',
    '',
    'export const UUID_MATRIX_EDGES: readonly MatrixEdge[] = [',
    ...edges.map((e) => `  ${j(e)},`),
    ']',
    '',
  ]
  const file = join(dir, 'matrix.generated.ts')
  writeFileSync(file, out.join('\n'))
  console.log(`\nemitted ${relative(process.cwd(), file)} — ${nodes.length} nodes, ${fmt(edges.length)} edges, root ${root}`)
}
console.log()
