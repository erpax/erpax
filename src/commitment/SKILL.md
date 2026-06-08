---
name: commitment
description: Use when modelling one commitment — the singular model of the commitments collection (the plural store); a binding promise to perform or provide.
atomPath: commitment
coordinate: commitment · 4/weave · a0c24652
contentUuid: "453ee0a4-98dd-5acd-9b87-5cc5cf284492"
diamondUuid: "e143cf9b-db56-8726-8c5f-c981086e3f70"
uuid: "a0c24652-b165-80d4-bc47-4aaad2bef82b"
horo: 4
bonds:
  in:
    - balance
    - commitments
    - legal
  out:
    - balance
    - commitments
    - legal
typography:
  partition: commitment
  bondDegree: 9
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - commitments
    - legal
  matrix:
    - balance
    - commitments
    - legal
  backlinks:
    - balance
    - commitments
    - legal
signatures:
  computationUuid: "033b70ff-13d9-8db1-9d54-80874673b055"
  stages:
    - stage: path
      stageUuid: "d57ba8b6-d044-8d4d-8d80-6bdaac42b929"
    - stage: trinity
      stageUuid: "fb40f5b1-3934-8a78-b28a-e33829ad2078"
    - stage: boundary
      stageUuid: "47511cf3-0aec-86ac-a2fa-01d8a1f5bfbb"
    - stage: links
      stageUuid: "54cd2200-618d-8a8a-ac25-311aa0ffb62d"
    - stage: horo
      stageUuid: "b7ed5f04-340d-8b81-b276-bb1b4474ce71"
    - stage: seal
      stageUuid: "797b163c-25c2-8230-82b9-6b16e76b3298"
    - stage: uuid
      stageUuid: "8aa366c8-e1ae-88dd-a1f2-43c1c6354c81"
version: 2
---
# commitment — the model of one [[commitments]] row

A binding promise to perform or provide. The singular model whose plural store is the [[commitments]] collection ([[balance]]: every collection has its model).

Composes [[commitments]] · [[legal]] · [[balance]].
