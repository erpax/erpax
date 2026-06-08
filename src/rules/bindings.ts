/** Trinity + co-located slots — the only `.ts` stems allowed at a code atom root (tightened). */
export const ROOT_TS_ALLOWED = new Set([
  'index.ts',
  'test.ts',
  'translations.ts',
  'seed.ts',
])

const LEGACY_COA_STEM = ['path', 'coa'].join('-')
const LEGACY_CORPUS_STEM = ['self', 'corpus'].join('-')

/** Compliant one-word child nests under accounting (no global lattice words as intermediates). */
export const ACCOUNTING_NEST_MAP: Readonly<Record<string, string>> = {
  [`${LEGACY_COA_STEM}.ts`]: 'coa',
  [`${LEGACY_COA_STEM}.test.ts`]: 'coa',
  [`${LEGACY_CORPUS_STEM}.ts`]: 'corpus',
  [`${LEGACY_CORPUS_STEM}.test.ts`]: 'corpus',
  [`${LEGACY_CORPUS_STEM}.constants.ts`]: 'corpus',
}

/** Global lattice words — forbidden as intermediate folders under any domain atom. */
export const FORBIDDEN_INTERMEDIATE_SEGMENTS = new Set(['path', 'self'])
