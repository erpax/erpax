---
name: actions
description: "Use when reasoning about actions — , and take a typed input and return an . Each validates, creates the document, and lets the collection's own hooks do the posting — so a dashboard cannot write an unbalanced entry…"
atomPath: "dashboard/actions"
coordinate: "dashboard/actions · 8/crest · 22dcec66"
contentUuid: "cedd0a98-d1f2-5663-8b78-6aaa57be8789"
diamondUuid: "71366461-2ddc-8539-94d2-352bc2ea1a32"
uuid: "22dcec66-4a9c-8949-97e8-1be65a2489ae"
horo: 8
typography:
  partition: dashboard
  bondDegree: 4
standards:
  - "ECMA-262"
  - "ECMA-262 ECMAScript-2024 baseline"
  - "EU-CSDDD-2024/1760"
  - "IFRS IFRS-15 revenue-from-contracts-with-customers"
  - "IFRS double-entry-bookkeeping"
  - "ISO-4217:2015 currency-codes monetary-amount"
  - "ISO-8601-1:2019 date-time entry-date invoice-date"
  - "NIST INCITS-359 role-based-access-control"
  - "NIST-INCITS-359-2012"
  - "SOX §404 internal-controls"
bindings: []
signatures:
  computationUuid: "334e2761-3d72-8df3-b43d-1916b2c89303"
  stages:
    - stage: path
      stageUuid: "0876f985-b420-8341-94cc-fbb79d57b13e"
    - stage: trinity
      stageUuid: "831429d6-75f6-87f7-a439-6f57fb292813"
    - stage: boundary
      stageUuid: "ac547243-fa46-80ac-8153-f76c4d53a532"
    - stage: links
      stageUuid: "864bbb33-3b7b-8a10-9803-3f15ca4ee76e"
    - stage: horo
      stageUuid: "32c4acdb-a911-8168-bd5b-618fcf5fc2f5"
    - stage: seal
      stageUuid: "3995fd1f-4062-8682-b377-8f357703abcb"
    - stage: uuid
      stageUuid: "71ba9d01-ea63-8c62-a600-a73eaacbe4a4"
version: 2
---
# dashboard/actions — a document is created by a server action that books it, never by a form that posts fields

`createJournalEntryAction`, `createSalesInvoiceAction` and `createVendorBillAction` take a
typed input and return an `ActionResult`. Each validates, creates the document, and lets the
collection's own hooks do the posting — so a dashboard cannot write an unbalanced entry by
bypassing the ledger.

The inputs are the boundary: `JournalEntryLineInput`, `SalesInvoiceInput`, `VendorBillInput`.
Anything a caller sends outside them is not accepted, which is what keeps the action a door
rather than a passthrough.

Composes: [[law]].
