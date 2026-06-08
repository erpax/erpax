---
name: tags
description: "Use when defining or querying reusable labels applied across any collection — tag vocabulary, use-count counter cache, content-uuid dedup (same name = same id everywhere). The universal label-vocabulary collection; pair with taggings for the full polymorphic tagging engine."
atomPath: tags
coordinate: tags · 5/round · 165f9c08
contentUuid: "54832f6f-b81d-54ae-879e-a942bf3dddde"
diamondUuid: "f2c3dcf8-abc5-8a57-9113-41b0996ff920"
uuid: "165f9c08-886a-8ca8-95ba-ecc3c264b4ca"
horo: 5
bonds:
  in:
    - accounting
    - all
    - cmyk
    - collapse
    - comment
    - commerce
    - crest
    - dimension
    - fields
    - horo
    - localize
    - metadata
    - party
    - sequence
    - taggings
    - variant
  out:
    - accounting
    - all
    - cmyk
    - collapse
    - comment
    - commerce
    - crest
    - dimension
    - fields
    - horo
    - localize
    - metadata
    - party
    - sequence
    - taggings
    - variant
typography:
  partition: tags
  bondDegree: 48
  neighbors: []
standards:
  - "EU-2011/83"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-19011:2018 audit-trail label-changes"
  - "ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary"
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid content-addressed-id"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink: []
  matrix:
    - accounting
    - all
    - cmyk
    - collapse
    - comment
    - commerce
    - crest
    - dimension
    - fields
    - horo
    - localize
    - metadata
    - party
    - sequence
    - taggings
    - variant
  backlinks:
    - accounting
    - all
    - cmyk
    - collapse
    - comment
    - commerce
    - crest
    - dimension
    - fields
    - horo
    - localize
    - metadata
    - party
    - sequence
    - taggings
    - variant
signatures:
  computationUuid: "5149c9de-6d0e-8a34-b47b-984fc9657864"
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
      stageUuid: "0ebf387e-d35e-8976-b9c2-20c29351ac53"
    - stage: seal
      stageUuid: "5459d429-efea-8766-b30b-332b0535906b"
    - stage: uuid
      stageUuid: "5f082110-f083-8ef6-8289-80af209eb741"
version: 2
---
# tags

Tags — the universal label primitive (anything is taggable).

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-25964-1:2011 thesauri-and-interoperability controlled-vocabulary
- RFC-4122 §4.3 uuid content-addressed-id
- ISO-19011:2018 audit-trail label-changes
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation
