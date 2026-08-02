---
name: receipts
description: "Use when issuing, querying, or auditing Наредба Н-18 fiscal receipts — касови бонове and e-receipts (alternative regime) — carrying УНП, fiscal-QR payload, VAT breakdown per tax group, and payment type; tamper-evident via content-uuid audit chain; never deleted. The Н-18 fiscal receipt collection."
atomPath: receipts
coordinate: "receipts · 8/crest · e46105e5"
contentUuid: "4ce754b1-4800-5f1f-9324-63ca9bf80156"
diamondUuid: "7b44c926-a7aa-8516-912b-955b17c2796d"
uuid: "e46105e5-981d-8f20-bd9e-15c33ddde827"
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
  computationUuid: "5c0e98ae-504d-86b6-af95-c25fe6a6fd65"
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
      stageUuid: "ec5e3169-0fee-85f1-adbf-7e629093eae6"
    - stage: seal
      stageUuid: "f43e4860-056e-8829-a385-7d5841a42563"
    - stage: uuid
      stageUuid: "f614d925-cbea-88d1-a18f-01ad00c12892"
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
