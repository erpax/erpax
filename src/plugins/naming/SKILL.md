---
name: naming
description: "Use when reasoning about naming — names every internal table and column by content-addressing the path it sits at."
atomPath: "plugins/naming"
coordinate: "plugins/naming · 2/share · 7527b48b"
contentUuid: "fa9b81c7-8fe4-52e5-be36-da3a5077435f"
diamondUuid: "56556e61-98a4-8dca-8e4e-ff8315bf5d8f"
uuid: "7527b48b-916d-8478-a037-63e93ae0a6e3"
horo: 2
typography:
  partition: plugins
  bondDegree: 9
standards:
  - "RFC 9562 §5.8 name-based UUID (the digest source)"
bindings: []
signatures:
  computationUuid: "a28b1c12-e726-8a2d-82e7-fffc6fefc6ed"
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
      stageUuid: "16d3a204-9e55-8ca4-9a89-76b0b7f66027"
    - stage: seal
      stageUuid: "348b6822-58a1-860c-af2a-3c412bea5894"
    - stage: uuid
      stageUuid: "3852f6eb-7326-88a7-b61d-10e791f03908"
version: 2
---
# plugins/naming — a database identifier is derived from its path, never invented

`uuidNamesPlugin` names every internal table and column by content-addressing the path it sits
at. Nothing is chosen, so nothing drifts: the same path always yields the same identifier, and
two atoms cannot quietly share one.

A multi-word invented name is a sentence pretending to be an identifier — it carries a claim
about meaning that nothing checks. A derived one carries only its address.

Composes: [[uuid]] · [[path]] · [[law]].
