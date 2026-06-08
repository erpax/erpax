---
name: taggings
description: "Use when attaching, querying or removing label-context associations across any collection — polymorphic (tag × taggable × context × tagger) join where context is a free string enabling unlimited label-sets with zero schema change. The polymorphic tagging-join collection; content-uuid makes each (tag, target, context, tagger) tuple automatically unique."
atomPath: tags/taggings
coordinate: tags/taggings · 1/base · 63baf3b1
contentUuid: "0118c386-2bd1-5ca1-9cba-a3810f319946"
diamondUuid: "6cac5903-5c0f-88ba-a3ae-8b96236e21a2"
uuid: "63baf3b1-3c1e-85de-b812-266592fcc376"
horo: 1
bonds:
  in:
    - identity
    - standard
    - tag
    - tagging
    - tags
  out:
    - identity
    - standard
    - tag
    - tagging
    - tags
typography:
  partition: tags
  bondDegree: 15
  neighbors: []
standards:
  - "EU-2011/83"
  - "EU-VAT-Implementing-Reg-282/2011"
  - "ISO-19011:2018 audit-trail tagging-provenance"
  - "ISO-25964-1:2011 thesauri associative-relationships"
  - "RFC-4122"
  - "RFC-4122 §4.3 uuid content-addressed-dedup"
  - "SOX §404 internal-controls"
bindings: []
neighbors:
  wikilink:
    - identity
    - standard
    - tags
  matrix:
    - identity
    - standard
    - tag
    - tagging
    - tags
  backlinks:
    - identity
    - standard
    - tag
    - tagging
    - tags
signatures:
  computationUuid: "905382ac-b374-85bf-be6d-fd61f829bf02"
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
      stageUuid: "143e9e03-4c6e-89c3-9fa1-3c41ec51f60c"
    - stage: seal
      stageUuid: "e5cf6dae-c4ba-8a56-8731-c2bf386450b1"
    - stage: uuid
      stageUuid: "dcbce793-d7c4-888c-bdfd-ecebbb14a137"
version: 2
---
# taggings

Taggings — THE key to "less collections, infinite features".

This is the single-folder collection node: `index.ts` (schema + standards banners),
co-located `seed.ts` (opening data) and `index.test.ts` (invariant checks) live here.
One folder per collection ⇒ no scatter ⇒ no drift.

## Standards
- ISO-25964-1:2011 thesauri associative-relationships
- RFC-4122 §4.3 uuid content-addressed-dedup
- ISO-19011:2018 audit-trail tagging-provenance
- SOX §404 internal-controls
- ISO-27001 A.5.23 cloud-service-tenant-isolation

## Composition

The polymorphic join combines [[tags]] (the vocabulary), [[identity]] (content-uuid dedup for automatic UNIQUE constraints), and [[standard]] (compliance audit-trail) to enable ONE table that links a tag to ANY record in a named context, optionally by a tagger. Because a single join serves every collection via free string contexts, variation no longer needs new collections — it becomes a `(context, tag)` row here.
