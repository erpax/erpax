---
name: transactions
description: "Use when recording or reconciling paired source-document transactions between two group tenants or legal entities — cash transfers, service charges, goods transfers, loans, capital contributions, and cost allocations that must net to zero on consolidation per IFRS-10 §B86 / ASC-810 / SOX §404. The intercompany paired-document register collection."
atomPath: "legal/entities/intercompany/transactions"
coordinate: "legal/entities/intercompany/transactions · 1/base · 091b630f"
contentUuid: "685b3c55-c87e-56cd-98a6-d0ddb9a197ed"
diamondUuid: "271adc42-254c-890f-9b98-08d984a8990c"
uuid: "091b630f-412f-84f9-968f-d968f47fe7c1"
horo: 1
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
  computationUuid: "f0f60e64-2394-8cbf-9e1a-5582f84a5428"
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
      stageUuid: "3aee5a02-e936-8b83-b9d8-60791200638f"
    - stage: seal
      stageUuid: "dfb8d9b9-c260-8c95-9b24-3b7f09452202"
    - stage: uuid
      stageUuid: "02759f40-dea3-81a4-982e-fab8c4a93b63"
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
