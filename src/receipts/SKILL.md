---
name: receipts
description: "Use when issuing, querying, or auditing Наредба Н-18 fiscal receipts — касови бонове and e-receipts (alternative regime) — carrying УНП, fiscal-QR payload, VAT breakdown per tax group, and payment type; tamper-evident via content-uuid audit chain; never deleted. The Н-18 fiscal receipt collection."
atomPath: receipts
coordinate: receipts · 8/crest · 4f1c9dc2
contentUuid: "8b164cfe-17fb-5c51-af85-fd11c4476486"
diamondUuid: "ca7c044f-f0df-82c5-90d4-402229f2c202"
uuid: "4f1c9dc2-36b4-8cda-9f4d-3eb847199673"
horo: 8
bonds:
  in:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
  out:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
typography:
  partition: receipts
  bondDegree: 34
  neighbors: []
standards:
  - "BG Наредба-Н-18 §СУПТО касов-бон · §алтернативен-режим e-receipt"
  - "ISO-19011:2018 audit-trail"
  - "Naredba-N-18"
bindings: []
neighbors:
  wikilink:
    - accounting
    - collections
    - fields
    - law
    - proof
    - supto
    - versions
  matrix:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
  backlinks:
    - accounting
    - collections
    - fields
    - law
    - proof
    - sales
    - supto
    - versions
signatures:
  computationUuid: "ca415024-2176-831f-820c-38db0fe86e77"
  stages:
    - stage: path
      stageUuid: "a48f65c4-e5f4-82c9-951d-9be7fc45f151"
    - stage: trinity
      stageUuid: "c9cae723-7bd2-88d3-aaf7-cdcfaef87a14"
    - stage: boundary
      stageUuid: "e761740e-33cb-8cb6-8d5d-0c01b72cbadc"
    - stage: links
      stageUuid: "9af7bd39-4a09-8c55-9a08-e1f9872eb774"
    - stage: horo
      stageUuid: "cb33cdae-b1d6-88cb-afcf-291db7b249c3"
    - stage: seal
      stageUuid: "d3753e1e-9f22-8c32-83de-d7ea9c660648"
    - stage: uuid
      stageUuid: "8ddbc94f-d450-8445-b17c-a21d92296833"
version: 2
---
# receipts

Receipts (касови бонове / electronic receipts) — the Наредба Н-18 fiscal.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- BG Наредба-Н-18 §СУПТО касов-бон · §алтернативен-режим e-receipt
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[collections]] · [[supto]] · [[proof]] · [[versions]] · [[fields]] · [[accounting]].

**Law — [[law]]: every issued fiscal receipt carries its УНП and per-tax-group VAT breakdown, is sealed into the content-uuid audit chain, and is never deleted — only ever superseded.**
