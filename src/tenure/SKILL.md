---
name: tenure
description: "Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations."
atomPath: tenure
coordinate: tenure · 1/base · 9789e719
contentUuid: "f832801d-f24b-50c5-affc-dda767dbbd34"
diamondUuid: "6d123ba2-1d90-8977-9bc4-16b8be683fcd"
uuid: "9789e719-cb68-8970-aebc-3f49ab81fdbd"
horo: 1
bonds:
  in:
    - accrual
    - attrition
    - compensation
    - employees
    - forestry
    - payments
    - positions
    - time
  out:
    - accrual
    - attrition
    - compensation
    - employees
    - forestry
    - payments
    - positions
    - time
typography:
  partition: tenure
  bondDegree: 24
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - accrual
    - employees
    - payments
    - positions
    - time
  matrix:
    - accrual
    - attrition
    - compensation
    - employees
    - forestry
    - payments
    - positions
    - time
  backlinks:
    - accrual
    - attrition
    - compensation
    - employees
    - forestry
    - payments
    - positions
    - time
signatures:
  computationUuid: "954d8dbb-2c0b-8e20-9523-83937fe603ce"
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
      stageUuid: "3233fd7a-a59e-870f-9dc4-e1b3001eb6ff"
    - stage: seal
      stageUuid: "541c8d4e-ca69-8840-901f-87992c39cb11"
    - stage: uuid
      stageUuid: "997d519a-1abb-888b-9416-4830e310f501"
version: 2
---
# tenure

Use when tracking employment duration, anniversaries, or vesting schedules — hire date, current tenure, service-based benefits accrual, or eligibility calculations.

Composes: [[Employees]] · [[time]] · [[employees/share/based/payments]] · [[positions]] · [[accrual]].

## Standards
- IFRS-2 vesting schedules
- employment law for benefits accrual
