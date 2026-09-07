---
name: nav
description: "Use when reasoning about nav — builds the corpus links from the atom prefix tree. A hand-maintained menu is a second source of truth about where things live, and it goes stale the first time a folder moves…"
atomPath: "admin/ui/nav"
coordinate: "admin/ui/nav · 2/share · 4613fed2"
contentUuid: "5df68c10-6093-5539-a2ad-94f2cea91d27"
diamondUuid: "fca58768-a640-8e51-b054-0651f009a138"
uuid: "4613fed2-870b-8108-aad4-e2dfcf202c55"
horo: 2
typography:
  partition: admin
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "6e4de1a4-cf8c-8f2f-a607-ea1d1e155d8a"
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
      stageUuid: "56f2e27f-362f-8bf7-9274-e4e321cc3e83"
    - stage: seal
      stageUuid: "0dc92d7e-830e-8a31-b977-2e1f1a3f725b"
    - stage: uuid
      stageUuid: "110808be-520a-8a0b-9281-790eca331ddc"
version: 2
---
# admin/ui/nav — the sidebar is derived from the path tree, never from a typed menu

`CorpusNavLinks` builds the corpus links from the atom prefix tree. A hand-maintained menu is a
second source of truth about where things live, and it goes stale the first time a folder moves
without someone remembering it.

Composes: [[law]].
