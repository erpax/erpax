---
name: cache
description: "Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis)."
atomPath: cache
coordinate: "cache · 5/round · 91d8eb57"
contentUuid: "96cd21d1-ddd2-50e0-8595-15e2e83a2e86"
diamondUuid: "e8908aeb-90b4-8ade-9ffd-f3e2e186583c"
uuid: "91d8eb57-e628-8a82-beb3-9933542ae396"
horo: 5
typography:
  partition: cache
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "40548178-cc5d-8a90-aa31-74d364647132"
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
      stageUuid: "bb34ae0d-e269-8c84-bd5b-5647c7e01870"
    - stage: seal
      stageUuid: "efa332ed-0488-85f2-8e0e-72f0cb96efd8"
    - stage: uuid
      stageUuid: "86749521-2351-85b1-b1e6-caed0a5650f5"
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
