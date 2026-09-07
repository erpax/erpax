---
name: constraint
description: "Use when defining data constraints at the schema level — NOT NULL / UNIQUE / FOREIGN KEY / CHECK / DEFAULT constraints, their lifecycle (creation/modification/disable), enforcement semantics, and violation detection in the database layer."
atomPath: "vocabulary/constraint"
coordinate: "vocabulary/constraint · 1/base · 152fc3ad"
contentUuid: "7169aa87-498a-5ece-a78e-70ab1fbec635"
diamondUuid: "24427cc3-ab7e-885e-9433-46c5c3037df2"
uuid: "152fc3ad-3f5b-8b73-b56e-a4cd510bbee0"
horo: 1
typography:
  partition: vocabulary
  bondDegree: 33
standards: []
bindings: []
signatures:
  computationUuid: "a9c3b71b-a813-81fa-a3de-7729dc6554e0"
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
      stageUuid: "76681e95-8d15-87e8-8217-1b37c5478199"
    - stage: seal
      stageUuid: "5e523d31-b6d5-8da4-ad51-3a57cdb52043"
    - stage: uuid
      stageUuid: "b8674339-9f68-8195-b895-0d52a19671c8"
version: 2
---
# constraint

Use when defining data constraints at the schema level — NOT NULL / UNIQUE / FOREIGN KEY / CHECK / DEFAULT constraints, their lifecycle (creation/modification/disable), enforcement semantics, and violation detection in the database layer.

Composes: [[database]] · [[field]] · [[identity]] · [[nullability]] · [[schema]].

## Standards
- ISO/IEC 11179-1:2015 (metadata registry)
- SQL:2016
