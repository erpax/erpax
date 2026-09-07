---
name: actions
description: "Use when reasoning about actions — , and take a typed input and return an . Each validates, creates the document, and lets the collection's own hooks do the posting — so a dashboard cannot write an unbalanced entry…"
atomPath: "dashboard/actions"
coordinate: "dashboard/actions · 1/base · fc5eac72"
contentUuid: "f29a7f54-2006-5636-9cfa-7d34caace402"
diamondUuid: "4e8d98c1-3ce5-8c6f-9eb8-da912ee4e97a"
uuid: "fc5eac72-8a64-8892-9473-97dbcc4c92f3"
horo: 1
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
  computationUuid: "1859abdb-387d-8d71-898f-9a60769ecfa7"
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
      stageUuid: "b6e5c451-c575-873b-b3b1-e3f0c5ab075c"
    - stage: seal
      stageUuid: "3995fd1f-4062-8682-b377-8f357703abcb"
    - stage: uuid
      stageUuid: "87d7e557-7c1e-835d-8cc2-0f283ff13aab"
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
