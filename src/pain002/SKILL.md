---
name: pain002
description: "Use when parsing ISO 20022 pain.002 CustomerPaymentStatusReport — status report for pain.001/008 initiations."
atomPath: pain002
coordinate: "pain002 · 5/round · 7e86af32"
contentUuid: "38fefa1a-b4b0-57ab-a09c-ce76e1b41c20"
diamondUuid: "f1e5054e-c31b-891a-b01a-c50ca5c42af2"
uuid: "7e86af32-63ab-8fc7-bbea-536a7af5bccb"
horo: 5
typography:
  partition: pain002
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "7e70e86e-d006-86ec-9638-e5c3ddfb1b68"
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
      stageUuid: "ef4ea476-b7d9-85a5-8775-074a85939ed9"
    - stage: seal
      stageUuid: "ac83357c-d90c-8d10-90f8-c0160a563ac8"
    - stage: uuid
      stageUuid: "ae4e6d90-595c-81c0-8a9b-e4dd4b632c86"
version: 2
---
# pain.002 — Customer Payment Status Report

**Law — [[law]]: parse pain.002 status reports into the bank import dual of pain.001/008 initiations.**

Matter-twin: `src/pain002/import/service`. Composes [[iso]]/20022 · [[bank]].
