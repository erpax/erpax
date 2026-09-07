---
name: assets
description: "Use when registering or reporting IFRS 6 exploration & evaluation assets — wells, mines, concessions, quarries — capitalised under the §8 cost or revaluation policy, reclassified to PPE/intangibles once commercial viability is demonstrated (§17), or impaired (§18–22). The IFRS 6 E&E asset register."
atomPath: "mineral/resource/assets"
coordinate: "mineral/resource/assets · 4/weave · b6729d99"
contentUuid: "dcdf9d60-98c3-506f-a576-a4c3f4fa1416"
diamondUuid: "26a95871-8f86-89da-ba36-c1a3d6cb753e"
uuid: "b6729d99-a56e-821e-aad8-ef8f14ca18cb"
horo: 4
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
  computationUuid: "aa852a81-7950-86e2-b920-f1c35a1eadac"
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
      stageUuid: "53ad316b-ecf6-88c8-8fb4-50e74b5d7834"
    - stage: seal
      stageUuid: "6a0cfa3f-f8bf-8463-a8ec-932b13f644cd"
    - stage: uuid
      stageUuid: "c9ca952d-fe95-8b86-873a-93915c792e08"
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
