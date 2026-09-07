---
name: versions
description: "Use when managing the version history of an internal policy — release date, version number, change log, document upload, lifecycle draft→final→superseded; ISO 9001 documented-information control per policy. The policy-versions collection."
atomPath: "internal/policies/policy/versions"
coordinate: "internal/policies/policy/versions · 4/weave · 16c84dd4"
contentUuid: "085c105f-5b49-5d17-8663-c8fff773a6b3"
diamondUuid: "17176169-55b5-8362-9c17-6b3ffaa9fe14"
uuid: "16c84dd4-fafa-8105-904c-00e23d0b976c"
horo: 4
typography:
  partition: internal
  bondDegree: 106
standards:
  - "ISO-9001"
  - "ISO-9001:2015 §7.5 documented-information-control"
  - "ISO-9001:2015 §7.5 documented-information-control`"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "c84e3065-e927-87c6-8f5a-4d4079aa08ad"
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
      stageUuid: "c7742aa1-4599-8ef3-abba-915c1fed3638"
    - stage: seal
      stageUuid: "471cd203-563a-8092-bae0-f351c3453234"
    - stage: uuid
      stageUuid: "d3dd2070-8b9b-8378-ac91-ae708da24b13"
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
