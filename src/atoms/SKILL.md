---
name: atoms
description: "Use when serving the corpus as data instead of code — one nested-docs collection holds every atom as a row, loaded per tenant from a seed pack; the body is rich text, markdown is its wire form, and the standard collection API (REST, SDK, the MCP plugin's own tools) reads and writes it with no per-area tool."
---

# atoms — the corpus served as nested docs

A package is what every tenant runs identically. Everything else is a row. This collection is where
the rows live: one document per atom, addressed by its path, nested under its parent, scoped to the
tenant that loaded it.

## What the collection does, and what does it

| part | done by |
| --- | --- |
| the tree (`parent` → breadcrumbs) | the nested-docs plugin — it enables itself for any collection with a self-referential `parent` |
| tenant isolation | the multi-tenant plugin — every barrel collection outside the spine is scoped |
| the body | a Lexical rich-text field |
| markdown on the wire | two field hooks calling the rich-text package's own markdown converters |
| find · create · update · delete over MCP | the MCP plugin's standard collection tools |

Nothing in that table is hand-rolled, which is the point ([[rules]]/canonical): the collection is
fields plus two hooks.

## Markdown is the wire form

`markdown` is a virtual field: it has no column. Writing it sets `body`; reading it renders `body`.
So a client that knows nothing about Lexical sends and receives plain markdown through the same
endpoints as any other collection.

A wikilink is a markdown link with a known href. `wikiToLinks()` rewrites the corpus's link form to
a link at `/atoms/<path>`, and `linkedPaths()` reads the targets back out. The loader resolves each
target to a document and stores it in `links` — a real relationship, so *what links here* is a
query rather than a scan.

## The seed is derived, then loaded

`atomRows()` projects matrix nodes into rows. It takes a reader the caller injects, so it never
opens a file itself and runs in any runtime. Rows sort parents-first, and each carries a content
address over its own fields.

`loadAtoms()` writes rows with the ordinary collection operations. A row whose content address has
not moved is skipped, so loading the same pack twice creates nothing and updates nothing. A link
resolves by exact path, else by a leaf that exactly one loaded atom carries; anything else comes
back in `unresolved` — reported, never invented.

**Honest boundary.** This proves a row is loaded and its links resolve, never that the prose in it
is true. The rows are a projection of the tree: while the tree still holds the same SKILL, the two
can drift, and the content address only detects that on the next load. A tenant edit to a seeded
row is overwritten by the next load of the same pack — a tenant's own notes belong in a child row.
Each tenant holds its own copy of a pack, so a corpus-wide correction is a reload per tenant. The
collection took the place of the tool-metadata collection, which nothing read: a tool's
documentation is a nested doc like any other atom, so the collection count did not grow.

**Law — [[law]]: what every tenant runs identically is a package; everything else is a row. Serve
the rows through the collection API the framework already ships, and a new case is a seed to load
rather than a tool to write.**

## Standards

- **CommonMark 0.31** — the markdown wire form.
- **ISO/IEC 25010:2023 §5.6** — maintainability: one collection and the standard API in place of per-area tools.

Composes: [[seed]] · [[rules]]/canonical · [[mcp]] · [[law]].
