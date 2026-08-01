---
name: throughput
description: "Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output."
atomPath: throughput
coordinate: "throughput · 4/weave · b4e468d0"
contentUuid: "89b0c93f-12f0-55f7-a5de-393a360464eb"
diamondUuid: "a5251856-7278-88fc-ac1a-cefd19ad7f30"
uuid: "b4e468d0-854b-8bb8-b134-8dbbd665a269"
horo: 4
typography:
  partition: throughput
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "bc730887-c696-8f14-bb44-3ea2152362ae"
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
      stageUuid: "f30df889-82cd-8206-92f6-be948f5492e6"
    - stage: seal
      stageUuid: "8cd224e8-b462-8ba6-ad48-103ad9446721"
    - stage: uuid
      stageUuid: "2622e492-1ea7-864a-93df-00f43268fd52"
version: 2
---
# throughput

Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output.

Composes: [[rate]] · [[flow]] · [[measure]] · [[work/centers]] · [[bottleneck]].

**Law — [[law]]: throughput is the [[rate]] of productive output — quantity per unit time flowing through a process — and the [[bottleneck]] resource caps it.**

## Standards
- ISO-8402 (throughput rate)
