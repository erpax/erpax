---
name: versions
description: "Use when managing the version history of an internal policy — release date, version number, change log, document upload, lifecycle draft→final→superseded; ISO 9001 documented-information control per policy. The policy-versions collection."
atomPath: "internal/policies/policy/versions"
coordinate: "internal/policies/policy/versions · 1/base · fa886514"
contentUuid: "5e27eecb-d7ff-56d3-9b1e-2e132631f483"
diamondUuid: "b0711d8d-673b-8943-93ba-7ec9043d6ad7"
uuid: "fa886514-5ca3-8a0d-9ee3-0fca9a771d61"
horo: 1
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
  computationUuid: "c8c6982a-6c11-8a7e-b4f1-2533b947e32c"
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
      stageUuid: "20015085-c9ae-895e-aa9c-8ee2408e30e7"
    - stage: seal
      stageUuid: "471cd203-563a-8092-bae0-f351c3453234"
    - stage: uuid
      stageUuid: "cfe6df9a-b291-89d0-a3dc-9e738b81d2ee"
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
