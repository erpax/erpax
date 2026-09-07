---
name: nav
description: "Use when reasoning about nav — builds the corpus links from the atom prefix tree. A hand-maintained menu is a second source of truth about where things live, and it goes stale the first time a folder moves…"
atomPath: "admin/ui/nav"
coordinate: "admin/ui/nav · 2/share · d19bb88c"
contentUuid: "1ce3bb13-062d-5eb7-b624-931696100de9"
diamondUuid: "493a71e1-bf5f-8332-a399-3b144569576e"
uuid: "d19bb88c-be62-89fd-a5e6-3124ac825908"
horo: 2
typography:
  partition: admin
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "2e1242ff-ad79-8aa0-9958-f1fd081bafd8"
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
      stageUuid: "4e452abd-b1f4-89dd-b8b1-07a0a751b0d0"
    - stage: seal
      stageUuid: "0dc92d7e-830e-8a31-b977-2e1f1a3f725b"
    - stage: uuid
      stageUuid: "3062dd1b-2c9e-8c5a-9bae-5e3d59de5d41"
version: 2
---
# admin/ui/nav — the sidebar is derived from the path tree, never from a typed menu

`CorpusNavLinks` builds the corpus links from the atom prefix tree. A hand-maintained menu is a
second source of truth about where things live, and it goes stale the first time a folder moves
without someone remembering it.

Composes: [[law]].
