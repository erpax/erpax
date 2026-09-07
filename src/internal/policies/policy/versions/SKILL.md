---
name: versions
description: "Use when managing the version history of an internal policy — release date, version number, change log, document upload, lifecycle draft→final→superseded; ISO 9001 documented-information control per policy. The policy-versions collection."
atomPath: "internal/policies/policy/versions"
coordinate: "internal/policies/policy/versions · 5/round · 93c467c6"
contentUuid: "bf6d1e42-c31b-523e-a0c4-9c1f56086452"
diamondUuid: "b231cd63-a307-81aa-b1d1-ddbc2a5ec123"
uuid: "93c467c6-81fd-8c09-9b64-ff7435717e3c"
horo: 5
typography:
  partition: internal
  bondDegree: 116
standards:
  - "ISO-9001"
  - "ISO-9001:2015 §7.5 documented-information-control"
  - "ISO-9001:2015 §7.5 documented-information-control`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "3a2fbc00-7e28-8bc9-84e0-ac91fb1b726e"
  stages:
    - stage: path
      stageUuid: "a2878ec1-c87a-8ec5-b919-02bca65a9fe6"
    - stage: trinity
      stageUuid: "47fa9828-8d4e-83be-a8f3-3c8b3abe5d89"
    - stage: boundary
      stageUuid: "877d946c-5e47-85f4-9a9a-e0d587dac08b"
    - stage: links
      stageUuid: "4763a7c6-cddd-829f-8957-74074507b8c6"
    - stage: horo
      stageUuid: "e2313b0c-b2ef-84b4-ba91-6f786f1e1a68"
    - stage: seal
      stageUuid: "471cd203-563a-8092-bae0-f351c3453234"
    - stage: uuid
      stageUuid: "e1028a9b-c0de-86b3-b17d-9b5fe0c50aea"
version: 2
---
# policy-versions

PolicyVersions.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-9001:2015 §7.5 documented-information-control`

- ISO-27001 A.5.1 policies
- ISO-9001:2015 §7.5 documented-information-control
- ISO-27001 A.5.23 cloud-service-tenant-isolation
