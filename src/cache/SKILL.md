---
name: cache
description: "Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis)."
atomPath: cache
coordinate: "cache · 5/round · 56a838b5"
contentUuid: "b6a7248c-2643-5261-a46f-ad3c6ce1f29a"
diamondUuid: "be089ed1-2053-8f2a-8702-9191228236fe"
uuid: "56a838b5-dd55-8fe0-9352-3470eeff9fd6"
horo: 5
typography:
  partition: cache
  bondDegree: 49
standards: []
bindings: []
signatures:
  computationUuid: "ce5e3603-d098-841b-bbef-44e982caea01"
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
      stageUuid: "6a4c532a-8655-8b47-ada3-3706c9d0c41a"
    - stage: seal
      stageUuid: "efa332ed-0488-85f2-8e0e-72f0cb96efd8"
    - stage: uuid
      stageUuid: "5ec07202-6e6a-86dd-baa7-03b357ac2b66"
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
