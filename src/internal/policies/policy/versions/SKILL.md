---
name: versions
description: "Use when managing the version history of an internal policy — release date, version number, change log, document upload, lifecycle draft→final→superseded; ISO 9001 documented-information control per policy. The policy-versions collection."
atomPath: "internal/policies/policy/versions"
coordinate: "internal/policies/policy/versions · 8/crest · 8f9bbdab"
contentUuid: "98fa8223-874a-5f63-9637-42353170d3bf"
diamondUuid: "16be6519-ec12-8a19-8d34-ad8121bda795"
uuid: "8f9bbdab-8544-8ccb-91c1-7ab4b522c39d"
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
  computationUuid: "0331dca0-41f2-87f1-a152-b1d657d0dab2"
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
      stageUuid: "b0ccafb0-954e-8e15-8b89-1c6be39c5417"
    - stage: seal
      stageUuid: "471cd203-563a-8092-bae0-f351c3453234"
    - stage: uuid
      stageUuid: "1c5f1b96-74ec-8ba6-977d-29725344b6f7"
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
