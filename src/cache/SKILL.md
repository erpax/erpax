---
name: cache
description: "Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis)."
atomPath: cache
coordinate: "cache · 1/base · 77cd29e5"
contentUuid: "4b9e734e-c2d4-5d45-8a1d-e895612eeb1a"
diamondUuid: "604e0ac3-f2c7-8986-aad0-08f96b36e470"
uuid: "77cd29e5-ae18-8767-a6a0-8d98d931f35c"
horo: 1
typography:
  partition: cache
  bondDegree: 45
standards: []
bindings: []
signatures:
  computationUuid: "3c284152-96f1-899c-84e7-d1ba2f9511fa"
  stages:
    - stage: path
      stageUuid: "b4f861a8-7bbb-82a6-8f64-b4fc9af00e26"
    - stage: trinity
      stageUuid: "ccefffce-6ef5-8611-b0cc-dee1d0a1abdb"
    - stage: boundary
      stageUuid: "48fbcc14-0220-805f-9d3c-f1f216463b25"
    - stage: links
      stageUuid: "78fb207e-a5a2-8015-8d9b-14da39629b50"
    - stage: horo
      stageUuid: "61eeaa16-c031-8e8d-9d12-e07aa056e862"
    - stage: seal
      stageUuid: "efa332ed-0488-85f2-8e0e-72f0cb96efd8"
    - stage: uuid
      stageUuid: "a1885be1-d505-8b60-87e0-27b04279e797"
version: 2
---
# cache

Use when optimizing repeated access — cache invalidation strategies, cache-aside vs write-through, TTL/expiry, cache coherency, memoization, query result caching, distributed cache semantics (Cloudflare KV, Redis).

Composes: [[bindings]] · optimize · queries · holographic.

**The twin (MLA / DeepSeek-OCR).** DeepSeek compresses the *recompute*: Multi-head Latent Attention stores a low-rank latent instead of the full KV cache; DeepSeek-OCR stores long context as an image (optical compression). Both are this atom's store-less-recompute-cheaper move — keep the small seed, recompute the rest (holographic). Ratified by the R&D society (`agent/research`, weave seq 7).

**Law — [[law]]: a cache trades recompute for staleness — its one hard problem is invalidation (TTL, write-through vs cache-aside, coherency); the holographic move is to store the small seed and recompute the rest cheaper, never the whole.**

## Standards
- HTTP caching (RFC 7234)
- Cache-Control headers
