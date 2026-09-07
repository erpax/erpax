---
name: naming
description: "Use when reasoning about naming — names every internal table and column by content-addressing the path it sits at."
atomPath: "plugins/naming"
coordinate: "plugins/naming · 1/base · 430d1777"
contentUuid: "3bc5c671-040f-56dc-9dde-b83ac5847fa2"
diamondUuid: "394416d1-c317-82bc-9816-3a2da6a1ae99"
uuid: "430d1777-a8b2-80d7-a9ad-583b4a138542"
horo: 1
typography:
  partition: plugins
  bondDegree: 9
standards:
  - "RFC 9562 §5.8 name-based UUID (the digest source)"
bindings: []
signatures:
  computationUuid: "4ecc1775-fed4-89f2-bcd9-b6300d176969"
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
      stageUuid: "f72c8a39-6ce9-81e6-bb69-7653b68da107"
    - stage: seal
      stageUuid: "348b6822-58a1-860c-af2a-3c412bea5894"
    - stage: uuid
      stageUuid: "e1e51935-be44-8fc0-b1a0-b1d0bd939782"
version: 2
---
# plugins/naming — a database identifier is derived from its path, never invented

`uuidNamesPlugin` names every internal table and column by content-addressing the path it sits
at. Nothing is chosen, so nothing drifts: the same path always yields the same identifier, and
two atoms cannot quietly share one.

A multi-word invented name is a sentence pretending to be an identifier — it carries a claim
about meaning that nothing checks. A derived one carries only its address.

Composes: [[uuid]] · [[path]] · [[law]].
