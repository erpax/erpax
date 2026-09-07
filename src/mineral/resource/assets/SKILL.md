---
name: assets
description: "Use when registering or reporting IFRS 6 exploration & evaluation assets — wells, mines, concessions, quarries — capitalised under the §8 cost or revaluation policy, reclassified to PPE/intangibles once commercial viability is demonstrated (§17), or impaired (§18–22). The IFRS 6 E&E asset register."
atomPath: "mineral/resource/assets"
coordinate: "mineral/resource/assets · 7/descent · eee1664d"
contentUuid: "e178fda1-549b-59ba-8fd4-71c6de1ae132"
diamondUuid: "a1ec0832-7bb0-8eec-a575-afd317697f51"
uuid: "eee1664d-e71e-8be9-ba5f-84f4e844149e"
horo: 7
typography:
  partition: mineral
  bondDegree: 96
standards:
  - "IFRS IFRS-6 §17 reclassification-to-PPE-or-intangibles"
  - "IFRS IFRS-6 §17 reclassification-to-PPE-or-intangibles`"
  - "IFRS IFRS-6 §18-§22 impairment-of-EE-assets"
  - "IFRS IFRS-6 §18-§22 impairment-of-EE-assets`"
  - "IFRS IFRS-6 §23-§25 disclosure"
  - "IFRS IFRS-6 §23-§25 disclosure`"
  - "IFRS IFRS-6 §3 scope-exploration-and-evaluation"
  - "IFRS IFRS-6 §3 scope-exploration-and-evaluation`"
  - "IFRS IFRS-6 §8 measurement-policy-cost-or-revaluation"
  - "IFRS IFRS-6 §8 measurement-policy-cost-or-revaluation`"
  - "IFRS-6"
  - "ISO-4217:2015 currency-codes"
  - "ISO-4217:2015 currency-codes`"
  - "ISO-8601-1:2019 date-time"
  - "ISO-8601-1:2019 date-time`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "bc0cd5e6-d1ab-8291-8f21-9cb4371c2b0e"
  stages:
    - stage: path
      stageUuid: "fd5c6279-1e92-8804-8300-95d37940c381"
    - stage: trinity
      stageUuid: "a8ad6458-749b-8a99-9264-fffb1062b925"
    - stage: boundary
      stageUuid: "5ef150d4-a296-83c7-88f6-7f539bb30c16"
    - stage: links
      stageUuid: "2776d346-1323-832a-8b30-b18128470380"
    - stage: horo
      stageUuid: "13e66e3d-307e-871e-83f5-f77fa4d41c95"
    - stage: seal
      stageUuid: "6a0cfa3f-f8bf-8463-a8ec-932b13f644cd"
    - stage: uuid
      stageUuid: "1ae9ac9e-959c-80e3-b9e3-cd14e2502bcf"
version: 2
---
# mineral-resource-assets

Mineral Resource Assets — IFRS 6 exploration & evaluation register.

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard IFRS IFRS-6 §3 scope-exploration-and-evaluation`
- `@standard IFRS IFRS-6 §8 measurement-policy-cost-or-revaluation`
- `@standard IFRS IFRS-6 §17 reclassification-to-PPE-or-intangibles`
- `@standard IFRS IFRS-6 §18-§22 impairment-of-EE-assets`
- `@standard IFRS IFRS-6 §23-§25 disclosure`
- `@standard ISO-4217:2015 currency-codes`
- `@standard ISO-8601-1:2019 date-time`

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

Composes: [[collections]] · [[field]] · [[hooks]] · [[accounting]] · [[fixed/assets]] · [[standard]].
