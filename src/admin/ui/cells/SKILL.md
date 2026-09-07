---
name: cells
description: "Use when reasoning about cells — Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip, the horo digit, the path as an account code, the seal as a badge."
atomPath: "admin/ui/cells"
coordinate: "admin/ui/cells · 2/share · 9da49cfd"
contentUuid: "92140138-9a12-5e13-a7d5-e0c9bea3f40f"
diamondUuid: "a11cc889-b449-8b49-b86b-7baad9eee1c1"
uuid: "9da49cfd-cfa5-8992-b227-079be1ad4415"
horo: 2
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "7d4cdfe2-7c58-85ec-8dbf-3ab7bb3e6610"
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
      stageUuid: "cc36a8e8-f6e9-89b9-8106-aeceddce2918"
    - stage: seal
      stageUuid: "7c494136-4b03-89a1-97ab-fb0482263c91"
    - stage: uuid
      stageUuid: "3fce2224-4eda-82e0-b955-95dcf3a28670"
version: 2
---
# admin/ui/cells — a list column renders the corpus's own coordinates, not a raw string

Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip,
the horo digit, the path as an account code, the seal as a badge. A row in the admin panel is
therefore readable as an ADDRESS — where the atom sits, whether it is sealed — without opening it.

Rendering the raw uuid instead would put 36 characters in a column and say nothing.

Composes: [[law]].
