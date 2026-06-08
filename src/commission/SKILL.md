---
name: commission
description: Use when modelling one commission — the singular model of the commissions collection (the plural store); earned compensation tied to a sale or transaction.
atomPath: commission
coordinate: commission · 1/base · cd695b72
contentUuid: "0ff23e96-4410-5d9f-96d1-48469108f4b7"
diamondUuid: "d9f54a1f-5102-88a9-9802-7249399799a6"
uuid: "cd695b72-0a90-8de1-ae26-965d58ef0b14"
horo: 1
bonds:
  in:
    - balance
    - commissions
    - law
    - sales
  out:
    - balance
    - commissions
    - law
    - sales
typography:
  partition: commission
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - commissions
    - law
    - sales
  matrix:
    - balance
    - commissions
    - law
    - sales
  backlinks:
    - balance
    - commissions
    - law
    - sales
signatures:
  computationUuid: "4b080e82-631d-80e1-81bd-1f13e125da10"
  stages:
    - stage: path
      stageUuid: "ca313deb-5d58-87a5-9baf-5fa710bbbf41"
    - stage: trinity
      stageUuid: "02582d52-a5f6-846c-8b94-eb3b26b9c68b"
    - stage: boundary
      stageUuid: "2ffa3197-b982-805e-9181-74f34f46920e"
    - stage: links
      stageUuid: "9c2b29e5-fc21-8291-9be9-7e89ee2044a9"
    - stage: horo
      stageUuid: "bf4d8b11-c39f-82a9-a9bf-acae1aa43db1"
    - stage: seal
      stageUuid: "cebf634f-f4ac-8753-a797-469d5e8f5a6d"
    - stage: uuid
      stageUuid: "e1ecf8b1-ebcd-8f3b-8a2d-0886da61b241"
version: 2
---
# commission — the model of one [[commissions]] row

Earned compensation tied to a sale or transaction. The singular model whose plural store is the [[commissions]] collection ([[balance]]: every collection has its model).

Composes [[commissions]] · [[sales]] · [[balance]].

**Law — [[law]]: commission is the singular model of one earned-compensation row tied to a sale; the plural store is its collection ([[balance]]: every collection has its model).**
