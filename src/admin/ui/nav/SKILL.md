---
name: nav
description: "Use when reasoning about nav — builds the corpus links from the atom prefix tree. A hand-maintained menu is a second source of truth about where things live, and it goes stale the first time a folder moves…"
atomPath: "admin/ui/nav"
coordinate: "admin/ui/nav · 5/round · 0fda4662"
contentUuid: "a706ca8a-0bc4-58c0-9ba0-2ffd64bc21d1"
diamondUuid: "2c9e90ce-8b79-8f8a-a388-530fafafc1e6"
uuid: "0fda4662-3762-80d9-92d6-cb926d0d85ec"
horo: 5
typography:
  partition: admin
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "ec9e3212-44ee-81e8-ae6e-2583a4af830c"
  stages:
    - stage: path
      stageUuid: "690ce8c9-12b4-8581-89e1-1b9f692f80a1"
    - stage: trinity
      stageUuid: "fbfeb28a-65ba-8c3c-b088-0b52826f568e"
    - stage: boundary
      stageUuid: "be1c0a36-e83a-8712-9fe5-2c24630f72fa"
    - stage: links
      stageUuid: "364b9fba-b486-8be1-b65a-5c9fd8ade381"
    - stage: horo
      stageUuid: "04aa08a2-4961-8edb-882b-d6a5e5ad3fe5"
    - stage: seal
      stageUuid: "0dc92d7e-830e-8a31-b977-2e1f1a3f725b"
    - stage: uuid
      stageUuid: "68fd82d6-f2dc-8a72-aeaf-1cf34416f129"
version: 2
---
# admin/ui/nav — the sidebar is derived from the path tree, never from a typed menu

`CorpusNavLinks` builds the corpus links from the atom prefix tree. A hand-maintained menu is a
second source of truth about where things live, and it goes stale the first time a folder moves
without someone remembering it.

Composes: [[law]].
