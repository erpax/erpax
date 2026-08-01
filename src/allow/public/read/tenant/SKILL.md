---
name: tenant
description: "Use when resolving which tenants expose published content to anonymous callers — the TTL-cached lookup of tenant ids flagged `allowPublicRead = true`, minimizing D1 row-reads on cold anonymous paths."
atomPath: "allow/public/read/tenant"
coordinate: "allow/public/read/tenant · 5/round · 43703b82"
contentUuid: "4c766519-c255-5888-8e03-923ea1b9bfad"
diamondUuid: "99fbc213-65f7-826f-8405-14705e12ef14"
uuid: "43703b82-a7b6-8d20-af6b-f5106f970593"
horo: 5
typography:
  partition: allow
  bondDegree: 30
standards:
  - "9110 §13 caching"
  - "GDPR Art.5(1)(c) data-minimization"
  - "ISO/IEC-29119"
bindings: []
signatures:
  computationUuid: "10086bda-de03-8aff-8cd2-5ad3989162de"
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
      stageUuid: "b2fe1fde-21f5-8b36-8219-9e3275686f0b"
    - stage: seal
      stageUuid: "9de6a2b2-87a2-8afa-8e86-4b1a7eb1796b"
    - stage: uuid
      stageUuid: "17b6b1d8-179f-8cee-9db5-8de1141328ef"
version: 2
---
# allow/public/read/tenant — public-read tenant id cache

Supports anonymous read across tenants that opt in via `allowPublicRead = true`. `getAllowPublicReadTenantIds` queries the tenants collection (overriding [[access]]), normalizes ids to finite numbers, and caches the set for a 300s TTL so anonymous traffic does not re-read D1 rows on every request; the TTL auto-invalidates when a tenant toggles the flag. `clearAllowPublicReadTenantIdsCache` forces a refresh for tests or admin flows.

Matter-twin: `src/allow/public/read/tenant/index.ts` (`getAllowPublicReadTenantIds` ⊕ `clearAllowPublicReadTenantIdsCache`). Composes [[access]] · [[tenant]] · [[scope]].

**Law — [[law]]: public read is tenant-scoped opt-in — only tenants flagged `allowPublicRead` expose published content to anonymous callers, resolved through a TTL cache to bound D1 row-reads.**
