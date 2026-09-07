---
name: taggings
description: "Use when attaching, querying or removing label-context associations across any collection — polymorphic (tag × taggable × context × tagger) join where context is a free string enabling unlimited label-sets with zero schema change. The polymorphic tagging-join collection; content-uuid makes each (tag, target, context, tagger) tuple automatically unique."
atomPath: "tags/taggings"
coordinate: "tags/taggings · 8/crest · 35dc5e58"
contentUuid: "7b8655e9-6c24-57e7-a6cb-ab2f8d537f53"
diamondUuid: "9d9e5354-4bb9-8e18-9b55-3fc50d8f3949"
uuid: "35dc5e58-953b-83f3-8d2e-5d7ecda1ef6d"
horo: 8
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
  computationUuid: "5efc4167-9a0a-88c3-8e64-7eb6263387d8"
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
      stageUuid: "5f63824b-4a81-81ff-90d8-c6781381f470"
    - stage: seal
      stageUuid: "2f68d6c0-39cd-838e-9cb1-b766c879a749"
    - stage: uuid
      stageUuid: "3b4276de-a90c-8225-903d-c869db2fad1a"
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
