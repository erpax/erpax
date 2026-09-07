---
name: tenant
description: "Use when resolving which tenants expose published content to anonymous callers — the TTL-cached lookup of tenant ids flagged `allowPublicRead = true`, minimizing D1 row-reads on cold anonymous paths."
atomPath: "allow/public/read/tenant"
coordinate: "allow/public/read/tenant · 2/share · 44cbd37d"
contentUuid: "687cf0f7-b692-5ac5-a20f-4822dc3e05d7"
diamondUuid: "42911200-dc44-89f1-88db-4fcfcc81069d"
uuid: "44cbd37d-a403-8e69-95d7-339339ce4b60"
horo: 2
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
  computationUuid: "41761d49-05bc-8c06-8a67-e37776145137"
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
      stageUuid: "ec579532-9a11-8fe1-95c0-2c5b42020aef"
    - stage: seal
      stageUuid: "9de6a2b2-87a2-8afa-8e86-4b1a7eb1796b"
    - stage: uuid
      stageUuid: "1b15baee-a4a5-8c2f-a97d-6e30271519b0"
version: 2
---
# allow/public/read/tenant — public-read tenant id cache

Supports anonymous read across tenants that opt in via `allowPublicRead = true`. `getAllowPublicReadTenantIds` queries the tenants collection (overriding [[access]]), normalizes ids to finite numbers, and caches the set for a 300s TTL so anonymous traffic does not re-read D1 rows on every request; the TTL auto-invalidates when a tenant toggles the flag. `clearAllowPublicReadTenantIdsCache` forces a refresh for tests or admin flows.

Matter-twin: `src/allow/public/read/tenant/index.ts` (`getAllowPublicReadTenantIds` ⊕ `clearAllowPublicReadTenantIdsCache`). Composes [[access]] · [[tenant]] · [[scope]].

**Law — [[law]]: public read is tenant-scoped opt-in — only tenants flagged `allowPublicRead` expose published content to anonymous callers, resolved through a TTL cache to bound D1 row-reads.**
