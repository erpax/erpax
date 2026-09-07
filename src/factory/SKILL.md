---
name: factory
description: "Use when creating Payload collections from declarative metadata — createAccountingCollection injects audit fields, tamper-proof uuid, horo state ring, standards citations, and chain-event hooks so collection files carry only domain intent."
atomPath: factory
coordinate: "factory · 4/weave · 84070d2e"
contentUuid: "939c87c3-8bd6-5732-91b4-e72841298256"
diamondUuid: "16dce6c1-be40-88bf-b5aa-68d9f7e8ad42"
uuid: "84070d2e-420f-8b0f-8516-e8b033bd5864"
horo: 4
typography:
  partition: factory
  bondDegree: 45
standards:
  - "ISA-95"
bindings: []
signatures:
  computationUuid: "c022d5cf-ac2c-88d1-876b-dc4fa33c5ca6"
  stages:
    - stage: path
      stageUuid: "ee1efea5-acdf-8b3b-8fda-09a0cf9f9d7a"
    - stage: trinity
      stageUuid: "4ad79492-ea13-8661-b71c-32ad4f231e39"
    - stage: boundary
      stageUuid: "60501379-9d27-818c-88a6-6acda01b3391"
    - stage: links
      stageUuid: "f9c319e5-9961-8c71-a41a-4f6e6098d9f6"
    - stage: horo
      stageUuid: "2334eaf2-de98-888c-a1b0-d8a89c99c61f"
    - stage: seal
      stageUuid: "34be0308-3103-8bb5-855a-d8630b87d46e"
    - stage: uuid
      stageUuid: "96b372bf-2076-847f-971d-8df9240fd401"
version: 2
---
# factory — declarative collection factory

The accounting collection factory collapses per-collection boilerplate into one barrel (`createAccountingCollection`). Declarative opts (`emits`, `subscribesTo`, `standards`, `horoStates`, `injectTamperProofUuid`) wire access, [[hooks]], audit trail, and content-[[uuid]] facets by construction — collection files become ~20 lines of domain intent. `deriveCollectionDiamond` in [[diamond]] projects factory-built collections into the shared `DiamondModel`.

Composes [[collections]] · [[field]] · [[hooks]] · [[horo]] · [[uuid]] · [[diamond]] · [[standards]].

**Law — [[law]]: the factory is the DRY collapse of collection boilerplate — one declarative `createAccountingCollection` injects audit, uuid, horo, standards, and event hooks so every collection shares one shape and one verifier.**

@see [[diamond]] · [[collections]] · [[hooks]] · [[horo]] · [[standards]]
