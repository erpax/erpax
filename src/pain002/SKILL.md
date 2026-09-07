---
name: pain002
description: "Use when parsing ISO 20022 pain.002 CustomerPaymentStatusReport — status report for pain.001/008 initiations."
atomPath: pain002
coordinate: "pain002 · 5/round · 84c93b54"
contentUuid: "32d50831-47cb-58f8-8ca3-66d2d3710785"
diamondUuid: "be7d1e0b-6ebc-8556-a69e-09ea7652afe1"
uuid: "84c93b54-5dd8-8e4e-a09d-2a37b6e123e8"
horo: 5
typography:
  partition: pain002
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "433c2281-3940-8bc5-bfad-f8ec2af6c031"
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
      stageUuid: "4068fba1-0dc4-82be-971c-d28ad91c1677"
    - stage: seal
      stageUuid: "ac83357c-d90c-8d10-90f8-c0160a563ac8"
    - stage: uuid
      stageUuid: "e0c112b0-d54f-8265-8c2f-bb3128b80b72"
version: 2
---
# pain.002 — Customer Payment Status Report

**Law — [[law]]: parse pain.002 status reports into the bank import dual of pain.001/008 initiations.**

Matter-twin: `src/pain002/import/service`. Composes [[iso]]/20022 · [[bank]].
