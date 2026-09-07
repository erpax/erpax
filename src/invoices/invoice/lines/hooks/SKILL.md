---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 3/3 · cf2c8e4a"
contentUuid: "9351ef85-ac03-5b4b-b095-1fb1267a22cb"
diamondUuid: "1267f1fe-bc8f-820d-9421-a2eaa8d11e62"
uuid: "cf2c8e4a-aaad-8630-8c5a-b4c37e0ccbab"
horo: 3
typography:
  partition: invoices
  bondDegree: 348
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "6033578e-ee84-853b-a273-56b033c2bbbf"
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
      stageUuid: "b6362e67-ac3c-860d-8d58-26dc8e822222"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "f41d8db3-0268-82f1-a136-cd4998d17bba"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
