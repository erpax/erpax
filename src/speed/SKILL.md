---
name: speed
description: "Use when reasoning about speed — The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regu"
atomPath: speed
coordinate: "speed · 2/share · 68584a83"
contentUuid: "2fec1088-a6f5-5208-afd4-65809a58efc1"
diamondUuid: "5dce64c6-def9-8098-8227-593e817098bb"
uuid: "68584a83-e8d3-87e0-8975-7d4f8881d253"
horo: 2
typography:
  partition: speed
  bondDegree: 14
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "01b3cf73-0549-8cc4-ae32-c73e5935a2c2"
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
      stageUuid: "7390675b-f8f5-8a3f-ba6f-72260bac738b"
    - stage: seal
      stageUuid: "76baadff-edf4-8368-aa7b-39d96649ba64"
    - stage: uuid
      stageUuid: "a7a2fff7-b36b-8be0-8f24-7e6258539db9"
version: 2
---
# speed

The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regular conditions. Typical unit code(s): KMH for km/h, HM for mile per hour (0.447 04 m/s), KNT for knot *Note 1: Use minValue and maxValue to indicate the range. Typically, the minimal value is zero. * Note 2: There are many different ways of measuring the speed range. You can link to information about how the given value has been determined using the valueReference property.

Entangled with — [[thing]]

Attested in schema.org — speed

**Law — [[law]]: speed is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
