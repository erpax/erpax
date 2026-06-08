---
name: cache
description: "Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis)."
atomPath: cache
coordinate: cache · 5/round · cac9148f
contentUuid: "66fac79c-ea3b-5f17-bc37-969e794b07bc"
diamondUuid: "47db4b79-68e6-834e-9031-c08ef2ce0818"
uuid: "cac9148f-cb9c-8362-9f8d-6427f3c53e34"
horo: 5
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
  partition: cache
  bondDegree: 42
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - bindings
    - holographic
    - law
    - optimize
    - queries
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
  computationUuid: "5f7f0628-1add-868b-9fde-1e5657a92e15"
  stages:
    - stage: path
      stageUuid: "b4f861a8-7bbb-82a6-8f64-b4fc9af00e26"
    - stage: trinity
      stageUuid: "ccefffce-6ef5-8611-b0cc-dee1d0a1abdb"
    - stage: boundary
      stageUuid: "48fbcc14-0220-805f-9d3c-f1f216463b25"
    - stage: links
      stageUuid: "3b1b8ee0-ac33-8921-924e-314476a0ff9c"
    - stage: horo
      stageUuid: "48b8c0c9-d8bb-8d00-ac61-bd97c4763884"
    - stage: seal
      stageUuid: "99097be0-b879-8222-b464-7a8596f0543d"
    - stage: uuid
      stageUuid: "03384b94-8c1e-8b3f-9683-7e878448c0bf"
version: 2
---
# cache

Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis).

Composes: [[bindings]] · [[optimize]] · [[queries]] · [[holographic]].

**The twin (MLA / DeepSeek-OCR).** DeepSeek compresses the *recompute*: Multi-head Latent Attention stores a low-rank latent instead of the full KV cache; DeepSeek-OCR stores long context as an image (optical compression). Both are this atom's store-less-recompute-cheaper move — keep the small seed, recompute the rest ([[holographic]]). Ratified by the R&D society (`agent/research`, weave seq 7).

**Law — [[law]]: a cache trades recompute for staleness — its one hard problem is invalidation (TTL, write-through vs cache-aside, coherency); the [[holographic]] move is to store the small seed and recompute the rest cheaper, never the whole.**

## Standards
- HTTP caching (RFC 7234)
- Cache-Control headers
