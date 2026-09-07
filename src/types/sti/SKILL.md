---
name: sti
description: "Use when reasoning about sti — names the column, and describe the union, and , and narrow a row to its subtype without a cast."
atomPath: "types/sti"
coordinate: "types/sti · 8/crest · d6c7a1e9"
contentUuid: "702e510a-7715-5ed6-9052-42d9b8ff8928"
diamondUuid: "004f5324-b549-888e-9aca-cba79cf9daeb"
uuid: "d6c7a1e9-e112-8acf-ae85-4a74bdd14aa5"
horo: 8
typography:
  partition: types
  bondDegree: 4064
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
bindings: []
signatures:
  computationUuid: "d3e1726c-2ff2-8cc5-9b4a-19705203220b"
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
      stageUuid: "253f5c1d-15ef-86c1-a2ef-dd0a410941d6"
    - stage: seal
      stageUuid: "d6c145e8-b6d0-84ed-87ce-a13d635c7b6a"
    - stage: uuid
      stageUuid: "7e9940db-6a2b-8600-8ca3-8a449673f75c"
version: 2
---
# types/sti — one table, one discriminator, many subtypes — narrowed rather than cast

`STI_DISCRIMINATOR` names the column, `StiDoc` and `StiVariant` describe the union, and
`narrowSti`, `isStiType` and `matchStiType` narrow a row to its subtype without a cast.

Single-table inheritance is what stops a new subtype becoming a new table. The discriminated
union is what stops the caller guessing which fields a row has: the compiler knows, because the
discriminator says.

Composes: [[law]].
