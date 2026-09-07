---
name: cache
description: "Use when caching by content — the content is its own key (its content-uuid), so the same content is always a hit and a changed input is auto-invalidated; dedup by design with no stale-cache bug."
atomPath: "quantum/cache"
coordinate: "quantum/cache · 7/descent · f24fe1c0"
contentUuid: "ed6837d4-96c8-5e55-a1f7-2fb668bad2dc"
diamondUuid: "344de3c7-94a9-8860-b106-d1c8dea4a261"
uuid: "f24fe1c0-3ca5-850d-a90d-8d3c500a5937"
horo: 7
typography:
  partition: quantum
  bondDegree: 49
standards:
  - "RFC 9562 §5.8 content-uuid (the cache key)"
bindings: []
signatures:
  computationUuid: "84dc7473-8598-8369-ac77-d673b9e64413"
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
      stageUuid: "eb3077ae-bba9-8360-acc2-69488f22160e"
    - stage: seal
      stageUuid: "abccbfd8-710b-8146-8454-7275d7eb382c"
    - stage: uuid
      stageUuid: "16ad5d16-057a-8d15-a136-895518737e34"
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
    computationUuid: "84dc7473-8598-8369-ac77-d673b9e64413"
    contentUuid: "ed6837d4-96c8-5e55-a1f7-2fb668bad2dc"
version: 2
---
# quantum/cache — the content-addressed cache

The quantum facet of [[cache]]: the content **is its own key** (its content-[[uuid]]). So the same content is **always a hit**, and a changed input is simply a different key — **auto-invalidation, no stale-cache bug**. Dedup by design ([[merge]]); the same property the [[pwa]] uses for offline assets and [[quantum]]/sql for queries. Merges into [[cache]].

Matter-twin: `src/quantum/cache/index.ts` (`key` · `sameKey`). Composes [[cache]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: identity of content is identity of key — `sameKey(a,b)` is true exactly when `a` and `b` are the same content, because the key is nothing but the content's own uuid; therefore a hit can only ever return the very content asked for, and a changed input is necessarily a different key, so a stale hit is not a bug to guard against but an outcome the addressing makes impossible.**

@standard RFC 9562 §5.8 content-uuid (the cache key)

<sub>content-uuid `ed6837d4-96c8-5e55-a1f7-2fb668bad2dc` · account `quantum/cache` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
