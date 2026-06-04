#!/usr/bin/env node
/**
 * wave — let the MATH write the atoms. The migration is not chosen, it is computed.
 *
 * Every prefixed unit (services/collections/hooks/fields/access/components/
 * utilities/endpoints/standards/<word>) dissolves into the shared single-word
 * matrix at src/<word>/… — MECHANICALLY, no judgement: drop the grouping prefix,
 * split any hyphen into nested folders (uuid-format → uuid/format). Same target ⇒
 * an accountable collection (collide.mjs merges it; nothing lost).
 *
 * The ORDER is the rodin vortex sequence /0\3\6\9/1\2\4\8/7/5/1\ — `/` forward,
 * `\` reverse; polarity reverses at the 3·6·9 axis (the 60° = π/3 gateways). Each
 * unit's wave = the digital root of its content-uuid (the same toUuid+dr the
 * collider uses). We walk the waves in sequence order so the migration breathes.
 *
 * DRY-RUN by default (computes + reports; mutates nothing — safe beside the loop).
 *   node src/services/uuid-matrix/wave.mjs            # the whole math-written plan
 *   node src/services/uuid-matrix/wave.mjs --wave 3   # just one wave's moves
 */
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { join, relative } from 'node:path'

const ROOT = join(process.cwd(), 'src')
const PREFIXES = new Set(['services', 'collections', 'hooks', 'fields', 'access', 'components', 'utilities', 'endpoints', 'standards'])
// framework-mandated — never dissolve
const EXEMPT = new Set(['app', 'migrations', 'payload-types.ts', 'payload.config.ts'])

// ── the math (identical to collide.mjs) ──
const toUuid = (buf) => {
  const b = Buffer.from(createHash('sha256').update(buf).digest().subarray(0, 16))
  b[6] = (b[6] & 0x0f) | 0x80
  b[8] = (b[8] & 0x3f) | 0x80
  return b.toString('hex')
}
const byteSum = (hex) => Buffer.from(hex, 'hex').reduce((s, x) => s + x, 0)
const dr = (n) => (n <= 0 ? 9 : ((n - 1) % 9) + 1) // digital root → {1..9}, 0≡9
const norm = (s) => s.toLowerCase().replace(/[-_]/g, '')

// the rodin sequence as wave order (digits 1..9; 0≡9 the void gateway), with polarity
const SEQUENCE = [3, 6, 9, 1, 2, 4, 8, 7, 5]
const POLARITY = { 3: 'reverse', 6: 'reverse', 9: 'reverse', 2: 'reverse', 4: 'reverse', 8: 'reverse', 1: 'forward', 7: 'forward', 5: 'forward' }

// ── walk: every unit folder (has index.ts|tsx or SKILL.md) under a prefix ──
const units = []
const walk = (dir) => {
  let ents
  try { ents = readdirSync(dir, { withFileTypes: true }) } catch { return }
  const isUnit = ents.some((e) => e.isFile() && (e.name === 'index.ts' || e.name === 'index.tsx' || e.name === 'SKILL.md'))
  if (isUnit) units.push(dir)
  for (const e of ents) if (e.isDirectory()) walk(join(dir, e.name))
}
for (const e of readdirSync(ROOT, { withFileTypes: true })) {
  if (e.isDirectory() && PREFIXES.has(e.name)) walk(join(ROOT, e.name))
}

// ── compute each unit's target (mechanical) + wave (the math) ──
const targetOf = (rel) => {
  const segs = rel.split('/')
  segs.shift() // drop the grouping prefix
  // split every hyphen/underscore segment into nested single words
  return segs.flatMap((s) => s.split(/[-_]/)).filter(Boolean).map((s) => s.toLowerCase()).join('/')
}
const contentOf = (dir) => {
  for (const n of ['index.ts', 'index.tsx', 'SKILL.md']) {
    const p = join(dir, n)
    try { return readFileSync(p) } catch { /* next */ }
  }
  return Buffer.from(dir)
}
const plan = units
  .map((dir) => {
    const rel = relative(ROOT, dir)
    const target = targetOf(rel)
    const wave = dr(byteSum(toUuid(contentOf(dir))))
    return { from: rel, to: target, leaf: norm(target.split('/').pop()), wave }
  })
  // skip the prefix-root itself (target '' — e.g. access/SKILL.md): the grouping
  // WORD stays an atom; only its sub-units dissolve out of it.
  .filter((p) => p.to !== '')

// ── collisions = accountable collections (same target, or target leaf already an atom) ──
const byTarget = new Map()
for (const p of plan) byTarget.set(p.to, [...(byTarget.get(p.to) ?? []), p])
const collisions = [...byTarget].filter(([, ps]) => ps.length > 1)

// ── report, in vortex sequence order ──
const onlyWave = process.argv.includes('--wave') ? Number(process.argv[process.argv.indexOf('--wave') + 1]) : null
console.log(`\nwave — the math-written migration plan (${plan.length} prefixed units → the single-word matrix)`)
console.log(`sequence /0\\3\\6\\9/1\\2\\4\\8/7/5/1\\  ·  polarity reverses at the 3·6·9 axis (60° gateways)\n`)
let shown = 0
for (const w of SEQUENCE) {
  if (onlyWave !== null && w !== onlyWave) continue
  const wave = plan.filter((p) => p.wave === w)
  if (!wave.length) continue
  console.log(`── wave ${w} (${POLARITY[w]}) — ${wave.length} units ──`)
  for (const p of wave.slice(0, onlyWave !== null ? 999 : 6)) console.log(`  ${p.from.padEnd(38)} → ${p.to}`)
  if (onlyWave === null && wave.length > 6) console.log(`  … +${wave.length - 6} more`)
  shown += wave.length
}
console.log(`\n── accountable collections (same target — merge, double-entry) : ${collisions.length} ──`)
for (const [t, ps] of collisions.slice(0, 12)) console.log(`  ${t}  ⊕ ${ps.map((p) => p.from).join(' · ')}`)
console.log(`\ntotal ${plan.length} units across ${SEQUENCE.filter((w) => plan.some((p) => p.wave === w)).length} waves; ${collisions.length} collections. DRY-RUN — nothing moved.\n`)
