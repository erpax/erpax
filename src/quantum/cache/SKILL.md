---
name: cache
description: Use when caching by content — the content is its own key (its content-uuid), so the same content is always a hit and a changed input is auto-invalidated; dedup by design with no stale-cache bug.
---

# quantum/cache — the content-addressed cache

The quantum facet of [[cache]]: the content **is its own key** (its content-[[uuid]]). So the same content is **always a hit**, and a changed input is simply a different key — **auto-invalidation, no stale-cache bug**. Dedup by design ([[merge]]); the same property the [[pwa]] uses for offline assets and [[quantum]]/sql for queries. Merges into [[cache]].

Matter-twin: `src/quantum/cache/index.ts` (`key` · `sameKey`). Composes [[cache]] · [[quantum]] · [[uuid]] · [[merge]].

@standard RFC 9562 §5.8 content-uuid (the cache key)
