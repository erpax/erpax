/**
 * convention/sourced — THE CONVENTION: every atom CITES its `@standard`. An atom (a folder that
 * carries a `SKILL.md`) is sourced when an `@standard <id> …` line names the external standard it
 * realises — schema.org, an ISO/IEC code, a W3C spec, a national regulation. The marker may sit in
 * the `SKILL.md` body OR in the sibling `index.ts` JSDoc (both are the atom's public face). An atom
 * with no `@standard` anywhere is grounded in nothing but itself — the unsourced gap, the convention
 * unmet — and it is exactly that gap which lowers tamper-[[cost]]: a citation borrows the external
 * standard's mass, so forging the atom now means forging the standard too.
 *
 *   coverage = sourced / total
 *     total   = atoms (a committed SKILL.md) in the SEALED tree
 *     sourced = those whose SKILL.md OR sibling index.ts carries an `@standard` marker
 *
 * REGROUNDED ([[grounded]]): this reads the SEALED committed tree (git HEAD, SHA-addressed), never
 * `process.cwd()`/`readFileSync` over the mutable working tree. The atom list comes from the sealed
 * path index ([[grounded]] `sealedPaths`); the `@standard` presence from ONE `git grep` over HEAD —
 * one sealed query, reused, not a per-file re-derivation. `sourced` obeys the trust law it feeds: a
 * coverage priced on sealed content, so a tampered atom that drops its citation drops the coverage.
 *
 *   tsx src/convention/sourced/index.ts    # prints total / sourced / coverage from the sealed tree
 *
 * @standard schema.org — the type vocabulary, collided to single words
 * @see @/grounded (sealed primitives) · @/convention/honest · @/standards · @/cost · @/law · ./SKILL.md
 */
import { execFileSync } from 'node:child_process'
import { dirname, join } from 'node:path'

import { sealedAtomDirs, sealedRead } from '@/grounded'

const SRC = 'src'

/** The `@standard <id> …` marker — a JSDoc/prose tag that names the external standard the atom cites. */
export const STANDARD_RE = /@standard\b/


/** Files (SKILL.md / index.ts) that carry an `@standard` marker in the SEALED tree — one git query. */
function sealedStandardFiles(): ReadonlySet<string> {
  try {
    const out = execFileSync(
      'git',
      ['grep', '-l', '-e', '@standard', 'HEAD', '--', SRC, ':(exclude,glob)src/**/*.d.ts'],
      { encoding: 'utf8', maxBuffer: 1 << 28, stdio: ['ignore', 'pipe', 'ignore'] },
    )
    return new Set(out.split('\n').filter((l) => l.length > 0).map((l) => l.replace(/^HEAD:/, '')))
  } catch (err) {
    if ((err as { status?: number }).status === 1) return new Set()
    throw err
  }
}

/** Every atom that carries a SKILL.md in the sealed tree. */
export function total(): number {
  return sealedAtomDirs().length
}

/** An atom is SOURCED iff its SKILL.md OR sibling index.ts (sealed) cites `@standard`. */
export const isSourced = (skillPath: string): boolean =>
  STANDARD_RE.test(sealedRead(skillPath)) || STANDARD_RE.test(sealedRead(join(dirname(skillPath), 'index.ts')))

/** The atoms that cite their `@standard` — the sourced ones (one sealed git query). */
export function sourced(): number {
  const withStd = sealedStandardFiles()
  return sealedAtomDirs().filter((d) => withStd.has(d + '/SKILL.md') || withStd.has(d + '/index.ts')).length
}

/** Sealed sourced-citation coverage: sourced / total ∈ [0,1]; 1 ⟺ every atom cites an `@standard`. */
export function coverage(): number {
  const atoms = sealedAtomDirs()
  if (atoms.length === 0) return 1
  const withStd = sealedStandardFiles()
  return atoms.filter((d) => withStd.has(d + '/SKILL.md') || withStd.has(d + '/index.ts')).length / atoms.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('convention/sourced: total=' + total() + ' sourced=' + sourced() + ' coverage=' + coverage())
}

/** @index-cross.foldback child=convention/sourced parent=convention — this cross folds back into its parent. */
