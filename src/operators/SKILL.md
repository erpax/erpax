---
name: operators
description: "Use when managing СУПТО operators — assigning or decommissioning the 4-digit codes that form the second segment of every УНП — mapped to a user; audit trail preserved on decommission. The Наредба Н-18 operator register."
atomPath: operators
coordinate: "operators · 1/base · 2e333b27"
contentUuid: "6a08aa02-0488-585c-bf9b-8365d5eee34f"
diamondUuid: "b9756f26-d4aa-8c1b-a62a-a079f855ec28"
uuid: "2e333b27-4ae7-85a7-a8d6-2940a9c2beb6"
horo: 1
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
  computationUuid: "69c28a89-b44a-88b3-a0f9-4af8014f87dc"
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
      stageUuid: "b1b3346a-9216-820e-b931-b9915ab989e0"
    - stage: seal
      stageUuid: "690de730-8413-838f-8262-ba59948dda8f"
    - stage: uuid
      stageUuid: "d73c7eb9-4b35-8012-8951-0fb6cd2cf85d"
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
