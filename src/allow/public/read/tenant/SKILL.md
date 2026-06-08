---
name: tenant
description: "Use when resolving which tenants expose published content to anonymous callers — the TTL-cached lookup of tenant ids flagged `allowPublicRead = true`, minimizing D1 row-reads on cold anonymous paths."
atomPath: allow/public/read/tenant
coordinate: allow/public/read/tenant · 8/crest · bd3e5972
contentUuid: "306f4947-43ab-5dfe-8940-c0ef0a463226"
diamondUuid: "e4ba0d0f-a1a1-8534-b2f2-5fdcbb0c019f"
uuid: "bd3e5972-0523-8f1e-a50b-b2e299b677f0"
horo: 8
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
  - "GDPR Art.5(1)(c) data-minimization"
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
  computationUuid: "debd5920-6258-8825-8dcc-437c9b3dfd98"
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
      stageUuid: "7545c2e2-c54f-894a-baa6-fd17156b3195"
    - stage: seal
      stageUuid: "9de6a2b2-87a2-8afa-8e86-4b1a7eb1796b"
    - stage: uuid
      stageUuid: "b2310ecd-3cab-8272-b4f1-57dc41ec4147"
version: 2
---
# allow/public/read/tenant — public-read tenant id cache

Supports anonymous read across tenants that opt in via `allowPublicRead = true`. `getAllowPublicReadTenantIds` queries the tenants collection (overriding [[access]]), normalizes ids to finite numbers, and caches the set for a 300s TTL so anonymous traffic does not re-read D1 rows on every request; the TTL auto-invalidates when a tenant toggles the flag. `clearAllowPublicReadTenantIdsCache` forces a refresh for tests or admin flows.

Matter-twin: `src/allow/public/read/tenant/index.ts` (`getAllowPublicReadTenantIds` ⊕ `clearAllowPublicReadTenantIdsCache`). Composes [[access]] · [[tenant]] · [[scope]].

**Law — [[law]]: public read is tenant-scoped opt-in — only tenants flagged `allowPublicRead` expose published content to anonymous callers, resolved through a TTL cache to bound D1 row-reads.**
