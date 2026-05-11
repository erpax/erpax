/**
 * Multi-search — one query across every collection.
 *
 * Slice KKKKKKKKK-cut1 (2026-05-11). Per user 'identification and
 * multi search'. Companion to `identification/index.ts`: when the
 * query is NOT a typed identifier, multi-search routes it across all
 * (or a filtered subset of) collections and surfaces results
 * federated and uuid-anchored.
 *
 * The result is a flat array of `MultiSearchHit` rows, each carrying
 * its source collection, content-uuid (when present), short-uuid
 * (when derivable per Slice FFFFFFF), and the matching record. The
 * caller can group / paginate / re-rank.
 *
 * Pluggable search strategies:
 *
 *   - **Internal mode (this module)** — iterates collections, runs
 *     Payload `find` with a tenant-scoped `where` clause that ORs
 *     across the configured text fields per collection. Cheap, no
 *     external dependency, works offline. The InternalSearchProvider
 *     (Slice JJJJJJJJJ Cut 3) wraps this for the `search-index` self-
 *     closure role.
 *
 *   - **External mode (future)** — when a real search index is bound
 *     (Algolia, Typesense, Elasticsearch), the mediator wraps that
 *     call with `withInternalFallback({ role: 'search-index' })` so
 *     the internal mode is the automatic fallback.
 *
 * Per-collection text-field configuration:
 *
 *   For each collection we list a small set of "searchable" fields
 *   (name / title / description / notes / number / code). Free-text
 *   match runs as `like '%q%'` across those fields. Heavy text
 *   collections (long markdown bodies) can opt into FTS via D1
 *   virtual-table indexes — out of scope for Cut 1.
 *
 * @standard ISO/IEC 25010:2023 §5.3 operability (one input → many sources)
 * @standard Schema.org Action — search-action (Slice YYYYYY presents these MCP-callable)
 * @audit Conservation Law 53 self-referential-closure (this is the internal half)
 * @feature multi_search
 * @see ../identification/index.ts (typed-identifier resolution path)
 * @see ../self-closure/providers/search.ts (InternalSearchProvider — wraps this)
 */

import type { Payload } from 'payload'

/**
 * Default searchable-field map. Collections present in this map use
 * the listed fields for free-text match. Collections NOT in the map
 * are skipped (multi-search is opt-in to avoid noise).
 *
 * Add new collections by appending here — the multi-search invariant
 * (future cut) will enforce that every user-facing collection appears.
 */
export const SEARCHABLE_FIELDS: ReadonlyMap<string, ReadonlyArray<string>> = new Map([
  ['invoices',           ['number', 'description', 'customerName']],
  ['payments',           ['number', 'description', 'counterparty']],
  ['journal-entries',    ['description']],
  ['business-chains',    ['chainId', 'description']],
  ['standards',          ['code', 'title', 'jurisdiction']],
  ['translations',       ['translationKey', 'key']],
  ['audit-events',       ['eventName', 'action', 'subjectCollection']],
  ['memories',           ['name', 'description', 'kind']],
  ['mcp-tool-metadata',  ['toolName', 'description', 'area']],
  ['standards-vortex',   ['standardCode', 'title']],
  ['wallets',            ['walletKey', 'description']],
  ['sales-orders',       ['orderNumber', 'description', 'customerName']],
  ['addresses',          ['line1', 'city', 'postalCode']],
  ['notifications',      ['subject', 'body']],
  ['roles',              ['roleSlug', 'description']],
  ['leave-requests',     ['employeeName', 'reason']],
  ['users',              ['email', 'fullName']],
  ['tenants',            ['name', 'slug', 'legalName']],
])

export interface MultiSearchHit {
  readonly collection: string
  readonly id: string
  readonly contentUuid?: string
  readonly matchedField: string
  readonly snippet: string
  /** Full row (depth=0). Caller can re-fetch with depth>0 if needed. */
  readonly row: Record<string, unknown>
}

