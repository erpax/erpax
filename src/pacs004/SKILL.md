---
name: pacs004
description: Use when parsing ISO 20022 pacs.004 PaymentReturn — return of a previous credit transfer.
atomPath: pacs004
coordinate: "pacs004 · 1/base · 79d4073f"
contentUuid: "8545b4dc-21cf-563e-8d57-471c32e2bfd2"
diamondUuid: "74cdf7ca-2110-86ef-b81f-14d56c05a955"
uuid: "79d4073f-e7f9-86a5-bc8e-af5df8467121"
horo: 1
typography:
  partition: pacs004
  bondDegree: 12
standards: []
bindings: []
signatures:
  computationUuid: "e9d1801a-30c0-8568-b25c-a4d6be8fba0b"
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
      stageUuid: "cd525638-2321-8276-b2ff-7518a63c243c"
    - stage: seal
      stageUuid: "4584d8fd-bb5a-855d-a6bc-e0e339e05d63"
    - stage: uuid
      stageUuid: "3bf55888-a273-84e6-bf92-a3a84e49ada7"
version: 2
---
# pacs.004 — Payment Return

**Law — [[law]]: parse pacs.004 payment-return messages into the bank import dual of outgoing credit transfers.**

Matter-twin: `src/pacs004/import/service`. Composes [[iso]]/20022 · [[bank]].
