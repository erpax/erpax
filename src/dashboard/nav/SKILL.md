---
name: nav
description: "Use when reasoning about nav — lays the dashboard out on a fixed grid and moves across it, wrapping at every boundary via : moving left from the first column arrives at the last, and up from the first row…"
atomPath: "dashboard/nav"
coordinate: "dashboard/nav · 1/base · 488d4553"
contentUuid: "2610d023-8ae0-5471-a552-c6bc5819dff9"
diamondUuid: "22da5aef-f9cf-81ac-9981-f9b66f90fbbd"
uuid: "488d4553-631d-8e4b-9e1c-9719485383ca"
horo: 1
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
  computationUuid: "5a663268-20a5-8a8e-b54e-28c0ef95507b"
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
      stageUuid: "c03f3023-4292-89e6-9761-2b0fc8e0e551"
    - stage: seal
      stageUuid: "d8ff621d-fd0f-8cc2-b06b-01bbf5a5528a"
    - stage: uuid
      stageUuid: "73c1a28d-e146-8fbc-955d-c091d6e8bc8d"
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
