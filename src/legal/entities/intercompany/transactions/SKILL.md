---
name: transactions
description: "Use when recording or reconciling paired source-document transactions between two group tenants or legal entities — cash transfers, service charges, goods transfers, loans, capital contributions, and cost allocations that must net to zero on consolidation per IFRS-10 §B86 / ASC-810 / SOX §404. The intercompany paired-document register collection."
atomPath: "legal/entities/intercompany/transactions"
coordinate: "legal/entities/intercompany/transactions · 4/weave · 59cc92b6"
contentUuid: "67b53655-dc6f-59ae-aceb-ddc12e98bb5f"
diamondUuid: "bfd97b07-eea8-8ed5-9ac3-174a05299c59"
uuid: "59cc92b6-7c72-8fac-a3c6-42618075466b"
horo: 4
typography:
  partition: legal
  bondDegree: 54
standards:
  - "IFRS IAS-24 related-party-disclosures"
  - "IFRS IFRS-10 §B86 consolidated-financial-statements"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time transaction-date"
  - "ISO-8601-1:2019 date-time transaction-date`"
  - "OECD BEPS Action 13 transfer-pricing-documentation"
  - "SOX §404 internal-controls intercompany-control TOM-IC-01"
  - "US-GAAP ASC-810-10 consolidation"
  - "US-GAAP ASC-850 related-party-disclosures"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "6cbac9b7-429b-8d1d-8db0-0743251ea0cd"
  stages:
    - stage: path
      stageUuid: "455bd872-0395-885d-b190-b8df4a087691"
    - stage: trinity
      stageUuid: "ffe756dd-893e-8b72-89f3-34657afa29ed"
    - stage: boundary
      stageUuid: "8223730e-d090-87a9-a02f-dbf154c2ea73"
    - stage: links
      stageUuid: "ad2dad8d-2513-86ab-a98d-dda2d489b373"
    - stage: horo
      stageUuid: "354371f7-9c1a-89ea-9a30-bcf634072ccb"
    - stage: seal
      stageUuid: "dfb8d9b9-c260-8c95-9b24-3b7f09452202"
    - stage: uuid
      stageUuid: "28ab3af1-b366-8efb-b59c-aaea05866672"
version: 2
---
# intercompany-transactions

Intercompany Transactions — paired transactions between two tenants.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time transaction-date`

- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time transaction-date
- IFRS IFRS-10 §B86 consolidated-financial-statements
- IFRS IAS-24 related-party-disclosures
- US-GAAP ASC-810-10 consolidation
- US-GAAP ASC-850 related-party-disclosures
- ISO-19011:2018 audit-trail intercompany-evidence
- SOX §404 internal-controls intercompany-control TOM-IC-01
- OECD BEPS Action 13 transfer-pricing-documentation
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[fiscal/periods/tax/periods/transfer/pricing/adjustments]] · [[accounting]] · [[transaction]] · [[journal/entries]] · [[consolidation/eliminations]] · [[legal/entities]] · [[Tenants]].
