---
name: adjustments
description: "Use when recording the small ±0.01 plug entries that reconcile integer-cents ledger totals to presentation-rounded statements — IAS-1 §51(e) rounding plugs and IAS-21 §39 FX-translation fragments by type (presentation, FX, tax, cash-settlement). The rounding-adjustments GL sub-collection."
atomPath: "journal/entries/rounding/adjustments"
coordinate: "journal/entries/rounding/adjustments · 4/weave · 2b47dc13"
contentUuid: "549ec7a5-b68e-5858-b9b0-2b13e72cf695"
diamondUuid: "08d5619a-a32e-88d5-b2dd-ae8759adac52"
uuid: "2b47dc13-c5f4-8bcf-9882-22a8da3977c6"
horo: 4
bonds:
  in:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
  out:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
typography:
  partition: journal
  bondDegree: 41
  neighbors: []
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
neighbors:
  wikilink:
    - accounting
    - entries
    - horo
    - law
    - proof
    - standard
  matrix:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
  backlinks:
    - accounting
    - adjustment
    - entries
    - horo
    - law
    - proof
    - standard
signatures:
  computationUuid: "12f6777d-0bbd-8e7d-9371-2260b7894d3d"
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
      stageUuid: "8df4a91d-7c10-8178-9d8c-4b4ea20b9106"
    - stage: seal
      stageUuid: "b4a22329-868e-8bab-841c-f39ffd20bfa8"
    - stage: uuid
      stageUuid: "438aa7aa-8455-8c44-9ad6-dc549d3604b3"
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
