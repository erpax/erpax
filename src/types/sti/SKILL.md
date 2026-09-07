---
name: sti
description: "Use when reasoning about sti — names the column, and describe the union, and , and narrow a row to its subtype without a cast."
atomPath: "types/sti"
coordinate: "types/sti · 8/crest · efc41610"
contentUuid: "3d14ed9e-4c7e-554a-90a8-c233638006c7"
diamondUuid: "3f60ecf3-4ded-8413-8ac5-061653fb6552"
uuid: "efc41610-0544-8072-92a3-4564279c55ef"
horo: 8
typography:
  partition: types
  bondDegree: 4054
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
bindings: []
signatures:
  computationUuid: "e2a54f3a-b2c6-8d1b-83de-29e13bbe812c"
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
      stageUuid: "3af36b7f-0926-826b-b643-5291eb5d3103"
    - stage: seal
      stageUuid: "d6c145e8-b6d0-84ed-87ce-a13d635c7b6a"
    - stage: uuid
      stageUuid: "3f35f14e-41e6-81ad-a449-7703c85f25b8"
version: 2
---
# types/sti — one table, one discriminator, many subtypes — narrowed rather than cast

`STI_DISCRIMINATOR` names the column, `StiDoc` and `StiVariant` describe the union, and
`narrowSti`, `isStiType` and `matchStiType` narrow a row to its subtype without a cast.

Single-table inheritance is what stops a new subtype becoming a new table. The discriminated
union is what stops the caller guessing which fields a row has: the compiler knows, because the
discriminator says.

Composes: [[law]].
