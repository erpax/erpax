---
name: memos
description: "Use when issuing or applying a credit against an invoice — contra-revenue / refund-liability (IFRS-15 §B22), returns, write-offs; lifecycle draft→issued→applied→settled with SoD enforcement and GL posting. The credit-memos collection."
atomPath: "invoices/credit/memos"
coordinate: "invoices/credit/memos · 4/weave · e8d44529"
contentUuid: "f81c1552-9f17-5b48-81b0-a9b6b9ca208f"
diamondUuid: "3af4f446-2677-85ac-a285-1d088f3db037"
uuid: "e8d44529-e788-8b12-b01b-556b6937cbd4"
horo: 4
typography:
  partition: invoices
  bondDegree: 22
standards:
  - "EN-16931:2017 credit-note-semantic-model"
  - "EN-16931:2017 credit-note-semantic-model`"
  - "IFRS IFRS-15 §B22 refund-liability"
  - "IFRS IFRS-15 §B47 contract-cancellation"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time issued-at applied-at settled-at"
  - "ISO-8601-1:2019 date-time issued-at applied-at settled-at`"
  - "SOX §404 internal-controls credit-memo-approval"
  - "US-GAAP ASC-606-10-32-10 variable-consideration"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "5b8914a1-6569-8c33-94f9-c0232e327fcb"
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
      stageUuid: "26fe3acd-cfb7-8833-a181-b07c5b8137a5"
    - stage: seal
      stageUuid: "7a8d4577-a184-8ccb-9196-6b68a8daa14f"
    - stage: uuid
      stageUuid: "408a94f5-fd17-893a-838b-122f59388a50"
version: 2
---
# credit-memos

Credit Memos — IFRS 15 §B22 contract-liability adjustments.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time issued-at applied-at settled-at`
- `@standard EN-16931:2017 credit-note-semantic-model`

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
