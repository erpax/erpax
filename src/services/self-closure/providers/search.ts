/**
 * InternalSearchProvider — ERPax searches its own collections.
 *
 * Slice JJJJJJJJJ-cut3 (2026-05-11). Composes Slice KKKKKKKKK Cut 1:
 * when external search indexes (Algolia / Typesense / Elasticsearch)
 * are unreachable, multi-search routes the query through Payload's
 * own `find` across every collection registered in
 * `SEARCHABLE_FIELDS`.
 *
 * The user's framing: "all falling back at itself leads to erpax
 * itself" applied to search. ERPax always knows what it stores;
 * indexing externally is an optimisation, not a correctness
 * requirement. When the optimisation layer fails, the substrate
 * itself answers.
 *
 * Composition:
 *   - search infrastructure → `@/services/multi-search` (Slice KKKKKKKKK)
 *   - fallback wrapper       → `withInternalFallback({ role: 'search-index' })`
 *
 * The result shape is what most external search SDKs return: a flat
 * hit array + counts. Callers branching on `via: 'external' | 'internal'`
 * can show a "results may be slightly stale" banner in internal mode
 * since the external index is what powers fuzzy / synonym / typo
 * tolerance; internal mode is exact-substring.
 *
 * @standard ISO/IEC 25010:2023 §5.6 reliability
 * @audit Conservation Law 53 self-referential-closure (search-index role)
 * @feature self_closure
 * @see ../../multi-search/index.ts (multiSearch)
 */

import type { InternalProvider, FallbackContext } from '@/services/self-closure/types'
import { registerInternalProvider } from '@/services/self-closure'
import type { MultiSearchHit, MultiSearchResult } from '@/services/multi-search'

export interface SearchParams {
  readonly query: string
  readonly collections?: ReadonlyArray<string>
  readonly perCollection?: number
}

export interface SearchResult {
  readonly query: string
  readonly hits: ReadonlyArray<MultiSearchHit>
  readonly collectionsHit: number
  readonly totalHits: number
  readonly elapsedMs: number
  readonly mode: 'internal-exact-substring'
}

export const InternalSearchProvider: InternalProvider<SearchParams, SearchResult> = {
  role: 'search-index',
  id: 'erpax-self-search',
  description:
    'ERPax acts as its own search index. When external search is unreachable, route the query through Payload `find` across every admin-visible collection, matching its text fields derived from the live schema (the same content the content-uuid hashes). Exact-substring match per field; tenant-scoped. The substrate always knows what it stores — external indexes are an optimisation, never a correctness dependency.',
  standards: [
    'ISO/IEC-25010:2023-§5.6',
  ],

  async invoke(params: SearchParams, ctx: FallbackContext): Promise<SearchResult> {
    const { multiSearch } = await import('@/services/multi-search')
    const result: MultiSearchResult = await multiSearch(
      params.query,
      { payload: ctx.payload, tenantId: ctx.tenantId },
      {
        collections: params.collections,
        perCollection: params.perCollection,
      },
    )
    return {
      query: result.query,
      hits: result.hits,
      collectionsHit: result.stats.collectionsHit,
      totalHits: result.stats.totalHits,
      elapsedMs: result.stats.elapsedMs,
      mode: 'internal-exact-substring',
    }
  },
}

registerInternalProvider(InternalSearchProvider)
