---
name: nav
description: "Use when reasoning about nav — lays the dashboard out on a fixed grid and moves across it, wrapping at every boundary via : moving left from the first column arrives at the last, and up from the first row…"
atomPath: "dashboard/nav"
coordinate: "dashboard/nav · 8/crest · 881b1e13"
contentUuid: "5ffc446d-b1b6-5208-bfb9-f72245121795"
diamondUuid: "77c6939e-a1e6-8944-aa4e-52514c5cf67f"
uuid: "881b1e13-5e3c-823b-bfc7-9eaf7a69d4fe"
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
  computationUuid: "eed41fb8-4a6c-816f-be04-be9949fe5844"
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
      stageUuid: "8dec3aff-45f9-8604-8c5e-5be112efbb0c"
    - stage: seal
      stageUuid: "d8ff621d-fd0f-8cc2-b06b-01bbf5a5528a"
    - stage: uuid
      stageUuid: "9af7b84e-8cec-851f-8521-c7e94489d91c"
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
