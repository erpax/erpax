---
name: attribution
description: "Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels."
atomPath: attribution
coordinate: attribution · 2/share · d1fbecd1
contentUuid: "c2166d91-32f6-5601-9c29-ec44f1726ca8"
diamondUuid: "d9999f41-8439-83b4-aa5b-a932500aa42e"
uuid: "d1fbecd1-11a7-8c80-a4c9-5fba5853d59e"
horo: 2
bonds:
  in:
    - activities
    - campaign
    - conversion
    - law
    - opportunities
    - orders
  out:
    - activities
    - campaign
    - conversion
    - law
    - opportunities
    - orders
typography:
  partition: attribution
  bondDegree: 19
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - activities
    - campaign
    - conversion
    - law
    - opportunities
    - orders
  matrix:
    - activities
    - campaign
    - conversion
    - law
    - opportunities
    - orders
  backlinks:
    - activities
    - campaign
    - conversion
    - law
    - opportunities
    - orders
signatures:
  computationUuid: "5eaa5f65-7303-85a8-b94e-bafa1e792fd0"
  stages:
    - stage: path
      stageUuid: "4f323f90-b1b7-8de6-bde0-bd5d548fcd58"
    - stage: trinity
      stageUuid: "b33ba76c-6469-8227-8d3c-6a46eafadd61"
    - stage: boundary
      stageUuid: "ba4963b7-3849-8973-89eb-4d9921991319"
    - stage: links
      stageUuid: "37bc9ce3-c2d0-8bab-b96a-081ae9b7894f"
    - stage: horo
      stageUuid: "b80fd4be-9843-8a8d-bb75-f0f359e21113"
    - stage: seal
      stageUuid: "a304bb0c-bfb0-8470-8ded-5006de08fa75"
    - stage: uuid
      stageUuid: "42fc6eed-daf8-87da-a843-a8e595120264"
version: 2
---
# attribution

Use when tracking which touchpoint/channel caused a conversion — first-touch, last-touch, multi-touch models; credit value allocation across channels.

Composes: [[campaign]] · [[Activities]] · [[customers/sales/orders]] · [[Opportunities]] · [[conversion]].

**Law — [[law]]: a [[conversion]]'s credit is allocated back across the touchpoints that caused it (first/last/multi-touch) — every attributed share sums to the one whole conversion.**

## Standards
- CRM-generic
