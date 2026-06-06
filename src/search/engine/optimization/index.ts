/**
 * search/engine/optimization — SEO: making content discoverable by the search engine. Holds the
 * canonical erpax keyword/topic strategy (produced by the README team) + an on-page relevance
 * scorer. Optimizing content for [[search]]/engine ranking — the README and the npm package draw
 * their keywords from here.
 *
 *   tsx src/search/engine/optimization/index.ts
 *
 * @standard schema.org + Open Graph discoverability; on-page keyword coverage
 * @see ../index.ts (the engine) -- ../../../search -- ./SKILL.md
 */

/** The canonical erpax SEO keywords (the README + npm package draw from these). */
export const KEYWORDS = [
  'erp',
  'accounting',
  'double-entry',
  'payload-cms',
  'cloudflare',
  'multi-tenant',
  'content-addressed',
  'tamper-evident',
  'standards-compliance',
  'typescript',
] as const

/** GitHub topics for discoverability. */
export const TOPICS = [
  'payload-cms',
  'cloudflare',
  'erp',
  'accounting',
  'double-entry',
  'multi-tenant',
  'typescript',
  'nextjs',
  'content-addressed',
  'tamper-evident',
] as const

/** On-page relevance ∈ [0,1]: the fraction of keywords present in `text` (a simple SEO signal). */
export const relevance = (text: string, keywords: readonly string[] = KEYWORDS): number => {
  const t = text.toLowerCase()
  return keywords.length === 0 ? 0 : keywords.filter((k) => t.includes(k.toLowerCase())).length / keywords.length
}

if (import.meta.url === 'file://' + process.argv[1]) {
  console.log('search/engine/optimization — ' + KEYWORDS.length + ' keywords, ' + TOPICS.length + ' topics')
  console.log('  relevance("multi-tenant erp accounting in typescript") = ' + relevance('multi-tenant erp accounting in typescript').toFixed(2))
}
