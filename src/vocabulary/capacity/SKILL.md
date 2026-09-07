---
name: capacity
description: "Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations."
atomPath: "vocabulary/capacity"
coordinate: "vocabulary/capacity · 1/base · f72d7e93"
contentUuid: "cae531ff-25cc-5676-950b-283a4b5d0858"
diamondUuid: "f3a432f6-2ca9-87c5-9165-85fcc49153e6"
uuid: "f72d7e93-d50c-81d2-b73b-bd6e63b0c02f"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 98
standards: []
bindings: []
signatures:
  computationUuid: "8642a305-f585-8675-ab73-e97d56bc4d3d"
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
      stageUuid: "684c87dd-90ee-81db-8dc5-b6b6588d98af"
    - stage: seal
      stageUuid: "3a7feeec-d5cb-83bb-a9e6-8240084cf923"
    - stage: uuid
      stageUuid: "0280a557-6e2d-8437-a98c-22f7bfd39085"
version: 2
---
# capacity

Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations.

Composes: [[work/centers]] · [[work/shifts|WorkShifts]] · [[rate]] · [[measure]] · [[bottleneck]].

## Standards
- ISO-8402 (quality mgmt capacity)
