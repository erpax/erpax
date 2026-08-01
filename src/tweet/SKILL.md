---
name: tweet
description: Use when modelling one tweet — the singular model of the tweets collection (the plural store); one short public post on a microblogging feed.
atomPath: tweet
coordinate: "tweet · 2/share · e1ba41c6"
contentUuid: "0cdf315a-21f0-5c5e-92a9-ff5730052fae"
diamondUuid: "637f0f51-d894-8909-b73f-073467e9deab"
uuid: "e1ba41c6-46d7-89f4-ab5f-8e25ab88bac9"
horo: 2
typography:
  partition: tweet
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "73b4fb09-d7ba-8772-8845-9f6d74f1e7c1"
  stages:
    - stage: path
      stageUuid: "9c55afcf-a6ab-898c-8ebd-b0ee6d93ffe6"
    - stage: trinity
      stageUuid: "b6a80cea-5d44-80e3-84b7-cfabbb392509"
    - stage: boundary
      stageUuid: "ea206cf9-6d1e-82c9-bba4-04865bb0027c"
    - stage: links
      stageUuid: "229de461-a6a9-84b9-b506-e4c8f808a4af"
    - stage: horo
      stageUuid: "86e99c28-24f4-85e5-b846-f58e388d8b51"
    - stage: seal
      stageUuid: "6d63bea5-7a63-8f90-9c1c-6e3563810b3c"
    - stage: uuid
      stageUuid: "cce3aff9-8574-8126-b350-0208c53c6613"
version: 2
---
# tweet — the model of one [[tweets]] row

One short public post on a microblogging feed. The singular model whose plural store is the [[tweets]] collection ([[balance]]: every collection has its model).

Composes [[tweets]] · [[post]] · [[balance]].

**Law — [[law]]: a tweet is a public post bound to its author and instant; once broadcast it is a fixed record, edited only by a new post that supersedes it.**
