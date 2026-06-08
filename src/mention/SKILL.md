---
name: mention
description: Use when modelling one mention — the singular model of the mentions collection (the plural store); a reference to an actor within a piece of content.
atomPath: mention
coordinate: mention · 7/descent · b18fec3f
contentUuid: "520598ad-d58a-5a3e-9cdf-4c7c22ab0834"
diamondUuid: "c70c7efe-9d02-82db-a27a-d6271b4a1b15"
uuid: "b18fec3f-b387-844b-a937-00b76b948408"
horo: 7
bonds:
  in:
    - balance
    - content
    - law
    - mentions
  out:
    - balance
    - content
    - law
    - mentions
typography:
  partition: mention
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - content
    - law
    - mentions
  matrix:
    - balance
    - content
    - law
    - mentions
  backlinks:
    - balance
    - content
    - law
    - mentions
signatures:
  computationUuid: "2e1a74d4-cb43-854d-8b1b-0a289d83cdfb"
  stages:
    - stage: path
      stageUuid: "7011b59b-7a7b-89a1-8028-e1cc4548f0b6"
    - stage: trinity
      stageUuid: "519d3298-c842-8fc0-8c01-04ce24cfd512"
    - stage: boundary
      stageUuid: "e34f6c4f-396d-873e-b443-013f0dcaeba5"
    - stage: links
      stageUuid: "70191738-e52d-8e71-a351-2e2e516a1657"
    - stage: horo
      stageUuid: "c82bb378-b30b-8a30-bd04-f63bd03b0b30"
    - stage: seal
      stageUuid: "f430ba29-ff25-817f-90d6-785fa35f5614"
    - stage: uuid
      stageUuid: "cf6e9795-5538-8187-80e1-0d0b2776be20"
version: 2
---
# mention — the model of one [[mentions]] row

A reference to an actor within a piece of content. The singular model whose plural store is the [[mentions]] collection ([[balance]]: every collection has its model).

Composes [[mentions]] · [[content]] · [[balance]].

**Law — [[law]]: one mention is the singular model of one [[mentions]] row — a reference to an actor within a piece of [[content]]; every collection has its model ([[balance]]).**
