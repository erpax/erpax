---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 6/6 · 8fbdc3f9"
contentUuid: "d16ee4c7-7d0d-5a46-98a6-ad5a19a1fb59"
diamondUuid: "37b5c03b-8fa4-8012-9dd6-5368c34ca4fa"
uuid: "8fbdc3f9-af47-8e8f-9c8e-dfa36a732862"
horo: 6
typography:
  partition: invoices
  bondDegree: 312
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "e61c88de-086d-8921-ad19-95c14490688f"
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
      stageUuid: "5ea67877-5a0e-87fd-9fe4-0708265bd810"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "0ed97f3c-7c94-824e-96b5-c86e31889242"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
