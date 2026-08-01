---
name: factory
description: "Use when creating Payload collections from declarative metadata — createAccountingCollection injects audit fields, tamper-proof uuid, horo state ring, standards citations, and chain-event hooks so collection files carry only domain intent."
atomPath: factory
coordinate: "factory · 4/weave · 2b696730"
contentUuid: "ff88ebf9-0bfc-54e8-9101-619c2e4965a2"
diamondUuid: "d55b423c-06c8-8bc9-ac1b-44756a554a85"
uuid: "2b696730-d25e-88f5-987a-b2b880cbce8f"
horo: 4
typography:
  partition: factory
  bondDegree: 32
standards:
  - "EN-16931"
  - "ISA-95"
bindings: []
signatures:
  computationUuid: "b445c710-3230-8eca-b9fb-fa45452a6519"
  stages:
    - stage: path
      stageUuid: "ee1efea5-acdf-8b3b-8fda-09a0cf9f9d7a"
    - stage: trinity
      stageUuid: "4ad79492-ea13-8661-b71c-32ad4f231e39"
    - stage: boundary
      stageUuid: "5ed60c82-7fe9-8329-ab4a-2a8ce5f9d691"
    - stage: links
      stageUuid: "a39050ef-b09e-884f-aa49-edcde69ee09d"
    - stage: horo
      stageUuid: "96a2d781-ce5c-8049-8d7d-febaeff968f8"
    - stage: seal
      stageUuid: "34be0308-3103-8bb5-855a-d8630b87d46e"
    - stage: uuid
      stageUuid: "abaceb41-a510-8d29-b2f8-f78f3df1cbed"
version: 2
---
# factory — declarative collection factory

The accounting collection factory collapses per-collection boilerplate into one barrel (`createAccountingCollection`). Declarative opts (`emits`, `subscribesTo`, `standards`, `horoStates`, `injectTamperProofUuid`) wire access, [[hooks]], audit trail, and content-[[uuid]] facets by construction — collection files become ~20 lines of domain intent. `deriveCollectionDiamond` in [[diamond]] projects factory-built collections into the shared `DiamondModel`.

Composes [[collections]] · [[fields]] · [[hooks]] · [[horo]] · [[uuid]] · [[diamond]] · [[standards]].

**Law — [[law]]: the factory is the DRY collapse of collection boilerplate — one declarative `createAccountingCollection` injects audit, uuid, horo, standards, and event hooks so every collection shares one shape and one verifier.**

@see [[diamond]] · [[collections]] · [[hooks]] · [[horo]] · [[standards]]
