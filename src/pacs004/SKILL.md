---
name: pacs004
description: Use when parsing ISO 20022 pacs.004 PaymentReturn — return of a previous credit transfer.
atomPath: pacs004
coordinate: "pacs004 · 8/crest · 6634a363"
contentUuid: "ab28eaaa-df7a-53a0-9fd6-22ad9c0cc3f3"
diamondUuid: "836a01bd-e157-83d0-9009-8ef3b42876af"
uuid: "6634a363-b34c-8afc-bc7b-87adcee00512"
horo: 8
typography:
  partition: pacs004
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "c5f0ff1f-2805-880c-8493-0050366be734"
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
      stageUuid: "8edd4120-d140-83f5-a192-a8a31a44c541"
    - stage: seal
      stageUuid: "4584d8fd-bb5a-855d-a6bc-e0e339e05d63"
    - stage: uuid
      stageUuid: "61ec5afb-dc1f-880b-8284-224194a9c358"
version: 2
---
# pacs.004 — Payment Return

**Law — [[law]]: parse pacs.004 payment-return messages into the bank import dual of outgoing credit transfers.**

Matter-twin: `src/pacs004/import/service`. Composes [[iso]]/20022 · [[bank]].
