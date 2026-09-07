---
name: naming
description: "Use when reasoning about naming — names every internal table and column by content-addressing the path it sits at."
atomPath: "plugins/naming"
coordinate: "plugins/naming · 1/base · 15f24838"
contentUuid: "db373464-1ee8-5980-8a75-d48c7f53ec86"
diamondUuid: "35588c1a-0f2c-8878-8d9d-c0ca5fb35806"
uuid: "15f24838-3690-82e1-af4c-98f2428ec645"
horo: 1
typography:
  partition: plugins
  bondDegree: 9
standards:
  - "RFC 9562 §5.8 name-based UUID (the digest source)"
bindings: []
signatures:
  computationUuid: "246a76e3-7eb7-8445-851d-903d8bc91e0a"
  stages:
    - stage: path
      stageUuid: "7c9851c8-13c1-8960-b820-0e82dc2accdb"
    - stage: trinity
      stageUuid: "6ff8c903-2e79-8fdd-9c01-eb21cf6a52c1"
    - stage: boundary
      stageUuid: "4a19a508-5195-8633-8d70-8eabba862b88"
    - stage: links
      stageUuid: "d410f48a-7874-8f3e-b911-94b7d3123086"
    - stage: horo
      stageUuid: "26dc24d0-655b-8ba0-9e72-7d3077f646df"
    - stage: seal
      stageUuid: "348b6822-58a1-860c-af2a-3c412bea5894"
    - stage: uuid
      stageUuid: "2e8d99c4-18df-84a4-a87f-c5eef0437647"
version: 2
---
# plugins/naming — a database identifier is derived from its path, never invented

`uuidNamesPlugin` names every internal table and column by content-addressing the path it sits
at. Nothing is chosen, so nothing drifts: the same path always yields the same identifier, and
two atoms cannot quietly share one.

A multi-word invented name is a sentence pretending to be an identifier — it carries a claim
about meaning that nothing checks. A derived one carries only its address.

Composes: [[uuid]] · [[path]] · [[law]].
