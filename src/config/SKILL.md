---
name: config
description: "Use when authoring or modifying the root Payload config (payload.config.ts / buildConfig) — wiring db, collections, globals, plugins, editor, secret, cors/csrf, localization, i18n, admin, graphQL, email, typescript output, depth defaults, or custom endpoints."
atomPath: config
coordinate: "config · 9/unity · 7a86dc5f"
contentUuid: "a070ea50-43ef-5c22-8fc8-8e0a4edf1e0f"
diamondUuid: "e59fab02-16ba-8879-9a73-5216449d39b0"
uuid: "7a86dc5f-e1bc-8236-83c0-4052741548fa"
horo: 9
typography:
  partition: config
  bondDegree: 171
standards:
  - "BCP-47"
  - "Berlin-Group-PSD2"
  - "COSO-ERM-2017"
  - "EN-16931"
  - "IFRS-9"
  - "ISO-13616-1"
  - "ISO-17442"
  - "ISO-17442-1"
  - "ISO-19160-4"
  - "ISO-3166-1"
  - "ISO-3166-2"
  - "ISO/IEC-29119"
  - "SWIFT-MT"
  - "UPU-S42"
bindings: []
signatures:
  computationUuid: "d63d37fd-711c-834d-8a36-fdd6ac7ae02c"
  stages:
    - stage: path
      stageUuid: "3ea2c96b-64d2-8e0c-b61e-db0ac10ea1f1"
    - stage: trinity
      stageUuid: "d02a1f0c-4bd2-8cc0-85c4-9230428f5d04"
    - stage: boundary
      stageUuid: "bf4e95ae-4331-8244-a245-2959b07bdf0a"
    - stage: links
      stageUuid: "6936ccc4-f826-8824-8772-a6ad7df4491f"
    - stage: horo
      stageUuid: "d5585fd2-02a1-8626-9027-2c0460cc8a09"
    - stage: seal
      stageUuid: "f41f4f33-00a0-8b7f-be19-5f854aa0a0b5"
    - stage: uuid
      stageUuid: "ff70f1cf-5d79-850f-bb65-dddd5f97d7eb"
version: 2
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
