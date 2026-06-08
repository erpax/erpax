---
name: quotes
description: "Use when creating or approving pre-contract proposals — line-item pricing, issuer/approver SoD enforcement, sending to customer, accepting, and converting to a sales order. No GL impact until accepted. The IFRS-15 §10 contract-origination collection."
atomPath: customers/quotes
coordinate: customers/quotes · 1/base · 1b87138f
contentUuid: "f921944b-381a-5c90-beb5-1b12ea6f4a90"
diamondUuid: "a8f30355-3450-83e0-bce2-1fc1439f71c0"
uuid: "1b87138f-de36-8272-9fc9-b1a90b173bb5"
horo: 1
bonds:
  in:
    - accounting
    - collections
    - customers
    - discount
    - fields
    - identity
    - law
    - orders
    - standard
    - transaction
  out:
    - accounting
    - collections
    - discount
    - fields
    - identity
    - law
    - orders
    - standard
    - transaction
typography:
  partition: customers
  bondDegree: 33
  neighbors: []
standards:
  - "IFRS IFRS-15 §10 contract-with-customer"
  - "ISO-19011:2018 audit-trail quote-issuance"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time issued-at expires-at"
  - "SOX §404 internal-controls quote-approval"
  - "US-GAAP ASC-606-10-25 contract-existence"
bindings: []
neighbors:
  wikilink:
    - accounting
    - collections
    - fields
    - identity
    - law
    - standard
    - transaction
  matrix:
    - accounting
    - collections
    - discount
    - fields
    - identity
    - law
    - orders
    - standard
    - transaction
  backlinks:
    - accounting
    - collections
    - discount
    - fields
    - identity
    - law
    - orders
    - standard
    - transaction
signatures:
  computationUuid: "469764a9-c278-825f-9ae2-bf2dbd434fd0"
  stages:
    - stage: path
      stageUuid: "a83bba08-3b7a-8b01-9360-ec5673842853"
    - stage: trinity
      stageUuid: "e2fa1b1a-e875-8d08-8b88-f61d83d639b3"
    - stage: boundary
      stageUuid: "0dd0faa3-9316-8975-abec-4d7bcc17a757"
    - stage: links
      stageUuid: "49b01b43-f544-871b-932b-6fcb3738881c"
    - stage: horo
      stageUuid: "182ec334-42f4-834f-897b-f3453c50c8b5"
    - stage: seal
      stageUuid: "2610e8d6-fe72-8918-a9f7-e9997a7f2939"
    - stage: uuid
      stageUuid: "9917e6ef-b142-8e2a-8035-66cbeaebb289"
version: 2
---
# quotes

Quotes — IFRS 15 / ASC 606 contract origination.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time issued-at expires-at
- IFRS IFRS-15 §10 contract-with-customer
- US-GAAP ASC-606-10-25 contract-existence
- ISO-19011:2018 audit-trail quote-issuance
- SOX §404 internal-controls quote-approval
- ISO-27002 §5.4 segregation-of-duties

Composes: [[fields]] · [[collections]] · [[transaction]] · [[accounting]] · [[identity]] · [[standard]].

**Law — [[law]]: a quote posts no GL entry until accepted, and its issuer can never be its approver.**
