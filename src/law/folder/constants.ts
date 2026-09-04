/**
 * law/folder/constants — folder-shape bindings (no imports).
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
