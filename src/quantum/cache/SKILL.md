---
name: cache
description: "Use when caching by content — the content is its own key (its content-uuid), so the same content is always a hit and a changed input is auto-invalidated; dedup by design with no stale-cache bug."
atomPath: "quantum/cache"
coordinate: "quantum/cache · 5/round · 81aa7e22"
contentUuid: "5810a184-cf73-5652-81a8-934a4d2d5827"
diamondUuid: "072f28cb-e9d1-8064-bb53-d2cede2df65b"
uuid: "81aa7e22-c335-88e7-be7f-ddcdcedfb847"
horo: 5
typography:
  partition: quantum
  bondDegree: 51
standards:
  - "RFC 9562 §5.8 content-uuid (the cache key)"
bindings: []
signatures:
  computationUuid: "5ba5b690-8a08-8a6d-946f-14205e86286c"
  stages:
    - stage: path
      stageUuid: "50d48c49-a49d-8bc0-86b4-617a429e2d87"
    - stage: trinity
      stageUuid: "a609e039-6b89-8226-9e5d-8355f159485e"
    - stage: boundary
      stageUuid: "d645cd90-3faf-8028-b6cf-600802651557"
    - stage: links
      stageUuid: "93df9750-1f4c-8c07-81a5-1d8450858663"
    - stage: horo
      stageUuid: "c23d25ef-74e2-8451-b81b-ef134ca02c71"
    - stage: seal
      stageUuid: "abccbfd8-710b-8146-8454-7275d7eb382c"
    - stage: uuid
      stageUuid: "12e9ecb1-b432-8410-9796-ab2005fd3187"
quantum:
  superposition:
    - artery
    - bindings
    - cache
    - diamond
    - fingerprint
    - holographic
    - law
    - optimize
    - superposition
  collapse:
    - "RFC 9562 §5.8 content-uuid (the cache key)"
    - "Use when caching by content — the content is its own key (its content-uuid), so the same content is always a hit and a changed input is auto-invalidated; dedup by design with no stale-cache bug."
    - "identity of content is identity of key — `sameKey(a,b)` is true exactly when `a` and `b` are the same content, because the key is nothing but the content's own uuid; therefore a hit can only ever return the very content asked for, and a changed input is necessarily a different key, so a stale hit is not a bug to guard against but an outcome the addressing makes impossible."
    - "matter-twin:src/quantum/cache/index.ts"
  seal:
    sandbox: false
    receipt: false
    pathFollow: true
    canonicalRecord: true
    analogResults: false
    speechResults: false
    computationUuid: "5ba5b690-8a08-8a6d-946f-14205e86286c"
    contentUuid: "5810a184-cf73-5652-81a8-934a4d2d5827"
version: 2
---
# quantum/cache — the content-addressed cache

The quantum facet of [[cache]]: the content **is its own key** (its content-[[uuid]]). So the same content is **always a hit**, and a changed input is simply a different key — **auto-invalidation, no stale-cache bug**. Dedup by design ([[merge]]); the same property the [[pwa]] uses for offline assets and [[quantum]]/sql for queries. Merges into [[cache]].

Matter-twin: `src/quantum/cache/index.ts` (`key` · `sameKey`). Composes [[cache]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: identity of content is identity of key — `sameKey(a,b)` is true exactly when `a` and `b` are the same content, because the key is nothing but the content's own uuid; therefore a hit can only ever return the very content asked for, and a changed input is necessarily a different key, so a stale hit is not a bug to guard against but an outcome the addressing makes impossible.**

@standard RFC 9562 §5.8 content-uuid (the cache key)

<sub>content-uuid `5810a184-cf73-5652-81a8-934a4d2d5827` · account `quantum/cache` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
