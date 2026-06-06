---
name: query
description: Use when caching or deduping queries by identity — a normalized query string hashes to a content-uuid, so the same query shares one identity and a change invalidates by content-address.
---

# quantum/query — a query as a content-uuid

The quantum facet of [[query]]: a normalized query string hashes to a content-[[uuid]], so the same query (whitespace/case folded) shares **one identity** — a cache key / [[merge]] — and any change yields a new uuid (cache invalidation by content-address). The generic counterpart of [[quantum]]/sql. Merges into [[query]].

Matter-twin: `src/quantum/query/index.ts` (`queryUuid` · `sameQuery`). Composes [[query]] · [[quantum]] · [[uuid]] · [[merge]].

@standard RFC 9562 §5.8 content-uuid (the query cache key)
