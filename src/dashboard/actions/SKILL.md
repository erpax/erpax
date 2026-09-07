---
name: actions
description: "Use when reasoning about actions — , and take a typed input and return an . Each validates, creates the document, and lets the collection's own hooks do the posting — so a dashboard cannot write an unbalanced entry…"
atomPath: "dashboard/actions"
coordinate: "dashboard/actions · 7/descent · f1e0a12b"
contentUuid: "058dc71b-c27d-52f3-83d9-27351287b198"
diamondUuid: "401a33b5-9dab-8b37-924f-cd9bccf1e89d"
uuid: "f1e0a12b-88fb-8baf-942f-59fdcdc9ebf0"
horo: 7
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
  computationUuid: "9ffabacc-4664-854f-83ae-875161366407"
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
      stageUuid: "3ea6c41f-6661-8157-8a9f-321ed623018f"
    - stage: seal
      stageUuid: "3995fd1f-4062-8682-b377-8f357703abcb"
    - stage: uuid
      stageUuid: "971cad75-5300-8db0-8a1a-e88ab3333152"
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
