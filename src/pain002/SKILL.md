---
name: pain002
description: "Use when parsing ISO 20022 pain.002 CustomerPaymentStatusReport — status report for pain.001/008 initiations."
atomPath: pain002
coordinate: "pain002 · 5/round · 1785dce7"
contentUuid: "1ed6b828-e3ba-5183-9f4b-ea915a106c43"
diamondUuid: "d41a48c8-3c9c-8ae5-9e0f-4109f700d69b"
uuid: "1785dce7-fbf2-812e-a2d1-0099c799e1c5"
horo: 5
typography:
  partition: pain002
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "a287d57c-8853-8eba-9930-86735b0c669c"
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
      stageUuid: "d6279e7a-f821-8172-9034-185a006e58c4"
    - stage: seal
      stageUuid: "ac83357c-d90c-8d10-90f8-c0160a563ac8"
    - stage: uuid
      stageUuid: "6c371ea4-f07d-8596-86e5-32eb45c71ea7"
version: 2
---
# pain.002 — Customer Payment Status Report

**Law — [[law]]: parse pain.002 status reports into the bank import dual of pain.001/008 initiations.**

Matter-twin: `src/pain002/import/service`. Composes [[iso]]/20022 · [[bank]].
