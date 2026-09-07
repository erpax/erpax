---
name: fields
description: "Use when reasoning about fields — shows the atom's coordinates, its bonds, and the entanglement fields warn when a change reaches further than the row in front of the editor."
atomPath: "admin/ui/fields"
coordinate: "admin/ui/fields · 4/weave · ca38b242"
contentUuid: "569de0c5-bc60-5fc3-ab64-24ce9b33ae72"
diamondUuid: "4cc2ad5e-4938-8536-a5ed-9a25cb87eba9"
uuid: "ca38b242-9d73-84f1-944b-7b5d1b32cb98"
horo: 4
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "b2489dda-1e02-8c64-893c-426835f91859"
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
      stageUuid: "6a1f2ba0-1e22-8756-8325-5b9f6204ee5c"
    - stage: seal
      stageUuid: "ccfec27c-65f2-8456-9a86-5c0ea28fadba"
    - stage: uuid
      stageUuid: "c773b47a-d2bb-8915-ac78-82094f677801"
version: 2
---
# admin/ui/fields — the editor sees what the record is bonded to, while editing it

`ErpaxMetaField` shows the atom's coordinates, `MatrixBondField` its bonds, and the entanglement
fields warn when a change reaches further than the row in front of the editor.

A warning shown after saving is a report. Shown in the field, it is a decision the person can still
make.

Composes: [[law]].
