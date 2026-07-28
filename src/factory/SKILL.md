---
name: factory
description: "Use when creating Payload collections from declarative metadata — createAccountingCollection injects audit fields, tamper-proof uuid, horo state ring, standards citations, and chain-event hooks so collection files carry only domain intent."
atomPath: factory
coordinate: "factory · 5/round · 58c56ad4"
contentUuid: "09882094-d5b9-5ab8-99de-e9b699826098"
diamondUuid: "5df68ad5-89dd-8acd-80fd-0919f2804b08"
uuid: "58c56ad4-ca05-8f49-9a4e-b56c1971e925"
horo: 5
bonds:
  in:
    - collections
    - diamond
    - dimension
    - fields
    - hooks
    - horo
    - law
    - signal
    - standards
    - uuid
  out:
    - collections
    - diamond
    - dimension
    - fields
    - hooks
    - horo
    - law
    - signal
    - standards
    - uuid
typography:
  partition: factory
  bondDegree: 0
  neighbors: []
standards:
  - "ISA-95"
bindings: []
neighbors:
  wikilink:
    - collections
    - diamond
    - fields
    - hooks
    - horo
    - law
    - standards
    - uuid
  matrix:
    - collections
    - diamond
    - dimension
    - fields
    - hooks
    - horo
    - law
    - signal
    - standards
    - uuid
  backlinks:
    - collections
    - diamond
    - dimension
    - fields
    - hooks
    - horo
    - law
    - signal
    - standards
    - uuid
signatures:
  computationUuid: "48852dd1-bb19-8e1c-95f0-54033024f1a3"
  stages:
    - stage: path
      stageUuid: "ee1efea5-acdf-8b3b-8fda-09a0cf9f9d7a"
    - stage: trinity
      stageUuid: "f26eb7ab-c50d-8b26-b6bf-941ebf91a840"
    - stage: boundary
      stageUuid: "5ed60c82-7fe9-8329-ab4a-2a8ce5f9d691"
    - stage: links
      stageUuid: "a39050ef-b09e-884f-aa49-edcde69ee09d"
    - stage: horo
      stageUuid: "8296cafc-594c-8168-b166-c0133f389d88"
    - stage: seal
      stageUuid: "c2fdfd7a-6e45-886e-a333-8e98ec903306"
    - stage: uuid
      stageUuid: "ef871a2b-ba43-8a37-a3f7-f0d25ee75e21"
version: 2
---
# factory — declarative collection factory

The accounting collection factory collapses per-collection boilerplate into one barrel (`createAccountingCollection`). Declarative opts (`emits`, `subscribesTo`, `standards`, `horoStates`, `injectTamperProofUuid`) wire access, [[hooks]], audit trail, and content-[[uuid]] facets by construction — collection files become ~20 lines of domain intent. `deriveCollectionDiamond` in [[diamond]] projects factory-built collections into the shared `DiamondModel`.

Composes [[collections]] · [[fields]] · [[hooks]] · [[horo]] · [[uuid]] · [[diamond]] · [[standards]].

**Law — [[law]]: the factory is the DRY collapse of collection boilerplate — one declarative `createAccountingCollection` injects audit, uuid, horo, standards, and event hooks so every collection shares one shape and one verifier.**

@see [[diamond]] · [[collections]] · [[hooks]] · [[horo]] · [[standards]]
