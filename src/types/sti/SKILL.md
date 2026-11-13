---
name: sti
description: "Use when reasoning about sti — names the column, and describe the union, and , and narrow a row to its subtype without a cast."
atomPath: "types/sti"
coordinate: "types/sti · 8/crest · 68ecb508"
contentUuid: "255287d0-183b-5e10-bdc7-9792b4bf9827"
diamondUuid: "8e9043d9-e592-83e7-ab4e-ef7970a884b5"
uuid: "68ecb508-7db9-8347-b3f4-d38d95923b47"
horo: 8
typography:
  partition: types
  bondDegree: 302
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
bindings: []
signatures:
  computationUuid: "af72e4f0-489e-8ced-bd04-ec60a5223716"
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
      stageUuid: "04375832-cba1-873f-a8c3-51dd0bd337b1"
    - stage: seal
      stageUuid: "d6c145e8-b6d0-84ed-87ce-a13d635c7b6a"
    - stage: uuid
      stageUuid: "e4760f54-2fd3-80cb-a3a9-77204a425c96"
version: 2
---
# types/sti — one table, one discriminator, many subtypes — narrowed rather than cast

`STI_DISCRIMINATOR` names the column, `StiDoc` and `StiVariant` describe the union, and
`narrowSti`, `isStiType` and `matchStiType` narrow a row to its subtype without a cast.

Single-table inheritance is what stops a new subtype becoming a new table. The discriminated
union is what stops the caller guessing which fields a row has: the compiler knows, because the
discriminator says.

Composes: [[law]].
