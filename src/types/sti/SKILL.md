---
name: sti
description: "Use when reasoning about sti — names the column, and describe the union, and , and narrow a row to its subtype without a cast."
atomPath: "types/sti"
coordinate: "types/sti · 8/crest · 68ecb508"
contentUuid: "465b3d45-2300-574d-a389-36a89fd290d3"
diamondUuid: "9706b770-01ea-8d03-9798-a3ae58a4dbd6"
uuid: "68ecb508-7db9-8347-b3f4-d38d95923b47"
horo: 8
typography:
  partition: types
  bondDegree: 4058
standards:
  - "ECMA-262 ECMAScript-2024 baseline"
bindings: []
signatures:
  computationUuid: "c6f306f0-67e3-89d4-b012-b1ef7b9ed0cd"
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
      stageUuid: "49379171-64c8-876d-b483-01a48b362570"
    - stage: seal
      stageUuid: "d6c145e8-b6d0-84ed-87ce-a13d635c7b6a"
    - stage: uuid
      stageUuid: "370300a2-1d32-878e-950a-c00c5bb18aee"
version: 2
---
# types/sti — one table, one discriminator, many subtypes — narrowed rather than cast

`STI_DISCRIMINATOR` names the column, `StiDoc` and `StiVariant` describe the union, and
`narrowSti`, `isStiType` and `matchStiType` narrow a row to its subtype without a cast.

Single-table inheritance is what stops a new subtype becoming a new table. The discriminated
union is what stops the caller guessing which fields a row has: the compiler knows, because the
discriminator says.

Composes: [[law]].
