---
name: tenant
description: "Use when resolving which tenants expose published content to anonymous callers — the TTL-cached lookup of tenant ids flagged `allowPublicRead = true`, minimizing D1 row-reads on cold anonymous paths."
atomPath: "allow/public/read/tenant"
coordinate: "allow/public/read/tenant · 1/base · afe6285e"
contentUuid: "b3fe6c9a-c8fa-5315-bf10-ae0381235f35"
diamondUuid: "40759e28-785a-8f08-a352-2551c1230147"
uuid: "afe6285e-0b3d-8186-b50a-dae47dc68d29"
horo: 1
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
  computationUuid: "4e68ea2e-a751-828e-a0d4-3c11b7c4539b"
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
      stageUuid: "8e17d399-3a0f-8f37-a588-1082aeaf1fe7"
    - stage: seal
      stageUuid: "9de6a2b2-87a2-8afa-8e86-4b1a7eb1796b"
    - stage: uuid
      stageUuid: "e07b786a-e51e-83e0-96fe-913e830e1982"
version: 2
---
# allow/public/read/tenant — public-read tenant id cache

Supports anonymous read across tenants that opt in via `allowPublicRead = true`. `getAllowPublicReadTenantIds` queries the tenants collection (overriding [[access]]), normalizes ids to finite numbers, and caches the set for a 300s TTL so anonymous traffic does not re-read D1 rows on every request; the TTL auto-invalidates when a tenant toggles the flag. `clearAllowPublicReadTenantIdsCache` forces a refresh for tests or admin flows.

Matter-twin: `src/allow/public/read/tenant/index.ts` (`getAllowPublicReadTenantIds` ⊕ `clearAllowPublicReadTenantIdsCache`). Composes [[access]] · [[tenant]] · [[scope]].

**Law — [[law]]: public read is tenant-scoped opt-in — only tenants flagged `allowPublicRead` expose published content to anonymous callers, resolved through a TTL cache to bound D1 row-reads.**
