---
name: cells
description: "Use when reasoning about cells — Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip, the horo digit, the path as an account code, the seal as a badge."
atomPath: "admin/ui/cells"
coordinate: "admin/ui/cells · 1/base · 3050fb0b"
contentUuid: "28ec9a54-95ae-5f66-a72b-f4feb9036cb9"
diamondUuid: "63456af7-3f65-8235-bfdd-8b99b522cfdc"
uuid: "3050fb0b-c069-8397-8f0b-2c77019ac61d"
horo: 1
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "4bd678e7-9db5-8629-9d9e-519056252051"
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
      stageUuid: "a7198c43-35a7-8ee7-8906-8952d42881c4"
    - stage: seal
      stageUuid: "7c494136-4b03-89a1-97ab-fb0482263c91"
    - stage: uuid
      stageUuid: "bd419c33-1d6e-8695-b1bb-ba797d9df210"
version: 2
---
# admin/ui/cells — a list column renders the corpus's own coordinates, not a raw string

Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip,
the horo digit, the path as an account code, the seal as a badge. A row in the admin panel is
therefore readable as an ADDRESS — where the atom sits, whether it is sealed — without opening it.

Rendering the raw uuid instead would put 36 characters in a column and say nothing.

Composes: [[law]].
