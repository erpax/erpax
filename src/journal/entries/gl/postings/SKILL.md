---
name: postings
description: "Use when writing or querying individual debit/credit lines against a journal entry — source type (invoice/bill/payment/adjustment/revaluation), source date, GL account, amount, currency, and ISO-8601 posted-date auto-set on status → posted. The atomic GL line-item that enforces balanced-entry and SOX posting-timestamp requirements."
atomPath: "journal/entries/gl/postings"
coordinate: "journal/entries/gl/postings · 7/descent · 987ad2b4"
contentUuid: "5c185d1e-c73f-5704-8a71-64fe76c6598e"
diamondUuid: "10e24a79-2e80-8692-8ddd-0cad93fdacbc"
uuid: "987ad2b4-3c8d-88ff-b5ff-5b917ed27a8a"
horo: 7
typography:
  partition: journal
  bondDegree: 28
standards:
  - "IFRS IAS-1 presentation-of-financial-statements"
  - "ISO-8601-1:2019 date-time posted-date"
  - "ISO-8601-1:2019 date-time posted-date`"
  - "OECD SAF-T §3 transactions"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "31ad6518-03af-8777-8554-0bb21d533cd5"
  stages:
    - stage: path
      stageUuid: "998d8052-9cfd-8254-8b5a-7d7c88b8c706"
    - stage: trinity
      stageUuid: "5bf37e57-14e9-8798-a4ff-34d2581eccad"
    - stage: boundary
      stageUuid: "b429f1f9-1710-8d99-9b40-ac5dcbe71824"
    - stage: links
      stageUuid: "6ab9cac1-927f-8427-a632-d376e252d74f"
    - stage: horo
      stageUuid: "30868b31-f8fa-814e-a65b-a05dbd66cc68"
    - stage: seal
      stageUuid: "aabefbf6-f7cc-888f-a0ed-baedfca6fbb8"
    - stage: uuid
      stageUuid: "76c2ade4-c10e-873c-846f-2664ab3ec7ca"
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
