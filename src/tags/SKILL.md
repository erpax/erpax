---
name: tags
description: "Use when defining or querying reusable labels applied across any collection — tag vocabulary, use-count counter cache, content-uuid dedup (same name = same id everywhere). The universal label-vocabulary collection; pair with taggings for the full polymorphic tagging engine."
atomPath: tags
coordinate: "tags · 7/descent · 673dbfb7"
contentUuid: "23782490-f9a4-5cfa-aff6-4075bc11c315"
diamondUuid: "bb9fcc22-3de9-8097-a004-994ee018f2c2"
uuid: "673dbfb7-ef0d-84a0-98fc-4350b8ab7b35"
horo: 7
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
  computationUuid: "5aedd303-837b-89d7-8034-f301dc5455cc"
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
      stageUuid: "f60eb12b-7e33-88c7-9d05-2343e5f1f5aa"
    - stage: seal
      stageUuid: "878fcf5a-870b-8e55-b6e6-0d80fc9fdbf4"
    - stage: uuid
      stageUuid: "40b7c72b-122d-8f26-97e9-9f48ff3db820"
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
