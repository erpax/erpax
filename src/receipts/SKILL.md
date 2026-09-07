---
name: receipts
description: "Use when issuing, querying, or auditing Наредба Н-18 fiscal receipts — касови бонове and e-receipts (alternative regime) — carrying УНП, fiscal-QR payload, VAT breakdown per tax group, and payment type; tamper-evident via content-uuid audit chain; never deleted. The Н-18 fiscal receipt collection."
atomPath: receipts
coordinate: "receipts · 8/crest · 385cdf9e"
contentUuid: "83827d01-41df-5699-8359-185d280a5d1c"
diamondUuid: "37bfa00c-ab4d-8d80-b4c3-e8de59df4010"
uuid: "385cdf9e-46e2-84c8-9cf8-c6bc7c59240f"
horo: 8
typography:
  partition: receipts
  bondDegree: 34
standards:
  - "BG Наредба-Н-18 §СУПТО касов-бон · §алтернативен-режим e-receipt"
  - "ISO-19011`"
  - "ISO/IEC-27001:2022`"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "a5d553ce-4419-836b-918c-bd1c9af34798"
  stages:
    - stage: path
      stageUuid: "a48f65c4-e5f4-82c9-951d-9be7fc45f151"
    - stage: trinity
      stageUuid: "c9cae723-7bd2-88d3-aaf7-cdcfaef87a14"
    - stage: boundary
      stageUuid: "aadc3757-b56b-8e4a-82c3-bb99ce251dd5"
    - stage: links
      stageUuid: "ba8a0303-8554-8beb-a5f1-1430b7a3a11d"
    - stage: horo
      stageUuid: "0b5189a7-0fc8-860f-be01-1ab322938e51"
    - stage: seal
      stageUuid: "f43e4860-056e-8829-a385-7d5841a42563"
    - stage: uuid
      stageUuid: "9b804537-f5fb-84e4-addc-318e97669d90"
version: 2
---
# receipts

Receipts (касови бонове / electronic receipts) — the Наредба Н-18 fiscal.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO-19011`

- BG Наредба-Н-18 §СУПТО касов-бон · §алтернативен-режим e-receipt
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[collections]] · [[supto]] · [[proof]] · [[versions]] · [[field]] · [[accounting]].

**Law — [[law]]: every issued fiscal receipt carries its УНП and per-tax-group VAT breakdown, is sealed into the content-uuid audit chain, and is never deleted — only ever superseded.**
