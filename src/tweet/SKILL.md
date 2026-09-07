---
name: tweet
description: Use when modelling one tweet — the singular model of the tweets collection (the plural store); one short public post on a microblogging feed.
atomPath: tweet
coordinate: "tweet · 1/base · 77e1b62c"
contentUuid: "9cb6e7a9-b5a7-5ee5-9263-20fa73796b63"
diamondUuid: "5014aeca-4cad-89d1-b50a-4da9bf9dbafe"
uuid: "77e1b62c-b09b-82a1-85ed-2861abfdc5f2"
horo: 1
typography:
  partition: tweet
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "26955dec-e1ae-8cb7-a3ce-7001093fd19c"
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
      stageUuid: "415abef5-03f9-8bbe-a3f0-ee7c297771cf"
    - stage: seal
      stageUuid: "6d63bea5-7a63-8f90-9c1c-6e3563810b3c"
    - stage: uuid
      stageUuid: "9eb9d44b-ac59-8940-b722-79047196a173"
version: 2
---
# tweet — the model of one [[tweets]] row

One short public post on a microblogging feed. The singular model whose plural store is the [[tweets]] collection ([[balance]]: every collection has its model).

Composes [[tweets]] · [[post]] · [[balance]].

**Law — [[law]]: a tweet is a public post bound to its author and instant; once broadcast it is a fixed record, edited only by a new post that supersedes it.**
