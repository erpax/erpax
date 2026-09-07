---
name: policies
description: "Use when creating, reviewing or auditing org-wide policies — accounting, internal-control, compliance, risk, data-protection, code-of-conduct; lifecycle draft→active→superseded, owner, review schedule. The internal-policies collection."
atomPath: "internal/policies"
coordinate: "internal/policies · 5/round · 26ae6838"
contentUuid: "d00c2296-bd93-5c8e-b0fd-9dc159aac8e8"
diamondUuid: "747bbb92-5f3d-843b-9742-2ef0db67d21c"
uuid: "26ae6838-8369-8586-9832-38fb1ff88389"
horo: 5
typography:
  partition: internal
  bondDegree: 9
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-policy"
  - "ISO-37301:2021 compliance-policy`"
  - "ISO-9001"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "fb02807c-33b6-8fa0-a690-b7928fa2ed07"
  stages:
    - stage: path
      stageUuid: "9d12f2fc-ba71-8b93-911b-f143d8f1748d"
    - stage: trinity
      stageUuid: "692c92c7-1d0c-8d87-ab0d-bdcb372abdb4"
    - stage: boundary
      stageUuid: "b2d2ea15-4dd7-85ea-820d-6e93b4c84aa8"
    - stage: links
      stageUuid: "4c793d27-326b-8383-ba13-52cf81d104fe"
    - stage: horo
      stageUuid: "7a365586-01ed-89bc-9a24-91bb71773e36"
    - stage: seal
      stageUuid: "548fd963-cc88-864c-9e20-fee715c5a489"
    - stage: uuid
      stageUuid: "68e7db72-ec50-8296-bbf9-8ae6cd8e2ced"
version: 2
---
# internal-policies

InternalPolicies.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-37301:2021 compliance-policy`

- ISO-27001 A.5.1 policies-for-information-security
- ISO-37301:2021 compliance-policy
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[internal/policies/policy/acknowledgments]] · [[internal/policies/policy/versions]].
