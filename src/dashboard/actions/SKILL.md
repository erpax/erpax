---
name: actions
description: "Use when reasoning about actions — , and take a typed input and return an . Each validates, creates the document, and lets the collection's own hooks do the posting — so a dashboard cannot write an unbalanced entry…"
atomPath: "dashboard/actions"
coordinate: "dashboard/actions · 2/share · 5c462c7c"
contentUuid: "31249f87-21cd-5002-811e-01f905cbd414"
diamondUuid: "8972ff6d-c6ea-831a-bdd8-f0401f45da6f"
uuid: "5c462c7c-9077-8958-8255-556608168ab9"
horo: 2
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
  computationUuid: "c3e38100-5f7c-8081-90c4-b2ee358b5caf"
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
      stageUuid: "63c6b226-7b03-8e29-a00b-7cdf198a7c0f"
    - stage: seal
      stageUuid: "3995fd1f-4062-8682-b377-8f357703abcb"
    - stage: uuid
      stageUuid: "a2cc3beb-71c0-8072-b636-92860bc80162"
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
