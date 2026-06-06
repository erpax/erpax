---
name: tag
description: Use when modelling variation, categorization, or cross-domain links in erpax WITHOUT new collections or deep nesting — the polymorphic multi-context tag system (acts_as_taggable_on port). One collection presented infinitely by filtering (context, tag); tag/tagging collections, the taggable plugin, tagged_with→where mapping, tag clouds, ownership, relatedness, and tag-lists that link multiverses. "Anything is taggable."
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# tags — anything is taggable (less collections, more features)

Port of Rails `acts_as_taggable_on`: variation lives in **tags + contexts**, not in new collections or nested field-groups. One collection is presented in infinite ways by filtering `(context, tag)` combinations — and shared tags **link** records across multiverses. Sibling of [[accounting]] "anything is accountable" — same polymorphic, uuid-driven shape. Ordered by the [[sequence]].

## Two collections serve ALL others (the "less collections" engine)
| Collection | Fields | erpax id |
|---|---|---|
| `tags` | `name` (indexed) · `taggingsCount` (counter) | **uuid = content-uuid(name)** |
| `taggings` (polymorphic join) | `tag`(rel) · `taggable`(**`text` = the target's content-uuid**) · `taggableType`(`text` = target slug) · `tagger`(rel, optional) · `context`(text, default `tags`) · `tenant`(injected) | **uuid = content-uuid(tag,taggable,context,tagger)** |

> **`taggable` is a content-uuid `text` column, NOT a polymorphic `relationTo:[…all]`.** The relationship form materialises one FK column per target collection in `taggings_rels`; with 200+ collections that is 200+ columns — past **D1's hard 100-column-per-table cap**, so `payload migrate` fails (`too many columns on taggings_rels`) and the schema can't be created on D1. The content-uuid is ONE column for all targets and federates (same content ⇒ same id; see [[identity]]). This is "anything is taggable" done by uuid, the same way "anything is accountable" is. Reverse lookup is `taggedWith` (query), not a stored `join` field. Guard: `pnpm d1:audit`.

**Content-uuid collapses the gem's machinery:** `find_or_create_all_with_like_by_name` + name-uniqueness + `DuplicateTagError` race-retry + the UNIQUE composite index `[tag,taggable,context,tagger]` ALL become automatic dedup — same content ⇒ same id ([[identity]]). "Dry storage" of tags + taggings; same tag = same id across federated instances.

## Context = the infinite-presentation lever (replaces deep nesting)
`context` is just a string ⇒ UNLIMITED label-sets, no schema. Declared contexts (`status`, `region`, `segment`) AND **dynamic/user-generated contexts** at runtime (`set_tag_list_on('customs', …)`, `tagged_with(x, on:'customs')`). Deep nested groups dissolve: `Customer.identity.status` → `(context:'status', tag)`; `Customer.tax.vatNumberType` → `(context:'tax-regime', tag)`. Chain filters across contexts for any view.

## Tag lists link multiverses (the decoupled relation)
A shared, content-uuid'd tag is the **loosely-coupled alternative to `relationTo:'specific-slug'`** (which couples plugins — see [[plugins]]). A `project-X` tag on a Customer + Invoice + WorkOrder + Document links them into one cross-domain view with NO inward dependency. Because the tag's id is content-derived, the link holds **across federated instances** (same tag = same id). `find_related` / shared-tag queries surface the links; this is how tags connect the multiverses at the data layer (cf. [[hooks]] connecting them at the lifecycle layer).

## taggablePlugin (mirror of uuidPlugin — see [[plugins]])
Adds `taggable` (`text` content-uuid) + `taggableType` (`text` slug) to the `taggings` collection — ONE pair of columns that references ANY record by its content-uuid ([[identity]]), the polymorphic-by-uuid form. Taggable collections gain **ZERO columns** (a record is tagged by writing a tagging that points at its uuid; nothing is stored on the record). Reverse lookup ("tags on this record") is the `taggedWith` query, not a stored `join` field — a Payload `join` needs a real relationship `on` target, which the content-uuid column deliberately isn't. One injector, all collections — same pattern as the uuid injector. **Do not** restore the polymorphic `relationTo:[…all]`: it puts one FK column per collection in `taggings_rels` (200+ → over D1's 100-col cap; see the GOTCHA + `pnpm d1:audit`).

## tagged_with → Payload `where` (see [[queries]])
| gem option | Payload |
|---|---|
| `any:` (OR) | taggings `where context, tag in[…]` → taggable ids → `id in[…]` |
| `match_all:` (exact set) | per-tag intersection / grouped having-count |
| `exclude:` | `id not_in` (taggings subquery) |
| `owned_by:` | filter `tagger` |
| `on:` | filter `context` |
| `start_at`/`end_at` | filter tagging `createdAt` |
| `wild: :prefix/:suffix/true` | `like` (escape `% _ !`) |

"Infinite presentations" = saved **query presets** over `(context, tag)` filters (see [[admin]]).

