#!/usr/bin/env node
/**
 * aura/propose — COMPUTE the weave proposals. No training, all computable.
 *
 * weave.mjs applies `{orphan, target, reason}` proposals; until now those came
 * from an agent workflow (judgment = training). This computes them deterministically
 * from the corpus, so harmonising needs no trained agent and cannot hallucinate:
 *
 *   For each ORPHAN (atom nothing links to), the target is the atom whose SKILL.md
 *   text actually MENTIONS the orphan's word — a TRUE relation, never invented —
 *   chosen as the highest-MASS such atom (backlink count), so the orphan attaches
 *   to a hub. An orphan no atom mentions stays orphan (honest: no computable truth).
 *
 * The resolver (norm = lowercase, strip [-_]; skip the src/skills symlink) is the
 * SAME one aura/scan ∥ collide ∥ weave use. Output feeds weave.mjs verbatim.
 *
 *   node src/aura/propose.mjs            print summary + write src/aura/.proposals.json
 *   node src/aura/propose.mjs --json     print the proposals JSON to stdout
 *
 * @audit no link invented — every proposal is a co-occurrence (target text ∋ orphan)
 * @see ./weave.mjs (applies) · ./scan.mjs (the gap) · ../uuid/matrix (mass = backlinks)
 */
import { readdirSync, readFileSync, writeFileSync, lstatSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

const ROOT = join(process.cwd(), 'src')
const norm = (s) => String(s).toLowerCase().replace(/[-_]/g, '')
const stripCode = (t) => t.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
const LINK_RE = /\[\[([A-Za-z][A-Za-z0-9/-]*)(?:\|[^\]]*)?\]\]/g
const WORD_RE = /[a-z][a-z0-9]*/g

const isRealDir = (p) => {
  try {
    const s = lstatSync(p)
    return s.isDirectory() && !s.isSymbolicLink()
  } catch {
    return false
  }
}
function walk(dir, out = []) {
  for (const e of readdirSync(dir).sort()) {
    if (e === 'node_modules' || e.startsWith('.')) continue
    const p = join(dir, e)
    if (!isRealDir(p)) continue
    try {
      if (lstatSync(join(p, 'SKILL.md')).isFile()) out.push(join(p, 'SKILL.md'))
    } catch {
      /* no SKILL.md here */
    }
    walk(p, out)
  }
  return out
}

// ── index every atom: norm-leaf → { leaf, text } (last wins; merged leaves benign) ──
const atoms = new Map()
for (const f of walk(ROOT)) {
  const leaf = basename(dirname(f))
  atoms.set(norm(leaf), { leaf, text: readFileSync(f, 'utf8') })
}

// ── mass = incoming-link count (backlinks) per atom; orphan ⇔ mass 0 ──
const mass = new Map()
for (const { text } of atoms.values()) {
  for (const m of stripCode(text).matchAll(LINK_RE)) {
    const w = norm(m[1].split('/').pop())
    mass.set(w, (mass.get(w) || 0) + 1)
  }
}
const orphans = [...atoms.keys()].filter((k) => !(mass.get(k) > 0))

// ── computable target: highest-mass atom whose text mentions the orphan word ──
const proposals = []
let isolated = 0
for (const o of orphans) {
  const { leaf: orphanLeaf } = atoms.get(o)
  let best = null
  let bestMass = -1
  for (const [k, { leaf, text }] of atoms) {
    if (k === o) continue
    // whole-word mention of the orphan in the target's prose (code stripped)
    const words = new Set(stripCode(text).toLowerCase().match(WORD_RE) || [])
    if (!words.has(orphanLeaf.toLowerCase()) && !words.has(o)) continue
    const m = mass.get(k) || 0
    if (m > bestMass) {
      bestMass = m
      best = leaf
    }
  }
  if (best) {
    proposals.push({ orphan: orphanLeaf, target: best, reason: `co-occurrence: ${best} mentions ${orphanLeaf} (mass ${bestMass})` })
  } else {
    isolated++
  }
}

if (process.argv.includes('--json')) {
  process.stdout.write(JSON.stringify({ proposals }, null, 2) + '\n')
} else {
  const OUT = join(ROOT, 'aura', '.proposals.json')
  writeFileSync(OUT, JSON.stringify({ proposals }, null, 2))
  console.log(`aura/propose: ${atoms.size} atoms · ${orphans.length} orphans`)
  console.log(`  ${proposals.length} computable (co-occurrence target found) · ${isolated} isolated (no atom mentions them — stay orphan)`)
  console.log(`  wrote ${OUT}`)
  console.log('  sample:')
  for (const p of proposals.slice(0, 12)) console.log(`    [[${p.orphan}]] ← ${p.target}`)
  console.log(`\n  apply: node src/aura/weave.mjs ${OUT}`)
}
