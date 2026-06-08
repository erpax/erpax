---
name: attrition
description: "Use when measuring workforce loss — headcount change, turnover rate, voluntary/involuntary separation, retention metrics. The observed flow of people leaving vs staying."
atomPath: attrition
coordinate: attrition · 4/weave · 6d7d607f
contentUuid: "d4186c94-d3d5-5950-a87f-3dfee821013c"
diamondUuid: "7b6b2a15-e5dd-8f09-8f7c-88a243a529de"
uuid: "6d7d607f-637f-808b-bb00-2cf7785865d1"
horo: 4
bonds:
  in:
    - employees
    - metric
    - satisfaction
    - status
    - tenure
    - time
  out:
    - employees
    - metric
    - satisfaction
    - status
    - tenure
    - time
typography:
  partition: attrition
  bondDegree: 18
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - employees
    - metric
    - satisfaction
    - status
    - tenure
    - time
  matrix:
    - employees
    - metric
    - satisfaction
    - status
    - tenure
    - time
  backlinks:
    - employees
    - metric
    - satisfaction
    - status
    - tenure
    - time
signatures:
  computationUuid: "6e9589f1-79ad-8fb8-a872-dbe59cd9ec17"
  stages:
    - stage: path
      stageUuid: "eff64236-1955-83f1-bddc-0493e2e34e61"
    - stage: trinity
      stageUuid: "5f626968-f8d4-80a0-b198-5b4e76473aef"
    - stage: boundary
      stageUuid: "a5b34a17-f25d-80b3-9a66-35a2315e6bba"
    - stage: links
      stageUuid: "283f7862-4a13-8f6b-83ad-b3d991f7cca3"
    - stage: horo
      stageUuid: "16be9524-fb1d-8405-bf0b-c1d81b749db1"
    - stage: seal
      stageUuid: "a0b53c9d-b9d4-89ef-b587-0b8258c70dac"
    - stage: uuid
      stageUuid: "ae93d7f7-2c99-89ec-961d-b19b3505198a"
version: 2
---
# attrition

Use when measuring workforce loss — headcount change, turnover rate, voluntary/involuntary separation, retention metrics. The observed flow of people leaving vs staying.

Composes: [[Employees]] · [[time]] · [[status]] · [[tenure]] · [[satisfaction]] · [[metric]].

## Standards
- SHRM metrics
- BLS labor statistics
