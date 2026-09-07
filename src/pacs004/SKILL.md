---
name: pacs004
description: Use when parsing ISO 20022 pacs.004 PaymentReturn — return of a previous credit transfer.
atomPath: pacs004
coordinate: "pacs004 · 2/share · d6fe54c7"
contentUuid: "fce8641c-a7f7-54dc-bae4-397f6fd5f07d"
diamondUuid: "5b4c29ad-d539-895a-8928-8f6e3e4b6b85"
uuid: "d6fe54c7-244d-8d3a-bbda-8429fae9ae9d"
horo: 2
typography:
  partition: pacs004
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "37757d6e-52f0-83ad-b77a-20d4d1604eb8"
  stages:
    - stage: path
      stageUuid: "135402b2-0854-8718-8ba8-cdcf79b6e462"
    - stage: trinity
      stageUuid: "a1efb967-319b-82a3-a97b-dc87f07e7d3a"
    - stage: boundary
      stageUuid: "42354f8b-c4f2-81d2-a93e-34a8219b1342"
    - stage: links
      stageUuid: "c3a25830-6e6d-88f3-a3c5-5bd4fe9c3d0c"
    - stage: horo
      stageUuid: "01182518-4369-877a-a090-c486477f39c5"
    - stage: seal
      stageUuid: "4584d8fd-bb5a-855d-a6bc-e0e339e05d63"
    - stage: uuid
      stageUuid: "6dbf8529-ebcd-80c8-b2f5-8cb473d0d2b4"
version: 2
---
# pacs.004 — Payment Return

**Law — [[law]]: parse pacs.004 payment-return messages into the bank import dual of outgoing credit transfers.**

Matter-twin: `src/pacs004/import/service`. Composes [[iso]]/20022 · [[bank]].
