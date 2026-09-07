---
name: tenure
description: "Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations."
atomPath: tenure
coordinate: "tenure · 2/share · 5e3ff7b9"
contentUuid: "1a972d73-fe82-5a5f-bdb9-26722315996d"
diamondUuid: "216911bf-6fb0-81ec-a5a8-6ee585707cd3"
uuid: "5e3ff7b9-299a-8108-9d3c-6b05749aa607"
horo: 2
typography:
  partition: tenure
  bondDegree: 24
standards: []
bindings: []
signatures:
  computationUuid: "6bca0faa-2612-8d32-b805-f6ef7a0f3c73"
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
      stageUuid: "a7ef6e8a-5944-8534-933e-dd95f021237d"
    - stage: seal
      stageUuid: "2a8c031b-24ec-81f5-9713-e40442b972b6"
    - stage: uuid
      stageUuid: "db2caf77-5d36-8880-a718-a777965b6f5f"
version: 2
---
# tenure

Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations.

Composes: [[Employees]] · [[time]] · [[employees/share/based/payments]] · [[positions]] · [[accrual]].

## Standards
- IFRS-2 vesting schedules
- employment law for benefits accrual
