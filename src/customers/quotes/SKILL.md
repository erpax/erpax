---
name: quotes
description: "Use when creating or approving pre-contract proposals — line-item pricing, issuer/approver SoD enforcement, sending to customer, accepting, and converting to a sales order. No GL impact until accepted. The IFRS-15 §10 contract-origination collection."
atomPath: "customers/quotes"
coordinate: "customers/quotes · 5/round · 8c90ad7f"
contentUuid: "7379b53e-5877-5e07-8777-133013461894"
diamondUuid: "b1f00f7d-aaba-8829-9d4d-5f849862234a"
uuid: "8c90ad7f-7d8f-8f40-8405-789150d9fb30"
horo: 5
typography:
  partition: customers
  bondDegree: 33
standards:
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time issued-at expires-at"
  - "ISO-8601-1:2019 date-time issued-at expires-at`"
  - "SOX §404 internal-controls quote-approval"
  - "US-GAAP ASC-606-10-25 contract-existence"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "4e9f7112-05a2-8508-b727-df1ae6ecacf2"
  stages:
    - stage: path
      stageUuid: "a83bba08-3b7a-8b01-9360-ec5673842853"
    - stage: trinity
      stageUuid: "e2fa1b1a-e875-8d08-8b88-f61d83d639b3"
    - stage: boundary
      stageUuid: "0dd0faa3-9316-8975-abec-4d7bcc17a757"
    - stage: links
      stageUuid: "7cd6d62b-8fec-88ad-ac73-eb7ebfed0555"
    - stage: horo
      stageUuid: "c7711b7e-d4c9-8372-bc11-b009f7762965"
    - stage: seal
      stageUuid: "44bd3d0f-85f2-8537-8186-0fdda4117feb"
    - stage: uuid
      stageUuid: "1838624a-e10a-8a1e-80db-02baa760c49c"
version: 2
---
# quotes

Quotes — IFRS 15 / ASC 606 contract origination.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time issued-at expires-at`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time issued-at expires-at
- IFRS IFRS-15 §10 contract-with-customer
- US-GAAP ASC-606-10-25 contract-existence
- ISO-19011:2018 audit-trail quote-issuance
- SOX §404 internal-controls quote-approval
- ISO-27002 §5.4 segregation-of-duties

Composes: [[field]] · [[collections]] · [[transaction]] · [[accounting]] · [[identity]] · [[standard]].

**Law — [[law]]: a quote posts no GL entry until accepted, and its issuer can never be its approver.**
