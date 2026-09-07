---
name: collection
description: "Use when a collection is built, its events derived, its fields generated or its shape judged — the factory as a barrel over base, lifecycle, field and shape."
atomPath: "factory/collection"
coordinate: "factory/collection · 2/share · 4d75afd5"
contentUuid: "9d64933a-f547-50b2-ba37-064934b27abe"
diamondUuid: "7567d2d2-57ce-8fe5-850e-3b4268f893c2"
uuid: "4d75afd5-108f-8c8a-a92f-c9d336315abd"
horo: 2
typography:
  partition: factory
  bondDegree: 43
standards: []
bindings: []
signatures:
  computationUuid: "bef1cd80-23ee-8c56-8974-af0131932a7b"
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
      stageUuid: "b7422aac-9b89-8339-918e-1c16dba5f52e"
    - stage: seal
      stageUuid: "5f9212f5-7811-83dc-a303-5e2b6618fb3d"
    - stage: uuid
      stageUuid: "61552094-8c72-816e-bf01-3e80f6d5dc4f"
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
