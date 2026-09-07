---
name: pacs004
description: Use when parsing ISO 20022 pacs.004 PaymentReturn — return of a previous credit transfer.
atomPath: pacs004
coordinate: "pacs004 · 5/round · e4f9563c"
contentUuid: "d570a836-3215-57b3-b8d7-01b9ce66e4e5"
diamondUuid: "1881e1e8-b606-8a71-a609-e2bfce753065"
uuid: "e4f9563c-950d-8467-9383-e6df2b4ae5aa"
horo: 5
typography:
  partition: pacs004
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "bfe9e7d2-bcdd-8be5-befe-d11cf34c05e9"
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
      stageUuid: "dc3ca2e9-ee7a-87ac-9989-54cc87d4d21c"
    - stage: seal
      stageUuid: "4584d8fd-bb5a-855d-a6bc-e0e339e05d63"
    - stage: uuid
      stageUuid: "27324571-d772-83f2-ab3b-6d1ef4ba82f6"
version: 2
---
# pacs.004 — Payment Return

**Law — [[law]]: parse pacs.004 payment-return messages into the bank import dual of outgoing credit transfers.**

Matter-twin: `src/pacs004/import/service`. Composes [[iso]]/20022 · [[bank]].
