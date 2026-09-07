---
name: throughput
description: "Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output."
atomPath: throughput
coordinate: "throughput · 4/weave · b9da7a9c"
contentUuid: "bb161b90-1feb-5afb-9f6b-127d5dfb69ef"
diamondUuid: "ac367b58-7857-8ea9-9611-423921dacaea"
uuid: "b9da7a9c-e315-8307-9ad3-dc031f0fe5e8"
horo: 4
typography:
  partition: throughput
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "d9eec11e-8f0a-812d-a122-5081338a67cb"
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
      stageUuid: "38557fc4-9e9c-8000-8f58-d98d58de61b9"
    - stage: seal
      stageUuid: "8cd224e8-b462-8ba6-ad48-103ad9446721"
    - stage: uuid
      stageUuid: "5d66442f-1a26-844c-ae9a-09565bb64445"
version: 2
---
# throughput

Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output.

Composes: [[rate]] · [[flow]] · [[measure]] · [[work/centers]] · [[bottleneck]].

**Law — [[law]]: throughput is the [[rate]] of productive output — quantity per unit time flowing through a process — and the [[bottleneck]] resource caps it.**

## Standards
- ISO-8402 (throughput rate)
