---
name: postings
description: "Use when writing or querying individual debit/credit lines against a journal entry — source type (invoice/bill/payment/adjustment/revaluation), source date, GL account, amount, currency, and ISO-8601 posted-date auto-set on status → posted. The atomic GL line-item that enforces balanced-entry and SOX posting-timestamp requirements."
atomPath: "journal/entries/gl/postings"
coordinate: "journal/entries/gl/postings · 1/base · 18c183a2"
contentUuid: "b0df7d28-9dbf-506d-aa84-84c0a223f874"
diamondUuid: "9eac1b1c-b1ca-87ea-b4fe-e26fc1f2dd45"
uuid: "18c183a2-b0a0-829a-b874-328af03f7754"
horo: 1
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
  - "ISO-8601-1:2019 date-time posted-date"
  - "ISO-8601-1:2019 date-time posted-date`"
  - "OECD SAF-T §3 transactions"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
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
  computationUuid: "7060960d-3d84-813c-a7c7-9825d9dee237"
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
      stageUuid: "d3419ba9-fb9d-82c8-bae4-c488317829bf"
    - stage: seal
      stageUuid: "aabefbf6-f7cc-888f-a0ed-baedfca6fbb8"
    - stage: uuid
      stageUuid: "096c03b8-3e63-821e-92cf-b87514fa88c2"
version: 2
---
# gl-postings

GL Postings — atomic debit/credit lines linked to a journal entry.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-8601-1:2019 date-time posted-date`

- ISO-8601-1:2019 date-time posted-date
- IFRS IAS-1 presentation-of-financial-statements
- OECD SAF-T §3 transactions
- ISO-19011:2018 audit-trail
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[accounting]] · [[transaction]] · [[standard]] · [[proof]] · [[identity]] · [[horo]].

**Law — [[law]]: each posting is exactly one debit-or-credit line bound to a single GL account and parent entry, and its posted-date is auto-set the moment status becomes posted.**
