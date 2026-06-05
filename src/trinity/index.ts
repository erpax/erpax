/**
 * trinity — the file-trinity law, ENFORCED. Each atom folder holds ONLY the
 * trinity {SKILL.md (antimatter), index.ts (matter), test.ts} — plus the tolerated
 * co-locations seed.ts / index.test.ts / index.tsx. A bare-word or multi-word
 * `.ts`/`.tsx` file (e.g. `search/corpus.ts`, `proof/dry-proof.ts`) is a VIOLATION:
 * it must be folded into `index.ts` or promoted to its own single-word sub-atom
 * `<word>/index.ts` (import-transparent for `@/`-alias + bare relative imports).
 *
 * Computed, not hardcoded — `findViolations` derives the offenders from the live
 * tree, so the gate (./test.ts) drives to green as the single-word migration drains
 * the tail in coordinated batches.
 *
 * @standard the file is architecture — the detail lives in the folder PATH, never the filename
 * @see ./SKILL.md · ./test.ts (the strict gate)
 */

/** Basenames a folder may hold (the trinity + the tolerated co-locations). */
export const TRINITY_FILES: ReadonlySet<string> = new Set([
  'index.ts',
  'index.tsx',
  'index.test.ts',
  'index.test.tsx',
  'test.ts',
  'test.tsx',
  'seed.ts',
])

/** Framework-mandated names exempt from the law (Next router, Payload entry, generated, type decls). */
export const EXEMPT: readonly RegExp[] = [
  /(^|\/)app\//,
  /(^|\/)migrations\//,
  /(^|\/)payload-types\.ts$/,
  /(^|\/)payload\.config[^/]*\.ts$/,
  /(^|\/)middleware[^/]*\.ts$/,
  /\.d\.ts$/,
  /(^|\/)vitest\.[^/]*$/,
]

/** Is this src-relative `.ts`/`.tsx` path a file-trinity violation (a non-trinity, non-exempt filename)? */
export function isViolation(relPath: string): boolean {
  if (!/\.(ts|tsx)$/.test(relPath)) return false
  if (EXEMPT.some((re) => re.test(relPath))) return false
  const base = relPath.slice(relPath.lastIndexOf('/') + 1)
  return !TRINITY_FILES.has(base)
}

/** The violations among a list of src-relative paths, sorted. */
export function findViolations(relPaths: readonly string[]): string[] {
  return relPaths.filter(isViolation).sort()
}
