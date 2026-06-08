---
name: terminals
description: "Use when registering or querying virtual POS terminals for the BG Наредба-Н-18 alternative e-shop regime — terminal number, payment-service provider, settlement IBAN, currency, and active/inactive status. The virtual POS terminal master for NRA e-shop declarations."
atomPath: terminals
coordinate: terminals · 8/crest · b445a28b
contentUuid: "bd34de90-6192-5814-b084-3635479af3d0"
diamondUuid: "42a48904-4899-8960-9e8f-e920a2ebe9b7"
uuid: "b445a28b-bdb6-8e7b-adf4-a035f98cf43e"
horo: 8
bonds:
  in:
    - access
    - devices
    - fields
    - hooks
    - identity
    - law
    - standard
  out:
    - access
    - devices
    - fields
    - hooks
    - identity
    - law
    - standard
typography:
  partition: terminals
  bondDegree: 21
  neighbors: []
standards:
  - "BG Наредба-Н-18 §алтернативен-режим virtual-POS-terminal"
  - "ISO-19011:2018 audit-trail"
bindings: []
neighbors:
  wikilink:
    - access
    - fields
    - hooks
    - identity
    - law
    - standard
  matrix:
    - access
    - devices
    - fields
    - hooks
    - identity
    - law
    - standard
  backlinks:
    - access
    - devices
    - fields
    - hooks
    - identity
    - law
    - standard
signatures:
  computationUuid: "b6867aed-b923-859f-86ff-6dad9efff3e0"
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
      stageUuid: "16dd1d4e-b893-8ee7-aac7-d059f911a022"
    - stage: seal
      stageUuid: "6ef806ec-3842-8b0a-9bee-ed4e09d6b2d8"
    - stage: uuid
      stageUuid: "1f036061-abce-8711-a4a5-ef89f6fd1d28"
version: 2
---
# terminals

Terminals — virtual POS terminals for the Наредба Н-18 alternative regime.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- BG Наредба-Н-18 §алтернативен-режим virtual-POS-terminal
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fields]] · [[hooks]] · [[access]] · [[identity]] · [[standard]].

**Law — [[law]]: each virtual POS terminal is a content-addressed, tenant-scoped, audit-trailed register row whose terminal number feeds the Наредба Н-18 e-shop declaration; decommission preserves history, never erases it.**
