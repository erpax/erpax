---
name: terminals
description: "Use when registering or querying virtual POS terminals for the BG Наредба-Н-18 alternative e-shop regime — terminal number, payment-service provider, settlement IBAN, currency, and active/inactive status. The virtual POS terminal master for NRA e-shop declarations."
atomPath: terminals
coordinate: "terminals · 5/round · 4bc62de4"
contentUuid: "2da512d7-2647-5cc4-967a-7074b6afd557"
diamondUuid: "551b26f3-2a60-8145-b103-05334bf055e7"
uuid: "4bc62de4-79b1-84d8-8602-f9d65ec4959d"
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
  computationUuid: "9b412a69-f2af-8d4b-b88d-e1c9dad5eafe"
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
      stageUuid: "fe5e816f-a491-8d8b-9bca-bd162f8df357"
    - stage: seal
      stageUuid: "80745e0a-f7bc-81e8-a770-629fb241f317"
    - stage: uuid
      stageUuid: "38b74cdb-632d-8894-96a7-79db094d436e"
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
