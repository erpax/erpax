---
name: factory
description: "Use when creating Payload collections from declarative metadata — createAccountingCollection injects audit fields, tamper-proof uuid, horo state ring, standards citations, and chain-event hooks so collection files carry only domain intent."
atomPath: factory
coordinate: factory · 8/crest · dc85353b
contentUuid: "36693c01-8aea-5318-a8b3-890eddcc4ddc"
diamondUuid: "5b142fef-278c-8d8b-ac83-848cc237c6b8"
uuid: "dc85353b-a544-893a-81bc-dbd330f79cae"
horo: 8
bonds:
  in:
    - collections
    - diamond
    - dimension
    - fields
    - hooks
    - horo
    - law
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
    - standards
    - uuid
typography:
  partition: factory
  bondDegree: 0
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EU-2017/1132"
  - "EU-2017/828"
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
    - standards
    - uuid
signatures:
  computationUuid: "2a9e1288-02af-8216-9edf-c0c13b0ffce5"
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
      stageUuid: "c03beb64-bc36-878a-84e1-46ab1976dcb7"
    - stage: seal
      stageUuid: "c2fdfd7a-6e45-886e-a333-8e98ec903306"
    - stage: uuid
      stageUuid: "4d8b8220-47f7-8c84-83c1-bdbb94510cd4"
version: 2
---
# factory — declarative collection factory

The accounting collection factory collapses per-collection boilerplate into one barrel (`createAccountingCollection`). Declarative opts (`emits`, `subscribesTo`, `standards`, `horoStates`, `injectTamperProofUuid`) wire access, [[hooks]], audit trail, and content-[[uuid]] facets by construction — collection files become ~20 lines of domain intent. `deriveCollectionDiamond` in [[diamond]] projects factory-built collections into the shared `DiamondModel`.

Composes [[collections]] · [[fields]] · [[hooks]] · [[horo]] · [[uuid]] · [[diamond]] · [[standards]].

**Law — [[law]]: the factory is the DRY collapse of collection boilerplate — one declarative `createAccountingCollection` injects audit, uuid, horo, standards, and event hooks so every collection shares one shape and one verifier.**

@see [[diamond]] · [[collections]] · [[hooks]] · [[horo]] · [[standards]]
