---
name: quotes
description: "Use when creating or approving pre-contract proposals — line-item pricing, issuer/approver SoD enforcement, sending to customer, accepting, and converting to a sales order. No GL impact until accepted. The IFRS-15 §10 contract-origination collection."
atomPath: "customers/quotes"
coordinate: "customers/quotes · 5/round · 7c079cdc"
contentUuid: "6b4ebfc9-532e-5647-a1aa-92195e6e4790"
diamondUuid: "786351ea-3987-8b64-91b6-884fbd4db4b1"
uuid: "7c079cdc-4d0d-8904-bb9f-9440ee3e12bf"
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
  computationUuid: "a9a44f68-b8aa-8634-b510-040ab947d28b"
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
      stageUuid: "3df7b686-f739-8f76-8556-d4c00e563fb8"
    - stage: seal
      stageUuid: "44bd3d0f-85f2-8537-8186-0fdda4117feb"
    - stage: uuid
      stageUuid: "a2adbd5a-9732-84ed-87f7-32b91746f177"
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
