---
name: content
description: "Use when loading documents as data instead of building them into the site — markdown becomes nested pages (documents, with a parent and breadcrumbs) and posts (publications, which reference the pages and product variants they are based on), written through the Local API with the editor of the field they land in, idempotently by content address."
atomPath: "seed/content"
coordinate: "seed/content · 7/descent · 3d516ed3"
contentUuid: "6e2f11ed-8c3f-5fc8-9117-e299e68b0836"
diamondUuid: "658b036e-77f2-8652-8732-343f614cc46e"
uuid: "3d516ed3-9d8e-847c-bb9a-dddf83d66733"
horo: 7
typography:
  partition: seed
  bondDegree: 120
standards:
  - "CommonMark 0.31 markdown wire-form"
  - "ISO-15836-1:2017 dublin-core title description"
bindings: []
signatures:
  computationUuid: "b7c7ce17-f95c-833b-88db-b3a8113d4d52"
  stages:
    - stage: path
      stageUuid: "85deb229-97a1-822d-8a3f-28b499b79036"
    - stage: trinity
      stageUuid: "8c1122cd-efe1-8b6e-b231-089970ee6bd7"
    - stage: boundary
      stageUuid: "631e7ac1-a451-8a84-9043-b958df49d72d"
    - stage: links
      stageUuid: "1aa7f8ab-db2f-80c7-a35c-a9789dc4c6fd"
    - stage: horo
      stageUuid: "c7e76179-d610-8229-9916-bfa19d53bc3d"
    - stage: seal
      stageUuid: "086e6c7a-c6fc-80a8-b16c-83b1ad2a15c1"
    - stage: uuid
      stageUuid: "ecf31409-16e4-8950-b28f-b856c1c1d84a"
version: 2
---
# seed/content — documents are nested pages, publications are posts

A page that is rendered into the build is content frozen at deploy time. This atom moves it the
other way: the content is rows in the collections Payload already ships, read at request time
through the same API as everything else, and reloaded without a deploy.

## Two homes, and why two

| | home | why |
| --- | --- | --- |
| a **document** | a nested **page** | it has a place in a tree: a parent, so the nested-docs plugin gives it breadcrumbs |
| a **publication** | a **post** | it is dated and categorised, and it is *based on* things: the pages it rests on and, where one exists, the product variants it describes |

Neither is a new collection. A seed is rows for the collections the app already has, which is what
keeps the collection count from growing each time a new kind of content appears.

## Derived, then loaded

`pageRows()` projects matrix nodes into rows. It takes a reader the caller injects, so it never
opens a file itself. The title is the document's own first heading; the slug is `slugOf()` of the
path, because a leaf word is not unique across the tree and a slug has to be. Rows sort
parents-first.

`loadPages()` and `loadPosts()` write with the ordinary collection operations. Each row's markdown
is converted by `toLexical()` using the editor **of the field it lands in**, found by
`richTextField()` — so a seeded document contains only what an author could have typed there, and
the admin can open and edit it. `wikiToLinks()` turns a wikilink into a link to that document's
page, and `linkedSlugs()` reads the targets back out.

Every row carries a content address over its own fields, stored in the document's `seed` field. A
row whose address has not moved is skipped, so loading twice creates nothing and updates nothing.
A reference that names no loaded document comes back in `unresolved` — reported, never invented.

**Honest boundary.** This proves a row is loaded and its references resolve, never that the prose
in it is true. Fidelity is bounded by the target field's editor: a markdown construct that editor
does not carry is left as text, which is why the shared document features (lists, tables, inline
code, quotes) were added to the page and post editors. A seeded document that an author then edits
is overwritten by the next load of a changed row. And the rows are a projection of the tree: while
the tree still holds the same document, the two can drift until the next load.

## Reading back, and describing

- `markdownField(source)` — a virtual sibling of a rich-text field, computed on read by Lexical's
  own converter. Nothing is stored twice.
- `documentMarkdown(doc)` — collects a read document's body; the search sync writes it into the
  search row, which is where a reader asks for a document as text.
- `describedAs` · `summaryOf` — a document's description: its frontmatter line, else its first
  paragraph of prose.
- `fillSeo` — before validation, fills the SEO title and description that were left empty;
  `publishedStates` then requires both on a published document.
- `toLexical` converts a page body with the CONTENT block's editor; a hero has a rich-text field
  of the same name and a different editor, and using it dropped every code fence.

**Honest boundary, added.** The description filled for a document with no prose is its title —
present, not informative. A fence in a language the editor does not list is refused at save.

**Law — [[law]]: content is rows, not build output. A document is a nested page, a publication is a
post that references what it is based on, and a new kind of content is a seed to load rather than a
collection to add or a page to pre-render.**

## Standards

- **CommonMark 0.31** — the markdown wire form.
- **ISO/IEC 25010:2023 §5.6** — maintainability: content changes without a rebuild.

Composes: [[seed]] · [[rules]]/canonical · [[posts]] · [[law]].
