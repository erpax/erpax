---
name: transactions
description: "Use when recording or reconciling paired source-document transactions between two group tenants or legal entities — cash transfers, service charges, goods transfers, loans, capital contributions, and cost allocations that must net to zero on consolidation per IFRS-10 §B86 / ASC-810 / SOX §404. The intercompany paired-document register collection."
atomPath: "legal/entities/intercompany/transactions"
coordinate: "legal/entities/intercompany/transactions · 7/descent · 6a700ee2"
contentUuid: "5427bc13-d632-5dde-9b76-3363e21d804b"
diamondUuid: "39533ff9-21af-8500-902d-b071ae491e08"
uuid: "6a700ee2-de44-8a8f-af4c-44e55be73bfe"
horo: 7
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
  computationUuid: "87897fc7-c053-8dea-b37a-817bfe15d91f"
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
      stageUuid: "4061aca1-59ae-85f9-8849-0f453c3b92cf"
    - stage: seal
      stageUuid: "dfb8d9b9-c260-8c95-9b24-3b7f09452202"
    - stage: uuid
      stageUuid: "1f5dc379-0c48-8390-a375-deca3c7d0d19"
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
