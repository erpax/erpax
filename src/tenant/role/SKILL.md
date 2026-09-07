---
name: role
description: "Use when reasoning about role — Importing this barrel pulls in the four reference tenant profiles — business, payment provider, bank, government — so any code holding the registry sees them without naming each."
atomPath: "tenant/role"
coordinate: "tenant/role · 5/round · e6461c4a"
contentUuid: "e9be7455-b8f0-5a9b-8290-25047d3d4b9c"
diamondUuid: "c7b85689-196e-8077-ada2-99c1860e853a"
uuid: "e6461c4a-e65a-82d4-9cfc-e03d37448631"
horo: 5
typography:
  partition: tenant
  bondDegree: 41
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-12207"
bindings: []
signatures:
  computationUuid: "cfba680c-278f-8b20-9131-a33834fee8e4"
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
      stageUuid: "2d78aad3-16a0-8eb6-ae7b-6c2c43d7b9e2"
    - stage: seal
      stageUuid: "c21462c1-945f-83a9-b3a3-757b6a51f92a"
    - stage: uuid
      stageUuid: "43f9d651-0ef9-8908-91bd-cf8fc44526cd"
version: 2
---
# tenant/role — the reference profiles register themselves by being imported

Importing this barrel pulls in the four reference tenant profiles — business, payment provider,
bank, government — so any code holding the registry sees them without naming each.

A profile is what a tenant of that kind starts as. Keeping the four beside the registry is what
stops a fifth being invented ad hoc at a call site.

Composes: [[tenant]] · [[law]].
