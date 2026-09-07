---
name: collection
description: "Use when a collection is built, its events derived, its fields generated or its shape judged — the factory as a barrel over base, lifecycle, field and shape."
atomPath: "factory/collection"
coordinate: "factory/collection · 1/base · 085f7eac"
contentUuid: "2d35c349-c567-5c9d-8315-da75b2aa88a8"
diamondUuid: "5438cb99-3563-83aa-87d0-79c47dd3bcc3"
uuid: "085f7eac-a48c-8559-b27d-e8d177dc8fd9"
horo: 1
typography:
  partition: factory
  bondDegree: 41
standards: []
bindings: []
signatures:
  computationUuid: "19403581-ba3c-87c0-b3b0-d293c98ab83a"
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
      stageUuid: "6d09c982-e548-80f4-9945-c2664e3bf07d"
    - stage: seal
      stageUuid: "5f9212f5-7811-83dc-a303-5e2b6618fb3d"
    - stage: uuid
      stageUuid: "a2aadc2c-56f1-8d0e-b539-933f58561431"
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
