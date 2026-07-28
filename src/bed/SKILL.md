---
name: bed
description: "Use when reasoning about bed — The type of bed or beds included in the accommodation. For the single case of just one bed of a certain type, you use bed directly with a text. If you want to indicate the quantity"
atomPath: bed
coordinate: "bed · 4/weave · 5689f27e"
contentUuid: "2b357b44-e1e4-5c42-9193-391cdb7e96d9"
diamondUuid: "c9ec78e4-731b-8e74-baab-0a967e846a2c"
uuid: "5689f27e-c6e3-8714-91c3-f834362c47d4"
horo: 4
bonds:
  in:
    - breakfast
    - details
    - device
    - law
    - type
  out:
    - breakfast
    - details
    - device
    - law
    - type
typography:
  partition: bed
  bondDegree: 17
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
    - device
    - law
    - type
  backlinks:
    - breakfast
    - details
    - device
    - law
    - type
signatures:
  computationUuid: "231b1925-1768-8687-8779-be2f830113e1"
  stages:
    - stage: path
      stageUuid: "92b83751-a821-8378-a4e3-080844030fba"
    - stage: trinity
      stageUuid: "9a3d84bd-7b01-8dd2-9b8c-4edeb666736d"
    - stage: boundary
      stageUuid: "dca5afa2-24bb-884e-9793-a18d057b7b6b"
    - stage: links
      stageUuid: "3bdb1990-53b8-8e03-bf22-d3814dcd6c1d"
    - stage: horo
      stageUuid: "ab975998-fa36-88c5-850a-80e8746f16b0"
    - stage: seal
      stageUuid: "f394e6b4-8276-8a8a-be5c-7092c3447ffe"
    - stage: uuid
      stageUuid: "c8397c72-5736-81bc-9367-0987ca03640c"
version: 2
---
# bed

The type of bed or beds included in the accommodation. For the single case of just one bed of a certain type, you use bed directly with a text. If you want to indicate the quantity of a certain kind of bed, use an instance of BedDetails. For more detailed information, use the amenityFeature property.

Entangled with — [[breakfast]] · [[details]] · [[type]]

Attested in schema.org — BedAndBreakfast · BedDetails · BedType · bed · typeOfBed

**Law — [[law]]: bed is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
