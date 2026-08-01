---
name: terminals
description: "Use when registering or querying virtual POS terminals for the BG Наредба-Н-18 alternative e-shop regime — terminal number, payment-service provider, settlement IBAN, currency, and active/inactive status. The virtual POS terminal master for NRA e-shop declarations."
atomPath: terminals
coordinate: "terminals · 5/round · bf4eb1fe"
contentUuid: "102ca326-c8a5-5d5b-a915-c3c86b38e85d"
diamondUuid: "6be69ddf-7f34-8137-a520-537d73fb41da"
uuid: "bf4eb1fe-3d29-8260-9519-3aed405b6f7e"
horo: 5
typography:
  partition: terminals
  bondDegree: 21
standards:
  - "BG Наредба-Н-18 §алтернативен-режим virtual-POS-terminal"
  - "ISO-19011`"
  - "ISO/IEC-27001:2022`"
bindings: []
signatures:
  computationUuid: "08e6cd7d-d51d-8aa4-84bf-daf6a2fce977"
  stages:
    - stage: path
      stageUuid: "baddb3ec-25c0-87b4-936e-a597edbb67e7"
    - stage: trinity
      stageUuid: "f87b0adf-5099-8b57-8f36-696eb9565586"
    - stage: boundary
      stageUuid: "c2336998-4a0c-837a-9285-685a09391338"
    - stage: links
      stageUuid: "63183521-e6eb-858c-a91f-c1eca9603494"
    - stage: horo
      stageUuid: "8efcfa33-5828-876f-b07b-5bdefb139dd1"
    - stage: seal
      stageUuid: "80745e0a-f7bc-81e8-a770-629fb241f317"
    - stage: uuid
      stageUuid: "686dd486-edba-88d3-b16c-afc3b214ea53"
version: 2
---
# terminals

Terminals — virtual POS terminals for the Наредба Н-18 alternative regime.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO-19011`

- BG Наредба-Н-18 §алтернативен-режим virtual-POS-terminal
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fields]] · [[hooks]] · [[access]] · [[identity]] · [[standard]].

**Law — [[law]]: each virtual POS terminal is a content-addressed, tenant-scoped, audit-trailed register row whose terminal number feeds the Наредба Н-18 e-shop declaration; decommission preserves history, never erases it.**
