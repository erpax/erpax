---
name: tweet
description: Use when modelling one tweet — the singular model of the tweets collection (the plural store); one short public post on a microblogging feed.
atomPath: tweet
coordinate: "tweet · 5/round · c5c8cb9f"
contentUuid: "c938886f-6b4b-5ee8-a846-9174dcb4eac9"
diamondUuid: "2ce78f7f-25ac-87fc-8c2d-0fc6b639d0c6"
uuid: "c5c8cb9f-962e-81fa-84c6-4a5d88c76e99"
horo: 5
typography:
  partition: tweet
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "f57d646b-ee7b-8d07-b056-60d99a474bec"
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
      stageUuid: "dec375ba-fcdc-84f9-8f03-5e1c611f8411"
    - stage: seal
      stageUuid: "6d63bea5-7a63-8f90-9c1c-6e3563810b3c"
    - stage: uuid
      stageUuid: "6d629f7f-47b4-8792-ac77-2357f4a9a5ac"
version: 2
---
# tweet — the model of one [[tweets]] row

One short public post on a microblogging feed. The singular model whose plural store is the [[tweets]] collection ([[balance]]: every collection has its model).

Composes [[tweets]] · [[post]] · [[balance]].

**Law — [[law]]: a tweet is a public post bound to its author and instant; once broadcast it is a fixed record, edited only by a new post that supersedes it.**
