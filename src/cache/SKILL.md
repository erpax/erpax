---
name: cache
description: "Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis)."
atomPath: cache
coordinate: "cache · 8/crest · 2080a00f"
contentUuid: "6d2c9749-bc99-52a6-884e-c041970e4ba4"
diamondUuid: "7141d928-7941-806e-96e9-ec3d20018f1a"
uuid: "2080a00f-7602-8387-b562-4c6d0367dde1"
horo: 8
typography:
  partition: cache
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "1dacc5d2-bb72-8d48-a2c9-05f0a964b611"
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
      stageUuid: "07db5d97-1258-8419-8af9-220c59bc4308"
    - stage: seal
      stageUuid: "efa332ed-0488-85f2-8e0e-72f0cb96efd8"
    - stage: uuid
      stageUuid: "404dda1f-1fff-8ad7-aead-b123235a7af9"
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
