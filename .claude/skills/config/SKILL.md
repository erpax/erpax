---
name: config
description: Use when authoring or modifying the root Payload config (payload.config.ts / buildConfig) — wiring db, collections, globals, plugins, editor, secret, cors/csrf, localization, i18n, admin, graphQL, email, typescript output, depth defaults, or custom endpoints.
---

# config — the root Payload config (buildConfig)

The config is the single source everything extends: a fully-typed object passed to `buildConfig`. A plugin is a function `(config) => config` that mutates/returns it. Position 0 — every other concern hangs off this.

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
| `plugins` | Array of `(config)=>config` plugins. **erpax itself is a plugin.** |
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
