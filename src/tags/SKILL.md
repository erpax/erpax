---
name: tags
description: "Use when defining or querying reusable labels applied across any collection — tag vocabulary, use-count counter cache, content-uuid dedup (same name = same id everywhere). The universal label-vocabulary collection; pair with taggings for the full polymorphic tagging engine."
atomPath: tags
coordinate: "tags · 2/share · a59b64b0"
contentUuid: "cacc0201-5da4-5fb3-af3b-e65e760ea7e2"
diamondUuid: "6466c979-6ace-879f-b8d4-4fcbac89a5e4"
uuid: "a59b64b0-86c3-8051-aa09-9f8c5e9b90f6"
horo: 2
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
  computationUuid: "a13d4ed0-8f7c-8115-8975-9a67edc2d425"
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
      stageUuid: "2f7b36c1-3681-8991-942e-1799aaff795c"
    - stage: seal
      stageUuid: "878fcf5a-870b-8e55-b6e6-0d80fc9fdbf4"
    - stage: uuid
      stageUuid: "ba42b14c-a8f8-8e4e-a85a-a69c73231acf"
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
