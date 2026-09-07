---
name: allocations
description: "Use when allocating a single payment across one or more invoices, bills or credit memos — FIFO or manual split, FX gain/loss, fully-settling flag, SOX §404 TOM-AR-02 cash-receipt audit evidence. The payment-allocations collection."
atomPath: "invoices/payments/payment/allocations"
coordinate: "invoices/payments/payment/allocations · 4/weave · 675fcdcb"
contentUuid: "3d57f397-2b1b-5a85-9f24-1b301d648560"
diamondUuid: "3d7bce1c-9e3c-82ca-b3bd-7c907714cce2"
uuid: "675fcdcb-64e6-8c99-9ecf-f4caa2a33d54"
horo: 4
typography:
  partition: invoices
  bondDegree: 24
standards:
  - "IFRS IAS-7 §6 cash-flow-classification"
  - "IFRS IFRS-15 §47 §53 transaction-price-allocation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time allocation-date"
  - "ISO-8601-1:2019 date-time allocation-date`"
  - "SOX §404 internal-controls cash-allocation TOM-AR-02"
  - "US-GAAP ASC-606-10-32 transaction-price"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "0991ca1b-2140-899a-b24d-f04b3526a7f4"
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
      stageUuid: "744c5b64-eaaf-896f-80ed-6fc65128947d"
    - stage: seal
      stageUuid: "1fc506f9-24ec-80f4-908e-d39550882e02"
    - stage: uuid
      stageUuid: "6b67051a-937c-875d-b6a9-f9163f30a900"
version: 2
---
# payment-allocations

Payment Allocations — explicit allocation of one payment to one or more invoices/bills.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time allocation-date`

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
