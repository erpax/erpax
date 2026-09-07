---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 9/unity · 7331ee12"
contentUuid: "5ae0b095-fed0-5c7e-ae4b-8bae194c1aa5"
diamondUuid: "395d141c-f601-812c-889b-fbf5565ed892"
uuid: "7331ee12-a28e-887a-baa0-4e6d7b029fea"
horo: 9
typography:
  partition: invoices
  bondDegree: 348
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "ab6c3098-0877-816f-bdcc-e1b33b6345c5"
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
      stageUuid: "8aa545cb-54a8-8712-a6e6-1da3da427308"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "082bee60-ca7b-8880-af07-240aa405c1ee"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
