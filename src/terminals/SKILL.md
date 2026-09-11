---
name: terminals
description: "Use when registering or querying virtual POS terminals for the BG Наредба-Н-18 alternative e-shop regime — terminal number, payment-service provider, settlement IBAN, currency, and active/inactive status. The virtual POS terminal master for NRA e-shop declarations."
atomPath: terminals
coordinate: "terminals · 7/descent · f0b6b6d3"
contentUuid: "aa61f279-0111-5c21-ab36-53a98d5c4f8d"
diamondUuid: "60c3f2e9-49ee-8a99-b63b-d368b7edec7b"
uuid: "f0b6b6d3-adb7-8f7c-b35c-295570ae099a"
horo: 7
typography:
  partition: terminals
  bondDegree: 21
standards:
  - "BG Наредба-Н-18 §алтернативен-режим virtual-POS-terminal"
  - "ISO-19011`"
  - "ISO/IEC-27001:2022`"
bindings: []
signatures:
  computationUuid: "9044fc24-0801-85b4-8871-ff158b0ef73c"
  stages:
    - stage: path
      stageUuid: "baddb3ec-25c0-87b4-936e-a597edbb67e7"
    - stage: trinity
      stageUuid: "f87b0adf-5099-8b57-8f36-696eb9565586"
    - stage: boundary
      stageUuid: "47e6bfc7-98e0-860c-99c5-d261198d032f"
    - stage: links
      stageUuid: "9a3b5ca1-4e94-8214-a56f-56f2bf12ad47"
    - stage: horo
      stageUuid: "de7045d8-c849-8adb-b584-d75a83565565"
    - stage: seal
      stageUuid: "80745e0a-f7bc-81e8-a770-629fb241f317"
    - stage: uuid
      stageUuid: "58c0243e-11fe-8462-a10e-a8b13f1962ad"
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

Composes: [[field]] · [[hooks]] · [[access]] · [[identity]] · [[standard]].

**Law — [[law]]: each virtual POS terminal is a content-addressed, tenant-scoped, audit-trailed register row whose terminal number feeds the Наредба Н-18 e-shop declaration; decommission preserves history, never erases it.**
