---
name: cells
description: "Use when reasoning about cells — Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip, the horo digit, the path as an account code, the seal as a badge."
atomPath: "admin/ui/cells"
coordinate: "admin/ui/cells · 2/share · ee65b2bf"
contentUuid: "183eb82e-1da6-5d28-8138-11d70b6d5930"
diamondUuid: "267e42c0-7be3-8b1b-a4ab-f7c2aa50cb76"
uuid: "ee65b2bf-da62-84dc-9a1b-aedb9a83f86e"
horo: 2
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "10562686-f3df-8d2b-904b-2679d147fa9b"
  stages:
    - stage: path
      stageUuid: "afc3ce1c-e90a-8a82-9024-d2f05558d85c"
    - stage: trinity
      stageUuid: "aad2e0af-9c51-82ac-acd1-e5f42915f05a"
    - stage: boundary
      stageUuid: "97e5fa27-dd2c-86b5-94aa-0a38c17522f9"
    - stage: links
      stageUuid: "572cf3f2-0adb-8d3d-81ed-dc50add8c253"
    - stage: horo
      stageUuid: "928dae02-cef1-8028-b3e0-8e4870125d07"
    - stage: seal
      stageUuid: "7c494136-4b03-89a1-97ab-fb0482263c91"
    - stage: uuid
      stageUuid: "afb11ab5-3c88-8d1f-85aa-9c4a5187b57a"
version: 2
---
# admin/ui/cells — a list column renders the corpus's own coordinates, not a raw string

Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip,
the horo digit, the path as an account code, the seal as a badge. A row in the admin panel is
therefore readable as an ADDRESS — where the atom sits, whether it is sealed — without opening it.

Rendering the raw uuid instead would put 36 characters in a column and say nothing.

Composes: [[law]].
