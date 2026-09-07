---
name: role
description: "Use when reasoning about role — Importing this barrel pulls in the four reference tenant profiles — business, payment provider, bank, government — so any code holding the registry sees them without naming each."
atomPath: "tenant/role"
coordinate: "tenant/role · 5/round · 08905332"
contentUuid: "d462f580-7fa4-58b7-b018-f53797050887"
diamondUuid: "c59eea18-d7d6-8eb6-aef5-00a65cea70a8"
uuid: "08905332-48d2-8f72-980e-1cefa5f5ec3a"
horo: 5
typography:
  partition: tenant
  bondDegree: 41
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-12207"
bindings: []
signatures:
  computationUuid: "13c12ceb-07e7-8e9a-99b3-3a42fd8f0728"
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
      stageUuid: "740bdc17-3c34-855a-a3f1-64f5ef01cd3c"
    - stage: seal
      stageUuid: "c21462c1-945f-83a9-b3a3-757b6a51f92a"
    - stage: uuid
      stageUuid: "04e7ad58-6005-8158-82fb-e6989b41a0bb"
version: 2
---
# tenant/role — the reference profiles register themselves by being imported

Importing this barrel pulls in the four reference tenant profiles — business, payment provider,
bank, government — so any code holding the registry sees them without naming each.

A profile is what a tenant of that kind starts as. Keeping the four beside the registry is what
stops a fifth being invented ad hoc at a call site.

Composes: [[tenant]] · [[law]].
