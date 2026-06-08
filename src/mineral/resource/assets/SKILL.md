---
name: assets
description: "Use when registering or reporting IFRS 6 exploration & evaluation assets — wells, mines, concessions, quarries — capitalised under the §8 cost or revaluation policy, reclassified to PPE/intangibles once commercial viability is demonstrated (§17), or impaired (§18–22). The IFRS 6 E&E asset register."
atomPath: mineral/resource/assets
coordinate: mineral/resource/assets · 1/base · d61a1052
contentUuid: "eb48affa-35c8-530f-9000-60f32d935bb6"
diamondUuid: "2315bf8a-1264-8dee-9cdf-7b7abc5d4bc2"
uuid: "d61a1052-8260-81e2-a844-74f7e927f09a"
horo: 1
bonds:
  in:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - resource
    - rootstock
    - soil
  out:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
typography:
  partition: mineral
  bondDegree: 120
  neighbors: []
standards:
  - "IFRS IFRS-6 §17 reclassification-to-PPE-or-intangibles"
  - "IFRS IFRS-6 §18-§22 impairment-of-EE-assets"
  - "IFRS IFRS-6 §23-§25 disclosure"
  - "IFRS IFRS-6 §3 scope-exploration-and-evaluation"
  - "IFRS IFRS-6 §8 measurement-policy-cost-or-revaluation"
  - "IFRS-6"
  - "ISO 19011:2018 §6.4.6 audit-evidence-EE-assets"
  - "ISO-4217:2015 currency-codes"
  - "ISO-8601-1:2019 date-time"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - accounting
    - assets
    - collections
    - fields
    - hooks
    - standard
  matrix:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
  backlinks:
    - access
    - accounting
    - agriculture
    - animal
    - apiculture
    - aquaculture
    - asset
    - balance
    - biomass
    - breed
    - collections
    - crop
    - entries
    - fertility
    - fields
    - forestry
    - fractal
    - graft
    - harvest
    - herd
    - hooks
    - identity
    - impairment
    - lactation
    - law
    - livestock
    - measurements
    - merge
    - mortality
    - perennial
    - postharvest
    - rootstock
    - soil
signatures:
  computationUuid: "4703ae07-8bcb-8066-b887-ae27e037b440"
  stages:
    - stage: path
      stageUuid: "fd5c6279-1e92-8804-8300-95d37940c381"
    - stage: trinity
      stageUuid: "a8ad6458-749b-8a99-9264-fffb1062b925"
    - stage: boundary
      stageUuid: "5ef150d4-a296-83c7-88f6-7f539bb30c16"
    - stage: links
      stageUuid: "fffd72cd-8318-8d44-8d42-b7c16851668d"
    - stage: horo
      stageUuid: "60e7d05b-e440-8c72-a5ea-74e3b2e9a182"
    - stage: seal
      stageUuid: "6a0cfa3f-f8bf-8463-a8ec-932b13f644cd"
    - stage: uuid
      stageUuid: "253b8295-e853-87b4-aeab-354eed0be460"
version: 2
---
# mineral-resource-assets

Mineral Resource Assets — IFRS 6 exploration & evaluation register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- IFRS IFRS-6 §3 scope-exploration-and-evaluation
- IFRS IFRS-6 §8 measurement-policy-cost-or-revaluation
- IFRS IFRS-6 §17 reclassification-to-PPE-or-intangibles
- IFRS IFRS-6 §18-§22 impairment-of-EE-assets
- IFRS IFRS-6 §23-§25 disclosure
- ISO-4217:2015 currency-codes
- ISO-8601-1:2019 date-time
- ISO 19011:2018 §6.4.6 audit-evidence-EE-assets
- SOX §404 internal-controls
- ISO 27001 A.5.23 cloud-service-tenant-isolation

Composes: [[collections]] · [[fields]] · [[hooks]] · [[accounting]] · [[fixed/assets]] · [[standard]].
