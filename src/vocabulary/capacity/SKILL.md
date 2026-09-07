---
name: capacity
description: "Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations."
atomPath: "vocabulary/capacity"
coordinate: "vocabulary/capacity · 2/share · a2ea5a6a"
contentUuid: "85370bf5-994a-5a75-972f-73d77ee90d80"
diamondUuid: "ea3a290d-64cd-80ff-8215-7d0c4ad33fef"
uuid: "a2ea5a6a-a666-8504-ad78-50119a2d6c5f"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 100
standards: []
bindings: []
signatures:
  computationUuid: "d737a2df-1e8b-81cf-855e-e9f150a9c400"
  stages:
    - stage: path
      stageUuid: "b7c5c918-f2ff-8d81-aee9-4cf342da9e68"
    - stage: trinity
      stageUuid: "55d20593-deae-8d15-bca7-13621e8c4ded"
    - stage: boundary
      stageUuid: "cc4f8d7c-56c9-8be7-abde-bf98df7caac3"
    - stage: links
      stageUuid: "2e32e34a-699f-8977-a0ef-17ea86b4eacf"
    - stage: horo
      stageUuid: "80842c25-7a87-8456-ab02-ad58e6a93a5e"
    - stage: seal
      stageUuid: "3a7feeec-d5cb-83bb-a9e6-8240084cf923"
    - stage: uuid
      stageUuid: "72c635eb-6478-8160-a6c5-646e30d2b52c"
version: 2
---
# capacity

Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations.

Composes: [[work/centers]] · [[work/shifts|WorkShifts]] · [[rate]] · [[measure]] · [[bottleneck]].

## Standards
- ISO-8402 (quality mgmt capacity)
