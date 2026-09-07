---
name: sti
description: "Use when reasoning about sti — names the column, and describe the union, and , and narrow a row to its subtype without a cast."
atomPath: "types/sti"
coordinate: "types/sti · 8/crest · ed7c2b73"
contentUuid: "4aef2eee-4eb4-5c34-a7e7-75159951a9ed"
diamondUuid: "86ba765c-850f-8f3f-9604-29a8fd46e60c"
uuid: "ed7c2b73-7e15-8011-a289-e11a8afb2e43"
horo: 8
typography:
  partition: types
  bondDegree: 4054
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
bindings: []
signatures:
  computationUuid: "842a0cd4-90dc-8ddf-b9a3-2472562e5b15"
  stages:
    - stage: path
      stageUuid: "65f9d276-ea64-81b7-9f28-743f46e638f4"
    - stage: trinity
      stageUuid: "1008b953-9150-817d-b4af-8b9d15f1cc02"
    - stage: boundary
      stageUuid: "e90082db-b1e8-859d-be2c-3c4160ef6454"
    - stage: links
      stageUuid: "455d9d87-a8af-8efc-8427-60a341b8d201"
    - stage: horo
      stageUuid: "f1ba325b-6ab3-824c-986a-4427c9e13d52"
    - stage: seal
      stageUuid: "d6c145e8-b6d0-84ed-87ce-a13d635c7b6a"
    - stage: uuid
      stageUuid: "7698d19b-a56e-825c-b1ea-a6baf85f8542"
version: 2
---
# types/sti — one table, one discriminator, many subtypes — narrowed rather than cast

`STI_DISCRIMINATOR` names the column, `StiDoc` and `StiVariant` describe the union, and
`narrowSti`, `isStiType` and `matchStiType` narrow a row to its subtype without a cast.

Single-table inheritance is what stops a new subtype becoming a new table. The discriminated
union is what stops the caller guessing which fields a row has: the compiler knows, because the
discriminator says.

Composes: [[law]].
