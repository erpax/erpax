---
name: speed
description: "Use when reasoning about speed — The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regu"
atomPath: speed
coordinate: "speed · 2/share · 1964931e"
contentUuid: "eb1831f6-88bb-595d-9de3-5387962f23fe"
diamondUuid: "cb1e257b-75b1-80fa-9009-250bca3999e5"
uuid: "1964931e-4f93-8569-85a9-e75dcc6fa8a0"
horo: 2
typography:
  partition: speed
  bondDegree: 14
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "81e4c4a5-8bde-88c9-a0ef-08f5e3ff5efc"
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
      stageUuid: "8e048a14-e74c-8c08-8607-72c87ce14ded"
    - stage: seal
      stageUuid: "76baadff-edf4-8368-aa7b-39d96649ba64"
    - stage: uuid
      stageUuid: "3dc6e128-1723-8fde-a6b8-bcd24d5251a4"
version: 2
---
# speed

The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regular conditions. Typical unit code(s): KMH for km/h, HM for mile per hour (0.447 04 m/s), KNT for knot *Note 1: Use minValue and maxValue to indicate the range. Typically, the minimal value is zero. * Note 2: There are many different ways of measuring the speed range. You can link to information about how the given value has been determined using the valueReference property.

Entangled with — [[thing]]

Attested in schema.org — speed

**Law — [[law]]: speed is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
