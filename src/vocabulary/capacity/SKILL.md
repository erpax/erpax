---
name: capacity
description: "Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations."
atomPath: "vocabulary/capacity"
coordinate: "vocabulary/capacity · 5/round · d3b6c802"
contentUuid: "1343b4f0-8468-5f71-8b44-0165e25f2b9c"
diamondUuid: "d8438ca7-4c7e-8bd8-9a1b-b07ee4a4e82b"
uuid: "d3b6c802-36e4-8d39-8257-adf36c1cb154"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 100
standards: []
bindings: []
signatures:
  computationUuid: "398b02ff-432a-8a1b-89bb-84a92794b009"
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
      stageUuid: "695a220f-dbb4-8fa6-b6f3-1e8a7ce5dbb7"
    - stage: seal
      stageUuid: "3a7feeec-d5cb-83bb-a9e6-8240084cf923"
    - stage: uuid
      stageUuid: "58140e63-b99a-8a32-87ff-49f2da7b3875"
version: 2
---
# capacity

Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations.

Composes: [[work/centers]] · [[work/shifts|WorkShifts]] · [[rate]] · [[measure]] · [[bottleneck]].

## Standards
- ISO-8402 (quality mgmt capacity)
