---
name: operators
description: "Use when managing СУПТО operators — assigning or decommissioning the 4-digit codes that form the second segment of every УНП — mapped to a user; audit trail preserved on decommission. The Наредба Н-18 operator register."
atomPath: operators
coordinate: "operators · 7/descent · a2565cc5"
contentUuid: "713d92f3-d8b5-51fc-9f9d-1068f4c5d9c7"
diamondUuid: "0f0af16f-62ac-89c2-87b6-625c9de97d66"
uuid: "a2565cc5-0320-8de8-aec8-849828b9964e"
horo: 7
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
  computationUuid: "cebcd6d4-a39c-8e78-bd96-99b2dd62e892"
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
      stageUuid: "8013f83e-8745-8506-9b64-569f48d6108e"
    - stage: seal
      stageUuid: "690de730-8413-838f-8262-ba59948dda8f"
    - stage: uuid
      stageUuid: "d387e699-dd42-8cce-8ec4-d6fe6a804c6b"
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
