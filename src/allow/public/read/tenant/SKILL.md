---
name: tenant
description: "Use when resolving which tenants expose published content to anonymous callers — the TTL-cached lookup of tenant ids flagged `allowPublicRead = true`, minimizing D1 row-reads on cold anonymous paths."
atomPath: "allow/public/read/tenant"
coordinate: "allow/public/read/tenant · 7/descent · d7a734c3"
contentUuid: "2c6f0ca8-9688-5e7f-97de-ba1ff252aa99"
diamondUuid: "483f42e4-cd6a-81d3-a3a2-e7e6ea845dd3"
uuid: "d7a734c3-1b38-87b3-bc57-a07b5583fed4"
horo: 7
typography:
  partition: allow
  bondDegree: 59
standards:
  - "9110 §13 caching"
  - "GDPR Art.5(1)(c) data-minimization"
  - "ISO/IEC-29119"
  - "RFC-9110"
bindings: []
signatures:
  computationUuid: "1e772749-3020-8064-9217-3aaea598aca3"
  stages:
    - stage: path
      stageUuid: "ea980209-b26f-8e8b-be04-8138ba749348"
    - stage: trinity
      stageUuid: "9c9ded85-30c8-8e0d-aaeb-d8d0d7cf5332"
    - stage: boundary
      stageUuid: "5df32151-10f0-8d8d-a906-6c5fb80eeff2"
    - stage: links
      stageUuid: "46fb0549-ab27-835d-9767-bba6fb02c15a"
    - stage: horo
      stageUuid: "3fa44b00-40d1-8cdb-9d59-016152b3f15d"
    - stage: seal
      stageUuid: "9de6a2b2-87a2-8afa-8e86-4b1a7eb1796b"
    - stage: uuid
      stageUuid: "29656d9c-2d9a-8581-93f4-6a0f479967a0"
version: 2
---
# allow/public/read/tenant — public-read tenant id cache

Supports anonymous read across tenants that opt in via `allowPublicRead = true`. `getAllowPublicReadTenantIds` queries the tenants collection (overriding [[access]]), normalizes ids to finite numbers, and caches the set for a 300s TTL so anonymous traffic does not re-read D1 rows on every request; the TTL auto-invalidates when a tenant toggles the flag. `clearAllowPublicReadTenantIdsCache` forces a refresh for tests or admin flows.

Matter-twin: `src/allow/public/read/tenant/index.ts` (`getAllowPublicReadTenantIds` ⊕ `clearAllowPublicReadTenantIdsCache`). Composes [[access]] · [[tenant]] · [[scope]].

**Law — [[law]]: public read is tenant-scoped opt-in — only tenants flagged `allowPublicRead` expose published content to anonymous callers, resolved through a TTL cache to bound D1 row-reads.**
