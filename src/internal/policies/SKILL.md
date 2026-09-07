---
name: policies
description: "Use when creating, reviewing or auditing org-wide policies — accounting, internal-control, compliance, risk, data-protection, code-of-conduct; lifecycle draft→active→superseded, owner, review schedule. The internal-policies collection."
atomPath: "internal/policies"
coordinate: "internal/policies · 8/crest · 3470d727"
contentUuid: "706737ee-0b5c-502f-8ce9-4bcd4d8b647f"
diamondUuid: "3d748631-1c42-88e9-b6b4-c7e1d6b6e1b7"
uuid: "3470d727-0ccd-8725-8bba-a66c24d0a53c"
horo: 8
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
  computationUuid: "5e2da2af-8275-837a-b884-dad8e8e892b9"
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
      stageUuid: "b7cf81df-d7f9-84df-b053-8318ce100267"
    - stage: seal
      stageUuid: "548fd963-cc88-864c-9e20-fee715c5a489"
    - stage: uuid
      stageUuid: "9ae22d01-67dc-8388-9bfc-18e4a9c0f86f"
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
