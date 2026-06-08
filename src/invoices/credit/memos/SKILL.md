---
name: memos
description: "Use when issuing or applying a credit against an invoice — contra-revenue / refund-liability (IFRS-15 §B22), returns, write-offs; lifecycle draft→issued→applied→settled with SoD enforcement and GL posting. The credit-memos collection."
atomPath: invoices/credit/memos
coordinate: invoices/credit/memos · 1/base · 5e760ae0
contentUuid: "d5d0c2b5-cf1d-5b6e-90b4-9657ee2d416c"
diamondUuid: "5f2640cf-1218-877c-bc6d-1a2cf527c314"
uuid: "5e760ae0-037a-8836-9baa-8e8957a1266b"
horo: 1
bonds:
  in:
    - accounting
    - credit
    - customers
    - memo
    - proof
    - refunds
    - tenants
    - transaction
  out:
    - accounting
    - customers
    - memo
    - proof
    - refunds
    - tenants
    - transaction
typography:
  partition: invoices
  bondDegree: 22
  neighbors: []
standards:
  - "COSO-ERM-2017"
  - "EN-16931"
  - "EN-16931:2017 credit-note-semantic-model"
  - "EU-2017/1132"
  - "EU-2017/828"
  - "IFRS IFRS-15 §B22 refund-liability"
  - "IFRS IFRS-15 §B47 contract-cancellation"
  - "ISO-19011:2018 audit-trail"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time issued-at applied-at settled-at"
  - "SOX §404 internal-controls credit-memo-approval"
  - "US-GAAP ASC-606-10-32-10 variable-consideration"
bindings: []
neighbors:
  wikilink:
    - accounting
    - customers
    - proof
    - refunds
    - tenants
    - transaction
  matrix:
    - accounting
    - customers
    - memo
    - proof
    - refunds
    - tenants
    - transaction
  backlinks:
    - accounting
    - customers
    - memo
    - proof
    - refunds
    - tenants
    - transaction
signatures:
  computationUuid: "f40aebb3-6478-805e-8c7d-d400d90a3eb0"
  stages:
    - stage: path
      stageUuid: "10aa267b-48ee-8085-8027-5403424717c1"
    - stage: trinity
      stageUuid: "c4d65bdd-0493-8ab7-a735-ec2c4e2c0223"
    - stage: boundary
      stageUuid: "fa082322-6918-83d1-84a9-7de19fe8dac6"
    - stage: links
      stageUuid: "5d3e1112-88c1-88ff-be5e-814c34cc42d6"
    - stage: horo
      stageUuid: "dfd921db-5593-8a49-bea1-bd2da320ee76"
    - stage: seal
      stageUuid: "7a8d4577-a184-8ccb-9196-6b68a8daa14f"
    - stage: uuid
      stageUuid: "c2c73843-4442-8ebe-a9ba-1917ca54efe4"
version: 2
---
# credit-memos

Credit Memos — IFRS 15 §B22 contract-liability adjustments.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time issued-at applied-at settled-at
- EN-16931:2017 credit-note-semantic-model
- IFRS IFRS-15 §B22 refund-liability
- IFRS IFRS-15 §B47 contract-cancellation
- US-GAAP ASC-606-10-32-10 variable-consideration
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls credit-memo-approval
- ISO-27002 §5.4 segregation-of-duties issuer-vs-approver

Composes: [[Refunds]] · [[accounting]] · [[transaction]] · [[proof]] · [[Tenants]] · [[Customers]].
