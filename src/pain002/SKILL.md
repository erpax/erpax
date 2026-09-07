---
name: pain002
description: "Use when parsing ISO 20022 pain.002 CustomerPaymentStatusReport — status report for pain.001/008 initiations."
atomPath: pain002
coordinate: "pain002 · 8/crest · 9c5db1d2"
contentUuid: "936a4300-2abb-52ef-8cf7-25f6fa7ecd49"
diamondUuid: "b00b0d39-4a3c-8f3a-9290-349129802577"
uuid: "9c5db1d2-febd-845b-9d8c-baf0dcfc0eb4"
horo: 8
typography:
  partition: pain002
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "9a376e73-c427-8c55-9799-dd4f3dbe8683"
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
      stageUuid: "42bc416d-7d56-8ccd-9491-66e8fc72a31e"
    - stage: seal
      stageUuid: "ac83357c-d90c-8d10-90f8-c0160a563ac8"
    - stage: uuid
      stageUuid: "903429f8-60f2-85b0-b458-5e3ab6999648"
version: 2
---
# pain.002 — Customer Payment Status Report

**Law — [[law]]: parse pain.002 status reports into the bank import dual of pain.001/008 initiations.**

Matter-twin: `src/pain002/import/service`. Composes [[iso]]/20022 · [[bank]].
