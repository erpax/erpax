---
name: throughput
description: "Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output."
atomPath: throughput
coordinate: throughput · 5/round · ff3c997d
contentUuid: "812a74f4-4b51-5a36-9b9c-a0d6dc53fefe"
diamondUuid: "c213754d-c6a9-8893-bcfe-a84836ae1b90"
uuid: "ff3c997d-3fb7-8c29-903b-8d0134a1fe9f"
horo: 5
bonds:
  in:
    - bottleneck
    - centers
    - flow
    - fodder
    - grazing
    - law
    - measure
    - rate
    - sparsity
    - yield
  out:
    - bottleneck
    - centers
    - flow
    - fodder
    - grazing
    - law
    - measure
    - rate
    - sparsity
    - yield
typography:
  partition: throughput
  bondDegree: 31
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - bottleneck
    - centers
    - flow
    - law
    - measure
    - rate
  matrix:
    - bottleneck
    - centers
    - flow
    - fodder
    - grazing
    - law
    - measure
    - rate
    - sparsity
    - yield
  backlinks:
    - bottleneck
    - centers
    - flow
    - fodder
    - grazing
    - law
    - measure
    - rate
    - sparsity
    - yield
signatures:
  computationUuid: "c542a5b0-e3b8-8a26-9138-6364f025caa6"
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
      stageUuid: "f02607b6-35d7-866b-aad3-c6db253ef064"
    - stage: seal
      stageUuid: "321e2fec-cab8-833b-bffb-42b6baefa763"
    - stage: uuid
      stageUuid: "b760f8d3-71d6-8386-bd79-a2795dd678e5"
version: 2
---
# throughput

Use when measuring the quantity-per-unit-time flowing through a process — items per hour, transactions per second, units completed per shift. The rate of productive output.

Composes: [[rate]] · [[flow]] · [[measure]] · [[work/centers]] · [[bottleneck]].

**Law — [[law]]: throughput is the [[rate]] of productive output — quantity per unit time flowing through a process — and the [[bottleneck]] resource caps it.**

## Standards
- ISO-8402 (throughput rate)
