---
name: pain002
description: "Use when parsing ISO 20022 pain.002 CustomerPaymentStatusReport — status report for pain.001/008 initiations."
atomPath: pain002
coordinate: "pain002 · 4/weave · ad2964b6"
contentUuid: "b1a85897-4615-5fc2-8a52-cf1c162e681e"
diamondUuid: "d575aa94-e9ce-85fc-87c6-12960d8d1b55"
uuid: "ad2964b6-b948-8af5-ad9e-5c538ea91c97"
horo: 4
typography:
  partition: pain002
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "e03a5a95-d91a-8d1a-9c76-8f742639f492"
  stages:
    - stage: path
      stageUuid: "22d28bd1-d267-80de-a8ae-7b2bdbfbca0e"
    - stage: trinity
      stageUuid: "1649b4c3-a2f7-8710-90c3-d302dc3bef36"
    - stage: boundary
      stageUuid: "673ce822-f288-8d59-b20e-1c8390f338b8"
    - stage: links
      stageUuid: "b2730e29-0904-83af-8d5b-e29bb7c359fa"
    - stage: horo
      stageUuid: "bba6637c-8f0b-8350-99a6-040402fb7524"
    - stage: seal
      stageUuid: "83fade7c-3515-8876-b0b6-a10d5e6d039d"
    - stage: uuid
      stageUuid: "a2c129b0-9e0b-8487-bd6a-c26615c53374"
version: 2
---
# pain.002 — Customer Payment Status Report

**Law — [[law]]: parse pain.002 status reports into the bank import dual of pain.001/008 initiations.**

Matter-twin: `src/pain002/import/service`. Composes [[iso]]/20022 · [[bank]].
