---
name: postings
description: "Use when writing or querying individual debit/credit lines against a journal entry — source type (invoice/bill/payment/adjustment/revaluation), source date, GL account, amount, currency, and ISO-8601 posted-date auto-set on status → posted. The atomic GL line-item that enforces balanced-entry and SOX posting-timestamp requirements."
atomPath: journal/entries/gl/postings
coordinate: journal/entries/gl/postings · 8/crest · 0d01c048
contentUuid: "637d0e40-2b33-5b0a-8bce-35fc2a554990"
diamondUuid: "d58bc3b4-87da-849c-a7b8-b42efa510afa"
uuid: "0d01c048-9f46-8fef-b356-855de2df9f79"
horo: 8
bonds:
  in:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
  out:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
typography:
  partition: journal
  bondDegree: 27
  neighbors: []
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-19011:2018 audit-trail"
  - "ISO-8601-1:2019 date-time posted-date"
  - "OECD SAF-T §3 transactions"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
  matrix:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
  backlinks:
    - accounting
    - horo
    - identity
    - law
    - proof
    - standard
    - transaction
signatures:
  computationUuid: "dc9f1be4-1735-85cd-a46a-927ac75c8a87"
  stages:
    - stage: path
      stageUuid: "998d8052-9cfd-8254-8b5a-7d7c88b8c706"
    - stage: trinity
      stageUuid: "5bf37e57-14e9-8798-a4ff-34d2581eccad"
    - stage: boundary
      stageUuid: "ebee8c0c-2cdd-8be1-9def-d3c99ac227f3"
    - stage: links
      stageUuid: "6ab9cac1-927f-8427-a632-d376e252d74f"
    - stage: horo
      stageUuid: "760d4ef2-8441-875d-879e-1fcda67e4a9b"
    - stage: seal
      stageUuid: "aabefbf6-f7cc-888f-a0ed-baedfca6fbb8"
    - stage: uuid
      stageUuid: "a88ed1b6-15f6-8df1-bd5e-17dd8b418811"
version: 2
---
# gl-postings

GL Postings — atomic debit/credit lines linked to a journal entry.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-8601-1:2019 date-time posted-date
- IFRS IAS-1 presentation-of-financial-statements
- OECD SAF-T §3 transactions
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[standard]] · [[proof]] · [[identity]] · [[horo]].

**Law — [[law]]: each posting is exactly one debit-or-credit line bound to a single GL account and parent entry, and its posted-date is auto-set the moment status becomes posted.**
