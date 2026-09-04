import { existsSync } from 'node:fs'
import { join } from 'node:path'
/**
 * law/folder/constants — folder-shape bindings (no CORPUS imports).

 * Node builtins only. The constraint that matters is that this module cannot participate in an
 * init cycle ([[rules]]/cycle), and `node:fs`/`node:path` are fully initialised before the corpus
 * graph is entered.
 *
 * Leaf regexes and trinity manifest — avoids init cycle through seal · readme · pivot.
 */

/** The required core of every CODE atom — present ⇒ the folder is a unit, not a word. */
export const TRINITY = ['SKILL.md', 'index.ts', 'test.ts'] as const

/**
 * A React atom spells its barrel and its proof with an `x`, and the law is about the BARREL, not
 * the spelling — `@/atom` resolves to `index.tsx` exactly as it resolves to `index.ts`.
 *
 * Reading `index.ts` literally made the law blind in both directions at once: it flagged 6 atoms
 * that HAD a barrel for lacking the `.ts` spelling, and it did not see 29 that had no trinity at
 * all, because a `.tsx`-only folder never matched CODE_MARKERS and so was never judged. The false
 * negative is the worse half — those 29 were not passing the law, they were outside it.
 */
export const TRINITY_ALTERNATES: Readonly<Record<string, readonly string[]>> = {
  'index.ts': ['index.tsx'],
  'test.ts': ['test.tsx'],
}

/** A folder is a CODE atom (so the trinity is required) iff it holds matter or its proof. */
export const CODE_MARKERS = ['index.ts', 'test.ts', 'index.tsx', 'test.tsx'] as const

/** One generic lowercase word — the only legal atom-folder name. */
export const ONE_WORD = /^[a-z][a-z0-9]*$/

/** Lowercase letters and digits only — atom folder segments and file stems (before extension). */
export const ALPHANUMERIC_NAME = /^[a-z0-9]+$/

/**
 * Is a trinity leg present in this directory, under EITHER lawful spelling?
 *
 * A React atom's barrel is `index.tsx` and its proof `test.tsx` — JSX does not parse from a `.ts`
 * file, so those are not stylistic variants, they are the only spellings such an atom can have.
 * Asking `existsSync(join(dir, 'index.ts'))` therefore answers "does this atom have code" with NO
 * for every atom that renders ([[rules]]/probe). Four gates carried that bug at once.
 */
export function trinityPresent(dir: string, leg: 'index.ts' | 'test.ts' | 'SKILL.md'): boolean {
  for (const name of [leg, ...(TRINITY_ALTERNATES[leg] ?? [])]) {
    if (existsSync(join(dir, name))) return true
  }
  return false
}
