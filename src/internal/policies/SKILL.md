---
name: policies
description: "Use when creating, reviewing or auditing org-wide policies — accounting, internal-control, compliance, risk, data-protection, code-of-conduct; lifecycle draft→active→superseded, owner, review schedule. The internal-policies collection."
atomPath: internal/policies
coordinate: internal/policies · 2/share · 59e28908
contentUuid: "8edfd176-8761-5f7e-821b-23665fd0fbdc"
diamondUuid: "f2a7927c-8efb-83b8-99f6-1d7c89d09b21"
uuid: "59e28908-c17a-8cdf-a524-b32d3f5b5ee0"
horo: 2
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
  - "ISO-9001"
  - "US-CTA-2021"
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
  computationUuid: "4b3124aa-7f54-8a91-b0cf-8f9ccb4d2e73"
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
      stageUuid: "f158aeb4-2b6e-8c9c-97a2-021abe0c462b"
    - stage: seal
      stageUuid: "548fd963-cc88-864c-9e20-fee715c5a489"
    - stage: uuid
      stageUuid: "ab2e22b3-5558-8ded-ba50-75027378842e"
version: 2
---
# internal-policies

InternalPolicies.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-27001 A.5.1 policies-for-information-security
- ISO-37301:2021 compliance-policy
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[internal/policies/policy/acknowledgments]] · [[internal/policies/policy/versions]].
