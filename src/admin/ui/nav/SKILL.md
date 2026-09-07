---
name: nav
description: "Use when reasoning about nav — builds the corpus links from the atom prefix tree. A hand-maintained menu is a second source of truth about where things live, and it goes stale the first time a folder moves…"
atomPath: "admin/ui/nav"
coordinate: "admin/ui/nav · 7/descent · a3e3235e"
contentUuid: "9f8d980b-1b72-54f7-80ec-0cfcd8593397"
diamondUuid: "965d986e-8233-81a3-9a10-322fcc1d5df3"
uuid: "a3e3235e-9227-864d-8b5e-214bb0be11ff"
horo: 7
typography:
  partition: admin
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "51f717e2-5cb7-8df5-815e-3d44ee31fc77"
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
      stageUuid: "54b0a6b3-fd7f-8f9d-a6a5-3ff9d43fe693"
    - stage: seal
      stageUuid: "0dc92d7e-830e-8a31-b977-2e1f1a3f725b"
    - stage: uuid
      stageUuid: "85c4b06f-b8ad-8de2-afeb-41cfda0da753"
version: 2
---
# admin/ui/nav — the sidebar is derived from the path tree, never from a typed menu

`CorpusNavLinks` builds the corpus links from the atom prefix tree. A hand-maintained menu is a
second source of truth about where things live, and it goes stale the first time a folder moves
without someone remembering it.

Composes: [[law]].
