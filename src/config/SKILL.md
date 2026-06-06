---
name: config
description: Use when authoring or modifying the root Payload config (payload.config.ts / buildConfig) — wiring db, collections, globals, plugins, editor, secret, cors/csrf, localization, i18n, admin, graphQL, email, typescript output, depth defaults, or custom endpoints.
sessions:
  - 776a49cb-8dfb-45ab-88ff-956e3b613adf
---

# config — the root Payload config (buildConfig)

The config is the single source everything extends: a fully-typed object passed to `buildConfig`. A plugin is a function `(config) => config` that mutates/returns it. Position 0 — every other concern hangs off this.

## Every index IS a shared config — payload ⊕ vitepress, merged
An atom's `index.ts` is not only Payload matter: it is the **shared config both [[payload]] and [[vitepress]] derive from** — payload makes the collection + [[types]] + [[database]] from it; vitepress makes the doc + frontmatter from it. One config, two consumers — the [[duality]] bound by content-[[identity]] (the uuid, the `0`). So a SKILL.md **frontmatter and its index are the same config**: harmonising the frontmatter to the index architecture (one-word name, the trigger description, no redundant fields) makes them **merge** — identical config content ⇒ one merged config ([[merge]]). The registry barrels (the prefix indices) are configs too; identical configs consolidate by design. The schema trinity — config · [[types]] · [[database]] — told once, read twice.

**If not a collection, a dashboard/page.** Payload reads the shared config as exactly one of two kinds: a **[[collections]]** (a `CollectionConfig` — data, plural per the naming law) or a **dashboard/page** (a custom admin/frontend view — singular). Every atom is one or the other, so the chart of accounts is **collections (data accounts) ⊕ dashboards/pages (view accounts)**. The kind is declared by the config and inflected by the name (plural ⇒ collection, singular ⇒ page/model); the [[gate]] checks a non-collection atom is a valid page. The dissolved components (`dashboard`, `navigation`, `shell`, admin views) are pages; the entities (`invoices`, `payments`) are collections.

**The atom defines itself.** Nothing outside classifies it: its kind (collection/page), fields, relationships, [[standard]], and position are all declared by its own shared config + [[name]] + content-[[uuid]] — self-describing, [[self]]-sufficient (derive, never invent). The chart of accounts, the registry, the generated [[types]], and the [[gate]] all **DERIVE** from the self-defining atoms — the set-union of their declarations ([[merge]] by design). Hold no separate catalogue: **`find src` IS the registry**; the path-set is self-describing ([[aura]]). To know what an atom is, read the atom — it has already said.

## Minimal shape
```ts
import { buildConfig } from 'payload'
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,        // * required — encryption/salt
  db: sqliteD1Adapter({ /* ... */ }),        // * required — DB adapter
  editor: lexicalEditor(),                   // richText editor
  collections: [/* ... */],
  sharp,                                     // enables image resize/crop
})
```

## Key options
| Option | Purpose |
|---|---|
| `db` * | Database adapter (d1-sqlite/postgres/mongo). |
| `secret` * | Unguessable string for hashing/encryption. |
| `collections` / `globals` | Data schemas (many docs / single doc). |
| `editor` | richText editor (lexical). |
| `plugins` | Array of `(config)=>config` plugins (official ones too, e.g. [[redirects]]). **erpax itself is a plugin.** |
| `admin` | Admin Panel config (components, live preview, routes). |
| `graphQL` | `disable`, `maxComplexity`, custom queries (see [[harden]]). |
| `cors` / `csrf` / `cookiePrefix` | Cross-origin + cookie security. |
| `localization` / `i18n` | Content locales / admin UI languages. |
| `defaultDepth` / `maxDepth` | Relationship population depth (default max 10) (see [[optimize]],[[harden]]). |
| `indexSortableFields` | Auto-index sortable top-level fields. |
| `email` / `sharp` / `endpoints` / `hooks` / `onInit` | Email adapter / image lib / custom REST routes / root hooks / startup fn. |
| `typescript.outputFile` | Where `generate:types` writes `payload-types.ts`. |
| `custom` | Arbitrary extension data (plugins read this). |

## Common mistakes
- Forgetting `secret` or `db` (both required).
- Putting tenant/multi-tenancy as manual fields instead of the multi-tenant plugin (the plugin owns `tenant`).
- Inlining repeated blocks instead of top-level `blocks` + `blockReferences` (see [[optimize]]).
- Editing `payload-types.ts` by hand — it's generated; re-run `generate:types`.

**Law — [[law]]: every atom's `index.ts` IS the one shared config both [[payload]] and [[vitepress]] derive from — self-describing (kind, fields, relations, position all declared by it + its [[name]] + content-[[uuid]]); `find src` is the registry, so identical configs [[merge]] and nothing outside classifies an atom.**
