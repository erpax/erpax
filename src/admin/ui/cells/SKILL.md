---
name: cells
description: "Use when reasoning about cells — Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip, the horo digit, the path as an account code, the seal as a badge."
atomPath: "admin/ui/cells"
coordinate: "admin/ui/cells · 2/share · d2184700"
contentUuid: "1d1fa994-2e81-521b-beaf-16b026434ea0"
diamondUuid: "5a1e4371-b609-81e3-8a44-e647fe3b89bd"
uuid: "d2184700-c1b9-8120-98fa-af8c8c5eed4b"
horo: 2
typography:
  partition: admin
  bondDegree: 3
standards: []
bindings: []
signatures:
  computationUuid: "24fd9e3c-b3b1-83c0-8694-1b1234e1b67e"
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
      stageUuid: "e7b57a51-b36e-813c-966c-d2791df3f349"
    - stage: seal
      stageUuid: "7c494136-4b03-89a1-97ab-fb0482263c91"
    - stage: uuid
      stageUuid: "eb9252e4-57e5-8630-b78f-a943bcc62797"
version: 2
---
# admin/ui/cells — a list column renders the corpus's own coordinates, not a raw string

Four cells, each showing a value the corpus computes rather than stores: the content-uuid as a chip,
the horo digit, the path as an account code, the seal as a badge. A row in the admin panel is
therefore readable as an ADDRESS — where the atom sits, whether it is sealed — without opening it.

Rendering the raw uuid instead would put 36 characters in a column and say nothing.

Composes: [[law]].
