---
name: policies
description: "Use when creating, reviewing or auditing org-wide policies — accounting, internal-control, compliance, risk, data-protection, code-of-conduct; lifecycle draft→active→superseded, owner, review schedule. The internal-policies collection."
atomPath: "internal/policies"
coordinate: "internal/policies · 2/share · 9174e78a"
contentUuid: "fd3a3f7e-9c66-5fb2-bbba-a9e27d9804e3"
diamondUuid: "7e9edfb5-7394-8dd1-b02a-59cdf948694e"
uuid: "9174e78a-a389-870c-b691-014d6bab708b"
horo: 2
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
  computationUuid: "a562ac95-f8c9-81ac-9add-edc86230cffb"
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
      stageUuid: "bc9e8559-6e39-877f-9574-1a972e4b64c1"
    - stage: seal
      stageUuid: "548fd963-cc88-864c-9e20-fee715c5a489"
    - stage: uuid
      stageUuid: "b46753a8-9b03-8fcc-88d9-b0e34d616e69"
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
