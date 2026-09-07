---
name: pacs004
description: Use when parsing ISO 20022 pacs.004 PaymentReturn — return of a previous credit transfer.
atomPath: pacs004
coordinate: "pacs004 · 4/weave · da08452a"
contentUuid: "64e3cc05-c04f-54d0-b580-53d059d4d70a"
diamondUuid: "f524fa8a-05b0-82d9-bfea-b682ac926e18"
uuid: "da08452a-c346-8293-a382-1ceaf2921aec"
horo: 4
typography:
  partition: pacs004
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "9f1be17d-5893-8437-b638-8b1c2ded9ccd"
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
      stageUuid: "a899702c-8a3e-8f33-ab08-1740d8fd4958"
    - stage: seal
      stageUuid: "4584d8fd-bb5a-855d-a6bc-e0e339e05d63"
    - stage: uuid
      stageUuid: "b942b07b-2c3f-8e50-aed4-bb3476c032f7"
version: 2
---
# pacs.004 — Payment Return

**Law — [[law]]: parse pacs.004 payment-return messages into the bank import dual of outgoing credit transfers.**

Matter-twin: `src/pacs004/import/service`. Composes [[iso]]/20022 · [[bank]].
