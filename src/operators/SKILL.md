---
name: operators
description: "Use when managing СУПТО operators — assigning or decommissioning the 4-digit codes that form the second segment of every УНП — mapped to a user; audit trail preserved on decommission. The Наредба Н-18 operator register."
atomPath: operators
coordinate: "operators · 5/round · ebf9e93a"
contentUuid: "596f1cd6-456b-520c-9b96-5f6fc47851fd"
diamondUuid: "d488800d-7d2b-8742-b7d6-fde8bfed1b12"
uuid: "ebf9e93a-50da-8237-bbc5-bd9d1c2b1b37"
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
  - "ISO-19011`"
  - "ISO/IEC-27001:2022`"
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
  computationUuid: "2a7fb7a8-3d95-8710-ad4b-0548d1a5f8db"
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
      stageUuid: "77a13dde-b676-8fd9-b2d2-847da53fde09"
    - stage: seal
      stageUuid: "690de730-8413-838f-8262-ba59948dda8f"
    - stage: uuid
      stageUuid: "438e104a-06f9-8353-8026-c9376911344a"
version: 2
---
# operators

Operators — the СУПТО operator register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

**Law — [[law]]: each СУПТО operator is the 4-digit code forming the second segment of every УНП, bound to one user; a decommission retires the mapping while the audit trail is preserved, never erased.**

## Standards

<!-- standards banners (the 7-dim instrument reads SKILL.md; these atoms declare these standards in this section) -->
- `@standard ISO/IEC-27001:2022`
- `@standard ISO-19011`

- BG Наредба-Н-18 §СУПТО operator-nomenclature
- ISO-19011:2018 audit-trail
- ISO-27001 A.5.23 cloud-service-tenant-isolation
