---
name: speed
description: "Use when reasoning about speed — The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regu"
atomPath: speed
coordinate: "speed · 7/descent · f11a4a2c"
contentUuid: "527381cf-b0fa-5061-9e3a-caf5435ede50"
diamondUuid: "add7baf1-c27a-8ae9-b0f2-5daf1abf4bb9"
uuid: "f11a4a2c-60be-8f42-930b-9481244bd602"
horo: 7
typography:
  partition: speed
  bondDegree: 14
standards:
  - "schema.org — the type vocabulary, collided to single words"
bindings: []
signatures:
  computationUuid: "6cabfde7-6fb4-8cf2-a0de-b76693ffafb4"
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
      stageUuid: "1371d7d6-808f-8665-af02-d9f49528faac"
    - stage: seal
      stageUuid: "76baadff-edf4-8368-aa7b-39d96649ba64"
    - stage: uuid
      stageUuid: "77eca9eb-c25d-888c-b338-9f9da82a149f"
version: 2
---
# speed

The speed range of the vehicle. If the vehicle is powered by an engine, the upper limit of the speed range (indicated by maxValue) should be the maximum speed achievable under regular conditions. Typical unit code(s): KMH for km/h, HM for mile per hour (0.447 04 m/s), KNT for knot *Note 1: Use minValue and maxValue to indicate the range. Typically, the minimal value is zero. * Note 2: There are many different ways of measuring the speed range. You can link to information about how the given value has been determined using the valueReference property.

Entangled with — [[thing]]

Attested in schema.org — speed

**Law — [[law]]: speed is one schema.org word, content-addressed; the same word collides every schema.org term that contains it into one atom, deduped, never duplicated.**

@standard schema.org — the type vocabulary, collided to single words