export interface MultiSearchOptions {
  /** Limit per collection (default 10). Total ≤ collections × perCollection. */
  readonly perCollection?: number
  /** Restrict to specific collections (default: every entry in SEARCHABLE_FIELDS). */
  readonly collections?: ReadonlyArray<string>
  /** Tenant-scope the search (default true; pass false only for platform-wide admin). */
  readonly tenantScoped?: boolean
}

export interface MultiSearchCtx {
  readonly payload: Payload
  readonly tenantId: string
}

export interface MultiSearchResult {
  readonly query: string
  readonly hits: ReadonlyArray<MultiSearchHit>
  readonly stats: {
    readonly collectionsScanned: number
    readonly collectionsHit: number
    readonly totalHits: number
    readonly elapsedMs: number
  }
}

/**
 * Execute a multi-collection search. Internal-mode implementation —
 * iterates each opted-in collection and runs a tenant-scoped `where`
 * filter that ORs across the collection's searchable fields.
 */
export async function multiSearch(
  query: string,
  ctx: MultiSearchCtx,
  opts: MultiSearchOptions = {},
): Promise<MultiSearchResult> {
  const start = Date.now()
  const q = (query ?? '').trim()
  if (q.length === 0) {
    return {
      query: q,
      hits: [],
      stats: { collectionsScanned: 0, collectionsHit: 0, totalHits: 0, elapsedMs: 0 },
    }
  }
  const perCollection = opts.perCollection ?? 10
  const tenantScoped = opts.tenantScoped !== false
  const allCollections = opts.collections ?? [...SEARCHABLE_FIELDS.keys()]

  const hits: MultiSearchHit[] = []
  let collectionsHit = 0
  for (const collection of allCollections) {
    const fields = SEARCHABLE_FIELDS.get(collection)
    if (!fields || fields.length === 0) continue
    // Build an OR-of-LIKE filter across the configured fields.
    const orClauses = fields.map((f) => ({ [f]: { like: q } }))
    const where: Record<string, unknown> = { or: orClauses }
    if (tenantScoped) {
      where.and = [{ tenant: { equals: ctx.tenantId } }, { or: orClauses }]
      delete where.or
    }
    try {
      const res = await ctx.payload.find({
        collection: collection as never,
        where: where as never,
        limit: perCollection,
        depth: 0,
      } as never) as { docs: Array<Record<string, unknown>> }
      if (res.docs.length > 0) {
        collectionsHit += 1
        for (const row of res.docs) {
          const matchedField = fields.find((f) => {
            const v = (row as Record<string, unknown>)[f]
            return typeof v === 'string' && v.toLowerCase().includes(q.toLowerCase())
          }) ?? fields[0]!
          const snippetSource = (row as Record<string, unknown>)[matchedField]
          const snippet = typeof snippetSource === 'string'
            ? extractSnippet(snippetSource, q)
            : `[${matchedField}]`
          hits.push({
            collection,
            id: String((row as { id?: unknown }).id ?? ''),
            contentUuid: typeof (row as { uuid?: unknown }).uuid === 'string'
              ? (row as { uuid: string }).uuid
              : undefined,
            matchedField,
            snippet,
            row,
          })
        }
      }
    } catch {
      /* collection missing or where-clause unsupported — skip silently */
    }
  }
  return {
    query: q,
    hits,
    stats: {
      collectionsScanned: allCollections.length,
      collectionsHit,
      totalHits: hits.length,
      elapsedMs: Date.now() - start,
    },
  }
}

/**
 * Extract a small context window around the first occurrence of `q`
 * in `source`. Bounded length so result payloads stay light. Case-
 * insensitive match; preserves original casing in the snippet.
 */
function extractSnippet(source: string, q: string, windowChars = 80): string {
  const lower = source.toLowerCase()
  const idx = lower.indexOf(q.toLowerCase())
  if (idx === -1) return source.slice(0, windowChars)
  const start = Math.max(0, idx - Math.floor(windowChars / 2))
  const end = Math.min(source.length, start + windowChars)
  const head = start > 0 ? '…' : ''
  const tail = end < source.length ? '…' : ''
  return `${head}${source.slice(start, end)}${tail}`
}
