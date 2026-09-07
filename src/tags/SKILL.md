---
name: tags
description: "Use when defining or querying reusable labels applied across any collection — tag vocabulary, use-count counter cache, content-uuid dedup (same name = same id everywhere). The universal label-vocabulary collection; pair with taggings for the full polymorphic tagging engine."
atomPath: tags
coordinate: "tags · 1/base · 11ab6acf"
contentUuid: "858d9f9e-0999-592d-af1f-e6a969f451e4"
diamondUuid: "e40cb614-5e4e-8741-9dc2-c76ea48fed43"
uuid: "11ab6acf-61e1-8c5e-8179-95f01ee311e2"
horo: 1
typography:
  partition: tags
  bondDegree: 48
standards:
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary"
  - "ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary`"
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid content-addressed-id"
  - "RFC-4122 §4.3 uuid content-addressed-id`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "222b07b5-343a-809f-ac91-867d9c731b86"
  stages:
    - stage: path
      stageUuid: "e95df052-9841-8ff0-8bc2-652b80f2398c"
    - stage: trinity
      stageUuid: "532698e6-7a25-8a4f-9a5c-b6b12d561441"
    - stage: boundary
      stageUuid: "77fce3e2-5d8d-81de-b7c8-4e6d651f1ced"
    - stage: links
      stageUuid: "acef3454-eeed-86c4-8db4-e32cd9be5392"
    - stage: horo
      stageUuid: "a7066e78-49c1-8b70-9ec4-abe76078987b"
    - stage: seal
      stageUuid: "878fcf5a-870b-8e55-b6e6-0d80fc9fdbf4"
    - stage: uuid
      stageUuid: "91ffccc1-e06a-8bd5-a56a-e2dbea4267fd"
version: 2
---
# tags

Tags — the universal label primitive (anything is taggable).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary`
- `@standard RFC-4122 §4.3 uuid content-addressed-id`

- ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary
- RFC-4122 §4.3 uuid content-addressed-id
- ISO-19011:2018 audit-trail label-changes
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
