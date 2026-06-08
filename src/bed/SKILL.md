---
name: bed
description: "Use when reasoning about bed — The type of bed or beds included in the accommodation. For the single case of just one bed of a certain type, you use bed directly with a text. If you want to indicate the quantity"
atomPath: bed
coordinate: bed · 1/base · 1305d66c
contentUuid: "3a33ff7f-e537-5112-83e3-f01573903e75"
diamondUuid: "c912b7b8-3ffd-8e06-8aa2-a43a4c2c3dbd"
uuid: "1305d66c-e1f6-89bf-8f9d-4e04373b97e6"
horo: 1
bonds:
  in:
    - breakfast
    - details
    - law
    - type
  out:
    - breakfast
    - details
    - law
    - type
typography:
  partition: bed
  bondDegree: 14
  neighbors: []
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
neighbors:
  wikilink:
    - breakfast
    - details
    - law
    - type
  matrix:
    - breakfast
    - details
    - law
    - type
  backlinks:
    - breakfast
    - details
    - law
    - type
signatures:
  computationUuid: "c488d095-995f-8958-85e2-d29caa482da8"
  stages:
    - stage: path
      stageUuid: "92b83751-a821-8378-a4e3-080844030fba"
    - stage: trinity
      stageUuid: "10b14a55-bcbb-831b-b045-08a2c6d56f21"
    - stage: boundary
      stageUuid: "0bf2c87a-d247-81e8-b7c5-aa37752d03c0"
    - stage: links
      stageUuid: "3bdb1990-53b8-8e03-bf22-d3814dcd6c1d"
    - stage: horo
      stageUuid: "dcdf4e01-bc1e-871b-8d58-adafe81030b7"
    - stage: seal
      stageUuid: "0588ca39-26b3-8136-a86b-dfc57e273363"
    - stage: uuid
      stageUuid: "60d1813a-5d3a-8b2d-9106-c163d93ef693"
version: 2
---
# bed

The type of bed or beds included in the accommodation. For the single case of just one bed of a certain type, you use bed directly with a text. If you want to indicate the quantity of a certain kind of bed, use an instance of BedDetails. For more detailed information, use the amenityFeature property.

Entangled with — [[breakfast]] · [[details]] · [[type]]

Attested in schema.org — BedAndBreakfast · BedDetails · BedType · bed · typeOfBed

**Law — [[law]]: bed is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
