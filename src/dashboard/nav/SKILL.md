---
name: nav
description: "Use when reasoning about nav — lays the dashboard out on a fixed grid and moves across it, wrapping at every boundary via : moving left from the first column arrives at the last, and up from the first row…"
atomPath: "dashboard/nav"
coordinate: "dashboard/nav · 8/crest · 99743c7a"
contentUuid: "989c8c09-d649-5e82-bebb-039093e23579"
diamondUuid: "2c584535-228f-8906-85b3-6877ba3463cf"
uuid: "99743c7a-9148-843c-b81e-2a95db01753f"
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
  computationUuid: "7cd6bb87-98f8-87c3-a6f5-dfcb10ae5cae"
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
      stageUuid: "b29fead4-f816-8cd5-b253-9d1fa90e8957"
    - stage: seal
      stageUuid: "d8ff621d-fd0f-8cc2-b06b-01bbf5a5528a"
    - stage: uuid
      stageUuid: "9f4e2eff-1bd1-8aa1-a28b-94fe415e8adb"
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
