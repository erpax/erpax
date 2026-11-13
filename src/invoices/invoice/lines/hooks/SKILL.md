---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 9/unity · 1e4362f1"
contentUuid: "850542ca-c832-590d-8e99-4af10ad2cbe5"
diamondUuid: "45c4eb4c-36c2-8b4d-9755-7c8ea01edffe"
uuid: "1e4362f1-da48-810e-a414-5da36e3264e3"
horo: 9
typography:
  partition: invoices
  bondDegree: 288
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "0360143c-5933-8512-9e3b-4b7e9a7f8caf"
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
      stageUuid: "199ddb53-5421-86f3-b474-5528d1ab80c1"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "bc694758-76ac-82e7-9654-100d0f15d27d"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
