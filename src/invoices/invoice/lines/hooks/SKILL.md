---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 3/3 · 4291bf7b"
contentUuid: "bc108d55-9c55-5e61-aa3e-6c4f286e1bc2"
diamondUuid: "2bfbe8af-117d-8991-ac1c-f6eab02b0acc"
uuid: "4291bf7b-24c7-8b3c-adc1-0d6f00788454"
horo: 3
typography:
  partition: invoices
  bondDegree: 348
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "eb400af1-ba64-8eba-9055-09af4affa0ca"
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
      stageUuid: "eb9ed940-3423-8c34-86bb-8c7aaae0a9d0"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "b9cfdb70-e893-8906-adce-3feeab07afee"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
