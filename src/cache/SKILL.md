---
name: cache
description: "Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis)."
atomPath: cache
coordinate: "cache · 1/base · 348b6a28"
contentUuid: "bf75fdb1-afff-5878-80c4-56a194e74d01"
diamondUuid: "c8efc252-d1d6-835a-9305-2570ccd1584a"
uuid: "348b6a28-8930-81f0-b3ab-4ac117f90155"
horo: 1
bonds:
  in:
    - artery
    - bindings
    - cache
    - diamond
    - fingerprint
    - holographic
    - law
    - optimize
    - pwa
    - queries
    - redirects
    - request
    - resonance
  out:
    - artery
    - bindings
    - cache
    - diamond
    - fingerprint
    - holographic
    - law
    - optimize
    - pwa
    - queries
    - redirects
    - request
    - resonance
typography:
  partition: cache
  bondDegree: 46
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
    - fingerprint
    - holographic
    - law
    - optimize
    - pwa
    - queries
    - redirects
    - request
    - resonance
  backlinks:
    - artery
    - bindings
    - cache
    - diamond
    - fingerprint
    - holographic
    - law
    - optimize
    - pwa
    - queries
    - redirects
    - request
    - resonance
signatures:
  computationUuid: "8c7f3bcc-a1bc-81a9-b697-5a9472ca1580"
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
      stageUuid: "70d72045-9e28-8170-97b7-ab76c5985cb4"
    - stage: seal
      stageUuid: "efa332ed-0488-85f2-8e0e-72f0cb96efd8"
    - stage: uuid
      stageUuid: "9b9726c1-b0cb-8e07-8870-eee9df1a5bff"
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
