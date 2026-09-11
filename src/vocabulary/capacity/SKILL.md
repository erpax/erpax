---
name: capacity
description: "Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations."
atomPath: "vocabulary/capacity"
coordinate: "vocabulary/capacity · 1/base · 38803f96"
contentUuid: "31381917-8065-571b-acd4-8d912ddab5c6"
diamondUuid: "a8a2aad9-07eb-81a1-a389-2f526c9c2544"
uuid: "38803f96-4a28-85f8-a007-f236a937a6a3"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 100
standards: []
bindings: []
signatures:
  computationUuid: "7685c5d2-4281-88e5-9d59-93739509ec61"
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
      stageUuid: "bc2eb5e0-24b2-8c68-a1d6-4a6fba125d02"
    - stage: seal
      stageUuid: "3a7feeec-d5cb-83bb-a9e6-8240084cf923"
    - stage: uuid
      stageUuid: "c0175aa1-30df-8079-9944-6bf85a0621ac"
version: 2
---
# capacity

Use when planning, tracking, or optimizing resource capacity — workforce availability, machine utilization, warehouse/facility space, or bottleneck detection per work-center/shift/period. The binding constraint in operations.

Composes: [[work/centers]] · [[work/shifts|WorkShifts]] · [[rate]] · [[measure]] · [[bottleneck]].

## Standards
- ISO-8402 (quality mgmt capacity)
