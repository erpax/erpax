---
name: hooks
description: "Use when reasoning about hooks — derives the header's amounts from the lines whenever a line changes, and moves the stock the line commits. normalises the line before either runs."
atomPath: "invoices/invoice/lines/hooks"
coordinate: "invoices/invoice/lines/hooks · 6/6 · f6ba5c3c"
contentUuid: "866b2a89-2b6b-59af-a447-e00c55f4393a"
diamondUuid: "fc46e4fc-4454-8aa4-898b-41bc35184e1b"
uuid: "f6ba5c3c-4b6b-8649-8b8d-3583ac0e8ebd"
horo: 6
typography:
  partition: invoices
  bondDegree: 312
standards:
  - "US-GAAP"
bindings: []
signatures:
  computationUuid: "0fc5615e-7d95-813c-96e6-59b5b4441e5c"
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
      stageUuid: "80b0a301-dfa6-8185-9319-8cedc0bea948"
    - stage: seal
      stageUuid: "401412b2-ddfb-8e25-ad58-9836680b4769"
    - stage: uuid
      stageUuid: "bcd3d35e-7c51-86ba-b30b-98c2e82aecb5"
version: 2
---
# invoices/invoice/lines/hooks — a total is recomputed from the lines, never accepted from the caller

`recomputeInvoiceTotals` derives the header's amounts from the lines whenever a line changes, and
`recomputeItemInventory` moves the stock the line commits. `beforeValidate` normalises the line
before either runs.

A total sent by a client is a number that can disagree with the rows beneath it. Recomputing it
means the invoice cannot state a sum its own lines do not make.

Composes: [[law]].
