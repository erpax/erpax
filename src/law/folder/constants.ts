/**
 * law/folder/constants — folder-shape bindings (no imports).
 *
 * Leaf regexes and trinity manifest — avoids init cycle through seal · readme · pivot.
 */

/** The required core of every CODE atom — present ⇒ the folder is a unit, not a word. */
export const TRINITY = ['SKILL.md', 'index.ts', 'test.ts'] as const

/** A folder is a CODE atom (so the trinity is required) iff it holds matter or its proof. */
export const CODE_MARKERS = ['index.ts', 'test.ts'] as const

/** One generic lowercase word — the only legal atom-folder name. */
export const ONE_WORD = /^[a-z][a-z0-9]*$/

/** Lowercase letters and digits only — atom folder segments and file stems (before extension). */
export const ALPHANUMERIC_NAME = /^[a-z0-9]+$/
