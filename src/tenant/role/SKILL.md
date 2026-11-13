---
name: role
description: "Use when reasoning about role — Importing this barrel pulls in the four reference tenant profiles — business, payment provider, bank, government — so any code holding the registry sees them without naming each."
atomPath: "tenant/role"
coordinate: "tenant/role · 8/crest · 45fb5b45"
contentUuid: "788cc075-f8da-5b38-920f-7f364f37ed3d"
diamondUuid: "d5ded36e-9117-8e48-9bc4-2c2beaafb772"
uuid: "45fb5b45-8bdb-8dd0-9924-8d15849828a3"
horo: 8
typography:
  partition: tenant
  bondDegree: 22
standards:
  - "ISO/IEC 25010:2023 §5.4 reusability"
  - "ISO/IEC-12207"
bindings: []
signatures:
  computationUuid: "df68a880-b3a2-8ae5-87b3-8b37f10d4bf4"
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
      stageUuid: "6c99f3f5-76cd-8af0-a1fc-79f41c06e0d8"
    - stage: seal
      stageUuid: "c21462c1-945f-83a9-b3a3-757b6a51f92a"
    - stage: uuid
      stageUuid: "efc386f5-a148-872c-a164-32c718d41f63"
version: 2
---
# tenant/role — the reference profiles register themselves by being imported

Importing this barrel pulls in the four reference tenant profiles — business, payment provider,
bank, government — so any code holding the registry sees them without naming each.

A profile is what a tenant of that kind starts as. Keeping the four beside the registry is what
stops a fifth being invented ad hoc at a call site.

Composes: [[tenant]] · [[law]].
