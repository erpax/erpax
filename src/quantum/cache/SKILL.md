---
name: cache
description: "Use when caching by content — the content is its own key (its content-uuid), so the same content is always a hit and a changed input is auto-invalidated; dedup by design with no stale-cache bug."
atomPath: "quantum/cache"
coordinate: "quantum/cache · 7/descent · ae52a2ff"
contentUuid: "1958b34f-5a78-5ea0-8d13-f68088b5ff1d"
diamondUuid: "91bba9e6-707d-840d-9268-2b02092ba176"
uuid: "ae52a2ff-dee3-8fe8-b217-869e63cab702"
horo: 7
typography:
  partition: quantum
  bondDegree: 45
standards:
  - "RFC 9562 §5.8 content-uuid (the cache key)"
bindings: []
signatures:
  computationUuid: "8faea4bf-d35a-8732-8948-200e5f178d9a"
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
      stageUuid: "898df1a7-af6c-8fe4-bf9d-59dd96ccb1c4"
    - stage: seal
      stageUuid: "abccbfd8-710b-8146-8454-7275d7eb382c"
    - stage: uuid
      stageUuid: "ca22af31-d0ba-82d8-83ee-0fb0bdc84991"
quantum:
  superposition:
    - artery
    - bindings
    - cache
    - diamond
    - fingerprint
    - gaps
    - law
    - pwa
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
    computationUuid: "8faea4bf-d35a-8732-8948-200e5f178d9a"
    contentUuid: "1958b34f-5a78-5ea0-8d13-f68088b5ff1d"
version: 2
---
# quantum/cache — the content-addressed cache

The quantum facet of [[cache]]: the content **is its own key** (its content-[[uuid]]). So the same content is **always a hit**, and a changed input is simply a different key — **auto-invalidation, no stale-cache bug**. Dedup by design ([[merge]]); the same property the [[pwa]] uses for offline assets and [[quantum]]/sql for queries. Merges into [[cache]].

Matter-twin: `src/quantum/cache/index.ts` (`key` · `sameKey`). Composes [[cache]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: identity of content is identity of key — `sameKey(a,b)` is true exactly when `a` and `b` are the same content, because the key is nothing but the content's own uuid; therefore a hit can only ever return the very content asked for, and a changed input is necessarily a different key, so a stale hit is not a bug to guard against but an outcome the addressing makes impossible.**

@standard RFC 9562 §5.8 content-uuid (the cache key)

<sub>content-uuid `1958b34f-5a78-5ea0-8d13-f68088b5ff1d` · account `quantum/cache` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
