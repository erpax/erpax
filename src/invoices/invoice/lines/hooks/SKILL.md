---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 9/unity · 1e4362f1"
contentUuid: "f274167f-144b-5bfb-af12-2e94195e2338"
diamondUuid: "216b7db7-b102-8c2f-b390-2df1672d0e71"
uuid: "1e4362f1-da48-810e-a414-5da36e3264e3"
horo: 9
typography:
  partition: invoices
  bondDegree: 333
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "ccf15179-ac89-8739-bb85-bae7a087cab0"
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
      stageUuid: "5c32033c-dd35-8f17-a54b-74f8d9c6cfbc"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "799501d9-6ee5-8d58-9652-f032245a01f1"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
