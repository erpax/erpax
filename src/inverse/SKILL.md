---
name: inverse
description: "Use when reasoning about inverse — Relates a property to a property that is its inverse. Inverse properties relate the same pairs of items to each other, but in reversed direction. For example, the 'alumni' and 'alu"
atomPath: inverse
coordinate: inverse · 5/round · 95f4a121
contentUuid: "eb7f4e44-94ee-56aa-91a6-5a4ae49ef9b1"
diamondUuid: "34868f47-474d-85ed-9225-e5aec6f768e6"
uuid: "95f4a121-5c24-8303-a372-a6a45bc202f2"
horo: 5
bonds:
  in:
    - law
    - thing
  out:
    - law
    - thing
typography:
  partition: inverse
  bondDegree: 6
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - law
    - thing
  matrix:
    - law
    - thing
  backlinks:
    - law
    - thing
signatures:
  computationUuid: "49994c93-614b-86fb-81fb-11627c9643dd"
  stages:
    - stage: path
      stageUuid: "822bb6b7-2c5b-8f42-b196-9378ffb42d32"
    - stage: trinity
      stageUuid: "8715ff91-a0a1-8f2d-8f2f-71c9c752ff58"
    - stage: boundary
      stageUuid: "2c6055a5-30e0-87eb-bc87-07ffcc4dc695"
    - stage: links
      stageUuid: "e4ae800c-13bc-85ae-8dbe-e07370b2e1a9"
    - stage: horo
      stageUuid: "3573c3eb-bcd9-8b53-9f0a-aa54594b27b3"
    - stage: seal
      stageUuid: "b2f3f987-a0a2-8dc7-b788-b424b82226c5"
    - stage: uuid
      stageUuid: "c7415abe-3d6e-863c-b179-f108739bb886"
version: 2
---
# inverse

Relates a property to a property that is its inverse. Inverse properties relate the same pairs of items to each other, but in reversed direction. For example, the 'alumni' and 'alumniOf' properties are inverseOf each other. Some properties don't have explicit inverses; in these situations RDFa and JSON-LD syntax for reverse properties can be used.

Entangled with — [[thing]]

Attested in schema.org — inverseOf

**Law — [[law]]: an inverse relates the same pair in reversed direction — if A→B holds under a property then B→A holds under its inverse, so the two directions must be declared together or the relation is asymmetric and incomplete.**

@standard schema.org — the type vocabulary, collided to single words
