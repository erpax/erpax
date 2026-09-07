---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 9/unity · 3575c8fa"
contentUuid: "cc596112-76ec-5b4e-a8d9-bd541f8de842"
diamondUuid: "b436d6db-3fc3-8c89-91fb-213522923d41"
uuid: "3575c8fa-7169-8b35-bbf0-4db5bbe26b7a"
horo: 9
typography:
  partition: invoices
  bondDegree: 348
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "c42a4e36-82ec-8ae5-8337-4e241cc1d5b4"
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
      stageUuid: "3c598fb1-4a3b-8ad2-b56e-925bc88caa38"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "19a23c5f-278f-8af2-bdac-8f2cbd73f819"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
