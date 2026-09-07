---
name: fields
description: "Use when reasoning about fields — shows the atom's coordinates, its bonds, and the entanglement fields warn when a change reaches further than the row in front of the editor."
atomPath: "admin/ui/fields"
coordinate: "admin/ui/fields · 5/round · fd5fb46e"
contentUuid: "e3a85c19-aa90-5f06-9212-faf838110073"
diamondUuid: "2f419264-aa37-817f-8356-05e7a31f3ae6"
uuid: "fd5fb46e-53d2-8083-b64d-2a18ae36c6a4"
horo: 5
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "67de1151-1164-8e67-9ecb-a218c5231251"
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
      stageUuid: "eaa9cf69-7c33-8eef-94dd-08346c4e3b31"
    - stage: seal
      stageUuid: "ccfec27c-65f2-8456-9a86-5c0ea28fadba"
    - stage: uuid
      stageUuid: "66e16507-a80a-8392-a5c2-8644ec736b8d"
version: 2
---
# admin/ui/fields — the editor sees what the record is bonded to, while editing it

`ErpaxMetaField` shows the atom's coordinates, `MatrixBondField` its bonds, and the entanglement
fields warn when a change reaches further than the row in front of the editor.

A warning shown after saving is a report. Shown in the field, it is a decision the person can still
make.

Composes: [[law]].
