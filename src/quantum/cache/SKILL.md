---
name: cache
description: "Use when caching by content — the content is its own key (its content-uuid), so the same content is always a hit and a changed input is auto-invalidated; dedup by design with no stale-cache bug."
atomPath: "quantum/cache"
coordinate: "quantum/cache · 2/share · c575fb0d"
contentUuid: "83d3be81-4c14-54ba-b43f-4ffd6665a886"
diamondUuid: "739e4857-6314-808b-b7c5-fb2023dd794b"
uuid: "c575fb0d-2dd3-8854-9c22-86d9b09cc456"
horo: 2
typography:
  partition: quantum
  bondDegree: 51
standards:
  - "RFC 9562 §5.8 content-uuid (the cache key)"
bindings: []
signatures:
  computationUuid: "638a1a1f-ac91-8189-b931-cbcb173bfa9a"
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
      stageUuid: "66ab875e-6570-8a36-8780-edf67ad9a747"
    - stage: seal
      stageUuid: "abccbfd8-710b-8146-8454-7275d7eb382c"
    - stage: uuid
      stageUuid: "ff3e484b-f069-874b-9453-e1291539d269"
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
    computationUuid: "638a1a1f-ac91-8189-b931-cbcb173bfa9a"
    contentUuid: "83d3be81-4c14-54ba-b43f-4ffd6665a886"
version: 2
---
# quantum/cache — the content-addressed cache

The quantum facet of [[cache]]: the content **is its own key** (its content-[[uuid]]). So the same content is **always a hit**, and a changed input is simply a different key — **auto-invalidation, no stale-cache bug**. Dedup by design ([[merge]]); the same property the [[pwa]] uses for offline assets and [[quantum]]/sql for queries. Merges into [[cache]].

Matter-twin: `src/quantum/cache/index.ts` (`key` · `sameKey`). Composes [[cache]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: identity of content is identity of key — `sameKey(a,b)` is true exactly when `a` and `b` are the same content, because the key is nothing but the content's own uuid; therefore a hit can only ever return the very content asked for, and a changed input is necessarily a different key, so a stale hit is not a bug to guard against but an outcome the addressing makes impossible.**

@standard RFC 9562 §5.8 content-uuid (the cache key)

<sub>content-uuid `83d3be81-4c14-54ba-b43f-4ffd6665a886` · account `quantum/cache` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
