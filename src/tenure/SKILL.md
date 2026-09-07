---
name: tenure
description: "Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations."
atomPath: tenure
coordinate: "tenure · 5/round · ba6ae066"
contentUuid: "0882f650-a52d-5231-8bc3-87b0915f8121"
diamondUuid: "f815ca35-78c8-8317-ad5a-c6aba0cbe2ed"
uuid: "ba6ae066-4cd8-8bf4-95f1-359280101a0b"
horo: 5
typography:
  partition: tenure
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "3b7c0957-99e5-87cc-bd3e-aef2a09080a3"
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
      stageUuid: "9d1a47fe-2bce-8a22-97ed-1e284febd29a"
    - stage: seal
      stageUuid: "2a8c031b-24ec-81f5-9713-e40442b972b6"
    - stage: uuid
      stageUuid: "d7f57953-7e56-8384-a785-fe495dfc5c5c"
version: 2
---
# tenure

Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations.

Composes: [[Employees]] · [[time]] · [[employees/share/based/payments]] · [[positions]] · [[accrual]].

## Standards
- IFRS-2 vesting schedules
- employment law for benefits accrual
