---
name: nav
description: "Use when reasoning about nav — lays the dashboard out on a fixed grid and moves across it, wrapping at every boundary via : moving left from the first column arrives at the last, and up from the first row…"
atomPath: "dashboard/nav"
coordinate: "dashboard/nav · 8/crest · f9abcb31"
contentUuid: "48ae4bd9-c76e-568b-9117-c5c17a8087b4"
diamondUuid: "a545cfcd-2d2c-8998-bce9-a4a3f4d3bd0a"
uuid: "f9abcb31-8368-8b00-b3df-75ae24bf1a27"
horo: 8
typography:
  partition: dashboard
  bondDegree: 7
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
  - "EU-CSDDD-2024/1760"
  - "NIST-INCITS-359-2012"
bindings: []
signatures:
  computationUuid: "ff9f0168-193c-84f6-8b77-d2544fe28091"
  stages:
    - stage: path
      stageUuid: "3af63687-afd7-8100-8aaf-401b99f8e78e"
    - stage: trinity
      stageUuid: "d4208864-07c1-881f-89bd-0f4e81290a13"
    - stage: boundary
      stageUuid: "b7c40bfa-c975-8992-8e29-5e24bd5783bc"
    - stage: links
      stageUuid: "7541e756-4e17-8c3e-b451-57f33988dd1c"
    - stage: horo
      stageUuid: "8b8bd923-f807-8389-a863-c22698f064f0"
    - stage: seal
      stageUuid: "d8ff621d-fd0f-8cc2-b06b-01bbf5a5528a"
    - stage: uuid
      stageUuid: "f54e6aa9-b7f1-8c65-b0aa-2ca51533a19b"
version: 2
---
# dashboard/nav — the navigation is a torus, so no cell is an edge

`navGrid` lays the dashboard out on a fixed grid and `toroidalWalk` moves across it, wrapping
at every boundary via `wrapIndex`: moving left from the first column arrives at the last, and
up from the first row arrives at the bottom.

A grid with edges has cells that are harder to reach than others, and the corner is worst. A
torus has no corner — every cell has the same four neighbours — so keyboard traversal costs
the same wherever the user is.

Composes: [[law]].
