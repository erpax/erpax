---
name: actions
description: "Use when reasoning about actions — , and take a typed input and return an . Each validates, creates the document, and lets the collection's own hooks do the posting — so a dashboard cannot write an unbalanced entry…"
atomPath: "dashboard/actions"
coordinate: "dashboard/actions · 2/share · 12e2a07a"
contentUuid: "6c78ad11-42eb-597e-9818-3e1f193fd5e3"
diamondUuid: "bd375457-0e28-8953-8a9a-d3ef770bbe00"
uuid: "12e2a07a-7323-8052-b1be-317f48051a11"
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
  computationUuid: "5221a2b2-48f5-8d55-ae3d-a671e94f4565"
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
      stageUuid: "77d1b94c-b260-85fc-b286-84b32a43bec9"
    - stage: seal
      stageUuid: "3995fd1f-4062-8682-b377-8f357703abcb"
    - stage: uuid
      stageUuid: "0e4e4ef3-016b-89b4-a7ea-f09da2bfab3f"
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
