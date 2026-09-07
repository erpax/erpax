---
name: tenure
description: "Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations."
atomPath: tenure
coordinate: "tenure · 5/round · 1cd5d179"
contentUuid: "543135af-4ded-5ef8-aa8c-60cd376a2599"
diamondUuid: "d29c1017-9cc8-8445-b96c-e4804aca8c1a"
uuid: "1cd5d179-ca4f-87aa-95f0-377b06d33941"
horo: 5
typography:
  partition: tenure
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "e3f498f2-b7ab-8c63-815b-27cb9e6cbbf2"
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
      stageUuid: "537d8d48-903e-8f57-bd79-8f9af1e3531d"
    - stage: seal
      stageUuid: "2a8c031b-24ec-81f5-9713-e40442b972b6"
    - stage: uuid
      stageUuid: "53764163-da39-8b38-a235-1838e188b0c3"
version: 2
---
# tenure

Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations.

Composes: [[Employees]] · [[time]] · [[employees/share/based/payments]] · [[positions]] · [[accrual]].

## Standards
- IFRS-2 vesting schedules
- employment law for benefits accrual
