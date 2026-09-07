---
name: quotes
description: "Use when creating or approving pre-contract proposals — line-item pricing, issuer/approver SoD enforcement, sending to customer, accepting, and converting to a sales order. No GL impact until accepted. The IFRS-15 §10 contract-origination collection."
atomPath: "customers/quotes"
coordinate: "customers/quotes · 8/crest · f6c30760"
contentUuid: "b55c5ac0-29b6-50cc-ab81-1bd81d1ef563"
diamondUuid: "fe22b8ca-66b9-8878-970a-7a64e831b352"
uuid: "f6c30760-33d6-8317-8ca4-38980c4af8a2"
horo: 8
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
  computationUuid: "5972a689-778b-82b7-8044-6c055ad386be"
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
      stageUuid: "6f15e552-2e2b-8eda-b646-01853ce01554"
    - stage: seal
      stageUuid: "44bd3d0f-85f2-8537-8186-0fdda4117feb"
    - stage: uuid
      stageUuid: "c3a33ea2-a6c0-8bc5-8557-1072ca09f1df"
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
