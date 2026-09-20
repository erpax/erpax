---
name: capacity
description: "Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations."
atomPath: "vocabulary/capacity"
coordinate: "vocabulary/capacity · 1/base · 38803f96"
contentUuid: "4c5fad6a-bc69-5dc1-a7a2-5037e86fc8f0"
diamondUuid: "ffd6a19a-09d0-8d4c-b710-b71d510ee678"
uuid: "38803f96-4a28-85f8-a007-f236a937a6a3"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 97
standards: []
bindings: []
signatures:
  computationUuid: "20ee24ea-cf1c-8593-a2b7-7e603fdc138b"
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
      stageUuid: "adc785ce-585a-8f08-be87-e38d4d2de4e3"
    - stage: seal
      stageUuid: "3a7feeec-d5cb-83bb-a9e6-8240084cf923"
    - stage: uuid
      stageUuid: "7648635a-4ac8-8da0-97aa-073de7647bc4"
version: 2
---
# capacity

Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations.

Composes: [[work/centers]] · [[work/shifts|WorkShifts]] · [[rate]] · [[measure]] · [[bottleneck]].

## Standards
- ISO-8402 (quality mgmt capacity)
