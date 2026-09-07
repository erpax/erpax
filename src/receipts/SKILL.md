---
name: receipts
description: "Use when issuing, querying, or auditing Наредба Н-18 fiscal receipts — касови бонове and e-receipts (alternative regime) — carrying УНП, fiscal-QR payload, VAT breakdown per tax group, and payment type; tamper-evident via content-uuid audit chain; never deleted. The Н-18 fiscal receipt collection."
atomPath: receipts
coordinate: "receipts · 7/descent · 27f45b22"
contentUuid: "4a9d9432-a2ca-51f2-b2aa-6f0f8de53f44"
diamondUuid: "4c15cc47-8778-8e13-80f6-17336c59e92e"
uuid: "27f45b22-4838-81c3-9e6a-3a276c2998ea"
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
  computationUuid: "2e9c1901-3496-8f5e-b6cb-79c7f1c5953f"
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
      stageUuid: "ca1383a9-44b2-8bdf-a0a4-f31fce39fd6f"
    - stage: seal
      stageUuid: "f43e4860-056e-8829-a385-7d5841a42563"
    - stage: uuid
      stageUuid: "8ec5d6fb-a85d-89f1-ab8c-1f9f684409c2"
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
