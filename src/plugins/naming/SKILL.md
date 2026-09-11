---
name: naming
description: "Use when reasoning about naming — names every internal table and column by content-addressing the path it sits at."
atomPath: "plugins/naming"
coordinate: "plugins/naming · 5/round · 4e98a669"
contentUuid: "e971bf6a-0676-5418-b5cb-bbeef2998a9b"
diamondUuid: "d0b68e29-b46e-8523-b047-813c21b1cea8"
uuid: "4e98a669-267a-8648-b52a-84ec49cfc9a0"
horo: 5
typography:
  partition: plugins
  bondDegree: 9
standards:
  - "RFC 9562 §5.8 name-based UUID (the digest source)"
bindings: []
signatures:
  computationUuid: "1a5b7681-beac-8195-a61b-c04f2b37ae01"
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
      stageUuid: "c315cf95-be43-8fc9-9979-a2b92e4b34d9"
    - stage: seal
      stageUuid: "348b6822-58a1-860c-af2a-3c412bea5894"
    - stage: uuid
      stageUuid: "44b79650-8ba7-8820-ba2b-87cb7d94b24a"
version: 2
---
# plugins/naming — a database identifier is derived from its path, never invented

`uuidNamesPlugin` names every internal table and column by content-addressing the path it sits
at. Nothing is chosen, so nothing drifts: the same path always yields the same identifier, and
two atoms cannot quietly share one.

A multi-word invented name is a sentence pretending to be an identifier — it carries a claim
about meaning that nothing checks. A derived one carries only its address.

Composes: [[uuid]] · [[path]] · [[law]].
