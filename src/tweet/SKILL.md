---
name: tweet
description: Use when modelling one tweet — the singular model of the tweets collection (the plural store); one short public post on a microblogging feed.
atomPath: tweet
coordinate: "tweet · 8/crest · 1b509db4"
contentUuid: "cfa13ee7-1424-5448-a3df-62d207c1ae87"
diamondUuid: "2f6cb32b-1eb7-8e89-9856-3e9cef45ebfc"
uuid: "1b509db4-84ca-844d-a6be-e9b3e0c835ab"
horo: 8
typography:
  partition: tweet
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "8ed0bd7f-87e7-806a-bb92-73c4702aacd3"
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
      stageUuid: "a9193f09-3943-84d6-b940-d73e8f52c7d0"
    - stage: seal
      stageUuid: "6d63bea5-7a63-8f90-9c1c-6e3563810b3c"
    - stage: uuid
      stageUuid: "1717c746-e50a-81a6-a71e-6fc397283df1"
version: 2
---
# tweet — the model of one [[tweets]] row

One short public post on a microblogging feed. The singular model whose plural store is the [[tweets]] collection ([[balance]]: every collection has its model).

Composes [[tweets]] · [[post]] · [[balance]].

**Law — [[law]]: a tweet is a public post bound to its author and instant; once broadcast it is a fixed record, edited only by a new post that supersedes it.**
