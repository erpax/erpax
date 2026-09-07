---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 6/6 · ff834871"
contentUuid: "e4ff872a-98a4-5d27-8085-4408d18b01b9"
diamondUuid: "084368ad-2c02-8576-8da2-6ab089cca421"
uuid: "ff834871-d19a-82dd-ab01-bb4439e16080"
horo: 6
typography:
  partition: invoices
  bondDegree: 312
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "90c86b3c-5ed6-81ae-9eea-9bdb52fd3e96"
  stages:
    - stage: path
      stageUuid: "653de0d4-0706-86c6-967b-67d276782ac3"
    - stage: trinity
      stageUuid: "0a2a8655-7efb-8765-babd-0499463cecc1"
    - stage: boundary
      stageUuid: "11ef209c-e0d8-82a5-a573-75030211cd01"
    - stage: links
      stageUuid: "98a0e0a5-3bda-81f1-be36-11b2d8cf26f7"
    - stage: horo
      stageUuid: "884fde05-35c7-8177-83a5-c1c8758dad7a"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "ff8651b5-796c-8282-a317-3a74ffb20968"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
