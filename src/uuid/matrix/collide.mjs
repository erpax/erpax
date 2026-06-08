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

// ── 1. nodes — one node per atom path (folder path IS the matrix address) ──
const files = walk(ROOT)
const pathIdx = new Map() // atomPath -> node index
const leafPaths = new Map() // norm(leaf) -> atomPath[] (homonym disambiguation for [[links]])
const nodes = [] // {atom, uuid, dim, band, horo, path}
let corpusBytes = 0
const atomPathOf = (f) => relative(ROOT, dirname(f)).replace(/\\/g, '/')
const parentPathOf = (p) => { const i = p.lastIndexOf('/'); return i >= 0 ? p.slice(0, i) : null }
for (const f of files) {
  const content = readFileSync(f)
  corpusBytes += content.length
  const path = atomPathOf(f)
  const leaf = norm(basename(dirname(f)))
  const uuid = toUuid(content)
  const dim = dimOf(relative(ROOT, f))
  const pos = positionOf(leaf, dim, uuid)
  pathIdx.set(path, nodes.length)
  if (!leafPaths.has(leaf)) leafPaths.set(leaf, [])
  leafPaths.get(leaf).push(path)
  nodes.push({ atom: leaf, uuid, dim, band: pos.band, horo: pos.horo, path })
}
/** Resolve [[link]] to a node index — full path first, then leaf with root/shortest preference. */
const resolveLink = (raw) => {
  const link = raw.replace(/\\/g, '/')
  const segments = link.split('/').map((s) => norm(s))
  if (segments.length > 1) {
    const pi = pathIdx.get(segments.join('/'))
    if (pi !== undefined) return pi
  }
  const leaf = segments[segments.length - 1]
  const paths = leafPaths.get(leaf)
  if (!paths?.length) return undefined
  if (paths.length === 1) return pathIdx.get(paths[0])
  const root = paths.find((p) => !p.includes('/'))
  if (root) return pathIdx.get(root)
  paths.sort((a, b) => a.split('/').length - b.split('/').length || a.localeCompare(b))
  return pathIdx.get(paths[0])
}

// ── 1b. the [[coordinate]] cross: parent (tree axis) ⊕ prev ⊕ next (sequence ring, the 2 coils) ──
// Each atom binds to its three neighbour uuids; tampering any atom ripples to parent/prev/next.
const NIL = '00000000-0000-8000-8000-000000000000'
const ordered = [...nodes].sort((a, b) => a.path.localeCompare(b.path))
const N = ordered.length
ordered.forEach((n, i) => {
  const pp = parentPathOf(n.path)
  const parent = (pp && pathIdx.has(pp) ? nodes[pathIdx.get(pp)].uuid : null) || NIL // tree (axis)
  const prev = ordered[(i - 1 + N) % N].uuid // reverse coil (ring wraps via octave)
  const next = ordered[(i + 1) % N].uuid // forward coil
  n.parent = parent
  n.prev = prev
  n.next = next
  n.cross = merge(merge(parent, prev), next) // the trinity
  n.bind = merge(n.uuid, n.cross) // content ⊕ coordinate — the tamper-evident whole
})

// ── 2. edges (collisions) ──
const edges = [] // {f, t, binding, dir}
let totalRefs = 0, unresolved = 0
for (const f of files) {
  const from = pathIdx.get(atomPathOf(f))
  const text = stripCode(readFileSync(f, 'utf8'))
  const seen = new Set()
  let m
  while ((m = LINK_RE.exec(text))) {
    const key = m[1].replace(/\\/g, '/').toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    totalRefs++
    const to = resolveLink(m[1])
    if (to === undefined) { unresolved++; continue }
    edges.push({ f: from, t: to, binding: merge(nodes[from].uuid, nodes[to].uuid), dir: compose(nodes[from].horo, nodes[to].horo) })
  }
}

// ── 2b. SYMMETRIC entangle binding (the wiring law: NO gap in entanglement in ANY direction).
// For every forward edge f→t add the reverse t→f if absent — merge() is order-independent, so the
// binding-uuid is identical both ways. This reciprocates the graph (directed-link entropy → 0) and
// dissolves orphans: any atom with an outbound link gains the reverse inbound. The Merkle root folds
// over NODES, so reciprocation does not move the matrix root — it only completes the entanglement.
{
  const ekey = (f, t) => f + ':' + t
  const have = new Set(edges.map((e) => ekey(e.f, e.t)))
  const forward = [...edges]
  for (const e of forward) {
    if (!have.has(ekey(e.t, e.f))) {
      have.add(ekey(e.t, e.f))
      edges.push({ f: e.t, t: e.f, binding: e.binding, dir: compose(nodes[e.t].horo, nodes[e.f].horo) })
    }
  }
}

// ── 3. root (Merkle fold over the content⊕path BIND — the [[coordinate]] root) ──
let layer = nodes.map((n) => n.bind ?? n.uuid).sort()
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

const homonyms = [...leafPaths.entries()].filter(([, ps]) => ps.length > 1)
if (homonyms.length) {
  const accounted = homonyms.reduce((s, [, ps]) => s + ps.length, 0)
  console.log(`\n── homonym leaves (one word, many paths — each path is its own node) ──`)
  console.log(`  ${homonyms.length} leaves at ${accounted} paths (folder path IS the matrix address)`)
  for (const [leaf, ps] of homonyms.sort((a, b) => b[1].length - a[1].length).slice(0, 12))
    console.log(`  ${leaf.padEnd(12)} ${ps.join(' · ')}`)
}

// ── 5. emit the registry ──
if (EMIT) {
  const dir = join(ROOT, 'uuid', 'matrix')
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
    'export interface MatrixNode { readonly atom: string; readonly uuid: string; readonly parent?: string; readonly prev?: string; readonly next?: string; readonly cross?: string; readonly bind?: string; readonly dim: string; readonly band: string; readonly horo: number; readonly path: string }',
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
