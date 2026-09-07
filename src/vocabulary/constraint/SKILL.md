---
name: constraint
description: "Use when defining data constraints at the schema level — NOT NULL / UNIQUE / FOREIGN KEY / CHECK / DEFAULT constraints, their lifecycle (creation/modification/disable), enforcement semantics, and violation detection in the database layer."
atomPath: "vocabulary/constraint"
coordinate: "vocabulary/constraint · 1/base · 760bc96a"
contentUuid: "cca3f7dc-06c5-5083-982b-ecb6a760070e"
diamondUuid: "38a7acf8-510b-82e1-8120-1e18e9a62978"
uuid: "760bc96a-1f1b-8300-9607-06b6580f46ab"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "71fc53fc-49fc-8a0e-86a2-db2e39f96b75"
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
      stageUuid: "e2c7249d-9278-83cc-9a5f-a737f38fa829"
    - stage: seal
      stageUuid: "5e523d31-b6d5-8da4-ad51-3a57cdb52043"
    - stage: uuid
      stageUuid: "e20fa13d-635b-8d76-9499-f95945db23a2"
version: 2
---
# constraint

Use when defining data constraints at the schema level — NOT NULL / UNIQUE / FOREIGN KEY / CHECK / DEFAULT constraints, their lifecycle (creation/modification/disable), enforcement semantics, and violation detection in the database layer.

Composes: [[database]] · [[field]] · [[identity]] · [[nullability]] · [[schema]].

## Standards
- ISO/IEC 11179-1:2015 (metadata registry)
- SQL:2016
