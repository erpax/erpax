---
name: tenure
description: "Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations."
atomPath: tenure
coordinate: "tenure · 5/round · 74813fb2"
contentUuid: "91df29d9-eb46-5a12-8de0-a63c28c5d112"
diamondUuid: "f876fe5c-d347-8814-bd18-a38b7af4dccf"
uuid: "74813fb2-1b0e-8a0b-8ab0-788337646f40"
horo: 5
typography:
  partition: tenure
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "eacb33a4-fec0-8bd9-9a9c-4a535d3121d1"
  stages:
    - stage: path
      stageUuid: "936814bc-89bc-8ebf-bf3a-a69c064f3247"
    - stage: trinity
      stageUuid: "af781ca3-0a20-8437-9bc7-337493401eb9"
    - stage: boundary
      stageUuid: "9dc4b2bf-b0c1-8d69-b9d8-4cc689767f48"
    - stage: links
      stageUuid: "2551869a-4437-88e7-bc0a-f4b5894bec89"
    - stage: horo
      stageUuid: "1e71ba2f-b8fb-8fa1-a72f-cbc6fabadeda"
    - stage: seal
      stageUuid: "2a8c031b-24ec-81f5-9713-e40442b972b6"
    - stage: uuid
      stageUuid: "271440d4-09ce-893f-9152-cd69b7a67369"
version: 2
---
# tenure

Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations.

Composes: [[Employees]] · [[time]] · [[employees/share/based/payments]] · [[positions]] · [[accrual]].

## Standards
- IFRS-2 vesting schedules
- employment law for benefits accrual
