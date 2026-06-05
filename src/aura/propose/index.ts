/**
 * aura/propose -- COMPUTE the weave proposals. No training, all computable.
 *
 * weave.mjs applies {orphan, target, reason} proposals; this computes them
 * deterministically from the corpus, so harmonising needs no trained agent and
 * cannot hallucinate: for each ORPHAN (atom nothing links to), the target is the
 * highest-MASS atom whose SKILL.md text actually MENTIONS the orphan word -- a
 * TRUE relation, never invented. An orphan no atom mentions stays orphan.
 *
 * The resolver (norm = lowercase, strip [-_]; skip symlinks) is the SAME one
 * aura/scan, collide and weave use.
 *
 *   tsx src/aura/propose/index.ts            print summary + write .proposals.json
 *   tsx src/aura/propose/index.ts --json     print the proposals JSON to stdout
 *
 * @audit no link invented -- every proposal is a co-occurrence (target text contains orphan)
 * @see ../weave (applies) -- ../scan (the gap) -- ../../uuid/matrix (mass = backlinks)
 */
import { readdirSync, readFileSync, writeFileSync, lstatSync } from 'node:fs'
import { join, basename, dirname } from 'node:path'

const ROOT = join(process.cwd(), 'src')
const norm = (s: string): string => String(s).toLowerCase().replace(/[-_]/g, '')
const stripCode = (t: string): string => t.replace(/```[\s\S]*?```/g, ' ').replace(/`[^`]*`/g, ' ')
const LINK_RE = /\[\[([A-Za-z][A-Za-z0-9/-]*)(?:\|[^\]]*)?\]\]/g
const WORD_RE = /[a-z][a-z0-9]*/g

const isRealDir = (p: string): boolean => {
  try {
    const s = lstatSync(p)
    return s.isDirectory() && !s.isSymbolicLink()
  } catch {
    return false
  }
}
function walk(dir: string, out: string[] = []): string[] {
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

export interface Proposal {
  readonly orphan: string
  readonly target: string
  readonly reason: string
}

/** Compute the deterministic co-occurrence weave proposals for the orphan atoms. */
export function proposeWeaves(): { proposals: Proposal[]; atoms: number; orphans: number; isolated: number } {
  const atoms = new Map<string, { leaf: string; text: string }>()
  for (const f of walk(ROOT)) {
    const leaf = basename(dirname(f))
    atoms.set(norm(leaf), { leaf, text: readFileSync(f, 'utf8') })
  }
  const mass = new Map<string, number>()
  for (const { text } of atoms.values()) {
    for (const m of stripCode(text).matchAll(LINK_RE)) {
      const w = norm(m[1]!.split('/').pop()!)
      mass.set(w, (mass.get(w) || 0) + 1)
    }
  }
  const orphans = [...atoms.keys()].filter((k) => !((mass.get(k) || 0) > 0))
  const proposals: Proposal[] = []
  let isolated = 0
  for (const o of orphans) {
    const orphanLeaf = atoms.get(o)!.leaf
    let best: string | null = null
    let bestMass = -1
    for (const [k, { leaf, text }] of atoms) {
      if (k === o) continue
      const words = new Set(stripCode(text).toLowerCase().match(WORD_RE) || [])
      if (!words.has(orphanLeaf.toLowerCase()) && !words.has(o)) continue
      const m = mass.get(k) || 0
      if (m > bestMass) {
        bestMass = m
        best = leaf
      }
    }
    if (best) proposals.push({ orphan: orphanLeaf, target: best, reason: 'co-occurrence: ' + best + ' mentions ' + orphanLeaf + ' (mass ' + bestMass + ')' })
    else isolated++
  }
  return { proposals, atoms: atoms.size, orphans: orphans.length, isolated }
}

if (import.meta.url === 'file://' + process.argv[1]) {
  const { proposals, atoms, orphans, isolated } = proposeWeaves()
  if (process.argv.includes('--json')) {
    process.stdout.write(JSON.stringify({ proposals }, null, 2) + '\n')
  } else {
    const OUT = join(ROOT, 'aura', 'propose', '.proposals.json')
    writeFileSync(OUT, JSON.stringify({ proposals }, null, 2))
    console.log('aura/propose: ' + atoms + ' atoms, ' + orphans + ' orphans')
    console.log('  ' + proposals.length + ' computable (co-occurrence target found), ' + isolated + ' isolated (stay orphan)')
    console.log('  wrote ' + OUT)
    for (const p of proposals.slice(0, 12)) console.log('    [[' + p.orphan + ']] <- ' + p.target)
    console.log('  apply: node src/aura/weave.mjs ' + OUT)
  }
}
