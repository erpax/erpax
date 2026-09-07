---
name: throughput
description: "Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output."
atomPath: throughput
coordinate: "throughput · 8/crest · a872cbef"
contentUuid: "30d715be-5b42-5b01-81d6-f049b9bb888f"
diamondUuid: "3830d91d-b189-87d8-81b3-ce63b14940e8"
uuid: "a872cbef-b89b-8560-bcd9-273b52354c8b"
horo: 8
typography:
  partition: throughput
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "f164f7d3-5ba0-841b-81d8-8276824241c4"
  stages:
    - stage: path
      stageUuid: "3a51976c-6090-823e-8474-dfc6be2074a3"
    - stage: trinity
      stageUuid: "1c18f341-7062-8883-acfc-94682cd42c14"
    - stage: boundary
      stageUuid: "a2afaecf-4ef1-8d47-8454-1ac6ddda2620"
    - stage: links
      stageUuid: "ece7d052-e219-8093-aab8-69330bd2e273"
    - stage: horo
      stageUuid: "b2ab1f32-b6fa-81c8-8a46-0463c526a687"
    - stage: seal
      stageUuid: "8cd224e8-b462-8ba6-ad48-103ad9446721"
    - stage: uuid
      stageUuid: "ce843eea-2d63-8a12-a3d5-d35d5ef8f8d0"
version: 2
---
# throughput

Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output.

Composes: [[rate]] · [[flow]] · [[measure]] · [[work/centers]] · [[bottleneck]].

**Law — [[law]]: throughput is the [[rate]] of productive output — quantity per unit time flowing through a process — and the [[bottleneck]] resource caps it.**

## Standards
- ISO-8402 (throughput rate)
