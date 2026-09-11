---
name: factory
description: "Use when creating Payload collections from declarative metadata — createAccountingCollection injects audit fields, tamper-proof uuid, horo state ring, standards citations, and chain-event hooks so collection files carry only domain intent."
atomPath: factory
coordinate: "factory · 4/weave · 7c7c4bd7"
contentUuid: "b69dd2e0-ea8c-508c-900b-11a7da52c496"
diamondUuid: "7ca8885e-6ba6-8043-887e-e00c144763cd"
uuid: "7c7c4bd7-6be4-865f-9f6d-aea37efe7f86"
horo: 4
typography:
  partition: factory
  bondDegree: 47
standards:
  - "ISA-95"
bindings: []
signatures:
  computationUuid: "4a5d8a7c-b407-8932-adfc-86a1444eb57e"
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
      stageUuid: "d38c0439-faf8-81ba-aaee-82d60d9e1ec6"
    - stage: seal
      stageUuid: "34be0308-3103-8bb5-855a-d8630b87d46e"
    - stage: uuid
      stageUuid: "51b9d978-eace-872e-a8b4-c96225ea9f06"
version: 2
---
# factory — declarative collection factory

The accounting collection factory collapses per-collection boilerplate into one barrel (`createAccountingCollection`). Declarative opts (`emits`, `subscribesTo`, `standards`, `horoStates`, `injectTamperProofUuid`) wire access, [[hooks]], audit trail, and content-[[uuid]] facets by construction — collection files become ~20 lines of domain intent. `deriveCollectionDiamond` in [[diamond]] projects factory-built collections into the shared `DiamondModel`.

Composes [[collections]] · [[field]] · [[hooks]] · [[horo]] · [[uuid]] · [[diamond]] · [[standards]].

**Law — [[law]]: the factory is the DRY collapse of collection boilerplate — one declarative `createAccountingCollection` injects audit, uuid, horo, standards, and event hooks so every collection shares one shape and one verifier.**

@see [[diamond]] · [[collections]] · [[hooks]] · [[horo]] · [[standards]]
