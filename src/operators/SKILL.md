---
name: operators
description: "Use when managing СУПТО operators — assigning or decommissioning the 4-digit codes that form the second segment of every УНП — mapped to a user; audit trail preserved on decommission. The Наредба Н-18 operator register."
atomPath: operators
coordinate: operators · 5/round · 470f76b0
contentUuid: "11717233-c7f7-5a10-88d1-9503398e6d7e"
diamondUuid: "cf8a513b-133f-8b1d-812b-bab0d2dc7192"
uuid: "470f76b0-c548-8fd7-bc7e-b9802c8f2b9d"
horo: 5
bonds:
  in:
    - devices
    - law
  out:
    - devices
    - law
typography:
  partition: operators
  bondDegree: 6
  neighbors: []
standards:
  - "BG Наредба-Н-18 §СУПТО operator-nomenclature"
  - "ISO-19011:2018 audit-trail"
  - "Naredba-N-18"
bindings: []
neighbors:
  wikilink:
    - law
  matrix:
    - devices
    - law
  backlinks:
    - devices
    - law
signatures:
  computationUuid: "9a1916a9-dc2d-869b-81e0-362e675e67f2"
  stages:
    - stage: path
      stageUuid: "2b246e21-62ae-8145-913c-cdc09e404602"
    - stage: trinity
      stageUuid: "0093d650-0b8a-8536-ac26-fd3b795c1b1e"
    - stage: boundary
      stageUuid: "9182ca64-2a53-8bb2-8d63-e979c5e9dd3b"
    - stage: links
      stageUuid: "6bd65276-e955-8df2-87be-17d9afe083e2"
    - stage: horo
      stageUuid: "fe013745-e828-8657-9194-84da309c2598"
    - stage: seal
      stageUuid: "dcc722ff-580d-8005-a216-7ffefe05a36d"
    - stage: uuid
      stageUuid: "547f5318-4a27-8b7b-87e1-37b1ea8139ff"
version: 2
---
# operators

Operators — the СУПТО operator register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: each СУПТО operator is the 4-digit code forming the second segment of every УНП, bound to one user; a decommission retires the mapping while the audit trail is preserved, never erased.**

## Standards
- BG Наредба-Н-18 §СУПТО operator-nomenclature
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation
