---
name: memos
description: "Use when issuing or applying a credit against an invoice — contra-revenue / refund-liability (IFRS-15 §B22), returns, write-offs; lifecycle draft→issued→applied→settled with SoD enforcement and GL posting. The credit-memos collection."
atomPath: "invoices/credit/memos"
coordinate: "invoices/credit/memos · 8/crest · 11fede8d"
contentUuid: "61291a67-1910-5c14-a98c-89a2f2c744a3"
diamondUuid: "6ae531b6-58ee-86db-a562-39a439aac748"
uuid: "11fede8d-bd3b-8f03-928a-159a3d45e3c7"
horo: 8
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
  computationUuid: "93f9fa95-c4bd-8657-abbe-0e4b8b33d480"
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
      stageUuid: "1c6a1ff6-53d1-8601-bc45-522eee81cfde"
    - stage: seal
      stageUuid: "7a8d4577-a184-8ccb-9196-6b68a8daa14f"
    - stage: uuid
      stageUuid: "6ab029ca-98ec-82b7-9924-d733f08af184"
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
