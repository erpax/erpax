---
name: operators
description: "Use when managing СУПТО operators — assigning or decommissioning the 4-digit codes that form the second segment of every УНП — mapped to a user; audit trail preserved on decommission. The Наредба Н-18 operator register."
atomPath: operators
coordinate: "operators · 8/crest · dbf2ffe0"
contentUuid: "ead31b1a-04b6-5dcc-99cb-558e1548eff8"
diamondUuid: "f3b4b899-a91c-88e1-86f4-533364ea7449"
uuid: "dbf2ffe0-f05a-8e47-a547-61d3c002d2f8"
horo: 8
typography:
  partition: operators
  bondDegree: 6
standards:
  - "BG Наредба-Н-18 §СУПТО operator-nomenclature"
  - "ISO-19011`"
  - "ISO/IEC-27001:2022`"
  - "Naredba-N-18"
bindings: []
signatures:
  computationUuid: "77908011-c2ad-8651-8cfb-8dd7dc69a096"
  stages:
    - stage: path
      stageUuid: "2b246e21-62ae-8145-913c-cdc09e404602"
    - stage: trinity
      stageUuid: "0093d650-0b8a-8536-ac26-fd3b795c1b1e"
    - stage: boundary
      stageUuid: "56608a60-5a5b-8f29-91ca-b6c7d5067844"
    - stage: links
      stageUuid: "6bd65276-e955-8df2-87be-17d9afe083e2"
    - stage: horo
      stageUuid: "ef2d69b0-6077-8b40-b679-f2b3bd967cdb"
    - stage: seal
      stageUuid: "690de730-8413-838f-8262-ba59948dda8f"
    - stage: uuid
      stageUuid: "0075dcaa-41f9-8300-bf6e-ea23dd60d6f5"
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
