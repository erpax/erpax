---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 3/3 · 8abc7937"
contentUuid: "ba804f48-1159-5ec4-8bfa-daed66718e4f"
diamondUuid: "696a160e-1d7f-8fa3-9377-c1fd4e298883"
uuid: "8abc7937-44eb-8713-9830-fced6e186a62"
horo: 3
typography:
  partition: invoices
  bondDegree: 348
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "dc7e1c68-8cc7-812d-9f82-91de0b9c1bb7"
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
      stageUuid: "adc2ccaf-0a19-8de2-bc9a-8a6a86e80dd2"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "9def34e5-43f1-8ea3-a11f-b97797c9b27b"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
