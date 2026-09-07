---
name: nav
description: "Use when reasoning about nav — lays the dashboard out on a fixed grid and moves across it, wrapping at every boundary via : moving left from the first column arrives at the last, and up from the first row…"
atomPath: "dashboard/nav"
coordinate: "dashboard/nav · 1/base · ff1d59ff"
contentUuid: "2fc0435f-fa91-5a03-9b2f-2c2c5f827cbb"
diamondUuid: "599418b8-3bbf-89a0-8440-b6b101c3ac98"
uuid: "ff1d59ff-2290-82fb-b9ca-3cc7c89f3901"
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
  computationUuid: "4e72ebad-2185-84cc-8225-267e7a11c5e0"
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
      stageUuid: "e9430684-0259-81fb-b6e1-19d66a263e2c"
    - stage: seal
      stageUuid: "d8ff621d-fd0f-8cc2-b06b-01bbf5a5528a"
    - stage: uuid
      stageUuid: "82762201-3c22-8ba8-a6f4-f5fc23f62f8e"
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
