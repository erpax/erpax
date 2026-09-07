---
name: throughput
description: "Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output."
atomPath: throughput
coordinate: "throughput · 8/crest · ffe2889b"
contentUuid: "02218c40-f320-5cad-aa20-a95c2b253306"
diamondUuid: "e8a7580b-7be2-878b-8a80-000ab2208ccc"
uuid: "ffe2889b-4137-8b2a-9b6c-a91764e9a81a"
horo: 8
typography:
  partition: throughput
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "072d8a3d-8304-8eaf-a61f-898a26403fca"
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
      stageUuid: "73cfb64a-8b8b-862c-89cc-a72ac23d1943"
    - stage: seal
      stageUuid: "8cd224e8-b462-8ba6-ad48-103ad9446721"
    - stage: uuid
      stageUuid: "e01aa247-3ce0-8909-a004-a6d6fea54aae"
version: 2
---
# throughput

Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output.

Composes: [[rate]] · [[flow]] · [[measure]] · [[work/centers]] · [[bottleneck]].

**Law — [[law]]: throughput is the [[rate]] of productive output — quantity per unit time flowing through a process — and the [[bottleneck]] resource caps it.**

## Standards
- ISO-8402 (throughput rate)
