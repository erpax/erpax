---
name: naming
description: "Use when reasoning about naming — names every internal table and column by content-addressing the path it sits at."
atomPath: "plugins/naming"
coordinate: "plugins/naming · 7/descent · 0e76a75f"
contentUuid: "6b39ea26-e279-5261-9c90-b361effe8e3b"
diamondUuid: "1fd402f4-1168-8e41-b8fc-e2d2a9f2f979"
uuid: "0e76a75f-11c6-809c-b0bf-5f8a6559551e"
horo: 7
typography:
  partition: plugins
  bondDegree: 9
standards:
  - "RFC 9562 §5.8 name-based UUID (the digest source)"
bindings: []
signatures:
  computationUuid: "c79ae7ff-b1d4-808f-bf8c-0246d77b81dd"
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
      stageUuid: "f0959783-8fcc-81c5-9eac-e95884216030"
    - stage: seal
      stageUuid: "348b6822-58a1-860c-af2a-3c412bea5894"
    - stage: uuid
      stageUuid: "7b2765b1-ced2-81f2-bd12-5c7e900e665e"
version: 2
---
# plugins/naming — a database identifier is derived from its path, never invented

`uuidNamesPlugin` names every internal table and column by content-addressing the path it sits
at. Nothing is chosen, so nothing drifts: the same path always yields the same identifier, and
two atoms cannot quietly share one.

A multi-word invented name is a sentence pretending to be an identifier — it carries a claim
about meaning that nothing checks. A derived one carries only its address.

Composes: [[uuid]] · [[path]] · [[law]].
