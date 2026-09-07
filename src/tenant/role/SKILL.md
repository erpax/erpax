---
name: role
description: "Use when reasoning about role — Importing this barrel pulls in the four reference tenant profiles — business, payment provider, bank, government — so any code holding the registry sees them without naming each."
atomPath: "tenant/role"
coordinate: "tenant/role · 8/crest · 74c60b7f"
contentUuid: "0c495123-bd10-52b3-8fac-cf30db677e63"
diamondUuid: "42954480-f327-880d-9b8e-df8dd08fadf6"
uuid: "74c60b7f-8c9c-8fb1-bace-bd8285649568"
horo: 8
typography:
  partition: tenant
  bondDegree: 41
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-12207"
bindings: []
signatures:
  computationUuid: "9de47e64-d5e8-8d78-a327-7e5af312c886"
  stages:
    - stage: path
      stageUuid: "a5095f2f-bf6a-8dd2-8c96-debf7ca8a4ff"
    - stage: trinity
      stageUuid: "25cdf612-9e4f-8a1b-9076-65d4bd54c2a9"
    - stage: boundary
      stageUuid: "e3f8d0bb-0342-858b-83d7-595d666befda"
    - stage: links
      stageUuid: "19ed62f1-13ba-8372-8431-095b9e0e7247"
    - stage: horo
      stageUuid: "11e7ba06-5d6f-8e53-8b16-1a3d9d3e0b4a"
    - stage: seal
      stageUuid: "c21462c1-945f-83a9-b3a3-757b6a51f92a"
    - stage: uuid
      stageUuid: "95e4bec9-c14b-83d1-ad1e-f579c724efc7"
version: 2
---
# tenant/role — the reference profiles register themselves by being imported

Importing this barrel pulls in the four reference tenant profiles — business, payment provider,
bank, government — so any code holding the registry sees them without naming each.

A profile is what a tenant of that kind starts as. Keeping the four beside the registry is what
stops a fifth being invented ad hoc at a call site.

Composes: [[tenant]] · [[law]].
