---
name: pain002
description: "Use when parsing ISO 20022 pain.002 CustomerPaymentStatusReport — status report for pain.001/008 initiations."
atomPath: pain002
coordinate: "pain002 · 7/descent · d2747063"
contentUuid: "c683be33-1965-5e29-8d79-2af28c582132"
diamondUuid: "42c0de6b-ae5c-8ad6-84d8-830a005b112f"
uuid: "d2747063-4a40-8e27-8256-8e3c25c5abd7"
horo: 7
typography:
  partition: pain002
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "8e6d4f34-8803-873f-81fb-f0cd680eba95"
  stages:
    - stage: path
      stageUuid: "22d28bd1-d267-80de-a8ae-7b2bdbfbca0e"
    - stage: trinity
      stageUuid: "26b260f9-f398-8fb8-8fc7-ebcfcc92503c"
    - stage: boundary
      stageUuid: "82690a53-7cb3-84bf-a3a6-76d6902d2778"
    - stage: links
      stageUuid: "b2730e29-0904-83af-8d5b-e29bb7c359fa"
    - stage: horo
      stageUuid: "2d91fa4c-dfc7-8be0-b634-989e27e300e8"
    - stage: seal
      stageUuid: "ac83357c-d90c-8d10-90f8-c0160a563ac8"
    - stage: uuid
      stageUuid: "5cc93b2c-b796-8582-a693-3e3cd5891541"
version: 2
---
# pain.002 — Customer Payment Status Report

**Law — [[law]]: parse pain.002 status reports into the bank import dual of pain.001/008 initiations.**

Matter-twin: `src/pain002/import/service`. Composes [[iso]]/20022 · [[bank]].
