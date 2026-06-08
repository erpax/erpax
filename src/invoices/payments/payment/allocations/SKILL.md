---
name: allocations
description: "Use when allocating a single payment across one or more invoices, bills or credit memos — FIFO or manual split, FX gain/loss, fully-settling flag, SOX §404 TOM-AR-02 cash-receipt audit evidence. The payment-allocations collection."
atomPath: invoices/payments/payment/allocations
coordinate: invoices/payments/payment/allocations · 7/descent · a0944cd5
contentUuid: "57264532-5901-5f92-a93e-cf98f5342cd8"
diamondUuid: "c28dd939-4cab-81a7-ab54-e9cd98d9a824"
uuid: "a0944cd5-4210-8c2f-b5bd-3e184382fed9"
horo: 7
bonds:
  in:
    - accounting
    - identity
    - law
    - party
    - payment
    - payments
    - proof
    - standard
    - transaction
  out:
    - accounting
    - identity
    - law
    - party
    - payments
    - proof
    - standard
    - transaction
typography:
  partition: invoices
  bondDegree: 24
  neighbors: []
standards:
  - "IFRS IAS-7 §6 cash-flow-classification"
  - "IFRS IFRS-15 §47 §53 transaction-price-allocation"
  - "ISO-19011:2018 audit-trail allocation-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time allocation-date"
  - "SOX §404 internal-controls cash-allocation TOM-AR-02"
  - "US-GAAP ASC-606-10-32 transaction-price"
bindings: []
neighbors:
  wikilink:
    - accounting
    - identity
    - law
    - party
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - identity
    - law
    - party
    - payments
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - identity
    - law
    - party
    - payments
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "8fd07f4b-11b3-8459-98f5-e982687d3f77"
  stages:
    - stage: path
      stageUuid: "afa4fdff-f704-8618-ba97-f8c67d700810"
    - stage: trinity
      stageUuid: "8b260cb3-9888-86d1-906f-186688d6ec98"
    - stage: boundary
      stageUuid: "7a19d21b-e0a5-8f86-be74-256c2a99bf9e"
    - stage: links
      stageUuid: "dfcd4f10-6150-867a-ae23-412b463648e1"
    - stage: horo
      stageUuid: "9a7f8b7b-6140-88ff-8c46-3abfbf735209"
    - stage: seal
      stageUuid: "1fc506f9-24ec-80f4-908e-d39550882e02"
    - stage: uuid
      stageUuid: "e9a53b88-1cca-8ba0-a0d7-c30edac86f19"
version: 2
---
# payment-allocations

Payment Allocations — explicit allocation of one payment to one or more invoices/bills.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time allocation-date
- IFRS IFRS-15 §47 §53 transaction-price-allocation
- US-GAAP ASC-606-10-32 transaction-price
- IFRS IAS-7 §6 cash-flow-classification
- ISO-19011:2018 audit-trail allocation-evidence
- SOX §404 internal-controls cash-allocation TOM-AR-02
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[proof]] · [[standard]] · [[identity]] · [[party]].

**Law — [[law]]: an allocation explicitly maps one payment onto the specific invoices/bills it settles — the sum of allocations cannot exceed the payment, and the settle is auditable evidence (FIFO or manual), never an implicit guess about which debt the cash cleared.**
