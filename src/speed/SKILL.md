---
name: speed
description: "Use when reasoning about speed — The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regu"
atomPath: speed
coordinate: "speed · 1/base · 69c60a32"
contentUuid: "7647bcb5-005e-5b80-ad55-4c46a27eb6a8"
diamondUuid: "4d600ec3-64b9-820e-9aa4-71bbd791b494"
uuid: "69c60a32-38c8-85e2-8993-59f1e670bc62"
horo: 1
typography:
  partition: speed
  bondDegree: 14
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "d919bb56-db17-80b6-8d23-cd31cb0ecb5d"
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
      stageUuid: "b68b392e-809c-8109-a03f-26d2621b33cf"
    - stage: seal
      stageUuid: "76baadff-edf4-8368-aa7b-39d96649ba64"
    - stage: uuid
      stageUuid: "7df90c38-85ca-8425-bbaf-4ae0692a096e"
version: 2
---
# speed

The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regular conditions. Typical unit code(s): KMH for km/h, HM for mile per hour (0.447 04 m/s), KNT for knot *Note 1: Use minValue and maxValue to indicate the range. Typically, the minimal value is zero. * Note 2: There are many different ways of measuring the speed range. You can link to information about how the given value has been determined using the valueReference property.

Entangled with — [[thing]]

Attested in schema.org — speed

**Law — [[law]]: speed is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
