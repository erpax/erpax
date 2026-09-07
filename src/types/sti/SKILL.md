---
name: sti
description: "Use when reasoning about sti — names the column, and describe the union, and , and narrow a row to its subtype without a cast."
atomPath: "types/sti"
coordinate: "types/sti · 1/base · 4e33f5e3"
contentUuid: "ce36efa7-3ead-5f11-ade5-f52a4cdcceea"
diamondUuid: "abec7a01-0a95-84fa-af08-f544ab960b5e"
uuid: "4e33f5e3-5335-84ea-b9f0-24e867412a34"
horo: 1
typography:
  partition: types
  bondDegree: 4064
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
bindings: []
signatures:
  computationUuid: "24366a49-572d-871a-bd8e-75c4db2b1a90"
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
      stageUuid: "42cfbafa-1ef4-80bf-9ab0-cda4ccf00027"
    - stage: seal
      stageUuid: "d6c145e8-b6d0-84ed-87ce-a13d635c7b6a"
    - stage: uuid
      stageUuid: "fafc9806-2b2a-8530-a1be-6d99dede02a7"
version: 2
---
# types/sti — one table, one discriminator, many subtypes — narrowed rather than cast

`STI_DISCRIMINATOR` names the column, `StiDoc` and `StiVariant` describe the union, and
`narrowSti`, `isStiType` and `matchStiType` narrow a row to its subtype without a cast.

Single-table inheritance is what stops a new subtype becoming a new table. The discriminated
union is what stops the caller guessing which fields a row has: the compiler knows, because the
discriminator says.

Composes: [[law]].
