---
name: memos
description: "Use when issuing or applying a credit against an invoice — contra-revenue / refund-liability (IFRS-15 §B22), returns, write-offs; lifecycle draft→issued→applied→settled with SoD enforcement and GL posting. The credit-memos collection."
atomPath: "invoices/credit/memos"
coordinate: "invoices/credit/memos · 7/descent · 870b379c"
contentUuid: "a99514bc-f18f-506b-81a7-2194f730f9e7"
diamondUuid: "8bac49bd-afc2-81df-b5ca-49e98d0bfcb9"
uuid: "870b379c-7a36-8bc8-ad21-9c6794580b22"
horo: 7
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
  computationUuid: "0705eabd-7a99-8cea-ae0d-616bd548b778"
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
      stageUuid: "05f70443-daf5-83d5-a6cc-b3d25c253c5c"
    - stage: seal
      stageUuid: "7a8d4577-a184-8ccb-9196-6b68a8daa14f"
    - stage: uuid
      stageUuid: "59801c83-de0b-8a20-9905-cdccd563ee86"
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
