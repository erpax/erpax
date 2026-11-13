---
name: collection
description: "Use when a collection is built, its events derived, its fields generated or its shape judged — the factory as a barrel over base, lifecycle, field and shape."
atomPath: "factory/collection"
coordinate: "factory/collection · 8/crest · 3bf42126"
contentUuid: "1e41378d-b647-5d89-b56b-91de3fdcfcd5"
diamondUuid: "70ffe083-896f-8990-b32a-25e7cdb702bd"
uuid: "3bf42126-f592-8d63-b6cc-48a20ce5ef34"
horo: 8
typography:
  partition: factory
  bondDegree: 25
standards: []
bindings: []
signatures:
  computationUuid: "35b5c9a4-fb82-825c-a8c8-303ec57fffc4"
  stages:
    - stage: path
      stageUuid: "c44a1277-f9bf-86f6-8540-03203842937a"
    - stage: trinity
      stageUuid: "4dad9135-5026-8a71-afe2-2da2ec932821"
    - stage: boundary
      stageUuid: "c1d924e5-baa6-86fe-9e55-e356e9721444"
    - stage: links
      stageUuid: "d26142e9-0bdb-8149-a274-ecc83f9667e2"
    - stage: horo
      stageUuid: "77317291-e294-8f0e-b214-3e8a4af9046f"
    - stage: seal
      stageUuid: "5f9212f5-7811-83dc-a303-5e2b6618fb3d"
    - stage: uuid
      stageUuid: "db91dbd4-724b-802d-ae56-f49760642b91"
version: 2
---
# factory/collection — one factory, four concerns, no hub matter

A 720-line file held four things at once: the collection builder, the lifecycle fold, the small field builders, and the rosetta that judges a collection's shape. Each was a child atom already; the scroll was the only thing holding them together.

| child | what it is |
| --- | --- |
| [[factory]]/collection/base | `createAccountingCollection` — the collection every accounting table is |
| [[factory]]/collection/lifecycle | the spine fold: events derived from a `status` select |
| [[factory]]/collection/field | the small builders — calculated value, GL relation, line items |
| [[factory]]/collection/shape | the rosetta — a signature, its ratchet, the corpus audit |

The hub re-exports and holds nothing ([[rules]]/concentration). That matters more here than anywhere: this factory is what every collection imports, and it is what collapsed the boot once when an import loop made its initialisation order an accident ([[rules]]/cycle). A barrel with no matter has no top-level work to run at the wrong time.

`EMITS_WIRED_KEY` lives in `base`, where it is written, and `lifecycle` reads it — the reverse would make the two children import each other.

Composes: [[factory]] · [[rules]]/concentration · [[rules]]/cycle.
