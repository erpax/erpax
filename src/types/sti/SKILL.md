---
name: sti
description: "Use when reasoning about sti — names the column, and describe the union, and , and narrow a row to its subtype without a cast."
atomPath: "types/sti"
coordinate: "types/sti · 4/weave · dca9f8fb"
contentUuid: "e2472737-ef26-55dd-8c24-628364ece42f"
diamondUuid: "02e6a70a-12c6-8ec2-af97-74c9e2a70185"
uuid: "dca9f8fb-bbf4-873c-93ff-8a02aa57606b"
horo: 4
typography:
  partition: types
  bondDegree: 4054
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
bindings: []
signatures:
  computationUuid: "8596b4b0-83f9-8d25-9ad4-a08f23ac303f"
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
      stageUuid: "3efb52e1-018e-8e31-987a-3fa5d59e4ee9"
    - stage: seal
      stageUuid: "d6c145e8-b6d0-84ed-87ce-a13d635c7b6a"
    - stage: uuid
      stageUuid: "5299b315-b891-815b-9316-ee66b9d5d60a"
version: 2
---
# types/sti — one table, one discriminator, many subtypes — narrowed rather than cast

`STI_DISCRIMINATOR` names the column, `StiDoc` and `StiVariant` describe the union, and
`narrowSti`, `isStiType` and `matchStiType` narrow a row to its subtype without a cast.

Single-table inheritance is what stops a new subtype becoming a new table. The discriminated
union is what stops the caller guessing which fields a row has: the compiler knows, because the
discriminator says.

Composes: [[law]].
