---
name: fields
description: "Use when reasoning about fields — shows the atom's coordinates, its bonds, and the entanglement fields warn when a change reaches further than the row in front of the editor."
atomPath: "admin/ui/fields"
coordinate: "admin/ui/fields · 7/descent · 9b168420"
contentUuid: "9431e4ff-9b2e-5010-b5e8-cea943c408cd"
diamondUuid: "858f4782-e2f6-856c-81a8-405a619dc7a6"
uuid: "9b168420-f820-8aeb-acb0-afb43cd27ecb"
horo: 7
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "6b05476c-49e8-81fd-9765-d31b85f3ef1b"
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
      stageUuid: "19c7807c-6c5c-834f-96a6-a7ec6d59443d"
    - stage: seal
      stageUuid: "ccfec27c-65f2-8456-9a86-5c0ea28fadba"
    - stage: uuid
      stageUuid: "c7d28958-6eac-80c0-845a-0b71013b5503"
version: 2
---
# admin/ui/fields — the editor sees what the record is bonded to, while editing it

`ErpaxMetaField` shows the atom's coordinates, `MatrixBondField` its bonds, and the entanglement
fields warn when a change reaches further than the row in front of the editor.

A warning shown after saving is a report. Shown in the field, it is a decision the person can still
make.

Composes: [[law]].
