---
name: speed
description: "Use when reasoning about speed — The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regu"
atomPath: speed
coordinate: "speed · 4/weave · 65dddcc4"
contentUuid: "52112019-f928-5584-b765-b3a18a3ba0db"
diamondUuid: "96a4f84c-a023-849b-bbe3-1b467092cadd"
uuid: "65dddcc4-cbcb-8c27-8df4-277538265985"
horo: 4
typography:
  partition: speed
  bondDegree: 14
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "0572325e-04a1-83d5-8188-b715ec947bf5"
  stages:
    - stage: path
      stageUuid: "2c510ab9-45f5-8bdf-8745-bae6bf412fe1"
    - stage: trinity
      stageUuid: "d23608b9-981f-8cbb-8aac-67e9284b876b"
    - stage: boundary
      stageUuid: "39386678-ddd8-82a7-ae12-0247ee7c63ca"
    - stage: links
      stageUuid: "86486c61-7774-8ff1-a9c7-3eb2ca715b22"
    - stage: horo
      stageUuid: "daa70fd4-a92a-81ad-b094-7836f5edeba0"
    - stage: seal
      stageUuid: "76baadff-edf4-8368-aa7b-39d96649ba64"
    - stage: uuid
      stageUuid: "bb2e1d96-dac8-8b7b-a367-bea17c34cb28"
version: 2
---
# speed

The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regular conditions. Typical unit code(s): KMH for km/h, HM for mile per hour (0.447 04 m/s), KNT for knot *Note 1: Use minValue and maxValue to indicate the range. Typically, the minimal value is zero. * Note 2: There are many different ways of measuring the speed range. You can link to information about how the given value has been determined using the valueReference property.

Entangled with — [[thing]]

Attested in schema.org — speed

**Law — [[law]]: speed is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
