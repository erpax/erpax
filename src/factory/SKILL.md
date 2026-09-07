---
name: factory
description: "Use when creating Payload collections from declarative metadata — createAccountingCollection injects audit fields, tamper-proof uuid, horo state ring, standards citations, and chain-event hooks so collection files carry only domain intent."
atomPath: factory
coordinate: "factory · 1/base · ef38728b"
contentUuid: "79debc8e-6b99-533e-9442-cec1ee7a05a0"
diamondUuid: "33e92164-0820-8ae8-9d5a-d7c3b7fe8386"
uuid: "ef38728b-7ee8-8827-902a-0ea1d43caa54"
horo: 1
typography:
  partition: factory
  bondDegree: 47
standards:
  - "ISA-95"
bindings: []
signatures:
  computationUuid: "6d148d0a-8283-8c17-8150-60d78d6dff52"
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
      stageUuid: "34bb4272-bf1c-82eb-902d-6603cc48e4b3"
    - stage: seal
      stageUuid: "34be0308-3103-8bb5-855a-d8630b87d46e"
    - stage: uuid
      stageUuid: "2dcc4194-fa20-8886-876c-93fd45244081"
version: 2
---
# factory — declarative collection factory

The accounting collection factory collapses per-collection boilerplate into one barrel (`createAccountingCollection`). Declarative opts (`emits`, `subscribesTo`, `standards`, `horoStates`, `injectTamperProofUuid`) wire access, [[hooks]], audit trail, and content-[[uuid]] facets by construction — collection files become ~20 lines of domain intent. `deriveCollectionDiamond` in [[diamond]] projects factory-built collections into the shared `DiamondModel`.

Composes [[collections]] · [[field]] · [[hooks]] · [[horo]] · [[uuid]] · [[diamond]] · [[standards]].

**Law — [[law]]: the factory is the DRY collapse of collection boilerplate — one declarative `createAccountingCollection` injects audit, uuid, horo, standards, and event hooks so every collection shares one shape and one verifier.**

@see [[diamond]] · [[collections]] · [[hooks]] · [[horo]] · [[standards]]
