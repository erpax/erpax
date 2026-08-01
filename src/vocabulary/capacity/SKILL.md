---
name: capacity
description: "Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations."
atomPath: "vocabulary/capacity"
coordinate: "vocabulary/capacity · 1/base · 4d767a02"
contentUuid: "62d5036a-ecca-537b-aa1d-967c8a707ec5"
diamondUuid: "34589972-dbed-89f9-8823-81714a0bf725"
uuid: "4d767a02-f7ad-82d3-b483-af33c7198a0d"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 98
standards: []
bindings: []
signatures:
  computationUuid: "fff518cb-0c7e-8ca7-8bb3-a3d45dab5103"
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
      stageUuid: "e3c8c3ba-1d67-8b6e-86c1-7566d897e10f"
    - stage: seal
      stageUuid: "301b194c-90d1-8a3d-b1bb-152f67d963cc"
    - stage: uuid
      stageUuid: "92339b8d-1cc6-839a-98d8-229e7f1ea98c"
version: 2
---
# capacity

Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations.

Composes: [[work/centers]] · [[work/shifts|WorkShifts]] · [[rate]] · [[measure]] · [[bottleneck]].

## Standards
- ISO-8402 (quality mgmt capacity)
