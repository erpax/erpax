---
name: policies
description: "Use when creating, reviewing or auditing org-wide policies — accounting, internal-control, compliance, risk, data-protection, code-of-conduct; lifecycle draft→active→superseded, owner, review schedule. The internal-policies collection."
atomPath: "internal/policies"
coordinate: "internal/policies · 1/base · a6483ca8"
contentUuid: "830f52c2-bfbe-55ac-b54b-b2edc5d93597"
diamondUuid: "5fb317fb-10ab-8c6c-84fa-73d44888ce58"
uuid: "a6483ca8-d8ea-8982-befb-0fd9abec43ca"
horo: 1
bonds:
  in:
    - acknowledgments
    - standard
    - versions
  out:
    - acknowledgments
    - standard
    - versions
typography:
  partition: internal
  bondDegree: 0
  neighbors: []
standards:
  - "ISO-37301"
  - "ISO-37301:2021 compliance-policy"
  - "ISO-37301:2021 compliance-policy`"
  - "ISO-9001"
  - "US-CTA-2021"
  - "— the instrument reads SKILL.md) -->"
bindings: []
neighbors:
  wikilink:
    - acknowledgments
    - versions
  matrix:
    - acknowledgments
    - standard
    - versions
  backlinks:
    - acknowledgments
    - standard
    - versions
signatures:
  computationUuid: "262d6e22-5ef1-840e-8c01-866e0a5b2418"
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
      stageUuid: "7b8ad487-8028-89dd-bdba-e3dc1e2dfb0e"
    - stage: seal
      stageUuid: "548fd963-cc88-864c-9e20-fee715c5a489"
    - stage: uuid
      stageUuid: "908ad180-d365-87e7-bd57-a66ed4d5c5b4"
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
