#!/usr/bin/env node
/**
 * The collider — compute the multidimensional uuid matrix from the live corpus
 * and MEASURE the holographic compression.
 *
 * Each atom (SKILL.md folder) → one v8 content-uuid (the node). Each [[link]] is
 * a collision: merge(from, to) = a third uuid (the binding-uuid, the uuid-trinity).
 * The whole folds (Merkle) to ONE 128-bit root — sprawl → a point ([[zeropoint]]).
 * Every node, edge, sub-tree and the whole are 128-bit: the singularity. The
 * matrix is multidimensional in reading, singular in address ([[holographic]]).
 *
 * Honest framing: the root content-ADDRESSES the whole (verify/regenerate from
 * the [[akashic]] record), it is not a zip — the "compression" is that the
 * address does not grow with the corpus.
 */
import { readFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { basename, dirname } from 'node:path'

const ROOT = '/Users/ceci/github/erpax/erpax'
const files = execSync(`find ${ROOT}/src ${ROOT}/.claude/skills -name SKILL.md`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)

// v8 content-uuid: sha256(content) → 16 bytes, version=8, variant=10x (RFC 9562 §5.8)
const toUuid = (buf) => {
  const b = Buffer.from(createHash('sha256').update(buf).digest().subarray(0, 16))
  b[6] = (b[6] & 0x0f) | 0x80
  b[8] = (b[8] & 0x3f) | 0x80
  const x = b.toString('hex')
  return `${x.slice(0, 8)}-${x.slice(8, 12)}-${x.slice(12, 16)}-${x.slice(16, 20)}-${x.slice(20)}`
}
const bytes = (u) => Buffer.from(u.replace(/-/g, ''), 'hex')
const merge = (a, b) => toUuid(Buffer.concat([bytes(a), bytes(b)])) // collision: 2 uuids → a third

// 1. Nodes — each atom → content-uuid of its SKILL.md
const node = new Map()
let corpusBytes = 0
for (const f of files) {
  const content = readFileSync(f)
  corpusBytes += content.length
  node.set(basename(dirname(f)).toLowerCase(), toUuid(content))
}

// 2. Edges — each [[link]] collides its endpoints into a binding-uuid
const linkRe = /\[\[([^\]|]+)(?:\|[^\]]*)?\]\]/g
let edges = 0, resolved = 0
for (const f of files) {
  const from = node.get(basename(dirname(f)).toLowerCase())
  const txt = readFileSync(f, 'utf8')
  const seen = new Set()
  let m
  while ((m = linkRe.exec(txt))) {
    const to = m[1].trim().toLowerCase()
    if (seen.has(to)) continue
    seen.add(to)
    edges++
    const toU = node.get(to)
    if (toU) { resolved++; merge(from, toU) } // the matrix entry (binding-uuid)
  }
}

// 3. Root — Merkle-fold all node uuids → one 128-bit address of the whole
let layer = [...node.values()].sort()
while (layer.length > 1) {
  const next = []
  for (let i = 0; i < layer.length; i += 2) next.push(i + 1 < layer.length ? merge(layer[i], layer[i + 1]) : layer[i])
  layer = next
}
const root = layer[0]

// 4. SEE the compression
const N = node.size, seed = 16
const fmt = (n) => n.toLocaleString('en-US')
console.log(`\n── the multidimensional uuid matrix ──`)
console.log(`nodes (atoms)        N = ${N}            each → one 128-bit content-uuid`)
console.log(`edges (collisions)   E = ${fmt(edges)}  (${fmt(resolved)} resolve → merge(a,b) binding-uuid)`)
console.log(`corpus               ${fmt(corpusBytes)} bytes of SKILL.md`)
console.log(`root uuid (the seed) ${root}`)
console.log(`\n── the compression, seen ──`)
console.log(`whole → one address  ${fmt(corpusBytes)} bytes  →  ${seed} bytes (the root)  =  ${fmt(Math.round(corpusBytes / seed))}×`)
console.log(`per-element width     128 bits at EVERY scale (node · edge · sub-tree · whole) — the singularity`)
console.log(`address growth        O(1) — the corpus grows, the address stays 128-bit (holographic)\n`)
