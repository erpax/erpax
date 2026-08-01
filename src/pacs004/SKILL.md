---
name: pacs004
description: Use when parsing ISO 20022 pacs.004 PaymentReturn — return of a previous credit transfer.
atomPath: pacs004
coordinate: "pacs004 · 2/share · e3e59b41"
contentUuid: "7e1f93f2-a6ba-5d11-bd23-1e063d200869"
diamondUuid: "606a0727-1da2-8745-a096-d1a661e5048b"
uuid: "e3e59b41-7c91-88c4-8bb7-226db0b0ec23"
horo: 2
typography:
  partition: pacs004
  bondDegree: 0
standards: []
bindings: []
signatures:
  computationUuid: "99fddb2f-f259-881d-8c8d-6b672ab1d901"
  stages:
    - stage: path
      stageUuid: "135402b2-0854-8718-8ba8-cdcf79b6e462"
    - stage: trinity
      stageUuid: "b7655d8a-ec39-809e-bd2f-a1a2545f5aa4"
    - stage: boundary
      stageUuid: "a574e152-4508-83db-ad43-5d14a5c28a53"
    - stage: links
      stageUuid: "c3a25830-6e6d-88f3-a3c5-5bd4fe9c3d0c"
    - stage: horo
      stageUuid: "eac19cc4-101c-88bb-b3bd-e243f47c60b6"
    - stage: seal
      stageUuid: "d27cce1c-1715-890a-8978-23fc90233a1a"
    - stage: uuid
      stageUuid: "e88f8c47-50a5-81c8-937e-158c15ec3503"
version: 2
---
# pacs.004 — Payment Return

**Law — [[law]]: parse pacs.004 payment-return messages into the bank import dual of outgoing credit transfers.**

Matter-twin: `src/pacs004/import/service`. Composes [[iso]]/20022 · [[bank]].
