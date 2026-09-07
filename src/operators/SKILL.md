---
name: operators
description: "Use when managing СУПТО operators — assigning or decommissioning the 4-digit codes that form the second segment of every УНП — mapped to a user; audit trail preserved on decommission. The Наредба Н-18 operator register."
atomPath: operators
coordinate: "operators · 5/round · 6695a0da"
contentUuid: "5c229d42-002c-5c15-900d-53473adfc744"
diamondUuid: "a032eb34-4ccd-84f3-98d0-fa791992c096"
uuid: "6695a0da-2586-8fac-ae13-f83303cdfcda"
horo: 5
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
  computationUuid: "9f2a117b-ed94-88dd-adad-c8e8699de547"
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
      stageUuid: "b0b57991-f1ad-89dd-8b06-374bd2ac5d95"
    - stage: seal
      stageUuid: "690de730-8413-838f-8262-ba59948dda8f"
    - stage: uuid
      stageUuid: "f4f98c55-4727-8b19-9e18-d9199b8dd6f7"
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
