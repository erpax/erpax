---
name: receipts
description: "Use when issuing, querying, or auditing Наредба Н-18 fiscal receipts — касови бонове and e-receipts (alternative regime) — carrying УНП, fiscal-QR payload, VAT breakdown per tax group, and payment type; tamper-evident via content-uuid audit chain; never deleted. The Н-18 fiscal receipt collection."
atomPath: receipts
coordinate: "receipts · 7/descent · b54dcab0"
contentUuid: "3a51c110-7125-55a7-a1f9-8e0375a3a848"
diamondUuid: "f7c9301c-a466-85c6-b915-d69979503712"
uuid: "b54dcab0-e661-82b2-a89d-f4402ddb628a"
horo: 7
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
  computationUuid: "8502a1f0-d1ee-8319-9c83-26191d796e01"
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
      stageUuid: "a8fbbd4d-0828-8355-88d4-3a4119de9af2"
    - stage: seal
      stageUuid: "f43e4860-056e-8829-a385-7d5841a42563"
    - stage: uuid
      stageUuid: "1bc316a9-a7e8-8dd0-b033-f5ba51403943"
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
