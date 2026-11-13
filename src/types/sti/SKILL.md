---
name: sti
description: "Use when reasoning about sti — names the column, and describe the union, and , and narrow a row to its subtype without a cast."
atomPath: "types/sti"
coordinate: "types/sti · 8/crest · 68ecb508"
contentUuid: "1d84dd82-fded-56ad-afbd-6dd4c2c73ed3"
diamondUuid: "5aa29264-5d73-8132-80c7-17df04c08b21"
uuid: "68ecb508-7db9-8347-b3f4-d38d95923b47"
horo: 8
typography:
  partition: types
  bondDegree: 245
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
bindings: []
signatures:
  computationUuid: "a229e3a9-07d8-8fba-b96a-f7c402b09427"
  stages:
    - stage: path
      stageUuid: "65f9d276-ea64-81b7-9f28-743f46e638f4"
    - stage: trinity
      stageUuid: "1008b953-9150-817d-b4af-8b9d15f1cc02"
    - stage: boundary
      stageUuid: "6f0c9909-6f8f-84db-93c3-49af80407fa1"
    - stage: links
      stageUuid: "455d9d87-a8af-8efc-8427-60a341b8d201"
    - stage: horo
      stageUuid: "a12cebe8-3e7d-8fe5-8aba-26230dc61ec8"
    - stage: seal
      stageUuid: "d6c145e8-b6d0-84ed-87ce-a13d635c7b6a"
    - stage: uuid
      stageUuid: "013dc883-5fa7-8407-8a4a-26ba2b87f5e8"
version: 2
---
# types/sti — one table, one discriminator, many subtypes — narrowed rather than cast

`STI_DISCRIMINATOR` names the column, `StiDoc` and `StiVariant` describe the union, and
`narrowSti`, `isStiType` and `matchStiType` narrow a row to its subtype without a cast.

Single-table inheritance is what stops a new subtype becoming a new table. The discriminated
union is what stops the caller guessing which fields a row has: the compiler knows, because the
discriminator says.

Composes: [[law]].
