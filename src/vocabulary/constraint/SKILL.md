---
name: constraint
description: "Use when defining data constraints at the schema level — NOT NULL / UNIQUE / FOREIGN KEY / CHECK / DEFAULT constraints, their lifecycle (creation/modification/disable), enforcement semantics, and violation detection in the database layer."
atomPath: "vocabulary/constraint"
coordinate: "vocabulary/constraint · 5/round · 7a957a98"
contentUuid: "e8e2a16f-f7e3-5040-87e6-4ba3ca846764"
diamondUuid: "995e7d08-674b-8efc-ac81-99948cd670a2"
uuid: "7a957a98-5d15-8b78-8570-fcee26dc622a"
horo: 5
typography:
  partition: vocabulary
  bondDegree: 30
standards: []
bindings: []
signatures:
  computationUuid: "3d498d51-7fa3-85af-aa40-b65469b18440"
  stages:
    - stage: path
      stageUuid: "508a6b44-6a81-89f1-a614-5a26b071db24"
    - stage: trinity
      stageUuid: "2264bc54-7d03-8c9a-a4e2-7d66e9e11479"
    - stage: boundary
      stageUuid: "5d5c692e-f239-890e-962c-4cef19ca4070"
    - stage: links
      stageUuid: "7d9ea101-caf0-87c3-96b4-57246a0c02d9"
    - stage: horo
      stageUuid: "ab69d183-9e63-8bf9-a00f-fe34663987b0"
    - stage: seal
      stageUuid: "5e523d31-b6d5-8da4-ad51-3a57cdb52043"
    - stage: uuid
      stageUuid: "2f6cbff0-cf8d-8991-9a10-513b5a28e680"
version: 2
---
# constraint

Use when defining data constraints at the schema level — NOT NULL / UNIQUE / FOREIGN KEY / CHECK / DEFAULT constraints, their lifecycle (creation/modification/disable), enforcement semantics, and violation detection in the database layer.

Composes: [[database]] · [[field]] · [[identity]] · [[nullability]] · [[schema]].

## Standards
- ISO/IEC 11179-1:2015 (metadata registry)
- SQL:2016
