---
name: tweet
description: Use when modelling one tweet — the singular model of the tweets collection (the plural store); one short public post on a microblogging feed.
atomPath: tweet
coordinate: "tweet · 1/base · d7724e3e"
contentUuid: "6f33f9b2-553e-5a78-bdb1-231a3c6351a0"
diamondUuid: "c45a32e6-2962-8bf2-a568-ae5c5db029d1"
uuid: "d7724e3e-10ca-8863-90fb-c61945a412f9"
horo: 1
typography:
  partition: tweet
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "636dbe57-76b5-8c5c-aa61-f3612c4df93c"
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
      stageUuid: "055f8107-0597-804a-b687-79a0dd99fe35"
    - stage: seal
      stageUuid: "6d63bea5-7a63-8f90-9c1c-6e3563810b3c"
    - stage: uuid
      stageUuid: "dfd5ec40-1644-8715-82a2-1a6ce5a76c46"
version: 2
---
# tweet — the model of one [[tweets]] row

One short public post on a microblogging feed. The singular model whose plural store is the [[tweets]] collection ([[balance]]: every collection has its model).

Composes [[tweets]] · [[post]] · [[balance]].

**Law — [[law]]: a tweet is a public post bound to its author and instant; once broadcast it is a fixed record, edited only by a new post that supersedes it.**
