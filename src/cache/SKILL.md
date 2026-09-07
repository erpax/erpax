---
name: cache
description: "Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis)."
atomPath: cache
coordinate: "cache · 2/share · 6d232c37"
contentUuid: "f073c8af-fbf2-50dc-aa0e-6ab7844f6c6a"
diamondUuid: "72ba8d01-d32d-8137-9207-bd5ed22bcceb"
uuid: "6d232c37-4d22-88af-8114-c0f715e1b31b"
horo: 2
typography:
  partition: cache
  bondDegree: 51
standards: []
bindings: []
signatures:
  computationUuid: "cfd58d75-7b5e-8a66-86d6-b64a1ae88158"
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
      stageUuid: "8e8fc053-cf2f-87cc-89ef-47716ff7763a"
    - stage: seal
      stageUuid: "efa332ed-0488-85f2-8e0e-72f0cb96efd8"
    - stage: uuid
      stageUuid: "e8267158-0761-86c0-9e90-1b9ed0c336a6"
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
