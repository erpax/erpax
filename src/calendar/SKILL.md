---
name: calendar
description: Use when modelling one calendar — the singular model of the calendars collection (the plural store); a scheme of dates against which events and schedules are placed.
atomPath: calendar
coordinate: calendar · 1/base · 160c7fed
contentUuid: "9724607a-32c5-59ca-bafd-bfc619405e9e"
diamondUuid: "a814496b-2100-8693-8660-672dd9c86ac7"
uuid: "160c7fed-08d2-84f7-89fa-9533e52bba12"
horo: 1
bonds:
  in:
    - balance
    - calendars
    - event
    - law
  out:
    - balance
    - calendars
    - event
    - law
typography:
  partition: calendar
  bondDegree: 12
  neighbors: []
standards: []
bindings: []
neighbors:
  wikilink:
    - balance
    - calendars
    - event
    - law
  matrix:
    - balance
    - calendars
    - event
    - law
  backlinks:
    - balance
    - calendars
    - event
    - law
signatures:
  computationUuid: "bd11f14f-3332-8df4-9e85-ac7cfb5766b4"
  stages:
    - stage: path
      stageUuid: "e3f8b9ee-bdbc-877a-947f-16e3da093f41"
    - stage: trinity
      stageUuid: "de3a65d4-2786-82c3-9bff-cfda11c6ba36"
    - stage: boundary
      stageUuid: "36e861a1-bbd9-8e9b-981f-24bd6c7d118e"
    - stage: links
      stageUuid: "8c4d4924-0324-8dde-a6ed-053394d86aa4"
    - stage: horo
      stageUuid: "ca16a45c-9679-8f1d-814b-1c3a0b205b72"
    - stage: seal
      stageUuid: "44b43388-350c-8950-8f5a-9888dce25050"
    - stage: uuid
      stageUuid: "a05ef14d-3fcd-87f5-b267-cbe35762b22a"
version: 2
---
# calendar — the model of one [[calendars]] row

A scheme of dates against which events and schedules are placed. The singular model whose plural store is the [[calendars]] collection ([[balance]]: every collection has its model).

Composes [[calendars]] · [[event]] · [[balance]].

**Law — [[law]]: calendar is the singular model of one scheme of dates against which events and schedules are placed; the plural store is its collection ([[balance]]: every collection has its model).**
