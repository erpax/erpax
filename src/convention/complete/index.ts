/**
 * convention/complete — the TRINITY-COMPLETENESS convention as a computed, self-measuring atom.
 *
 * THE LAW: an atom is the trinity {SKILL.md, index.ts, test.ts} — the antimatter (SKILL.md),
 * the matter (index.ts), and the proof (test.ts) ([[trinity]]). This atom reports one coverage:
 *
 *   coverage = complete / total
 *     total    = atoms (a committed SKILL.md) in the SEALED tree
 *     complete = those whose dir ALSO carries index.ts AND test.ts (the matter-twin + its proof)
 *
 * REGROUNDED ([[grounded]]): existence is read from the SEALED path index (git HEAD, SHA-addressed)
 * via [[grounded]] `sealedPaths` — ONE query, reused — never `existsSync` over the mutable
 * `process.cwd()` tree. So the completeness coverage is priced on sealed content: a trinity that is
 * not committed does not count, which is the honest state (uncommitted matter is not sealed matter).
 *
 * Pure math, no default: total > 0 by architecture (the corpus is non-empty), complete is a subset
 * count, so coverage ∈ [0,1] by construction. coverage → 1 ⟺ every SKILL.md atom is a full trinity.
 *
 *   tsx src/convention/complete/index.ts   # prints total / complete / coverage from the sealed tree
 *
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/grounded (sealed primitives) · @/convention/dry · @/trinity · ./SKILL.md
 */
import { dirname, join } from 'node:path'

import { sealedPaths } from '@/grounded'

const SRC = 'src'

/** Committed SKILL.md atom directories in the SEALED tree. */
function sealedAtomDirs(): string[] {
  const dirs: string[] = []
  for (const p of sealedPaths()) if (p.startsWith(SRC + '/') && p.endsWith('/SKILL.md')) dirs.push(dirname(p))
  return dirs
}

/** Every atom that has a SKILL.md in the sealed tree. */
export function total(): number {
  return sealedAtomDirs().length
}

/** A SKILL.md atom is COMPLETE iff its dir also carries the matter-twin (index.ts) and its proof (test.ts). */
export const isComplete = (skillPath: string): boolean => {
  const dir = dirname(skillPath)
  return sealedPaths().has(join(dir, 'index.ts')) && sealedPaths().has(join(dir, 'test.ts'))
}

/** The atoms that are full trinities — SKILL.md ∧ index.ts ∧ test.ts (sealed). */
export function complete(): number {
  return sealedAtomDirs().filter((d) => isComplete(join(d, 'SKILL.md'))).length
}

/** Sealed trinity-completeness coverage: complete / total ∈ [0,1]; 1 ⟺ every SKILL.md atom is a full trinity. */
export function coverage(): number {
  const atoms = sealedAtomDirs()
  if (atoms.length === 0) return 1
  return atoms.filter((d) => isComplete(join(d, 'SKILL.md'))).length / atoms.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convention/complete: total=' + total() + ' complete=' + complete() + ' coverage=' + coverage())
}
