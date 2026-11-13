---
name: local
description: "Use when working with Payload in THIS project — extends the upstream Payload skill with the local implementation: merged collections read through saved lists, rows derived by hooks, documents seeded as nested pages and read back as markdown over the SDK and MCP, migrations generated from the snapshot, and the tenant-scoped read rule."
---
# Payload here — the local extension of the upstream skill

The upstream skill (`skills/payload`) says how Payload works. This page says how this project
uses it. Read the upstream page for a concept, then the matching section here for the local rule.

## Running Payload commands

Every Payload CLI call needs the project's loader flags, and a local run must not push the schema:

```bash
PAYLOAD_DEV_PUSH=false NODE_OPTIONS="--no-deprecation --max-old-space-size=8000 --import=./src/css/load-hook.mjs" \
  ./node_modules/.bin/payload <command>
```

`generate:types` additionally needs `--import=tsx/esm`. Types are regenerated in the same change
that edits a collection. Local runs target the local D1; `NODE_ENV=production` targets the remote.

## Collections — fewer tables, same lists

A new collection is the last resort. Three moves come first, each already used:

| Situation | Move | Example |
| --- | --- | --- |
| Two collections with the same shape, differing by role | One collection with a `roles` field | customers and vendors are `parties` |
| One collection is an earlier stage of another | One collection; the stage is its status | a quote is a sales order; a contingency is a provision |
| One row always belongs to exactly one parent | A list on the parent | a refund is a line on its credit memo |

What an operator loses in a merge is the list, and a query preset gives it back: `preset()` builds
the row and `loadPresets()` writes it. A merged collection sets `enableQueryPresets: true` and
exports its lists (`partyPresets()`, `orderPresets()`, `provisionPresets()`, `memoPresets()`).

Measure before merging: compare the generated interfaces in `payload-types.ts`. Fitting is not
sameness — a merge is proposed by shape and decided by meaning.

## Hooks — a row that is the result of another is written by a hook

- Product variants come from `deriveVariants`, stock movements from `deriveMovements`, a journal
  entry's postings from `derivePosting`. Nobody types those rows.
- Always pass `req` to nested operations (upstream: transaction safety).
- A hook that writes back into its own collection sets a `context` flag and returns early when it
  sees it (upstream: infinite hook loops).
- A refusal inside a hook is thrown, not swallowed. A caught-and-ignored error is how a document
  got marked posted with nothing posted.
- A field required only at a later stage is not `required`; it carries a `validate` keyed on the
  status, so the earlier stage can be saved without it.

## Documents — nested pages in, markdown out

Documents are rows, not files in the build. A document is a nested page (it has a `parent`, so the
nested-docs plugin gives it breadcrumbs); a publication is a post that references the pages it is
based on.

- **In.** `pageRows()` derives rows from markdown; `loadPages()` writes them, converting each body
  with the editor of the field it lands in. Loading is idempotent: a row whose `seed` address has
  not moved is skipped. An installed skill becomes a generated seed file with
  `tsx src/payload/local/index.ts`, and the seed file is loaded over the REST SDK with
  `tsx src/seed/content/load/index.ts --url <origin> --seed <file>`.
- **Out.** Lexical is the only copy of a body. Beside each rich-text field sits a virtual
  `markdown` field (`markdownField()`): a field-level `afterRead` that converts its sibling with
  that field's own editor — the upstream "computed field" pattern. The search plugin's sync copies
  that text into the search row, so the search collection returns a document as text.

```ts
// REST SDK — one document, as text, through the search collection
const { docs } = await sdk.find({
  collection: 'search',
  where: { slug: { equals: 'skills-payload-queries' } },
  select: { title: true, markdown: true },
  limit: 1,
})

// which document do I need? — every skill with its description
await sdk.find({
  collection: 'search',
  where: { slug: { like: 'skills-' } },
  select: { title: true, slug: true, meta: { description: true } },
})
```

`/api/mcp` is a gateway onto the same API: the same two queries are its find tool for `search`,
with `where` and `select` passed as JSON strings.

**Always select.** A page read without `select` returns its layout as a node tree about seven
times the size of the text.

**Code in documents.** A fenced block is a real code block in the page editor (the pre-built
`CodeBlock`), so a fence survives the round trip. Its language must be one `codeLanguages()`
lists, or the save is refused.

## SEO — filled before validation, then required

A document describes itself. `fillSeo` runs before validation and fills the SEO title and
description an author left empty: the title from the document's title, the description from a
skill's own "Use when" line, else the first paragraph of prose, else the title. Then the
validators run on the filled document: `publishedStates` requires both on a PUBLISHED document
(ISO 15836-1 names title and description as elements of a described resource). A value an author
wrote is never replaced. The SEO plugin is registered for its generate endpoints, so the
"Auto-generate" buttons in the admin produce the same title and description.

## The MCP surface

`@payloadcms/plugin-mcp` is the gateway; no MCP server is hand-written. In production the surface
is the gateway collections plus the document collections (search, pages, posts, categories) — computed by
`mcpSeedCollectionSlugs()`. Enabling every collection crashes the Worker, so more are added by
name through `ERPAX_MCP_EXTRA`. The caller's API key decides access and tenant scope.

## Access

- On a request path, pass `overrideAccess: false` and the user. The Local API bypasses access by
  default (upstream: the critical pitfall).
- A tenant-scoped read rule returns a filter, never `false`, for an anonymous reader with no
  public tenant: the list is empty instead of an error the page must catch.
- Every collection in the barrel is tenant-scoped by the multi-tenant plugin unless it is on the
  spine list.

## Migrations — the only way a schema changes

1. Edit the collection; regenerate types.
2. `payload migrate:create <name>` diffs against `src/migrations/payload-config-snapshot.json`.
   It asks, per new table, whether it was created or renamed; answer "created" unless it truly
   was renamed.
3. Dry-run with `payload migrate` on a local copy of production's schema; a second run must do
   nothing.
4. Deploy with `pnpm erpax deploy app`, which runs `payload migrate` against production before
   uploading.

Never run schema SQL by hand. SQLite cannot alter a foreign key, so a changed relationship
recreates the table; the generator handles that.

**Honest boundary.** This page records the local rules as of the change that wrote it; it does
not replace the upstream skill and it does not check itself. The saved lists and the document
seeds are declared in code and are only present in a deployment once someone loads them there.

**Law — [[law]]: Payload defines the shape once; everything else is rows — a role, a stage, a
list, a document — reached through the API that already exists.**

Composes: [[payload]] · [[seed]]/content · [[preset]] · [[law]].
