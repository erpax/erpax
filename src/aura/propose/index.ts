/**
 * aura/propose -- COMPUTE the weave proposals. No training, all computable.
 *
 * For each ORPHAN (atom nothing links to), the target is the highest-MASS atom
 * whose SKILL.md text actually MENTIONS the orphan word -- a TRUE relation, never
 * invented. An orphan no atom mentions stays orphan. The walk + resolver are the
 * SHARED ../ (aura) resolver -- no duplicated norm/walk (dry-clean even here).
 *
 *   tsx src/aura/propose/index.ts            print summary + write .proposals.json
 *   tsx src/aura/propose/index.ts --json     print the proposals JSON to stdout
 *
 * @audit no link invented -- every proposal is a co-occurrence the tree witnesses
 * @see ../ (the shared resolver) -- ../weave (applies) -- ../../uuid/matrix (mass)
 */
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { norm, stripCode, LINK_RE, walkSkills, leafOf, readSkill } from '@/aura'

const ROOT = join(process.cwd(), 'src')
const WORD_RE = /[a-z][a-z0-9]*/g

export interface Proposal {
  readonly orphan: string
  readonly target: string
  readonly reason: string
}

/** Compute the deterministic co-occurrence weave proposals for the orphan atoms. */
export function proposeWeaves(): { proposals: Proposal[]; atoms: number; orphans: number; isolated: number } {
  const atoms = new Map<string, { leaf: string; text: string }>()
  for (const f of walkSkills(ROOT)) {
    const leaf = leafOf(f)
    atoms.set(norm(leaf), { leaf, text: readSkill(f) })
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
  }
}
