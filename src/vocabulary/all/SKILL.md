---
name: all
description: "Use when reasoning about totality or universality in erpax — \"anything is X\" (accountable/taggable), polymorphic relationTo:[...all], the identity element that defines the empty case. The universal root of totality."
atomPath: "vocabulary/all"
coordinate: "vocabulary/all · 2/share · c852f03c"
contentUuid: "be370d6d-d916-56fc-9eb8-88a082b5708a"
diamondUuid: "7183639e-d5f6-8a6d-b329-4d8597dbd3bd"
uuid: "c852f03c-ea15-878f-a4ec-567374d699fa"
horo: 2
typography:
  partition: vocabulary
  bondDegree: 87
standards: []
bindings: []
signatures:
  computationUuid: "b588feee-b9b5-8745-93bf-8ba0c76dc48b"
  stages:
    - stage: path
      stageUuid: "4933a9d8-b552-80de-9a67-3beb1bbdd2ff"
    - stage: trinity
      stageUuid: "a1afa0df-90c5-89d3-918f-adbc05045928"
    - stage: boundary
      stageUuid: "12f2066c-40ce-8a03-a069-6a8493b696fe"
    - stage: links
      stageUuid: "3453fb6b-7492-8be0-b528-dd08270581eb"
    - stage: horo
      stageUuid: "e00b446c-4d41-89c5-b09a-5977915b5425"
    - stage: seal
      stageUuid: "dfe2f5a1-e96c-852f-a7f6-f11dbad6081b"
    - stage: uuid
      stageUuid: "3d215773-7352-886f-81c5-fc97a79ba023"
version: 2
---
# all — totality ("anything is X", every case defined)

`all` is the universal root of **totality**. A reference points at ANY entity polymorphically (`relationTo:[...all]` — "anything is accountable" [[accounting]], "anything is taggable" [[tags]], "anything is commentable" [[comment]]); the system is total — every case, including the empty/missing one, is defined via the identity element ([[sufficient]], [[identity]]); every standard and every collection composes on the one axis. The dual of [[one]]: the one serves all, the all resolves to one.

## In erpax
- Polymorphic outward refs ([[accounting]], [[tags]], [[plugins]]); blanks route to identity elements, never undefined ([[sufficient]]); one engine ([[tags]] two collections) presents all others.

## schema.org — the vocabulary of `all`, hosted on one node
The published vocabulary of "anything" is **schema.org**: `Thing` at the root, ~800 types descending by `subClassOf`, ~1500 properties. A type hierarchy needs no collection-per-type — it [[collapse|collapses]] onto ONE content-addressed node where the **type is a position in the hierarchy** (the [[sti]] single-table-inheritance / [[dimension]] axis, parent = `subClassOf`) and properties are dimensions/fields. So one node hosts the *whole* graph: any entity is a content-[[uuid]] whose `type` points into the schema.org tree, and its JSON-LD is *computed* from type + properties (the frontend already emits structured data; the SEO + nested-docs plugins generalize it from a handful of types to all ~800 — what payloadcms/website does for its pages, the collapsed core does for everything). [[merge]] dedups (same content ⇒ same id); the generic-naming law IS schema.org's prefix-free data-type naming ([[standard]]); a type outside the vocabulary has no route — a dead end ([[identity]]: content-address, or collapse). schema.org is the named vocabulary of `all`, and erpax is its host.

Composes: [[cmspage]].

**Law — [[law]]: `all` is totality — a reference may point at ANY entity polymorphically and every case, including the empty one, is defined via the [[identity]] element; it is the dual of [[one]] (the one serves all, the all resolves to one).**
