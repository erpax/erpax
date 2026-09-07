---
name: taggings
description: "Use when attaching, querying or removing label-context associations across any collection — polymorphic (tag × taggable × context × tagger) join where context is a free string enabling unlimited label-sets with zero schema change. The polymorphic tagging-join collection; content-uuid makes each (tag, target, context, tagger) tuple automatically unique."
atomPath: "tags/taggings"
coordinate: "tags/taggings · 1/base · 51d48849"
contentUuid: "f6d2a593-cd7b-5ddb-bea6-c9501c75194e"
diamondUuid: "38b04fe0-ae81-82aa-97f4-0e39f23b4180"
uuid: "51d48849-eaf6-85b8-8aa5-e93b77a9e585"
horo: 1
typography:
  partition: tags
  bondDegree: 15
standards:
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-25964-1:2011 thesauri associative-relationships"
  - "ISO-25964-1:2011 thesauri associative-relationships`"
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid content-addressed-dedup"
  - "RFC-4122 §4.3 uuid content-addressed-dedup`"
  - "SOX §404 internal-controls"
  - "— the instrument reads SKILL.md) -->"
bindings: []
signatures:
  computationUuid: "44dfb603-1d86-8030-84f3-a9ac112bd5f3"
  stages:
    - stage: path
      stageUuid: "bff41ad9-b953-81c7-a2d9-ebf26bae32b4"
    - stage: trinity
      stageUuid: "66d6e522-c547-82cf-a799-d37e2daca8f9"
    - stage: boundary
      stageUuid: "43ed217d-c3e8-8196-aad8-fea307332984"
    - stage: links
      stageUuid: "5bdb8868-00ed-83c7-a8fd-96e177514f82"
    - stage: horo
      stageUuid: "fb0912aa-1f92-883f-977c-2ffaa535ddc6"
    - stage: seal
      stageUuid: "2f68d6c0-39cd-838e-9cb1-b766c879a749"
    - stage: uuid
      stageUuid: "c2c16b3c-ab9b-871e-8989-a15f1e6868cb"
version: 2
---
# taggings

Taggings — THE key to "less collections, infinite features".

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards

<!-- standards banners (mirrors index.ts @standard — the instrument reads SKILL.md) -->
- `@standard ISO-25964-1:2011 thesauri associative-relationships`
- `@standard RFC-4122 §4.3 uuid content-addressed-dedup`

- ISO-25964-1:2011 thesauri associative-relationships
- RFC-4122 §4.3 uuid content-addressed-dedup
- ISO-19011:2018 audit-trail tagging-provenance
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

## Composition

The polymorphic join combines [[tags]] (the vocabulary), [[identity]] (content-uuid dedup for automatic UNIQUE constraints), and [[standard]] (compliance audit-trail) to enable ONE table that links a tag to ANY record in a named context, optionally by a tagger. Because a single join serves every collection via free string contexts, variation no longer needs new collections — it becomes a `(context, tag)` row here.
