---
name: adjustments
description: "Use when recording the small ±0.01 plug entries that reconcile integer-cents ledger totals to presentation-rounded statements — IAS-1 §51(e) rounding plugs and IAS-21 §39 FX-translation fragments by type (presentation, FX, tax, cash-settlement). The rounding-adjustments GL sub-collection."
atomPath: "journal/entries/rounding/adjustments"
coordinate: "journal/entries/rounding/adjustments · 2/share · 07c4c820"
contentUuid: "ee994c22-f0e4-5644-9e5a-5dc6b4240a63"
diamondUuid: "8a339b6e-c824-8668-b159-3ab071b0ab72"
uuid: "07c4c820-c1fb-80f6-860c-d5e31440e8cc"
horo: 2
typography:
  partition: journal
  bondDegree: 42
standards:
  - "IFRS IAS-1 §51(e) level-of-rounding-disclosure"
  - "IFRS IAS-21 §39 foreign-currency-translation"
  - "ISO-4217:2015 currency-codes from-to-currency-pair"
  - "ISO-4217:2015 currency-codes from-to-currency-pair`"
  - "ISO-8601-1:2019 date-time adjustment-date"
  - "ISO-8601-1:2019 date-time adjustment-date`"
  - "SOX §404 internal-controls rounding-control TOM-RND-01"
  - "US-GAAP ASC-205-10-45 presentation-rounding"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "7d18bb97-e07d-8f2d-99b9-39b09f1ebd36"
  stages:
    - stage: path
      stageUuid: "972c7cc8-3cc4-84e5-a7ce-b01a52be8226"
    - stage: trinity
      stageUuid: "7c4c0064-24d8-8a47-9b8c-c32b86bb63de"
    - stage: boundary
      stageUuid: "a7f12847-f9ae-8984-96c4-c39816aea724"
    - stage: links
      stageUuid: "cac927e7-8d30-86d6-93b5-2101530981a5"
    - stage: horo
      stageUuid: "1d1bd990-88fc-87d6-803b-303683d6f6fb"
    - stage: seal
      stageUuid: "b4a22329-868e-8bab-841c-f39ffd20bfa8"
    - stage: uuid
      stageUuid: "d0b2b5a9-52e4-877e-90f2-6d88b5b3ecdd"
version: 2
---
# rounding-adjustments

Rounding Adjustments — IAS-1 §51(e) presentation rounding entries.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-4217:2015 currency-codes from-to-currency-pair`
- `@standard ISO-8601-1:2019 date-time adjustment-date`

- ISO-4217:2015 currency-codes from-to-currency-pair
- ISO-8601-1:2019 date-time adjustment-date
- IFRS IAS-1 §51(e) level-of-rounding-disclosure
- IFRS IAS-21 §39 foreign-currency-translation
- US-GAAP ASC-205-10-45 presentation-rounding
- ISO-19011:2018 audit-trail rounding-evidence
- SOX §404 internal-controls rounding-control TOM-RND-01
- ISO-27001 A.5.23 cloud-service-tenant-isolation

Composes: [[journal/entries]] · [[accounting]] · [[standard]] · [[proof]] · [[horo]].

**Law — [[law]]: a rounding plug exists only to close the residual between integer-cents totals and presentation-rounded statements, never exceeding the ±0.01 minimum unit per fragment.**
