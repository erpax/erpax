---
name: throughput
description: "Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output."
atomPath: throughput
coordinate: "throughput · 4/weave · db6cdf98"
contentUuid: "61afc918-4976-508c-8ae1-fa6e54090a60"
diamondUuid: "bb40e30c-53be-86bc-8363-b001ac6d43b4"
uuid: "db6cdf98-7890-8cfc-9bc6-4c88c1598168"
horo: 4
typography:
  partition: throughput
  bondDegree: 31
standards: []
bindings: []
signatures:
  computationUuid: "b5c23040-44ed-8e6c-a0ba-03d896ea2e22"
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
      stageUuid: "f23ce427-82d2-872b-8dba-58263fe3c976"
    - stage: seal
      stageUuid: "8cd224e8-b462-8ba6-ad48-103ad9446721"
    - stage: uuid
      stageUuid: "e9527930-0b3e-8397-afdb-b64b8534be7f"
version: 2
---
# throughput

Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output.

Composes: [[rate]] · [[flow]] · [[measure]] · [[work/centers]] · [[bottleneck]].

**Law — [[law]]: throughput is the [[rate]] of productive output — quantity per unit time flowing through a process — and the [[bottleneck]] resource caps it.**

## Standards
- ISO-8402 (throughput rate)
