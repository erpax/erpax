---
name: transactions
description: "Use when recording or reconciling paired source-document transactions between two group tenants or legal entities — cash transfers, service charges, goods transfers, loans, capital contributions, and cost allocations that must net to zero on consolidation per IFRS-10 §B86 / ASC-810 / SOX §404. The intercompany paired-document register collection."
atomPath: legal/entities/intercompany/transactions
coordinate: legal/entities/intercompany/transactions · 1/base · 76a78bb3
contentUuid: "90866b26-b91d-591e-a7e4-749dca8398c4"
diamondUuid: "83d3672a-d26f-8199-8f25-db88dc2240e9"
uuid: "76a78bb3-892d-8dbd-99af-46a3f99838e1"
horo: 1
bonds:
  in:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
  out:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
typography:
  partition: legal
  bondDegree: 54
  neighbors: []
standards:
  - "IFRS IAS-24 related-party-disclosures"
  - "IFRS IFRS-10 §B86 consolidated-financial-statements"
  - "ISO-19011:2018 audit-trail intercompany-evidence"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time transaction-date"
  - "OECD BEPS Action 13 transfer-pricing-documentation"
  - "SOX §404 internal-controls intercompany-control TOM-IC-01"
  - "US-GAAP ASC-810-10 consolidation"
  - "US-GAAP ASC-850 related-party-disclosures"
bindings: []
neighbors:
  wikilink:
    - accounting
    - adjustments
    - eliminations
    - entities
    - entries
    - tenants
    - transaction
  matrix:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
  backlinks:
    - accounting
    - entries
    - fractal
    - hedge
    - horo
    - law
    - proof
    - rates
    - standard
    - transaction
    - trinity
signatures:
  computationUuid: "8ee7e135-4b7f-8c5f-8ffc-ad662a856b65"
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
      stageUuid: "91bbef97-92a1-89cc-a12b-6b24b1313f6c"
    - stage: seal
      stageUuid: "dfb8d9b9-c260-8c95-9b24-3b7f09452202"
    - stage: uuid
      stageUuid: "d35ffd4f-b840-813c-a322-45f4a6fe64b0"
version: 2
---
# intercompany-transactions

Intercompany Transactions — paired transactions between two tenants.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
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
