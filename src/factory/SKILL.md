---
name: factory
description: "Use when creating Payload collections from declarative metadata — createAccountingCollection injects audit fields, tamper-proof uuid, horo state ring, standards citations, and chain-event hooks so collection files carry only domain intent."
atomPath: factory
coordinate: "factory · 7/descent · c088e53d"
contentUuid: "a4602fa6-7017-5faf-acb6-f99d13bc989e"
diamondUuid: "e488dcd4-ccae-8b07-b4a4-d221d9d4f287"
uuid: "c088e53d-c566-8719-825e-68a005eaa965"
horo: 7
typography:
  partition: factory
  bondDegree: 47
standards:
  - "ISA-95"
bindings: []
signatures:
  computationUuid: "c82a357d-bed5-858b-b74c-28be267f40e2"
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
      stageUuid: "b4faafc2-2a4d-8226-aef6-2d9f974b36f3"
    - stage: seal
      stageUuid: "34be0308-3103-8bb5-855a-d8630b87d46e"
    - stage: uuid
      stageUuid: "c1d4e0dc-3906-8c8b-9808-57c0fa494c48"
version: 2
---
# factory — declarative collection factory

The accounting collection factory collapses per-collection boilerplate into one barrel (`createAccountingCollection`). Declarative opts (`emits`, `subscribesTo`, `standards`, `horoStates`, `injectTamperProofUuid`) wire access, [[hooks]], audit trail, and content-[[uuid]] facets by construction — collection files become ~20 lines of domain intent. `deriveCollectionDiamond` in [[diamond]] projects factory-built collections into the shared `DiamondModel`.

Composes [[collections]] · [[field]] · [[hooks]] · [[horo]] · [[uuid]] · [[diamond]] · [[standards]].

**Law — [[law]]: the factory is the DRY collapse of collection boilerplate — one declarative `createAccountingCollection` injects audit, uuid, horo, standards, and event hooks so every collection shares one shape and one verifier.**

@see [[diamond]] · [[collections]] · [[hooks]] · [[horo]] · [[standards]]
