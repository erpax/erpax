---
name: memos
description: "Use when issuing or applying a credit against an invoice — contra-revenue / refund-liability (IFRS-15 §B22), returns, write-offs; lifecycle draft→issued→applied→settled with SoD enforcement and GL posting. The credit-memos collection."
atomPath: "invoices/credit/memos"
coordinate: "invoices/credit/memos · 8/crest · 87ee3f56"
contentUuid: "9bbce152-eef1-50ab-ac3e-5a7fe7fec1fb"
diamondUuid: "f1099ff7-5ef1-8311-866b-034d36762692"
uuid: "87ee3f56-5514-85ee-b3a8-4d67242cb38b"
horo: 8
typography:
  partition: invoices
  bondDegree: 18
standards:
  - "EN-16931:2017 credit-note-semantic-model"
  - "EN-16931:2017 credit-note-semantic-model`"
  - "IFRS IFRS-15 §B22 refund-liability"
  - "IFRS IFRS-15 §B47 contract-cancellation"
  - "ISO-20022 pacs.004 payment-return"
  - "ISO-20022 pacs.004 payment-return`"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time issued-at applied-at settled-at"
  - "ISO-8601-1:2019 date-time issued-at applied-at settled-at`"
  - "PCI-DSS-4.0 §3.2 tokenized-card-data via-stripe"
  - "SOX §404 internal-controls credit-memo-approval"
  - "US-GAAP ASC-606-10-32-10 variable-consideration"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "8a879fa3-b1fc-822a-a9ed-285ab2a20946"
  stages:
    - stage: path
      stageUuid: "10aa267b-48ee-8085-8027-5403424717c1"
    - stage: trinity
      stageUuid: "c4d65bdd-0493-8ab7-a735-ec2c4e2c0223"
    - stage: boundary
      stageUuid: "d5e583e2-0f8c-80b4-8c5e-bb3f0bef5b67"
    - stage: links
      stageUuid: "087bafda-9803-893e-be1e-77a1f74b68a1"
    - stage: horo
      stageUuid: "10c0ccfb-cca3-81dd-9554-04a161751879"
    - stage: seal
      stageUuid: "7a8d4577-a184-8ccb-9196-6b68a8daa14f"
    - stage: uuid
      stageUuid: "e19c0998-6fe3-8a72-b046-aa6ae0f459b1"
version: 2
---
# credit-memos

Credit Memos — IFRS 15 §B22 contract-liability adjustments.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## A refund is a line on the memo

A refund used to be its own collection: one row per cash payment back, each requiring exactly one
credit memo, with a status list that nearly repeated the memo's. It is the memo's cash-out stage,
so it is now the memo's `refunds` list — amount, method, rail reference, status, the two
timestamps, the failure reason and the journal entry, per payment.

- `refunded(memo)` — cash that has left: the issued and settled lines. A pending, failed or
  voided line pays nothing.
- `coveredByRefunds(memo)` — the SETTLED lines cover the amount. An issued line has left and not
  arrived, so it does not count.
- `withRefundStages(memo, now)` — the before-change step: stamps each line once when issued and
  once when settled, and moves an issued or applied memo to settled when it is covered. A draft
  or voided memo is never settled by its lines.
- `memoPresets()` — the two saved lists; "Refunds" is the memos that have a refund line, and
  stands where the collection's own list stood.

**Honest boundary.** A partial refund leaves the memo open, and nothing here decides what happens
to the remainder. `withinAmount` refuses lines that promise more than the memo credits (a failed or
voided line promises nothing), so an over-refund cannot be saved. The Refunds list filters on the line field through the query API; it is
declared here and not yet loaded into any tenant.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time issued-at applied-at settled-at`
- `@standard EN-16931:2017 credit-note-semantic-model`
- `@standard ISO-20022 pacs.004 payment-return`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time issued-at applied-at settled-at
- EN-16931:2017 credit-note-semantic-model
- IFRS IFRS-15 §B22 refund-liability
- IFRS IFRS-15 §B47 contract-cancellation
- US-GAAP ASC-606-10-32-10 variable-consideration
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls credit-memo-approval
- ISO-27002 §5.4 segregation-of-duties issuer-vs-approver

Composes: [[preset]] · [[accounting]] · [[transaction]] · [[proof]] · [[Tenants]] · [[Customers]].
