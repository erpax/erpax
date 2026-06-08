---
name: cache
description: "Use when caching by content — the content is its own key (its content-uuid), so the same content is always a hit and a changed input is auto-invalidated; dedup by design with no stale-cache bug."
atomPath: quantum/cache
coordinate: quantum/cache · 2/share · aa79b07d
contentUuid: "096af389-dd0b-5523-9e16-a15f6a0ba750"
diamondUuid: "f72e4494-b3df-8952-ada8-3881df849d91"
uuid: "aa79b07d-a79f-8f58-909e-79806285b34b"
horo: 2
bonds:
  in:
    - artery
    - bindings
    - cache
    - diamond
    - holographic
    - law
    - optimize
    - pwa
    - quantum
    - queries
    - redirects
    - request
  out:
    - artery
    - bindings
    - cache
    - diamond
    - holographic
    - law
    - optimize
    - pwa
    - queries
    - redirects
    - request
typography:
  partition: quantum
  bondDegree: 42
  neighbors: []
standards:
  - "RFC 9562 §5.8 content-uuid (the cache key)"
bindings: []
neighbors:
  wikilink:
    - cache
    - law
    - merge
    - pwa
    - quantum
    - uuid
  matrix:
    - artery
    - bindings
    - cache
    - diamond
    - holographic
    - law
    - optimize
    - pwa
    - queries
    - redirects
    - request
  backlinks:
    - artery
    - bindings
    - cache
    - diamond
    - holographic
    - law
    - optimize
    - pwa
    - queries
    - redirects
    - request
signatures:
  computationUuid: "c0284022-de21-8e5a-a4ae-f10d4ddd9b3f"
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
      stageUuid: "6c564496-c581-8de8-a9a4-384eacd0d8ff"
    - stage: seal
      stageUuid: "abccbfd8-710b-8146-8454-7275d7eb382c"
    - stage: uuid
      stageUuid: "9717a4ae-b58c-8376-a869-d98a3d4497a6"
quantum:
  superposition:
    - artery
    - bindings
    - cache
    - diamond
    - holographic
    - law
    - optimize
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
    computationUuid: "c0284022-de21-8e5a-a4ae-f10d4ddd9b3f"
    contentUuid: "096af389-dd0b-5523-9e16-a15f6a0ba750"
version: 2
---
# quantum/cache — the content-addressed cache

The quantum facet of [[cache]]: the content **is its own key** (its content-[[uuid]]). So the same content is **always a hit**, and a changed input is simply a different key — **auto-invalidation, no stale-cache bug**. Dedup by design ([[merge]]); the same property the [[pwa]] uses for offline assets and [[quantum]]/sql for queries. Merges into [[cache]].

Matter-twin: `src/quantum/cache/index.ts` (`key` · `sameKey`). Composes [[cache]] · [[quantum]] · [[uuid]] · [[merge]].

**Law — [[law]]: identity of content is identity of key — `sameKey(a,b)` is true exactly when `a` and `b` are the same content, because the key is nothing but the content's own uuid; therefore a hit can only ever return the very content asked for, and a changed input is necessarily a different key, so a stale hit is not a bug to guard against but an outcome the addressing makes impossible.**

@standard RFC 9562 §5.8 content-uuid (the cache key)

<sub>content-uuid `096af389-dd0b-5523-9e16-a15f6a0ba750` · account `quantum/cache` · `pnpm skill:upgrade` · `pnpm computed:check`</sub>
