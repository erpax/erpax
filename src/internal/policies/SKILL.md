---
name: policies
description: "Use when creating, reviewing or auditing org-wide policies — accounting, internal-control, compliance, risk, data-protection, code-of-conduct; lifecycle draft→active→superseded, owner, review schedule. The internal-policies collection."
atomPath: "internal/policies"
coordinate: "internal/policies · 4/weave · 5f372510"
contentUuid: "f012200a-2d50-55a3-a760-5d3e43c9ae26"
diamondUuid: "35e22814-5532-892b-a7a6-55abf6ee2c0c"
uuid: "5f372510-532b-883a-a123-4263c437b596"
horo: 4
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
  computationUuid: "844cb49c-9451-8acc-964b-1ea4ea2da3eb"
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
      stageUuid: "6acd6d74-ec79-8478-bcba-65909539a49d"
    - stage: seal
      stageUuid: "548fd963-cc88-864c-9e20-fee715c5a489"
    - stage: uuid
      stageUuid: "d637ab23-1481-86c5-bbde-0f9f77e6d8d8"
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
