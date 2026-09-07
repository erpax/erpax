---
name: fields
description: "Use when reasoning about fields — shows the atom's coordinates, its bonds, and the entanglement fields warn when a change reaches further than the row in front of the editor."
atomPath: "admin/ui/fields"
coordinate: "admin/ui/fields · 5/round · ea649f82"
contentUuid: "835a9b3a-41a0-5ab8-a597-16053cdfcdbb"
diamondUuid: "5944bbb4-4c41-85f0-a3a0-9715c9138890"
uuid: "ea649f82-4646-88a6-9515-a5b6ee6f94b6"
horo: 5
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "33032b89-9d86-8f8f-87f5-9226ba06b072"
  stages:
    - stage: path
      stageUuid: "8161ad72-76dc-8c16-b665-806197f96e83"
    - stage: trinity
      stageUuid: "714da587-9ef2-8d9a-a3bd-f05e0698bd06"
    - stage: boundary
      stageUuid: "4fda0eef-587f-8e4c-a98c-e72a454f4365"
    - stage: links
      stageUuid: "ca443174-a770-8b5d-bcc0-422ad45c10da"
    - stage: horo
      stageUuid: "03a6ddab-18b3-850a-8b21-54765ed98bac"
    - stage: seal
      stageUuid: "ccfec27c-65f2-8456-9a86-5c0ea28fadba"
    - stage: uuid
      stageUuid: "557c8529-a6cc-82d0-ac66-85860de238c4"
version: 2
---
# admin/ui/fields — the editor sees what the record is bonded to, while editing it

`ErpaxMetaField` shows the atom's coordinates, `MatrixBondField` its bonds, and the entanglement
fields warn when a change reaches further than the row in front of the editor.

A warning shown after saving is a report. Shown in the field, it is a decision the person can still
make.

Composes: [[law]].
