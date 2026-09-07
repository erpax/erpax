---
name: fields
description: "Use when reasoning about fields — shows the atom's coordinates, its bonds, and the entanglement fields warn when a change reaches further than the row in front of the editor."
atomPath: "admin/ui/fields"
coordinate: "admin/ui/fields · 7/descent · b44f8d1a"
contentUuid: "dfe2eebe-8a1d-505b-8fbb-4e2d364fd78a"
diamondUuid: "8fe912d2-67d5-8220-8535-2573af229c30"
uuid: "b44f8d1a-ae14-81b7-8a2a-68717e4741b7"
horo: 7
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "857bfcb8-7874-8d14-84ce-abcc7412ed4d"
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
      stageUuid: "c8af3df8-a834-8d37-946a-14fa2c801a13"
    - stage: seal
      stageUuid: "ccfec27c-65f2-8456-9a86-5c0ea28fadba"
    - stage: uuid
      stageUuid: "9cbf07c5-5b85-80c4-89ed-0efc2e8c4209"
version: 2
---
# admin/ui/fields — the editor sees what the record is bonded to, while editing it

`ErpaxMetaField` shows the atom's coordinates, `MatrixBondField` its bonds, and the entanglement
fields warn when a change reaches further than the row in front of the editor.

A warning shown after saving is a report. Shown in the field, it is a decision the person can still
make.

Composes: [[law]].
