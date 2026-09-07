---
name: role
description: "Use when reasoning about role — Importing this barrel pulls in the four reference tenant profiles — business, payment provider, bank, government — so any code holding the registry sees them without naming each."
atomPath: "tenant/role"
coordinate: "tenant/role · 5/round · aa11f6e8"
contentUuid: "f881db81-b226-5b3a-a3a9-e86f082b0a8b"
diamondUuid: "67205925-a380-8031-914e-51e14eff8a84"
uuid: "aa11f6e8-439a-8983-8094-271359697a3d"
horo: 5
typography:
  partition: tenant
  bondDegree: 41
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-12207"
bindings: []
signatures:
  computationUuid: "38d7135d-4c38-85bf-a379-45eed7fdf13b"
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
      stageUuid: "f0d41ca5-ff47-8c24-b4a6-e86cc27db91d"
    - stage: seal
      stageUuid: "c21462c1-945f-83a9-b3a3-757b6a51f92a"
    - stage: uuid
      stageUuid: "c39ff64a-d509-82d0-bbf5-fa23b818f34a"
version: 2
---
# tenant/role — the reference profiles register themselves by being imported

Importing this barrel pulls in the four reference tenant profiles — business, payment provider,
bank, government — so any code holding the registry sees them without naming each.

A profile is what a tenant of that kind starts as. Keeping the four beside the registry is what
stops a fifth being invented ad hoc at a call site.

Composes: [[tenant]] · [[law]].
