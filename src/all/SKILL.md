---
name: all
description: Use when reasoning about totality or universality in erpax — "anything is X" (accountable/taggable), polymorphic relationTo:[...all], the identity element that defines the empty case. The universal root of totality.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# all — totality ("anything is X", every case defined)

`all` is the universal root of **totality**. A reference points at ANY entity polymorphically (`relationTo:[...all]` — "anything is accountable" [[accounting]], "anything is taggable" [[tags]], "anything is commentable" [[comment]]); the system is total — every case, including the empty/missing one, is defined via the identity element ([[sufficient]], [[identity]]); every standard and every collection composes on the one axis. The dual of [[one]]: the one serves all, the all resolves to one.

## In erpax
- Polymorphic outward refs ([[accounting]], [[tags]], [[plugins]]); blanks route to identity elements, never undefined ([[sufficient]]); one engine ([[tags]] two collections) presents all others.

## schema.org — the vocabulary of `all`, hosted on one node
The published vocabulary of "anything" is **schema.org**: `Thing` at the root, ~800 types descending by `subClassOf`, ~1500 properties. A type hierarchy needs no collection-per-type — it [[collapse|collapses]] onto ONE content-addressed node where the **type is a position in the hierarchy** (the [[sti]] single-table-inheritance / [[dimension]] axis, parent = `subClassOf`) and properties are dimensions/fields. So one node hosts the *whole* graph: any entity is a content-[[uuid]] whose `type` points into the schema.org tree, and its JSON-LD is *computed* from type + properties (the frontend already emits structured data; the SEO + nested-docs plugins generalize it from a handful of types to all ~800 — what payloadcms/website does for its pages, the collapsed core does for everything). [[merge]] dedups (same content ⇒ same id); the generic-naming law IS schema.org's prefix-free data-type naming ([[standard]]); a type outside the vocabulary has no route — a dead end ([[identity]]: content-address, or collapse). schema.org is the named vocabulary of `all`, and erpax is its host.

Composes: [[Pages]].
