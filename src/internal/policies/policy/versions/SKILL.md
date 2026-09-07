---
name: versions
description: "Use when managing the version history of an internal policy — release date, version number, change log, document upload, lifecycle draft→final→superseded; ISO 9001 documented-information control per policy. The policy-versions collection."
atomPath: "internal/policies/policy/versions"
coordinate: "internal/policies/policy/versions · 8/crest · 08c284b9"
contentUuid: "4c2b8386-4044-52d9-bb6d-cf58c788feff"
diamondUuid: "c552d6cf-29f0-84b2-b05a-5b5975278060"
uuid: "08c284b9-905f-885e-9dca-71205ba880c8"
horo: 8
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
  computationUuid: "dcce514e-d4f2-8ec3-92f3-b3ffa1834e4a"
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
      stageUuid: "457f914a-8f26-8d2b-8df4-25da527f79c8"
    - stage: seal
      stageUuid: "471cd203-563a-8092-bae0-f351c3453234"
    - stage: uuid
      stageUuid: "4d0adb75-c83a-8037-94c4-f9e898097ca7"
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
