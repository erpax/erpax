---
name: cells
description: "Use when reasoning about cells — Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip, the horo digit, the path as an account code, the seal as a badge."
atomPath: "admin/ui/cells"
coordinate: "admin/ui/cells · 8/crest · cfcdb1d7"
contentUuid: "8302708f-290a-50c9-ab3a-ea65299832fa"
diamondUuid: "518a41e7-cb63-8d7a-9f73-67d42b92a6a0"
uuid: "cfcdb1d7-f8ed-8b19-9a71-5a3e60b91d89"
horo: 8
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "b76f472a-d960-89a4-af68-2c4457c46924"
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
      stageUuid: "5f263720-026b-8a73-af07-031bfeb74f6f"
    - stage: seal
      stageUuid: "7c494136-4b03-89a1-97ab-fb0482263c91"
    - stage: uuid
      stageUuid: "2fce0c8e-e780-8d55-8d32-d0f3719c589d"
version: 2
---
# admin/ui/cells — a list column renders the corpus's own coordinates, not a raw string

Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip,
the horo digit, the path as an account code, the seal as a badge. A row in the admin panel is
therefore readable as an ADDRESS — where the atom sits, whether it is sealed — without opening it.

Rendering the raw uuid instead would put 36 characters in a column and say nothing.

Composes: [[law]].
