---
name: assets
description: "Use when registering or reporting IFRS 6 exploration & evaluation assets — wells, mines, concessions, quarries — capitalised under the §8 cost or revaluation policy, reclassified to PPE/intangibles once commercial viability is demonstrated (§17), or impaired (§18–22). The IFRS 6 E&E asset register."
atomPath: "mineral/resource/assets"
coordinate: "mineral/resource/assets · 2/share · 3ff35f70"
contentUuid: "166c1fa3-859a-5cfb-90a7-ff2109f709a9"
diamondUuid: "bd38c126-c258-8c89-99ae-26891f0ac431"
uuid: "3ff35f70-d044-8c04-9a18-f3822765b7a2"
horo: 2
typography:
  partition: mineral
  bondDegree: 120
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
  computationUuid: "e837f014-3734-82c9-ace7-9a8ba833e961"
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
      stageUuid: "1069cf47-fb77-821b-9962-4c6a682db3b6"
    - stage: seal
      stageUuid: "6a0cfa3f-f8bf-8463-a8ec-932b13f644cd"
    - stage: uuid
      stageUuid: "bf9faa2f-eab3-8371-a739-5208e85ebb62"
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