## URL path = tag-composition (the public face of the same fractal law)
A URL is the external presentation of `(context, tag)` filtering: `https://[host]/[tag1]/[tag2]/…/` — **`host`** = the tenant root (the `0`; Rails `HostConcern`/`Domain` → erpax tenant), then each segment is a **tag**, and the path is a `tagged_with` **chain → `where`** resolving against the akashic record. No bespoke routes — the tag chain IS the route; `host/customers/active/eu/` = scoped to host, tagged `active`, tagged `eu`. This is the *same* derived-address law as the skill path (`self/sufficient`), the file location (`domain × sequence-position × element`), and the object's content-uuid ([[identity]]) — self-describing and self-similar, just expressed at the `7·5` api·admin surface (see [[sequence]]). The path is the query; the query is the presentation. A **verb-headed command** (`/find/unpaid/invoices`) is the same path with a leading verb choosing the resolver (`find` → search/[[queries]]), the rest a tag-chain (`unpaid` = a derived state, `invoices` = target): **command = URL = query**, resolved against the akashic record. Qualifier segments are *derived* states (the [[commerce]]/[[manufacturing]] lesson), never stored flags.

## More features (all from the same 2 collections)
- **Counts / tag cloud:** `taggingsCount` → most/least-used, `top_<ctx>`, `at_least`/`at_most`, frequency→CSS buckets.
- **Ownership** (tagger): provenance — who applied the tag (ties to audit/[[accounting]]). `tag_list` excludes owned; `all_tags_list` includes all.
- **Relatedness:** records sharing tags, ranked by overlap → "related items" (the linking, surfaced).
- **Caching:** denormalize `cachedTagList` on the taggable via a [[hooks]] beforeChange (matter) so reads need no join — the hook/fallback ↔ matter/antimatter pair (see [[sequence]]).
- **Dirty tracking / ordered tags:** `<ctx>_list_changed?`; `acts_as_ordered_taggable` preserves creation order.

## The write engine — a text field BECOMES computed taggings (realized matter)
The read side (`taggedWith`) had no write twin; these matter files complete the port so a free-text label/category/CSV column can be **replaced** by content-addressed taggings (the zero-entropy move: a stored string is entropy, a tagging is canonical):

- **`tag/list.ts`** — `parseTagList` / `toTagListString` (port of `TagList` + `DefaultParser`): the **text↔tags bridge**. A delimited, optionally-quoted string (`a, b, "c,d"`) parses to a clean, lower-cased, deduped name list and renders back for editing. `reconcileTags` is the pure `save_tags` diff (add new, remove dropped) — provable with no DB.
- **`tag/setTagList.ts`** — `setTagList` (port of `Core#save_tags`) reconciles a record's taggings in a context to a list; `findOrCreateTags` is the content-uuid form of `find_or_create_all_with_like_by_name` (same name ⇒ same id, no race); `tagListOn` is `tag_list_on` (the names a record carries). Stub-tested end to end.
- **`tags/taggings/counter.ts`** — the `taggingsCount` **counter cache** (the gem's `counter_cache`): a create `+1`s, a delete `-1`s the tag — wired as a taggings afterChange/afterDelete so EVERY write path stays correct. `most_used`/`least_used` are then just `taggingsCount` sorts.
- **`tag/field.ts` — `tagListField(context)`**: the drop-in REPLACEMENT for `{ name, type: 'text' }`. A **virtual** text field, computed from taggings on read and reconciled into them on change. Swap a label/CSV column for it and the value lives in the shared engine — sliceable, deduped, counted, `taggedWith`-queryable — with **zero stored column** ([[merge]]: the text field collapses into the one tagging engine).

So which text fields are "really another type"? Numbers/dates/emails **retype** (the static-typing gate); **labels, categories, keyword-lists, free-tag columns become `tagListField` / taggings** — text-as-entropy collapsed to content-addressed tags.

## Quantum-entangled aspects (from the full schema)
- **Tags are typed (STI `type` column).** A tag's *type/slot* rides in its structured **uuidv8** (SLOT_TAGS; see [[identity]]) — `decodeStructured(tagUuid)` reveals its kind with NO lookup (realtime). Per-context Tag subclasses come from the `find_or_create_tags_from_list_with_context` hook. The tag is self-describing.
- **Per-context cached lists** (`cached_<context>_list` — string, PG array, or `json`). Denormalize the read projection on the taggable as a `json` map `{context: [tags]}`, maintained by a [[hooks]] beforeChange (matter) so reads (antimatter) skip the join. On D1 use a `json` field; query with json operators.
- **Any primary key** (`non_standard_id` taggable) → `taggable_id` natively references the **content-uuid string PK**: taggings entangle uuid-addressed rows across collections AND federated instances.
- **Production index set** (combined migration): unique `[tag,taggable,context,tagger]` + `(taggable,context)` + `context` + `(tagger)` + `tenant` + `tag_id`. Each index is a presentation/link path — index every axis you filter or link on.

## GOTCHA (D1/SQLite)
SQLite can't case-fold multibyte chars without ICU — do NOT rely on SQL `LOWER` for matching. Normalize at write (`forceLowercase` in the beforeChange) so the content-uuid is stable and matching is exact. Index `taggings(taggable, context)` + `context` + `tenant`.

## Common mistakes
- A new collection (or nested group) per variation — use a `(context, tag)` instead: **less collections, more features**.
- A `tags` column on every collection — use the polymorphic `taggings` join + a virtual join field (zero columns).
- A hard `relationTo:'specific'` to cross domains — a shared tag links them decoupled (and federates).
- Relying on `LOWER()` matching on D1 — normalize at write (content-uuid needs a canonical form anyway).

Composes: [[Taggings]] · [[database]].
