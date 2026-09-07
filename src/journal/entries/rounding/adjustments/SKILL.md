---
name: adjustments
description: "Use when recording the small ±0.01 plug entries that reconcile integer-cents ledger totals to presentation-rounded statements — IAS-1 §51(e) rounding plugs and IAS-21 §39 FX-translation fragments by type (presentation, FX, tax, cash-settlement). The rounding-adjustments GL sub-collection."
atomPath: "journal/entries/rounding/adjustments"
coordinate: "journal/entries/rounding/adjustments · 5/round · d582edc5"
contentUuid: "c00c4a76-69b3-5cf3-837d-74cfe52a1840"
diamondUuid: "e061c1c8-af7e-88bf-876c-755219becc65"
uuid: "d582edc5-e7d9-8fbf-a4ae-89b18f97e666"
horo: 5
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
  computationUuid: "a668bc02-cb71-80e5-ac75-7e991880cbc7"
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
      stageUuid: "5af1de43-06c4-8a5a-9184-1d6706889d8c"
    - stage: seal
      stageUuid: "b4a22329-868e-8bab-841c-f39ffd20bfa8"
    - stage: uuid
      stageUuid: "8d641f30-23c8-8592-823e-dfe93f13f98d"
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
