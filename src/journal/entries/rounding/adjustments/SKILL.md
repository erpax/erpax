---
name: adjustments
description: "Use when recording the small ±0.01 plug entries that reconcile integer-cents ledger totals to presentation-rounded statements — IAS-1 §51(e) rounding plugs and IAS-21 §39 FX-translation fragments by type (presentation, FX, tax, cash-settlement). The rounding-adjustments GL sub-collection."
atomPath: "journal/entries/rounding/adjustments"
coordinate: "journal/entries/rounding/adjustments · 4/weave · c272461e"
contentUuid: "53c5c2a9-4468-5f21-af40-b90b7dbd39c8"
diamondUuid: "10eada74-d198-80c1-ad18-f7ebaeb6cf06"
uuid: "c272461e-cb09-86e7-9f89-6e2ab3665b8d"
horo: 4
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
  computationUuid: "3d8d3829-7cc2-86df-8605-2a0bb1ec6323"
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
      stageUuid: "8f77856a-545d-881d-b9f3-2eb48e193266"
    - stage: seal
      stageUuid: "b4a22329-868e-8bab-841c-f39ffd20bfa8"
    - stage: uuid
      stageUuid: "bb10dcec-c27c-8766-966a-f43f8c02ed2c"
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
