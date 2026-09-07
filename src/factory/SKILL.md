---
name: factory
description: "Use when creating Payload collections from declarative metadata — createAccountingCollection injects audit fields, tamper-proof uuid, horo state ring, standards citations, and chain-event hooks so collection files carry only domain intent."
atomPath: factory
coordinate: "factory · 2/share · d59a7f8c"
contentUuid: "52fe85b4-b563-59e9-b8dd-dd5ed5bfdd65"
diamondUuid: "c4a86f42-ce11-8bde-b634-e4b5a20d5dcc"
uuid: "d59a7f8c-a99e-8291-b9c4-26659b18aa26"
horo: 2
typography:
  partition: factory
  bondDegree: 45
standards:
  - "ISA-95"
bindings: []
signatures:
  computationUuid: "116e196f-588d-8f2e-a8e3-5daf2a4dfb5a"
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
      stageUuid: "2b8edbb3-ebc0-85e0-8cd2-5990f244b339"
    - stage: seal
      stageUuid: "34be0308-3103-8bb5-855a-d8630b87d46e"
    - stage: uuid
      stageUuid: "a255fef1-163a-80e5-a95a-b74ef48b9101"
version: 2
---
# factory — declarative collection factory

The accounting collection factory collapses per-collection boilerplate into one barrel (`createAccountingCollection`). Declarative opts (`emits`, `subscribesTo`, `standards`, `horoStates`, `injectTamperProofUuid`) wire access, [[hooks]], audit trail, and content-[[uuid]] facets by construction — collection files become ~20 lines of domain intent. `deriveCollectionDiamond` in [[diamond]] projects factory-built collections into the shared `DiamondModel`.

Composes [[collections]] · [[field]] · [[hooks]] · [[horo]] · [[uuid]] · [[diamond]] · [[standards]].

**Law — [[law]]: the factory is the DRY collapse of collection boilerplate — one declarative `createAccountingCollection` injects audit, uuid, horo, standards, and event hooks so every collection shares one shape and one verifier.**

@see [[diamond]] · [[collections]] · [[hooks]] · [[horo]] · [[standards]]
