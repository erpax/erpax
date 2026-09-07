---
name: nav
description: "Use when reasoning about nav — builds the corpus links from the atom prefix tree. A hand-maintained menu is a second source of truth about where things live, and it goes stale the first time a folder moves…"
atomPath: "admin/ui/nav"
coordinate: "admin/ui/nav · 7/descent · eb984f10"
contentUuid: "fb04aba9-b43c-515c-a3f6-00d6a8563a1e"
diamondUuid: "b1a87611-e3b4-8658-8d41-1623dae11629"
uuid: "eb984f10-e2ac-8733-a4f9-efc2f8170392"
horo: 7
typography:
  partition: admin
  bondDegree: 7
standards: []
bindings: []
signatures:
  computationUuid: "72823518-96da-8e79-88d9-1636f8543f23"
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
      stageUuid: "d1f4d0d4-b66a-801c-a3ff-5a27786c17ef"
    - stage: seal
      stageUuid: "0dc92d7e-830e-8a31-b977-2e1f1a3f725b"
    - stage: uuid
      stageUuid: "99600c3a-247e-87f4-b3c5-0b13f15dcc8d"
version: 2
---
# admin/ui/nav — the sidebar is derived from the path tree, never from a typed menu

`CorpusNavLinks` builds the corpus links from the atom prefix tree. A hand-maintained menu is a
second source of truth about where things live, and it goes stale the first time a folder moves
without someone remembering it.

Composes: [[law]].
