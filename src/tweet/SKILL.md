---
name: tweet
description: Use when modelling one tweet — the singular model of the tweets collection (the plural store); one short public post on a microblogging feed.
atomPath: tweet
coordinate: tweet · 1/base · be9b04fc
contentUuid: "553c09be-fa34-50f9-9de4-c40554aef2e1"
diamondUuid: "99d746ae-d96d-80bc-a773-69d9863a3978"
uuid: "be9b04fc-4fba-87aa-b16f-47b407431f4b"
horo: 1
bonds:
  in:
    - balance
    - law
    - post
    - tweets
  out:
    - balance
    - law
    - post
    - tweets
typography:
  partition: tweet
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - law
    - post
    - tweets
  matrix:
    - balance
    - law
    - post
    - tweets
  backlinks:
    - balance
    - law
    - post
    - tweets
signatures:
  computationUuid: "cfcd1085-9708-8fb8-a43f-7528fc880c20"
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
      stageUuid: "86ba7b8f-dd8c-86ec-8297-9c054dceb67a"
    - stage: seal
      stageUuid: "0f8f0d6e-9480-8c8a-9265-ecaad35c61d9"
    - stage: uuid
      stageUuid: "8aaaf8eb-b473-8c7b-aeaa-b51cd3f11e9e"
version: 2
---
# tweet — the model of one [[tweets]] row

One short public post on a microblogging feed. The singular model whose plural store is the [[tweets]] collection ([[balance]]: every collection has its model).

Composes [[tweets]] · [[post]] · [[balance]].

**Law — [[law]]: a tweet is a public post bound to its author and instant; once broadcast it is a fixed record, edited only by a new post that supersedes it.**
