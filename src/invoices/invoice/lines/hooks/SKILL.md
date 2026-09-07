---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 6/6 · 0dec3eb4"
contentUuid: "3ec339c4-5200-5606-a9ac-f3e965888df2"
diamondUuid: "8267dd37-fecc-8b04-a1cb-69fb82273534"
uuid: "0dec3eb4-5102-8a26-bfee-c610bf9f512e"
horo: 6
typography:
  partition: invoices
  bondDegree: 312
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "23a959b0-2518-88bc-b4ff-5b294600633d"
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
      stageUuid: "d1cfb74c-6712-8858-940e-33d23af3e73e"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "a74adf5e-6dc2-8645-941d-2bce90945b35"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
