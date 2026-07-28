---
name: tenant
description: "Use when resolving which tenants expose published content to anonymous callers — the TTL-cached lookup of tenant ids flagged `allowPublicRead = true`, minimizing D1 row-reads on cold anonymous paths."
atomPath: "allow/public/read/tenant"
coordinate: "allow/public/read/tenant · 7/descent · 89e32db7"
contentUuid: "9c8f1db2-077c-562a-8591-6d27f602495f"
diamondUuid: "130bfbf8-fd61-845a-984e-eef6505ab4d2"
uuid: "89e32db7-0902-878b-8f9c-a3d35cc76a0d"
horo: 7
bonds:
  in:
    - balance
    - law
    - organization
    - read
    - research
    - tenant
    - tenants
  out:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
typography:
  partition: allow
  bondDegree: 30
  neighbors: []
standards:
  - "9110 §13 caching"
  - "EU-2022/1925"
  - "EU-2022/2065"
  - "EU-2022/2554"
  - "EU-2022/2555"
  - "EU-2022/868"
  - "GDPR Art.5(1)(c) data-minimization"
  - "ISO/IEC-29119"
bindings: []
neighbors:
  wikilink:
    - access
    - law
    - scope
    - tenant
  matrix:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
  backlinks:
    - balance
    - law
    - organization
    - research
    - tenant
    - tenants
signatures:
  computationUuid: "f5cb0991-370a-81af-a906-89493feffc69"
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
      stageUuid: "08f2d7fe-6e3b-89a8-97bd-22a3c44948ab"
    - stage: seal
      stageUuid: "9de6a2b2-87a2-8afa-8e86-4b1a7eb1796b"
    - stage: uuid
      stageUuid: "fa7fffe7-ce2f-8741-b5e3-42d7042d8b5c"
version: 2
---
# allow/public/read/tenant — public-read tenant id cache

Supports anonymous read across tenants that opt in via `allowPublicRead = true`. `getAllowPublicReadTenantIds` queries the tenants collection (overriding [[access]]), normalizes ids to finite numbers, and caches the set for a 300s TTL so anonymous traffic does not re-read D1 rows on every request; the TTL auto-invalidates when a tenant toggles the flag. `clearAllowPublicReadTenantIdsCache` forces a refresh for tests or admin flows.

Matter-twin: `src/allow/public/read/tenant/index.ts` (`getAllowPublicReadTenantIds` ⊕ `clearAllowPublicReadTenantIdsCache`). Composes [[access]] · [[tenant]] · [[scope]].

**Law — [[law]]: public read is tenant-scoped opt-in — only tenants flagged `allowPublicRead` expose published content to anonymous callers, resolved through a TTL cache to bound D1 row-reads.**
