---
name: terminals
description: "Use when registering or querying virtual POS terminals for the BG Наредба-Н-18 alternative e-shop regime — terminal number, payment-service provider, settlement IBAN, currency, and active/inactive status. The virtual POS terminal master for NRA e-shop declarations."
atomPath: terminals
coordinate: "terminals · 5/round · 54f77f3e"
contentUuid: "59af1d97-3ca8-5957-a051-ca70946db3e4"
diamondUuid: "10328acf-f11e-850c-ba38-bbdf56626f49"
uuid: "54f77f3e-a1d3-84cb-adc6-55f0b1113894"
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
  computationUuid: "114dff4d-aa25-88d7-9641-38b7fdbd30dc"
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
      stageUuid: "b5edcc6a-dbc2-8791-bbee-f0223115ebdb"
    - stage: seal
      stageUuid: "80745e0a-f7bc-81e8-a770-629fb241f317"
    - stage: uuid
      stageUuid: "16e86802-e249-8f0e-8dcf-d1898f90c7d5"
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
